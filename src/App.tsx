import * as React from 'react';
import './styles/App.css';

import { Instance } from 'jsstore';
import { Producto, Marca } from './Model';
import { BaseService } from './services/base_service';
import { StartPage } from './components/StartPage';
import { AcercaDe } from './components/AcercaDe';
import { Catalog } from './components/Catalog';
import { Marcas } from './components/Marcas';
import { AddMarca } from './components/AddMarca';
import { AddProducto } from './components/AddProduct';
import { ModalProps, Modal } from './components/Modal';

export type Pages =
    "agregarMarca" |
    "editarMarca" |
    "agregarProducto" |
    "editarProducto" |
    "acercaDe" |
    "inicio" |
    "productos" |
    "marcas";

interface AppState {
    what: string;
    display: Pages;
    productos: Producto[];
    marcas: Marca[];
    search: { query: string, by: 'marca' | 'producto', to: 'marcas' | 'productos' };
    showModal: Boolean;
}

class App extends React.Component<{}, AppState> {

    private connection: Instance;
    private service: BaseService;
    private marcaToEdit?: Marca;
    private productoToEdit?: Producto;
    private modalProps: ModalProps;

    public constructor(props: {}) {
        super(props);
        this.modalProps = {
            onAccept: () => { },
            onDecline: () => { },
            text: "",
            title: ""
        }
        this.state = {
            what: "",
            display: "inicio",
            marcas: [],
            productos: [],
            search: {
                by: "marca",
                to: "marcas",
                query: ""
            },
            showModal: false,
        }
    }

    public componentDidMount() {
        BaseService.Connect().then((instance) => {
            this.connection = instance.connection;
            this.service = instance;
            this.refresh();
        }).catch((err) => {
            alert(err);
        });
    }

    public render() {
        const { display, productos, marcas, search, showModal } = this.state;
        let element = <div>Empty div</div>

        switch (display) {
            case "inicio":
                element = <StartPage
                    navigateTo={(page: Pages) => { this.navigateTo(page); }}
                />
                break;
            case "acercaDe":
                element = <AcercaDe
                    navigateTo={(page: Pages) => { this.navigateTo(page); }}
                />
                break;
            case "productos":
                element = <Catalog
                    navigateTo={(page: Pages) => { this.navigateTo(page); }}
                    productos={productos.filter((producto) => {
                        if (search.to === 'productos') {
                            if (search.by === 'producto') {
                                return producto.Nombre.toLowerCase().includes(search.query);
                            } else {
                                return (marcas.find((marca) =>
                                    producto.IdMarca === marca.IdMarca
                                ) as Marca).Nombre.toLowerCase().includes(search.query);
                            }
                        } else {
                            return true;
                        }
                    })}
                    removeProduct={(producto) => {
                        this.service.removeProduct(producto).then(() => this.refresh())
                    }}
                    mustEditProduct={(producto) => {
                        this.productoToEdit = producto;
                        this.navigateTo("editarProducto");
                    }}
                    getMarca={(marca) => {
                        return marcas.find((m) => m.IdMarca === marca) as Marca;
                    }}
                    filter={(by, query) => this.setState({
                        search: {
                            by,
                            to: "productos",
                            query
                        }
                    })}
                    resetDatabase={() => {
                        this.showModal({
                            text: "Esta seguro que desea borra la base de datos?",
                            title: "Borrar base de datos",
                            onAccept: () => this.service.resetDatabase().then(() => this.refresh()),
                            onDecline: () => { }
                        })
                    }}
                    exportToJSON={() => {
                        this.service.exportToJSON("Productos");
                    }}
                />
                break;
            case "marcas":
                element = <Marcas
                    navigateTo={(page: Pages) => { this.navigateTo(page); }}
                    marcas={marcas}
                    removeMarca={(marca) => {
                        this.showModal({
                            text: "Al borrar una marca se borraran todos sus productos, desea continuar?",
                            title: "Borrar Marca",
                            onAccept: () => this.service.removeMarca(marca).then(() => this.refresh()),
                            onDecline: () => { }
                        })
                    }}
                    mustEditMarca={(marca) => {
                        this.marcaToEdit = marca;
                        this.navigateTo("editarMarca");
                    }}
                    resetDatabase={() => {
                        this.showModal({
                            text: "Esta seguro que desea borra la base de datos?",
                            title: "Borrar base de datos",
                            onAccept: () => this.service.resetDatabase().then(() => this.refresh()),
                            onDecline: () => { }
                        })
                    }}
                    exportToJSON={() => {
                        this.service.exportToJSON("Marcas");
                    }}
                />
                break;
            case "agregarMarca":
                this.marcaToEdit = undefined;
            case "editarMarca":
                element = <AddMarca
                    navigateTo={(page) => this.navigateTo(page)}
                    addMarca={(marca) => this.service.addMarca(marca).then(() => this.refresh())}
                    editMarca={(marca) => this.service.editMarca(marca).then(() => this.refresh())}
                    exists={(marcaNombre) => marcas.findIndex((m) => m.Nombre === marcaNombre) !== -1}
                    marca={this.marcaToEdit}
                />
                break;
            case "agregarProducto":
                this.productoToEdit = undefined;
            case "editarProducto":
                element = <AddProducto
                    navigateTo={(page) => this.navigateTo(page)}
                    addProducto={(producto) => this.service.addProduct(producto).then(() => this.refresh())}
                    editProducto={(producto) => this.service.editProduct(producto).then(() => this.refresh())}
                    existsProduct={(productoNombre) => productos.findIndex((m) => m.Nombre === productoNombre) !== -1}
                    existsMarca={(marcaNombre) => marcas.findIndex((m) => m.Nombre === marcaNombre) !== -1}
                    getMarca={(marca) => {
                        if (typeof (marca) === "string") {
                            return marcas.find((m) => m.Nombre === marca) as Marca;
                        } else {
                            return marcas.find((m) => m.IdMarca === marca) as Marca;
                        }
                    }}
                    producto={this.productoToEdit}
                />
            default:
                break;
        }
        return (
            <div className="App">
                {element}
                {showModal && <Modal
                    {...this.modalProps}
                />}
            </div>
        );
    }

    private refresh() {
        const p1 = this.connection.select({
            from: "Productos",
        });
        const p2 = this.connection.select({
            from: "Marcas",
        });
        Promise.all([p1, p2]).then((results) => {
            this.setState({
                productos: results[0] as Producto[],
                marcas: results[1] as Marca[],
            });
        });
    }

    private navigateTo(page: Pages) {
        this.setState({
            display: page,
            search: {
                to: "marcas",
                by: "marca",
                query: "",
            }
        })
    }

    private showModal(modalProps: ModalProps) {
        this.modalProps = {
            onAccept: () => { modalProps.onAccept(); this.hideModal(); },
            onDecline: () => { modalProps.onDecline(); this.hideModal(); },
            title: modalProps.title,
            text: modalProps.text
        }
        this.setState({ showModal: true });
    }

    private hideModal() {
        this.modalProps = {
            onAccept: () => { },
            onDecline: () => { },
            text: "",
            title: ""
        }
        this.setState({ showModal: false });
    }
}

export default App;

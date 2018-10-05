import { PureComponent } from 'react';
import * as React from 'react';
import { Pages } from '../App';
import { Producto, Marca } from '../Model';

// const producto: Producto = {
//     IdMarca: 1,
//     Categoria: "Shampoo",
//     Imagen: "https://d3lfzbr90tctqz.cloudfront.net/epi/resource/r/shampoo-pantene-pro-v-brillo-extremo-400-ml/0cc8b17df720da62ca4dd25d442ac01c34b403310087c6c07247b8da31735820_100",
//     Nombre: "Pantene Moisture Renewal",
//     PrecioPromedio: 30.0
// }  

interface CatalogProps {
    navigateTo: (page: Pages) => void;
    mustEditProduct: (product: Producto) => void;
    removeProduct: (product: Producto) => void;
    getMarca: (marcaId: number) => Marca;
    filter: (by: 'marca' | 'producto', query: string) => void;
    resetDatabase: () => void;
    exportToJSON: () => void;
    productos: Producto[];
}

export class Catalog extends PureComponent<CatalogProps> {

    private by: 'marca' | 'producto' = "producto";
    private query: string = "";

    public render() {
        const { productos, navigateTo, mustEditProduct, removeProduct, getMarca, filter, resetDatabase, exportToJSON } = this.props;
        return <div className="row row-centered " style={{ marginTop: "10px" }}>
            <div className="col-xs-12 col-centered">
                <nav>
                    <div style={{ textAlign: "center" }}>
                        <button id="btnMarcas" className="btn btn-info" style={{ margin: "5px" }} onClick={() => {
                            navigateTo("marcas");
                        }}><i className="fa fa-user-circle" aria-hidden="true"></i> Marcas Registradas</button>
                        <button id="btnAgrProducto" className="btn btn-primary" style={{ margin: "5px" }} onClick={() => {
                            navigateTo("agregarProducto");
                        }}><i className="fa fa-plus" aria-hidden="true"></i> Producto Nuevo</button>
                        <button id="btnExportar" className="btn btn-primary" style={{ margin: "5px" }} onClick={() => {
                            exportToJSON();
                        }}><i className="fa fa-plus" aria-hidden="true"></i> Exportar a JSON</button>
                        <button id="btnInicio" className="btn btn-warning" style={{ margin: "5px" }} onClick={() => {
                            resetDatabase();
                        }}><i className="fa fa-book" aria-hidden="true"></i> Restaurar Sistema</button>
                    </div>
                </nav>
                <table id="tblGrid" className="table table-hover ">
                    <caption style={{ textAlign: "center", padding: "7px 0px 7px 0px", background: "#005B96", color: "white", fontFamily: "Slabo 27px, serif", fontSize: "20px" }}>Detalles de los Productos</caption>
                    <thead>
                        <tr>
                            <th>Nombre del Producto</th>
                            <th>Categoría del Producto</th>
                            <th>Marca</th>
                            <th>Imagen</th>
                            <th>Tiendas</th>
                            <th>Precio Promedio</th>
                            <th></th>
                            <th style={{ width: "1px" }}>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ margin: 'auto 10px auto 0', marginRight: '10px' }}>search:</div>
                                    <input type="text" className="form-control col" style={{ width: "150px", margin: 'auto 10px auto 0' }} onChange={(event) => {
                                        this.query = event.target.value.toLowerCase();
                                        filter(this.by, this.query);
                                    }}>
                                    </input>
                                    <div>
                                        <div className="radio" style={{ margin: 0 }}>
                                            <label><input type="radio" name="optradio" defaultChecked={this.by === "producto"} onChange={(event) => {
                                                this.by = "producto";
                                                filter(this.by, this.query);
                                            }} />Nombre</label>
                                        </div>
                                        <div className="radio" style={{ margin: 0 }}>
                                            <label><input type="radio" name="optradio" defaultChecked={this.by === "marca"} onChange={(event) => {
                                                this.by = "marca";
                                                filter(this.by, this.query);
                                            }} />Marca</label>
                                        </div>
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productos.map((producto) => {
                                return <tr key={producto.IdProducto}>
                                    <td>{producto.Nombre}</td>
                                    <td>{producto.Categoria}</td>
                                    <td>{getMarca(producto.IdMarca).Nombre}</td>
                                    <td><img src={producto.Imagen}></img></td>
                                    <td>{producto.Tiendas === undefined ? "" : producto.Tiendas.join()}</td>
                                    <td>{producto.PrecioPromedio}</td>
                                    <td><button className="btn btn-info" onClick={() => {
                                        mustEditProduct(producto);
                                    }}>Editar</button></td>
                                    <td><button className="btn btn-danger" onClick={() => {
                                        removeProduct(producto);
                                    }}>Eliminar</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    }
}
import { Component } from "react";
import * as React from 'react';
import { Marca, Producto } from '../Model';
import { Pages } from '../App';

interface AddProductoProps {
    navigateTo: (page: Pages) => void;
    addProducto: (producto: Producto) => Promise<void>;
    editProducto: (producto: Producto) => Promise<void>;
    existsProduct: (productoNombre: string) => boolean;
    existsMarca: (marcaNombre: string) => boolean;
    getMarca: (marca: number | string) => Marca;
    producto?: Producto;
}

interface AddProductoState {
    errorNombre: boolean;
    errorMarca: boolean;
    errorPrecio: boolean;
    errorImagen: boolean;
}

export class AddProducto extends Component<AddProductoProps, AddProductoState> {

    private Nombre: string;
    private Categoria: string;
    private Marca: string;
    private Imagen: string;
    private Tiendas: string;
    private PrecioPromedio: string;

    constructor(props: AddProductoProps) {
        super(props); 
        const {getMarca} = props;
        if (props.producto !== undefined) {
            const { Nombre, Categoria, IdMarca, Imagen, Tiendas, PrecioPromedio } = props.producto;
            this.Nombre = Nombre;
            this.Categoria = Categoria === undefined ? "" : Categoria;
            this.Marca = getMarca(IdMarca).Nombre;
            this.Imagen = Imagen == undefined ? "" : Imagen;
            this.Tiendas = Tiendas === undefined ? "" : Tiendas.join();
            this.PrecioPromedio = PrecioPromedio === undefined ? "" : PrecioPromedio.toString();
        } else {
            this.Nombre = "";
            this.Categoria = "";
            this.Marca = "";
            this.Imagen = "";
            this.Tiendas = "";
            this.PrecioPromedio = "";
        }
        this.state = {
            errorNombre: false,
            errorMarca: false,
            errorPrecio: false,
            errorImagen: false,
        }
    }

    public render() {
        const { existsMarca, existsProduct, navigateTo, producto } = this.props;
        const { errorNombre, errorMarca, errorPrecio, errorImagen} = this.state;

        return <div className="row row-centered">
            <div className="col-centered">
                <h1>Crear o Actualizar un Producto</h1>
                <form className="form-horizontal" data-student-id="" role="form" style={{ marginTop: "50px" }}>
                    <div className={`form-group ${errorNombre ? "has-error" : ""}`}>
                        <label className="control-label col-sm-3" htmlFor="txtNombreProducto">Nombre del Producto:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="txtNombreProducto" defaultValue={this.Nombre} onChange={(event) => {
                                this.Nombre = event.target.value;
                                const actualNombre = producto === undefined ? "" : producto.Nombre;
                                this.setState({ errorNombre: existsProduct(this.Nombre) && this.Nombre !== actualNombre});
                            }} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3" htmlFor="txtCategoria">Categoria:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="txtCategoria" defaultValue={this.Categoria} onChange={(event) => {
                                this.Categoria = event.target.value;
                            }} />
                        </div>
                    </div>
                    <div className={`form-group ${errorMarca ? "has-error" : ""}`}>
                        <label className="control-label col-sm-3" htmlFor="txtMarca">Marca:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="txtTelefono" defaultValue={this.Marca} onChange={(event) => {
                                this.Marca = event.target.value;
                                this.setState({errorMarca: !existsMarca(this.Marca)});
                            }} />
                        </div>
                    </div>
                    <div className={`form-group ${errorImagen ? "has-error" : ""}`}>
                        <label className="control-label col-sm-3" htmlFor="txtImagen">URL Imagen:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="txtImagen" defaultValue={this.Imagen} onChange={(event) => {
                                this.Imagen = event.target.value;
                                this.setState({ errorImagen: !this.validateUrl(this.Imagen) });
                            }} />
                        </div>
                    </div>
                    <div className={`form-group`}>
                        <label className="control-label col-sm-3" htmlFor="txtTiendas">Tiendas (separadas por comas):</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="txtTiendas" defaultValue={this.Tiendas} onChange={(event) => {
                                this.Tiendas = event.target.value;
                            }} />
                        </div>
                    </div>
                    <div className={`form-group ${errorPrecio ? "has-error" : ""}`}>
                        <label className="control-label col-sm-3" htmlFor="txtPrecio">Precio Promedio:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="txtPrecio" defaultValue={this.PrecioPromedio} onChange={(event) => {
                                this.PrecioPromedio = event.target.value;
                                let value: number = parseFloat(this.PrecioPromedio);
                                this.setState({ errorPrecio: isNaN(value) && value > 0.0});
                            }} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12" style={{ textAlign: "center", marginTop: "30px" }}>
                            <button id="btnSubmit" type="button" onClick={() => { this.submit(); }} className="btn btn-primary" style={{ padding: "9px 15px 9px 15px" }}>
                                <i className="fa fa-check" aria-hidden="true"></i> <span>Ok</span>
                            </button>
                            <button id="btnCancel" type="button" onClick={() => navigateTo("productos")} className="btn btn-warning" style={{ padding: "9px 15px 9px 15px" }}>
                                <i className="fa fa-warning" aria-hidden="true"></i> <span>Cancelar</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>;
    }

    private submit() {
        const { errorImagen, errorNombre, errorPrecio, errorMarca } = this.state;
        const { addProducto, navigateTo, producto, editProducto, getMarca } = this.props;

        if (errorImagen || errorNombre || errorPrecio || errorMarca) {
            return;
        }
        if (this.Nombre.length === 0) {
            this.setState({ errorNombre: true });
            return;
        }
        if(this.Marca.length === 0){
            this.setState({errorMarca: true});
            return;
        }
        if(this.PrecioPromedio.length === 0){
            this.setState({errorPrecio: true});
            return;
        }
        if(parseFloat(this.PrecioPromedio) < 0.0){
            this.setState({errorPrecio: true});
            return;
        }

        if (producto === undefined) {
            addProducto({
                Categoria: this.Categoria,
                IdMarca: getMarca(this.Marca).IdMarca as number,
                Imagen: this.Imagen,
                Nombre: this.Nombre,
                PrecioPromedio: parseFloat(this.PrecioPromedio),
                Tiendas: this.Tiendas.split(','),
            }).then(() => {
                navigateTo("productos");
            });
        } else {
            editProducto({
                IdProducto: producto.IdProducto,
                Categoria: this.Categoria,
                IdMarca: getMarca(this.Marca).IdMarca as number,
                Imagen: this.Imagen,
                Nombre: this.Nombre,
                PrecioPromedio: parseFloat(this.PrecioPromedio),
                Tiendas: this.Tiendas.split(','),
            }).then(() => {
                navigateTo("productos");
            });
        }
    }

    private validateUrl(url: string): boolean {
        if(url === ""){
            return true;
        }
        const urlRegex = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);
        return urlRegex.test(url);
    }
}
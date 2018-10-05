import { Component } from "react";
import * as React from 'react';
import { Marca } from '../Model';
import { Pages } from '../App';

interface AddMarcaProps {
    navigateTo: (page: Pages) => void;
    addMarca: (marca: Marca) => Promise<void>;
    editMarca: (marca: Marca) => Promise<void>;
    exists: (marcaNombre: string) => boolean;

    marca?: Marca;
}

interface AddMarcaState {
    errorNombre: boolean;
    errorCorreo: boolean;
    errorTelefono: boolean;
    errorPagina: boolean;
}

export class AddMarca extends Component<AddMarcaProps, AddMarcaState> {

    private Nombre: string;
    private Correo: string;
    private Telefono: string;
    private PaginaWeb: string;

    constructor(props: AddMarcaProps) {
        super(props);
        if (props.marca !== undefined) {
            this.Nombre = props.marca.Nombre;
            this.Correo = props.marca.Correo;
            this.Telefono = props.marca.Telefono;
            this.PaginaWeb = props.marca.PaginaWeb;
        } else {
            this.Nombre = "";
            this.Correo = "";
            this.Telefono = "";
            this.PaginaWeb = "";
        }
        this.state = {
            errorNombre: false,
            errorCorreo: false,
            errorPagina: false,
            errorTelefono: false,
        }
    }

    public render() {
        const { exists, navigateTo, marca } = this.props;
        const { errorCorreo, errorNombre, errorPagina, errorTelefono } = this.state;

        return <div className="row row-centered">
            <div className="col-centered">
                <h1>Crear o Actualizar una Marca</h1>
                <form className="form-horizontal" data-student-id="" role="form" style={{ marginTop: "50px" }}>
                    <div className={`form-group ${errorNombre ? "has-error" : ""}`}>
                        <label className="control-label col-sm-3" htmlFor="txtNombreMarca">Nombre de la Marca:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="txtNombreMarca" defaultValue={this.Nombre} onChange={(event) => {
                                this.Nombre = event.target.value;
                                const actualNombre = marca === undefined ? "" : marca.Nombre;
                                this.setState({ errorNombre: exists(this.Nombre) && this.Nombre !== actualNombre});
                            }} />
                        </div>
                    </div>
                    <div className={`form-group ${errorCorreo ? "has-error" : ""}`}>
                        <label className="control-label col-sm-3" htmlFor="txtCorreo">Correo:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="txtCorreo" defaultValue={this.Correo} onChange={(event) => {
                                this.Correo = event.target.value;
                                this.setState({ errorCorreo: !this.validateEmail(this.Correo) });
                            }} />
                        </div>
                    </div>
                    <div className={`form-group ${errorTelefono ? "has-error" : ""}`}>
                        <label className="control-label col-sm-3" htmlFor="txtTelefono">Teléfono:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="txtTelefono" defaultValue={this.Telefono} onChange={(event) => {
                                this.Telefono = event.target.value;
                            }} />
                        </div>
                    </div>
                    <div className={`form-group ${errorPagina ? "has-error" : ""}`}>
                        <label className="control-label col-sm-3" htmlFor="txtPaginaWeb">Página Web:</label>
                        <div className="col-sm-7">
                            <input type="text" className="form-control" id="txtPaginaWeb" defaultValue={this.PaginaWeb} onChange={(event) => {
                                this.PaginaWeb = event.target.value;
                                this.setState({ errorPagina: !this.validateUrl(this.PaginaWeb) });
                            }} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12" style={{ textAlign: "center", marginTop: "30px" }}>
                            <button id="btnSubmit" type="button" onClick={() => { this.submit(); }} className="btn btn-primary" style={{ padding: "9px 15px 9px 15px" }}>
                                <i className="fa fa-check" aria-hidden="true"></i> <span>Ok</span>
                            </button>
                            <button id="btnCancel" type="button" onClick={() => navigateTo("marcas")} className="btn btn-warning" style={{ padding: "9px 15px 9px 15px" }}>
                                <i className="fa fa-warning" aria-hidden="true"></i> <span>Cancelar</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>;
    }

    private submit() {
        const { errorCorreo, errorNombre, errorPagina, errorTelefono } = this.state;
        const { addMarca, navigateTo, marca, editMarca } = this.props;

        if (errorCorreo || errorNombre || errorPagina || errorTelefono) {
            return;
        }
        if (this.Nombre.length === 0) {
            this.setState({ errorNombre: true })
            return;
        }
        if (this.PaginaWeb !== "") {
            this.PaginaWeb = !this.PaginaWeb.startsWith("http://") && !this.PaginaWeb.startsWith("https://") ? `http://${this.PaginaWeb}` : this.PaginaWeb;
        }

        if (marca === undefined) {
            addMarca({
                Correo: this.Correo,
                Nombre: this.Nombre,
                PaginaWeb: this.PaginaWeb,
                Telefono: this.Telefono,
            }).then(() => {
                navigateTo("marcas");
            });
        } else {
            editMarca({
                IdMarca: marca.IdMarca,
                Correo: this.Correo,
                Nombre: this.Nombre,
                PaginaWeb: this.PaginaWeb,
                Telefono: this.Telefono,
            }).then(() => {
                navigateTo("marcas");
            });
        }
    }

    private validateEmail(email: string): boolean {
        if(email === ""){
            return true;
        }
        const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return emailRegex.test(email);
    }

    private validateUrl(url: string): boolean {
        if(url === ""){
            return true;
        }
        const urlRegex = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);
        return urlRegex.test(url);
    }
}
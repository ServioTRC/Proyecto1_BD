import { PureComponent } from 'react';
import * as React from 'react';
import { Pages } from '../App';
import { Marca } from '../Model';

// const marca: Marca = {
//     Correo: "servicio@pantene.com",
//     Nombre: "Pantene",
//     PaginaWeb: "www.pantene.com",
//     Telefono: "55 5678 7423"
// }  

interface MarcasProps {
    navigateTo: (page: Pages) => void;
    marcas: Marca[];
    removeMarca: (marca: Marca) => void;
    mustEditMarca: (marca: Marca) => void;
    filter: (by: 'marca' | 'producto', query: string) => void;
    resetDatabase: () => void;
    exportToJSON: () => void;
}

export class Marcas extends PureComponent<MarcasProps> {

    private by: 'marca' | 'producto' = "producto";
    private query: string = "";

    public render() {
        const { marcas, navigateTo, removeMarca, mustEditMarca, filter, exportToJSON, resetDatabase } = this.props;
        return <div className="row row-centered " style={{ marginTop: "10px" }}>
            <div className="col-xs-12 col-centered">
                <nav>
                    <div style={{ textAlign: "center" }}>
                        <button id="btnProductos" className="btn btn-info" style={{margin: "5px"}} onClick={()=> {
                            navigateTo("productos");
                        }}><i className="fa fa-user-circle" aria-hidden="true"></i> Productos Registrados</button>
                        <button id="btnAgrMarcas" className="btn btn-primary" onClick={()=>{
                            navigateTo("agregarMarca");
                        }}><i className="fa fa-plus" aria-hidden="true"></i> Marca Nueva</button>
                        <button id="btnExportar" className="btn btn-primary" style={{margin: "5px"}} onClick={()=> {
                            exportToJSON();
                        }}><i className="fa fa-plus" aria-hidden="true"></i> Exportar a JSON</button>
                        <button id="btnInicio" className="btn btn-danger" style={{margin: "5px"}} onClick={()=> {
                            resetDatabase();
                        }}><i className="fa fa-ban" aria-hidden="true"></i> Formatear Sistema</button>
                        <button id="btnAcercaDe" className="btn btn-info" style={{ margin: "5px" }} onClick={() => {
                            navigateTo("acercaDe");
                        }}><i className="fa fa-info" aria-hidden="true"></i> Acerca De</button>
                    </div>
                </nav>
                <table id="tblGrid" className="table table-hover ">
                    <caption style={{ textAlign: "center", padding: "7px 0px 7px 0px", background: "#005B96", color: "white", fontFamily: "Slabo 27px, serif", fontSize: "20px" }}>Detalles de las Marcas</caption>
                    <thead>
                        <tr>
                            <th>Nombre de la Marca</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Página Web</th>
                            <th></th>
                            <th style={{ width: "1px" }}>
                                <div style={{ display: 'flex' }}>
                                    <div style={{ margin: 'auto 10px auto 0', marginRight: '10px' }}>Buscar:</div>
                                    <input type="text" className="form-control col" style={{ width: "150px", margin: 'auto 10px auto 0' }} onChange={(event) => {
                                        this.query = event.target.value.toLowerCase();
                                        this.by = "marca";
                                        filter(this.by, this.query);
                                    }}>
                                    </input>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            marcas.map((marca)=>{
                                return <tr key={marca.IdMarca}>
                                    <td>{marca.Nombre}</td>
                                    <td>{(marca.Correo === "N/A" ?
                                        "N/A"
                                        : <a href={"mailto:" + `${marca.Correo}`}>{marca.Correo}</a>
                                    )}</td>
                                    <td>{(marca.Telefono === "N/A" ?
                                        "N/A"
                                        : <a href={"tel:"+`${marca.Telefono}`}>{marca.Telefono}</a>
                                    )}</td>
                                    <td>{(marca.PaginaWeb == undefined || marca.PaginaWeb === "N/A"?
                                        "N/A"
                                        : <a href={`${marca.PaginaWeb}`}>{marca.PaginaWeb}</a>
                                    )}</td>
                                    <td><button className="btn btn-info" onClick={()=>{
                                        mustEditMarca(marca);
                                    }}>Editar</button></td>
                                    <td><button className="btn btn-danger" onClick={() => {
                                        removeMarca(marca);
                                    }} >Eliminar</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    }
}



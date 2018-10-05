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
    resetDatabase: () => void;
    exportToJSON: () => void;
}

export class Marcas extends PureComponent<MarcasProps> {
    public render() {
        const { marcas, navigateTo, removeMarca, mustEditMarca, exportToJSON, resetDatabase } = this.props;
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
                        <button id="btnInicio" className="btn btn-warning" style={{margin: "5px"}} onClick={()=> {
                            resetDatabase();
                        }}><i className="fa fa-book" aria-hidden="true"></i> Restaurar Sistema</button>
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            marcas.map((marca)=>{
                                return <tr key={marca.IdMarca}>
                                    <td>{marca.Nombre}</td>
                                    <td>{marca.Correo}</td>
                                    <td>{marca.Telefono}</td>
                                    <td><a href={`${marca.PaginaWeb}`}>{marca.PaginaWeb}</a></td>
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



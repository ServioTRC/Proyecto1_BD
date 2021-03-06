import { PureComponent } from 'react';
import * as React from 'react';
import { Pages } from '../App';

interface AcercaDeProps {
    navigateTo: (page: Pages) => void;
}

export class AcercaDe extends PureComponent<AcercaDeProps> {

    public render() {
        const { navigateTo } = this.props;

        return <div className="row row-centered " style={{ marginTop: "10px" }}>
            <div className="col-xs-12 col-centered">
                <nav>
                    <div style={{ textAlign: "center" }}>
                        <h1 style={{ textAlign: "center", padding: "7px 0px 7px 0px", color: "rgb(247, 12, 208)", fontFamily: "Slabo 27px, serif", fontSize: "35px" }}>Acerca De</h1>
                        <hr />
                    </div>
                </nav>
                <h3>Descripción:</h3>
                <h4>Primer proyecto de la materia de Base de Datos Avanzadas:</h4>   
                <h4><i>Creación de Base de Datos con IndexedDB</i></h4>
                <hr />
                <h3>Integrantes:</h3>
                <h4>Ian Neumann Sánchez A01377503</h4>
                <h4>Andrea Salas Navarro A01371357</h4>
                <h4>Servio Tulio Reyes Castillo A01371719</h4>
                <br />
                <hr />
                <div style={{ textAlign: "center" }}>
                    <button id="btnRegresar" className="btn btn-lg" onClick={() => {
                        navigateTo("inicio");
                    }}>Regresar a Pantalla Principal</button>
                </div>
            </div>
        </div>;
    }
}
import { PureComponent } from 'react';
import * as React from 'react';
import { Pages } from '../App';

interface StartPageProps {
    navigateTo: (page: Pages) => void;
}

export class StartPage extends PureComponent<StartPageProps> {
    
    public render() {
        const { navigateTo } = this.props;

        return <div className="row row-centered " style={{ marginTop: "10px" }}>
            <div className="col-xs-12  col-centered">
                <nav>
                    <div style={{textAlign: "center"}}>
                        <h1 style={{textAlign: "center", padding: "7px 0px 7px 0px", color:"#005B96", fontFamily:'Slabo 27px serif', fontSize: "35px"}}>Catálogo de productos</h1>
                        <br/>
                        <hr/>
                    </div>
                </nav>
                <div style={{textAlign: "center"}}>
                    <button id="btnEntrar" className="btn btn-lg" onClick={() => {
                        navigateTo("productos");
                    }}>Ir al catálogo</button>
                    <button id="btnAcerca" className="btn btn-lg" onClick={() => {
                        navigateTo("acercaDe");
                    }}>Acerca De</button>
                </div>
                <br/>
                <hr/>
            </div>
        </div>
    }
}
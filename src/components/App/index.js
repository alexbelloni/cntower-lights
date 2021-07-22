import React, { Component } from 'react';
import './App.css';
import {
    Navbar,
    NavbarBrand,
} from 'reactstrap';
import Schedule from '../../containers/Schedule';
import Footer from '../../containers/Footer';
import Links from '../../containers/Links';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div id="nav-div" className="bg-light">
                    <div id="nav-main" className="container">
                        <Navbar color="light" light expand="md">
                            <NavbarBrand href="/" className="App-title">CNTower Lights</NavbarBrand>
                        </Navbar>
                    </div>
                </div>
                <Schedule />
                <Links />
                <Footer />
            </div >
        );
    }
}

export default App;

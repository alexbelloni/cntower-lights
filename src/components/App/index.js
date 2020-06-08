import React, { Component } from 'react';
import './App.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import Main from '../Main';
import Footer from '../../containers/Footer';
import Links from '../../containers/Links';

class App extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <div id="nav-div" className="bg-light">
                    <div id="nav-main" className="container">
                        <Navbar color="light" light expand="md">
                            <NavbarBrand href="/" className="App-title">CNTower Lights</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink href="https://github.com/alexbelloni/cntowerlights">Github</NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </div>
                </div>
                <Main />
                <Links />
                <Footer />
            </div >
        );
    }
}

export default App;

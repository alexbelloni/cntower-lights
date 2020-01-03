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
import { getHomepageRoot } from '../../routeUtil';
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
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/" className="App-title">CN Tower Lights</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                
                            <NavItem>
                                <NavLink href="https://github.com/alexbelloni/cntowerlights">Github</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                <Main />
                <Links />
                <Footer />
            </div>
        );
    }
}

export default App;

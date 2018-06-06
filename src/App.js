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
import Main from './components/Main';

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
                <Navbar color="inverse" light expand="md">
                    <NavbarBrand href="/" className="App-title">CN Tower Lights</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>                                
                                <NavLink href="/about">About</NavLink>
                                <NavLink href="https://github.com/alexbelloni/cntowerlights">Github</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>

                <Main />
            </div>
        );
    }
}

export default App;

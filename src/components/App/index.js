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
                        <div style={{ padding: '10px', textAlign: 'center', background: '#ffcccb' }}>2022-05-26 .
                            Due to web scraping issues, the current month was fixed in April.
                            Real schedule on <a href='https://www.cntower.ca/lighting-schedule'>cntower.ca/lighting-schedule</a></div>
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

import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Jumbotron,
    Button
} from 'reactstrap';
import Calendar from 'react-calendar';
import {getStatus} from './lightingSchedule';

class App extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            date: new Date(),
        };
        this.onChange = date => this.setState({ date })
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
                    <NavbarBrand href="/">CN Tower Lights</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="https://github.com/alexbelloni/cntowerlights">Github</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                
                <Jumbotron>
                    <Container>
                        <Row>
                            <Col>
                                <h1>Tower's Status</h1>
                            </Col>                            
                        </Row>                        
                        <Row>
                            <Col>
                            <h3>Date</h3>
                            <Calendar
                                onChange={this.onChange}
                                value={this.state.date}
                                />
                            </Col>    
                            <Col>
                                <h3>Detail</h3>
                                <Container>
                                <Row>
                                        <Col>
                                        <p>Date:</p>
                                        </Col>    
                                        <Col>
                                        <p>{this.state.date.toString()}</p>
                                        </Col>                                                                 
                                    </Row>                                     
                                    <Row>
                                        <Col>
                                        <p>Occasion:</p>
                                        </Col>    
                                        <Col>
                                        <p>{getStatus(this.state.date.getMonth(), this.state.date.getDate()).occasion}</p>
                                        </Col>                                                                 
                                    </Row> 
                                    <Row>
                                        <Col>
                                        <p>Colour:</p>
                                        </Col>   
                                        <Col>
                                        <p>{getStatus(this.state.date.getMonth(), this.state.date.getDate()).colour}</p>
                                        </Col>                                                                  
                                    </Row>                                          
                                </Container>
                            </Col>                                  
                        </Row>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}

export default App;

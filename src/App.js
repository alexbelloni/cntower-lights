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
                    
                <h2 style={{textAlign:'center', paddingBottom:10}}>{this.state.date.toDateString()}</h2>

                    <Container>
                        <Row>
                            <Col>
                                <Container>
                                    <Row>  
                                        <Col>
                                            <figure class="figure" class="text-center">
                                                <img src="tower.png" class="rounded" alt="CN Tower Image"/>
                                                <figcaption class="figure-caption">CN Tower - Toronto</figcaption>
                                            </figure>
                                        </Col>                                         
                                        <Col>
                                            <p>{getStatus(this.state.date.getMonth(), this.state.date.getDate()).colour}</p>
                                            <p>{getStatus(this.state.date.getMonth(), this.state.date.getDate()).occasion}</p>
                                        </Col>                                                                 
                                    </Row>                                     
                                </Container>
                            </Col>  
                            <Col>
                                <Container>
                                    <Row>  
                                        <Col>
                                            <Calendar
                                                locale="en-US"
                                                onChange={this.onChange}
                                                value={this.state.date}
                                                minDate={new Date(2018, 4, 1)}
                                                maxDate={new Date(2018, 4, 31)}
                                                minDetail="month"
                                            />
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

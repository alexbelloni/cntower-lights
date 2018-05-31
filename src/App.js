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
    Container,
    Row,
    Col,
    Jumbotron
} from 'reactstrap';
import Calendar from 'react-calendar';
import { getStatus } from './lightingSchedule';
import TowerPicture from './components/TowerPicture';

const DetailArea = (props) => (
    <div>
        <p>{props.status ? props.status.colours : ''}</p>
        <p>{props.status ? props.status.occasion : ''}</p>
    </div>
)

class App extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            date: new Date(),
            towerStatus: null
        };
        this.onChange = date => this.setState({ date, towerStatus: getStatus(date.getMonth(), date.getDate()) })
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    componentDidMount() {
        this.setState({ towerStatus: getStatus(this.state.date.getMonth(), this.state.date.getDate()) })
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
                                <NavLink href="https://github.com/alexbelloni/cntowerlights">Github</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>

                <Jumbotron>

                    <h2 className="App-date">{this.state.date.toDateString()}</h2>

                    <Container>
                        <Row>
                            <Col>
                                <Container>
                                    <Row>
                                        <Col>
                                            <TowerPicture status={this.state.towerStatus} />
                                        </Col>
                                        <Col>
                                            <DetailArea status={this.state.towerStatus} />
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

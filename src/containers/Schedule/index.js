import React, { Component } from 'react';
import TowerPicture from '../../components/TowerPicture';
import {
    Container,
    Row,
    Col,
    Jumbotron
} from 'reactstrap';
import { getStatus, getScheduleInfo } from '../../lightingSchedule';
import Calendar from 'react-calendar';

const DetailArea = (props) => (
    <div>
        <p>{props.status ? props.status.colours : ''}</p>
        <p>{props.status ? props.status.occasion : ''}</p>
    </div>
)

class Schedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            towerStatus: null
        };
        this.onChange = date => this.setState({ date, towerStatus: getStatus(date.getMonth(), date.getDate()) })
    }    

    componentDidMount() {
        this.setState({ towerStatus: getStatus(this.state.date.getMonth(), this.state.date.getDate()) })
    }

    render() {
        return (
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
                                                minDate={getScheduleInfo().firstDate}
                                                maxDate={getScheduleInfo().lastDate}
                                                minDetail="month"
                                            />
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
        );
    }    
}

export default Schedule;
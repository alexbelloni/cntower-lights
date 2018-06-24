import React, { Component } from 'react';
import TowerPicture from '../../components/TowerPicture';
import {
    Container,
    Row,
    Col,
    Jumbotron
} from 'reactstrap';
import TowerInfo from '../../lightingSchedule';
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

        const towerInfo = new TowerInfo();

        this.state = {
            date: new Date(),
            status: null,
            schedule: null
        };

        this.onChange = (date) => {
            if (date) {
                const status = towerInfo.getStatusByDay(date.getDate(), this.state.schedule);
                this.setState({ date, status: status });
            }
        }
    }

    componentDidMount() {
        const day = this.state.date.getDate();
        const towerInfo = new TowerInfo();
        const me = this;
        towerInfo.getSchedule(function(json){
            const status = towerInfo.getStatusByDay(day, json);
            me.setState({ status: status, schedule: json })
        });
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
                                        <TowerPicture status={this.state.status} />
                                    </Col>
                                    <Col>
                                        <DetailArea status={this.state.status} />
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
                                            minDate={new Date(2018, 5, 1)}
                                            maxDate={new Date(2018, 5, 29)}
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
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

function getFormatDate(d) {
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    return curr_month + "-" + curr_date + "-" + curr_year;
}

const Occasion = (props) => (
    <div>
        <p>{props.colourCaption}</p>
        <p>{props.occasions}</p>
    </div>
);

function getConfigAreas(configs) {
    const colours = [];
    configs.forEach((element, index) => {
        colours.push(
            <Occasion key={index} colourCaption={element.colourCaption} occasions={element.occasions} />
        )
    }, colours);
    return colours;
}

const DetailArea = (props) => (
    <div>
        <h2 className="App-date">{getFormatDate(props.date)}</h2>
        {getConfigAreas(props.configs)}
    </div>
)

class Schedule extends Component {
    constructor(props) {
        super(props);

        const towerInfo = new TowerInfo();

        this.state = {
            date: new Date(),
            configs: null,
            schedule: null,
            firstDay: new Date(2018, 5, 1),
            lastDay: new Date(2018, 5, 30),
        };

        this.onChange = (date) => {
            if (date) {
                const configs = towerInfo.getConfigsByDay(date.getDate(), this.state.schedule);
                this.setState({ date, configs: configs });
            }
        }
    }

    componentDidMount() {
        const day = this.state.date.getDate();
        const towerInfo = new TowerInfo();
        const me = this;
        towerInfo.getSchedule(function (json) {
            const configs = towerInfo.getConfigsByDay(day, json);
            const month = me.state.date.getMonth();
            const year = me.state.date.getFullYear();
            const lastDay = new Date(year, month + 1, 0);
            me.setState({ configs: configs, schedule: json, firstDay: new Date(year, month, 1), lastDay: lastDay })
        });
    }

    render() {
        let pictureArea = '';
        let detailArea = ';'
        if (this.state.configs) {
            pictureArea = <TowerPicture configs={this.state.configs} />;
            detailArea = <DetailArea configs={this.state.configs} date={this.state.date} />;
        }
        return (
            <Jumbotron>
                <Container>
                    <Row>
                        <Col>
                            <Container>
                                <Row>
                                    <Col>
                                        {pictureArea}
                                    </Col>
                                    <Col>
                                        {detailArea}
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
                                            minDate={this.state.firstDay}
                                            maxDate={this.state.lastDay}
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
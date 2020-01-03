import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Jumbotron
} from 'reactstrap';
import TowerInfo from '../../lightingSchedule';
import loading from '../../assets/loading.gif';
import Days from '../../containers/Days';
import './Schedule.css';
import facebook from '../../assets/facebook.png';
import instagram from '../../assets/instagram.png';
import twitter from '../../assets/twitter.png';
import cntower from '../../assets/cntower.png';

function getFormatDate(d, monthName) {
    var curr_date = d.getDate();
    var curr_year = d.getFullYear();
    return monthName + ' ' + curr_date + ", " + curr_year;
}

const Occasion = (props) => {

    const colours = props.colours.map(colour => {
        const classname = 'colour-square ' + colour;
        return <span key={Math.random()} className={classname}>{colour}</span>
    })
    return (
        <div>
            <p key={Math.random()} className='occasion'>{props.occasions}</p>
            <p key={Math.random()}>{colours}</p>
            <p key={Math.random()} className='colour-caption'>{props.colourCaption}</p>
        </div>
    );
}

function getConfigAreas(configs) {
    const colours = [];
    configs.forEach((element, index) => {
        colours.push(
            <li key={index}><Occasion colours={element.colours} colourCaption={element.colourCaption} occasions={element.occasions} /></li>
        )
    }, colours);
    return (
        <div>
            <ul>
                {colours}
            </ul>
        </div>
    );
}

const DetailArea = (props) => (
    <div>
        <h2 className="App-date">{getFormatDate(props.date, props.monthName)}</h2>
        {getConfigAreas(props.configs)}
        <p>Toronto, ON, Canada</p>
    </div>
)

class Schedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            configs: null,
            schedule: null,
            loaded: false,
        };
    }

    componentDidMount() {
        const day = this.state.date.getDate();
        const me = this;

        const towerInfo = new TowerInfo()
        towerInfo.getSchedule(function (json) {
            const configs = towerInfo.getConfigsByDay(day, json);
            me.setState({ configs, schedule: json, loaded: true })
        });
    }

    handleDayClick = (day) => {
        const _day = day || (new Date()).getDate()
            const today = this.state.date;
            const clicked = new Date(today.getFullYear(), today.getMonth(), _day);
            const towerInfo = new TowerInfo();
            const configs = towerInfo.getConfigsByDay(_day, this.state.schedule);
            this.setState({ date: clicked, configs });
     
    }

    render() {
        let detailArea = ';'
        if (this.state.configs) {
            detailArea = <DetailArea configs={this.state.configs} date={this.state.date} monthName={this.state.schedule.month} />;
        }

        let row = this.state.loaded ?
            (<div>
                <img src={cntower} /><span className='cntower-icon-title'>CNTower</span>
                <Row>
                    <Col>
                        {detailArea}
                    </Col>
                    <Col>
                        <Days currentDay={this.state.date.getDate()} month={this.state.schedule.month} days={this.state.schedule.dates} onClick={this.handleDayClick} />
                    </Col>
                </Row>
                {/* <p><img className='social-media' src={facebook} /><img className='social-media' src={instagram} /><img className='social-media' src={twitter} /></p> */}
            </div>
            ) :
            (<img src={loading} />);
        row = (<Row><Col><Container>{row}</Container></Col></Row>);
        return (
            <Jumbotron>
                <Container>
                    <h1>How colorful is it?</h1>
                    <hr />
                    {row}
                </Container>
            </Jumbotron>
        );
    }
}

export default Schedule;
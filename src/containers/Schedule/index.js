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

        const towerInfo = new TowerInfo();

        this.state = {
            date: new Date(),
            configs: null,
            schedule: null,
            loaded: false,
        };
    }

    componentDidMount() {
        const day = this.state.date.getDate();
        const towerInfo = new TowerInfo();
        const me = this;

        if (process.env.NODE_ENV === 'development') {
            const json = { "month": "September", "dates": [{ "day": 2, "configs": [{ "occasions": "Dystonia Awareness Month", "colourCaption": "Royal blue and white", "colours": ["royal", "blue", "white"] }] }, { "day": 3, "configs": [{ "occasions": "Blood Cancer Awareness Month", "colourCaption": "Red", "colours": ["red"] }] }, { "day": 4, "configs": [{ "occasions": "Labour Day", "colourCaption": "Red and White", "colours": ["red", "white"] }] }, { "day": 6, "configs": [{ "occasions": "Toronto International Film Festival Opening NIght", "colourCaption": "Orange", "colours": ["orange"] }] }, { "day": 7, "configs": [{ "occasions": "OneWalk to Conquer Cancer", "colourCaption": "Pink, purple and blue", "colours": ["pink", "purple", "blue"] }, { "occasions": "10th Anniversary Stand Up To Cancer (SU2C)", "colourCaption": "Red and orange", "colours": ["red", "orange"] }] }, { "day": 8, "configs": [{ "occasions": "World Literacy Day", "colourCaption": "Orange and red", "colours": ["orange", "red"] }] }, { "day": 9, "configs": [{ "occasions": "Parkinson's Awareness", "colourCaption": "Red and blue", "colours": ["red", "blue"] }] }, { "day": 10, "configs": [{ "occasions": "World Suicide Prevention Day", "colourCaption": "Orange and yellow", "colours": ["orange", "yellow"] }, { "occasions": "Thyroid Cancer Awareness Month", "colourCaption": "Pink, teal and blue", "colours": ["pink", "teal", "blue"] }] }, { "day": 11, "configs": [{ "occasions": "Pain Awareness Month (PAM)", "colourCaption": "Blue", "colours": ["blue"] }] }, { "day": 13, "configs": [{ "occasions": "Sunshine After Dark", "colourCaption": "Yellow", "colours": ["yellow"] }] }, { "day": 14, "configs": [{ "occasions": "Prostate Cancer Awareness Month", "colourCaption": "Blue", "colours": ["blue"] }, { "occasions": "Histiocytosis Awareness Day", "colourCaption": "Red", "colours": ["red"] }] }, { "day": 15, "configs": [{ "occasions": "World Lymphoma Awareness Day", "colourCaption": "Red", "colours": ["red"] }, { "occasions": "30th Anniversary of Aids Walk Toronto", "colourCaption": "Red, white and black", "colours": ["red", "white", "black"] }] }, { "day": 16, "configs": [{ "occasions": "Toronto International Film Festival Closing NIght", "colourCaption": "Orange", "colours": ["orange"] }] }, { "day": 17, "configs": [{ "occasions": "Mitochondrial Disease Awareness Week", "colourCaption": "Green", "colours": ["green"] }] }, { "day": 18, "configs": [{ "occasions": "Big Brothers Big Sisters Day Toronto", "colourCaption": "Purple", "colours": ["purple"] }] }, { "day": 19, "configs": [{ "occasions": "Pulmonary Fibrosis Awareness Month", "colourCaption": "Red and blue", "colours": ["red", "blue"] }] }, { "day": 20, "configs": [{ "occasions": "Interstitial Cystitis Awareness Month", "colourCaption": "Teal", "colours": ["teal"] }] }, { "day": 21, "configs": [{ "occasions": "International Day of Peace", "colourCaption": "Red and white", "colours": ["red", "white"] }] }, { "day": 22, "configs": [{ "occasions": "National Coaches Week", "colourCaption": "Blue, yellow and red", "colours": ["blue", "yellow", "red"] }, { "occasions": "Free-Them Freedom Walk", "colourCaption": "Purple", "colours": ["purple"] }, { "occasions": "National Learn to Code Day", "colourCaption": "Purple", "colours": ["purple"] }] }, { "day": 24, "configs": [{ "occasions": "Police and Peace Officers' National Memorial Day", "colourCaption": "Blue", "colours": ["blue"] }, { "occasions": "UN Women HeForShe", "colourCaption": "Magenta", "colours": ["magenta"] }] }, { "day": 25, "configs": [{ "occasions": "Franco Ontarian Day", "colourCaption": "Green and white", "colours": ["green", "white"] }, { "occasions": "National Forest Week", "colourCaption": "Green", "colours": ["green"] }] }, { "day": 28, "configs": [{ "occasions": "174th Anniversary of Markham Fair", "colourCaption": "Orange, yellow and red", "colours": ["orange", "yellow", "red"] }] }, { "day": 29, "configs": [{ "occasions": "World Heart Day", "colourCaption": "Red", "colours": ["red"] }] }] };
            const configs = towerInfo.getConfigsByDay(day, json);
            me.setState({ configs, schedule: json, loaded: true })
        } else {
            towerInfo.getSchedule(function (json) {
                console.log(JSON.stringify(json));
                const configs = towerInfo.getConfigsByDay(day, json);
                me.setState({ configs, schedule: json, loaded: true })
            });
        }
    }

    handleDayClick = (day) => {
        if (day) {
            const today = this.state.date;
            const clicked = new Date(today.getFullYear(), today.getMonth(), day);
            const towerInfo = new TowerInfo();
            const configs = towerInfo.getConfigsByDay(day, this.state.schedule);
            this.setState({ date: clicked, configs });
        }
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
                <p><img className='social-media' src={facebook} /><img className='social-media' src={instagram} /><img className='social-media' src={twitter} /></p>
            </div>
            ) :
            (<img src={loading} />);
        row = (<Row><Col><Container>{row}</Container></Col></Row>);
        return (
            <Jumbotron>
                <Container>
                    <h1>How will CNTower look like?</h1>
                    <hr />
                    {row}
                </Container>
            </Jumbotron>
        );
    }
}

export default Schedule;
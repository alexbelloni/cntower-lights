import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Jumbotron
} from 'reactstrap';
import TowerInfo from '../../lightingSchedule';
import Loading from '../../components/Loading';
import Days from '../../containers/Days';
import './Schedule.css';
import cntower from '../../assets/cntower.png';
import { Twitter } from 'react-sharingbuttons';
import 'react-sharingbuttons/dist/main.css';
import { DateString, getMonthNames } from '../../components/Date';
import AddToCalendar from '../../components/AddToCalendar';
import ExternalLink from '../../components/ExternalLink';

const Occasion = (props) => {
    const _colours = props.colours;
    //const _colours = ["green","green","green","green","green","green","green","green",];
    const colours = _colours.map(colour => {
        const classname = 'colour-square ' + colour;
        return <span key={Math.random()} className={classname}>{colour}</span>
    })

    const colourCaption = props.colourCaption;

    const startDate = props.date;
    startDate.setHours(12);
    startDate.setMinutes(0);

    return (
        <div className="occasion">
            <div className="title">
                <span key={Math.random()} className='occasion'>{props.occasions}</span>
                <div className="icons">
                    <AddToCalendar title={props.occasions} start={startDate} />
                    <ExternalLink href={`https://www.google.com/search?q=${props.occasions.toLowerCase().split(' ').join('+')}`} />
                </div>
            </div>

            <div className="colours">
                {colours}
            </div>
            <p key={Math.random()} className='colour-caption'>{colourCaption}</p>
            <SharingButtons text={`On ${props.dateString}, Toronto's #CNTower 🇨🇦 will be --${props.colours.join(',')}-- because of the ${props.occasions}. #TourCN #mycntower @TourCNTower @xbelloni `} />
        </div>
    );
}

function getConfigAreas(configs, dateString, date) {
    const colours = [];
    configs.forEach((element, index) => {
        let colourCaption = "";
        try {
            colourCaption = (typeof element.colourCaption) === "string" ? colourCaption : "";
        } catch { }

        colours.push(
            <li key={index}><Occasion dateString={dateString} date={date} colours={element.colours} colourCaption={colourCaption} occasions={element.occasions} /></li>
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

const DetailArea = (props) => {
    function getFormatDate(date, monthName) {
        return `${monthName} ${date.getDate()}`
    }

    return (
        <div>
            <h2 className="App-date"><DateString date={props.date} monthName={props.monthName} /></h2>

            {props.configs && getConfigAreas(props.configs, getFormatDate(props.date, props.monthName), props.date)}
            <Loading isLoading={!props.loaded} />
        </div>
    );
}

const SharingButtons = (props) => {
    const url = 'https://cntowerlights.netlify.app'

    return (
        <div className="SharingButtons">
            <span>Share on</span>
            <Twitter url={url} shareText={props.text} />
        </div>
    )
}

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: this.getToday(),
            configs: null,
            schedule: null,
            loaded: false,
        };
    }

    getToday() {
        //return new Date(2020, 6, 1);//"2020-07-01"
        return new Date();
    }

    getTodayMonth() {
        return this.getToday().getMonth();
    }

    getTheDateThatWorks(json) {
        const sameJsonMonthDate = new Date(`${json.month} 1, 2020`)
        const jsonMonth = sameJsonMonthDate.getMonth();

        const today = this.getToday();
        const currentMonth = today.getMonth();

        const isSameMonth = jsonMonth === currentMonth;

        return { date: isSameMonth ? today : new Date(today.getFullYear(), jsonMonth, 1), isSameMonth }
    }

    componentDidMount() {
        const me = this;
        const towerInfo = new TowerInfo();

        function setSchedule(json) {
            if (!json || json.length === 0) {
                me.setState({ loaded: true })
                return
            }
            const monthName = getMonthNames()[me.getTodayMonth()];
            const obj = json.filter(o => o.month === monthName)[0];
            if (!obj || obj.dates === 0) {
                me.setState({ loaded: true })
                return
            }

            const date = me.getTheDateThatWorks(obj).date
            const configs = towerInfo.getConfigsByDay(date.getDate(), obj);
            me.setState({ configs, schedule: obj, loaded: true, date, isSameMonth: date.isSameMonth })
        }

        towerInfo.getSchedule(setSchedule);

        // const json = { "month": "March", "dates": [{ "day": 1, "configs": [{ "occasions": "National Engineering Month", "colourCaption": "Purple", "colours": ["purple"] }] }, { "day": 5, "configs": [{ "occasions": "Restoring Smiles Foundation", "colourCaption": "Purple and white", "colours": ["purple", "white"] }] }, { "day": 6, "configs": [{ "occasions": "Colorectal Cancer Alliance", "colourCaption": "Medium blue, dark blue and mint blue", "colours": ["blue", "mint"] }, { "occasions": "World Lymphedema Day", "colourCaption": "Teal", "colours": ["teal"] }] }, { "day": 8, "configs": [{ "occasions": "International Women's Day", "colourCaption": "Pink", "colours": ["pink"] }] }, { "day": 9, "configs": [{ "occasions": "Commonwealth Day", "colourCaption": "Red and white", "colours": ["red", "white"] }] }, { "day": 12, "configs": [{ "occasions": "World Kidney Day", "colourCaption": "Orange", "colours": ["orange"] }] }, { "day": 17, "configs": [{ "occasions": "Saint Patrick's Day", "colourCaption": "Green", "colours": ["green"] }] }, { "day": 19, "configs": [{ "occasions": "First Day of Spring", "colourCaption": "Green and yellow (top of the hour effect)", "colours": ["green", "yellow"] }] }, { "day": 20, "configs": [{ "occasions": "International Francophonie Day", "colourCaption": "Red, blue, yellow, green and purple", "colours": ["red", "blue", "yellow", "green", "purple"] }] }, { "day": 21, "configs": [{ "occasions": "World Down Syndrome Day", "colourCaption": "Yellow and blue", "colours": ["yellow", "blue"] }, { "occasions": "International Day for Elimination of Racial Discrimination", "colourCaption": "Red", "colours": ["red"] }] }, { "day": 22, "configs": [{ "occasions": "World Water Day", "colourCaption": "Blue", "colours": ["blue"] }] }, { "day": 24, "configs": [{ "occasions": "World Tuberculosis (TB) Day", "colourCaption": "Red", "colours": ["red"] }] }, { "day": 26, "configs": [{ "occasions": "Purple Day for Epilepsy Awareness", "colourCaption": "Purple", "colours": ["purple"] }] }, { "day": 28, "configs": [{ "occasions": "Earth Hour", "colourCaption": "The CNTower joins the City of Toronto and residents in support of the Earth Hour movement to raise awareness of the fight against climate change.  All exterior lights will be dimmed from 8:30-9:30pm.", "colours": [] }] }] }
        // setSchedule(json);        
    }

    handleDayClick = (day) => {
        const clicked = new Date(this.state.currentDate.getFullYear(), this.state.currentDate.getMonth(), day);
        const towerInfo = new TowerInfo();
        const configs = towerInfo.getConfigsByDay(day, this.state.schedule);
        this.setState({ currentDate: clicked, configs });
    }

    render() {
        const detailArea = this.state.loaded ?
            <DetailArea configs={this.state.configs} date={this.state.currentDate} monthName={this.state.schedule && this.state.schedule.month} loaded={true} /> :
            <DetailArea date={this.state.currentDate} loaded={false} />;

        return (
            <Jumbotron>
                <Container>
                    <h1>How colorful is it?</h1>
                    <hr />
                    <div>
                        <img src={cntower} alt="cntower logo" /><span className='cntower-icon-title'>CNTower</span>
                        <Row>
                            <Col sm='12' md='6'>
                                {detailArea}
                            </Col>
                            <Col sm='12' md='6'>
                                {this.state.loaded && this.state.schedule &&
                                    <Days today={this.getToday()} currentDay={this.state.currentDate.getDate()} month={this.state.schedule.month} days={this.state.schedule.dates} isSameMonth={this.state.isSameMonth} onClick={this.handleDayClick} />

                                }
                                <Loading isLoading={!this.state.loaded} />
                            </Col>
                        </Row>
                    </div>
                </Container>
            </Jumbotron>
        );
    }
}

export default Schedule;
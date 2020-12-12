import React, { Component } from 'react';
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import TowerInfo from '../../lightingSchedule';
import Loading from '../../components/Loading';
import Days from '../../containers/Days';
import './Schedule.css';
import cntower from '../../assets/cntower.png';
import 'react-sharingbuttons/dist/main.css';
import { DateString, getMonthNames } from '../../components/Date';
import AddToCalendar from '../../components/AddToCalendar';
import ExternalLink from '../../components/ExternalLink';
import TwitterButton from '../../components/TwitterButton';

const Occasion = (props) => {
    const { date, colours, colourCaption, occasions, dateString } = props;
    const colourSquares = colours.map((colour, i) => {
        const classname = `colour-square ${colour}`;
        return <span key={i} className={classname}>{colour}</span>
    })

    const calendarDate = date;
    calendarDate.setHours(12);
    calendarDate.setMinutes(0);

    return (
        <div className="occasion">
            <div className="title">
                <span className='occasion'>{occasions}</span>
                {occasions !== 'Standard lighting program' &&
                    <div className="icons">
                        {calendarDate.getDate() !== (new Date()).getDate() && <AddToCalendar title={occasions} start={calendarDate} />}
                        <ExternalLink href={`https://www.google.com/search?q=${occasions.toLowerCase().split(' ').join('+')}`} />
                    </div>
                }

            </div>

            <div className="colours">
                {colourSquares}
            </div>
            <p key={Math.random()} className='colour-caption'>{colourCaption}</p>
            <TwitterButton text={`On ${dateString}, Toronto's #CNTower 🇨🇦 will be --${colours.join(',')}-- because of the ${occasions}. #TourCN #mycntower @TourCNTower @xbelloni `} />
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
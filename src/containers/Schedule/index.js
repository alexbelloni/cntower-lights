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
import cntower from '../../assets/cntower.png';
import { Facebook, Twitter } from 'react-sharingbuttons'
import 'react-sharingbuttons/dist/main.css'

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
            <SharingButtons text={`On ${props.dateString}, Toronto's CN Tower 🇨🇦 will be --${props.colours.join(',')}-- because of the ${props.occasions}. @TourCNTower @xbelloni`}/>
        </div>
    );
}

function getConfigAreas(configs, dateString) {
    const colours = [];
    configs.forEach((element, index) => {
        colours.push(
            <li key={index}><Occasion dateString={dateString} colours={element.colours} colourCaption={element.colourCaption} occasions={element.occasions} /></li>
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
    return (
        <div>
            <h2 className="App-date">{getFormatDate(props.date, props.monthName)}</h2>
            {getConfigAreas(props.configs, getFormatDate(props.date, props.monthName))}           
        </div>
    );
}

const SharingButtons = (props) => {
    const url = 'https://cntowerlights.netlify.com'
  
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
            date: new Date(),
            configs: null,
            schedule: null,
            loaded: false,
        };
    }

    getTheDateThatWorks(json) {
        const sameJsonMonthDate = new Date(`${json.month} 1, 2020`)
        const jsonMonth = sameJsonMonthDate.getMonth();

        const today = new Date()
        const currentMonth = today.getMonth();

        const isSameMonth = jsonMonth === currentMonth;

        return { date: isSameMonth ? today : new Date(today.getFullYear(), jsonMonth, 1), isSameMonth }
    }

    componentDidMount() {
        const me = this;

        const towerInfo = new TowerInfo()
        towerInfo.getSchedule(function (json) {
            const date = me.getTheDateThatWorks(json).date
            const configs = towerInfo.getConfigsByDay(date.getDate(), json);
            me.setState({ configs, schedule: json, loaded: true, date, isSameMonth: date.isSameMonth })
        });
    }

    handleDayClick = (day) => {
        const clicked = new Date(this.state.date.getFullYear(), this.state.date.getMonth(), day);
        const towerInfo = new TowerInfo();
        const configs = towerInfo.getConfigsByDay(day, this.state.schedule);
        this.setState({ date: clicked, configs });

    }

    render() {
        let detailArea = ';'
        if (this.state.configs) {
            detailArea = <DetailArea configs={this.state.configs} date={this.state.date} monthName={this.state.schedule.month} />;
        }

        let row = this.state.loaded ?
            (<div>
                <img src={cntower} alt="cntower logo" /><span className='cntower-icon-title'>CNTower</span>
                <Row>
                    <Col sm='12' md='6'>
                        {detailArea}
                    </Col>
                    <Col sm='12' md='6'>
                        <Days currentDay={this.state.date.getDate()} month={this.state.schedule.month} days={this.state.schedule.dates} isSameMonth={this.state.isSameMonth} onClick={this.handleDayClick} />
                    </Col>
                </Row>

            </div>
            ) :
            (<img src={loading} alt='' />);
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
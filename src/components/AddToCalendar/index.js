import React from 'react';
import { createCalendar } from './OuiCal';
import CalendarImg from '../../assets/calendar.png';

const AddToCalendar = props => {
    const {title, start} = props;
    const params = {
        data: {
            title,
            start,
            duration: 15,
            address: 'https://cntowerlights.netlify.app/',
            description: "Reminder by CNTower Lights https://cntowerlights.netlify.app/"
        }
    };
    const hrefObj = createCalendar(params);

    return !hrefObj ? '' : (
        <div>
            <a href={hrefObj.google} target='_blank' rel="noopener noreferrer"><img src={CalendarImg} /></a>
        </div>
        )
}

export default AddToCalendar;
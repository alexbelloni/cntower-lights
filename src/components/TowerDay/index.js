import React from 'react';
import './TowerDay.css';

const Day = (props) => {
    const {currentDay, day, onClick} = props;
    const classname = `day ${currentDay === day ? 'current' : ''} ${new Date().getDate() > parseInt(day) ? 'passed' : ''}`;
    return (
        <a href="." className={classname} onClick={e => { e.preventDefault(); onClick(day) }}>{day}</a>
    );
}

export default Day;
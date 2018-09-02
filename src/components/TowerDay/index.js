import React from 'react';
import './TowerDay.css';

const Day = (props) => {
    const classname = 'day ' + (props.currentDay === props.day ? 'current' : '');
    return (
        <span className={classname} onClick={()=>props.onClick(props.day)}>{props.day}</span>
    );
}

export default Day;
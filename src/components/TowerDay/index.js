import React from 'react';
import './TowerDay.css';

const Day = (props) => {
    const classname = 'day ' + (props.currentDay === props.day ? 'current' : '');
    return (
        <a href="#" className={classname} onClick={()=>props.onClick(props.day)}>{props.day}</a>
    );
}

export default Day;
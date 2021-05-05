import React from "react"
import "./style.css";

const DateString = props => {
    var monthNames = getMonthNames();

    const { date } = props;
    var curr_date = date.getDate();
    var curr_year = date.getFullYear();
    return (
        <div className="datestring">
            <div className="month">
                {(props.monthName || monthNames[date.getMonth()]) + ' ' + curr_date + ", " + curr_year}
            </div>
            <div className="day-of-week">
                {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()]}
            </div>
        </div>
    );
}

const getMonthNames = _ => {
    return ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
}

export { DateString, getMonthNames };

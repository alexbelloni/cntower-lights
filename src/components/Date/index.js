import React from "react"

const DateString = props => {
    var monthNames = getMonthNames();

    const { date } = props;
    var curr_date = date.getDate();
    var curr_year = date.getFullYear();
    return (<div> {(props.monthName || monthNames[date.getMonth()]) + ' ' + curr_date + ", " + curr_year} </div>);
}

const getMonthNames = _ => {
    return ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
}

export { DateString, getMonthNames };

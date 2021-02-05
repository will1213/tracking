import React, { Component } from "react";
import NavBar from "../components/NavBar";
import MyCalendar from "../components/Calendar";

class CalendarPage extends React.Component {
    constructor(props){
        super (props);

    }

    render(){
        return(
            <React.Fragment>
                <MyCalendar/>
            </React.Fragment>
        )
    }
}
export default CalendarPage;
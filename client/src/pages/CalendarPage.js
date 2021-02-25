import React, { Component } from "react";
import NavBar from "../components/NavBar";
import MyCalendar from "../components/Calendar";
import "../styles/CalendarPage.css";
import { Button } from "react-bootstrap";
import { db} from "../components/db";
import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from "react";
import Calendar from 'react-calendar';

const serviceAccount = require("../serviceAccountKey.json");


function MyModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Here is your classes for {}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


function GetGoogleEvent(props) {

    var gapi = window.gapi

    const [show, setShow] = useState(false);

    const [event, setEvent] = useState([]);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    const handleClick = () => {
      
      gapi.load('client:auth2', () => {
        console.log('loaded client')
        gapi.client.init({
          apiKey: process.env.REACT_APP_API_KEY,
          clientId: process.env.REACT_APP_CLIENT_ID,
          discoveryDocs: process.env.REACT_APP_DISCOVERY_DOCS,
          scope: process.env.REACT_APP_SCOPES,
        })
  
        gapi.client.load('calendar', 'v3', () => console.log('bam!'))
  
        gapi.auth2.getAuthInstance().signIn()
        .then(() => {

          // get events
          var startOfTheDay = new Date(props.date);
          startOfTheDay.setHours(0,0,0,0)
          var endOfTheDay = new Date(props.date);
          endOfTheDay.setHours(23,59,59,999)
          console.log(startOfTheDay,endOfTheDay)

          gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': startOfTheDay.toISOString(),
            'timeMax': endOfTheDay.toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime',
          }).then(response => {
            console.log(response)
            setShow(true);
            const events = response.result.items
            console.log('EVENTS: ', events)
            console.log(typeof("events"));

            setEvent(events);
            console.log('EVENTS222: ', event)
            event.forEach(element => {
              console.log('EVENTS: ', element.summary)
            });
            //alert('EVENTS: ', events.summary)
          })
          
      
  
        })
      })
    }
  

  
    return (

          
          <>
          <Button  onClick={handleClick}>Get Next Event</Button>
 

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Events on {props.date.toDateString()}</Modal.Title>
        </Modal.Header>
  
        {event.map( element => <Modal.Body>{element.summary}</Modal.Body>)}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
  }
class CalendarPage extends React.Component {
  static gapi = window.gapi
  static authorizeButton = document.getElementById("authorize_button");
  static signoutButton = document.getElementById("signout_button");
    constructor(props){
        super (props);

        this.state = {
          date: new Date(),
        }

        this.handleClientLoad = this.handleClientLoad.bind(this);
        this.initClient = this.initClient.bind(this);
        this.appendPre = this.appendPre.bind(this);
        this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
    }

      componentDidMount(){
        //this.handleClientLoad();
    }

      handleClientLoad() {
        this.gapi.load("client:auth2", this.initClient);
      }
        
        // handle calendar change 
      handleChangeDate(calendarDate){
        
        this.setState({
          date : calendarDate,
        })
        console.log(this.state.date.getDate(),this.state.date.getFullYear(),this.state.date.getDay());
      }
          /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */

      
      updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          this.authorizeButton.style.display = "none";
          this.signoutButton.style.display = "block";
          this.listUpcomingEvents();
        } else {
          this.authorizeButton.style.display = "block";
          this.signoutButton.style.display = "none";
        }
      }


            /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      initClient() {
        this.gapi.client
          .init({
            apiKey: process.env.REACT_APP_API_KEY,
            clientId: process.env.REACT_APP_CLIENT_ID,
            discoveryDocs: process.env.REACT_APP_DISCOVERY_DOCS,
            scope: process.env.REACT_APP_SCOPES,
          })
          .then(
            function () {
              // Listen for sign-in state changes.
              this.state.gapi.auth2
                .getAuthInstance()
                .isSignedIn.listen(this.updateSigninStatus());

              // Handle the initial sign-in state.
              this.updateSigninStatus(this.gapi.auth2.getAuthInstance().isSignedIn.get());
              this.authorizeButton.onclick = this.handleAuthClick;
              this.signoutButton.onclick = this.handleSignoutClick;
            },
            function (error) {
              this.appendPre(JSON.stringify(error, null, 2));
            }
          );
      }
           /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      listUpcomingEvents() {
        var startOfTheDay = this.state.date;
        startOfTheDay.setHours(0,0,0,0)
        var endOfTheDay = this.state.date;
        endOfTheDay.setHours(23,59,59,999)
        this.gapi.client.calendar.events
          .list({
            calendarId: "primary",

            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: "startTime",
          })
          .then(function (response) {
            var events = response.result.items;
            this.appendPre("Upcoming events:");

            if (events.length > 0) {
              for (var i = 0; i < events.length; i++) {
                var event = events[i];
                var when = event.start.dateTime;
                if (!when) {
                  when = event.start.date;
                }
                this.appendPre(event.summary + " (" + when + ")");
              }
            } else {
              this.appendPre("No upcoming events found.");
            }
          });
      }
        /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      appendPre(message) {
        var pre = document.getElementById("content");
        var textContent = document.createTextNode(message + "\n");
        pre.appendChild(textContent);
      }

    render(){
        return(
            <React.Fragment>
                <div className='content'>
                      <NavBar/>
                      <div className = 'info'>      
                        <h1 className = "Title">
                          {"Calendar"}
                        </h1>
                        <div className="Calendar">
                        <Calendar onChange = {this.handleChangeDate}  value={this.state.date}/>
                        <GetGoogleEvent date = {this.state.date}/>
                        </div>
                        
                      </div>
                    </div>
            </React.Fragment>
        )
    }
}
export default CalendarPage;
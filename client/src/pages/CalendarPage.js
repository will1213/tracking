import React from "react";
import NavBar from "../components/NavBar";
import "../styles/CalendarPage.css";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal'
import { useState } from "react";
import Calendar from 'react-calendar';



function GetMonthHours(props) {
  const [show, setShow] = useState(false);
  const [hour, setHour] = useState(0);
  const [event, setEvent] = useState([]);

  const handleClose = () => setShow(false);

  
  const getMonthlyHours = () => {

    var firstDay = new Date(props.date.getFullYear(), props.date.getMonth(), 1);
    var lastDay = new Date(props.date.getFullYear(), props.date.getMonth() + 1, 0);
    
    firstDay.setHours(0,0,0,0)
    lastDay.setHours(23,59,59,999)


    window.gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': firstDay.toISOString(),
      'timeMax': lastDay.toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'orderBy': 'startTime',
      'q': 'EFK',
    }).then(response => {
      var totalMonthlyHour = 0;
      setEvent(response.result.items);
      response.result.items.forEach(element => {
        var duration = Math.abs((new Date(element.end.dateTime) - new Date(element.start.dateTime)) / (60*1000*60));
        totalMonthlyHour+=duration;
      });
      setHour(totalMonthlyHour);
      setShow(true);
    })
  }
  return (
              
  <>
    <Button onClick={getMonthlyHours}>Find Montly Hours</Button>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton> 
        <Modal.Title>Your Total Montly Hours on {props.date.toLocaleString('default', { month: 'long' })} is {hour} hours</Modal.Title>
      </Modal.Header>
      {event.map( element => <Modal.Body id = {element.index}>{element.summary}</Modal.Body>)}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  </>


   
  );
}


function GetGoogleEvent(props) {
  let gapi = window.gapi
    const [show, setShow] = useState(false);

    const [event, setEvent] = useState([]);


    const handleClose = () => setShow(false);


    const handleClick = () => {

                    // get events
                    var startOfTheDay = new Date(props.date);
                    startOfTheDay.setHours(0,0,0,0)
                    var endOfTheDay = new Date(props.date);
                    endOfTheDay.setHours(23,59,59,999)
          
                    gapi.client.calendar.events.list({
                      'calendarId': 'primary',
                      'timeMin': startOfTheDay.toISOString(),
                      'timeMax': endOfTheDay.toISOString(),
                      'showDeleted': false,
                      'singleEvents': true,
                      'maxResults': 10,
                      'orderBy': 'startTime',
                      'q': 'EFK',
                    }).then(response => {
                      setShow(true);
                      const events = response.result.items
                      setEvent(events);
                    })
        }

    return (
        <>
          <Button  onClick={handleClick}>Get The Event</Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Your Events on {props.date.toDateString()}</Modal.Title>
            </Modal.Header>
            {event.map( element => <Modal.Body id = {element.index}>{element.summary}</Modal.Body>)}
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

    constructor(props){
        super (props);

        this.state = {
          date: new Date(),
          signedIn: false,
          gapiLoaded: false,
        }

        this.initClient = this.initClient.bind(this);
        this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        //this.firstSignIn = this.firstSignIn.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.updateSigninStatus = this.updateSigninStatus.bind(this);
    }

      componentDidMount(){
        window.gapi.load("client:auth2", this.initClient);
    }

        
        // handle calendar change 
      handleChangeDate(calendarDate){
        this.setState({
          date : calendarDate,
        })
      }
          /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */

      handleSignIn(){
        window.gapi.auth2.getAuthInstance().signIn();
      }


      firstSingIn(){
        /*
        this.gapi.load('client:auth2', () => {
          console.log('loaded client')
          this.gapi.client.init({
            apiKey: process.env.REACT_APP_API_KEY,
            clientId: process.env.REACT_APP_CLIENT_ID,
            discoveryDocs: process.env.REACT_APP_DISCOVERY_DOCS,
            scope: process.env.REACT_APP_SCOPES,
          })
    
          this.gapi.client.load('calendar', 'v3')
  
          console.log(this.gapi.auth2.getAuthInstance().isSignedIn.get());
          
  
          this.gapi.auth2.getAuthInstance().signIn()
          .then(() => {
            console.log("u are signed in");
          })
        })*/
      }
      
      updateSigninStatus(isSignedIn) {
        this.setState({
          signedIn : isSignedIn
        })
      }


            /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      initClient() {
        
        window.gapi.client
          .init({
            apiKey: process.env.REACT_APP_API_KEY,
            clientId: process.env.REACT_APP_CLIENT_ID,
            discoveryDocs: process.env.REACT_APP_DISCOVERY_DOCS,
            scope: process.env.REACT_APP_SCOPES,
          })
          window.gapi.client.load('calendar', 'v3')
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus)
          
      }
           /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      listUpcomingEvents() {
        
                    // get events
                    var startOfTheDay = new Date(this.state.date);
                    startOfTheDay.setHours(0,0,0,0)
                    var endOfTheDay = new Date(this.state.date);
                    endOfTheDay.setHours(23,59,59,999)
          
                    window.gapi.client.calendar.events.list({
                      'calendarId': 'primary',
                      'timeMin': startOfTheDay.toISOString(),
                      'timeMax': endOfTheDay.toISOString(),
                      'showDeleted': false,
                      'singleEvents': true,
                      'maxResults': 10,
                      'orderBy': 'startTime',
                      'q': 'EFK',
                    })
        
      

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
                      </div>
                      <div className = "calendarButtons">
                        {this.state.signedIn ? <Button variant="secondary" onClick = {()=>{window.gapi.auth2.getAuthInstance().signOut()}}>logout</Button> : <Button variant="secondary" onClick={()=>{this.handleSignIn()}}>SignIn</Button> }
                        <div className = "middleButton">
                          <GetMonthHours  date = {this.state.date}></GetMonthHours>
                        </div>
                        <GetGoogleEvent date = {this.state.date}/>
                      </div>     
                    </div>
                </div>
              </React.Fragment>
        )
    }
}
export default CalendarPage;
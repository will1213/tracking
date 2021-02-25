import NavBar from "../components/NavBar";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Card } from "react-bootstrap"
import "../styles/StaffPage.css";
import Table from 'react-bootstrap/Table'
import ListGroup from 'react-bootstrap/ListGroup'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Modal from 'react-bootstrap/Modal'
import { db} from "../components/db";

/*
 JSX For overlay in the middle of screen
*/

function MyOverlay(props) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}{props.isclass ? "'s Classes": "'s Devices"}
        </Modal.Title>
      </Modal.Header>
      {props.isclass ? props.classes.map( element => <Modal.Body>{element}</Modal.Body>) : props.devices.map(element => <Modal.Body>{element}</Modal.Body>)}
      <Modal.Body>
        {props.body}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {props.onHide()}}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

/*
Overlay
*/
function Overlay(props) {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <React.Fragment>
      <Button  className = "button-group" variant="primary" onClick={ () =>{
        setModalShow(true);
        }} >{props.title}{props.isClass ? "'s Classes": "'s Devices"}
      </Button>
      <MyOverlay
        show = {modalShow}
        onHide = {() => {setModalShow(false); }}
        title = {props.title}
        isclass = {props.isclass}
        classes = {props.classes}
        devices = {props.devices}
      />
    </React.Fragment>
  );
}

class StaffPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            documents : [],
            staffNames : [],
            devices: [],
            classes : [],
          }
          this.gettingStaffInfo = this.gettingStaffInfo.bind(this)
    }
    componentDidMount(){
      this.gettingStaffInfo();
    }
    gettingStaffInfo(){
      var dbdocuments = [];
      var dbclasses = [];
      var dbdeviceIDs = [];
      var dbstaffs = [];
 
      db.collection("Staff").orderBy("Name").get().then( snapshot => {

      snapshot.forEach(doc => { 
        var tempClasses = [];
        var tempDeviceIDs = [];
        //Getting nested Classes
        db.collection("Staff").doc(doc.id).collection("Class").get().then( snapshot2 => {
          snapshot2.forEach (doc2 => {
            tempClasses.push(doc2.data().ClassName)
          })
        }).catch( (error)=>{
          console.log(error);
        })

        //Getting Nested Devices
        db.collection("Staff").doc(doc.id).collection("Device").get().then( snapshot2 => {
          snapshot2.forEach (doc2 => {
            tempDeviceIDs.push(doc2.id)
          })
        }).catch( (error)=>{
          console.log(error);
        })

        dbdocuments.push(doc.id);
        dbstaffs.push(doc.data().Name)
        dbdeviceIDs.push(tempDeviceIDs)
        dbclasses.push(tempClasses)
    })
    
}).then( ()=>{
  this.setState({
    documents : dbdocuments,
    staffNames : dbstaffs,
    devices: dbdeviceIDs,
    classes : dbclasses,
  })
  console.log("done getting data for staff")
  console.log(this.state.classes);
}
).catch( (error)=>{
  console.log(error);
})
    }


    render(){
      
        return(
        <React.Fragment>           
          <div className='content'>
            <NavBar/>
              <div className = 'info'>      
                <h1 className = "Title">
                    {"Staff"}
                </h1>


              <div className = "staff">
                <div >
                  <ButtonGroup vertical = {true}>
                  {this.state.documents.map((element)=>{
                    var index = this.state.documents.indexOf(element);
                    return (
                      <Card className = "staffCard">
                        <Card.Header className = "staffCardHeader">{this.state.staffNames[index]}</Card.Header>
                          <Card.Body>
                            <Overlay isclass = {true ? 1 : undefined} classes = {this.state.classes[index]} title = {this.state.staffNames[index]}/>
                            <Overlay isclass = {false ? 1 : undefined} devices = {this.state.devices[index]} title = {this.state.staffNames[index]}/>
                          </Card.Body>
                      </Card>
                    )
                  }
                  
                  )}

                  </ButtonGroup>
                </div>
              </div>
              
              </div>
          </div>
        </React.Fragment>
        )
    }
}
export default StaffPage;
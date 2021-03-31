import NavBar from "../components/NavBar";
import React, { useState, Component } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Card } from "react-bootstrap"
import "../styles/StaffPage.css";
import Table from 'react-bootstrap/Table'
import ListGroup from 'react-bootstrap/ListGroup'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Modal from 'react-bootstrap/Modal'
import firebase,{ db} from "../components/db";
import Form from 'react-bootstrap/Form'
import { AuthConsumer } from "../context/AuthContext"

function PromoteStaff(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [classes, setClasses] = useState("");

  const onSubmit = (e) =>{
    e.preventDefault();
    db.collection("Staff").doc(props.docID).update({
      Classes: firebase.firestore.FieldValue.arrayUnion(classes),
    }
    )
  }
  return (
    <>
      <Button className = "button-group" variant="primary" onClick={handleShow}>
       {"Add Class"}
      </Button>

      <Modal show={show} onHide={handleClose}>
      <Form  onSubmit = {onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{"Add Class"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group >
            <Form.Control onChange = { (event) => { setClasses(event.target.value) } } value = {classes} type="text" placeholder="Class Name" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

function AddClasses(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [classes, setClasses] = useState("");

  const onSubmit = (e) =>{
    e.preventDefault();
    db.collection("Staff").doc(props.docID).update({
      Classes: firebase.firestore.FieldValue.arrayUnion(classes),
    }
    )
  }
  return (
    <>
      <Button className = "button-group" variant="primary" onClick={handleShow}>
       {"Add Class"}
      </Button>

      <Modal show={show} onHide={handleClose}>
      <Form  onSubmit = {onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{"Add Class"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group >
            <Form.Control onChange = { (event) => { setClasses(event.target.value) } } value = {classes} type="text" placeholder="Class Name" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

function RemoveClasses(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [classes, setClasses] = useState("");

  const onSubmit = (e) =>{
    e.preventDefault();
    db.collection("Staff").doc(props.docID).update({
      Classes: firebase.firestore.FieldValue.arrayRemove(classes),
    }
    )
  }
  return (
    <>
      <Button className = "button-group" variant="primary" onClick={handleShow}>
       {"Remove Class"}
      </Button>

      <Modal show={show} onHide={handleClose}>
      <Form  onSubmit = {onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{"Remove Class"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group >
            <Form.Control onChange = { (event) => { setClasses(event.target.value) } } value = {classes} type="text" placeholder="Class Name" />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
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
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.content.map( element => <Modal.Body key = {element.index + props.title}>{element}</Modal.Body>)} 
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
        }} >{props.title}
      </Button>
      <MyOverlay
        show = {modalShow}
        onHide = {() => {setModalShow(false); }}
        title = {props.title}
        content = {props.content}
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
            phones : [],
            emails: [],
          }
          this.gettingStaffInfo = this.gettingStaffInfo.bind(this);
          this.promoteStaff = this.promoteStaff.bind(this);
          this.demoteStaff = this.demoteStaff.bind(this);
    }
    componentDidMount(){
      this.gettingStaffInfo();
    }
    promoteStaff(docID){
      db.collection("Staff").doc(docID).update({
        role: true,
      })
    }
    demoteStaff(docID){
      db.collection("Staff").doc(docID).update({
        role: false,
      })
    }

    gettingStaffInfo(){
      var dbdocuments = [];
      var dbclasses = [];
      var dbdeviceIDs = [];
      var dbstaffs = [];
      var dbemails = [];
      var dbphones = [];
 
      db.collection("Staff").orderBy("Name").get().then( snapshot => {

      snapshot.forEach(doc => { 

        /*
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
        */
       var tempDeviceNames = [];
       if(doc.data().Devices.length > 0 ){
        doc.data().Devices.forEach((device)=>{
          db.collection("Device").doc(device).get().then( doc =>{
            if(doc.exists){
              tempDeviceNames.push(doc.data().DeviceName)
            }
          }
          ).catch( error =>{console.log(error)} )
        })
       }


        dbdocuments.push(doc.id);
        dbstaffs.push(doc.data().Name);
        //dbdeviceIDs.push(tempDeviceIDs);
        dbclasses.push(doc.data().Classes);
        //dbclasses.push(tempClasses);
        //dbdeviceIDs.push(doc.data().Devices);
        dbdeviceIDs.push(tempDeviceNames);
        dbemails.push(doc.data().Email);
        dbphones.push(doc.data().Phone)
    })
    
}).then( ()=>{
  this.setState({
    documents : dbdocuments,
    staffNames : dbstaffs,
    devices: dbdeviceIDs,
    classes : dbclasses,
    emails : dbemails,
    phones : dbphones,
  })
}
).catch( (error)=>{
  console.log(error);
})
    }


    render(){
      
        return(
          <AuthConsumer>{
            ({authenticated, user}) =>{
              return( 
              <React.Fragment>           
          <div className='content'>
            <NavBar/>
              <div className = 'info'>      
                <h1 className = "Title">
                    {"Staff"}
                </h1>


              <div className = "staff">
                <div>
                  <ButtonGroup vertical = {true}>
                  {this.state.documents.map((element)=>{
                    var index = this.state.documents.indexOf(element);
                    return (
                        <Card key = {index} text = "light" className = "staffCard">
                          <Card.Header className = "staffCardHeader">{this.state.staffNames[index]} 
                          <div className = "staff-email-phone">
                            <Button onClick = { ()=>{this.promoteStaff(this.state.documents[index])}} >Promote</Button>
                            <Button onClick = { ()=>{this.demoteStaff(this.state.documents[index])}} >Demote</Button>
                            </div>
                          </Card.Header> 
                            <div className = "staffCard-outer">
                              <Card.Body>
                                {user.role ?                                 
                                  <div className = "staff-email-phone">
                                    <AddClasses docID = {this.state.documents[index]}/>
                                    <RemoveClasses docID = {this.state.documents[index]}/>
                                  </div>
                                  :
                                  <div></div>
                                }

                                <div className = "staff-email-phone">
                                  <Overlay islist = { true ? 1 : undefined} content = {this.state.classes[index]} title = "Classes"/>
                                  <Overlay islist = { true ? 1 : undefined} content = {this.state.devices[index]} title = "Devices"/>
                                </div>
                                <div className = "staff-email-phone">
                                  <div>{"Email: "}{this.state.emails[index]}</div>
                                  <div>{"Phone: "}{this.state.phones[index]}</div>
                                </div>
                              </Card.Body>
                            </div>
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

          </AuthConsumer>
        
        )
    }
}
export default StaffPage;
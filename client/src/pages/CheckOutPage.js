import React, { Component, useState} from "react";
import { Button } from "react-bootstrap";
import "../styles/CheckOutPage.css";
import firebase, { db} from "../components/db";
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import NavBar from "../components/NavBar";
import DevicePage from "./DevicePage";
import Modal from 'react-bootstrap/Modal'


class CheckOutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyingID: props.modifyingID,
      modifyingName: props.modifyingName,
      hour: '',
      modal: false,
      done: false,
      comment: "",
    }
    this.handleChangingHour = this.handleChangingHour.bind(this);
    this.handleChangingComment = this.handleChangingComment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  onSubmit(e){
    e.preventDefault();
    if (isNaN(this.state.hour) === false && (this.state.hour !== "" )){
      if(this.state.comment === ""){
        this.state.modifyingID.forEach(deviceID => {
          db.collection("Device").doc(deviceID).update({
            TotalTimeUsed: firebase.firestore.FieldValue.increment(this.state.hour),
            
          }).then(
            this.setState({
              modal:true,
            })
          ).catch(function(error) {
            console.error("Error adding document: ", error);
          });;
        });
      }else{
        this.state.modifyingID.forEach(deviceID => {
          db.collection("Device").doc(deviceID).update({
            TotalTimeUsed: firebase.firestore.FieldValue.increment(this.state.hour),
            Comment: this.state.comment,
          }).then(
            this.setState({
              modal:true,
            })
          ).catch(function(error) {
            console.error("Error adding document: ", error);
          });;
        });
      }
      
    }else{
      alert("enter number")
    }


  }

  handleChangingHour(e){
    this.setState({
      hour: e.target.value,
    })
  }
  handleChangingComment(e){
    this.setState({
      comment: e.target.value,
    })
  }
  render() {
    return (
      <React.Fragment>
        {this.state.done ? <DevicePage/>
        :       
        <div className='content'>
        <NavBar/>
          <div className = 'info'>      
            <h1 className = "Title">
              CheckOut
            </h1>
            <h2>Here Is The List Of Devices You Will Need</h2>
            <div className = "checkoutcard">
            {this.state.modifyingName.map((value)=>{
                          var temp = JSON.parse(value);
                          return(
                            <Card className = "card" id = {value.index} text = "light" bg= "dark" style={{ width: '18rem' }}>
                              <Card.Title>{"Name: "}{temp.name}</Card.Title>
                              <Card.Body>{"Comment: "}{temp.comment}</Card.Body>
                            </Card>
                          
            )})}
            </div>
            <div className = "checkout">
            <Form  onSubmit = {this.onSubmit}>

                <Form.Group >
                <Form.Label>Duration (in hour)</Form.Label>
                <Form.Control onChange = {this.handleChangingHour} value = {this.state.hour} type="text" placeholder="Enter how many hour you will use this device" />
              </Form.Group>
                
              <Form.Group >
                <Form.Label>Comment</Form.Label>
                <Form.Control onChange = {this.handleChangingComment} value = {this.state.comment} type="text" placeholder="Enter the comment, leave it blank if no needed to update." />
              </Form.Group>
              <Button variant="danger" type="submit">
                Check Out
              </Button>
              {this.state.modal ? 
                    <Modal show={this.state.modal} onHide={()=>{this.setState({
                      modal:false,
                      done: true,
                    })}}>
                    <Modal.Header closeButton>
                      <Modal.Title>Sucess</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Redirect you to the device page...</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={()=>{this.setState({
                      modal:false,
                      done: true,
                    })}}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal> 
                  : undefined}


              <Button variant="primary" onClick = {()=>{this.setState({done: true})}}>
                Cancel
              </Button>
            </Form>
            </div>
          </div>
          
      </div>
      
        }

    </React.Fragment>
        );
  }
}

export default CheckOutPage;
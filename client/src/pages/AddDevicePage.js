import NavBar from "../components/NavBar";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Card } from "react-bootstrap"
import {Modal} from 'react-bootstrap'
import "../styles/AddDevicePage.css";
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'

class AddDevicePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            authenticated : false,
            role : false,
            documents : [],
            device : [],
            deviceID: [],
            date : [],
            ownder : [],
            location : [],
          }
    }

    render(){

        var row = [];
        var i;
        //for (i = 0 ; i < this.state.documents.length ; i++){
          //const date = new Date(this.state.dates[i]);
          row.push(    
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>)
        //}

        return(
            <React.Fragment>
            
        <div className='content'>
            <NavBar/>
            <div className = 'info'>      
            <h1 className = "Title">
                {"Add New Device"}
            </h1>
            <div className = "DeviceForm">
            <Form>
  <Form.Group >
    <Form.Label>Device Name</Form.Label>
    <Form.Control placeholder="Enter Device Name" />
  </Form.Group>

  <Form.Group >
    <Form.Label>Owner</Form.Label>
    <Form.Control placeholder="Enter Owner Name" />
  </Form.Group>

  <Form.Group >
    <Form.Label>Software Reuired</Form.Label>
    <Form.Control placeholder="Enter Software Reuired. (Seprate by commas)" />
  </Form.Group>


    <Form.Group >
    <Form.Label>Current Location</Form.Label>
    <Form.Control placeholder="Enter Current Location Of The Device" />
  </Form.Group>
    
  <Button variant="primary" type="submit">
    Add Device & Generate QR Code 
  </Button>
</Form>
</div>

            </div>
          </div>
          </React.Fragment>
        )
    }
}
export default AddDevicePage;
import NavBar from "../components/NavBar";
import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Card } from "react-bootstrap"
import {Modal} from 'react-bootstrap'
import "../styles/StaffPage.css";
import Table from 'react-bootstrap/Table'
import ListGroup from 'react-bootstrap/ListGroup'

class StaffPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            documents : [],
            device : [],
            deviceID: [],
            date : [],
            ownder : [],
            location : [],
          }
    }

    gettingDeviceInfo(){
        
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
        function alertClicked() {
            alert('You clicked the third ListGroupItem');
          }
        return(
            <React.Fragment>
            
        <div className='content'>
            <NavBar/>
            <div className = 'info'>      
            <h1 className = "Title">
                {"Staff"}
            </h1>


            <div className = "staff">
  <ListGroup defaultActiveKey="#link1">
    <ListGroup.Item action href="#link1">
      Chi Gieng
    </ListGroup.Item>
    <ListGroup.Item action href="#link1">
      Huzefa Juzar
    </ListGroup.Item>
    <ListGroup.Item action href="#link1">
      Will Huang
    </ListGroup.Item>
    <ListGroup.Item action href="#link1">
      Sui Yilan
    </ListGroup.Item>
    <ListGroup.Item action href="#link1">
      Chang Tan
    </ListGroup.Item>
  </ListGroup>
  </div>

            </div>
          </div>
          </React.Fragment>
        )
    }
}
export default StaffPage;
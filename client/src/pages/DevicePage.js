import NavBar from "../components/NavBar";
import React from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Card } from "react-bootstrap"
import {Modal} from 'react-bootstrap'
import "../styles/DevicePage.css";
import Table from 'react-bootstrap/Table'


import { db} from "../components/db";

function deleteButton(props) {
  return (
    <React.Fragment>
      <Button onClick={()=>{
        console.log("trying to delete");
        console.log(props.documentID);
        db.collection("Device").doc(props.documentID).delete().then(()=>{})
          .catch(error =>{
            console.log(error);
           })}}>
        Delete</Button>
    </React.Fragment>
  );
}
export default class DevicePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            documents : [],
            devices : [],
            dates : [],
            owners : [],
            locations : [],
          }
        this.gettingDeviceInfo = this.gettingDeviceInfo.bind(this);
        this.deleteDeviceInfo = this.deleteDeviceInfo.bind(this);
    }

    componentDidMount(){
      console.log("device page")
      this.gettingDeviceInfo();

    }
    
    deleteDeviceInfo(documentID){
      console.log("trying to delete");
      console.log(documentID);
      db.collection("Device").doc(documentID).delete().then(()=>{
        this.gettingDeviceInfo();
      }).catch(error =>{
        console.log(error);
      })
    }

    gettingDeviceInfo(){
      var dbdocuments = [];
      var dbdevices = [];
      var dbdates = [];
      var dbowners = [];
      var dblocations = [];

      const devices = db.collection("Device").orderBy("Date").get().then(snapshot=>{

    snapshot.forEach(doc => { 
        dbdocuments.push(doc.id);
        dbdevices.push(doc.data().DeviceName);
        dbdates.push(doc.data().Date.toDate());
        dbowners.push(doc.data().Owner);
        dblocations.push(doc.data().location);
    })
    
}).then( ()=>{
  this.setState({
    documents : dbdocuments,
    devices : dbdevices,
    dates : dbdates,
    owners : dbowners,
    locations : dblocations,
  })
}
).catch( (error)=>{
  console.log(error);
})
    }

    
    render(){
      var row = [];
      var i;
      console.log(this.state.documents.length)
      for (i = 0 ; i < this.state.documents.length ; i++){
        const date = new Date(this.state.dates[i]);
        console.log(this.state.documents[i])
        row.push(
        <tr>
          <td className = "DeviceName">{this.state.devices[i]}</td>
          <td className = "Date">{date.getFullYear()}/{date.getMonth()+1}/{date.getDate()}</td>
          <td className = "Owner">{this.state.owners[i]}</td>
          <td className = "Software">Figma</td>
          <td className = "Location">Calgary</td>
          <Button  onClick={()=>{}}>Delete</Button>
        </tr>
        )
      }
        

        return(
            <React.Fragment>
            
        <div className='content'>
            <NavBar/>
            <div className = 'info'>      
            <h1 className = "Title">
                {"Device"}
            </h1>
            <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Device Name</th>
      <th>Date</th>
      <th>Owner</th>
      <th>Software required</th>
      <th>Last location</th>
    </tr>
  </thead>
  <tbody>
        {row}
  </tbody>
</Table>

            </div>
          </div>
          </React.Fragment>
        )
    }
}

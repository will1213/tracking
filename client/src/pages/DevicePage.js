import NavBar from "../components/NavBar";
import React from "react";
import { Button } from "react-bootstrap";
import "../styles/DevicePage.css";
import Table from 'react-bootstrap/Table'


import {db} from "../components/db";
import { AuthConsumer } from "../context/AuthContext"

function MyDeleteButton(props) {
    return <Button {...props} onClick={()=>{
      db.collection("Device").doc(props.documentid).delete().then(()=>{
        props.onClick();
      }).catch(error =>{
        console.log(error);
      })
    }}> Delete</Button>;
}

export default class DevicePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            authenticated : false,
            role : false,
            documents : [],
            devices : [],
            dates : [],
            owners : [],
            locations : [],
            softwares : [],
            times: [],
          }
        this.gettingDeviceInfo = this.gettingDeviceInfo.bind(this);
        this.deleteDeviceInfo = this.deleteDeviceInfo.bind(this);
    }

    componentDidMount(){

      console.log("device page")
      this.gettingDeviceInfo();

    }
    
    deleteDeviceInfo(documentid){
      console.log("trying to delete");
      console.log(documentid);
      db.collection("Device").doc(documentid).delete().then(()=>{
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
      var dbsoftwares = [];
      var dbTime = [];

      const devices = db.collection("Device").orderBy("Date").get().then( snapshot => {

        
      snapshot.forEach(doc => { 
        
        db.collection("Device").doc(doc.id).collection("Software").get().then( snapshot2 => {
          var tempSoftwares = [];
          snapshot2.forEach (doc2 => {
            tempSoftwares.push(doc2.data().software)
          })

          dbsoftwares.push(new Array(tempSoftwares))
          tempSoftwares = [];
          dbdocuments.push(doc.id);
          dbdevices.push(doc.data().DeviceName);
          dbdates.push(doc.data().Date.toDate());
          dbowners.push(doc.data().Owner);
          dblocations.push(doc.data().Location);
          dbTime.push(doc.data().TimeUsed)

        }).then(
          ()=>{
            /*
            console.log(dbsoftwares[3][0])
            console.log(dbsoftwares[3])*/
          this.setState({
            documents : dbdocuments,
            devices : dbdevices,
            dates : dbdates,
            owners : dbowners,
            locations : dblocations,
            softwares : dbsoftwares,
            times : dbTime,
          })
        }
        ).catch( (error)=>{
          console.log(error);
        })

        /*dbdocuments.push(doc.id);
        dbdevices.push(doc.data().DeviceName);
        dbdates.push(doc.data().Date.toDate());
        dbowners.push(doc.data().Owner);
        dblocations.push(doc.data().Location);
        dbTime.push(doc.data().TimeUsed)*/
    })
})
    }

    
    render(){

      //console.log(this.state.softwares)
      //this.state.softwares.forEach(element => element.map( test => console.log(test)))

      var row = [];
      var i;
      for (i = 0 ; i < this.state.documents.length ; i++){
        const date = new Date(this.state.dates[i]);
        //console.log(this.state.softwares[i])
        row.push(
        <tr key = {i}>
          <td className = "DeviceName">{this.state.devices[i]}</td>
          <td className = "Date">{date.getFullYear()}/{date.getMonth()+1}/{date.getDate()}</td>
          <td className = "Owner">{this.state.owners[i]}</td>
          <td className = "Software">{this.state.softwares[i].map(element =>  ("" + element))}</td>
          <td className = "Time">{this.state.times[i]}</td>
          <td className = "Location">{this.state.locations[i]}</td>
          <td ><MyDeleteButton documentid = {this.state.documents[i]} onClick={this.gettingDeviceInfo}>Delete</MyDeleteButton></td>
        </tr>
        )
      }
        

        return(

          <AuthConsumer>
            {
              (authenticated, user) =>{
                console.log(authenticated,user);
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
                              <tr key = "Title">
                                <th key = "DeviceTitle">Device Name</th>
                                <th key = "DateTitle">Date</th>
                                <th key = "OwnerTitle">Owner</th>
                                <th key = "SoftwareTitle">Software required</th>
                                <th key = "TimeTitle">Time being used (Hr)</th>
                                <th key = "LocationTitle">Last location</th>
                              </tr>
                            </thead>
                            <tbody>
                              {row}
                            </tbody>
                          </Table>
                        </div>
                    </div>
                  </React.Fragment>)

              }
            }
          </AuthConsumer>


          
        )
    }
}

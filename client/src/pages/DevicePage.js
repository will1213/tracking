import NavBar from "../components/NavBar";
import React , {useState} from "react";
import { Button } from "react-bootstrap";
import "../styles/DevicePage.css";
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import CheckOutPage from "./CheckOutPage";
import {db} from "../components/db";
import { AuthConsumer } from "../context/AuthContext"
import GoogleMapReact from 'google-map-react';
import Modal from 'react-bootstrap/Modal'


const AnyReactComponent = ({ text }) => (  
<div className = "map-mark">
  {text}
</div>);
function MyMap(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let lati = Number (props.geo.split(",")[0]);
  let long = Number (props.geo.split(",")[1]);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {`{${lati.toFixed(2)}, ${long.toFixed(2)}}`}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Device Location</Modal.Title>
        </Modal.Header>
        <Modal.Body>    
        <div className = "googlemap">
          <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}        
          defaultCenter={{lat: lati, lng: long}}
          defaultZoom={11}
        >
          <AnyReactComponent
            lat={props.geo.split(",")[0]}
            lng={props.geo.split(",")[1]}
            text="🔰"
          />
        </GoogleMapReact>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
function MyDeleteButton(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button {...props} variant="primary" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this device?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{
            props.onClick();
            setShow(false);
          }}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
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
            comments : [],
            softwares : [],
            times: [],
            modifying: true,
            modifyingID: [],
            modifyingName: [],
            modifyingComment: [],
          }
        this.gettingDeviceInfo = this.gettingDeviceInfo.bind(this);
        this.deleteDeviceInfo = this.deleteDeviceInfo.bind(this);
        this.selectDevice = this.selectDevice.bind(this);
    }

    componentDidMount(){

      

      this.gettingDeviceInfo();

    }
    selectDevice(e){

      if(e.target.checked === true){
        var temp = this.state.modifyingID;
        var tempName = this.state.modifyingName;
       // var tempComment = this.state.modifyingComment;
        this.state.modifyingID.push(e.target.id);
        
        this.state.modifyingName.push(e.target.value);
       // this.state.modifyingComment.push(e.target.value.comment);
        this.setState({
          modifyingID : temp,
          modifyingName : tempName,
         // modifyingComment : tempComment
        })
      }else{
        var index = this.state.modifyingID.indexOf(e.target.id);
        if (this.state.modifyingID.length === 1){
          var temp2 = this.state.modifyingID;
          var temp2Name = this.state.modifyingName;
        //  var temp2Comment = this.state.modifyingComment;
          temp2.pop();
          temp2Name.pop();
        //  temp2Comment.pop();
          this.setState({
            modifyingID : temp2,
            modifyingName : temp2Name,
        //    modifyingComment : temp2Comment
          })
        }else if(index > -1) {
          var temp3 = this.state.modifyingID.splice(index, 1)
          var temp3Name = this.state.modifyingName.splice(index, 1)
        //  var temp3Comment = this.state.modifyingComment.splice(index, 1);
          this.setState({
            modifyingID : temp3,
            modifyingName : temp3Name,
         //   modifyingComment : temp3Comment
          })
}
      }
    }
    
    deleteDeviceInfo(documentid){

      db.collection("Device").doc(documentid).collection("Software").get().then( snapshot => {
        snapshot.forEach( document =>{
          db.collection("Device").doc(documentid).collection("Software").doc(document.id).delete()
        })
      }).then(()=>{

        db.collection("Device").doc(documentid).delete().then(()=>{this.gettingDeviceInfo()})
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
      var dbcomments = [];

      db.collection("Device").orderBy("Date").get().then( (snapshot) => {
        if(snapshot.size === 0 ){
          this.setState({
            documents : dbdocuments,
            devices : dbdevices,
            dates : dbdates,
            owners : dbowners,
            locations : dblocations,
            softwares : dbsoftwares,
            times : dbTime,
            comments : dbcomments,
          })
        }else{
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
              let lat = doc.data().Location.latitude
              let long = doc.data().Location.longitude
              dblocations.push(`${lat},${long}`);
              dbTime.push(doc.data().TotalTimeUsed)
              dbcomments.push(doc.data().Comment)
    
            }).then( ()=>{
            this.setState({
              documents : dbdocuments,
              devices : dbdevices,
              dates : dbdates,
              owners : dbowners,
              locations : dblocations,
              softwares : dbsoftwares,
              times : dbTime,
              comments : dbcomments,
            })}
               
                
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
        }

        

}).catch( (error)=>{
  console.log(error);
})
    }

    
    render(){
        return(

          <AuthConsumer>
            {
              ({authenticated, user})=>{
                  return(       
                  <React.Fragment>
                    {this.state.modifying ? (
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
                                                  <th key = "CommentTitle">Comment</th>
                                                  <th key = "SelectTitle">Select</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {this.state.documents.map((doc)=>{
                                                  let index = this.state.documents.indexOf(doc);
                                                  let date = new Date(this.state.dates[index]);
                                                  return(                                
                                                    <tr key = {index}>
                                                    <td className = "DeviceName">{this.state.devices[index]}</td>
                                                    <td className = "Date">{date.getFullYear()}/{date.getMonth()+1}/{date.getDate()}</td>
                                                    <td className = "Owner">{this.state.owners[index]}</td>
                                                    <td className = "Software">{this.state.softwares[index].map(element =>  ("" + element))}</td>
                                                    <td className = "Time">{this.state.times[index]}</td>
                                                    <td className = "Location"><MyMap geo = {this.state.locations[index]}>{this.state.locations[index]}</MyMap></td>
                                                    
                                                    <td className = "Comment">{this.state.comments[index]}</td>
                                                    <td className = "Select">{<Form.Control size = "sm" value = {JSON.stringify({name:this.state.devices[index],
                                                                                                                  comment:this.state.comments[index]})} type = "checkbox" id = {this.state.documents[index]} onChange = {this.selectDevice}></Form.Control>}</td>
                                                    {user.role ? <td className = "Delete">{<MyDeleteButton onClick = {()=>this.deleteDeviceInfo(this.state.documents[index])}/>}</td> : undefined}
                                                    </tr>)
                  
                  
                                                })}
                  
                                              </tbody>
                                            </Table>
                                            <Button className = "device-checkout"onClick = {()=>{this.setState({
                                          modifying: false,
                                        })}}>Check out</Button>
                                          </div>

                                          

                                      </div>
                                      )
                                      :<CheckOutPage modifyingID = {this.state.modifyingID} modifyingName = {this.state.modifyingName}/>}

                  </React.Fragment>)

              }
            }
          </AuthConsumer>


          
        )
    }
}

import NavBar from "../components/NavBar";
import React from "react";
import { Button } from "react-bootstrap";
import "../styles/AddDevicePage.css";
import Form from 'react-bootstrap/Form'
import QRCode from "react-qr-code";
import firebase, {db} from "../components/db";


class AddDevicePage extends React.Component {
  
    constructor(props){
        super(props);
        this.state = {
            authenticated : false,
            role : false,
            device: '',
            owner: '',
            software: '',
            lastLocation: '',
            showQRCode: false,
            QRCode: '',
            comment: '',
            show: false,
          }
        this.generateQRCode = this.generateQRCode.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChangingDeviceName = this.handleChangingDeviceName.bind(this);
        this.handleChangingLastLocation = this.handleChangingLastLocation.bind(this);
        this.handleChangingOwner = this.handleChangingOwner.bind(this);
        this.handleChangingSoftware = this.handleChangingSoftware.bind(this);
        this.handleChangingComment = this.handleChangingComment.bind(this);
        this.saveToDB = this.saveToDB.bind(this);
    }

    componentDidMount() {
      /*
      if ("geolocation" in navigator) {
        console.log("Available");
      } else {
        console.log("Not Available");
      }
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
      });*/
    }
    generateQRCode(  ){

    }

    saveToDB(lat, long){
      var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date())
      var software = this.state.software
      var softwareArray = software.split(',');
      db.collection("Device").add({
        DeviceName: this.state.device,
        Date: myTimestamp,
        Location: new firebase.firestore.GeoPoint(lat, long),
        Owner: this.state.owner,
        TimeUsed: 0,
        TotalTimeUsed: 0,
        add: false,
        lastOwner: "",
        remove: false,
        tempOwner: null,
        Comment: this.state.comment,
      })
      .then( (docRef) => {
        //console.log("Document written with ID: ", docRef.id);
        softwareArray.forEach((element)=>{
          db.collection("Device").doc(docRef.id).collection("Software").add({
            software: element,
          }).then(
              this.setState({
              QRCode : docRef.id,
        }))
        })

      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });


      this.setState({
        showQRCode : true,
      })
    }
    onSubmit(e){
      e.preventDefault();
      let latitude=0;
      let longitude=0;
      navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude
        this.saveToDB(latitude,longitude);
      
      //console.log(this.state.device,this.state.owner,this.state.software, this.state.lastLocation)
      //console.log(admin.firestore.Timestamp.now());
      
      })
      
    }

    handleChangingDeviceName(e){
      this.setState({
        device: e.target.value,
      })
    }

    handleChangingOwner(e){
      this.setState({
        owner: e.target.value,
      })
    }

    handleChangingSoftware(e){
      console.log(e.target.value)
      this.setState({
        software: e.target.value,
      })
    }

    handleChangingLastLocation(e){
      this.setState({
        lastLocation: e.target.value,
      })
    }

    handleChangingComment(e){
      this.setState({
        comment: e.target.value,
      })
    }
    render(){



        return(
            <React.Fragment>
              <div className='content'>
                <NavBar/>
                {navigator.geolocation ? 
                  <div className = 'info'>      
                    <h1 className = "Title">{"Add New Device"}</h1>
                    <div className = "DeviceForm">
                      <Form onSubmit= {this.onSubmit}> 
                        <Form.Group>
                          <Form.Label>Device Name</Form.Label>
                          <Form.Control onChange = {this.handleChangingDeviceName} value = {this.state.device} type="text" placeholder="Enter Device Name" />
                        </Form.Group>

                        <Form.Group >
                          <Form.Label>Owner</Form.Label>
                          <Form.Control onChange = {this.handleChangingOwner} value = {this.state.owner} type="text" placeholder="Enter Owner Name" />
                        </Form.Group>

                        <Form.Group >
                          <Form.Label>Software Reuired</Form.Label>
                          <Form.Control onChange = {this.handleChangingSoftware} value = {this.state.software} type="text" placeholder="Enter Software Reuired. (Seprate by commas e.g. :A,B)" />
                        </Form.Group>

                        <Form.Group >
                          <Form.Label>Comment</Form.Label>
                          <Form.Control onChange = {this.handleChangingComment} value = {this.state.comment} type="text" placeholder="Enter Comment" />
                        </Form.Group>
                
                        <p>Please Enable Your Browser Location Services For Accurate Tracking</p>
                        <Button variant="primary" type="submit">
                          Add Device & Generate QR Code 
                        </Button>
                      </Form>
                      {this.state.showQRCode ? <QRCode className = "QRcode" value={this.state.QRCode} /> : <div></div>}
                    </div>
                  </div>
                :<h3>Please enable location access from the broswer</h3>}
              </div>
            </React.Fragment>
        )
    }
}
export default AddDevicePage;
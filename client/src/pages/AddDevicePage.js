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
          }
        this.generateQRCode = this.generateQRCode.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChangingDeviceName = this.handleChangingDeviceName.bind(this);
        this.handleChangingLastLocation = this.handleChangingLastLocation.bind(this);
        this.handleChangingOwner = this.handleChangingOwner.bind(this);
        this.handleChangingSoftware = this.handleChangingSoftware.bind(this);
    }

    generateQRCode(  ){

    }

    onSubmit(e){
      e.preventDefault();
      console.log(this.state.device,this.state.owner,this.state.software, this.state.lastLocation)
      //console.log(admin.firestore.Timestamp.now());
      var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date())
      console.log(myTimestamp);
      db.collection("Device").add({
        DeviceName: this.state.device,
        Date: myTimestamp,
        Location: this.state.lastLocation,
        Owner: this.state.owner,
        TimeUsed: 0,
      })
      .then( (docRef) => {
        console.log("Document written with ID: ", docRef.id);
        this.setState({
          QRCode : docRef.id,
        })
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });


      this.setState({
        showQRCode : true,
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
      this.setState({
        software: e.target.value,
      })
    }

    handleChangingLastLocation(e){
      this.setState({
        lastLocation: e.target.value,
      })
    }
    render(){



        return(
            <React.Fragment>
            
        <div className='content'>
            <NavBar/>
            <div className = 'info'>      
            <h1 className = "Title">
                {"Add New Device"}
            </h1>
            <div className = "DeviceForm">
            <Form onSubmit= {this.onSubmit}> 
              <Form.Group >
                <Form.Label>Device Name</Form.Label>
                <Form.Control onChange = {this.handleChangingDeviceName} value = {this.state.device} type="text" placeholder="Enter Device Name" />
              </Form.Group>

              <Form.Group >
                <Form.Label>Owner</Form.Label>
                <Form.Control onChange = {this.handleChangingOwner} value = {this.state.owner} type="text" placeholder="Enter Owner Name" />
              </Form.Group>

              <Form.Group >
                <Form.Label>Software Reuired</Form.Label>
                <Form.Control onChange = {this.handleChangingSoftware} value = {this.state.software} type="text" placeholder="Enter Software Reuired. (Seprate by commas)" />
              </Form.Group>


                <Form.Group >
                <Form.Label>Current Location</Form.Label>
                <Form.Control onChange = {this.handleChangingLastLocation} value = {this.state.lastLocation} type="text" placeholder="Enter Current Location Of The Device" />
              </Form.Group>
                
              <Button variant="primary" type="submit">
                Add Device & Generate QR Code 
              </Button>
            </Form>
</div>
{this.state.showQRCode ? <QRCode value={this.state.QRCode} /> : <div></div>}

            </div>
          </div>
          </React.Fragment>
        )
    }
}
export default AddDevicePage;
import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "../styles/NavBar.css";
import firebase from "./db";
import { Redirect } from "react-router-dom";
import { AuthConsumer } from "../context/AuthContext"

function Test (){
  return(
    <AuthConsumer>
    {({authenticated, user, login, logout}) =>{
      <div>
        <Link to="/"></Link>
        <Button variant="outline-dark" onClick = {()=>(logout)}>
              Sign out
        </Button>
      </div>

    }
}
</AuthConsumer>
  )
}
class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
            
            <div className="internal-container">
            <div>Engineering for Kids</div> 
            <img src={logo} className="logo"></img>
            <Link to="/device">
                <Button variant="outline-dark">
                 My Devices
                </Button>
            </Link>
            <Link to="/staff">
                <Button variant="outline-dark">
                 EFK Calgary
                </Button>
            </Link>
            <Link to="/staff">
                <Button variant="outline-dark">
                 EFK Edmonton
                </Button>
            </Link>
            <Link to="/device">
                <Button variant="outline-dark">
                 Add New Device
                </Button>
            </Link>
            <Link to="/device">
                <Button variant="outline-dark">
                 Remove Device
                </Button>
            </Link>
            <Link to="/calendar">
                <Button variant="outline-dark">
                 Calendar
                </Button>
            </Link>
            <Test/>
            <Button variant="outline-dark" onClick = {()=>(console.log("test"))}>
              Sign out
             </Button>

            </div> 
        </div>
    );
  }
}
export default NavBar;

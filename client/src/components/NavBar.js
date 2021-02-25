import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "../styles/NavBar.css";
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


  render() {
    return (
        <div>
            
            <div className="internal-container">
            <div>Engineering for Kids</div> 
            <img src={logo} alt = "" className="logo"></img>
            <Link to="/device">
                <Button variant="danger">
                 My Devices
                </Button>
            </Link>
            <Link to="/staff">
                <Button variant="danger">
                 EFK Calgary
                </Button>
            </Link>
            <Link to="/staff">
                <Button variant="danger">
                 EFK Edmonton
                </Button>
            </Link>
            <Link to="/add">
                <Button variant="danger">
                 Add New Device
                </Button>
            </Link>
            <Link to="/device">
                <Button variant="danger">
                 Remove Device
                </Button>
            </Link>
            <Link to="/calendar">
                <Button variant="danger">
                 Calendar
                </Button>
            </Link>
            <Test/>
            <Button variant="danger" onClick = {()=>(console.log("test"))}>
              Sign out
             </Button>

            </div> 
        </div>
    );
  }
}
export default NavBar;

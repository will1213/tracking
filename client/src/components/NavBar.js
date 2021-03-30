import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "../styles/NavBar.css";
import { Redirect } from "react-router-dom";
import { AuthConsumer } from "../context/AuthContext"


function LogOut (){
  return(
    <AuthConsumer>
            {({ authenticated, user, login, logout }) => (
                <div>
                <Button variant="danger" onClick = {logout} className = "navbutton">
                            Sign Out
                </Button>
                { authenticated ? (undefined) : (<Redirect to={"/"} />)}
                </div>
            )}
            
    </AuthConsumer>
  )
}

function AddDevice (){
  return(
    <AuthConsumer>
            {({user}) => (
              <div>
              { user.role ? (
                  <Link to="/add">
                    <Button variant="danger" className = "navbutton">
                      Add New Device
                    </Button>
                  </Link>
               ) : undefined }
               </div>
            )}
            
    </AuthConsumer>
  )
}
class NavBar extends React.Component {


  render() {
    return (
      <React.Fragment>
            
            <div className="nav-container">
            Engineering For Kids
            <img src={logo} alt = "" className="navlogo"></img>
            <Link to="/home">
                <Button variant="danger" className = "navbutton">
                 Home
                </Button>
            </Link>
            <Link to="/device">
                <Button variant="danger" className = "navbutton">
                 Devices
                </Button>
            </Link>
            <Link to="/staff">
                <Button variant="danger" className = "navbutton">
                 EFK Calgary
                </Button>
            </Link>

            <Link to="/calendar">
                <Button variant="danger" className = "navbutton">
                 Calendar
                </Button>
            </Link>
            <AddDevice/>
            

            <LogOut/>

            </div> 
        </React.Fragment>
    );
  }
}
export default NavBar;

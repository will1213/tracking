import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import "../styles/NavBar.css";
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
            <Link>
                <Button variant="outline-dark">
                 Sign out
                </Button>
            </Link>
            </div> 
        </div>
    );
  }
}
export default NavBar;

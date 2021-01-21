import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "../styles/LoginPage.css";
import logo from "../images/logo.png";
import firebase, { db, auth} from "../components/db";
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.signInUser = this.signInUser.bind(this);
  }
  
 signInUser () {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user);
    // ...
  }).catch((error) => {
    console.log(error);

  });
 }

  render() {
    return (
      <React.Fragment>
          <div className="container">
            <div className="internal-container">
             <img src={logo} className="logo"></img>

              <Button
                className="login-button"
                onClick={()=>{this.signInUser()}}
              >
                Sign in With Google
              </Button>
            </div>
          </div>
      </React.Fragment>
    );
  }
}

export default LoginPage;
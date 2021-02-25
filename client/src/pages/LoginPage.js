import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "../styles/LoginPage.css";
import logo from "../images/logo.png";
import firebase, { db, auth} from "../components/db";
import { AuthConsumer } from "../context/AuthContext"
import 'react-calendar/dist/Calendar.css';


function Loginfun (){
  return(
    <AuthConsumer>
            {({ authenticated, user, login, logout }) => (

                <div className="container">
                <div className="internal-container">
                <img src={logo} className="logo"></img>
                <Button
                              className="login-button"
                              onClick = {login}
                            >
                            Sign in With Google
                            </Button>
                {authenticated ? (
                  <Redirect to={"/device"} />
                ) : (
                  undefined
                )}
              </div>
              </div>
            )}
  </AuthConsumer>
  )
}

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated : false,
      role : false,
      context : false,

    }
    this.signInUser = this.signInUser.bind(this);
    this.createContext = this.createContext.bind(this);
  }
  
 signInUser () {
   
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    // @type {firebase.auth.OAuthCredential} 
    var credential = result.credential;

    var token = credential.accessToken;
    var user = result.user;
    console.log(user);
    this.setState({
      authenticated: true,
      user: user,
    })
  }).catch((error) => {
    console.log(error);

  });
 }
 createContext (){

 }

  render() {
    return (
        <React.Fragment>
          <Loginfun />
        </React.Fragment>
        );
  }
}

export default LoginPage;
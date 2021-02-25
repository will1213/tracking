import React from 'react'
import firebase, { auth} from "../components/db";
const AuthContext = React.createContext()

class AuthProvider extends React.Component {
  state = { 
    authenticated: false,
    user:{}
    }

  constructor() {
    super()
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  login() {

    console.log("inauthcontext");
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;
  
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(user);
      //console.log(token);
      this.setState({
        authenticated: true,
        user: user,
      });
      // ...
    }).catch((error) => {
      console.log(error);
  
    });
    console.log(auth);

    setTimeout(() => this.setState({ isAuth: true }), 1000)
  }

  logout() {
    firebase.auth().signOut().then(() => {
        console.log("logged out");
        this.setState({
            authenticated: false,
          });
    }).catch((error) => {
        console.log("failed to log out")
    }
    )
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          authenticated: this.state.authenticated,
          user: this.state.user,
          login: this.login,
          logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }

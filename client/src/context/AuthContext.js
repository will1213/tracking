import React from 'react'
import firebase, { db, auth} from "../components/db";
const AuthContext = React.createContext()

class AuthProvider extends React.Component {
  state = { 
    authenticated: localStorage.getItem("logged"),
    user : JSON.parse(localStorage.getItem("user")),
    id : localStorage.getItem("id"),
    }

  constructor() {
    super()
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.addUser = this.addUser.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changePhone = this.changePhone.bind(this);
  }
  addUser(profile){
          db.collection("Staff").doc(profile.id).set({
            Name:profile.name,
            Email:profile.email,
            role: false,
            Phone: '',
            }).then(()=>{    
              db.collection("Staff").doc(profile.id).collection("Class").add({
              ClassName: null,
            })
            }).then(()=>{
              db.collection("Staff").doc(profile.id).get()
              .then((doc)=>{       
                if (doc.exists){
                this.setState({
                  user: doc.data(),
                });
                localStorage.setItem("user", JSON.stringify(doc.data()))
                localStorage.setItem("id", profile.id)
                localStorage.setItem("logged", true)
              }})
            }).then(
              this.setState({
                authenticated: true,
              })
            ).catch(function(error) {
              console.error("Error adding document: ", error);
            });
  }
  changeName (name){
    var theUser = this.state.user;
    theUser.Name = name;
    //db.collection("Staff").doc(profile.id)
    db.collection("Staff").doc(this.state.id).update({
      Name: name,
    }).then(
      this.setState({
        user : theUser,
      })
    )
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

  changePhone (phone){
    var theUser = this.state.user;
    theUser.Phone = phone;
    db.collection("Staff").doc(this.state.id).update({
      Phone: phone,
    }).then(
      this.setState({
        user : theUser,
      })
    )
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });

  }
  changeEmail (email){
    var theUser = this.state.user;
    theUser.Email = email;
    db.collection("Staff").doc(this.state.id).update({
      Email: email,
    }).then(
      this.setState({
        user : theUser,
      })
    )
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }
  login() {

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;
  
      var userProfile = result.additionalUserInfo.profile;

      //Add user to the database





      
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      //console.log(token);



      db.collection("Staff").doc(userProfile.id).get().then((doc)=>{
        if (doc.exists){
          this.setState({
            user: doc.data(),
            id: userProfile.id,
            authenticated: true,
          });
          user = doc.data();
          localStorage.setItem("user", JSON.stringify(user))
          localStorage.setItem("id", userProfile.id)
          localStorage.setItem("logged", true)

        }else{
          this.addUser(userProfile);
        }
      })

      
      //Set local storage
      
      
      
      
      // ...
    }).catch((error) => {
      console.log(error);
  
    });

    setTimeout(() => this.setState({ isAuth: true }), 1000)

  }

  logout() {
    firebase.auth().signOut().then(() => {
        localStorage.removeItem('logged');
        localStorage.removeItem("user");
        localStorage.removeItem("id");
        this.setState({
            authenticated: false,
          });
    }).catch((error) => {
        console.log(error)
    }
    )
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          authenticated: this.state.authenticated,
          user: this.state.user,
          id: this.state.id,
          login: this.login,
          logout: this.logout,
          changePhone: this.changePhone,
          changeEmail: this.changeEmail,
          changeName: this.changeName,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }

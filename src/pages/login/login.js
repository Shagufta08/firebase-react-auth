import React,{Component} from 'react';
import firebase from 'firebase';
import './login.css';
//for styling of buttons
import { MDBBtn } from "mdbreact";
import Styleauth from 'react-firebaseui/StyledFirebaseAuth';
import sparkslogo from '../../assests/sparks_logo.png';

require('dotenv').config();


console.log(process.env);

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain:process.env.AUTH_DOMAIN
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class Login extends Component{

  state ={
    loggedIn : false
  }
    
  config = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ loggedIn : !!user })
        console.log("user", user)
    })
  }

  render(){
    return (
      <div className="Login">
        {this.state.loggedIn ? (
          <span>
            <div className="LoginPage">
              <div className="space"></div>
              <div className="heading">Welcome {firebase.auth().currentUser.displayName}<br></br> to The Sparks Foundation</div>
              
              <img
                 className="profile"
                  alt="profile picture"
                  src={firebase.auth().currentUser.photoURL}
                />
              <div className="text">You've successfully Logged In!</div>
              <MDBBtn size="lg" gradient="purple" onClick={() => firebase.auth().signOut()}>Log out</MDBBtn>
            </div>
          </span>
        ) : (
            <div className="LoginPage">
              <div className="space"></div>
                <h1 className="heading">Welcome to </h1>
                <h1 className="heading" >THE SPARKS FOUNDATION</h1>
        
                <img 
                  alt="sparks logo"
                  src={sparkslogo}
                  />
              
              <Styleauth
                uiConfig={this.config}
                firebaseAuth={firebase.auth()}
              />
            
            </div>
        )}  
      </div>
    );
  }
}

export default Login;
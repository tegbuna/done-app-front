//Import firebase core module
import firebase from 'firebase/app';
//import auth package from firebase
import 'firebase/auth';


  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDjCPpxbggnjAalY8pQ75SHfj4mps-S_lY",
    authDomain: "done-63ec6.firebaseapp.com",
    projectId: "done-63ec6",
    storageBucket: "done-63ec6.appspot.com",
    messagingSenderId: "700237742754",
    appId: "1:700237742754:web:de839348fd0bda86f74dfb"
  };

  //Initialize app
firebase.initializeApp(firebaseConfig);

//Set up  & configure firebase provider(s)
const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

//Setup auth actions (login, logout, etc...)
function login() {
    auth.signInWithPopup(provider);
}

function logout() {
    auth.signOut();
}

//Export actions
export {
    auth,
    login,
    logout,
}
import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDmQ_Pm6Rc9DhgF2tsbprxoiUaw11ymXqw",
    authDomain: "task-manager-reactjs-ca2f5.firebaseapp.com",
    databaseURL: "https://task-manager-reactjs-ca2f5.firebaseio.com",
    projectId: "task-manager-reactjs-ca2f5",
    storageBucket: "task-manager-reactjs-ca2f5.appspot.com",
    messagingSenderId: "702108500327"
  };

export const firebaseApp = firebase.initializeApp(config);
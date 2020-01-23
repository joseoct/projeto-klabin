import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  constructor() { 
    const config = {
      apiKey: "AIzaSyCwZRzrukCiTAO3tVgxbOW2OEH1iMnPhOk",
      authDomain: "klabin-database.firebaseapp.com",
      databaseURL: "https://klabin-database.firebaseio.com",
      projectId: "klabin-database",
      storageBucket: "klabin-database.appspot.com",
      messagingSenderId: "393292231107",
      appId: "1:393292231107:web:17f6ed3ebcdf48e35bcd76",
      measurementId: "G-X9NWYN7R9E"
    };
    firebase.initializeApp(config);    
  }

  gotData(data){
      console.log(data.val());
  }

  errData(err){
    console.log('Error!')
    console.log(err);
  }

  db(){
    return firebase.firestore()
  }

  auth(){
    return firebase.auth()
  }
}

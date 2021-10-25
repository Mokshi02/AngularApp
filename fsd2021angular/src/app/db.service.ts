import { Injectable } from '@angular/core';
import { FirebaseApp } from '@firebase/app';
import { initializeApp } from '@firebase/app';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DBService {

  app: FirebaseApp;
  userLoggedIn!: Boolean;
  constructor() { 
    this.app = initializeApp(environment.firebase);
    console.log("DB - Firebase Initialized");
    this.userLoggedIn = false;
  }

  SetUserLogin(userLoggedIn: Boolean){
    this.userLoggedIn = userLoggedIn;
  }

  getUserLogin(): Boolean {
    return this.userLoggedIn;
  }
}

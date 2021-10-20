import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import{ Profile } from '../model/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  // email = new FormControl('demo@example.com');
  email = new FormControl('');
  myProfile: Profile = {
    name: "John Watson",
    about: "Learning Angular",
    email: "John@example.com",
    age: 21,
    gender: "Male",
    address: "4562 basant vihar",
  };
  message = "";
  userData: any

  constructor() { 
    const data = localStorage.getItem("userData");
    this.userData = JSON.parse(data!);
  }

  ngOnInit(): void {
  }

  onButtonClicked(){
    this.message= "This is changed";
  }

  validate(){
     if(this.email.value == ""){
      // Exploratory Assignment
      // Regular Expressions to Validate the Email
       this.message = "Email is invalid";
       this.email.setValue("demo@example.com");
     }else {
       this.message = "Email is valid";
     }
   }
}

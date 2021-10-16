//import { HttpResponse } from '@angular/common/http';
//import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { DBService } from '../db.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  uid: string = "NA";
  authForm = new FormGroup(
    {
      email: new FormControl(''),
      password: new FormControl(''),
    }
  );

  constructor(db: DBService) { }

  ngOnInit() {
  }
  // onLoginButtonClicked(email: string, password: string) {
  //   this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
  //     if (res.status === 200) {
  //       // we have logged in successfully
  //       this.router.navigate(['/home']);
  //     }
  //     console.log(res);
      
  //   });
  // }

  loginUser(){
    //console.log(this.authForm.value);
     const auth = getAuth();
     signInWithEmailAndPassword(auth, this.authForm.value.email, this.authForm.value.password)
     .then((userCredential) => {
         console.log("User Login in Auth Module");
         const user = userCredential.user;
         this.uid = userCredential.user.uid;
     })
     .catch((error) =>{
       console.log("Something Went Wrong");
     });
  }

}

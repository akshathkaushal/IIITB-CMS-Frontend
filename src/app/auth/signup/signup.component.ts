import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {SignupRequestPayload} from "./signup-request-payload";
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
import {ToastrModule, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequestPayload: SignupRequestPayload | any;
  signupForm: FormGroup | any;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.signupRequestPayload = {
      rollNo: '',
      name: '',
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      rollNo: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  signup() {
    this.signupRequestPayload.rollNo = this.signupForm.get('rollNo').value;
    this.signupRequestPayload.name = this.signupForm.get('name').value;
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;

    this.authService.signup(this.signupRequestPayload)
      .subscribe( () => {
        this.router.navigate(['/login'],
          {queryParams: {registered: true}});
      }, () =>{
        this.toastr.error("Registration failed! Please try again");
      });

  }

}

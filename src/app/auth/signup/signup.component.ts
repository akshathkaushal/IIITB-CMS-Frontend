import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {SignupRequestPayload} from "./signup-request-payload";
import {AuthService} from "../shared/auth.service";
import {Router} from "@angular/router";
import { NgModule } from '@angular/core';
import {ToastrModule, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequestPayload: SignupRequestPayload | any;
  signupForm: FormGroup | any;
  radioValue : boolean = false;
  selectedRole : String = "student";
  committees: any;
  select : any;
  // Committees =
  // [
  //   { name: 'Sports Committee', code: 'Sports Committee' },
  //   { name: 'Food Committee', code: 'Food Committee' },
  //   { name: 'Gym Committee', code: 'Gym Committee' },

  // ];
  // Committees = [];

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.signupRequestPayload = {
      rollNo: '',
      name: '',
      email: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      rollNo: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.getDropDown();
  }

  getDropDown()
  {
    this.authService.getDropDown().subscribe(data =>{
      this.committees = [...data];
    });
  }

  toggleDropdown(flag:number)
  {
    if (flag == 0)
    {
      this.radioValue = true;
      this.selectedRole = "committee";
    }
    else if (flag == 1)
    {
      this.radioValue = false;
      this.selectedRole = "student";
    }
    else console.log("radio button error");
  }

  tester()
  {
    this.select = document.getElementById('select')
    this.signupRequestPayload.rollNo = "Committee"
    this.signupRequestPayload.name = this.select.value;
    console.log(this.select.value);
  }


  signup() {

    if(this.radioValue==true)//committee
    {
      this.tester();
    }
    else
    {
      this.signupRequestPayload.rollNo = this.signupForm.get('rollNo').value;
      this.signupRequestPayload.name = this.signupForm.get('name').value;
    }
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;
    this.signupRequestPayload.role = this.selectedRole;

    this.authService.signup(this.signupRequestPayload)
      .subscribe( () => {
        this.router.navigate(['/login'],
          {queryParams: {registered: true}});
      }, () =>{
        this.toastr.error("Registration failed! Please try again");
      });

  }

}

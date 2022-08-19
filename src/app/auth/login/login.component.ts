import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginRequestPayload} from "./login.request.payload";
import {AuthService} from "../shared/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Toast, ToastrService} from "ngx-toastr";
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() roles = new EventEmitter();



  loginForm: FormGroup | any;
  loginRequestPayload: LoginRequestPayload | any;
  isError: any;
  registerSuccessMessage: string | any;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {
    this.loginRequestPayload = {
      rollNo: '',
      // email:'',
      password: ''
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      // rollNo: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams.subscribe(params => {
      if(params['registered'] !== undefined && params['registered'] === 'true') {
        this.toastr.success("Signup successful");
        this.registerSuccessMessage = "Please check your inbox for activation mail!";
      }
    });

  }

  login():Observable<any> {
    // this.loginRequestPayload.email = this.loginForm.get('rollNo').value;
    this.loginRequestPayload.email = this.loginForm.get('email').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;
    // const res = await this.authService.login(this.loginRequestPayload).toPromise();
    this.authService.login(this.loginRequestPayload).subscribe((data: any) => 
    {
      if(data) {
        this.isError = false;
        console.log("data received from login response is " , data);
        this.roles.emit(data.role);
        if(data.role == 'student') this.router.navigateByUrl('student');
        else if (data.role == 'committee') this.router.navigateByUrl('');
        else if (data.role == 'admin') this.router.navigateByUrl('adminHome');
        else console.log("role not received");

        // this.router.navigateByUrl('studHome');
        // this.toastr.success('Login successful');
      } else {
        this.isError = true;
      }
    });
    return of(null);
  }
}

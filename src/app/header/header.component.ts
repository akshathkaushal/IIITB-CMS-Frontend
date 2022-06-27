import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/shared/auth.service";
import {Router} from "@angular/router";
import { faUser} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faUser = faUser;
  rollNo: string;
  isLoggedIn: boolean;
  name : string;
  role : string;
  display : string;

  constructor(private authService: AuthService, private router: Router) {
    this.rollNo = "",
    this.isLoggedIn = false,
    this.name ="",
    this.role = this.authService.getRole(),
    this.display =""
  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data:boolean) => this.isLoggedIn = data);
    this.authService.rollNo.subscribe((data:string) => this.rollNo = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.name = this.authService.getName();
    this.rollNo = this.authService.getRollNo();
    console.log("NGONINIT CALLED")
    this.refreshNavbar();
  }

  goToUserProfile() {
    this.router.navigateByUrl("/user-profile/" + this.rollNo);
  }

  refreshNavbar()
  {
    console.log("this is header ")
    if(this.role == 'student')
    {
      this.display = this.authService.getRollNo();
      console.log(this.display);
    }
    else if(this.role == 'committee')
    {
      this.display = this.authService.getName();
      console.log(this.display);
    }
    else if (this.role == 'admin')
    {
      this.display = 'admin';
      console.log(this.display);
    }
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    localStorage.clear();
    window.location.href = "login";
  }

}

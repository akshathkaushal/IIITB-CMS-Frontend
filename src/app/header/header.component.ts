import { Component, OnInit, Output } from '@angular/core';
import {AuthService} from "../auth/shared/auth.service";
import {Router} from "@angular/router";
import { faUser} from "@fortawesome/free-solid-svg-icons";
import { LocalStorageService } from 'ngx-webstorage';

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
  navigate:string = "";

  constructor(private authService: AuthService, private router: Router,private localStorage: LocalStorageService) {
    this.rollNo = "",
    this.isLoggedIn = false,
    this.name ="",
    this.role = this.localStorage.retrieve("role"),
    this.display =""
  }

  async ngOnInit(): Promise<void> {
    this.role = this.localStorage.retrieve("role")

    this.authService.loggedIn.subscribe((data:boolean) => this.isLoggedIn = data);
    this.authService.rollNo.subscribe((data:string) => this.rollNo = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.name = this.authService.getName();
    // this.role = this.localStorage.retrieve("role")
    // this.role = await this.authService.getRole().toPromise();
    // this.rollNo = this.authService.getRollNo();
    console.log(this.rollNo);
    this.refreshNavbar();

  }

  goToUserProfile() {
    this.router.navigateByUrl("profile" + this.rollNo);
  }

  refreshNavbar()
  {
    // this.role = this.localStorage.retrieve("role")
    console.log("this is header ",this.role)
    if(this.role == 'student')
    {
      this.display = this.authService.getRollNo();
      console.log(this.display);
      this.navigate = "studHome";
    }
    else if(this.role == 'committee')
    {
      this.display = this.authService.getName();
      console.log(this.display);
      this.navigate = "commHome";

    }
    else if (this.role == 'admin')
    {
      this.display = 'admin';
      console.log(this.display);
      this.navigate = "adminHome";

    }
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    localStorage.clear();
    window.location.href = "login";
  }

}

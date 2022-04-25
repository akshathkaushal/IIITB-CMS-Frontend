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
  rollNo: string | any;
  isLoggedIn: boolean | any;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data:boolean) => this.isLoggedIn = data);
    this.authService.rollNo.subscribe((data:string) => this.rollNo = data);
    this.isLoggedIn = this.authService.isLoggedIn();
    this.rollNo = this.authService.getRollNo();
  }

  goToUserProfile() {
    this.router.navigateByUrl('/user-profile/' + this.rollNo);
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('/');
  }

}

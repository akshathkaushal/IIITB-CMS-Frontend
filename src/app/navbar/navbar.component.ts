import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/shared/auth.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  rollNo: string = "";
  name: string = "";

  constructor(private authService: AuthService,private localStorage: LocalStorageService,
    private router: Router) { }

  navigate : string = "";
  role : string = "";
  display : string = "";

  async ngOnInit(): Promise<void>
  {
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

  goToUserProfile() {
    this.router.navigateByUrl("profile" + this.rollNo);
  }

  logout() {
    this.authService.logout();
    localStorage.clear();
    window.location.href = "login";
  }

}

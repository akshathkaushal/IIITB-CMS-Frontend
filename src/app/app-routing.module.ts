import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import {HomeComponent} from "./home/home.component";
import {CreatePostComponent} from "./post/create-post/create-post.component";
import {CreateSubpostComponent} from "./subpost/create-subpost/create-subpost.component";
import {ListSubpostsComponent} from "./subpost/list-subposts/list-subposts.component";
import {ViewPostComponent} from "./post/view-post/view-post.component";
import {UserProfileComponent} from "./auth/user-profile/user-profile.component";
import {AuthGuard} from "./auth/auth.guard";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'sign-up', component: SignupComponent },
  {path: 'login', component: LoginComponent },
  {path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard]},
  {path: 'create-subpost', component: CreateSubpostComponent, canActivate: [AuthGuard]},
  {path: 'list-subposts', component: ListSubpostsComponent},
  {path: 'view-post/:id', component: ViewPostComponent},
  {path: 'user-profile/:rollNo', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'logout', component: LoginComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

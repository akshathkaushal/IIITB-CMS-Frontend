import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {NgxWebstorageModule} from "ngx-webstorage";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { HomeComponent } from './home/home.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { PostTileComponent } from './shared/post-tile/post-tile.component';
import { VoteButtonComponent } from './shared/vote-button/vote-button.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { SubpostSideBarComponent } from './shared/subpost-side-bar/subpost-side-bar.component';
import { CreateSubpostComponent } from './subpost/create-subpost/create-subpost.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ListSubpostsComponent } from './subpost/list-subposts/list-subposts.component';
import {EditorModule, TINYMCE_SCRIPT_SRC} from "@tinymce/tinymce-angular";
import { ViewPostComponent } from './post/view-post/view-post.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import {AuthService} from "./auth/shared/auth.service";
import {TokenInterceptor} from "./token-interceptor";
import { FormsModule } from '@angular/forms';
import { StudHomePageComponent } from './home/stud-home-page/stud-home-page.component';
import { CommHomePageComponent } from './home/comm-home-page/comm-home-page.component';
import { AdminHomePageComponent } from './home/admin-home-page/admin-home-page.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    PostTileComponent,
    VoteButtonComponent,
    SideBarComponent,
    SubpostSideBarComponent,
    CreateSubpostComponent,
    CreatePostComponent,
    ListSubpostsComponent,
    ViewPostComponent,
    UserProfileComponent,
    StudHomePageComponent,
    CommHomePageComponent,
    AdminHomePageComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    EditorModule,
    NgbModule,
    FormsModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

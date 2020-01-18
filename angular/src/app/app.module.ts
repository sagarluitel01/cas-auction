// built in library
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserService } from './components/user/service/user.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminComponent } from './components/admin/admin.component';
import { CreateAuctionComponent } from './components/admin/create-auction/create-auction.component';
import { AuctionsComponent } from './components/auctions/auctions.component';
import { AuctionsListComponent } from './components/auctions-list/auctions-list.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { CartComponent } from './components/cart/cart.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { AuctionEditComponent } from './components/auction-edit/auction-edit.component';
import { AddStaffComponent } from './components/admin/add-staff/add-staff.component';
import { ParticipantsListComponent } from './components/participants-list/participants-list.component';

// routes
const appRoutes: Routes = [
  { 
    path: '', component: HomeComponent 
  },
  // url: 'user/
  { 
    path: 'user', redirectTo: '/user/signin', pathMatch: 'full' 
  },
  // url: 'user/signup'
  { 
    path: 'user', component: UserComponent,
    children: [{ path: 'signup', component: SignUpComponent }] 
  },
  // url: 'user/signin'
  {
    path: 'user', component: UserComponent,
    children: [{ path: 'signin', component: SignInComponent }]
  },
  // url: 'dashboard'
  { 
    path: 'dashboard', component: DashboardComponent,
    canActivate:[AuthGuard] 
  },
  // url: 'administration'
  { 
    path: 'admin', component: AdminComponent 
  },
  // url: 'auctions
  {
    path: 'auctions', component: AuctionsComponent
  },
  // url: 'edit'
  {
    path: 'editAuction/:id', component: AuctionEditComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    DashboardComponent,
    AdminComponent,
    CreateAuctionComponent,
    AuctionsComponent,
    AuctionsListComponent,
    AddItemComponent,
    CartComponent,
    ItemListComponent,
    AuctionEditComponent,
    AddStaffComponent,
    ParticipantsListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    },
    AuthGuard,
    UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
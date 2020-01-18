// get built in
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';

// get components
import { AuctionService} from '../service/auction.service';
import { Auction } from '../model/auction.model';
import { UserService } from '../user/service/user.service';
import { User } from '../user/model/user.model';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.css']
})
export class AuctionsComponent implements OnInit {

  auctionId;
  auctionInfo = new Auction();
  userDetails = new User();

  constructor(
    private auctionService: AuctionService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
  ){
      // Get the param value
      this.activatedRoute.queryParams.subscribe(params => {
      this.auctionId = params["auctionId"];
    })
  }

  // Load the selected auction info
  ngOnInit() {
    this.getAuction();
    this.getUser();
  }

  getAuction(){
    this.auctionService.getAuctionInfoById(this.auctionId).subscribe(
      res => {
        this.auctionInfo = res as Auction;
      },
      err => {
        console.log(err);
      }
    )
  }

  getUser(){
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => { 
        console.log(err);
      }
    );
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/user/signin']);
  }

  onParticipate(){
    this.auctionService.participateAuction(this.auctionId, this.userDetails._id).subscribe();
  }
}

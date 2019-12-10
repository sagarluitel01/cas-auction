// get built in
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// get components
import { AuctionService} from '../service/auction.service';
import { Auction } from '../model/auction.model';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.css']
})
export class AuctionsComponent implements OnInit {

  auctionName;
  auctionInfo = new Auction();

  constructor(
    private auctionService: AuctionService,
    private activatedRoute: ActivatedRoute)
  {
    // Get the param value
    this.activatedRoute.queryParams.subscribe(params => {
      this.auctionName = params["auctionName"];
    })
  }

  // Load the selected auction info
  ngOnInit() {
    this.auctionService.getAuctionInfo(this.auctionName).subscribe(
      res => {
        this.auctionInfo = res as Auction;
      },
      err => {
        console.log(err);
      }
    )
  }
}

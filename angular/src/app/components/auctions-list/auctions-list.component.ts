// get built in
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

// get components
import { AuctionService} from '../service/auction.service';
import { Auction } from '../model/auction.model';

@Component({
  selector: 'app-auctions-list',
  templateUrl: './auctions-list.component.html',
  styleUrls: ['./auctions-list.component.css']
})
export class AuctionsListComponent implements OnInit {

  auctionsInfo;

  constructor(
    private auctionService: AuctionService,
    private router: Router ) { }

  // Get all of the auctions' info on init
  ngOnInit() {
    this.auctionService.getAllAuctionsInfo().subscribe(
      res => {
        this.auctionsInfo = res as Auction[];
      },
      err => {
        console.log(err);
      }
    );
  }

  // Go to the auction info page when user clicked on an auction
  onSelectAuction(selectAuction: Auction){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "auctionName": selectAuction.auctionName
      }
    }

    this.router.navigate(['/auctions'], navigationExtras);
  }
}

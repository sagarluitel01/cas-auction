import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { Auction } from '../model/auction.model';
import { AuctionService } from '../service/auction.service';

@Component({
  selector: 'app-auction-edit',
  templateUrl: './auction-edit.component.html',
  styleUrls: ['./auction-edit.component.css']
})
export class AuctionEditComponent implements OnInit {

  id = this.route.snapshot.paramMap.get('id');
  auctionInfo = new Auction();
  auction = new Auction();
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(
    private auctionService: AuctionService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
    this.auctionService.getAuctionInfoById(this.id).subscribe(
      res => {
        this.auctionInfo = res as Auction;
        this.auction = this.auctionInfo;
      },
      err => {
        console.log(err);
      }
    )
  }

  onSubmit(form: NgForm){
    this.auctionService.editAuction(form.value).subscribe(
      (res) => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "auctionId": this.id
          }
        }

        this.router.navigate(['/auctions'], navigationExtras)
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      });
  }

  deleteAuction() {
    if (confirm('Are you sure to delete this record?') === true){
      this.auctionService.deleteAuction(this.id).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }

  goBack() {
    this.location.back();
  }
}

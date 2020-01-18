// get built in
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

// get components
import { ItemService } from '../service/item.service';
import { Item } from '../model/item.model';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  constructor(
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute
  ) 
  {
    // Get the param value
    this.activatedRoute.queryParams.subscribe(params => {
      this.auctionId = params["auctionId"];
    })
  }

  // Variables
  itemInfo;
  auctionId;

  ngOnInit() {
    this.getItems();
  }

  // get all of item's info in the Auction
  getItems() {
    this.itemService.getItemsInAuction(this.auctionId).subscribe(
      res => {
        this.itemInfo = res as Item[];
      },
      err => {
        console.log(err);
      }
    );
  }

  // refresh item list
  refresh() {
    this.getItems();
  }
}

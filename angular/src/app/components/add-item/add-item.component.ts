// get built in
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";

// get components
import { Item } from '../model/item.model';
import { ItemService } from '../service/item.service';
import { UserService } from '../user/service/user.service';
import { User } from '../user/model/user.model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  showSucessMessage: boolean;
  serverErrorMessages: string;
  auctionId = this.route.snapshot.paramMap.get('id');
  userDetails = new User();
  sellerID: String;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private userService: UserService,
    )
    {}

  item: Item = {
    _id: '',
    auctionId: this.auctionId,
    itemCode: '',
    itemName: '',
    description: '',
    price: null,
    finalPrice: null,
    quantity: null,
    sellerID: '',
    buyerID: '',
  }

  ngOnInit() {
    this.item.auctionId = this.auctionId;
    this.getUser();
  }

  onSubmit(form: NgForm) {
    this.item.auctionId = this.auctionId;
    this.item.itemCode = form.value.itemCode;
    this.item.itemName = form.value.itemName;
    this.item.description = form.value.description;
    this.item.price = form.value.price;
    this.item.quantity = form.value.quantity;
    this.item.sellerID = this.sellerID;

    this.itemService.addItem(this.item).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong. Please contact admin.';
      }
    );
  }

  resetForm(form: NgForm) {
    this.item = {
      _id: '',
      auctionId: this.auctionId,
      itemCode: '',
      itemName: '',
      description: '',
      price: null,
      finalPrice: null,
      quantity: null,
      sellerID: '',
      buyerID: '',
    };

    form.resetForm();
    this.serverErrorMessages = '';
  }

  getUser(){
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.sellerID = this.userDetails._id;
      },
      err => { 
        console.log(err);
      }
    );
  }
}

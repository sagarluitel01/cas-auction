// get built in
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";

// get components
import { Item } from '../model/item.model';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  showSucessMessage: boolean;
  serverErrorMessages: string;
  auctionId: string;

  constructor(
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute)
    {
      // Get the param value
      this.activatedRoute.queryParams.subscribe(params => {
      this.auctionId = params["auctionId"];
      })
    }

  item: Item = {
    auctionId: this.auctionId,
    itemCode: '',
    itemName: '',
    description: '',
    price: null,
    quantity: null,
    winner: ''
  }

  ngOnInit() {
    this.item.auctionId = this.auctionId;
  }

  onSubmit(form: NgForm) {
    this.item.auctionId = this.auctionId;
    this.item.itemCode = form.value.itemCode;
    this.item.itemName = form.value.itemName;
    this.item.description = form.value.description;
    this.item.price = form.value.price;
    this.item.quantity = form.value.quantity;
    this.item.winner = form.value.winner;

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
      auctionId: this.auctionId,
      itemCode: '',
      itemName: '',
      description: '',
      price: null,
      quantity: null,
      winner: '',
    };

    form.resetForm();
    this.serverErrorMessages = '';
  }
}

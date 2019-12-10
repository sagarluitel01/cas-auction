// get built in
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  constructor(private itemService: ItemService) { }

  item: Item = {
    auctionName: '',
    itemCode: '',
    itemName: '',
    description: '',
    price: 0,
    quantity: 0,
    winner: ''
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.itemService.addItem(form.value).subscribe(
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
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }

  resetForm(form: NgForm) {
    this.item = {
      auctionName: '',
      itemCode: '',
      itemName: '',
      description: '',
      price: 0,
      quantity: 0,
      winner: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
}

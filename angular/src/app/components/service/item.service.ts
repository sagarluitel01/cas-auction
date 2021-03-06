// get built in
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// get components
import { environment } from '../../../environments/environment';
import { Item } from '../model/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  // httpMethods
  addItem(item: Item){
    return this.http.post(environment.itemUrl + '/addItem', item);
  }

  getItemsInAuction(auctionId: String){
    return this.http.get(environment.itemUrl + '/findItemsInAuction/' + auctionId);
  }

  sellItem(item: Item){
    return this.http.post(environment.itemUrl + '/sellItem/' + item._id, item);
  }

  getBuyerItems(buyerID: String){
    return this.http.get(environment.itemUrl + '/getBuyerItems/' + buyerID);
  }
}

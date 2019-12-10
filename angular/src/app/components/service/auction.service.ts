// get built in
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// get components
import { environment } from '../../../environments/environment';
import { Auction } from '../model/auction.model';

@Injectable({
  providedIn: 'root'
})
export class AuctionService {

  constructor(private http: HttpClient) { }

  // httpMethods

  createAuction(auction: Auction){
    return this.http.post(environment.auctionUrl + '/createAuction', auction);
  }

  getAllAuctionsInfo(){
    return this.http.get(environment.auctionUrl + '/findAllAuctions');
  }

  getAuctionInfo(auctionName: String){
    return this.http.get(environment.auctionUrl + '/findAuction/' + auctionName);
  }
}

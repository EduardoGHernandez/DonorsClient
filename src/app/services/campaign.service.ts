import { Injectable } from '@angular/core' ;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Campaign } from '../models/campaign';
import { GLOBAL } from './global'
@Injectable()
export class CampaignService{
  public url:string;
  public identity;
  public token;
  public stats;

  constructor ( public _http:HttpClient ){
    this.url = GLOBAL.url;
  }
  register(campaign : Campaign):Observable<any>{
    let params = JSON.stringify(campaign);
    console.log(params);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'new-campaign', params,{headers: headers});
  }
  getCampaigns(page):Observable<any>{
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.get(this.url+'campaigns',{headers:headers});
  }
}

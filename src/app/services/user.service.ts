import { Injectable } from '@angular/core' ;
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { GLOBAL } from './global'
@Injectable()
export class UserService{
  public url:string;
  public identity;
  public token;
  public stats;

  constructor ( public _http:HttpClient ){
    this.url = GLOBAL.url;
  }
  register(user : User):Observable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    //Peticion por POST
    return this._http.post(this.url+'register', params, {headers: headers});
  }
  login(user : User, gettoken=null): Observable<any>{
    if(gettoken != null){
      user.gettoken = gettoken;
    }
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json')  ;

    return this._http.post(this.url+'login',params, {headers:headers});
  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));
    if (identity != undefined){
      this.identity = identity;
    }else{
      this.identity = null;
    }
    return this.identity;
  }

  getToken(){
    let token = localStorage.getItem('token');
    if(token!=undefined){
      this.token = token;
    }else{
      this.token= null;
    }
    return this.token;
  }

  getCounters(userId = null):Observable<any>{
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', this.getToken());
    if(userId != null){
      return this._http.get(this.url+'count-users/'+userId, {headers:headers});
    }else{
      return this._http.get(this.url+'count-users', {headers:headers});
    }
  }

  getStats(){
    let stats = JSON.parse(localStorage.getItem('stats'));
    if(stats!=undefined){
      this.stats = stats;
    }else{
      this.stats = null;
    }
    return this.stats;
  }

  updateUser(user: User):Observable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', this.getToken());
    return this._http.put(this.url+'update-user/'+user._id, params,{headers:headers});
  }
}

import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import {CampaignService} from './services/campaign.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GLOBAL} from './services/global';
import {User} from './models/user';
import {Campaign} from './models/campaign';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, CampaignService]
})
export class AppComponent implements OnInit, DoCheck{
  public title:string;
  public url;
  public identity;
  public token;
  public user:User;
  public campaign:Campaign;
  public status:string;
  //------------------------------
  public cities:Array<string>;
  public blood_type:Array<string>;
  public hospitals:Array<string>;

  constructor(
    private _userService: UserService,
    private _campaignService:CampaignService,
    private _route : ActivatedRoute,
    private _router: Router
  ){
    this.title = 'Donum';
    this.url = GLOBAL.url;
    this.user = this._userService.getIdentity();
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.campaign = new Campaign("","","","","","","","","","","","","","");
    //-----------------------------
    this.cities = ['Leon', 'Guanajuato', 'Irapuato', 'Silao'];
    this.blood_type = ['A+','B+','O+','AB+','A-','B-','O-','AB-'];
    this.hospitals = ['Regional','Alta especialidad','Maternal'];
  }

  ngOnInit(){
    console.log(this._route.snapshot);
  }

  onSubmit(form){
    this.campaign.image = 'default.png';
    this.campaign.state = 'Guanajuato';
    this._campaignService.register(this.campaign).
      subscribe(
        response=>{
          if(response.campaign && response.campaign._id){
            this.status = "success";
            //this._router.navigate(['login']);
          }else{
            this.status="error";
          }
        },error =>{
          status = "error";
          console.log(error);
    });
    console.log('Algo hace');
    this._router.navigate(['campaigns']);
  }

  newCampaign(){
    console.log('Nueva campaña');
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity();
  }

  logout(){
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['login']);
  }
}

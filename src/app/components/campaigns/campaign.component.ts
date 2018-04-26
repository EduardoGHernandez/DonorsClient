import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Campaign} from '../../models/campaign';
import {CampaignService} from '../../services/campaign.service';
import {GLOBAL} from '../../services/global';

@Component({
  selector:'campaign',
  templateUrl: 'campaign.component.html',
  styleUrls: ['campaign.component.css'],
  providers : [CampaignService]
})

export class CampaignComponent implements OnInit{
  public title:string;
  public identity;
  public token;
  public page;
  public next_page;
  public prev_page;
  public status : string;
  public total;
  public pages;
  public campaigns :Campaign[];
  public url;
  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _campaignService: CampaignService
  ){
    this.url = GLOBAL.url;
    this.title = 'Solicitudes de donación';
  }

  ngOnInit(){
    this.actualPage();
    console.log('Campañas');
  }

  actualPage(){
    this._route.params.subscribe(
      params => {
      let page = +params['page'];
      this.page = page;
      if(!params['page'])
        page=1;
      if(page==null){
        page = 1;
      } else {
        this.next_page = page+1;
        this.prev_page = page-1;
        if(this.prev_page<=0){
          this.prev_page=1;
        }
      }
      //Obtener ususarios
      this.getCampaigns(page);
    });
  }

  getCampaigns(page){
    this._campaignService.getCampaigns(page).subscribe(
    response =>{
      if(!response.campaigns){
        this.status='error';
        console.log('Error campañas');
      } else {
        //console.log(response);
        this.total = response.total;
        this.pages = response.pages;
        this.campaigns = response.campaigns;
        if(page > this.pages){
          this._router.navigate(['campaigns',1]);
        }
      }

    },
    error =>{
      var errorMessage = error;
      console.log(errorMessage);
      if(errorMessage!=null){
        this.status = 'error';
      }
    })
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  
  openNav() {
      document.getElementById("mySidenav").style.width = "250px";
      document.getElementById("main").style.marginLeft = "250px";
      document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }

  closeNav() {
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("main").style.marginLeft= "0";
      document.body.style.backgroundColor = "white";
  }
}

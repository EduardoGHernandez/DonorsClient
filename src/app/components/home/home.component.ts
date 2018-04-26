import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {GLOBAL} from '../../services/global';

@Component({
  selector: 'home',
  templateUrl: '/home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  public title : string;
  public identity;
  public url;
  constructor(
    private _userService: UserService
  ){
    this.title = 'Bienvenido a Donors';
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('Home cargado');
    this.identity = this._userService.getIdentity();
  }
   accordion(){
     var acc = document.getElementsByClassName("accordion");
     var i;
     for (i = 0; i < acc.length; i++) {
       acc[i].addEventListener("click", function() {
         this.classList.toggle("active");
         var panel = this.nextElementSibling;
         if (panel.style.maxHeight){
           panel.style.maxHeight = null;
         } else {
           panel.style.maxHeight = panel.scrollHeight + "px";
         }
       });
     }
   }
}

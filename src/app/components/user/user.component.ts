import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {GLOBAL} from '../../services/global';

@Component({
  selector:'users',
  templateUrl: 'user.component.html',
  providers : [UserService]
})

export class UserComponent implements OnInit{
  public title:string;
  ngOnInit(){
    this.title = 'Usuario';
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'
import { User } from  '../../models/user';
import { UserService } from '../../services/user.service';
@Component({
  selector : 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})

export class RegisterComponent implements OnInit{
  public title:string;
  public user:User;
  public status:string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService : UserService
  ){
    this.title = "Registro"
    this.user = new User("","","","","","","ROLE_USER","","");
  }

  ngOnInit(){
    console.log('Componenete de register cargado...');
  }
  onSubmit(form){
    if(this.user.nickname=="") this.user.nickname=this.user.name;
    this.user.image = 'default.png';
    console.log(this.user);
    this._userService.register(this.user).
      subscribe(
        response=>{
          if(response.user && response.user._id){
            console.log(response.user);
            this.status = "success";
            form.reset();
            this._router.navigate(['login']);
          }else{
            this.status="error";
          }
        },error =>{
          status = "error";
          console.log(error);
    });
  }
}

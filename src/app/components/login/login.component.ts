import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
  selector : 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})

export class LoginComponent implements OnInit{
  public title:string;
  public user:User;
  public status:string;
  public identity;
  public token ;
  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _userService: UserService
  ){
    this.title = "Inicio de sesión";
    this.user = new User("","","","","","","ROLE_USER","","");
  }

  ngOnInit(){
    console.log('Componenete de login cargado...');
  }
  onSubmit(form){
    //Conseguir datos de usuario
    this._userService.login(this.user).subscribe(
      response => {
        //console.log(response.user);
        this.identity = response.user;
        if(!this.identity || !this.identity._id){
          this.status = 'error';
          console.log('no esta llegando el user');
        }else{
          this.status = 'success';
          //Guardar datos de usuario en localStorage
          localStorage.setItem('identity', JSON.stringify(this.identity));
          //Conseguir token
          this.getToken();
          //Redirigir a home
          //this._router.navigate(['/']);
        }
      }
      ,error => {
        var errorMessage = <any> error;
        if(errorMessage!=null)
          this.status = 'error';
        console.log(errorMessage);
      }
    );
  }

  getToken(){
    this._userService.login(this.user, 'true').subscribe(
      response => {
        //console.log(response.token);
        this.token = response.token;
        if(this.token.lenght<=0){
          this.status = 'error';
        }else{
          this.status = 'success';
          //Guardar token en localStorage
          localStorage.setItem('token', this.token);
          //Contadores del usuario
          this.getCounters()
        }
      }
      ,error => {
        var errorMessage = <any> error;
        if(errorMessage!=null)
          this.status = 'error';
        console.log(errorMessage);
      }
    );
  }

  getCounters(){
    this._userService.getCounters().subscribe(
      response => {
        localStorage.setItem('stats',JSON.stringify(response));
        this.status = 'success';
        this._router.navigate(['/']);
      },
      error => {
        this.status = 'error';
        console.log(<any> error);
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { GLOBAL} from '../../services/global';

@Component({
  selector:'user-edit',
  templateUrl: './user-edit.component.html',
  providers: [UserService, UploadService]
})

export class UserEditComponent implements OnInit{
  public title:string;
  public status:string;
  public user:User;
  public identity;
  public token;
  public url;
  public filesToUpload:Array<File>;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _uploadService: UploadService
  ){
    this.title = 'Actualiza tu información';
    this.user = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.identity = this.user;
    this.status = null;
    this.url = GLOBAL.url;
  }

  ngOnInit(){

  }

  onSubmit(){
    //console.log(this.user);
    this._userService.updateUser(this.user).subscribe(
      response =>{
        //console.log(response);
        if(!response){
          this.status='error';
        } else{
          this.status='success';
          localStorage.setItem('identity', JSON.stringify(this.user));
          this.identity = this.user;
          //Subir imagen de usuario
          //console.log('Hasta aqui vamos bien');
          this._uploadService.makeFileRequest(this._userService.url+'upload-image-user/'+this.user._id,[],this.filesToUpload, this.token,'image')
            .then((result:any)=>{
              console.log('Aqui imprimi algo');
              console.log(result);
              this.user.image = result.user.image;
              localStorage.setItem('identity', JSON.stringify(this.user));
              this.identity = this.user;
            });
            this.user = this._userService.getIdentity();
            localStorage.setItem('identity', JSON.stringify(this.user));
            this.identity = this.user;
          //console.log('Al fin todo bien :D');
        }
      },
      error => {
        var errorMessage = <any> error;
        console.log(errorMessage);
        if(errorMessage!=null){
          this.status = 'error';
        }
      }
    )
  }

  fileChangeEvent(fileInput:any ){
    this.filesToUpload = <Array<File>> fileInput.target.files;
  }
}

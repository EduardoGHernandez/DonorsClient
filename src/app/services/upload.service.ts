import {Injectable} from '@angular/core';
import { GLOBAL } from './global';

@Injectable()
  export class UploadService{
    public url:string;

    constructor(){
      this.url = GLOBAL.url;
    }

    makeFileRequest(
      url:string,
      params: Array<string>,
      files: Array<File>,
      token:string,
      fileName: string
    ){
      //console.log('Entro');
      return new Promise(function(resolve,reject){
        var formData: any = new FormData();
        var xhr = new XMLHttpRequest();
        for(var i = 0; i < files.length; i++){
          formData.append(fileName,files[i], files[i].name);
        }
        xhr.onreadystatechange = function(){
          console.log(xhr.readyState);
          console.log(xhr.status);
          if(xhr.readyState == 4){
            if(xhr.status == 200){
              resolve(JSON.parse(xhr.response));
            } else {
              console.log('Siempre fui yo el error');
              reject(xhr.response);
              console.log('wait a little dude');
            }
          }
        }
        xhr.open('POST',url,true);
        xhr.setRequestHeader('Authorization',token);
        xhr.send(formData);
        //console.log('Y salgo D:');
      });
    }
}

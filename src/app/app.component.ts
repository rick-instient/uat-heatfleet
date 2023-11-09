import { Component, Inject } from '@angular/core';
import { CommonService } from './shared/services/common.config';
import { DOCUMENT } from '@angular/common';
import { AuthenticationService } from './shared/authentication/authentication.service';
import { finalize } from 'rxjs';
// import { CookieService } from 'ngx-cookie-service';


export interface CustomWindow extends Window {

  customProperty: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private window: CustomWindow;
  title = 'Tour of Heroes';
  constructor(
    //
    public config: CommonService,
    @Inject(DOCUMENT) private document: Document,
    protected authenticationServie: AuthenticationService,

  ) {
    this.window = <any>this.document.defaultView;


  }

  ngOnInit(){
    // let test = this.document.cookie;
// console.log(test);

// if (typeof this.window && this.window.document && this.config.getCookie('NEWGEN') && this.config.getCookie('NewToken2')){

//   let refresh = this.config.getCookie('NEWGEN');


// console.log(this.config.getCookie('NEWGEN'));
// console.log(this.config.getCookie('NewToken2'));

// var newToken_ = refresh;
// let tokenWithEqual = refresh.substr(refresh.length - 1); 
// if(tokenWithEqual != '='){
// newToken_ = newToken_+'='
// }


// this.authenticationServie
// .refreshAccessToken(newToken_);


// }


  }





  closeMenu() {
    if (this.config.noClick == false) {
      if (this.config.login == false) {
        this.config.login = true;
      }
      if (this.config.dealer == false) {
        this.config.dealer = true;
      }
      if (this.config.islogin == false) {
        this.config.islogin = true;
      }
    }
  }

}

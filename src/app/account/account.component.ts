import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClientApiService } from '../services/client-api.service';
import { LoginService } from '../services/login.service';
import { ShareDataService } from '../services/share-data.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  accountInfo: any;
  clickevent: any;
  ourdesign: boolean = false;
  siteName: string = environment.siteName;
  Update: any;
  selectedlang: any;
  range = "en";
  language: any;
  Alllanguage: any;







  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private shareService:ShareDataService,
    private clientApi: ClientApiService,

  ) { 
    if (this.tokenService.getLanguage()) {
      this.selectedlang = this.tokenService.getLanguage()
      this.selectlanguage(this.selectedlang)
    } else {
      this.selectlanguage('en')
    }
  }

  ngOnInit() {
    this.getlanguages();
    this.UserDescription();
  }
  getlanguages() {
    this.shareService._lagugageSub$.subscribe(data => {
      if(data != null){
      this.Update = data
      }
      if(this.Update?.myaccount=="আমার অ্যাকাউন্ট"){
        $("#accountPopup").css('font-size', '9px');
      }else{
        $("#accountPopup").css('font-size', 'inherit');
      }
      // console.log(this.Update);

    })
  }
  selectlanguage(newValue) {
    this.range = newValue;
    this.tokenService.setLanguage(this.range);
    this.getLanguage();
  }
  getLanguage() {
    let L = []
    this.clientApi.getlanguage().subscribe((resp: any) => {
      this.language = resp
      this.language.forEach(data => {
        if (data.lang == this.range) {
          L.push(data)
        }
        this.Alllanguage = L
        // console.log(this.Alllanguage);
        this.shareService.sharelanguage(this.Alllanguage[0]);
      })
    })
  }

  
  UserDescription() {
    this.accountInfo=this.tokenService.getUserInfo();
    // console.log(this.accountInfo)
    $('#page_loading').css('display', 'none');
  }

  changeExpo(clickevent) {
    this.clickevent = clickevent;
    if (this.clickevent == 'diamond') {
      window.location.href = "/m/diamondMobile";
    } else if (this.clickevent == 'lotus') {
      window.location.href = "/m/lotusMobile";
    }
    else if (this.clickevent == 'lc') {
      window.location.href = "/m/Lcexch";
    }else  if (this.clickevent == 'sky') {
      window.location.href = "/m/";
    } 
  }


  Logout() {
    this.loginService.logout().subscribe((resp:any) => {
      if (resp.errorCode == 0) {
        this.tokenService.removeToken();
      }else{
        this.tokenService.removeToken();
      }
    }, err => {
      this.tokenService.removeToken();
    })
  }


}

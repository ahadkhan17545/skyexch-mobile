import { ShareDataService } from 'src/app/services/share-data.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ClientApiService } from 'src/app/services/client-api.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-extra-wrap',
  templateUrl: './extra-wrap.component.html',
  styleUrls: ['./extra-wrap.component.css']
})
export class ExtraWrapComponent implements OnInit {
  siteName = environment.siteName;
  islc247allcondition = environment.islc247allcondition;
  Update: any;
  language: any;
  range = "en";
  Alllanguage: any;
  isLogin: boolean = false;
  currentlanguage: string;
  selectedlang: any;


  constructor(
    private shareService:ShareDataService,
    private tokenService: TokenService,
    private clientApi: ClientApiService


  ) { 
    if (this.tokenService.getLanguage()) {
      this.selectedlang = this.tokenService.getLanguage()
      this.selectlanguage(this.selectedlang)
    } else {
      this.selectlanguage('en')
    }
    if (this.tokenService.getToken()) {
      this.isLogin = true;
    }
  }

  ngOnInit(

  ): void {
    this.getlanguages();
  }
  getlanguages() {
    this.shareService._lagugageSub$.subscribe(data => {
      if(data != null){
        this.Update = data
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

}

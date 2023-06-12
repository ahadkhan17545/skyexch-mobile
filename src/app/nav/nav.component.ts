import { ShareDataService } from 'src/app/services/share-data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  siteName = environment.siteName;
  isLcRouting = environment.isLcRouting;

  isIcasino = environment.isIcasino;
  isskybet369: boolean = environment.isskybet369;
  isCasinoTab = environment.isCasinoTab;
  isMultiMarket = environment.isMultiMarket;

  isLogin: boolean = false;
  homeCom: any;
  inplayCom: any;
  highCom: any;
  Update: any;


  constructor(
    private shareService:ShareDataService,
    private tokenService: TokenService,
    private router: Router,

  ) {
    this.homeCom = '/dash';
    this.inplayCom = '/running';
    this.highCom = '/highlight';


    if (this.isLcRouting) {
      this.homeCom = '/home';
      this.inplayCom = '/inplay';
      this.highCom = '/sports';

    }
    if (this.tokenService.getToken()) {
      this.isLogin = true;
    }
  }

  ngOnInit() {
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


}

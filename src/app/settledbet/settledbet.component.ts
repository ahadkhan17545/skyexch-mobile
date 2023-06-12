import { ShareDataService } from 'src/app/services/share-data.service';
import { Component, OnInit } from '@angular/core';
import { ClientApiService } from '../services/client-api.service';
import { MainService } from '../services/main.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-settledbet',
  templateUrl: './settledbet.component.html',
  styleUrls: ['./settledbet.component.scss']
})
export class SettledbetComponent implements OnInit {
  settleData = [];
  accountInfo:any
  showLoader: boolean = false;
  token: string;
  Update: any;

  constructor(
    private client: ClientApiService,
    private mainService: MainService,
    private tokenService: TokenService,
    private shareService:ShareDataService
  ) { 
    this.mainService.apis$.subscribe(resp => {
      this.settlebet();
    })
    this.token = this.tokenService.getToken()
  }

  ngOnInit(): void {
    this.UserDescription();
    this.settlebet();
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
  UserDescription() {
    this.accountInfo = this.tokenService.getUserInfo();
  }
  settlebet() {
    this.showLoader = true;
    $('#page_loading').css('display','flex');
    this.client.settleBet(this.accountInfo.userName,this.token).subscribe(
      (resp:any) => {
        this.settleData = resp.result.reverse();
        this.showLoader = false;
        $('#page_loading').css('display','none');
      },
      err => {
        $('#page_loading').css('display','none');
      }
    );
  }

}

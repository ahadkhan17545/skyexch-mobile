import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CasinoApiService } from 'src/app/services/casino-api.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-twain',
  templateUrl: './twain.component.html',
  styleUrls: ['./twain.component.scss']
})
export class TwainComponent implements OnInit {
  isbetgame = environment.isbetgame;

  accountInfo: any;
  Token: any;
  twainUrl: SafeResourceUrl;
  constructor(private casinoapiService: CasinoApiService,
    private sanitizer: DomSanitizer,
    private tokenService: TokenService,) { }

  ngOnInit(): void {
    this.accountInfo = this.tokenService.getUserInfo();
    this.betgamesdata();
   

  }
  betgamesdata() {

    if (!this.isbetgame) {
      window.location.href = '/404';
      return false
    }
    
    let data = {
      "userName": this.accountInfo.userName,
    }
    this.casinoapiService.betgamesdata(data).subscribe((res: any) => {
      this.Token = res.token
      console.log(res.token)
      if(this.Token){
        // let url=`https://integrations-ag-iframe.betgames.tv//#/auth?apiUrl=https://integrations-ag-bp.betgames.tv/&wsUrl=https://integrations-ag-ws.betgames.tv&partnerCode=cricbuzzer_io_dev_twain&token=${this.Token}&language=en&timezone=2`
        let url=`https://web.twainsports.com//#/auth?apiUrl=http://7ds0t9ij.twainsports.com/&wsUrl=https://ws.twainsports.com&partnerCode=lc247_co_twain&token=${this.Token}&language=en&timezone=2`
        this.twainUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
    $('#page_loading').css('display', 'none');

    })
  }


}

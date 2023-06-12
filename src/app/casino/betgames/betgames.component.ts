import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { CasinoApiService } from '../../services/casino-api.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-betgames',
  templateUrl: './betgames.component.html',
  styleUrls: ['./betgames.component.scss']
})
export class BetgamesComponent implements OnInit {

  isbetgame = environment.isbetgame;


  accountInfo: any;
  Token: any;
  betgamesUrl: SafeResourceUrl;
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
      if (this.Token) {
        // let url=`https://integrations01-webiframe.betgames.tv//#/auth?apiUrl=https://integrations01.betgames.tv/&partnerCode=cricbuzzer_io_dev&partnerToken=${this.Token}&language=en&timezone=2`
        let url = `https://webiframe.betgames.tv//#/auth?apiUrl=https://game3.betgames.tv/&partnerCode=lc247_co&partnerToken=${this.Token}&language=en&timezone=2`
        this.betgamesUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      }
      $('#page_loading').css('display', 'none');

    })
  }


}

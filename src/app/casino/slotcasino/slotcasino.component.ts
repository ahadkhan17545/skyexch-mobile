import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CasinoApiService } from 'src/app/services/casino-api.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-slotcasino',
  templateUrl: './slotcasino.component.html',
  styleUrls: ['./slotcasino.component.scss']
})
export class SlotcasinoComponent implements OnInit {

  isSlot = environment.isSlot;

  accountInfo: any;
  gameCode: any;
  siteName: string = environment.siteName;

  slotUrl: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer, private tokenService: TokenService, private casinoapiService: CasinoApiService, private route: ActivatedRoute,) {
    this.route.params.subscribe(params => {
      this.gameCode = params.id;
    })
  }

  ngOnInit(): void {
    this.accountInfo = this.tokenService.getUserInfo();
    this.opengame()
  }
  opengame() {

    if (!this.isSlot) {
      window.location.href = '/404';
      return false
    }

    let data = {
      "userName": this.accountInfo.userName,
      "gameId": this.gameCode
    }
    // console.log(data)
    this.casinoapiService.openGame(data).subscribe((res: any) => {
      // console.log(res)
      if (res.errorCode == 0 && res.url) {
        this.slotUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res.url);
        window.open((res.url), "_self");
      }
      $('#page_loading').css('display', 'none');
    })
  }

}

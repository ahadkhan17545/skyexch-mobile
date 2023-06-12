import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CasinoApiService } from 'src/app/services/casino-api.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-poker-casino',
  templateUrl: './poker-casino.component.html',
  styleUrls: ['./poker-casino.component.scss']
})
export class PokerCasinoComponent implements OnInit {

  isPoker = environment.isPoker;

  pokerUrl:SafeResourceUrl;
  accountInfo: any;

  constructor(        
    private tokenService: TokenService,
    private casinoapiService: CasinoApiService,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    this.accountInfo = this.tokenService.getUserInfo();
    this.getPokerLobby();
  }

  ngOnDestroy():void{
    this.quitPoker();
  }

  getPokerLobby(){
    if (!this.isPoker) {
      window.location.href = '/404';
      return false
    }
    $('#page_loading').css('display', 'flex');
    let authData = {
      "userName":this.accountInfo.userName,
      "userId":this.accountInfo.userId
    }
    this.casinoapiService.pokerAuth(authData).subscribe((resp: any)=>{
      // console.log(resp);
      if(resp.errorCode==0){
        this.pokerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(resp.lobbyUrl);
      }
      $('#page_loading').css('display', 'none');
    })
  }

  quitPoker(){
    $('#page_loading').css('display', 'flex');
    let authData = {
      "userName":this.accountInfo.userName,
      "userId":this.accountInfo.userId
    }
    this.casinoapiService.pokerQuit(authData).subscribe((resp: any)=>{
      console.log(resp);
      $('#page_loading').css('display', 'none');
    })
  }

}

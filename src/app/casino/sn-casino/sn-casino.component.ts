import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CasinoApiService } from 'src/app/services/casino-api.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sn-casino',
  templateUrl: './sn-casino.component.html',
  styleUrls: ['./sn-casino.component.scss']
})
export class SnCasinoComponent implements OnInit {
  supernowaUrl: SafeResourceUrl;
  gameCode: string;
  providerCode: string;
  token: string;
  siteName: string = environment.siteName;

  constructor(private tokenService: TokenService, private sanitizer: DomSanitizer, private route: ActivatedRoute, private apiService: CasinoApiService,) { }

  ngOnInit(): void {
    this.token = this.tokenService.getToken();
      this.route.params.subscribe(params => {
        this.gameCode = params.gameCode;
        this.providerCode = params.providerCode;
        let backurldomain = window.origin;
        let authData = { "token": this.token, "gameCode": this.gameCode, "providerCode": this.providerCode, "backUrl": backurldomain }
        this.apiService.supernowaAuth(authData).subscribe((resp: any) => {
          if(!resp){
            alert('Games Under Maintenance');
          }
          if (resp.status.code == "SUCCESS") {
            this.supernowaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(resp.launchURL);
          }
          $('#page_loading').css('display', 'none');
        },
          error => {
          alert('Games Under Maintenance');
            $('#page_loading').css('display', 'none');
          })
      })
  }

}


import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CasinoApiService } from 'src/app/services/casino-api.service';
import { MainService } from 'src/app/services/main.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sn-casino-list',
  templateUrl: './sn-casino-list.component.html',
  styleUrls: ['./sn-casino-list.component.scss']
})
export class SnCasinoListComponent implements OnInit {
  isLogin: boolean = false;
  providerList:any=[];
  SNcasinoList: any = [];
  siteName: string = environment.siteName;
  islc247allcondition = environment.islc247allcondition;
  isSNcasino = environment.isSNcasino;


  token:any;

  providerCode="SN";
  @ViewChild('tab1', { read: ElementRef }) public tab: ElementRef<any>;
  constructor(private tokenService: TokenService,private main: MainService,private casinoapiService: CasinoApiService,private route: ActivatedRoute,) { }

  ngOnInit(): void {
    // $('#page_loading').css('display', 'flex');
    if (this.tokenService.getToken()) {
      this.isLogin = true;
      this.main.apis$.subscribe((res) => {
        // if(this.isSNcasino){
          this.listProviders();
        // }
        this.route.params.subscribe(params => {
          this.providerCode = params.providerCode;
          if(this.providerList.length>0){
            this.getSNcasinoAssetsList(this.providerCode);
          }
        })
      });
    }
  }
  listProviders(){
    $('#page_loading').css('display', 'flex');
    this.casinoapiService.listProviders().subscribe((resp: any) => {
      // console.log(resp.result);
      this.providerList = resp.result;
      $('#page_loading').css('display', 'none');
      if(this.providerList.length>0){
        this.getSNcasinoAssetsList(this.providerCode);
      }
      // document.getElementById('tab1').scrollIntoView({behavior: "smooth", inline: "center"});
    },
    error => {
      $('#page_loading').css('display', 'none');
      console.log(error);
    })
  }
  getSNcasinoAssetsList(providerCode){
    $('#page_loading').css('display', 'flex');
    this.providerCode = providerCode;
    this.casinoapiService.supernowaGameAssetsList(this.providerCode).subscribe((resp: any) => {
      // console.log(resp);
      if (resp.status.code == "SUCCESS") {
        this.SNcasinoList = resp.games;
      }
      $('#page_loading').css('display', 'none');
    })
  }
  public scrollRight(): void {
    this.tab.nativeElement.scrollTo({ left: (this.tab.nativeElement.scrollLeft + 200), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.tab.nativeElement.scrollTo({ left: (this.tab.nativeElement.scrollLeft - 200), behavior: 'smooth' });
  }

  openGame(providerCode,gameCode){
    
    if (!this.isSNcasino) {
      window.location.href = '/404';
      return false
    }
    $('#page_loading').css('display', 'flex');
    this.token = this.tokenService.getToken();
    this.route.params.subscribe(params => {
      let backurldomain = window.origin;
      let authData = { "token": this.token, "gameCode": gameCode, "providerCode": providerCode, "backUrl": backurldomain }
      this.casinoapiService.supernowaAuth(authData).subscribe((resp: any) => {
        if(!resp){
          alert('Games Under Maintenance');
        }
        if (resp.status.code == "SUCCESS") {
          if(this.islc247allcondition){
            window.open(resp.launchURL, "_self");
          }
        }
        $('#page_loading').css('display', 'none');
      },
        error => {
          alert('Games Under Maintenance');
          $('#page_loading').css('display', 'none');
          // console.log(error);
        })
    })
  }
}

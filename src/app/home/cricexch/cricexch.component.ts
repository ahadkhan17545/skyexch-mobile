import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CasinoApiService } from 'src/app/services/casino-api.service';
import { ClientApiService } from 'src/app/services/client-api.service';
import { DataFormatsService } from 'src/app/services/data-formats.service';
import { LoginService } from 'src/app/services/login.service';
import { MainService } from 'src/app/services/main.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cricexch',
  templateUrl: './cricexch.component.html',
  styleUrls: ['./cricexch.component.scss']
})
export class CricexchComponent implements OnInit {

  isLcRouting = environment.isLcRouting;

  isNayaLudisNet: boolean = environment.isNayaLudisNet;
  siteName = environment.siteName;
  isSkyView = environment.isSkyView;
  islc247allcondition = environment.islc247allcondition;
  crichomedesign = environment.crichomedesign
  isxpg = environment.isxpg;
  isSlot = environment.isSlot
  isPoker = environment.isPoker;
  isbetgame = environment.isbetgame;
  lcexchcodesign = environment.lcexchcodesign;
  LoginForm: FormGroup;
  submitted: boolean = false;
  isCaptchademo = environment.isCaptchademo;
  isIcasino: boolean = environment.isIcasino;
  isskybet369: boolean = environment.isskybet369;
  isSNcasino: boolean = environment.isSNcasino;
  Marketing_whatsapp: string = environment.Marketing_whatsapp;
  Marketing_skype: string = environment.Marketing_skype;
  AferLoginChangePassword: boolean = environment.AferLoginChangePassword;
  @ViewChild('tab2', { read: ElementRef }) public tab1: ElementRef<any>;

  sportList = [];
  casinoList: any = [];
  casinoLists: any = [];


  loader: boolean = false;
  isLogin: boolean = false;
  accountInfo: any;

  sportSubscription: Subscription;
  result: any;
  isPendingLogin: boolean = false;
  isAuthPending: boolean = false;
  isInrCurrency = false;
  homeCom: any;
  inplayCom: any;
  highCom: any;

  isCasinoTab = environment.isCasinoTab;
  isDiamondCasino = environment.isDiamondCasino;
  isExchangeGames = environment.isExchangeGames;

  amanCasinoList = [


    { "tableName": "Live Teenpatti", "CasinoName": "LiveTP", "opentable": 56767 },
    { "tableName": "Andar Bahar", "CasinoName": "Andar-Bahar", "opentable": 87564 },
    { "tableName": "Poker", "CasinoName": "Poker1Day", "opentable": 67564 },
    { "tableName": "7 up & Down", "CasinoName": "7Up-Down", "opentable": 98789 },
    { "tableName": "Roulette", "CasinoName": "Roulette", "opentable": 98788 },
    { "tableName": "Sicbo", "CasinoName": "Sicbo", "opentable": 98566 },
    { "tableName": "32 cards casino", "CasinoName": "32Cards", "opentable": 56967 },
    { "tableName": "Hi Low", "CasinoName": "Hi-Low", "opentable": 56968 },
    { "tableName": "Worli Matka", "CasinoName": "Matka", "opentable": 92037 },
    { "tableName": "Baccarat", "CasinoName": "Baccarat", "opentable": 92038 },
    { "tableName": "Six player poker", "CasinoName": "Poker6P", "opentable": 67565 },
    { "tableName": "Teenpatti T20", "CasinoName": "TP T20", "opentable": 56768 },
    { "tableName": "Amar Akbar Anthony", "CasinoName": "AAA", "opentable": 98791 },
    { "tableName": "Dragon Tiger", "CasinoName": "Dragon-Tiger", "opentable": 98790 },
    { "tableName": "Race 20-20", "CasinoName": "Race 20-20", "opentable": 90100 },
    { "tableName": "Bollywood Casino", "CasinoName": "Bollywood", "opentable": 67570 },
    { "tableName": "Casino Meter", "CasinoName": "Casino Meter", "opentable": 67575 },
    { "tableName": "Casino War", "CasinoName": "Casino War", "opentable": 67580 },
    { "tableName": "Poker 20-20", "CasinoName": "Poker2020", "opentable": 67567 },
    { "tableName": "Muflis Teenpatti", "CasinoName": "MuflisTP", "opentable": 67600 },
    { "tableName": "Trio", "CasinoName": "MuflisTP", "opentable": 67610 },
    { "tableName": "2 Cards Teenpatti", "CasinoName": "2CardTP", "opentable": 67660 },
    { "tableName": "The Trap", "CasinoName": "Trap", "opentable": 67680 },
    { "tableName": "Teenpatti Test", "CasinoName": "TPTest", "opentable": 67630 },
    { "tableName": "Queen", "CasinoName": "Queen", "opentable": 67620 },
    { "tableName": "Teenpatti Open", "CasinoName": "Race to 17", "opentable": 67640 },
    { "tableName": "29 Card Baccarat", "CasinoName": "29 Card Baccarat", "opentable": 67690 },
    { "tableName": "Race to 17", "CasinoName": "Race to 17", "opentable": 67710 },



    { "tableName": "Six player poker (Virtual)", "CasinoName": "Poker6P (V)", "opentable": 67566 },
    { "tableName": "Teenpatti One-Day (Virtual)", "CasinoName": "TPOneDay (V)", "opentable": 56766 },
    { "tableName": "Andar Bahar (Virtual)", "CasinoName": "AB (V)", "opentable": 87565 },
    { "tableName": "Teenpatti T20 (Virtual)", "CasinoName": "TP T20 (V)", "opentable": 56769 },
    { "tableName": "Hi Low (Virtual)", "CasinoName": "High-Low (V)", "opentable": 56969 },
    { "tableName": "Poker  (Virtual)", "CasinoName": "Poker (V)", "opentable": 67563 },
    { "tableName": "Matka (Virtual)", "CasinoName": "Mataka (V)", "opentable": 92036 },
    { "tableName": "7 up & Down (Virtual)", "CasinoName": "7Up-Down (V)", "opentable": 98793 },
    { "tableName": "Dragon Tiger (Virtual)", "CasinoName": "DT (V)", "opentable": 98794 },
    { "tableName": "Amar Akbar Anthony (Virtual)", "CasinoName": "AAA (V)", "opentable": 98795 },
    { "tableName": "Roulette (Virtual)", "CasinoName": "Roulette (V)", "opentable": 98792 },
    { "tableName": "32 cards casino (Virtual)", "CasinoName": "32Cards (V)", "opentable": 56966 },




  ];


  SNcasinoList: any = [];
  providerCode1: any = 'XPG'
  gameCode: any;
  slotUrl: any;
  Update: any;
  //end
  constructor(
    private dfService: DataFormatsService,
    private shareService: ShareDataService,
    private apiService: ClientApiService,
    private main: MainService,
    private loginService: LoginService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private router: Router,
    private casinoapiService: CasinoApiService,
    private sanitizer: DomSanitizer,


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
      this.main.apis$.subscribe((res) => {

        this.listCasinoTable();
        if(this.SNcasinoList){
          this.listProviders();
        }
        this.UserDescription();
        this.listCasinoProduct();

      });
    } else {


      this.casinoList = [{ "tableName": "TP2020", "tableId": "-11", "oddsUrl": "/d_rate/teen20", "resultUrl": "/l_result/teen20", "scoreUrl": null, "streamUrl": ":8015/" },
      { "tableName": "TP1Day", "tableId": "-12", "oddsUrl": "/d_rate/teen", "resultUrl": "/l_result/teen", "scoreUrl": null, "streamUrl": ":8001/" },
      { "tableName": "Lucky7A", "tableId": "-10", "oddsUrl": "/d_rate/lucky7", "resultUrl": "/l_result/lucky7", "scoreUrl": null, "streamUrl": ":8011/" },
      { "tableName": "Lucky7B", "tableId": "-10", "oddsUrl": "/d_rate/lucky7eu", "resultUrl": "/l_result/lucky7eu", "scoreUrl": null, "streamUrl": ":8017/" },
      { "tableName": "32Cards", "tableId": "-24", "oddsUrl": "/d_rate/card32", "resultUrl": "/l_result/card32", "scoreUrl": null, "streamUrl": ":8006/" },
      { "tableName": "32CardsB", "tableId": "-25", "oddsUrl": "/d_rate/card32eu", "resultUrl": "/l_result/card32eu", "scoreUrl": null, "streamUrl": ":8024/" },
      { "tableName": "AAA", "tableId": "-26", "oddsUrl": "/d_rate/aaa", "resultUrl": "/l_result/aaa", "scoreUrl": null, "streamUrl": ":8013/" },
      { "tableName": "Bollywood", "tableId": "-27", "oddsUrl": "/d_rate/btable", "resultUrl": "/l_result/btable", "scoreUrl": null, "streamUrl": ":8014/" },
      { "tableName": "Poker2020", "tableId": "-20", "oddsUrl": "/d_rate/poker20", "resultUrl": "/l_result/poker20", "scoreUrl": null, "streamUrl": ":8007/" },
      { "tableName": "Poker1Day", "tableId": "-19", "oddsUrl": "/d_rate/poker", "resultUrl": "/l_result/poker", "scoreUrl": null, "streamUrl": ":8008/" },
      { "tableName": "Poker6P", "tableId": "-18", "oddsUrl": "/d_rate/poker6", "resultUrl": "/l_result/poker6", "scoreUrl": null, "streamUrl": ":8009/" },
      { "tableName": "DT2020", "tableId": "-6", "oddsUrl": "/d_rate/dt20", "resultUrl": "/l_result/dt20", "scoreUrl": null, "streamUrl": ":8012/" },
      { "tableName": "DT1Day", "tableId": "-7", "oddsUrl": "/d_rate/dt6", "resultUrl": "/l_result/dt6", "scoreUrl": null, "streamUrl": ":8025/" },
      { "tableName": "DTL2020", "tableId": "-8", "oddsUrl": "/d_rate/dtl20", "resultUrl": "/l_result/dtl20", "scoreUrl": null, "streamUrl": ":8026/" },

        //  { "tableName": "TPOpen", "tableId": "-14", "oddsUrl": "/d_rate/teen8", "resultUrl": "/l_result/teen8", "scoreUrl": null, "streamUrl": ":8003/" },
        //   { "tableName": "TPTest", "tableId": "-13", "oddsUrl": "/d_rate/teen9", "resultUrl": "/l_result/teen9", "scoreUrl": null, "streamUrl": ":8002/" }, 
        //    { "tableName": "Baccarat", "tableId": "-9", "oddsUrl": "/d_rate/baccarat", "resultUrl": "/l_result/baccarat", "scoreUrl": null, "streamUrl": ":8022/" },
        //     { "tableName": "Baccarat2", "tableId": "-9", "oddsUrl": "/d_rate/baccarat2", "resultUrl": "/l_result/baccarat2", "scoreUrl": null, "streamUrl": ":8023/" }, 
        //     { "tableName": "AB", "tableId": "-5", "oddsUrl": "/d_rate/ab20", "resultUrl": "/l_result/ab20", "scoreUrl": null, "streamUrl": ":8010/" },
        //      { "tableName": "AB2", "tableId": "-4", "oddsUrl": "/d_rate/abj", "resultUrl": "/l_result/abj", "scoreUrl": null, "streamUrl": ":8019/" }, 
        //      { "tableName": "3CardsJud", "tableId": "-23", "oddsUrl": "/d_rate/3cardj", "resultUrl": "/l_result/3cardj", "scoreUrl": null, "streamUrl": ":8016/" },
        //        { "tableName": "CasinoMeter", "tableId": "-16", "oddsUrl": "/d_rate/cmeter", "resultUrl": "/l_result/cmeter", "scoreUrl": null, "streamUrl": ":8018/" }, 
        //         { "tableName": "Cricket2020", "tableId": "-15", "oddsUrl": "/d_rate/cmatch20", "resultUrl": "/l_result/cmatch20", "scoreUrl": null, "streamUrl": ":8031/" }, 
        //          { "tableName": "DT2", "tableId": "-52", "oddsUrl": "/d_rate/dt202", "resultUrl": "/l_result/dt202", "scoreUrl": null, "streamUrl": ":8020/" }, 
        //           { "tableName": "Race2020", "tableId": "-60", "oddsUrl": "/d_rate/race20", "resultUrl": "/l_result/race20", "scoreUrl": null, "streamUrl": ":8029/" },
        //            { "tableName": "CasinoQueen", "tableId": "-70", "oddsUrl": "/d_rate/queen", "resultUrl": "/l_result/queen", "scoreUrl": null, "streamUrl": ":8028/" }, 
        //            { "tableName": "WorliMatka", "tableId": "-21", "oddsUrl": "/d_rate/worli", "resultUrl": "/l_result/worli", "scoreUrl": null, "streamUrl": ":8004/" }, 
        //            { "tableName": "5FiveCricket", "tableId": "-3", "oddsUrl": "/d_rate/cricketv3", "resultUrl": "/l_result/cricketv3", "scoreUrl": null, "streamUrl": ":8030/" }, 
        //            { "tableName": "InstantWorli", "tableId": "-22", "oddsUrl": "/d_rate/worli2", "resultUrl": "/l_result/worli2", "scoreUrl": null, "streamUrl": ":8005/" }
      ];
    }

  }

  ngOnInit() {
    this.getlanguages();
    this.initLoginForm();

    this.sportWise();
    // this.showupdateTerm()
    if (this.isxpg) {
      this.casinoapiService.supernowaGameAssetsList(this.providerCode1).subscribe((resp: any) => {
        // console.log(resp);
        if (resp.status.code == "SUCCESS") {
          this.SNcasinoList = resp.games;
        }
      })
    }


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
    if (this.accountInfo) {
      if (this.accountInfo.currencyCode == 'INR' || this.accountInfo.currencyCode == 'PAI') {
        this.isInrCurrency = true;
      }
    }

    // console.log(this.accountInfo)
  }


  selectSport() {
    // this.shareService.seletedSport.emit(52);
  }
  public scrollRight1(): void {
    this.tab1.nativeElement.scrollTo({ left: (this.tab1.nativeElement.scrollLeft + 200), behavior: 'smooth' });
  }

  public scrollLeft1(): void {
    this.tab1.nativeElement.scrollTo({ left: (this.tab1.nativeElement.scrollLeft - 200), behavior: 'smooth' });
  }

  sportWise() {
    $('#page_loading').css('display', 'flex');

    this.sportSubscription = this.shareService.sportData$.subscribe(data => {
      if (data != null) {
        this.sportList = this.dfService.sportEventWise(data, 0);
        // this.sportList = this.sportList.filter(item => {
        //   return item.id < 10;
        // })
        // console.log(this.sportList);
        setTimeout(() => {
          $('#page_loading').css('display', 'none');
        }, 500);
        this.loader = true;
        this.showupdateTerm()

      }
    });
  }

  listCasinoTable() {
    this.shareService.casinoList$.subscribe((resp: any) => {
      if (resp) {
        this.casinoList = resp;
        $('#page_loading').css('display', 'none');
      }
    });
  }
  listCasinoProduct() {
    if (!this.isLogin) {
      return;
    }
    if (this.isIcasino || this.isskybet369) {
      return;
    }
    this.apiService.listCasinoProduct().subscribe((resp: any) => {
      if (resp.result) {
        // console.log(this.awcCasinoList_bdbet)



      }
    })
  }

  //Supernowa start here
  listProviders() {
    this.casinoapiService.listProviders().subscribe((resp: any) => {
      //console.log(this.providerListRunbet);

      $('#page_loading').css('display', 'none');
        // this.getSNcasinoAssetsList(this.providerList[0].providerCode);
        if (!this.islc247allcondition) {
          this.getSNcasinoAssetsList('all');
        }
    },
      error => {
        $('#page_loading').css('display', 'none');
        console.log(error);
      })
  }
  getSNcasinoAssetsList(providerCode) {
    this.casinoapiService.supernowaGameAssetsList(providerCode).subscribe((resp: any) => {
      let selectedGameassets = [];    },
      error => {
        $('#page_loading').css('display', 'none');
        console.log(error);
      })
  }
  toggleFavourite(event) {
  }

  trackBySport(index: number, item: any) {
    return item.eventTypeId;
  }

  trackByEvent(index: number, item: any) {
    return item.eventId;
  }

  showOverlayInfo(value) {
    $(value).css('display', 'flex');
  }
  hideOverlayInfo(value) {
    $(value).fadeOut();
  }

  showupdateTerm() {
    // console.log('uuuuu')
    // $('#Evolution').css('display', 'block');
    if (!this.tokenService.getCasBanner()) {
      $('#Evolution').css('display', 'block');
      $('#marketing').css('display', 'block');


    } else {
      $('#Evolution').css('display', 'none');
      $('#marketing').css('display', 'block');

    }

  }

  HideupdateTerm() {
    this.tokenService.setCasBanner(true)
    $('#Evolution').css('display', 'none');
    $('#marketing').css('display', 'none');



  }

  removeParam(key, sourceURL) {
    var rtn = sourceURL.split("?")[0],
      param,
      params_arr = [],
      queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
      params_arr = queryString.split("&");
      for (var i = params_arr.length - 1; i >= 0; i -= 1) {
        param = params_arr[i].split("=")[0];
        if (param === key) {
          params_arr.splice(i, 1);
        }
      }
      if (params_arr.length) rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn;
  }


  awc_login_direct(prod_code, prod_type, prod_name, game_code) {
    if (!this.isLogin) {
      return;
    }
    if (this.siteName=='skyfaire') {
      return;
    }
    if (!prod_code || !prod_type) {
      return;
    }
    if (this.isAuthPending) {
      return;
    }
    this.isAuthPending = true;

    $('#page_loading').css('display', 'flex');


    // setTimeout(() => {
    this.apiService.getAuthCasino(this.accountInfo.userName, this.accountInfo.userId, prod_code, prod_type).subscribe((resp: any) => {
      if (resp.errorCode == 0 && resp.url) {
        resp.url = JSON.parse(resp.url)
      }

      if (game_code && (prod_name == 'KINGMAKER') && resp.url) {
        resp.url = this.removeParam('gameForbidden', resp.url);
        resp.url = resp.url + '&gameCode=' + game_code + '&isLaunchGame=true&isLaunchGameTable=false';
      }
      if (game_code && (prod_name == 'JILI') && resp.url) {
        resp.url = this.removeParam('gameForbidden', resp.url);
        resp.url = this.removeParam('gameType', resp.url);
        let gameType = "TABLE";
        if (game_code.indexOf('SLOT') > -1) {
          gameType = "SLOT";
        }
        resp.url = resp.url + '&isMobileLogin=true&gameType='+gameType+'&gameCode=' + game_code + '&isLaunchGame=true&isLaunchGameTable=false';
      }
      if (game_code && (prod_name == 'JDB') && resp.url) {
        resp.url = this.removeParam('gameForbidden', resp.url);
        resp.url = resp.url + '&gameCode=' + game_code + '&isLaunchGame=true&isLaunchGameTable=false';
      }
      // alert(resp.url)

      if (resp.errorCode == 0 && resp.url) {
        // window.open(JSON.parse(resp.url), '_blank');
        window.open(resp.url, "_self");

      } else {
        alert(resp.errorDescription);
      }
      this.isAuthPending = false;
      $('#page_loading').css('display', 'none');

    }, err => {
      this.isAuthPending = false;
      $('#page_loading').css('display', 'none');

    })
    // },1500)
  }
  initLoginForm() {
    this.LoginForm = this.fb.group({
      userName: "democl",
      password: "Asdf1234",
      captcha: [this.isCaptchademo ? '' : '0000'],
      log: "0000"
    });

    if (!this.isCaptchademo) {
      this.LoginForm.addControl('origin', new FormControl(this.getDomainName(location.origin)));
    }

  }
  get f() {
    return this.LoginForm.controls;
  }

  opnslotgame(o: any) {
    this.gameCode = o
  }
  opengame(o: any) {
    this.gameCode = o
    console.log(this.gameCode);

    let data = {
      "userName": this.accountInfo.userName,
      "gameId": this.gameCode
    }
    console.log(data)
    this.casinoapiService.openGame(data).subscribe((res: any) => {
      if (res.errorCode == 0 && res.url) {
        this.slotUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res.url);
        window.open((res.url), "_self");
      }
      $('#page_loading').css('display', 'none');
    })
  }


  getDomainName(hostName) {
    let formatedHost = "";
    let splithostName = hostName.split('.');
    if (splithostName.length > 2) {
      formatedHost = hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
    } else {
      formatedHost = hostName.split('//')[1]
    }
    return formatedHost;
  }
  getImg() {
    this.loginService
      .getImg()
      .subscribe((response: { img: string; log: string }) => {
        document
          .getElementById('authenticateImage')
          .setAttribute('src', this.getSecureImage(response.img));
        this.LoginForm.get('log').setValue(response.log);
      });
  }

  getSecureImage(img) {
    return `data:image/jpeg;base64, ${img}`;
  }

  Login() {
    this.submitted = true;
    // console.log(this.LoginForm)

    if (!this.LoginForm.valid) {
      return;
    }

    if (this.isPendingLogin) {
      return;
    }
    this.isPendingLogin = true;

    this.loginService
      .login(this.LoginForm.value)
      .subscribe((resp: any) => {
        if (resp.errorCode === 0) {

          if (this.siteName == "betfair21" || this.siteName == "betswiz") {
            resp.result[0]['currencyCode'] = "";
          }

          this.tokenService.setToken(resp.result[0].token);
          this.tokenService.setUserInfo(resp.result[0]);
          this.result = resp.errorDescription;
          this.LoginForm.reset();
          $('#marketing').css('display', 'none');
          if (resp.result[0].newUser == 1 && this.AferLoginChangePassword) {
            this.router.navigate(['change_pass']);
          } else {
            this.router.navigate([this.homeCom]);
          }
        } else {
          if (!resp.errorDescription) {
            resp.errorDescription = "Username or password is wrong"
          }
          this.result = resp.errorDescription;

        }
        this.submitted = false;
        this.isPendingLogin = false;

      }, err => {
        this.submitted = false;
        this.isPendingLogin = false;
      }
      );

  }
  ngOnDestroy() {
    this.sportSubscription.unsubscribe();
  }

}

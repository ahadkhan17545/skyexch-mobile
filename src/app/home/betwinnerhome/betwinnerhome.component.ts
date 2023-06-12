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
  selector: 'app-betwinnerhome',
  templateUrl: './betwinnerhome.component.html',
  styleUrls: ['./betwinnerhome.component.scss']
})
export class BetwinnerhomeComponent implements OnInit {

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
  providerListbetwinner = [
    { "providerName": "Supernowa", "providerCode": "SN", "isBig": true },
    { "providerName": "Ezugi", "providerCode": "EZ", "isBig": false },
    { "providerName": "One Touch", "providerCode": "OT", "isBig": false },
    { "providerName": "Power Games", "providerCode": "PG", "isBig": true },
    { "providerName": "Pragmatic Play", "providerCode": "PP", "isBig": true },
  ];
  snGameAssetsAll = [
    { "name": "Roulette", "code": "RT", "providerCode": "SN", "thumb": "http://files.worldcasinoonline.com/Document/Game/Roulette_1654169469599.867.jpg" },
    { "name": "RNG Worli Matka", "code": "VWM", "providerCode": "SN", "thumb": "http://files.worldcasinoonline.com/Document/Game/5-RNG-Worli-Matka_1654174294949.6729.jpg" },
    { "name": "Heads Or Tails", "code": "HT", "providerCode": "PG", "thumb": "http://files.worldcasinoonline.com/Document/Game/Heads-or-Tails_1654170471388.5208.jpg" },
    { "name": "Crypto Binary", "code": "CRP", "providerCode": "PG", "thumb": "http://files.worldcasinoonline.com/Document/Game/Crypto-Binary_1654170413783.7327.jpg" },
    { "name": "Holdâ€™em Poker", "code": "1", "providerCode": "OT", "thumb": "http://files.worldcasinoonline.com/Document/Game/Holdem-Poker_32_11zon_1661528900527.018.jpg" },
    { "name": "Wild Wild West 2120", "code": "234165", "providerCode": "OT", "thumb": "http://files.worldcasinoonline.com/Document/Game/Wild-Wild-West-2120_5_11zon_1662032499741.5344.jpg" },
    { "name": "VIP Fortune Baccarat ", "code": "106", "providerCode": "EZ", "thumb": "http://files.worldcasinoonline.com/Document/Game/vip fortune baccarat_14_11zon_1661787817959.455.png" },
    { "name": "Unlimited Turkish Blackjack", "code": "5051", "providerCode": "EZ", "thumb": "http://files.worldcasinoonline.com/Document/Game/UNLIMITED TURKISH BLACKJACK-min_1662462550467.8113.png" }
  ];
  providerListINR = [
    { "providerName": "Supernowa", "providerCode": "SN", "isBig": true },
    { "providerName": "AE Sexy Casino", "providerCode": "AWC", "isBig": true },
    { "providerName": "Xprogramming", "providerCode": "XPG", "isBig": false },
    { "providerName": "Only Play", "providerCode": "GT", "isBig": false },
    { "providerName": "Ezugi", "providerCode": "EZ", "isBig": false },
    { "providerName": "One Touch", "providerCode": "OT", "isBig": false },
    { "providerName": "Power Games", "providerCode": "PG", "isBig": true },
  ];
  snGameAssetsINR = [
    { "name": "Roulette", "code": "RT", "providerCode": "SN", "thumb": "http://files.worldcasinoonline.com/Document/Game/Roulette_1654169469599.867.jpg" },
    { "name": "RNG Worli Matka", "code": "VWM", "providerCode": "SN", "thumb": "http://files.worldcasinoonline.com/Document/Game/5-RNG-Worli-Matka_1654174294949.6729.jpg" },
    { "name": "Heads Or Tails", "code": "HT", "providerCode": "PG", "thumb": "http://files.worldcasinoonline.com/Document/Game/Heads-or-Tails_1654170471388.5208.jpg" },
    { "name": "Crypto Binary", "code": "CRP", "providerCode": "PG", "thumb": "http://files.worldcasinoonline.com/Document/Game/Crypto-Binary_1654170413783.7327.jpg" },
    { "name": "Black Jack", "code": "11", "providerCode": "XPG", "thumb": "http://files.worldcasinoonline.com/Document/Game/Black-jack_1661774286603.564.jpg" },
    { "name": "Baccarat", "code": "MX-LIVE-002", "providerCode": "AWC", "thumb": "http://files.worldcasinoonline.com/Document/Game/Baccarat_1654173322546.122.jpg" },
    { "name": "Dragon Tiger", "code": "MX-LIVE-006", "providerCode": "AWC", "thumb": "http://files.worldcasinoonline.com/Document/Game/Dragon Tiger_1654173328911.0254.jpg" },
    { "name": "Sic Bo", "code": "MX-LIVE-007", "providerCode": "AWC", "thumb": "http://files.worldcasinoonline.com/Document/Game/Sic Bo_1654172481618.346.jpg" },
    { "name": "Holdâ€™em Poker", "code": "1", "providerCode": "OT", "thumb": "http://files.worldcasinoonline.com/Document/Game/Holdem-Poker_32_11zon_1661528900527.018.jpg" },
    { "name": "Wild Wild West 2120", "code": "234165", "providerCode": "OT", "thumb": "http://files.worldcasinoonline.com/Document/Game/Wild-Wild-West-2120_5_11zon_1662032499741.5344.jpg" },
    { "name": "VIP Fortune Baccarat ", "code": "106", "providerCode": "EZ", "thumb": "http://files.worldcasinoonline.com/Document/Game/vip fortune baccarat_14_11zon_1661787817959.455.png" },
    { "name": "Unlimited Turkish Blackjack", "code": "5051", "providerCode": "EZ", "thumb": "http://files.worldcasinoonline.com/Document/Game/UNLIMITED TURKISH BLACKJACK-min_1662462550467.8113.png" }
  ];

  awcCasinoList_bdbet = [
    { sr: 13, prod_code: '1006', clsname: 'evolution', prod_type: '1', name: "EVOLUTION_", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO',isBig: true },
    // { sr: 26, prod_code: '17', prod_type: '3', name: "Sportsbook", prod_name: "M8 SPORT", prod_type_name: 'SPORTBOOK', isBig: true },
    { sr: 2, prod_code: '3', clsname: 'ae-sexy', prod_type: '1', name: "AE Sexy", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO', isBig: true },
    { sr: 9, prod_code: '117', clsname: 'coin-toss', prod_type: '2', name: "Coin Toss", prod_name: "KINGMAKER", game_code: 'KM-TABLE-036', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', clsname: 'img-7-up-7-down', prod_type: '2', name: "7 up 7 down", prod_name: "KINGMAKER", game_code: 'KM-TABLE-028', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', clsname: 'andar-bahar', prod_type: '2', name: "Andar Bahar", prod_name: "KINGMAKER", game_code: 'KM-TABLE-032', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', clsname: 'sicbo', prod_type: '2', name: "Sicbo", prod_name: "KINGMAKER", game_code: 'KM-TABLE-015', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', clsname: 'card-matka', prod_type: '2', name: "Card Matka", prod_name: "KINGMAKER", game_code: 'KM-TABLE-022', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', clsname: 'number-matka', prod_type: '2', name: "Number Matka", prod_name: "KINGMAKER", game_code: 'KM-TABLE-021', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', clsname: 'blackjack', prod_type: '2', name: "Blackjack", prod_name: "KINGMAKER", game_code: 'KM-TABLE-038', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', clsname: 'mime-sweeper', prod_type: '2', name: "Mime Sweeper", prod_name: "KINGMAKER", game_code: 'KM-TABLE-042', prod_type_name: 'SLOT' },
    // { name: "Kabaddi", prod_name: "Kabaddi", prod_type_name: 'Kabaddi', isBig: true, isSport: true, eventTypeId: 52 },
    { name: "Horse Racing", prod_name: "Horse Racing", prod_type_name: 'Horse Racing', isBig: true, isSport: true, eventTypeId: 7 },
    // { sr: 13, prod_code: '93', clsname: 'ezugi', prod_type: '1', name: "EZUGI", prod_name: "EZUGI", prod_type_name: 'LIVE CASINO' },
    // { sr: 14, prod_code: '97', clsname: 'ebet', prod_type: '1', name: "EBET", prod_name: "EBET", prod_type_name: 'LIVE CASINO' },
    // { sr: 10, prod_code: '5', clsname: 'big-gaming', prod_type: '1', name: "BIG GAMING", prod_name: "BIG GAMING", prod_type_name: 'LIVE CASINO,SLOT,LOTTO,CARD AND BOARD,FISH HUNTER' },
    // { sr: 11, prod_code: '94', clsname: 'venus', prod_type: '1', name: "VENUS", prod_name: "VENUS", prod_type_name: 'LIVE CASINO' },
    // { sr: 1, prod_code: '41', clsname: 'jdb', prod_type: '2', name: "JDB", prod_name: "JDB", prod_type_name: 'SLOT,FISH HUNTER' },
    // { sr: 12, prod_code: '146', clsname: 'img-1g-poker', prod_type: '5', name: "1G Poker", prod_name: "1G Poker", prod_type_name: 'LIVE CASINO,CARD AND BOARD' },
    // { sr: 15, prod_code: '7', clsname: 'allbet', prod_type: '1', name: "ALLBET", prod_name: "ALLBET", prod_type_name: 'LIVE CASINO' },
    // { sr: 28, prod_code: '20', clsname: 'king855', prod_type: '1', name: "KING855", prod_name: "KING855", prod_type_name: 'LIVE CASINO' },
    // { sr: 29, prod_code: '70', clsname: 'wm-casino', prod_type: '1', name: "WM CASINO", prod_name: "WM CASINO", prod_type_name: 'LIVE CASINO' },
    // { sr: 30, prod_code: '19', clsname: 'dream-gaming', prod_type: '1', name: "DREAM GAMING", prod_name: "DREAM GAMING", prod_type_name: 'LIVE CASINO' },
    // { sr: 3, prod_code: '6', clsname: 'pragmatic', prod_type: '1', name: "PRAGMATIC", prod_name: "PRAGMATIC", prod_type_name: 'LIVE CASINO,SLOT', isBig: true },
    // { sr: 20, prod_code: '79', clsname: 'bbin', prod_type: '1', name: "BBIN", prod_name: "BBIN", prod_type_name: 'LIVE CASINO,SLOT,SPORTBOOK' },
    // { sr: 4, prod_code: '59', clsname: 'jili', prod_type: '2', name: "JILI", prod_name: "JILI", prod_type_name: 'SLOT,FISH HUNTER' },
    // { sr: 33, prod_code: '151', clsname: 'gameplay', prod_type: '1', name: "GAMEPLAY", prod_name: "GAMEPLAY", prod_type_name: 'LIVE CASINO,SLOT' },
    // { sr: 33, prod_code: '35', clsname: 'microgaming', prod_type: '1', name: "MICROGAMING", prod_name: "MICROGAMING", prod_type_name: 'LIVE CASINO,SLOT' },
    // { sr: 23, prod_code: '39', clsname: 'cq9', prod_type: '2', name: "CQ9", prod_name: "CQ9", prod_type_name: 'LIVE CASINO,SLOT,FISH HUNTER' },
    // { sr: 17, prod_code: '107', clsname: 'fc-fishing', prod_type: '6', name: "FC FISHING", prod_name: "FC FISHING", prod_type_name: 'FISH HUNTER' },
    // { sr: 21, prod_code: '48', clsname: 'blueprint', prod_type: '2', name: "BLUEPRINT", prod_name: "BLUEPRINT", prod_type_name: 'SLOT' },
    // { sr: 24, prod_code: '126', clsname: 'dragoon-soft-dg', prod_type: '2', name: "DRAGOON SOFT (DG)", prod_name: "DRAGOON SOFT (DG)", prod_type_name: 'SLOT' },
    // { sr: 26, prod_code: '17', clsname: 'm8-sport', prod_type: '3', name: "M8 SPORT", prod_name: "M8 SPORT", prod_type_name: 'SPORTBOOK' },
    // { sr: 31, prod_code: '27', clsname: 'img-918kiss-h5', prod_type: '2', name: "918KISS H5", prod_name: "918KISS H5", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '110', clsname: 'img-3win8', prod_type: '2', name: "3WIN8", prod_name: "3WIN8", prod_type_name: 'SLOT' },

  ]

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
        let awcCasinoList_bdbet = [];

        this.awcCasinoList_bdbet.forEach(element2 => {
          resp.result.forEach((element, index) => {

            if (element.product == element2.prod_name || (!element2.prod_code && index == 0)) {
              awcCasinoList_bdbet.push(element2);
            }
          });
        });
        this.awcCasinoList_bdbet = [];
        this.awcCasinoList_bdbet = awcCasinoList_bdbet


      }
    })
  }

  //Supernowa start here
  listProviders() {
    this.casinoapiService.listProviders().subscribe((resp: any) => {
      let sn_providerlist = [];
      let sn_providerlistLC = []
      let sn_providerList9xch = []
      let sn_providerListbetwinner = []
      let sn_providerListRunbet = []
      this.providerListbetwinner.forEach(element2 => {
        resp.result.forEach((element, index) => {
          if (element.providerName == element2.providerName) {
            sn_providerListbetwinner.push(element2);
          }
        });
      });
      this.providerListbetwinner = sn_providerListbetwinner;
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
      // console.log(resp);
      let selectedGameassets = [];
      if (resp.status.code == "SUCCESS") {
        //let snGameAssetsAll = resp.games;
        let filterGameassetsbyprovider = resp.games.filter((pro) => {
          return this.providerListbetwinner.some((game) => {
            return pro.providerCode === game.providerCode;
          });
        });
        
        filterGameassetsbyprovider.filter((pro) => {
          return this.providerListbetwinner.some((game) => {
            return pro.providerCode === game.providerCode;
          });
        });
        this.snGameAssetsAll.forEach(element2 => {
          filterGameassetsbyprovider.forEach((element, index) => {
            if (element.name === element2.name && element.providerCode === element2.providerCode) {
              selectedGameassets.push(element2);
            }
          });
        });
        this.snGameAssetsAll = selectedGameassets;
        // console.log(this.snGameAssetsAll);

      } else {
        this.snGameAssetsAll = [];
      }
      // $('#page_loading').css('display', 'none');
    },
      error => {
        $('#page_loading').css('display', 'none');
        console.log(error);
      })
  }
  toggleFavourite(event) {
    // this.dfService.ToggleFavourite(event.mtBfId, false);
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
        // resp.url = this.removeParam('isMobileLogin', resp.url);
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


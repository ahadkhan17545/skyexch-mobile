import { Component, ElementRef, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CasinoApiService } from 'src/app/services/casino-api.service';
import { ClientApiService } from 'src/app/services/client-api.service';
import { MainService } from 'src/app/services/main.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { TokenService } from 'src/app/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-casino-list',
  templateUrl: './casino-list.component.html',
  styleUrls: ['./casino-list.component.scss'],
})
export class CasinoListComponent implements OnInit {
  casinoList: any = [];
  casinoLists: any = [];
  isLogin: boolean = false;
  amanCasinoList: any = [];
  siteName: string = environment.siteName;
  diamondcasinoHome = environment.diamondcasinoHome;
  islc247allcondition = environment.islc247allcondition;
  crichomedesign = environment.crichomedesign;
  isSlot = environment.isSlot;
  casinoType = 'dia'
  selectedtab: string = "international";
  accountInfo: any;
  isInrCurrency = false;
  isAuthPending: boolean = false;
  gameCode: any;
  loadrainbow: boolean = false;
  slotlists: any = [];
  slotlists1: any = [];
  slotUrl: any;
  slotcode: any = "sport_betting";
  lcexchcodesign = environment.lcexchcodesign
  @ViewChild('tab1', { read: ElementRef }) public tab: ElementRef<any>;
  slotfilter: any;
  Update: any;
  constructor(
    private shareService: ShareDataService,
    private main: MainService,
    private sanitizer: DomSanitizer,
    private tokenService: TokenService,
    private route: ActivatedRoute,
    private apiService: ClientApiService,
    private casinoapiService: CasinoApiService

  ) {
    if (this.tokenService.getToken()) {
      this.isLogin = true;
    }

    this.route.params.subscribe(params => {
      if (params.casinoType) {
        this.casinoType = params.casinoType;
        console.log(this.casinoType)
      }
      if (this.casinoType == 'aura') {
        this.selectedtab = 'indian'
      }
      if (this.casinoType == 'dia') {
        this.selectedtab = 'diamond'
      }
      if (this.casinoType == 'slot') {
        this.selectedtab = 'slot'
      }
      if (this.casinoType == 'SN') {
        this.selectedtab = 'SN'
      }

    })

    if (this.isLogin) {
      this.main.apis$.subscribe((res) => {
        setTimeout(() => {
          this.listCasinoTable();
        }, 200)
      });
    }
  }
  //cricbuzzer list
  cricbuzzerawcList_Vnd = [
    { sr: 9, prod_code: '117', prod_type: '2', name: "KINGMAKER", prod_name: "KINGMAKER", prod_type_name: 'SLOT' },
    { sr: 33, prod_code: '98', prod_type: '1', name: "ORIENTAL GAMING", prod_name: "ORIENTAL GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '141', prod_type: '1', name: "EVOLUTION GAMING", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 9, prod_code: '3', prod_type: '1', name: "SEXY BACCARAT", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO' },
    { sr: 29, prod_code: '70', prod_type: '1', name: "Sexy Dragon Tiger", prod_name: "WM CASINO", prod_type_name: 'LIVE CASINO' },
    { sr: 14, prod_code: '97', prod_type: '1', name: "EBET", prod_name: "EBET", prod_type_name: 'LIVE CASINO' },
    { sr: 9, prod_code: '35', prod_type: '2', name: "MICROGAMING", prod_name: "MICROGAMING", prod_type_name: 'LIVE CASINO,SLOT' },
    { sr: 9, prod_code: '7', prod_type: '1', name: "ALLBET", prod_name: "ALLBET", prod_type_name: 'LIVE CASINO' },
    { sr: 10, prod_code: '5', prod_type: '1', name: "BIG GAMING", prod_name: "BIG GAMING", prod_type_name: 'LIVE CASINO,SLOT,LOTTO,CARD AND BOARD,FISH HUNTER' },
    { sr: 20, prod_code: '79', prod_type: '1', name: "BBIN", prod_name: "BBIN", prod_type_name: 'LIVE CASINO,SLOT,SPORTBOOK' },
    { sr: 9, prod_code: '20', prod_type: '1', name: "KING855", prod_name: "KING855", prod_type_name: 'LIVE CASINO' },
    { sr: 33, prod_code: '151', prod_type: '1', name: "GAMEPLAY", prod_name: "GAMEPLAY", prod_type_name: 'LIVE CASINO,SLOT' },
    { sr: 33, prod_code: '92', prod_type: '1', name: "FGG", prod_name: "FGG", prod_type_name: 'LIVE CASINO' },
    { sr: 12, prod_code: '146', prod_type: '5', name: "1G Poker", prod_name: "1G Poker", prod_type_name: 'LIVE CASINO,CARD AND BOARD' },
    { sr: 26, prod_code: '17', prod_type: '3', name: "Sportbook1", prod_name: "M8 SPORT", prod_type_name: 'SPORTBOOK' },
    { sr: 9, prod_code: '39', prod_type: '2', name: "CQ9", prod_name: "CQ9", prod_type_name: 'SLOT,FISH HUNTER' },
    { sr: 4, prod_code: '59', prod_type: '2', name: "JILI", prod_name: "JILI", prod_type_name: 'SLOT,FISH HUNTER' },
    { sr: 27, prod_code: '11', prod_type: '2', name: "ACE333", prod_name: "ACE333", prod_type_name: 'SLOT' },
    { sr: 33, prod_code: '144', prod_type: '2', name: "FUNKY GAME", prod_name: "FUNKY GAME", prod_type_name: 'SLOT' },
    { sr: 33, prod_code: '129', prod_type: '2', name: "AMEBA", prod_name: "AMEBA", prod_type_name: 'SLOT' },
    { sr: 33, prod_code: '125', prod_type: '2', name: "FUN GAMING", prod_name: "FUN GAMING", prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '27', prod_type: '2', name: "918KISS H5", prod_name: "918KISS H5", prod_type_name: 'SLOT' },

  ]
  cricbuzzerawcList_other = [
    { sr: 2, prod_code: '3', prod_type: '1', name: "AE Sexy", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO' },
    { sr: 3, prod_code: '6', prod_type: '1', name: "Pragmatic Play", prod_name: "PRAGMATIC", prod_type_name: 'LIVE CASINO,SLOT' },
    { sr: 7, prod_code: '93', prod_type: '1', name: "EZUGI", prod_name: "EZUGI", prod_type_name: 'LIVE CASINO' },
    { sr: 11, prod_code: '94', prod_type: '1', name: "VENUS", prod_name: "VENUS", prod_type_name: 'LIVE CASINO' },
    { sr: 33, prod_code: '72', prod_type: '8', name: "Horse Grey Sportsbook", prod_name: "CITIBET", prod_type_name: 'OTHERS' },
    { sr: 24, prod_code: '126', prod_type: '2', name: "DRAGOON SOFT (DG)", prod_name: "DRAGOON SOFT (DG)", prod_type_name: 'SLOT' },
    { sr: 6, prod_code: '105', prod_type: '5', name: "KAI YUAN", prod_name: "KAI YUAN", prod_type_name: 'CARD AND BOARD' },
    { sr: 1, prod_code: '41', prod_type: '2', name: "JDB", prod_name: "JDB", prod_type_name: 'SLOT,FISH HUNTER' },
    { sr: 33, prod_code: '110', prod_type: '2', name: "3WIN8", prod_name: "3WIN8", prod_type_name: 'SLOT' },
  ]
  awcCasinoList_bdbet = [
    { sr: 13, prod_code: '141', clsname: 'evolution', prod_type: '1', name: "EVOLUTION", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    // { sr: 26, prod_code: '17', prod_type: '3', name: "Sportsbook", prod_name: "M8 SPORT", prod_type_name: 'SPORTBOOK', isBig: true },
    { sr: 2, prod_code: '3', clsname: 'ae-sexy', prod_type: '1', name: "AE Sexy1", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO', },
    { sr: 9, prod_code: '117', clsname: 'coin-toss', prod_type: '2', name: "Coin Toss", prod_name: "KINGMAKER", game_code: 'KM-TABLE-036', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', clsname: 'img-7-up-7-down', prod_type: '2', name: "7 up 7 down", prod_name: "KINGMAKER", game_code: 'KM-TABLE-028', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', clsname: 'andar-bahar', prod_type: '2', name: "Andar Bahar", prod_name: "KINGMAKER", game_code: 'KM-TABLE-032', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', clsname: 'sicbo', prod_type: '2', name: "Sicbo", prod_name: "KINGMAKER", game_code: 'KM-TABLE-015', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', clsname: 'card-matka', prod_type: '2', name: "Card Matka", prod_name: "KINGMAKER", game_code: 'KM-TABLE-022', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', clsname: 'number-matka', prod_type: '2', name: "Number Matka", prod_name: "KINGMAKER", game_code: 'KM-TABLE-021', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', clsname: 'blackjack', prod_type: '2', name: "Blackjack", prod_name: "KINGMAKER", game_code: 'KM-TABLE-038', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', clsname: 'mime-sweeper', prod_type: '2', name: "Mime Sweeper", prod_name: "KINGMAKER", game_code: 'KM-TABLE-042', prod_type_name: 'SLOT' },
    // { name: "Kabaddi", prod_name: "Kabaddi", prod_type_name: 'Kabaddi', isBig: true, isSport: true, eventTypeId: 52 },
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
  // slotfilter = ["pragmatic", "amatic", "tomhorn", "novomatic_html5", "novomatic_deluxe", "novomatic_classic", "NetEnt", "habanero", "microgaming", "microgaming_html5", "igt", "igt_html5", "merkur", "egt", "aristocrat", "igrosoft", "fish", "live_dealers", "platipus", "scientific_games", "kajot", "ainsworth", "quickspin", "apollo", "fast_games", "habanero", "apex", "more_expensive", "wazdan", "netent_html5", "sport_betting",]

  //end
  ngOnInit(): void {
    this.amanCasinoList = [
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
    if (this.tokenService.getToken()) {
      this.isLogin = true;
      this.main.apis$.subscribe((res) => {
        this.getlanguages();
        this.listCasinoTable();
        this.UserDescription();
        this.listCasinoProduct();
        this.slotlist()
      });
    }
  }
  changeTab(tabType) {
    this.selectedtab = tabType
  }
  getlanguages() {
    this.shareService._lagugageSub$.subscribe(data => {
      if (data != null) {
        this.Update = data
      }
      // console.log(this.Update);

    })
  }
  slotlist() {
    $('#page_loading').css('display', 'flex');
    this.casinoapiService.slotlist().subscribe((resp: any) => {
      let slotlistsdata = []
      this.slotlists = resp.content.gameList;
      this.slotlists.forEach(element => {
        if (element.label == "sport_betting") {
          slotlistsdata.push(element);
          this.slotlists = slotlistsdata
        }
      });
      this.slotlists1 = resp.content.gameList;
      this.slotfilter = resp.content.gameLabels;
      this.slotfilter = this.slotfilter.filter((game) => {
        return !game.includes('live_dealers');
      });
      this.slotfilter = this.slotfilter.filter((game) => {
        return !game.includes('more_expensive');
      });
      if (this.accountInfo.currencyCode == 'INR') {
        this.slotfilter = this.slotfilter.filter((game) => {
          return !game.includes('altente');
        });
      }
      setTimeout(() => {
        $('#page_loading').css('display', 'none');
      }, 2000)


    })


  }
  getSlotcasinoAssetsList(e: any) {
    let slotlists1 = []
    this.slotcode = e
    console.log(e);

    $('#page_loading').css('display', 'flex');

    this.slotlists1.forEach((element) => {
      if (element.label == e) {
        slotlists1.push(element)
        this.slotlists = slotlists1
      }
    })
    setTimeout(() => {
      $('#page_loading').css('display', 'none');
    }, 1000)
  }
  dosomething() {
    this.loadrainbow = true
  }
  opnslotgame(o: any) {
    this.gameCode = o
  }
  opengame(o: any) {

    if (!this.isSlot) {
      window.location.href = '/404';
      return false
    }
    this.gameCode = o
    let data = {
      "userName": this.accountInfo.userName,
      "gameId": this.gameCode
    }
    // console.log(data)
    $('#page_loading').css('display', 'flex');
    this.casinoapiService.openGame(data).subscribe((res: any) => {
      this.slotUrl = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(res.url));
      if (res.errorCode == 0 && res.url) {
        this.slotUrl = this.sanitizer.bypassSecurityTrustResourceUrl(res.url);
        window.open((res.url), "_self");
      }
      setTimeout(() => {
        $('#page_loading').css('display', 'none');
      }, 2000)
    })
  }


  public scrollRight(): void {
    this.tab.nativeElement.scrollTo({ left: (this.tab.nativeElement.scrollLeft + 200), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.tab.nativeElement.scrollTo({ left: (this.tab.nativeElement.scrollLeft - 200), behavior: 'smooth' });
  }
  listCasinoTable() {
    $('#page_loading').css('display', 'flex');
    this.shareService.casinoList$.subscribe((resp: any) => {
      if (resp) {
        this.casinoList = resp;
        setTimeout(() => {
          $('#page_loading').css('display', 'none');
        }, 2000)
      }
    });
  }
  UserDescription() {
    this.accountInfo = this.tokenService.getUserInfo();
    if (this.accountInfo) {
      if (this.accountInfo.currencyCode == 'INR') {
        this.isInrCurrency = true;
      }
    }

    // console.log(this.accountInfo)
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
  listCasinoProduct() {
    if (!this.isLogin) {
      return;
    }
    this.apiService.listCasinoProduct().subscribe((resp: any) => {
      if (resp.result) {
        // console.log(this.awcCasinoList_bdbet)
        let cricbuzzerawcList_Vnd = [];

        let cricbuzzerawcList_other = [];

        let awcCasinoList_bdbet = [];


        this.cricbuzzerawcList_Vnd.forEach(element2 => {
          resp.result.forEach((element, index) => {

            if (element.product == element2.prod_name || (!element2.prod_code && index == 0)) {
              cricbuzzerawcList_Vnd.push(element2);
            }
          });
        });


        this.cricbuzzerawcList_other.forEach(element2 => {
          resp.result.forEach((element, index) => {

            if (element.product == element2.prod_name || (!element2.prod_code && index == 0)) {
              cricbuzzerawcList_other.push(element2);
            }
          });
        });
        this.awcCasinoList_bdbet.forEach(element2 => {
          resp.result.forEach((element, index) => {

            if (element.product == element2.prod_name || (!element2.prod_code && index == 0)) {
              awcCasinoList_bdbet.push(element2);
            }
          });
        });


        this.cricbuzzerawcList_Vnd = cricbuzzerawcList_Vnd;

        this.cricbuzzerawcList_other = cricbuzzerawcList_other;
        this.awcCasinoList_bdbet = awcCasinoList_bdbet;

      }
    })
  }
  awc_login_direct(prod_code, prod_type, prod_name, game_code) {
    if (!this.isLogin) {
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

      // if (game_code && prod_name == 'KINGMAKER' && resp.url) {
      //   resp.url = this.removeParam('gameForbidden', resp.url);
      //   resp.url = resp.url + '&gameCode=' + game_code + '&isLaunchGame=true&isLaunchGameTable=false';
      // }
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
        resp.url = resp.url + '&isMobileLogin=true&gameType=' + gameType + '&gameCode=' + game_code + '&isLaunchGame=true&isLaunchGameTable=false';
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
      setTimeout(() => {
        $('#page_loading').css('display', 'none');
      }, 2000)

    }, err => {
      this.isAuthPending = false;
      setTimeout(() => {
        $('#page_loading').css('display', 'none');
      }, 2000)

    })
    // },1500)
  }

  trackByFn(item, index) {
    return item.matchId;
  }
}

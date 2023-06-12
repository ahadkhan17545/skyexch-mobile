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
  selector: 'app-betxhome',
  templateUrl: './betxhome.component.html',
  styleUrls: ['./betxhome.component.scss']
})
export class BetxhomeComponent implements OnInit {


  isLcRouting = environment.isLcRouting;

  isNayaLudisNet: boolean = environment.isNayaLudisNet;
  siteName = environment.siteName;
  isSkyView = environment.isSkyView;
  islc247allcondition = environment.islc247allcondition;
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
  providerList = [
    { "providerName": "Supernowa", "providerCode": "SN", "isBig": true },
    // { "providerName": "Ezugi", "providerCode": "EZ", "isBig": false },
    // { "providerName": "One Touch", "providerCode": "OT", "isBig": false },
    // { "providerName": "Power Games", "providerCode": "PG", "isBig": true },
    // {"providerName":"Pragmatic Play","providerCode":"PP","isBig":true},
  ];
  snGameAssetsAll = [
    { "name": "Roulette", "code": "RT", "providerCode": "SN", "thumb": "http://files.worldcasinoonline.com/Document/Game/Roulette_1654169469599.867.jpg" },
    { "name": "RNG Worli Matka", "code": "VWM", "providerCode": "SN", "thumb": "http://files.worldcasinoonline.com/Document/Game/5-RNG-Worli-Matka_1654174294949.6729.jpg" },
    { "name": "Heads Or Tails", "code": "HT", "providerCode": "PG", "thumb": "http://files.worldcasinoonline.com/Document/Game/Heads-or-Tails_1654170471388.5208.jpg" },
    { "name": "Crypto Binary", "code": "CRP", "providerCode": "PG", "thumb": "http://files.worldcasinoonline.com/Document/Game/Crypto-Binary_1654170413783.7327.jpg" },
    { "name": "Holdâ€™em Poker", "code": "1", "providerCode": "OT", "thumb": "http://files.worldcasinoonline.com/Document/Game/Holdem-Poker_32_11zon_1661528900527.018.jpg" },
    { "name": "Wild Wild West 2120", "code": "234165", "providerCode": "OT", "thumb": "http://files.worldcasinoonline.com/Document/Game/Wild-Wild-West-2120_5_11zon_1662032499741.5344.jpg" },
    // { "name": "Disco Lady", "code": "vs243discolady", "providerCode": "PP", "thumb": "http://files.worldcasinoonline.com/Document/Game/Disco-Lady_1662552356508.9814.jpg" },
    // { "name": "Mega Wheel", "code": "801", "providerCode": "PP", "thumb": "http://files.worldcasinoonline.com/Document/Game/Mega-Wheel_1662051227502.8633.jpg" },
    // { "name": "Cosmic Cash", "code": "vs40cosmiccash", "providerCode": "PP", "thumb": "http://files.worldcasinoonline.com/Document/Game/Cosmic-Cash_1662551274682.7146.jpg" },
    // { "name": "Sweet Bonanza", "code": "vs20fruitsw", "providerCode": "PP", "thumb": "http://files.worldcasinoonline.com/Document/Game/Sweet-Bonanza-Candyland_100_11zon_1662560012257.6707.jpg" },
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
    // {"providerName":"Pragmatic Play","providerCode":"PP","isBig":true},
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
    // { "name": "Disco Lady", "code": "vs243discolady", "providerCode": "PP", "thumb": "http://files.worldcasinoonline.com/Document/Game/Disco-Lady_1662552356508.9814.jpg" },
    // { "name": "Mega Wheel", "code": "801", "providerCode": "PP", "thumb": "http://files.worldcasinoonline.com/Document/Game/Mega-Wheel_1662051227502.8633.jpg" },
    // { "name": "Cosmic Cash", "code": "vs40cosmiccash", "providerCode": "PP", "thumb": "http://files.worldcasinoonline.com/Document/Game/Cosmic-Cash_1662551274682.7146.jpg" },
    // { "name": "Sweet Bonanza", "code": "vs20fruitsw", "providerCode": "PP", "thumb": "http://files.worldcasinoonline.com/Document/Game/Sweet-Bonanza-Candyland_100_11zon_1662560012257.6707.jpg" },
    { "name": "Lucky Coin", "code": "headsortails", "providerCode": "GT", "thumb": "http://files.worldcasinoonline.com/Document/Game/Lucky-coin_1661614581987.3235.jpg" },
    { "name": "VIP Fortune Baccarat ", "code": "106", "providerCode": "EZ", "thumb": "http://files.worldcasinoonline.com/Document/Game/vip fortune baccarat_14_11zon_1661787817959.455.png" },
    { "name": "Unlimited Turkish Blackjack", "code": "5051", "providerCode": "EZ", "thumb": "http://files.worldcasinoonline.com/Document/Game/UNLIMITED TURKISH BLACKJACK-min_1662462550467.8113.png" }
  ];
  
  awcCasinoLists_betx = [
    { sr: 4, prod_code: '59', prod_type: '2', name: "JILI", images: "jililobby", prod_name: "JILI", prod_type_name: 'SLOT,FISH HUNTER' , isBig: true},
    { sr: 2, prod_code: '3', prod_type: '1', name: "AE Sexy", images: "aesexy", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', name: "EVOLUTION GAMING", images: "evolutiongaming", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },

    { sr: 7, prod_code: '93', prod_type: '1', name: "EZUGI", prod_name: "EZUGI", images: "livecas",  prod_type_name: 'LIVE CASINO' },
    { sr: 3, prod_code: '6', prod_type: '1', name: "PRAGMATIC", images: "pragmatic", prod_name: "PRAGMATIC", prod_type_name: 'LIVE CASINO,SLOT' },

    { sr: 9, prod_code: '59', prod_type: '2', name: "Rummy", prod_name: "JILI",  images: "rummygame", game_code: 'JILI-TABLE-004', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "BACCARAT", images: "jilibacarat", prod_name: "JILI", game_code: 'JILI-TABLE-014', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "BIG SMALL", images: "jilibigsmall", prod_name: "JILI", game_code: 'JILI-TABLE-007', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Dragon Tiger", images: "jilidt", prod_name: "JILI", game_code: 'JILI-TABLE-012', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Ludo Quick", images: "jililudoquick", prod_name: "JILI", game_code: 'JILI-TABLE-021', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Number King", images: "jilinumberking", prod_name: "JILI", game_code: 'JILI-TABLE-005', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Sicbo", images: "jilisicbo", prod_name: "JILI", game_code: 'JILI-TABLE-017', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Teenpatti 2020", images: "jiliteenpatti", prod_name: "JILI", game_code: 'JILI-TABLE-016', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Teenpatti Joker", images: "jilitpjoker", prod_name: "JILI", game_code: 'JILI-TABLE-010', prod_type_name: 'SLOT' },
    

    { sr: 9, prod_code: '117', prod_type: '2', name: "Number Matka", images: "7d", prod_name: "KINGMAKER", game_code: 'KM-TABLE-048', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Horse Racing", images: "horseracing", prod_name: "KINGMAKER", game_code: 'KM-TABLE-048', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Rocket Cash", images: "rocketcash", prod_name: "KINGMAKER", game_code: 'KM-TABLE-041', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Hound Racing", images: "houndrace", prod_name: "KINGMAKER", game_code: 'KM-TABLE-055', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Number Matka",  images: "7d", prod_name: "KINGMAKER", game_code: 'KM-TABLE-048', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Sicbo",  images: "banner-mt5-half", prod_name: "KINGMAKER", game_code: 'KM-TABLE-015', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Card Matka",  images: "banner-sicbo-half", prod_name: "KINGMAKER", game_code: 'KM-TABLE-021', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "BlackJack",  images: "banner-cardmatka-half", prod_name: "KINGMAKER", game_code: 'KM-TABLE-038', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "7Up 7Down",  images: "7upd", prod_name: "KINGMAKER", game_code: 'KM-TABLE-028', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "32 Cards", images: "banner-numbermatka-half", prod_name: "KINGMAKER", game_code: 'KM-TABLE-039', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Andar Bahar", images: "banner-binary-half", prod_name: "KINGMAKER", game_code: 'KM-TABLE-032', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Teen Patti", images: "tp", prod_name: "KINGMAKER", game_code: 'KM-TABLE-046', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Blackjack", images: "blackjk", prod_name: "KINGMAKER", game_code: 'KM-TABLE-038', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', clsname: 'coin-toss', prod_type: '2', name: "Coin Toss", images: "cointoss", prod_name: "KINGMAKER", game_code: 'KM-TABLE-036', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "BONUS DICE", images: "dice", prod_name: "KINGMAKER", game_code: 'KM-TABLE-043', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Card Hilow", images: "hl", prod_name: "KINGMAKER", game_code: 'KM-TABLE-037', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Mime Sweeper", images: "mine", prod_name: "KINGMAKER", game_code: 'KM-TABLE-042', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "JHANDI MUNDA", images: "munda", prod_name: "KINGMAKER", game_code: 'KM-TABLE-030', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "TAI XIU", images: "taixiu", prod_name: "KINGMAKER", game_code: 'KM-TABLE-017', prod_type_name: 'SLOT', },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Thai", images: "thai", prod_name: "KINGMAKER", game_code: 'KM-TABLE-009', prod_type_name: 'SLOT', },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Bai Cao", images: "baicao", prod_name: "KINGMAKER", game_code: 'KM-TABLE-020', prod_type_name: 'SLOT', },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Bola Golek", images: "bola", prod_name: "KINGMAKER", game_code: 'KM-TABLE-035', prod_type_name: 'SLOT', },

    { sr: 4, prod_code: '59', prod_type: '2', name: "JILI", images: "jili", prod_name: "JILI", prod_type_name: 'SLOT,FISH HUNTER'},
    

    { sr: 13, prod_code: '1006', prod_type: '1', images: "frenchrouletteclassic", name: "French Roulette", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', images: "texasholdempoker", name: "Texas Poker", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', images: "rolltoluck", name: "Roll to Luck", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', images: "europeanroulette", name: "E. Roulette", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', images: "americanroulette", name: "A. Roulette", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', images: "reignofdragons", name: "Reign Dragons", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', images: "magicwheel", name: "Magic Wheel", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', images: "mafiasyndicate", name: "Mafia Syndicate", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', images: "pcoinflip", name: "Coin Flip", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', images: "pcrazytime", name: "Crazy Time", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', images: "pdealornodeal", name: "Deal", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', images: "pdreamcatcher", name: "Catcher", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', images: "pmegaball", name: "Mega Ball", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', images: "pmonopoly", name: "Mono Poly", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', images: "pmegaroll", name: "Mega Roulette", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', images: "pmegasicbo", name: "Mega Sicbo", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', images: "pmegawheel", name: "Mega Wheel", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', images: "pdt", name: "Dragon Tiger", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },











    


    



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
    if (this.isxpg) {
      this.casinoapiService.supernowaGameAssetsList(this.providerCode1).subscribe((resp: any) => {
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
    })
  }


  UserDescription() {
    this.accountInfo = this.tokenService.getUserInfo();
    if (this.accountInfo) {
      if (this.accountInfo.currencyCode == 'INR' || this.accountInfo.currencyCode == 'PAI') {
        this.isInrCurrency = true;
      }
    }
  }


  selectSport() {
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
        let awcCasinoLists_betx = [];

        this.awcCasinoLists_betx.forEach(element2 => {
          resp.result.forEach((element, index) => {

            if (element.product == element2.prod_name || (!element2.prod_code && index == 0)) {
              awcCasinoLists_betx.push(element2);
            }
          });
        });

        this.awcCasinoLists_betx = awcCasinoLists_betx;

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
      this.providerList.forEach(element2 => {
        resp.result.forEach((element, index) => {
          if (element.providerName == element2.providerName) {
            sn_providerlist.push(element2);
          }
        });
      });
      this.providerList = sn_providerlist;
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
          return this.providerList.some((game) => {
            return pro.providerCode === game.providerCode;
          });
        });
        
        filterGameassetsbyprovider.filter((pro) => {
          return this.providerList.some((game) => {
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
    // console.log('uuuuu')
    // $('#Evolution').css('display', 'block');
    if (!this.tokenService.getCasBanner()) {
      $('#Evolution').css('display', 'block');
      $('#marketing').css('display', 'block');


    } else {
      $('#Evolution').css('display', 'none');
      $('#marketing').css('display', 'block');

    }
    // var is_already_Show = sessionStorage.getItem('alreadyshow');
    // if (!is_already_Show) {
    //   sessionStorage.setItem('alreadyshow', 'already shown')
    //   $('#Evolution').css('display', 'none');
    // } else {
    //   $('#Evolution').css('display', 'block');
    // }


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
        resp.url = resp.url + '&isMobileLogin=true&gameType=TABLE&gameCode=' + game_code + '&isLaunchGame=true&isLaunchGameTable=false';
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


import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CasinoApiService } from '../services/casino-api.service';
import { ClientApiService } from '../services/client-api.service';
import { DataFormatsService } from '../services/data-formats.service';
import { LoginService } from '../services/login.service';
import { MainService } from '../services/main.service';
import { ShareDataService } from '../services/share-data.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']

})
export class HomeComponent implements OnInit {
  isLcRouting = environment.isLcRouting;

  isNayaLudisNet: boolean = environment.isNayaLudisNet;
  siteName = environment.siteName;
  isSkyView = environment.isSkyView;
  islc247allcondition = environment.islc247allcondition;
  crichomedesign = environment.crichomedesign
  isxpg = environment.isxpg;
  islc247Home = environment.islc247Home;
  is9betexchHome = environment.is9betexchHome;
  isrunXhome = environment.isrunXhome;
  diamondcasinoHome = environment.diamondcasinoHome;
  betWinnerHome = environment.betWinnerHome;
  nayaLudisHome = environment.nayaLudisHome;
  isLcexchHome = environment.isLcexchHome;
  palkiHome = environment.palkiHome;
  baji365Home = environment.baji365Home;
  isCricexch = environment.isCricexch;
  iframehome = environment.iframehome;
  isbetxHome = environment.isbetxHome;
  isskyfair = environment.isskyfair;

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
    { "providerName": "Ezugi", "providerCode": "EZ", "isBig": false },
    { "providerName": "One Touch", "providerCode": "OT", "isBig": false },
    { "providerName": "Power Games", "providerCode": "PG", "isBig": true },
    // {"providerName":"Pragmatic Play","providerCode":"PP","isBig":true},
  ];
  providerListbetwinner = [
    { "providerName": "Supernowa", "providerCode": "SN", "isBig": true },
    { "providerName": "Ezugi", "providerCode": "EZ", "isBig": false },
    { "providerName": "One Touch", "providerCode": "OT", "isBig": false },
    { "providerName": "Power Games", "providerCode": "PG", "isBig": true },
    { "providerName": "Pragmatic Play", "providerCode": "PP", "isBig": true },
  ];
  providerListLC = [
    { "providerName": "Supernowa", "providerCode": "SN", "isBig": true },
    // {"providerName":"Pragmatic Play","providerCode":"PP","isBig":true},
    { "providerName": "Ezugi", "providerCode": "EZ", "isBig": false },

  ];
  providerList9xch = [
    // { "providerName": "One Touch", "providerCode": "OT", "isBig": true },
    { "providerName": "Supernowa", "providerCode": "SN", "isBig": true },
    { "providerName": "Power Games", "providerCode": "PG", "isBig": true },

  ];
  providerListRunbet = [
    { "providerName": "Ezugi", "providerCode": "EZ", "isBig": false },
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
  providerListXPG = [
    { "providerName": "Baccarat", "providerCode": "XPG", "isBig": false },
    { "providerName": "Black-jack", "providerCode": "XPG", "isBig": false },
    { "providerName": "Dragon-tiger", "providerCode": "XPG", "isBig": false },
    { "providerName": "Roulette", "providerCode": "XPG", "isBig": false },
    { "providerName": "Sicbo", "providerCode": "XPG", "isBig": true },
    // {"providerName":"Pragmatic Play","providerCode":"PP","isBig":true},
  ];
  awcCasinoList_Vnd = [
    // { sr: 33, prod_code: '144', prod_type: '2', name: "FUNKY GAME", prod_name: "FUNKY GAME", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '98', prod_type: '1', name: "ORIENTAL GAMING", prod_name: "ORIENTAL GAMING", prod_type_name: 'LIVE CASINO' },
    // { sr: 33, prod_code: '74', prod_type: '2', name: "PLAYSTAR", prod_name: "PLAYSTAR", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '123', prod_type: '2', name: "WORLD MATCH", prod_name: "WORLD MATCH", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '129', prod_type: '2', name: "AMEBA", prod_name: "AMEBA", prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '39', prod_type: '2', name: "CQ9", prod_name: "CQ9", prod_type_name: 'SLOT,FISH HUNTER' },
    { sr: 13, prod_code: '1006', prod_type: '1', name: "EVOLUTION GAMING", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    // { sr: 9, prod_code: '17', prod_type: '3', name: "M8 SPORT", prod_name: "M8 SPORT", prod_type_name: 'SPORTBOOK' },
    // { sr: 9, prod_code: '42', prod_type: '2', name: "QUICK SPIN", prod_name: "QUICK SPIN", prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '45', prod_type: '2', name: "NETENT", prod_name: "NETENT", prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '48', prod_type: '2', name: "BLUEPRINT", prod_name: "BLUEPRINT", prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '7', prod_type: '1', name: "ALLBET", prod_name: "ALLBET", prod_type_name: 'LIVE CASINO' },
    // { sr: 9, prod_code: '132', prod_type: '2', name: "KA GAMING", prod_name: "KA GAMING", prod_type_name: 'SLOT' },

    // { sr: 33, prod_code: '74', prod_type: '2', name: "PLAYSTAR", prod_name: "PLAYSTAR", prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '3', prod_type: '1', name: "SEXY BACCARAT", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "KINGMAKER", prod_name: "KINGMAKER", prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "BlackJack", prod_name: "KINGMAKER", game_code: 'KM-TABLE-038', prod_type_name: 'SLOT' },

    // { sr: 9, prod_code: '19', prod_type: '1', name: "DREAM GAMING", prod_name: "DREAM GAMING", prod_type_name: 'LIVE CASINO' },
    // { sr: 9, prod_code: '20', prod_type: '1', name: "KING855", prod_name: "KING855", prod_type_name: 'LIVE CASINO' },
    // { sr: 9, prod_code: '59', prod_type: '2', name: "JILI", prod_name: "JILI", prod_type_name: 'SLOT,FISH HUNTER' },
    // { sr: 9, prod_code: '12', prod_type: '2', name: "SPADE GAMING", prod_name: "SPADE GAMING", prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '107', prod_type: '6', name: "FC FISHING", prod_name: "FC FISHING", prod_type_name: 'FISH HUNTER' },
    // { sr: 9, prod_code: '116', prod_type: '2', name: "RED TIGER", prod_name: "RED TIGER", prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '152', prod_type: '4', name: "AELOTTO", prod_name: "AELOTTO", prod_type_name: 'LOTTO' },
    // { sr: 9, prod_code: '146', prod_type: '5', name: "1G Poker", prod_name: "1G Poker", prod_type_name: 'LIVE CASINO,CARD AND BOARD' },
    // { sr: 9, prod_code: '148', prod_type: '2', name: "ASIA GAMING", prod_name: "ASIAGAMING", prod_type_name: 'LIVE CASINO,SLOT' },

  ]
  awcCasinoList_Vnd_jee365 = [
    // { sr: 33, prod_code: '98', prod_type: '1', name: "ORIENTAL GAMING", prod_name: "ORIENTAL GAMING", prod_type_name: 'LIVE CASINO' },
    // { sr: 33, prod_code: '74', prod_type: '2', name: "PLAYSTAR", prod_name: "PLAYSTAR", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '123', prod_type: '2', name: "WORLD MATCH", prod_name: "WORLD MATCH", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '129', prod_type: '2', name: "AMEBA", prod_name: "AMEBA", prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '39', prod_type: '2', name: "CQ9", prod_name: "CQ9", prod_type_name: 'SLOT,FISH HUNTER' },
    // { sr: 13, prod_code: '1006', prod_type: '1', name: "EVOLUTION GAMING", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    // { sr: 9, prod_code: '17', prod_type: '3', name: "M8 SPORT", prod_name: "M8 SPORT", prod_type_name: 'SPORTBOOK' },
    // { sr: 9, prod_code: '42', prod_type: '2', name: "QUICK SPIN", prod_name: "QUICK SPIN", prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '45', prod_type: '2', name: "NETENT", prod_name: "NETENT", prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '48', prod_type: '2', name: "BLUEPRINT", prod_name: "BLUEPRINT", prod_type_name: 'SLOT' },

  ]
  awcCasinoList_Vnd_test = [
    // { sr: 9, prod_code: '35', prod_type: '2', name: "MICROGAMING", prod_name: "MICROGAMING", prod_type_name: 'LIVE CASINO,SLOT' },
    // { sr: 9, prod_code: '27', prod_type: '2', name: "918KISS H5", prod_name: "918KISS H5", prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '80', prod_type: '3', name: "SBO", prod_name: "SBO", prod_type_name: 'SPORTBOOK' },
    // { sr: 9, prod_code: '151', prod_type: '1', name: "GAMEPLAY", prod_name: "GAMEPLAY", prod_type_name: 'LIVE CASINO,SLOT' },
    // { sr: 9, prod_code: '70', prod_type: '1', name: "WM CASINO", prod_name: "WM CASINO", prod_type_name: 'LIVE CASINO' },
    // { sr: 9, prod_code: '11', prod_type: '2', name: "ACE333", prod_name: "ACE333", prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '47', prod_type: '2', name: "4TH PLAYER", prod_name: "4TH PLAYER", prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '44', prod_type: '2', name: "KIRON", prod_name: "KIRON", prod_type_name: 'SLOT,CARD AND BOARD' },
    // { sr: 33, prod_code: '92', prod_type: '1', name: "FGG", prod_name: "FGG", prod_type_name: 'LIVE CASINO' },
    // { sr: 33, prod_code: '131', prod_type: '2', name: "GENESIS", prod_name: "GENESIS", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '90', prod_type: '3', name: "TBS - UGSPORT - UNITED GAMING", prod_name: "TBS - UGSPORT - UNITED GAMING", prod_type_name: 'SPORTBOOK' },
    // { sr: 33, prod_code: '125', prod_type: '2', name: "FUN GAMING", prod_name: "FUN GAMING", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '119', prod_type: '2', name: "QTECH", prod_name: "QTECH", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '49', prod_type: '2', name: "ELK", prod_name: "ELK", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '43', prod_type: '2', name: "MAVERICK", prod_name: "MAVERICK", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '21', prod_type: '2', name: "XE88", prod_name: "XE88", prod_type_name: 'SLOT' },
    // { sr: 10, prod_code: '5', prod_type: '1', name: "BIG GAMING", prod_name: "BIG GAMING", prod_type_name: 'LIVE CASINO,SLOT,LOTTO,CARD AND BOARD,FISH HUNTER' },
    // { sr: 13, prod_code: '2', prod_type: '2', name: "GAMINGSOFT SLOT", prod_name: "GAMINGSOFT SLOT", prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '86', prod_type: '3', name: "SPORTBOOK 1", prod_name: "IBC", prod_type_name: 'SPORTBOOK' },
    // { sr: 33, prod_code: '88', prod_type: '3', name: "SPORTBOOK 2", prod_name: "CMD", prod_type_name: 'SPORTBOOK' },
    // { sr: 33, prod_code: '79', prod_type: '1', name: "SPORTBOOK 3", prod_name: "BBIN", prod_type_name: 'LIVE CASINO,SLOT,SPORTBOOK' },






    // { sr: 9, prod_code: '24', prod_type: '2', name: "918KISS", prod_name: "918KISS", prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '117', prod_type: '2', name: "KINGMAKER", prod_name: "KINGMAKER", prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '117', prod_type: '2', name: "KINGMAKER", prod_name: "KINGMAKER", prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '117', prod_type: '2', name: "KINGMAKER", prod_name: "KINGMAKER", prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '117', prod_type: '2', name: "KINGMAKER", prod_name: "KINGMAKER", prod_type_name: 'SLOT' },








  ]
  awcCasinoList = [
    { sr: 13, prod_code: '1006', prod_type: '1', name: "EVOLUTION GAMING", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "KINGMAKER", prod_name: "KINGMAKER", prod_type_name: 'SLOT' },
    { sr: 2, prod_code: '3', prod_type: '1', name: "SEXY BACCARAT", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO' },
    // { sr: 10, prod_code: '5', prod_type: '1', name: "BIG GAMING", prod_name: "BIG GAMING", prod_type_name: 'LIVE CASINO,SLOT,LOTTO,CARD AND BOARD,FISH HUNTER' },
    // { sr: 11, prod_code: '94', prod_type: '1', name: "VENUS", prod_name: "VENUS", prod_type_name: 'LIVE CASINO' },
    // { sr: 1, prod_code: '41', prod_type: '2', name: "JDB", prod_name: "JDB", prod_type_name: 'SLOT,FISH HUNTER' },
    // { sr: 12, prod_code: '146', prod_type: '5', name: "1G Poker", prod_name: "1G Poker", prod_type_name: 'LIVE CASINO,CARD AND BOARD' },
    // { sr: 14, prod_code: '97', prod_type: '1', name: "EBET", prod_name: "EBET", prod_type_name: 'LIVE CASINO' },
    // { sr: 15, prod_code: '7', prod_type: '1', name: "ALLBET", prod_name: "ALLBET", prod_type_name: 'LIVE CASINO' },
    // { sr: 28, prod_code: '20', prod_type: '1', name: "KING855", prod_name: "KING855", prod_type_name: 'LIVE CASINO' },

    // { sr: 29, prod_code: '70', prod_type: '1', name: "WM CASINO", prod_name: "WM CASINO", prod_type_name: 'LIVE CASINO' },
    // { sr: 30, prod_code: '19', prod_type: '1', name: "DREAM GAMING", prod_name: "DREAM GAMING", prod_type_name: 'LIVE CASINO' },
    // { sr: 3, prod_code: '6', prod_type: '1', name: "PRAGMATIC", prod_name: "PRAGMATIC", prod_type_name: 'LIVE CASINO,SLOT', isBig: true },

    // { sr: 20, prod_code: '79', prod_type: '1', name: "BBIN", prod_name: "BBIN", prod_type_name: 'LIVE CASINO,SLOT,SPORTBOOK' },

    // { sr: 4, prod_code: '59', prod_type: '2', name: "JILI", prod_name: "JILI", prod_type_name: 'SLOT,FISH HUNTER' },
    // { sr: 33, prod_code: '151', prod_type: '1', name: "GAMEPLAY", prod_name: "GAMEPLAY", prod_type_name: 'LIVE CASINO,SLOT' },
    // { sr: 33, prod_code: '35', prod_type: '1', name: "MICROGAMING", prod_name: "MICROGAMING", prod_type_name: 'LIVE CASINO,SLOT' },

    // { sr: 23, prod_code: '39', prod_type: '2', name: "CQ9", prod_name: "CQ9", prod_type_name: 'LIVE CASINO,SLOT,FISH HUNTER' },
    // { sr: 17, prod_code: '107', prod_type: '6', name: "FC FISHING", prod_name: "FC FISHING", prod_type_name: 'FISH HUNTER' },
    // { sr: 21, prod_code: '48', prod_type: '2', name: "BLUEPRINT", prod_name: "BLUEPRINT", prod_type_name: 'SLOT' },
    // { sr: 24, prod_code: '126', prod_type: '2', name: "DRAGOON SOFT (DG)", prod_name: "DRAGOON SOFT (DG)", prod_type_name: 'SLOT' },
    // { sr: 26, prod_code: '17', prod_type: '3', name: "M8 SPORT", prod_name: "M8 SPORT", prod_type_name: 'SPORTBOOK' },
    // { sr: 31, prod_code: '27', prod_type: '2', name: "918KISS H5", prod_name: "918KISS H5", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '110', prod_type: '2', name: "3WIN8", prod_name: "3WIN8", prod_type_name: 'SLOT' },
    // { sr: 27, prod_code: '11', prod_type: '2', name: "ACE333", prod_name: "ACE333", prod_type_name: 'SLOT' },
    // { sr: 5, prod_code: '52', prod_type: '2', name: "YL FISHING",prod_name: "YL FISHING", prod_type_name: 'SLOT,FISH HUNTER' },
    // { sr: 6, prod_code: '105', prod_type: '5', name: "KAI YUAN",prod_name: "KAI YUAN", prod_type_name: 'CARD AND BOARD' },
    // { sr: 7, prod_code: '93', prod_type: '1', name: "EZUGI",prod_name: "EZUGI", prod_type_name: 'LIVE CASINO' },
    // { sr: 8, prod_code: '106', prod_type: '6', name: "SEA GAMING",prod_name: "SEA GAMING", prod_type_name: 'FISH HUNTER' },
    // { sr: 16, prod_code: '47', prod_type: '6', name: "4TH PLAYER",prod_name: "4TH PLAYER", prod_type_name: 'FISH HUNTER' },
    // { sr: 17, prod_code: '107', prod_type: '6', name: "FC FISHING",prod_name: "FC FISHING", prod_type_name: 'FISH HUNTER' },
    // { sr: 18, prod_code: '24', prod_type: '2', name: "918KISS",prod_name: "918KISS", prod_type_name: 'SLOT' },
    // { sr: 19, prod_code: '142', prod_type: '2', name: "918KISS 2",prod_name: "918KISS 2", prod_type_name: 'SLOT' },
    // { sr: 20, prod_code: '79', prod_type: '1', name: "BBIN",prod_name: "BBIN", prod_type_name: 'LIVE CASINO,SLOT,SPORTBOOK' },
    // { sr: 21, prod_code: '48', prod_type: '2', name: "BLUEPRINT",prod_name: "BLUEPRINT", prod_type_name: 'SLOT' },
    // { sr: 22, prod_code: '67', prod_type: '2', name: "CLUBSUNCITY",prod_name: "CLUBSUNCITY", prod_type_name: 'SLOT' },
    // { sr: 23, prod_code: '39', prod_type: '2', name: "CQ9",prod_name: "CQ9", prod_type_name: 'LIVE CASINO,SLOT,FISH HUNTER' },
    // { sr: 24, prod_code: '126', prod_type: '2', name: "DRAGOON SOFT (DG)",prod_name: "DRAGOON SOFT (DG)", prod_type_name: 'SLOT' },
    // { sr: 25, prod_code: '44', prod_type: '8', name: "KIRON",prod_name: "KIRON", prod_type_name: 'SPORTBOOK' },
    // { sr: 26, prod_code: '17', prod_type: '3', name: "M8 SPORT",prod_name: "M8 SPORT", prod_type_name: 'SPORTBOOK' },





  ]


  //cricbuzzer list
  cricbuzzerawcList = [
    { sr: 9, prod_code: '117', prod_type: '2', name: "Roulette", prod_name: "KINGMAKER", game_code: 'KM-TABLE-027', prod_type_name: 'SLOT', },
    { sr: 9, prod_code: '117', prod_type: '2', name: "KINGMAKER", prod_name: "KINGMAKER", prod_type_name: 'SLOT' },
    { sr: 2, prod_code: '3', prod_type: '1', name: "AE Sexy", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO' },
    // { sr: 33, prod_code: '98', prod_type: '1', name: "ORIENTAL GAMING", prod_name: "ORIENTAL GAMING", prod_type_name: 'LIVE CASINO' },
    // { sr: 13, prod_code: '1006', prod_type: '1', name: "EVOLUTION GAMING", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    // { sr: 9, prod_code: '3', prod_type: '1', name: "SEXY BACCARAT", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO' },
    // { sr: 3, prod_code: '6', prod_type: '1', name: "Pragmatic Play", prod_name: "PRAGMATIC", prod_type_name: 'LIVE CASINO,SLOT' },
    // { sr: 29, prod_code: '70', prod_type: '1', name: "Sexy Dragon Tiger", prod_name: "WM CASINO", prod_type_name: 'LIVE CASINO' },
    // { sr: 14, prod_code: '97', prod_type: '1', name: "EBET", prod_name: "EBET", prod_type_name: 'LIVE CASINO' },
    // { sr: 7, prod_code: '93', prod_type: '1', name: "EZUGI", prod_name: "EZUGI", prod_type_name: 'LIVE CASINO' },
    // { sr: 9, prod_code: '35', prod_type: '2', name: "MICROGAMING", prod_name: "MICROGAMING", prod_type_name: 'LIVE CASINO,SLOT' },
    // { sr: 9, prod_code: '7', prod_type: '1', name: "ALLBET", prod_name: "ALLBET", prod_type_name: 'LIVE CASINO' },
    // { sr: 10, prod_code: '5', prod_type: '1', name: "BIG GAMING", prod_name: "BIG GAMING", prod_type_name: 'LIVE CASINO,SLOT,LOTTO,CARD AND BOARD,FISH HUNTER' },
    // { sr: 20, prod_code: '79', prod_type: '1', name: "BBIN", prod_name: "BBIN", prod_type_name: 'LIVE CASINO,SLOT,SPORTBOOK' },
    // { sr: 9, prod_code: '20', prod_type: '1', name: "KING855", prod_name: "KING855", prod_type_name: 'LIVE CASINO' },
    // { sr: 11, prod_code: '94', prod_type: '1', name: "VENUS", prod_name: "VENUS", prod_type_name: 'LIVE CASINO' },
    // { sr: 33, prod_code: '151', prod_type: '1', name: "GAMEPLAY", prod_name: "GAMEPLAY", prod_type_name: 'LIVE CASINO,SLOT' },
    // { sr: 33, prod_code: '92', prod_type: '1', name: "FGG", prod_name: "FGG", prod_type_name: 'LIVE CASINO' },
    // { sr: 33, prod_code: '72', prod_type: '8', name: "Horse Grey Sportsbook", prod_name: "CITIBET", prod_type_name: 'OTHERS' },
    // { sr: 12, prod_code: '146', prod_type: '5', name: "1G Poker", prod_name: "1G Poker", prod_type_name: 'LIVE CASINO,CARD AND BOARD' },
    // { sr: 26, prod_code: '17', prod_type: '3', name: "Sportbook", prod_name: "M8 SPORT", prod_type_name: 'SPORTBOOK', isBig: true },
    // { sr: 24, prod_code: '126', prod_type: '2', name: "DRAGOON SOFT (DG)", prod_name: "DRAGOON SOFT (DG)", prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '39', prod_type: '2', name: "CQ9", prod_name: "CQ9", prod_type_name: 'SLOT,FISH HUNTER' },
    // { sr: 4, prod_code: '59', prod_type: '2', name: "JILI", prod_name: "JILI", prod_type_name: 'SLOT,FISH HUNTER' },
    // { sr: 6, prod_code: '105', prod_type: '5', name: "KAI YUAN", prod_name: "KAI YUAN", prod_type_name: 'CARD AND BOARD' },
    // { sr: 1, prod_code: '41', prod_type: '2', name: "JDB", prod_name: "JDB", prod_type_name: 'SLOT,FISH HUNTER' },
    // { sr: 27, prod_code: '11', prod_type: '2', name: "ACE333", prod_name: "ACE333", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '144', prod_type: '2', name: "FUNKY GAME", prod_name: "FUNKY GAME", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '129', prod_type: '2', name: "AMEBA", prod_name: "AMEBA", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '125', prod_type: '2', name: "FUN GAMING", prod_name: "FUN GAMING", prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '27', prod_type: '2', name: "918KISS H5", prod_name: "918KISS H5", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '110', prod_type: '2', name: "3WIN8", prod_name: "3WIN8", prod_type_name: 'SLOT' },

  ]
  cricbuzzerawcList_Vnd = [
    // { sr: 9, prod_code: '117', prod_type: '2', name: "KINGMAKER", prod_name: "KINGMAKER", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '98', prod_type: '1', name: "ORIENTAL GAMING", prod_name: "ORIENTAL GAMING", prod_type_name: 'LIVE CASINO' },
    // { sr: 13, prod_code: '1006', prod_type: '1', name: "EVOLUTION GAMING", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    // { sr: 9, prod_code: '3', prod_type: '1', name: "SEXY BACCARAT", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO' },
    // { sr: 29, prod_code: '70', prod_type: '1', name: "Sexy Dragon Tiger", prod_name: "WM CASINO", prod_type_name: 'LIVE CASINO' },
    // { sr: 14, prod_code: '97', prod_type: '1', name: "EBET", prod_name: "EBET", prod_type_name: 'LIVE CASINO' },
    // { sr: 9, prod_code: '35', prod_type: '2', name: "MICROGAMING", prod_name: "MICROGAMING", prod_type_name: 'LIVE CASINO,SLOT' },
    // { sr: 9, prod_code: '7', prod_type: '1', name: "ALLBET", prod_name: "ALLBET", prod_type_name: 'LIVE CASINO' },
    // { sr: 10, prod_code: '5', prod_type: '1', name: "BIG GAMING", prod_name: "BIG GAMING", prod_type_name: 'LIVE CASINO,SLOT,LOTTO,CARD AND BOARD,FISH HUNTER' },
    // { sr: 20, prod_code: '79', prod_type: '1', name: "BBIN", prod_name: "BBIN", prod_type_name: 'LIVE CASINO,SLOT,SPORTBOOK' },
    // { sr: 9, prod_code: '20', prod_type: '1', name: "KING855", prod_name: "KING855", prod_type_name: 'LIVE CASINO' },
    // { sr: 33, prod_code: '151', prod_type: '1', name: "GAMEPLAY", prod_name: "GAMEPLAY", prod_type_name: 'LIVE CASINO,SLOT' },
    // { sr: 33, prod_code: '92', prod_type: '1', name: "FGG", prod_name: "FGG", prod_type_name: 'LIVE CASINO' },
    // { sr: 12, prod_code: '146', prod_type: '5', name: "1G Poker", prod_name: "1G Poker", prod_type_name: 'LIVE CASINO,CARD AND BOARD' },
    // { sr: 26, prod_code: '17', prod_type: '3', name: "Sportbook", prod_name: "M8 SPORT", prod_type_name: 'SPORTBOOK', isBig: true },
    // { sr: 9, prod_code: '39', prod_type: '2', name: "CQ9", prod_name: "CQ9", prod_type_name: 'SLOT,FISH HUNTER' },
    // { sr: 4, prod_code: '59', prod_type: '2', name: "JILI", prod_name: "JILI", prod_type_name: 'SLOT,FISH HUNTER' },
    // { sr: 27, prod_code: '11', prod_type: '2', name: "ACE333", prod_name: "ACE333", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '144', prod_type: '2', name: "FUNKY GAME", prod_name: "FUNKY GAME", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '129', prod_type: '2', name: "AMEBA", prod_name: "AMEBA", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '125', prod_type: '2', name: "FUN GAMING", prod_name: "FUN GAMING", prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '27', prod_type: '2', name: "918KISS H5", prod_name: "918KISS H5", prod_type_name: 'SLOT' },

  ]
  cricbuzzerawcList_other = [
    { sr: 2, prod_code: '3', prod_type: '1', name: "AE Sexy", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO' },
    // { sr: 3, prod_code: '6', prod_type: '1', name: "Pragmatic Play", prod_name: "PRAGMATIC", prod_type_name: 'LIVE CASINO,SLOT' },
    // { sr: 7, prod_code: '93', prod_type: '1', name: "EZUGI", prod_name: "EZUGI", prod_type_name: 'LIVE CASINO' },
    // { sr: 11, prod_code: '94', prod_type: '1', name: "VENUS", prod_name: "VENUS", prod_type_name: 'LIVE CASINO' },
    // { sr: 33, prod_code: '72', prod_type: '8', name: "Horse Grey Sportsbook", prod_name: "CITIBET", prod_type_name: 'OTHERS' },
    // { sr: 24, prod_code: '126', prod_type: '2', name: "DRAGOON SOFT (DG)", prod_name: "DRAGOON SOFT (DG)", prod_type_name: 'SLOT' },
    // { sr: 6, prod_code: '105', prod_type: '5', name: "KAI YUAN", prod_name: "KAI YUAN", prod_type_name: 'CARD AND BOARD' },
    // { sr: 1, prod_code: '41', prod_type: '2', name: "JDB", prod_name: "JDB", prod_type_name: 'SLOT,FISH HUNTER' },
    // { sr: 33, prod_code: '110', prod_type: '2', name: "3WIN8", prod_name: "3WIN8", prod_type_name: 'SLOT' },
  ]
  awcCasino_evolution_ezugi = [
    { sr: 13, prod_code: '1006', clsname: 'evolution', prod_type: '1', name: "EVOLUTION GAMING", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    // { sr: 13, prod_code: '93', clsname: 'ezugi', prod_type: '1', name: "Ezugi", prod_name: "EZUGI", prod_type_name: 'LIVE CASINO' },
  ]
  awcCasino_Ae_sexy = [
    { sr: 2, prod_code: '3', clsname: 'ae-sexy', prod_type: '1', name: "AE Sexy", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO', isBig: true },
  ]
  awcCasino_kingmaker = [
    { sr: 9, prod_code: '117', prod_type: '2', name: "KINGMAKER", prod_name: "KINGMAKER", prod_type_name: 'SLOT' },
  ]

  awcCasino_kingmaker_AE = [
    { sr: 2, prod_code: '3', clsname: 'ae-sexy', prod_type: '1', name: "AE Sexy", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO' , isBig: true },
    { sr: 13, prod_code: '1006', clsname: 'evolution', prod_type: '1', name: "EVOLUTION", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' , isBig: true },
  ]

  awcCasino_kingmaker_jili = [
    { sr: 9, prod_code: '117', prod_type: '2', name: "KINGMAKER", prod_name: "KINGMAKER", prod_type_name: 'SLOT' , isBig: true },
    { sr: 4, prod_code: '59', clsname: 'jili', prod_type: '2', name: "JILI", prod_name: "JILI", prod_type_name: 'SLOT,FISH HUNTER' , isBig: true },
  ]
  awcCasino_jili = [
    { sr: 9, prod_code: '59', prod_type: '2', name: "Teenpatti 2020", prod_name: "JILI", game_code: 'JILI-TABLE-016', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Number King", prod_name: "JILI", game_code: 'JILI-TABLE-005', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Big Small", prod_name: "JILI", game_code: 'JILI-TABLE-007', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Teenpatti Joker", prod_name: "JILI", game_code: 'JILI-TABLE-010', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "7up 7down", prod_name: "JILI", game_code: 'JILI-TABLE-011', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Dragon Tiger", prod_name: "JILI", game_code: 'JILI-TABLE-012', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Callbreak Quick", prod_name: "JILI", game_code: 'JILI-TABLE-013', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Sicbo", prod_name: "JILI", game_code: 'JILI-TABLE-017', prod_type_name: 'SLOT' },
  ]

  awcCasino_international = [
    { sr: 9, prod_code: '117', prod_type: '2', name: "Blackjack", prod_name: "KINGMAKER", game_code: 'KM-TABLE-038', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Mime Sweeper", prod_name: "KINGMAKER", game_code: 'KM-TABLE-042', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "BONUS DICE", prod_name: "KINGMAKER", game_code: 'KM-TABLE-043', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "HEIST", prod_name: "KINGMAKER", game_code: 'KM-TABLE-047', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "5 CARDS POKER", prod_name: "KINGMAKER", game_code: 'KM-TABLE-049', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "COLOR GAMES", prod_name: "KINGMAKER", game_code: 'KM-TABLE-050', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "32 Cards", prod_name: "KINGMAKER", game_code: 'KM-TABLE-039', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Card Matka", prod_name: "KINGMAKER", game_code: 'KM-TABLE-021', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "JHANDI MUNDA", prod_name: "KINGMAKER", game_code: 'KM-TABLE-030', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Andar Bahar", prod_name: "KINGMAKER", game_code: 'KM-TABLE-032', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Number Matka", prod_name: "KINGMAKER", game_code: 'KM-TABLE-048', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Card Hilow", prod_name: "KINGMAKER", game_code: 'KM-TABLE-037', prod_type_name: 'SLOT' },
  ]
  //end
  awcCasinoListTest = [
    // { sr: 16, prod_code: '47', prod_type: '6', name: "4TH PLAYER", prod_name: "4TH PLAYER", prod_type_name: 'FISH HUNTER' },
    // { sr: 25, prod_code: '44', prod_type: '8', name: "KIRON", prod_name: "KIRON", prod_type_name: 'SPORTBOOK' },
    // { sr: 27, prod_code: '11', prod_type: '2', name: "ACE333", prod_name: "ACE333", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '152', prod_type: '4', name: "AELOTTO", prod_name: "AELOTTO", prod_type_name: 'LOTTO' },
    // { sr: 33, prod_code: '71', prod_type: '1', name: "PLAYTECH", prod_name: "PLAYTECH", prod_type_name: 'LIVE CASINO,SLOT' },


    // { sr: 33, prod_code: '13', prod_type: '2', name: "918KAYA", prod_name: "918KAYA", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '77', prod_type: '1', name: "YEEBET", prod_name: "YEEBET", prod_type_name: 'LIVE CASINO' },
    // { sr: 33, prod_code: '105', prod_type: '5', name: "KAI YUAN", prod_name: "KAI YUAN", prod_type_name: 'CARD AND BOARD' },
    // { sr: 33, prod_code: '10', prod_type: '3', name: "WBET", prod_name: "WBET", prod_type_name: 'SPORTBOOK' },
    // { sr: 33, prod_code: '147', prod_type: '3', name: "WS SPORT", prod_name: "WS SPORT", prod_type_name: 'SPORTBOOK' },
    // { sr: 33, prod_code: '80', prod_type: '3', name: "SBO", prod_name: "SBO", prod_type_name: 'SLOT,SPORTBOOK' },
    // { sr: 33, prod_code: '89', prod_type: '3', name: "OBET33", prod_name: "OBET33", prod_type_name: 'SPORTBOOK' },
    // { sr: 33, prod_code: '144', prod_type: '2', name: "FUNKY GAME", prod_name: "FUNKY GAME", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '98', prod_type: '1', name: "ORIENTAL GAMING", prod_name: "ORIENTAL GAMING", prod_type_name: 'LIVE CASINO' },
    // { sr: 33, prod_code: '92', prod_type: '1', name: "FGG", prod_name: "FGG", prod_type_name: 'LIVE CASINO' },
    // { sr: 33, prod_code: '88', prod_type: '3', name: "CMD", prod_name: "CMD", prod_type_name: 'SPORTBOOK' },
    // { sr: 33, prod_code: '85', prod_type: '3', name: "BC SPORT", prod_name: "BC SPORT", prod_type_name: 'SPORTBOOK' },
    // { sr: 33, prod_code: '129', prod_type: '2', name: "AMEBA", prod_name: "AMEBA", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '125', prod_type: '2', name: "FUN GAMING", prod_name: "FUN GAMING", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '72', prod_type: '8', name: "CITIBET", prod_name: "CITIBET", prod_type_name: 'OTHERS' },
    // { sr: 18, prod_code: '24', prod_type: '2', name: "918KISS",prod_name: "918KISS", prod_type_name: 'SLOT' },
    // { sr: 19, prod_code: '142', prod_type: '2', name: "918KISS 2",prod_name: "918KISS 2", prod_type_name: 'SLOT' },

    // { sr: 22, prod_code: '67', prod_type: '2', name: "CLUBSUNCITY",prod_name: "CLUBSUNCITY", prod_type_name: 'SLOT' },


    // { sr: 32, prod_code: '36', prod_type: '2', prod_name: "EVO888", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '82', prod_type: '2', prod_name: "PLAYBOY", prod_type_name: 'SLOT' }, 

  ]
  awcCasinoList_bdbet = [
    { sr: 13, prod_code: '1006', clsname: 'evolution', prod_type: '1', name: "EVOLUTION", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
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

  awcCasinoList_nayaludis = [
    { sr: 26, prod_code: '87', prod_type: '3', name: "BTI", prod_name: "BTI", prod_type_name: 'SPORTBOOK', isBig: true },
    { sr: 2, prod_code: '3', prod_type: '1', name: "AE Sexy", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO' },
    // { sr: 33, prod_code: '80', prod_type: '3', name: "SBO", prod_name: "SBO", prod_type_name: 'SLOT,SPORTBOOK', isBig: true },
    { sr: 13, prod_code: '1006', prod_type: '1', name: "EVOLUTION GAMING", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 29, prod_code: '70', prod_type: '1', name: "WM CASINO", prod_name: "WM CASINO", prod_type_name: 'LIVE CASINO' },
    { sr: 31, prod_code: '27', prod_type: '2', name: "918KISS H5", prod_name: "918KISS H5", prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "SCard Poker", prod_name: "KINGMAKER", game_code: 'KM-TABLE-049', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "BACCARAT", prod_name: "KINGMAKER", game_code: 'KM-TABLE-049', prod_type_name: 'SLOT' },
    // { sr: 3, prod_code: '6', prod_type: '1', name: "PRAGMATIC", prod_name: "PRAGMATIC", prod_type_name: 'LIVE CASINO,SLOT', isBig: true },
    { name: "Ludo", prod_name: "Ludo", prod_type_name: 'Ludo', isBig: true },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Color Game", prod_name: "KINGMAKER", game_code: 'KM-TABLE-050', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Sicbo", prod_name: "KINGMAKER", game_code: 'KM-TABLE-015', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "7Up 7Down", prod_name: "KINGMAKER", game_code: 'KM-TABLE-028', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Coin Toss", prod_name: "KINGMAKER", game_code: 'KM-TABLE-036', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Card Hilow", prod_name: "KINGMAKER", game_code: 'KM-TABLE-037', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "32 Cards", prod_name: "KINGMAKER", game_code: 'KM-TABLE-039', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Card Matka", prod_name: "KINGMAKER", game_code: 'KM-TABLE-021', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Number Matka", prod_name: "KINGMAKER", game_code: 'KM-TABLE-048', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Andar Bahar", prod_name: "KINGMAKER", game_code: 'KM-TABLE-032', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "BlackJack", prod_name: "KINGMAKER", game_code: 'KM-TABLE-038', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Mine Sheeper", prod_name: "KINGMAKER", game_code: 'KM-TABLE-042', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "European Roulette", prod_name: "KINGMAKER", game_code: 'KM-TABLE-027', prod_type_name: 'SLOT', },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Pok Deng", prod_name: "KINGMAKER", game_code: 'KM-TABLE-034', prod_type_name: 'SLOT', },
    { sr: 30, prod_code: '19', prod_type: '1', name: "DREAM GAMING", prod_name: "DREAM GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 33, prod_code: '110', prod_type: '2', name: "3WIN8", prod_name: "3WIN8", prod_type_name: 'SLOT' },
    { sr: 11, prod_code: '94', prod_type: '1', name: "VENUS", prod_name: "VENUS", prod_type_name: 'LIVE CASINO' },
    // { name: "Kabaddi", prod_name: "Kabaddi", prod_type_name: 'Kabaddi', isBig: true, isSport: true, eventTypeId: 52 },
    { sr: 2, prod_code: '3', prod_type: '1', name: "SEXY BACCARAT", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO' },
    { sr: 10, prod_code: '5', prod_type: '1', name: "BIG GAMING", prod_name: "BIG GAMING", prod_type_name: 'LIVE CASINO,SLOT,LOTTO,CARD AND BOARD,FISH HUNTER' },


    { sr: 9, prod_code: '117', prod_type: '2', name: "KINGMAKER", prod_name: "KINGMAKER", prod_type_name: 'SLOT', isBig: true },
    { sr: 1, prod_code: '41', prod_type: '2', name: "JDB", prod_name: "JDB", prod_type_name: 'SLOT,FISH HUNTER' },
    { sr: 12, prod_code: '146', prod_type: '5', name: "1G Poker", prod_name: "1G Poker", prod_type_name: 'LIVE CASINO,CARD AND BOARD' },
    { sr: 14, prod_code: '97', prod_type: '1', name: "EBET", prod_name: "EBET", prod_type_name: 'LIVE CASINO' },
    { sr: 15, prod_code: '7', prod_type: '1', name: "ALLBET", prod_name: "ALLBET", prod_type_name: 'LIVE CASINO' },
    { sr: 28, prod_code: '20', prod_type: '1', name: "KING855", prod_name: "KING855", prod_type_name: 'LIVE CASINO' },

    { sr: 20, prod_code: '79', prod_type: '1', name: "BBIN", prod_name: "BBIN", prod_type_name: 'LIVE CASINO,SLOT,SPORTBOOK' },
    { sr: 4, prod_code: '59', prod_type: '2', name: "JILI", prod_name: "JILI", prod_type_name: 'SLOT,FISH HUNTER' },
    { sr: 33, prod_code: '151', prod_type: '1', name: "GAMEPLAY", prod_name: "GAMEPLAY", prod_type_name: 'LIVE CASINO,SLOT' },
    { sr: 33, prod_code: '35', prod_type: '1', name: "MICROGAMING", prod_name: "MICROGAMING", prod_type_name: 'LIVE CASINO,SLOT' },
    // { sr: 5, prod_code: '52', prod_type: '2', name: "YL FISHING",prod_name: "YL FISHING", prod_type_name: 'SLOT,FISH HUNTER' },
    // { sr: 6, prod_code: '105', prod_type: '5', name: "KAI YUAN",prod_name: "KAI YUAN", prod_type_name: 'CARD AND BOARD' },
    // { sr: 7, prod_code: '93', prod_type: '1', name: "EZUGI",prod_name: "EZUGI", prod_type_name: 'LIVE CASINO' },
    // { sr: 8, prod_code: '106', prod_type: '6', name: "SEA GAMING",prod_name: "SEA GAMING", prod_type_name: 'FISH HUNTER' },
    { sr: 23, prod_code: '39', prod_type: '2', name: "CQ9", prod_name: "CQ9", prod_type_name: 'LIVE CASINO,SLOT,FISH HUNTER' },
    { sr: 17, prod_code: '107', prod_type: '6', name: "FC FISHING", prod_name: "FC FISHING", prod_type_name: 'FISH HUNTER' },
    { sr: 21, prod_code: '48', prod_type: '2', name: "BLUEPRINT", prod_name: "BLUEPRINT", prod_type_name: 'SLOT' },
    { sr: 24, prod_code: '126', prod_type: '2', name: "DRAGOON SOFT (DG)", prod_name: "DRAGOON SOFT (DG)", prod_type_name: 'SLOT' },
    { sr: 26, prod_code: '17', prod_type: '3', name: "M8 SPORT", prod_name: "M8 SPORT", prod_type_name: 'SPORTBOOK' },


    // { sr: 16, prod_code: '47', prod_type: '6', name: "4TH PLAYER",prod_name: "4TH PLAYER", prod_type_name: 'FISH HUNTER' },
    // { sr: 17, prod_code: '107', prod_type: '6', name: "FC FISHING",prod_name: "FC FISHING", prod_type_name: 'FISH HUNTER' },
    // { sr: 18, prod_code: '24', prod_type: '2', name: "918KISS",prod_name: "918KISS", prod_type_name: 'SLOT' },
    // { sr: 19, prod_code: '142', prod_type: '2', name: "918KISS 2",prod_name: "918KISS 2", prod_type_name: 'SLOT' },
    // { sr: 20, prod_code: '79', prod_type: '1', name: "BBIN",prod_name: "BBIN", prod_type_name: 'LIVE CASINO,SLOT,SPORTBOOK' },
    // { sr: 21, prod_code: '48', prod_type: '2', name: "BLUEPRINT",prod_name: "BLUEPRINT", prod_type_name: 'SLOT' },
    // { sr: 22, prod_code: '67', prod_type: '2', name: "CLUBSUNCITY",prod_name: "CLUBSUNCITY", prod_type_name: 'SLOT' },
    // { sr: 23, prod_code: '39', prod_type: '2', name: "CQ9",prod_name: "CQ9", prod_type_name: 'LIVE CASINO,SLOT,FISH HUNTER' },
    // { sr: 24, prod_code: '126', prod_type: '2', name: "DRAGOON SOFT (DG)",prod_name: "DRAGOON SOFT (DG)", prod_type_name: 'SLOT' },
    // { sr: 25, prod_code: '44', prod_type: '8', name: "KIRON",prod_name: "KIRON", prod_type_name: 'SPORTBOOK' },
    // { sr: 26, prod_code: '17', prod_type: '3', name: "M8 SPORT",prod_name: "M8 SPORT", prod_type_name: 'SPORTBOOK' },
  ]
  
  awcCasinoLists_baji = [
    // { sr: 9, prod_code: '117', prod_type: '2', name: "KINGMAKER", prod_name: "KINGMAKER", prod_type_name: 'SLOT', isBig: true },
    { sr: 2, prod_code: '3', prod_type: '1', name: "AE Sexy", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', name: "EVOLUTION GAMING", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "SCard Poker", prod_name: "KINGMAKER", game_code: 'KM-TABLE-049', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "BACCARAT", prod_name: "KINGMAKER", game_code: 'KM-TABLE-049', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Color Game", prod_name: "KINGMAKER", game_code: 'KM-TABLE-050', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Sicbo", prod_name: "KINGMAKER", game_code: 'KM-TABLE-015', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "7Up 7Down", prod_name: "KINGMAKER", game_code: 'KM-TABLE-028', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Coin Toss", prod_name: "KINGMAKER", game_code: 'KM-TABLE-036', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Card Hilow", prod_name: "KINGMAKER", game_code: 'KM-TABLE-037', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "32 Cards", prod_name: "KINGMAKER", game_code: 'KM-TABLE-039', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Card Matka", prod_name: "KINGMAKER", game_code: 'KM-TABLE-021', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Number Matka", prod_name: "KINGMAKER", game_code: 'KM-TABLE-048', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Andar Bahar", prod_name: "KINGMAKER", game_code: 'KM-TABLE-032', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "BlackJack", prod_name: "KINGMAKER", game_code: 'KM-TABLE-038', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Mine Sheeper", prod_name: "KINGMAKER", game_code: 'KM-TABLE-042', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "European Roulette", prod_name: "KINGMAKER", game_code: 'KM-TABLE-027', prod_type_name: 'SLOT', },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Pok Deng", prod_name: "KINGMAKER", game_code: 'KM-TABLE-034', prod_type_name: 'SLOT', },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Teenpatti 2020", prod_name: "JILI", game_code: 'JILI-TABLE-016', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Number King", prod_name: "JILI", game_code: 'JILI-TABLE-005', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Big Small", prod_name: "JILI", game_code: 'JILI-TABLE-007', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Teenpatti Joker", prod_name: "JILI", game_code: 'JILI-TABLE-010', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "7up 7down_", prod_name: "JILI", game_code: 'JILI-TABLE-011', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Dragon Tiger", prod_name: "JILI", game_code: 'JILI-TABLE-012', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Callbreak Quick", prod_name: "JILI", game_code: 'JILI-TABLE-013', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Sicbo_", prod_name: "JILI", game_code: 'JILI-TABLE-017', prod_type_name: 'SLOT' },
  ]
  awcCasinoLists_runx = [
    { sr: 9, prod_code: '117', prod_type: '2', name: "KINGMAKER", prod_name: "KINGMAKER", prod_type_name: 'SLOT', isBig: true },
    { sr: 2, prod_code: '3', prod_type: '1', name: "AE Sexy", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', name: "EVOLUTION GAMING", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "SCard Poker", prod_name: "KINGMAKER", game_code: 'KM-TABLE-049', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "BACCARAT", prod_name: "KINGMAKER", game_code: 'KM-TABLE-049', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Color Game", prod_name: "KINGMAKER", game_code: 'KM-TABLE-050', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Sicbo", prod_name: "KINGMAKER", game_code: 'KM-TABLE-015', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "7Up 7Down", prod_name: "KINGMAKER", game_code: 'KM-TABLE-028', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Coin Toss", prod_name: "KINGMAKER", game_code: 'KM-TABLE-036', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Card Hilow", prod_name: "KINGMAKER", game_code: 'KM-TABLE-037', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "32 Cards", prod_name: "KINGMAKER", game_code: 'KM-TABLE-039', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Card Matka", prod_name: "KINGMAKER", game_code: 'KM-TABLE-021', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Number Matka", prod_name: "KINGMAKER", game_code: 'KM-TABLE-048', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Andar Bahar", prod_name: "KINGMAKER", game_code: 'KM-TABLE-032', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "BlackJack", prod_name: "KINGMAKER", game_code: 'KM-TABLE-038', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Mine Sheeper", prod_name: "KINGMAKER", game_code: 'KM-TABLE-042', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "European Roulette", prod_name: "KINGMAKER", game_code: 'KM-TABLE-027', prod_type_name: 'SLOT', },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Pok Deng", prod_name: "KINGMAKER", game_code: 'KM-TABLE-034', prod_type_name: 'SLOT', },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Teenpatti 2020", prod_name: "JILI", game_code: 'JILI-TABLE-016', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Number King", prod_name: "JILI", game_code: 'JILI-TABLE-005', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Big Small", prod_name: "JILI", game_code: 'JILI-TABLE-007', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Teenpatti Joker", prod_name: "JILI", game_code: 'JILI-TABLE-010', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "7up 7down_", prod_name: "JILI", game_code: 'JILI-TABLE-011', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Dragon Tiger", prod_name: "JILI", game_code: 'JILI-TABLE-012', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Callbreak Quick", prod_name: "JILI", game_code: 'JILI-TABLE-013', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '59', prod_type: '2', name: "Sicbo_", prod_name: "JILI", game_code: 'JILI-TABLE-017', prod_type_name: 'SLOT' },
  ]

  awcCasinoList_worldexch = [
    { sr: 2, prod_code: '3', prod_type: '1', name: "SEXY BACCARAT", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', name: "EVOLUTION GAMING", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    // { sr: 7, prod_code: '93', prod_type: '1', name: "EZUGI", prod_name: "EZUGI", prod_type_name: 'LIVE CASINO' },
    // { sr: 3, prod_code: '6', prod_type: '1', name: "PRAGMATIC", prod_name: "PRAGMATIC", prod_type_name: 'LIVE CASINO,SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Coin toss", prod_name: "KINGMAKER", game_code: 'KM-TABLE-036', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "KINGMAKER", prod_name: "KINGMAKER", prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "CARDS HILO", prod_name: "KINGMAKER", game_code: 'KM-TABLE-037', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "BACCARAT", prod_name: "KINGMAKER", game_code: 'KM-TABLE-026', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "COLOR GAMES", prod_name: "KINGMAKER", game_code: 'KM-TABLE-050', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "HEIST", prod_name: "KINGMAKER", game_code: 'KM-TABLE-047', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "5 CARDS POKER", prod_name: "KINGMAKER", game_code: 'KM-TABLE-049', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "POK DENG", prod_name: "KINGMAKER", game_code: 'KM-TABLE-034', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "32 CARDS", prod_name: "KINGMAKER", game_code: 'KM-TABLE-039', prod_type_name: 'SLOT', },
    { sr: 9, prod_code: '117', prod_type: '2', name: "sicbo", prod_name: "KINGMAKER", game_code: 'KM-TABLE-015', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Andar bahar", prod_name: "KINGMAKER", game_code: 'KM-TABLE-032', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "European Roulette", prod_name: "KINGMAKER", game_code: 'KM-TABLE-027', prod_type_name: 'SLOT', },
    { sr: 9, prod_code: '117', prod_type: '2', name: "7 up 7 down", prod_name: "KINGMAKER", game_code: 'KM-TABLE-028', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Card Matka", prod_name: "KINGMAKER", game_code: 'KM-TABLE-022', prod_type_name: 'SLOT' },
    { sr: 33, prod_code: '35', prod_type: '1', name: "MICROGAMING", prod_name: "MICROGAMING", prod_type_name: 'LIVE CASINO,SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "BONUS DICE", prod_name: "KINGMAKER", game_code: 'KM-TABLE-043', prod_type_name: 'SLOT', },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Blackjack", prod_name: "KINGMAKER", game_code: 'KM-TABLE-038', prod_type_name: 'SLOT', },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Mime Sweeper", prod_name: "KINGMAKER", game_code: 'KM-TABLE-042', prod_type_name: 'SLOT' },
    // { sr: 11, prod_code: '41', prod_type: '2', name: "Cockfight", prod_name: "JDB", game_code: 'JDB-SLOT-024', prod_type_name: 'SLOT,FISH HUNTER', isBig: true },
    { sr: 9, prod_code: '117', prod_type: '2', name: "HORSE BOOK", prod_name: "KINGMAKER", game_code: 'KM-TABLE-048', prod_type_name: 'SLOT', isBig: true },
    // { sr: 11, prod_code: '94', prod_type: '1', name: "VENUS", prod_name: "VENUS", prod_type_name: 'LIVE CASINO', isBig: true },
    // { sr: 10, prod_code: '5', prod_type: '1', name: "BIG GAMING", prod_name: "BIG GAMING", prod_type_name: 'LIVE CASINO,SLOT,LOTTO,CARD AND BOARD,FISH HUNTER' },
    // { sr: 1, prod_code: '41', prod_type: '2', name: "JDB", prod_name: "JDB", prod_type_name: 'SLOT,FISH HUNTER' },
    // { sr: 12, prod_code: '146', prod_type: '5', name: "1G Poker", prod_name: "1G Poker", prod_type_name: 'LIVE CASINO,CARD AND BOARD' },
    // { sr: 14, prod_code: '97', prod_type: '1', name: "EBET", prod_name: "EBET", prod_type_name: 'LIVE CASINO' },
    // { sr: 15, prod_code: '7', prod_type: '1', name: "ALLBET", prod_name: "ALLBET", prod_type_name: 'LIVE CASINO' },
    // { sr: 28, prod_code: '20', prod_type: '1', name: "KING855", prod_name: "KING855", prod_type_name: 'LIVE CASINO' },

    // { sr: 29, prod_code: '70', prod_type: '1', name: "WM CASINO", prod_name: "WM CASINO", prod_type_name: 'LIVE CASINO' },
    // { sr: 30, prod_code: '19', prod_type: '1', name: "DREAM GAMING", prod_name: "DREAM GAMING", prod_type_name: 'LIVE CASINO' },
    // { sr: 20, prod_code: '79', prod_type: '1', name: "BBIN", prod_name: "BBIN", prod_type_name: 'LIVE CASINO,SLOT,SPORTBOOK' },
    // { sr: 4, prod_code: '59', prod_type: '2', name: "JILI", prod_name: "JILI", prod_type_name: 'SLOT,FISH HUNTER' },
    // { sr: 33, prod_code: '151', prod_type: '1', name: "GAMEPLAY", prod_name: "GAMEPLAY", prod_type_name: 'LIVE CASINO,SLOT' },
    // { sr: 23, prod_code: '39', prod_type: '2', name: "CQ9", prod_name: "CQ9", prod_type_name: 'LIVE CASINO,SLOT,FISH HUNTER' },
    // { sr: 17, prod_code: '107', prod_type: '6', name: "FC FISHING", prod_name: "FC FISHING", prod_type_name: 'FISH HUNTER' },
    // { sr: 21, prod_code: '48', prod_type: '2', name: "BLUEPRINT", prod_name: "BLUEPRINT", prod_type_name: 'SLOT' },
    // { sr: 24, prod_code: '126', prod_type: '2', name: "DRAGOON SOFT (DG)", prod_name: "DRAGOON SOFT (DG)", prod_type_name: 'SLOT' },
    // { sr: 26, prod_code: '17', prod_type: '3', name: "M8 SPORT", prod_name: "M8 SPORT", prod_type_name: 'SPORTBOOK' },
    // { sr: 31, prod_code: '27', prod_type: '2', name: "918KISS H5", prod_name: "918KISS H5", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '110', prod_type: '2', name: "3WIN8", prod_name: "3WIN8", prod_type_name: 'SLOT' },
    // { sr: 27, prod_code: '11', prod_type: '2', name: "ACE333", prod_name: "ACE333", prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Money Rocket", prod_name: "KINGMAKER", game_code: 'KM-TABLE-041', prod_type_name: 'SLOT' },
    // { name: "Ludo", prod_name: "Ludo", prod_type_name: 'Ludo', isBig: true },
    { sr: 13, prod_code: '1006', prod_type: '1', name: "Dream-Catcher", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', name: "Lightning-Roulette", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', name: "Coin-flip", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', name: "Mega-Ball", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', name: "Monopoly", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', name: "Crazy-Time", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    // { sr: 26, prod_code: '87', prod_type: '3', name: "BTI", prod_name: "BTI", prod_type_name: 'SPORTBOOK', isBig: true },
    // { sr: 4, prod_code: '59', prod_type: '2', name: "Rummy", prod_name: "JILI", game_code: 'JILI-TABLE-004', prod_type_name: 'SLOT,FISH HUNTER' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "HOUND RACING", prod_name: "KINGMAKER", game_code: 'KM-TABLE-055', prod_type_name: 'SLOT' },




  ]
  awcCasinoList_palki = [
    { sr: 9, prod_code: '117', prod_type: '2', name: "KINGMAKER", prod_name: "KINGMAKER", prod_type_name: 'SLOT', isBig: true },
    { sr: 2, prod_code: '3', prod_type: '1', name: "SEXY BACCARAT", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO', isBig: true },
    // { sr: 3, prod_code: '6', prod_type: '1', name: "PRAGMATIC", prod_name: "PRAGMATIC", prod_type_name: 'LIVE CASINO,SLOT', isBig: true },
    // { sr: 13, prod_code: '1006', prod_type: '1', name: "EVOLUTION GAMING", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO', isBig: true },
    // { sr: 14, prod_code: '97', prod_type: '1', name: "EBET", prod_name: "EBET", prod_type_name: 'LIVE CASINO', isBig: true },
    // { sr: 11, prod_code: '94', prod_type: '1', name: "VENUS", prod_name: "VENUS", prod_type_name: 'LIVE CASINO', isBig: true },
    // { sr: 33, prod_code: '35', prod_type: '1', name: "MICROGAMING", prod_name: "MICROGAMING", prod_type_name: 'LIVE CASINO,SLOT', isBig: true },
    // { sr: 20, prod_code: '79', prod_type: '1', name: "BBIN", prod_name: "BBIN", prod_type_name: 'LIVE CASINO,SLOT,SPORTBOOK', isBig: true },
    // { name: "CockFight", prod_name: "CockFight", isBig: true },

    { sr: 9, prod_code: '117', prod_type: '2', name: "SCard Poker", prod_name: "KINGMAKER", game_code: 'KM-TABLE-049', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "BACCARAT", prod_name: "KINGMAKER", game_code: 'KM-TABLE-049', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Color Game", prod_name: "KINGMAKER", game_code: 'KM-TABLE-050', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Sicbo", prod_name: "KINGMAKER", game_code: 'KM-TABLE-015', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "7Up 7Down", prod_name: "KINGMAKER", game_code: 'KM-TABLE-028', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Coin Toss", prod_name: "KINGMAKER", game_code: 'KM-TABLE-036', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Card Hilow", prod_name: "KINGMAKER", game_code: 'KM-TABLE-037', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "32 Cards", prod_name: "KINGMAKER", game_code: 'KM-TABLE-039', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Card Matka", prod_name: "KINGMAKER", game_code: 'KM-TABLE-021', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Number Matka", prod_name: "KINGMAKER", game_code: 'KM-TABLE-048', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Andar Bahar", prod_name: "KINGMAKER", game_code: 'KM-TABLE-032', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "BlackJack", prod_name: "KINGMAKER", game_code: 'KM-TABLE-038', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Mine Sheeper", prod_name: "KINGMAKER", game_code: 'KM-TABLE-042', prod_type_name: 'SLOT' },
    { sr: 9, prod_code: '117', prod_type: '2', name: "European Roulette", prod_name: "KINGMAKER", game_code: 'KM-TABLE-027', prod_type_name: 'SLOT', },
    { sr: 9, prod_code: '117', prod_type: '2', name: "Pok Deng", prod_name: "KINGMAKER", game_code: 'KM-TABLE-034', prod_type_name: 'SLOT', },

    // { sr: 10, prod_code: '5', prod_type: '1', name: "BIG GAMING", prod_name: "BIG GAMING", prod_type_name: 'LIVE CASINO,SLOT,LOTTO,CARD AND BOARD,FISH HUNTER' },
    // { sr: 12, prod_code: '146', prod_type: '5', name: "1G Poker", prod_name: "1G Poker", prod_type_name: 'LIVE CASINO,CARD AND BOARD' },
    // { sr: 15, prod_code: '7', prod_type: '1', name: "ALLBET", prod_name: "ALLBET", prod_type_name: 'LIVE CASINO' },
    // { sr: 28, prod_code: '20', prod_type: '1', name: "KING855", prod_name: "KING855", prod_type_name: 'LIVE CASINO' },
    // { sr: 29, prod_code: '70', prod_type: '1', name: "WM CASINO", prod_name: "WM CASINO", prod_type_name: 'LIVE CASINO' },
    // { sr: 30, prod_code: '19', prod_type: '1', name: "DREAM GAMING", prod_name: "DREAM GAMING", prod_type_name: 'LIVE CASINO' },
    // { sr: 33, prod_code: '151', prod_type: '1', name: "GAMEPLAY", prod_name: "GAMEPLAY", prod_type_name: 'LIVE CASINO,SLOT' },
    // { sr: 23, prod_code: '39', prod_type: '2', name: "CQ9", prod_name: "CQ9", prod_type_name: 'LIVE CASINO,SLOT,FISH HUNTER' },
    // { sr: 21, prod_code: '48', prod_type: '2', name: "BLUEPRINT", prod_name: "BLUEPRINT", prod_type_name: 'SLOT' },
    // { sr: 24, prod_code: '126', prod_type: '2', name: "DRAGOON SOFT (DG)", prod_name: "DRAGOON SOFT (DG)", prod_type_name: 'SLOT' },
    // { sr: 26, prod_code: '17', prod_type: '3', name: "M8 SPORT", prod_name: "M8 SPORT", prod_type_name: 'SPORTBOOK' },
    // { sr: 31, prod_code: '27', prod_type: '2', name: "918KISS H5", prod_name: "918KISS H5", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '110', prod_type: '2', name: "3WIN8", prod_name: "3WIN8", prod_type_name: 'SLOT' },
    // { sr: 27, prod_code: '11', prod_type: '2', name: "ACE333", prod_name: "ACE333", prod_type_name: 'SLOT' },
    // { sr: 1, prod_code: '41', prod_type: '2', name: "JDB", prod_name: "JDB", prod_type_name: 'SLOT,FISH HUNTER' },
    // { sr: 17, prod_code: '107', prod_type: '6', name: "FC FISHING", prod_name: "FC FISHING", prod_type_name: 'FISH HUNTER' },
    // { sr: 4, prod_code: '59', prod_type: '2', name: "JILI", prod_name: "JILI", prod_type_name: 'SLOT,FISH HUNTER' },
    // { sr: 4, prod_code: '107', prod_type: '2', name: "Star hunter", prod_name: "Star hunter", prod_type_name: 'FISH HUNTER' },
    // { sr: 4, prod_code: '107', prod_type: '2', name: "Monkey King Fishing", prod_name: "Monkey King Fishing", prod_type_name: 'FISH HUNTER' },
    // { sr: 4, prod_code: '107', prod_type: '2', name: "Fierce Fishing", prod_name: "Fierce Fishing", prod_type_name: 'FISH HUNTER' },
    // { sr: 4, prod_code: '107', prod_type: '2', name: "Bao Chuan fishing", prod_name: "Bao Chuan fishing", prod_type_name: 'FISH HUNTER' },

  ]
  awcCasinoList_gamex = [
    // { name: "Ludo", prod_name: "Ludo", prod_type_name: 'Ludo', isBig: true },
    // { sr: 2, prod_code: '3', prod_type: '1', name: "AE Sexy", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO' },
    // { name: "Royalgaming", prod_name: "Royalgaming" },
    // { sr: 13, prod_code: '1006', prod_type: '1', name: "EVOLUTION GAMING", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    // { sr: 3, prod_code: '6', prod_type: '1', name: "PRAGMATIC", prod_name: "PRAGMATIC", prod_type_name: 'LIVE CASINO,SLOT' },
    // { sr: 7, prod_code: '93', prod_type: '1', name: "EZUGI", prod_name: "EZUGI", prod_type_name: 'LIVE CASINO' },
    // { name: "Betgames.tv", prod_name: "Betgames.tv" },
    // { sr: 14, prod_code: '97', prod_type: '1', name: "EBET", prod_name: "EBET", prod_type_name: 'LIVE CASINO' },
    // { name: "One Touch", prod_name: "One Touch" },
    // { name: "Super Spade", prod_name: "Super Spade" },
    // { name: "Microgaming", prod_name: "Microgaming", isBig: true },
    // { name: "Mine Sweeper", prod_name: "Mine Sweeper" },
    // { sr: 9, prod_code: '117', prod_type: '2', name: "Blackjack", prod_name: "KINGMAKER", game_code: 'KM-TABLE-038', prod_type_name: 'SLOT', },
    // { sr: 9, prod_code: '117', prod_type: '2', name: "32 CARDS", prod_name: "KINGMAKER", game_code: 'KM-TABLE-039', prod_type_name: 'SLOT', },
    // { sr: 9, prod_code: '117', prod_type: '2', name: "Andar bahar", prod_name: "KINGMAKER", game_code: 'KM-TABLE-032', prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '117', prod_type: '2', name: "Sicbo", prod_name: "KINGMAKER", game_code: 'KM-TABLE-015', prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '117', prod_type: '2', name: "7 up 7 down", prod_name: "KINGMAKER", game_code: 'KM-TABLE-028', prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '117', prod_type: '2', name: "Coin Toss", prod_name: "KINGMAKER", game_code: 'KM-TABLE-036', prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '117', prod_type: '2', name: "Card Matka", prod_name: "KINGMAKER", game_code: 'KM-TABLE-022', prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '117', prod_type: '2', name: "Number Matka", prod_name: "KINGMAKER", game_code: 'KM-TABLE-021', prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '117', prod_type: '2', name: "European Roulette", prod_name: "KINGMAKER", game_code: 'KM-TABLE-027', prod_type_name: 'SLOT', },
    // { sr: 9, prod_code: '117', prod_type: '2', name: "KINGMAKER BACCARAT", prod_name: "KINGMAKER", game_code: 'KM-TABLE-049', prod_type_name: 'SLOT' },
    // { sr: 9, prod_code: '117', prod_type: '2', name: "Pok Deng", prod_name: "KINGMAKER", game_code: 'KM-TABLE-034', prod_type_name: 'SLOT', },
    // { sr: 9, prod_code: '117', prod_type: '2', name: "CARDS HILO", prod_name: "KINGMAKER", game_code: 'KM-TABLE-049', prod_type_name: 'SLOT' },

    // { sr: 10, prod_code: '5', prod_type: '1', name: "BIG GAMING", prod_name: "BIG GAMING", prod_type_name: 'LIVE CASINO,SLOT,LOTTO,CARD AND BOARD,FISH HUNTER' },
    // { sr: 11, prod_code: '94', prod_type: '1', name: "VENUS", prod_name: "VENUS", prod_type_name: 'LIVE CASINO' },
    // { sr: 1, prod_code: '41', prod_type: '2', name: "JDB", prod_name: "JDB", prod_type_name: 'SLOT,FISH HUNTER' },
    // { sr: 12, prod_code: '146', prod_type: '5', name: "1G Poker", prod_name: "1G Poker", prod_type_name: 'LIVE CASINO,CARD AND BOARD' },
    // { sr: 15, prod_code: '7', prod_type: '1', name: "ALLBET", prod_name: "ALLBET", prod_type_name: 'LIVE CASINO' },
    // { sr: 28, prod_code: '20', prod_type: '1', name: "KING855", prod_name: "KING855", prod_type_name: 'LIVE CASINO' },

    // { sr: 29, prod_code: '70', prod_type: '1', name: "WM CASINO", prod_name: "WM CASINO", prod_type_name: 'LIVE CASINO' },
    // { sr: 30, prod_code: '19', prod_type: '1', name: "DREAM GAMING", prod_name: "DREAM GAMING", prod_type_name: 'LIVE CASINO' },
    // { sr: 20, prod_code: '79', prod_type: '1', name: "BBIN", prod_name: "BBIN", prod_type_name: 'LIVE CASINO,SLOT,SPORTBOOK' },
    // { sr: 4, prod_code: '59', prod_type: '2', name: "JILI", prod_name: "JILI", prod_type_name: 'SLOT,FISH HUNTER' },
    // { sr: 33, prod_code: '151', prod_type: '1', name: "GAMEPLAY", prod_name: "GAMEPLAY", prod_type_name: 'LIVE CASINO,SLOT' },

    // { sr: 23, prod_code: '39', prod_type: '2', name: "CQ9", prod_name: "CQ9", prod_type_name: 'LIVE CASINO,SLOT,FISH HUNTER' },
    // { sr: 17, prod_code: '107', prod_type: '6', name: "FC FISHING", prod_name: "FC FISHING", prod_type_name: 'FISH HUNTER' },
    // { sr: 21, prod_code: '48', prod_type: '2', name: "BLUEPRINT", prod_name: "BLUEPRINT", prod_type_name: 'SLOT' },
    // { sr: 24, prod_code: '126', prod_type: '2', name: "DRAGOON SOFT (DG)", prod_name: "DRAGOON SOFT (DG)", prod_type_name: 'SLOT' },
    // { sr: 26, prod_code: '17', prod_type: '3', name: "M8 SPORT", prod_name: "M8 SPORT", prod_type_name: 'SPORTBOOK' },
    // { sr: 31, prod_code: '27', prod_type: '2', name: "918KISS H5", prod_name: "918KISS H5", prod_type_name: 'SLOT' },
    // { sr: 33, prod_code: '110', prod_type: '2', name: "3WIN8", prod_name: "3WIN8", prod_type_name: 'SLOT' },
    // { sr: 27, prod_code: '11', prod_type: '2', name: "ACE333", prod_name: "ACE333", prod_type_name: 'SLOT' },
  ]

  //crichome//
  cricbuzzerawcList_withoutlog = [
    { sr: 2, prod_code: '3', prod_type: '1', name: "AE Sexy", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', name: "EVOLUTION GAMING", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },

  ]
  cricbuzzerawcList_withoutlog1 = [
    { sr: 7, prod_code: '93', prod_type: '1', name: "EZUGI", prod_name: "EZUGI", prod_type_name: 'LIVE CASINO' },
    { sr: 9, prod_code: '3', prod_type: '1', name: "SEXY BACCARAT", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO' },
    // { sr: 3, prod_code: '6', prod_type: '1', name: "Pragmatic Play", prod_name: "PRAGMATIC", prod_type_name: 'LIVE CASINO,SLOT' },
    { sr: 29, prod_code: '70', prod_type: '1', name: "Sexy Dragon Tiger", prod_name: "WM CASINO", prod_type_name: 'LIVE CASINO' },
  ]
  cricbuzzerawcList_withoutlog2 = [
    { sr: 14, prod_code: '97', prod_type: '1', name: "EBET", prod_name: "EBET", prod_type_name: 'LIVE CASINO' },
    { sr: 9, prod_code: '7', prod_type: '1', name: "ALLBET", prod_name: "ALLBET", prod_type_name: 'LIVE CASINO' },
    { sr: 20, prod_code: '79', prod_type: '1', name: "BBIN", prod_name: "BBIN", prod_type_name: 'LIVE CASINO,SLOT,SPORTBOOK' },
    { sr: 11, prod_code: '94', prod_type: '1', name: "VENUS", prod_name: "VENUS", prod_type_name: 'LIVE CASINO' },
    { sr: 9, prod_code: '117', clsname: 'img-7-up-7-down', prod_type: '2', name: "7 up 7 down", prod_name: "KINGMAKER", game_code: 'KM-TABLE-028', prod_type_name: 'SLOT', eventTypeId: 10 },
    { name: "banner_horse", prod_name: "Horse Racing", prod_type_name: 'Horse Racing', isBig: true, isSport: true, eventTypeId: 7 },
    { sr: 26, prod_code: '17', prod_type: '3', name: "Sportbook", prod_name: "M8 SPORT", prod_type_name: 'SPORTBOOK', isBig: true },
  ]
  cricbuzzerawcList_OTHER = [
    { sr: 2, prod_code: '3', prod_type: '1', name: "AE Sexy", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO' },
    { sr: 13, prod_code: '1006', prod_type: '1', name: "EVOLUTION GAMING", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { name: "Eura", prod_name: "Aura Gaming", prod_type_name: 'Horse Racing', isSport: true, eventTypeId: 1 },
    { name: "poker", prod_name: "Pokee", prod_type_name: 'POker', isSport: true, eventTypeId: 9, isBig: false },
    { name: "SN1", prod_name: "Supernowa", prod_type_name: 'Horse Racing', isSport: true, eventTypeId: 2, isBig: true },
    { name: "banner_sports", prod_name: "Sports", prod_type_name: 'Horse Racing', isSport: true, eventTypeId: 3 },
    { name: "DIAMONDCASINO", prod_name: "Diamond Casino", prod_type_name: 'Horse Racing', isSport: true, eventTypeId: 4 },
    { sr: 7, prod_code: '93', prod_type: '1', name: "EZUGI", prod_name: "EZUGI", prod_type_name: 'LIVE CASINO' },
    // { sr: 3, prod_code: '6', prod_type: '1', name: "Pragmatic Play", prod_name: "PRAGMATIC", prod_type_name: 'LIVE CASINO,SLOT' },
    { name: "slot", prod_name: "Slot Casino", prod_type_name: 'Horse Racing', isSport: true, eventTypeId: 5 },
    { sr: 11, prod_code: '94', prod_type: '1', name: "VENUS", prod_name: "VENUS", prod_type_name: 'LIVE CASINO' },
    { name: "banner_horse", prod_name: "Horse Racing", prod_type_name: 'Horse Racing', isBig: true, isSport: true, eventTypeId: 7 },
  ]
  cricbuzzerawcList_VND = [
    { sr: 13, prod_code: '1006', prod_type: '1', name: "EVOLUTION GAMING", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
    { name: "Eura", prod_name: "Aura Gaming", prod_type_name: 'Horse Racing', isSport: true, eventTypeId: 1 },
    { name: "poker", prod_name: "Pokee", prod_type_name: 'POker', isSport: true, eventTypeId: 9, isBig: false },
    { name: "SN", prod_name: "Supernowa", prod_type_name: 'Horse Racing', isSport: true, eventTypeId: 2, isBig: false },
    { name: "banner_sports", prod_name: "Sports", prod_type_name: 'Horse Racing', isSport: true, eventTypeId: 3 },
    { name: "DIAMONDCASINO", prod_name: "Diamond Casino", prod_type_name: 'Horse Racing', isSport: true, eventTypeId: 4 },
    { sr: 9, prod_code: '3', prod_type: '1', name: "SEXY BACCARAT", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO' },
    { sr: 29, prod_code: '70', prod_type: '1', name: "Sexy Dragon Tiger", prod_name: "WM CASINO", prod_type_name: 'LIVE CASINO' },
    { name: "slot", prod_name: "Slot Casino", prod_type_name: 'Horse Racing', isSport: true, eventTypeId: 5 },
    { sr: 14, prod_code: '97', prod_type: '1', name: "EBET", prod_name: "EBET", prod_type_name: 'LIVE CASINO' },
    { sr: 9, prod_code: '7', prod_type: '1', name: "ALLBET", prod_name: "ALLBET", prod_type_name: 'LIVE CASINO' },
    { sr: 20, prod_code: '79', prod_type: '1', name: "BBIN", prod_name: "BBIN", prod_type_name: 'LIVE CASINO,SLOT,SPORTBOOK' },
    { sr: 9, prod_code: '117', clsname: 'img-7-up-7-down', prod_type: '2', name: "7 up 7 down", prod_name: "KINGMAKER", game_code: 'KM-TABLE-028', prod_type_name: 'SLOT' },
    { name: "banner_horse", prod_name: "Horse Racing", prod_type_name: 'Horse Racing', isBig: true, isSport: true, eventTypeId: 7 },
    { sr: 26, prod_code: '17', prod_type: '3', name: "Sportbook", prod_name: "M8 SPORT", prod_type_name: 'SPORTBOOK', isBig: true },
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
    if (this.isxpg) {
      this.cricbuzzerawcList_VND = [
        { name: "banner_sports", prod_name: "Sports", prod_type_name: 'Horse Racing', isSport: true, eventTypeId: 3 },
        { sr: 13, prod_code: '1006', prod_type: '1', name: "EVOLUTION GAMING", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
        { name: "Eura", prod_name: "Aura Gaming", prod_type_name: 'Horse Racing', isSport: true, eventTypeId: 1 },
        { name: "SN", prod_name: "Supernowa", prod_type_name: 'Horse Racing', isSport: true, eventTypeId: 2, isBig: true },
        { name: "DIAMONDCASINO", prod_name: "Diamond Casino", prod_type_name: 'Horse Racing', isSport: true, eventTypeId: 4 },
        { sr: 9, prod_code: '3', prod_type: '1', name: "SEXY BACCARAT", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO' },
        { sr: 29, prod_code: '70', prod_type: '1', name: "Sexy Dragon Tiger", prod_name: "WM CASINO", prod_type_name: 'LIVE CASINO' },
        { name: "slot", prod_name: "Slot Casino", prod_type_name: 'Horse Racing', isSport: true, eventTypeId: 5 },
        { sr: 14, prod_code: '97', prod_type: '1', name: "EBET", prod_name: "EBET", prod_type_name: 'LIVE CASINO' },
        { sr: 9, prod_code: '7', prod_type: '1', name: "ALLBET", prod_name: "ALLBET", prod_type_name: 'LIVE CASINO' },
        { sr: 20, prod_code: '79', prod_type: '1', name: "BBIN", prod_name: "BBIN", prod_type_name: 'LIVE CASINO,SLOT,SPORTBOOK' },
        { sr: 9, prod_code: '117', clsname: 'img-7-up-7-down', prod_type: '2', name: "7 up 7 down", prod_name: "KINGMAKER", game_code: 'KM-TABLE-028', prod_type_name: 'SLOT' },
        { name: "banner_horse", prod_name: "Horse Racing", prod_type_name: 'Horse Racing', isBig: true, isSport: true, eventTypeId: 7 },
        { sr: 26, prod_code: '17', prod_type: '3', name: "Sportbook", prod_name: "M8 SPORT", prod_type_name: 'SPORTBOOK', isBig: true },
      ],
        this.cricbuzzerawcList_OTHER = [
          { name: "banner_sports", prod_name: "Sports", prod_type_name: 'Horse Racing', isSport: true, eventTypeId: 3 },
          { sr: 13, prod_code: '1006', prod_type: '1', name: "EVOLUTION GAMING", prod_name: "EVOLUTION GAMING", prod_type_name: 'LIVE CASINO' },
          { sr: 2, prod_code: '3', prod_type: '1', name: "AE Sexy", prod_name: "SEXY BACCARAT", prod_type_name: 'LIVE CASINO' },
          { name: "Eura", prod_name: "Aura Gaming", prod_type_name: 'Horse Racing', isSport: true, eventTypeId: 1 },
          { name: "SN", prod_name: "Supernowa", prod_type_name: 'Horse Racing', isSport: true, eventTypeId: 2, isBig: true },
          { name: "DIAMONDCASINO", prod_name: "Diamond Casino", prod_type_name: 'Horse Racing', isSport: true, eventTypeId: 4 },
          { sr: 7, prod_code: '93', prod_type: '1', name: "EZUGI", prod_name: "EZUGI", prod_type_name: 'LIVE CASINO' },
          // { sr: 3, prod_code: '6', prod_type: '1', name: "Pragmatic Play", prod_name: "PRAGMATIC", prod_type_name: 'LIVE CASINO,SLOT' },
          { name: "slot", prod_name: "Slot Casino", prod_type_name: 'Horse Racing', isSport: true, eventTypeId: 5 },
          { sr: 11, prod_code: '94', prod_type: '1', name: "VENUS", prod_name: "VENUS", prod_type_name: 'LIVE CASINO' },
          { sr: 9, prod_code: '117', prod_type: '2', name: "7 up 7 down", prod_name: "KINGMAKER", prod_type_name: 'SLOT' },
          { name: "banner_horse", prod_name: "Horse Racing", prod_type_name: 'Horse Racing', isBig: true, isSport: true, eventTypeId: 7 },
        ]
    }
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

        // this.listCasinoTable();
        // if(this.SNcasinoList){
        //   this.listProviders();
        // }
        // this.UserDescription();
        // this.listCasinoProduct();

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
    // if (this.isxpg) {
    //   this.casinoapiService.supernowaGameAssetsList(this.providerCode1).subscribe((resp: any) => {
    //     // console.log(resp);
    //     if (resp.status.code == "SUCCESS") {
    //       this.SNcasinoList = resp.games;
    //     }
    //   })
    // }


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
        let awcCasinoList_Vnd = [];
        let awcCasinoList_Vnd_test = [];
        let awcCasinoList_Vnd_jee365 = []
        let cricbuzzerawcList_Vnd = [];

        let awcCasinoList = [];
        let cricbuzzerawcList_other = [];

        let awcCasinoListTest = [];

        let awcCasinoList_bdbet = [];
        let awcCasinoList_nayaludis = [];
        let awcCasinoLists_baji = [];
        let awcCasinoLists_runx = [];
        let awcCasinoList_worldexch = [];
        let awcCasinoList_palki = [];


        this.awcCasinoList_Vnd.forEach(element2 => {
          resp.result.forEach((element, index) => {

            if (element.product == element2.prod_name || (!element2.prod_code && index == 0)) {
              awcCasinoList_Vnd.push(element2);
            }
          });
        });
        this.awcCasinoList_Vnd_jee365.forEach(element2 => {
          resp.result.forEach((element, index) => {

            if (element.product == element2.prod_name || (!element2.prod_code && index == 0)) {
              awcCasinoList_Vnd_jee365.push(element2);
            }
          });
        });
        this.awcCasinoList_Vnd_test.forEach(element2 => {
          resp.result.forEach((element, index) => {

            if (element.product == element2.prod_name || (!element2.prod_code && index == 0)) {
              awcCasinoList_Vnd_test.push(element2);
            }
          });
        });
        this.cricbuzzerawcList_Vnd.forEach(element2 => {
          resp.result.forEach((element, index) => {

            if (element.product == element2.prod_name || (!element2.prod_code && index == 0)) {
              cricbuzzerawcList_Vnd.push(element2);
            }
          });
        });

        this.awcCasinoList.forEach(element2 => {
          resp.result.forEach((element, index) => {

            if (element.product == element2.prod_name || (!element2.prod_code && index == 0)) {
              awcCasinoList.push(element2);
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
        this.awcCasinoListTest.forEach(element2 => {
          resp.result.forEach((element, index) => {

            if (element.product == element2.prod_name || (!element2.prod_code && index == 0)) {
              awcCasinoListTest.push(element2);
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
        this.awcCasinoList_bdbet = [];
        this.awcCasinoList_nayaludis.forEach(element2 => {
          resp.result.forEach((element, index) => {

            if (element.product == element2.prod_name || (!element2.prod_code && index == 0)) {
              awcCasinoList_nayaludis.push(element2);
            }
          });
        });
        this.awcCasinoLists_baji.forEach(element2 => {
          resp.result.forEach((element, index) => {

            if (element.product == element2.prod_name || (!element2.prod_code && index == 0)) {
              awcCasinoLists_baji.push(element2);
            }
          });
        });
        this.awcCasinoLists_runx.forEach(element2 => {
          resp.result.forEach((element, index) => {

            if (element.product == element2.prod_name || (!element2.prod_code && index == 0)) {
              awcCasinoLists_runx.push(element2);
            }
          });
        });
        this.awcCasinoList_worldexch.forEach(element2 => {
          resp.result.forEach((element, index) => {

            if (element.product == element2.prod_name || (!element2.prod_code && index == 0)) {
              awcCasinoList_worldexch.push(element2);
            }
          });
        });
        this.awcCasinoList_palki.forEach(element2 => {
          resp.result.forEach((element, index) => {

            if (element.product == element2.prod_name || (!element2.prod_code && index == 0)) {
              awcCasinoList_palki.push(element2);
            }
          });
        });


        // this.cricbuzzerawcList_withoutlog.forEach(element2 => {
        //   resp.result.forEach((element, index) => {

        //     if (element.product == element2.prod_name || (!element2.prod_code && index == 0)) {
        //       cricbuzzerawcList_withoutlog.push(element2);
        //     }
        //   });
        // });
        // this.cricbuzzerawcList_withoutlog1.forEach(element2 => {
        //   resp.result.forEach((element, index) => {

        //     if (element.product == element2.prod_name || (!element2.prod_code && index == 0)) {
        //       cricbuzzerawcList_withoutlog1.push(element2);
        //     }
        //   });
        // });
        //      this.cricbuzzerawcList_withoutlog2.forEach(element2 => {
        //   resp.result.forEach((element, index) => {

        //     if (element.product == element2.prod_name || (!element2.prod_code && index == 0)) {
        //       cricbuzzerawcList_withoutlog2.push(element2);
        //     }
        //   });
        // });
        // this.cricbuzzerawcList_VND.forEach(element2 => {
        //   resp.result.forEach((element, index) => {

        //     if (element.product == element2.prod_name || (!element2.prod_code && index == 0)) {
        //       cricbuzzerawcList_VND.push(element2);
        //     }
        //   });
        // });
        // this.cricbuzzerawcList_OTHER.forEach(element2 => {
        //   resp.result.forEach((element, index) => {

        //     if (element.product == element2.prod_name || (!element2.prod_code && index == 0)) {
        //       cricbuzzerawcList_OTHER.push(element2);
        //     }
        //   });
        // });

        this.awcCasinoList_Vnd = awcCasinoList_Vnd;
        this.awcCasinoList_Vnd = awcCasinoList_Vnd;
        this.awcCasinoList_Vnd_jee365 = awcCasinoList_Vnd_jee365;
        this.cricbuzzerawcList_Vnd = cricbuzzerawcList_Vnd;

        this.awcCasinoList = awcCasinoList;
        this.cricbuzzerawcList_other = cricbuzzerawcList_other;

        this.awcCasinoListTest = awcCasinoListTest;

        this.awcCasinoList_bdbet = awcCasinoList_bdbet;
        this.awcCasinoList_nayaludis = awcCasinoList_nayaludis;
        this.awcCasinoLists_baji = awcCasinoLists_baji;
        this.awcCasinoLists_runx = awcCasinoLists_runx;
        this.awcCasinoList_worldexch = awcCasinoList_worldexch;
        this.awcCasinoList_palki = awcCasinoList_palki;




        console.log(this.awcCasinoLists_runx)


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
      this.providerListLC.forEach(element2 => {
        resp.result.forEach((element, index) => {
          if (element.providerName == element2.providerName) {
            sn_providerlistLC.push(element2);
          }
        });
      });
      this.providerList9xch.forEach(element2 => {
        resp.result.forEach((element, index) => {
          if (element.providerName == element2.providerName) {
            sn_providerList9xch.push(element2);
          }
        });
      });
      this.providerListbetwinner.forEach(element2 => {
        resp.result.forEach((element, index) => {
          if (element.providerName == element2.providerName) {
            sn_providerListbetwinner.push(element2);
          }
        });
      });
      this.providerListRunbet.forEach(element2 => {
        resp.result.forEach((element, index) => {
          if (element.providerName == element2.providerName) {
            sn_providerListRunbet.push(element2);
          }
        });
      });
      this.providerList = sn_providerlist;
      this.providerListLC = sn_providerlistLC;
      this.providerList9xch = sn_providerList9xch;
      this.providerListbetwinner = sn_providerListbetwinner;
      this.providerListRunbet = sn_providerListRunbet;
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

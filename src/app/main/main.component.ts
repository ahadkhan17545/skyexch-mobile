import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientApiService } from '../services/client-api.service';
import { DataFormatsService } from '../services/data-formats.service';
import { MainService } from '../services/main.service';
import { ScoreService } from '../services/score.service';
import { ShareDataService } from '../services/share-data.service';
import { SportsApiService } from '../services/sports-api.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  siteName = environment.siteName;
  isIcasino: boolean = environment.isIcasino;
  isskybet369: boolean = environment.isskybet369;
  islc247allcondition = environment.islc247allcondition;
  t10 = environment.t10;


  stakeSettingData: any;
  allScoresData: any = [];
  oldListGames = [];

  loader: boolean = true;
  isBannerShow: boolean = true;

  isLogin: boolean = false;

  isGameApiCall = true;
  language: any;
  Alllanguage: any;

  intervalSub;
  Update: any;
  range = "en";
  selectedlang: string;


  constructor(
    private mainService: MainService,
    private clientApi: ClientApiService,
    private sportsAPi: SportsApiService,
    private dfService: DataFormatsService,
    private shareService: ShareDataService,
    private router: Router,
    private tokenService: TokenService,
    private scoreService: ScoreService,
  ) {
    if (this.tokenService.getLanguage()) {
      this.selectedlang = this.tokenService.getLanguage()
      this.selectlanguage(this.selectedlang)
    } else {
      this.selectlanguage('en')
    }

    let seconds = 300;

    if (this.tokenService.getToken()) {
      this.isLogin = true;
      seconds = 60;
    }
    let count = 0;
    this.mainService.apis$.subscribe((res) => {
      // console.log(res);
      this.sportWise();
      this.listCasinoTable();
      this.GetBetStakeSetting();
      this.intervalSub = setInterval(() => {
        if (count == 3) {
          this.oldListGames = [];
          count = 0;
        }
        this.sportWise();
        count++;
      }, seconds * 1000);
    });

    // console.log(window)


    if (this.router.url == '/home' || this.router.url == '/dash' || this.router.url == '/highlight' || this.router.url == '/sports') {
      this.isBannerShow = true;
    }
    else {
      this.isBannerShow = false;
    }
    // window.scrollTo(0, 0);

    this.router.events.subscribe((event: NavigationStart) => {
      window.scrollTo(0, 0);
      if (event instanceof NavigationStart) {
        // console.log(event.url)
        $('#page_loading').css('display', 'flex');

        if (event.url == '/home' || event.url == '/dash' || event.url == '/highlight' || event.url == '/sports') {
          this.isBannerShow = true;
        }
        else {
          this.isBannerShow = false;
        }
      }
    });
  }

  ngOnInit(): void {
    this.getlanguages();
  }
  getlanguages() {
    this.shareService._lagugageSub$.subscribe(data => {
      if (data != null) {
        this.Update = data
      }
      if (this.Update?.myaccount == "আমার অ্যাকাউন্ট") {
        $("#accountPopup").css('font-size', '9px');
      } else {
        $("#accountPopup").css('font-size', 'inherit');
      }
      // console.log(this.Update);

    })
  }
  selectlanguage(newValue) {
    this.range = newValue;
    this.tokenService.setLanguage(this.range);
    this.getLanguage();
  }
  getLanguage() {
    let L = []
    this.clientApi.getlanguage().subscribe((resp: any) => {
      this.language = resp
      this.language.forEach(data => {
        if (data.lang == this.range) {
          L.push(data)
        }
        this.Alllanguage = L
        // console.log(this.Alllanguage);
        this.shareService.sharelanguage(this.Alllanguage[0]);
      })
    })
  }

  GetBetStakeSetting() {
    let accountInfo = this.tokenService.getUserInfo();
    if (!accountInfo) {
      this.stakeSettingData = [100, 500, 1000, 5000, 10000, 20000, 50000, 100000, 100, 500, 1000, 5000];
      this.shareService.shareStakeButton(this.stakeSettingData);
      this.getProfile();
      return;
    }

    if (accountInfo.stakeSetting) {
      this.stakeSettingData = accountInfo.stakeSetting.split(',');
    } else {
      this.stakeSettingData = [100, 500, 1000, 5000, 10000, 20000, 50000, 100000, 100, 500, 1000, 5000];
    }
    this.stakeSettingData.forEach((element, index) => {
      this.stakeSettingData[index] = parseInt(element);
    });
    this.shareService.shareStakeButton(this.stakeSettingData);
  }

  getProfile() {
    if (!this.isLogin) {
      return;
    }
    this.clientApi.profile().subscribe((resp: any) => {
      if (resp.result) {
        if (this.siteName == "betfair21" || this.siteName == "betswiz") {
          resp.result[0]['currencyCode'] = "";
        }
        this.tokenService.setUserInfo(resp.result[0]);

        window.location.href = window.location.origin + window.location.pathname;

      }
    })
  }

  listCasinoTable() {
    if (!this.isLogin) {
      return;
    }
    if (this.isIcasino) {
      return;
    }
    this.clientApi.listCasinoTable().subscribe((resp: any) => {
      if (resp.result) {
        this.shareService.shareCasinoList(resp.result[0].tables);
      }
    })
  }

  sportWise() {
    if (!this.isGameApiCall) {
      return;
    }
    this.isGameApiCall = false;

    let url = '?sport=&inplay=0';
    if (this.oldListGames.length > 0) {
      url = '?sport=&inplay=1';
    }

    this.clientApi.listGames(url).subscribe((resp: any) => {
      if (resp.result) {
        if (this.oldListGames.length == 0) {
          this.oldListGames = resp.result;
        }
        this.oldListGames = this.oldListGames.filter((event) => {
          return event.isInPlay != 1;
        });

        resp.result = resp.result.concat(this.oldListGames);

        if (resp.result) {
          resp.result.forEach((item: any) => {

            if (item.markets[0]) {
              item.markets.forEach((market: any) => {
                market['isMulti'] = false;
              });
            }


            if (item.eventId == 31345701) {
              item.markets.push({ betDelay: 0, gameId: 430719080, isInPlay: 1, marketId: '1.145970106', marketName: 'Winner 2022', open: 1, status: 1 })
            }
            if (item.markets[0]) {
              item['marketId'] = item.markets[0].marketId;
            }
            if (item.sportsName == "Virtual Cricket") {
              item.sportsName = "cricket";
              item.sportId = "4";
              item.eventTypeId = "4";
              item['isVirtual'] = true;
              item['isBm'] = true;
            }
            if (item.sportsName == "Kabaddi") {
              item['isKabaddi'] = true;
              item['isBm'] = true;
              // item['isFancy'] = true;
            }
            if (item.sportsName == "Election") {
              item['isKabaddi'] = true;
              // item['isBm'] = true;
              item['isFancy'] = true;
            }


            if (item.matchOddsInplay == 0) {
              item.matchOddsInplay = true;
            } else {
              item.matchOddsInplay = false;
            }
            if (item.tiedMatchInplay == 0) {
              item.tiedMatchInplay = true;
            } else {
              item.tiedMatchInplay = false;
            }

            if (item.eventName.indexOf(' SRL ') > -1) {
              item['isSrl'] = true;
            }
            // if (item.eventId.toString().length > 8 && (this.islc247allcondition)) {
            //   item['isManualEvent'] = true;
            // }
            if (item.eventId.toString().length > 8) {
              item['isManualEvent'] = true;
            }

            if (item.eventName.indexOf(' T10 v ') > -1) {
              item.competitionId = "505540854";
              item.competitionName = "T10 Virtual Cricket League";
              item['isStream'] = true;
            }
            if (this.siteName == 'betswiz' && item.eventTypeId != 4) { // remove  tennis and soccer premium flag
              item.isPremium = false;
            }
            if (item.markets[0] && this.siteName == 'mash247') {
              item.markets = item.markets.filter(function (market) {
                return market.marketName != "Tied Match";
              });
            }
            if (item.markets[0] && !this.islc247allcondition) {
              item.markets = item.markets.filter(function (market) {
                return market.marketName != "Over/Under 3.5 Goals";
              });
            }
            if (item.markets[0] && this.siteName == 'lc247') {
              item.markets = item.markets.filter(function (market) {
                return market.marketName != "To Win the Toss";
              });
            }
            if (item.markets[0] && !this.islc247allcondition && this.siteName != 'cricbuzzer' && this.siteName != 'cricexch') {
              item.markets = item.markets.filter(function (market) {
                return market.marketName != "Draw no Bet";
              });
            }
            this.allScoresData.forEach((scoreData: any) => {
              if (item.eventId == scoreData.eventId) {
                item['score'] = scoreData;
              }
            });
          })
        }

        if (this.siteName == 'betswiz' || this.siteName == 'mash247') {
          resp.result = resp.result.filter(item => {
            return item.sportsName.indexOf('tennis') == -1;
          });
        }
        if (this.siteName == 'runx' || this.siteName == 'sports365' || this.siteName == 'rajbet' || this.siteName == 'vellki' || this.siteName == 'betwinners') {// remove SRL matches
          resp.result = resp.result.filter(item => {
            return item.eventName.indexOf(' SRL ') == -1;
          });
        }

        // remove Esports matches
        resp.result = resp.result.filter(item => {
          return item.sportsName.indexOf('Esports') == -1;
        });

        if (this.t10) {
          resp.result = resp.result.filter(item => {
            return item.eventName.indexOf(' T10 v ') == -1;
          });
        }
        // if (this.siteName == 'lc247') { // remove all tennis match dont have premium
        //   resp.result = resp.result.filter(item => {
        //     return (!item.isPremium && item.eventTypeId != 2) || (item.isPremium);
        //   });
        // }

        // if (this.siteName != 'cricbuzzer') { //Remove new all sport
        //   resp.result = resp.result.filter(item => {
        //     return parseInt(item.eventTypeId) < 100 && parseInt(item.eventTypeId) !=6;
        //   });
        // }
        // if (this.isIcasino || this.isskybet369 || (this.siteName != 'cricbuzzer' && this.siteName != 'skyexch' && this.siteName != 'skyexch8'  && this.siteName != 'skyproexchange'  && this.siteName != 'jeesky7' && this.siteName != 'jee365')) { //Remove new all sport for icasino
        if ((this.siteName != 'cricbuzzer')) { //Remove new all sport for icasino
          resp.result = resp.result.filter(item => {
            return parseInt(item.eventTypeId) == 4 || parseInt(item.eventTypeId) == 1 || parseInt(item.eventTypeId) == 2 || parseInt(item.eventTypeId) == 52 || parseInt(item.eventTypeId) == 85;
          });
        }
        // this.getMatchOdds(resp.result);
        this.shareService.shareListGamesData(resp.result);
        this.shareService.shareSportData(this.dfService.getSportDataFormat(resp.result));
        this.getAllScores(resp.result);
        // console.log(this.dfService.getSportDataFormat(resp.result))

      }
      this.isGameApiCall = true;
      this.loader = false;

    }, err => {
      this.isGameApiCall = true;
      $('#page_loading').css('display', 'none');
    });
  }


  getMatchOdds(matches: any[]) {
    var ids: any[] = [];
    matches.forEach((match, index) => {
      if (!match.markets[0]) {
        return;
      }
      if (match.markets[0].marketName == 'Match Odds') {
        ids.push(match.markets[0].marketId);
      }
    });
    if (ids.length) {

      this.sportsAPi.getMatchOdds(4, ids.join(',')).subscribe((resp: any) => {
        // console.log(resp)
        matches.forEach((match: any) => {
          resp.forEach((market: any) => {
            if (match.eventId == market.eventId) {
              match['runners'] = market.runners;
              match['status'] = market.status;
            }
          });
        });
        // this.shareService.shareSportData(this.dfService.getSportDataFormat(matches));
        this.loader = false;
      });
    }
  }

  getAllScores(matches: any[]) {

    if (matches.length > 0) {

      this.scoreService.getAllScore().subscribe((resp: any) => {
        // console.log(resp)
        this.allScoresData = resp;
        matches.forEach((match: any) => {
          resp.forEach((scoreData: any) => {
            if (match.eventId == scoreData.eventId) {
              match['score'] = scoreData;
            }
          });
        });
        this.shareService.shareSportData(this.dfService.getSportDataFormat(matches));
      });
    }
  }

  ngOnDestroy(): void {
    if (this.intervalSub) {
      clearInterval(this.intervalSub);
    }
  }
}

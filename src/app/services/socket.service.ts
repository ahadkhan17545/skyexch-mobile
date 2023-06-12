import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MainService } from './main.service';
import { ShareDataService } from './share-data.service';
import { SportsApiService } from './sports-api.service';
import { TokenService } from './token.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  siteName = environment.siteName;

  // oddsSocketUrl = environment.oddsSocketUrl;
  // racingSocketApi = environment.racingSocketApi;

  private oddsSocketUrl: string;
  private allSportSocketUrl: string;
  private racingSocketApi: string;
  private fSource: string;

  subject$: WebSocket;

  socketTimeOut: boolean = false;
  intervalSub: Subscription;
  timeOutOdds;

  marketIds = '';
  matchId: any;
  isVir: boolean = false;
  isKabaddi: boolean = false;
  isSrl: boolean = false;

  inPlay$ = new Subject();

  matchData: any;

  isLogin: boolean = false;
  isAllSport: boolean = false;

  isOddsPendingApi: boolean = false;
  isFancyPendingApi: boolean = false;
  isSportBookPendingApi: boolean = false;


  constructor(
    private tokenService: TokenService,
    private shareService: ShareDataService,
    private main: MainService,
    private sportApi: SportsApiService,
  ) {
    if (this.tokenService.getToken()) {
      this.isLogin = true;
    }

    if (this.isLogin) {
      this.inPlay$.subscribe((inPlay) => {
        this.startOddsInterval(inPlay == 1 ? 1000 : 3000);
      });
    } else {
      this.inPlay$.subscribe((inPlay) => {
        this.startOddsInterval(inPlay == 1 ? 10000 : 30000);
      });
    }

    this.main.apis2$.subscribe((res) => {
      if (res) {
        this.oddsSocketUrl = res.sportSocketApi;
        this.allSportSocketUrl = res.allSportSocketApi;
        this.racingSocketApi = res.racingSocketApi;
        this.fSource = res.fSource;
      }
    });
  }

  getFSource() {
    return this.fSource;
  }

  startOddsInterval(intervalTime) {

    if (this.intervalSub) {
      this.intervalSub.unsubscribe();
    }
    if (this.matchId) {
      this.getAllApiData();
      this.getSportsBook();
    }
    // console.log(this.matchId)
    this.intervalSub = interval(intervalTime).subscribe(() => {

      if (!this.socketTimeOut && this.matchId) {
        this.getAllApiData();
      }
      this.getSportsBook();
    });
  }


  getAllApiData() {

    if (!this.isVir && !this.isKabaddi && !this.isSrl) {
      // if (this.isLogin && this.matchData.isPremium && this.matchData.eventTypeId == 2 && this.siteName == "lc247") {
      //   return;
      // }

      if (this.isOddsPendingApi) {
        return;
      }
      this.isOddsPendingApi = true;
      this.sportApi.getOddsInplay(this.marketIds, this.isAllSport).subscribe((data: any) => {
        this.shareService.shareOddsData(data);
        this.isOddsPendingApi = false;
        this.isSrl = this.matchData.isSrl;

      }, err => {
        this.isOddsPendingApi = false;
      });
    }


    if ((this.matchData.eventTypeId == 4 || this.isKabaddi) && !this.isSrl) {
      if (this.isFancyPendingApi) {
        return;
      }
      this.isFancyPendingApi = true;

      let fSource;
      if (this.matchData.eventTypeId != 4 || this.isVir) {
        fSource = '0';
      } else {
        fSource = this.fSource;
      }
      this.sportApi.getBmFancy(this.matchId, fSource).subscribe((data: any) => {
        this.shareService.shareOddsData(data);
        this.isFancyPendingApi = false;
      }, err => {
        this.isFancyPendingApi = false;
      });
    }
  }

  getSportsBook() {
    // if (this.matchId && (this.siteName == "cricbuzzer")) {
    if ((this.matchData.eventTypeId == 4 || this.matchData.eventTypeId == 1 || this.matchData.eventTypeId == 2) && this.matchData.isPremium && this.isLogin && !this.isVir && this.siteName != 'betswiz222') {
      if (this.isSportBookPendingApi) {
        return;
      }
      this.isSportBookPendingApi = true;
      this.sportApi.getSportsBook(this.matchId).subscribe((data: any) => {
        if (!data.data && !data.sportsBookMarket) {
          data['sportsBookMarket'] = [];
        }

        data.sportsBookMarket.forEach(sbMarket => {
          let favArray = localStorage.getItem('favourite');

          let favArrays = [];
          if (favArray) {
            favArrays = favArray.split(',');
          }
          let sbIndex = _.indexOf(favArrays, 'premium_' + this.matchId + '_' + sbMarket.id);
          if (sbIndex > -1) {
            sbMarket['isMulti'] = true;
          }
        });

        this.shareService.shareOddsData(data);
        this.isSportBookPendingApi = false;
      }, err => {
        this.isSportBookPendingApi = false;
      });
    }
    // }
  }



  getWebSocketData(match) {

    if (!match) {
      return false;
    }

    // console.log(match)
    this.matchData = match;

    if (!match.isRacing && !match.isVirtual) {
      this.matchId = match.eventId;
      this.isVir = match.isVir;
      this.isKabaddi = match.isKabaddi;
      if (!match.isSrl) {
        this.isSrl = match.isSrl;
      }else{
        this.isSrl=false;
      }

      if ((match.eventTypeId == 4 || match.eventTypeId == 1 || match.eventTypeId == 2)) {
        // if ((match.eventTypeId == 4 || match.eventTypeId == 1 || match.eventTypeId == 2) && match.markets[0]?.marketId.length < 13) {
        this.isAllSport = false;
      } else {
        this.isAllSport = true;
      }

      let ids = match.markets.reduce((acc, c) => [...acc, c.marketId], []);
      this.marketIds = ids.join(',');
      if (this.isLogin) {
        this.startOddsInterval(match.isInPlay == 1 ? 1000 : 5000);
      } else {
        this.startOddsInterval(match.isInPlay == 1 ? 10000 : 50000);
      }

    } else if (match.isVirtual) {
      this.matchId = match.eventId;
      this.socketTimeOut = false;
      this.isVir = match.isVir;
      if (this.isLogin) {
        this.startOddsInterval(match.isInPlay == 1 ? 1000 : 5000);
      } else {
        this.startOddsInterval(match.isInPlay == 1 ? 10000 : 50000);
      }
      return false;
    }

    if (match && match.port > 0) {
      if (this.isLogin && this.matchData.isPremium && this.matchData.eventTypeId == 2 && this.siteName == "lc247") {
        return;
      }

      let socketUrl = this.oddsSocketUrl;
      if (match.isRacing) {
        socketUrl = this.racingSocketApi;
      }
      if (this.isAllSport) {
        socketUrl = this.allSportSocketUrl;
      }
      // console.log('hhh')
      // this.fSource='1';
      var url = `${socketUrl}:${match.port}/${this.isLogin ? '?logged=true&source=' + this.fSource : '?logged=false&source=' + this.fSource}`;
      if (location.protocol === 'https:' && !match.isRacing) {
        url = `${socketUrl}/spport=${match.port}/${this.isLogin ? '?logged=true&source=' + this.fSource : '?logged=false&source=' + this.fSource}`;
      }
      if (location.protocol === 'https:' && match.isRacing) {
        url = `${socketUrl}/hgport=${match.port}/${this.isLogin ? '?logged=true' : '?logged=false'}`;
      }

      if (!this.subject$ || this.subject$.CLOSED) {
        this.subject$ = this.createConnection(url);
        // console.log(this.subject$);

        this.subject$.onopen = ((error: any) => {
          // console.log(`[success]: connected to socket`);
        });
        this.subject$.onmessage = (message: any) => {
          message = JSON.parse(message.data);
          // console.log(message)
          if (!match.isRacing && !match.isVirtual) {
            this.socketTimeOut = true;
            clearTimeout(this.timeOutOdds);
            this.timeOutOdds = setTimeout(() => {
              this.socketTimeOut = false;
            }, match.isInPlay == 1 ? 3000 : 10000);
          }
          this.shareService.shareOddsData(message);
          // console.log(message);
        };
        this.subject$.onerror = ((error: any) => {
          // console.log(`[error]: Error connecting to socket`);
        });
        // this.subject$.onclose = (e) => {
        // console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
        // };
      }
    } else if (!match.isVirtual) {
      this.socketTimeOut = false;

    }
  }

  createConnection(url) {
    return new WebSocket(url);
  }

  closeConnection() {
    this.shareService.shareOddsData(null);
    if (this.subject$ && this.subject$.OPEN) {
      this.subject$.close();
      this.shareService.shareOddsData(null);
      this.matchId = null;
    }
    if (this.intervalSub) {
      this.intervalSub.unsubscribe();
    }
  }
}

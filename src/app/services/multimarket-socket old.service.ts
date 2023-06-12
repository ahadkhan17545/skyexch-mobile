import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subject, Subscription } from 'rxjs';
import { MainService } from './main.service';
import { ShareDataService } from './share-data.service';
import { SportsApiService } from './sports-api.service';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class multiSocketService {

    // oddsSocketUrl = environment.oddsSocketUrl;
    // racingSocketApi = environment.racingSocketApi;

    private oddsSocketUrl: string;
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


    inPlay$ = new Subject();

    matchData: any = [];

    isLogin: boolean = false;

    isOddsPendingApi: boolean = false;
    isFancyPendingApi: boolean = false;


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
        if (this.matchData) {
            this.matchData.forEach(match => {
                this.getAllApiData(match);
            });
        }
        // console.log(this.matchData)
        this.intervalSub = interval(intervalTime).subscribe(() => {

            if (!this.socketTimeOut && this.matchData) {
                this.matchData.forEach(match => {
                    this.getAllApiData(match);
                });
            }
        });
    }


    getAllApiData(match) {

        if (!match.isMulti) {
            return;
        }
        let ids = '';
        if (match.markets) {
            ids = match.markets.reduce((acc, c) => [...acc, c.marketId && c.marketName == "Match Odds" ? c.marketId : c.MarketId], []);
        }

        if (!match.isVir && !match.isKabaddi) {

            // if (this.isOddsPendingApi) {
            //     return;
            // }
            // this.isOddsPendingApi = true;
            this.sportApi.getOddsInplay(ids).subscribe((data: any) => {

                match['oddsData'] = data;
                this.shareService.shareOddsData(match);
                // this.isOddsPendingApi = false;
            }, err => {
                // this.isOddsPendingApi = false;
            });
        }


        // if (match.eventTypeId == 4 || match.isKabaddi) {
        //     // if (this.isFancyPendingApi) {
        //     //     return;
        //     // }
        //     // this.isFancyPendingApi = true;
        //     this.sportApi.getBmFancy(match.eventId).subscribe((data: any) => {
        //         if (data.Fancymarket) {
        //             match['Fancymarket'] = data.Fancymarket;
        //         }
        //         if (data.BMmarket) {
        //             match['BMmarket'] = data.BMmarket;
        //         }
        //         this.shareService.shareOddsData(match);
        //         // this.isFancyPendingApi = false;
        //     }, err => {
        //         // this.isFancyPendingApi = false;
        //     });
        // }
    }



    getWebSocketData(matches) {
        this.matchData = matches;

        if (this.isLogin) {
            this.startOddsInterval(1500);
        } else {
            this.startOddsInterval(10000);
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

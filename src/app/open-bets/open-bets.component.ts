import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientApiService } from '../services/client-api.service';
import { ShareDataService } from '../services/share-data.service';
import { ToastMessageService } from '../services/toast-message.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-open-bets',
  templateUrl: './open-bets.component.html',
  styles: [
  ]
})
export class OpenBetsComponent implements OnInit {

  eventBets = [];
  totalBets = 0;
  totalUBets = 0;
  marketBets: any;

  isCheckedBetInfo: boolean = false;
  isCheckedAverageOdds: boolean = false;

  status: string = "";
  msgData: any;
  timeoutReset;


  eventBetsSubscription: Subscription;
  Update: any;

  constructor(
    
    private shareService: ShareDataService,
    private clientApiService: ClientApiService,
    private toastr: ToastMessageService,

  ) { }

  ngOnInit(): void {
    this.getlanguages();
    this.listBets();
    this.getToastMessage();
  }
  getlanguages() {
    this.shareService._lagugageSub$.subscribe(data => {
      if(data != null){
        this.Update = data
        }
      // console.log(this.Update);

    })
  }

  getToastMessage() {
    this.toastr.successMsgSource.subscribe(data => {
      // console.log(data)
      this.status = 'success';
      this.msgData = data;
      this.timeoutReset = setTimeout(() => {
        this.removeMsg();
      }, 5000);
    })
    this.toastr.errorMsgSource.subscribe(data => {
      // console.log(data)

      this.status = 'error';
      this.msgData = data;

      this.timeoutReset = setTimeout(() => {
        this.removeMsg();
      }, 5000);
    })
  }

  removeMsg() {
    this.msgData = null;
    clearTimeout(this.timeoutReset);
  }

  listBets() {
    this.eventBetsSubscription = this.shareService.listBets$.subscribe((data: any) => {
      // console.log(data, "list");
      if (data) {
        // console.log(data.matchWiseBets)
        this.eventBets = data.matchWiseBets;
        // this.totalBets = data.totalBets;

        let matchId = "0";
        // console.log(window.location.hash)
        if (window.location.hash.indexOf('event') > -1) {
          matchId = window.location.hash.replace('#/event/', '');
        }


        if (this.totalBets != data.totalBets) {
          // this.eventBets = data.matchWiseBets;
          this.totalBets = data.totalBets;

          // if (this.eventBets.length > 0) {
          //   this.openMarketBets(this.eventBets[0].markets[0]);
          // }


        }
        if (this.totalUBets != data.totalUBets) {
          // console.log("ubets= "+this.totalUBets,data.totalUBets)

          this.totalUBets = data.totalUBets;
          // this.marketsNewExposure({ isUnmatchedBet: true, matchId: matchId });
          _.forEach(data.matchWiseBets, match => {
            if (match.eventId == matchId) {
              this.shareService.shareBetExpoData({ isUnmatchedBet: true, matchId: matchId });
            }
          });

        }

        // _.forEach(data.matchWiseBets, match => {
        //   _.forEach(match.markets, market => {
        //     if (market.name == this.marketBets.name && market.marketId == this.marketBets.marketId) {
        //       this.marketBets = market;
        //     }
        //   });
        // });

        // console.log(matchId)
        // console.log(this.marketBets)
      }
    })
  }

  openMarketBets(marketBets) {
    this.marketBets = marketBets;
    // console.log(this.marketBets)
  }

  cancelBet(betId) {
    this.clientApiService.cancelBet(betId).subscribe((resp: any) => {
      if (resp) {
        if (resp.errorCode == 0) {
          resp.errorDescription = "Unmatched bet canceled."
          this.toastr.successMsg(resp.errorDescription);
          this.shareService.shareUpdateFundExpo('refreshBets');
          this.goBack();

        } else {
          this.toastr.errorMsg(resp.errorDescription);
          // this.shareService.shareUpdateFundExpo('refreshBets');

        }
      }
    })
  }




  goBack() {
    this.marketBets = null;
  }

  betInfo() {
    this.isCheckedBetInfo = !this.isCheckedBetInfo;
  }
  averageOdds() {
    this.isCheckedAverageOdds = !this.isCheckedAverageOdds;
  }

  trackByMatch(match) {
    return match.eventId;
  }
  trackByMarket(market) {
    return market.name;
  }
  trackByBetType(bet) {
    return bet.betType;
  }
  trackByBet(bet) {
    return bet.consolidateId;
  }

  ngOnDestroy() {
    if (this.eventBetsSubscription) {
      this.eventBetsSubscription.unsubscribe();
    }
  }

}

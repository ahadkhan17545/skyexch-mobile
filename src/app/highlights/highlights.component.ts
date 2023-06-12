import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { DataFormatsService } from '../services/data-formats.service';
import { ShareDataService } from '../services/share-data.service';
import { TokenService } from '../services/token.service';
import { param } from 'jquery';
import { environment } from 'src/environments/environment';
import { ClientApiService } from '../services/client-api.service';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-highlights',
  templateUrl: './highlights.component.html',
  styles: [
  ]
})
export class HighlightsComponent implements OnInit, OnDestroy {
  siteName = environment.siteName;
  isLcRouting = environment.isLcRouting;

  isIcasino = environment.isIcasino;
  isskybet369: boolean = environment.isskybet369;
  isEtgcasino = environment.isEtgcasino;
  isCasinoTab = environment.isCasinoTab;
  isExchangeGames = environment.isExchangeGames;
  islc247allcondition = environment.islc247allcondition;
  isSNcasino: boolean = environment.isSNcasino;
  isSlot: boolean = environment.isSlot;



  casinoList: any = [];

  sportList = [];
  sportId!: number;
  selectedSport: any;

  isLogin: boolean = false;


  sportSubscription: Subscription;

  eventCom: any;
  isAuthPending: boolean = false;
  accountInfo: any;
  Update: any;


  constructor(
    private dfService: DataFormatsService,
    private shareService: ShareDataService,
    private tokenService: TokenService,
    private router: Router,
    private apiService: ClientApiService,
    private main: MainService,
    private route: ActivatedRoute
  ) {
    this.eventCom = '/event';
    if (this.isLcRouting) {
      this.eventCom = '/fullmarket';
    }
    if (this.tokenService.getToken()) {
      this.isLogin = true;
    }
    this.route.params.subscribe(params => {
      // console.log(params);
      this.selectedSport = null;
      this.sportId = params.eventTypeId;
      this.sportWise();
    })
  }

  ngOnInit() {
    this.getlanguages();
    // this.shareService.seletedSport.subscribe(data => {
    //   console.log(data)
    //   this.sportId = data;
    // })
    this.main.apis$.subscribe((res) => {
      this.UserDescription();
    })
    this.sportWise();
    this.listCasinoTable();


  }
  




  listCasinoTable() {
    this.shareService.casinoList$.subscribe((resp: any) => {
      if (resp) {
        this.casinoList = resp;
      }
    });

  }
  getlanguages() {
    this.shareService._lagugageSub$.subscribe(data => {
      if(data != null){
        this.Update = data
        }
      // console.log(this.Update);

    })
  }

  sportWise() {
    $('#page_loading').css('display', 'flex');

    this.sportSubscription = this.shareService.sportData$.subscribe(data => {
      if (data != null) {
        this.sportList = this.dfService.sportEventWise(data, 0);
        // console.log(this.sportList);
        if (!this.selectedSport) {
          setTimeout(() => {
            (<any>$('#frame')).perfectScrollbar();
          }, 200);

          if (this.sportId) {
            _.forEach(this.sportList, (item: any) => {
              if (this.sportId == item.id) {
                this.selectHighlight(item, true);
              }
            });
          } else {
            this.selectHighlight(this.sportList[0], false);
          }

        } else {
          _.forEach(this.sportList, (item: any) => {
            if (this.sportId == item.id) {
              this.selectHighlight(item, false);
            }
          });
        }
      }
    });
  }
  UserDescription() {
    this.accountInfo = this.tokenService.getUserInfo();

    // console.log(this.accountInfo)
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

    // setTimeout(() => {
    this.apiService.getAuthCasino(this.accountInfo.userName, this.accountInfo.userId, prod_code, prod_type).subscribe((resp: any) => {
      //   resp={
      //     "errorCode": 0,
      //     "errorDescription": null,
      //     "memberName": "vrnlnew100",
      //     "balance": 200.00,
      //     "prod_code": 146,
      //     "prod_type": 5,
      //     "url": "\"https://inter-gaming.com/server_selection/en/vrnlnew100/VI4FiqD928pikUe9gyCycq7h1qFlaN\""
      // }



      if (resp.errorCode == 0 && resp.url) {
        // window.open(JSON.parse(resp.url), '_blank');
        window.open(JSON.parse(resp.url), "_self");


      } else {
        alert(resp.errorDescription);
      }
      this.isAuthPending = false;

    }, err => {
      this.isAuthPending = false;

    })
    // },1500);
  }

  selectHighlight(sport: any, value: boolean) {
    this.sportId = sport.id;
    this.selectedSport = sport;



    if (!this.islc247allcondition) {
      setTimeout(() => {
        let frame = document.querySelector('#frame');

        if (value && frame) {
          frame.scrollLeft = 0;
        }
        var g = $("#highlightLabel");
        var f = g.find("#highlightTab" + this.sportId);
        if (f && value) {
          // const frame = document.querySelector('#frame');
          frame = document.querySelector('#frame');
          // console.log(frame)
          let leftOffset = 0;
          leftOffset = f.offset().left;
          // console.log(leftOffset)
          if (frame) {
            // frame.scrollLeft = leftOffset ? leftOffset : 0;
            frame.scrollLeft = leftOffset - 5;

          }
        }
      }, 100);
    }

    setTimeout(() => {
      $('#page_loading').css('display', 'none');
    }, 500)

  }


  toggleFavourite(event: any, marketData) {

    if (this.isLogin) {
      // if (this.siteName == 'lc247' && event.isPremium && event.eventTypeId==2) {
      //   return;
      // }
      event.isMulti = !event.isMulti;
      // this.dfService.ToggleFavourite(event.eventId);
      this.dfService.ToggleFavourite(marketData);

    } else {
      this.router.navigate(['/login']);
    }
  }
  checkIsMulti(marketData) {

    let isMulti=false;
    let favArray = localStorage.getItem('favourite');
    let favArrays = [];
    if (favArray) {
      favArrays = favArray.split(',');
    }

      let mktIndex = _.indexOf(favArrays, marketData);
      if (mktIndex > -1) {
        isMulti = true;
      }
      return isMulti;
  }

  trackBySport(index: number, item: any) {
    return item.eventTypeId;
  }

  trackByEvent(index: number, item: any) {
    return item.eventId;
  }


  openSearchWrap() {
    let searchWrap = $("#searchWrap");
    searchWrap.fadeIn();
    (<any>$("#searchInput")).focus();
  }
  ngOnDestroy() {
    if (this.sportSubscription) {
      this.sportSubscription.unsubscribe();
    }
    this.selectedSport = null;
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataFormatsService } from '../services/data-formats.service';
import { ShareDataService } from '../services/share-data.service';
import { TokenService } from '../services/token.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-inplay',
  templateUrl: './inplay.component.html',
  styles: [
  ]
})
export class InplayComponent implements OnInit {
  siteName = environment.siteName;
  isLcRouting = environment.isLcRouting;
  islc247allcondition = environment.islc247allcondition;

  isIcasino: boolean = environment.isIcasino;
  isskybet369: boolean = environment.isskybet369;



  sportList = [];
  selectedTab: string = 'inplay';

  isLogin: boolean = false;

  sportSubscription: Subscription;

  isLoader: boolean = false;
  inplayCom: any;
  eventCom: any;
  Update: any;


  constructor(
    private dfService: DataFormatsService,
    private shareService: ShareDataService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.inplayCom = '/running';
    this.eventCom = '/event';

    if (this.isLcRouting) {
      this.inplayCom = '/inplay';
      this.eventCom = '/fullmarket';
    }
    if (this.tokenService.getToken()) {
      this.isLogin = true;
    }
  }

  ngOnInit() {
    this.getlanguages();
    this.sportWise();
  }

  sportWise() {
    $('#page_loading').css('display', 'flex');

    if (this.sportSubscription) {
      this.sportSubscription.unsubscribe();
    }
    this.sportSubscription = this.shareService.sportData$.subscribe(data => {
      if (data != null) {
        this.sportList = this.dfService.InplayTodayTomorrowEventWise(data, this.selectedTab);
        // console.log(this.sportList);
        setTimeout(() => {
          $('#page_loading').css('display', 'none');
        }, 300);
        this.isLoader = true;
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


  changeTab(tabType) {
    this.sportList = [];
    this.isLoader = false;
    this.selectedTab = tabType;

    if (this.selectedTab == 'result') {
      this.isLoader = true;

      return false;
    }
    $('#page_loading').css('display', 'flex');
    setTimeout(() => {
      this.sportWise();
    }, 300)
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

    let isMulti = false;
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


  ngOnDestroy() {
    this.sportSubscription.unsubscribe();
  }

}

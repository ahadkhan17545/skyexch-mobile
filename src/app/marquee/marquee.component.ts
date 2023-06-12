import { Component, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import { ClientApiService } from '../services/client-api.service';
import { MainService } from '../services/main.service';
import { ShareDataService } from '../services/share-data.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-marquee',
  templateUrl: './marquee.component.html',
  styles: [
  ]
})
export class MarqueeComponent implements OnInit, OnDestroy {

  news: string = "";
  pnews: string = "";
  vnews: string = "";
  tickers: string = "";

  islc247allcondition = environment.islc247allcondition;

  newsPending: boolean = false;
  newsPending2: boolean = false;
  isLogin: boolean = false;
  intervalSub;
  siteName: string = environment.siteName;
  Update: any;

  constructor(
    // private dfService: DataFormatService,
    private userService: ClientApiService,
    private main: MainService,
    private tokenService: TokenService,
    private shareService: ShareDataService
  ) {
    if (this.tokenService.getToken()) {
      this.isLogin = true;
    }

    if (this.isLogin) {
      this.main.apis$.subscribe((res) => {
        this.getticker();
        this.getNews();
      });
      this.intervalSub = setInterval(() => {
        this.getticker()
      }, 60000)
    }



  }

  ngOnInit() {
    this.getlanguages();
  }
  getlanguages() {
    this.shareService._lagugageSub$.subscribe(data => {
      if(data != null){
        this.Update = data
        }
      // console.log(this.Update);

    })
  }

  ngAfterViewInit() {

  }

  loadMarquee() {
    (<any>$('.marquee')).marquee({
      //speed in milliseconds of the marquee
      duration: 9000,
      //gap in pixels between the tickers
      gap: 0,
      //time in milliseconds before the marquee will start animating
      delayBeforeStart: 0,
      //'left' or 'right'
      direction: 'left',
      //true or false - should the marquee be duplicated to show an effect of continues flow
      duplicated: false,
      // startVisible: true

    });
  }

  getNews() {
    if (this.newsPending) {
      return;
    }
    this.newsPending = true;
    this.vnews = "";
    this.tickers = "";
    this.userService.getTicker().subscribe((resp: any) => {
      if (resp.errorCode == 0) {
        resp.result = resp.result.map(t => { t.ticker = atob(t.ticker); return t });
        // console.log(resp.result)
        // resp.result.forEach(element => {
        //   this.vnews = this.vnews + element.ticker.replace("\n", "</p>");
        //   // if (this.vnews == '2023') {
        //   //   this.vnews + this.vnews.replace("2023", "</h1>");
        //   //   // console.log(this.vnews);
        //   // }
        // });
        this.vnews = resp.result;
        resp.result.forEach(element => {
          this.tickers = this.tickers + " || " + element.ticker;
        });
      }
      this.newsPending = false;
    }, err => {
      this.newsPending = false;
    })
  }

  getticker() {
    if (this.newsPending2) {
      return;
    }
    this.newsPending2 = true;
    this.userService.get_ticker().subscribe((resp: any) => {
      // this.news = this.news + " " + resp.ticker;
      // console.log(resp)

      if (!this.news) {
        setTimeout(() => {
          this.loadMarquee();
        }, 10)
      }
      this.pnews = resp.ticker.split('||');
      // this.pnews = "";

      // news.forEach(element => {
      //   this.pnews = this.pnews + element.replace("\n", "</p>");
      // });
      // console.log(this.pnews);

      this.news = resp.ticker;



      this.newsPending2 = false;
    }, err => {
      this.newsPending2 = false;
    })
  }
  openAnnouncementPopUp() {
    $('#announcementPopUp').css('display', 'flex')
  }
  closeAnnouncementPopUp() {
    $('#announcementPopUp').css('display', 'none')
  }

  ngOnDestroy(): void {
    if (this.intervalSub) {
      clearInterval(this.intervalSub);
    }
  }

}
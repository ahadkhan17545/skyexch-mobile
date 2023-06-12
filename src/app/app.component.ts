import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MainService } from './services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  siteName = environment.siteName;
  isIcasino = environment.isIcasino;
  isskybet369 = environment.isskybet369;

  intervalSub;

  // allApiRes = { "devAdminIp": "https://101010.space/pad=81", "devIp": "https://api.cricbuzzer.io/pad=89", "sportApi": "http://209.250.242.175:33332", "sportSocketApi": "ws://209.250.242.175", "liveTvApi": "https://access.streamingtv.fun:3475", "scoreApi": "https://access.streamingtv.fun:3440", "fanApi": "https://access.streamingtv.fun:3443", "fancyApi": "https://access.streamingtv.fun:3443", "premiumApi": "https://access.streamingtv.fun:3442", "casApi": "https://access.streamingtv.fun:3440", "casinoApi": "https://access.streamingtv.fun:3440", "sslRacingApi": "https://horsegreyapi.com", "sslracingSocketApi": "wss://horsegreyapi.com", "sslAllSportApi": "https://allsportsapi.xyz", "sslAllSportSocketApi": "wss://allsportsapi.xyz", "sslExchangeGamesApi": "https://horsegreyapi.com", "sslSportApi": "https://api.easy247.live", "sslsportSocketApi": "wss://easy247.live", "ssladmin": "https://444444.store/pad=81", "adminReport": "https://444444.store/pad=81", "sslclient": "https://333333.digital/pad=82", "fSource": 0, "maintanance": 0 };
  // allApiRes = { "devAdminIp": "https://101010.space/pad=81", "devIp": "https://api.cricbuzzer.io/pad=89", "sportApi": "http://209.250.242.175:33332", "sportSocketApi": "ws://209.250.242.175", "liveTvApi": "https://access.streamingtv.fun:3475", "scoreApi": "https://api2.streamingtv.fun:3440", "fanApi": "https://api2.streamingtv.fun:3440", "fancyApi": "https://api2.streamingtv.fun:3440", "premiumApi": "https://api2.streamingtv.fun:3440", "casApi": "https://access.streamingtv.fun:3440", "casinoApi": "https://access.streamingtv.fun:3440", "sslRacingApi": "https://horsegreyapi.com", "sslracingSocketApi": "wss://horsegreyapi.com", "sslAllSportApi": "https://allsportsapi.xyz", "sslAllSportSocketApi": "wss://allsportsapi.xyz", "sslExchangeGamesApi": "https://horsegreyapi.com", "sslSportApi": "https://444444.club", "sslsportSocketApi": "wss://444444.club", "ssladmin": "https://222222.digital/pad=81", "adminReport": "https://222222.digital/pad=81", "sslclient": "https://111111.info/pad=82", "fSource": 0, "maintanance": 0 };
  allApiRes = { "devAdminIp": "https://2585sd.pro/pad=81", "devIp": "https://2585sd.info/pad=82", "sportApi": "http://209.250.242.175:33332", "sportSocketApi": "ws://209.250.242.175", "liveTvApi": "https://access.streamingtv.fun:3475", "scoreApi": "https://access.streamingtv.fun:3460", "fanApi": "https://access.streamingtv.fun:3443", "fancyApi": "https://access.streamingtv.fun:3443", "premiumApi": "https://access.streamingtv.fun:3460", "casApi": "https://access.streamingtv.fun:3440", "casinoApi": "https://access.streamingtv.fun:3440", "sslRacingApi": "https://horsegreyapi.com", "sslracingSocketApi": "wss://horsegreyapi.com", "sslAllSportApi": "https://allsportsapi.xyz", "sslAllSportSocketApi": "wss://allsportsapi.xyz", "sslExchangeGamesApi": "https://apiallsports.xyz", "sslSportApi": "https://lc247whitelable.com", "sslsportSocketApi": "wss://lc247whitelable.com", "ssladmin": "https://444444.online/pad=81", "adminReport": "https://444444.online/pad=81", "sslclient": "https://444444.online/pad=82", "fSource": 0, "maintanance": 0 };

  constructor(
    public router: Router,
    private mainService: MainService,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document,

  ) {
    if (this.siteName == "exch1") {
      let siteName = "exchange 1";
      this.titleService.setTitle(siteName.toUpperCase());
    } else if (this.siteName == "nayaludis") {
      let siteName = "9WICKETS";
      this.titleService.setTitle(siteName.toUpperCase());
    } else if (this.siteName == "lc247co") {
      let siteName = "LC247";
      this.titleService.setTitle(siteName.toUpperCase());
    } else {
      this.titleService.setTitle(this.siteName.toUpperCase());
    }
    // this.titleService.setTitle(this.siteName.toUpperCase());

    let favicon = this.document.querySelector('#appIcon') as HTMLLinkElement;
    favicon.href = "assets/images/mobile/" + this.siteName + "/favicon.ico";
    this.loadStyle('assets/theme/' + this.siteName + '.css');


    let bodytag = document.getElementsByTagName("BODY")[0];
    bodytag.classList.add(this.siteName);

    setTimeout(() => {
      bodytag.classList.add('blockAll');
    }, 100)


    this.router.events.subscribe((event: NavigationStart) => {
      if (event instanceof NavigationStart) {
        if (event.url == '/login') {
          bodytag.classList.add('bg_login');
        }
        else {
          setTimeout(() => {
            bodytag.classList.remove('bg_login');
          }, 300)
        }
      }
    });

    this.getAllApi(null);

    this.intervalSub = setInterval(() => {
      this.getAllApi('data')
    }, 60000)

  }

  loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;

      head.appendChild(style);
    }

    // setTimeout(() => {
    //   let bodytag = document.getElementsByTagName("BODY")[0];
    //   bodytag.classList.add('blockAll');
    // }, 200)

  }
  getAllApi(data) {
    let removeTimeout = setTimeout(() => {
      this.mainService.apis2$.next(this.allApiRes);
      if (!data) {
        this.mainService.apis$.next(data);
      }
    }, 5000)

    this.mainService.getApis().subscribe((res: any) => {
      clearTimeout(removeTimeout);
      this.mainService.apis2$.next(res);
      if (!data) {
        this.mainService.apis$.next(data);
      }
    }, err => {
      this.mainService.apis2$.next(this.allApiRes);
      if (!data) {
        this.mainService.apis$.next(data);
      }
    });


  }

  ngOnDestroy(): void {
    if (this.intervalSub) {
      clearInterval(this.intervalSub);
    }
  }
}

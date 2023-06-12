import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MainService } from './main.service';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ClientApiService {

  private baseUrl!: string;
  private scoreApi!: string;
  isIcasino: boolean = environment.isIcasino;
  isskybet369: boolean = environment.isskybet369;
  ICasinoPad: string = environment.ICasinoPad;
  Skybet369Pad: string = environment.Skybet369Pad;
  private liveTvApi!: string;

  private betUrl!: string;


  accountInfo: any;


  private _pingResSub = new BehaviorSubject<any>(null);
  pingRes$ = this._pingResSub.asObservable();

  constructor(private http: HttpClient, private main: MainService, private tokenService: TokenService) {
    main.apis2$.subscribe((res) => {
      if (res) {
        this.baseUrl = res.ip;
        this.betUrl = res.ip;
        this.scoreApi = res.scoreApi;
        this.liveTvApi = res.liveTvApi;

        if (this.isIcasino) {
          this.betUrl = this.ICasinoPad;
        }
        if (this.isskybet369) {
          this.betUrl = this.Skybet369Pad;
        }
        this.UserDescription();

      }
    });
  }

  UserDescription() {
    this.accountInfo = this.tokenService.getUserInfo();

    // console.log(this.accountInfo)
  }


  balance(activeEventId) {
    if (activeEventId) {
      return this.http.get(`${this.betUrl}/ping/loadEvent/${activeEventId}`);
    } else {
      return this.http.post(`${this.betUrl}/ping`, { uid: this.accountInfo?.userName });
    }
  }
  balanceApi() {
    return this.http.post(`${this.betUrl}/balance`, { uid: this.accountInfo?.userName, token: this.tokenService.getToken() });
  }

  getTicker() {
    return this.http.get(`${this.baseUrl}/getTicker`);
  }

  myMarkets() {
    return this.http.get(`${this.baseUrl}/liveBetsByMarket`)
  }

  stakeSetting(stakes: any) {
    return this.http.get(`${this.baseUrl}/stakeSetting/${stakes}`)
  }

  listGames(url) {
    return this.http.get(`${this.baseUrl}/listGames${url}`);
  }

  loadEvent(eventId: any) {
    return this.http.get(`${this.baseUrl}/loadEvent/${eventId}`);
  }

  listBets() {
    return this.http.post(`${this.betUrl}/listBets`, { uid: this.accountInfo?.userName, token: this.tokenService.getToken() });
  }
  cancelBet(betId: any) {
    return this.http.get(`${this.baseUrl}/cancelBet/${betId}`);
  }

  getBookExposure(marketId: any) {
    return this.http.post(`${this.betUrl}/listBooks/${marketId}`, { uid: this.accountInfo?.userName, marketId: marketId, token: this.tokenService.getToken() })
  }

  getFancyExposure(eventId: any) {
    return this.http.post(`${this.betUrl}/fancyExposure/${eventId}`, { uid: this.accountInfo?.userName, token: this.tokenService.getToken() });
  }

  placeBet(betData: any) {
    return this.http.post(`${this.betUrl}/placeBets`, betData);
  }
  placeTpBet(data: any) {
    return this.http.post(`${this.betUrl}/TPplaceBets`, data
    );
  }
  placeBetsPremium(betData: any) {
    return this.http.post(`${this.betUrl}/placeBetsPremium`, betData);
  }
  requestResult(reqId: any) {
    return this.http.get(`${this.baseUrl}/requestResult/${reqId}`);
  }

  getBookMakerBook(marketId: any) {
    return this.http.post(`${this.betUrl}/listBooks/${marketId}`, { uid: this.accountInfo?.userName, token: this.tokenService.getToken() });
  }

  getFancyBook(marketId: any, fancyId: any, fname: any) {
    return this.http.post(`${this.betUrl}/listBooks/df_${marketId}_${fancyId}_${fname}`, { uid: this.accountInfo?.userName, token: this.tokenService.getToken() });
  }

  get_ticker() {
    return this.http.get(`${this.scoreApi}/api/get_ticker`);
  }

  listCasinoTable() {
    return this.http.get(`${this.baseUrl}/listCasinoTable`);
  }
  listCasinoProduct() {
    return this.http.get(`${this.baseUrl}/listCasinoProduct`);
  }

  profile() {
    return this.http.get(`${this.baseUrl}/profile`);
  }
  getEvent(id: any) {
    return this.http.get(`https://access.streamingtv.fun:3440/api/getEventsDetails/${id}`);
  }
  getreport(id: any) {
    return this.http.get(`https://access.streamingtv.fun:3440/api/getLatestResults/${id}`);
  }

  getliveTvApi(eventId: any) {
    return this.http.get(`${this.liveTvApi}/api/get_live_tv_url/${eventId}`);
  }

  getAuthCasino(userName: string, userId, prod_code, prod_type) {
    // return this.http.post(`http://185.225.233.199:33333/api/auth`, { userName, userId, prod_code, prod_type });
    return this.http.post(`https://etg.globlethings.com/api/auth`, { userName, userId, prod_code, prod_type });

  }
  QuitCasino(userName: string, userId) {
    // return this.http.post(`http://185.225.233.199:33333/api/quit`, { userName, userId });
    return this.http.post(`https://etg.globlethings.com/api/quit`, { userName, userId });

  }


  setPremiumBook(marketId, bookData) {
    localStorage.setItem(marketId, JSON.stringify(bookData));
  }
  getPremiumBook(marketId) {
    return JSON.parse(localStorage.getItem(marketId));
  }


  queryMarketDepths(marketId: string, selectionId: string) {
    // return this.http.get(`http://localhost:3036/api/queryMarketDepth/${marketId}/${selectionId}`);
    return this.http.get(`https://api2.streamingtv.fun:3440/api/queryMarketDepth/${marketId}/${selectionId}`);

  }
  LoadRunnerInfoChartAction(marketId: string, selectionId: string, logarithmic: boolean) {
    return this.http.get(`https://api2.streamingtv.fun:3440/api/LoadRunnerInfoChartAction/${marketId}/${selectionId}/${logarithmic}`);

  }

  getEventresults(sportId: string, type: string) {
    return this.http.get(`https://api2.streamingtv.fun:3440/api/eventresults/${sportId}/${type}`);
  }
  settleBet(uid, token) {
    return this.http.post(`https://api.skybet369.co/pad=87/playerSettledBets`, { uid, token });
  }
  getlanguage() {
    return this.http.get('https://static112233.com/assets/languagemobile.json');
  }
}

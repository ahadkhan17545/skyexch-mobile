import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {


  private _sportData = new BehaviorSubject<any>(null);
  sportData$ = this._sportData.asObservable();

  private _listGamesData = new BehaviorSubject<any>(null);
  listGamesData$ = this._listGamesData.asObservable();

  private _casinoList = new BehaviorSubject<any>(null);
  casinoList$ = this._casinoList.asObservable();

  private _oddsDataSub = new BehaviorSubject<any>(null);
  oddsData$ = this._oddsDataSub.asObservable();

  private _updateFundExpoSub = new BehaviorSubject<any>(null);
  updateFundExpo$ = this._updateFundExpoSub.asObservable();

  private _listBetsSub = new BehaviorSubject<any>(null);
  listBets$ = this._listBetsSub.asObservable();


  private _stakeButton = new BehaviorSubject<any>(null);
  stakeButton$ = this._stakeButton.asObservable();

  // private _showLiveTv = new BehaviorSubject<any>(null);
  // showLiveTv$ = this._showLiveTv.asObservable();

  private _betExpoData = new BehaviorSubject<any>(null);
  betExpoData$ = this._betExpoData.asObservable();


  private _lagugageSub = new BehaviorSubject<any>(null);
  _lagugageSub$ = this._lagugageSub.asObservable();

  showLiveTv = new EventEmitter<boolean>();
  activeMatch = new EventEmitter<any>();
  seletedSport = new EventEmitter<any>();



  constructor() { }



  shareSportData(data: any) {
    this._sportData.next(data);
  }

  shareListGamesData(data: any) {
    this._listGamesData.next(data);
  }

  shareCasinoList(data: any) {
    this._casinoList.next(data);
  }

  shareOddsData(data: any) {
    // console.log(data)
    this._oddsDataSub.next(data);
  }

  shareStakeButton(data: any) {
    this._stakeButton.next(data);
  }

  shareUpdateFundExpo(data: any) {
    // console.log(data)
    this._updateFundExpoSub.next(data);
  }
  shareListBets(data: any) {
    this._listBetsSub.next(data);
  }

  // shareLiveTv(data: any) {
  //   this._showLiveTv.next(data);
  // }

  shareBetExpoData(data: any) {
    this._betExpoData.next(data);
  }
  sharelanguage(data: any) {
    this._lagugageSub.next(data);
  }
}

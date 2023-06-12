import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientApiService } from '../services/client-api.service';
import { DataFormatsService } from '../services/data-formats.service';
import { MainService } from '../services/main.service';
import { ShareDataService } from '../services/share-data.service';
import { ToastMessageService } from '../services/toast-message.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  AferLoginChangePassword: boolean = environment.AferLoginChangePassword;
  siteName: string = environment.siteName;
  isIcasino: boolean = environment.isIcasino;
  isskybet369: boolean = environment.isskybet369;
  isNayaLudisNet: boolean = environment.isNayaLudisNet;
  isNayaLudisSite: boolean = environment.isNayaLudisSite;
  isEtgcasino: boolean = environment.isEtgcasino;
  isTV = environment.isTV

  accountInfo: any;
  fundInfo: any;

  activeEventId: any;

  status: string = "";
  msgData: any;
  timeoutReset;

  pingPending: boolean = false;
  isClicked: boolean = true;
  listBetsPending: boolean = false;

  betsInterval;
  totalUBets = 0;

  isLogin: boolean = false;
  fundInterval;
  eventBetsSubscription: Subscription;
  mainInterval;
  Update: any;

  constructor(
    private tokenService: TokenService,
    private toastr: ToastMessageService,
    private main: MainService,
    private clientApi: ClientApiService,
    private dfService: DataFormatsService,
    private shareService: ShareDataService,
    private router: Router,

  ) {
    if (this.tokenService.getToken()) {
      this.isLogin = true;
    }
  }

  ngOnInit(): void {
    this.getlanguages();
    this.shareService.activeMatch.subscribe(data => {
      this.activeEventId = data;
    })
    this.mainInterval = setInterval(() => {
      let maintain = this.tokenService.getMaintanance()
      if (maintain == '1') {
        this.router.navigate(['maintenance']);
      }
    }, 1000)
    this.getToastMessage();
    if (this.isLogin) {
      this.main.apis$.subscribe((res) => {
        // this.myMarketMatch();
        this.UserDescription();
        // this.QuitCasino(null);
        this.FundExpo('click');
        this.listBets();

        this.shareService.updateFundExpo$.subscribe(data => {
          // console.log(data)
          if (data == 'event') {
            // console.log(data,"this.fundInfo");
            // 
            this.FundExpo('refresh');
            // this.listBets();
          } else if (data == 'refreshBets') {

            this.FundExpo('refresh');
            this.listBets();
          } else if (data) {
            // console.log(data)

            this.fundInfo = data[3][0];
            let allbets = this.dfService.matchUnmatchBetsMarketWise(data[2]);
            if (allbets.totalUBets != this.totalUBets) {
              this.totalUBets = allbets.totalUBets;
            }
            this.shareService.shareListBets(allbets);
          }
          // this.FundExpo('refresh');
          // // this.listBets();
        })
        if (this.accountInfo) {
          if (this.accountInfo.newUser == 1 && this.AferLoginChangePassword) {
            this.router.navigate(['change_pass']);
          }
        }

      });

      this.fundInterval = setInterval(() => {
        this.FundExpo(null);
        if (this.accountInfo.newUser == 1 && this.AferLoginChangePassword) {
          this.router.navigate(['change_pass']);
        }
      }, 30000);

      this.betsInterval = setInterval(() => {
        if (this.totalUBets > 0) {
          this.listBets();
        }
      }, 5000)
    }

  }

  ngAfterViewInit() {
    this.openBetsBtn();
    this.openSettingBtn();
  }

  showTv() {
    if (this.fundInfo?.balance == 0 && this.fundInfo?.exposure == 0 && this.isTV) {
      this.toastr.errorMsg('Insufficient balance to view live stream');
    } else {
      this.shareService.showLiveTv.emit(true);
    }
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

    this.toastr.warningMsgSource.subscribe(data => {
      console.log(data)

      this.status = 'warning';
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

  openBetsBtn() {
    var V = $("#openBetsLeftSide");
    var W = V.find("#openBetSlide");
    $("#openBetsBtn").unbind("click").click(function () {
      V.show();
      W.css("display", "flex");
      W.addClass("left-in");

      window.setTimeout(function () {
        W.removeClass("left-in")
      }, 1000)
    })

    $("a#close").bind("click", function () {
      V.fadeOut();
    });
  }

  openSettingBtn() {
    var j = $("#settingSlide");
    var s = $("#settingDiv");

    $("a.a-setting").off("click").on("click", function () {

      s.css("display", "flex");
      j.addClass("right-in");
      window.setTimeout(function () {
        j.removeClass("right-in")
      }, 1000)
    });

    $("#settingClose").bind("click", function () {
      s.fadeOut();
      s.css("display", "none");
    });
    // $("#settingCancel").bind("click", function () {
    //   s.fadeOut();
    //   s.css("display", "none");
    // });
    // $("#settingSave").bind("click", function () {
    //   s.fadeOut();
    //   s.css("display", "none");
    // });
  }

  getlanguages() {
    this.shareService._lagugageSub$.subscribe(data => {
      if (data != null) {
        this.Update = data
      }
      if (this.Update?.Login == "প্রবেশ করুন" || this.Update?.Login == "inicio sesión") {
        console.log("", this.Update?.Login)
        // $("#logcls").css('font-size', '10px');
        $("#logcls1").css('font-size', '10px');
      } else {
        // $("#logcls").css('font-size', 'inherit');
        $("#logcls1").css('font-size', 'inherit');
      }
      // console.log(this.Update);

    })
  }



  UserDescription() {
    this.accountInfo = this.tokenService.getUserInfo();
  }
  QuitCasino(isdata) {

    if (this.isIcasino || this.isskybet369 || !this.accountInfo) {
      return
    }

    // if (this.siteName == 'cricbuzzer'   || this.siteName == 'lc247' || this.siteName == 'wskyexch' || this.siteName == 'nayaludis' || this.siteName == 'ninewicket') {
    this.clientApi.QuitCasino(this.accountInfo.userName, this.accountInfo.userId).subscribe((resp: any) => {
      // console.log(resp);
      if (resp.errorCode == 0) {

      }
      setTimeout(() => {
        if (!isdata) {
          this.FundExpo(null);
        }
      }, 500);

    }, err => {
    })
    // }

  }
  FundExpo(isdata) {

    if (this.pingPending) {
      return;
    }
    this.pingPending = true;
    if (isdata) {
      this.QuitCasino(isdata);
      this.isClicked = this.pingPending;
    }

    if (this.isskybet369) {
      this.clientApi.balanceApi().subscribe((resp: any) => {

        if (resp) {
          if (resp.message == "OK") {
            this.fundInfo = resp.data;

            // if (this.fundInfo.listBets == 1) {
            //   this.listBets();
            // }
          }
        }

        this.pingPending = false;
        this.isClicked = this.pingPending;

      }, err => {
        this.pingPending = false;
        this.isClicked = this.pingPending;

      });
    } else {
      this.clientApi.balance(this.activeEventId).subscribe((resp: any) => {

        if (resp) {
          if (resp.errorCode == 0) {
            this.fundInfo = resp.result[0];
            // this.shareService.shareUpdateFundExpo(resp.result);

            // if (this.fundInfo.listBets == 1) {
            //   this.listBets();
            // }
          }
        }

        this.pingPending = false;
        this.isClicked = this.pingPending;

      }, err => {
        this.pingPending = false;
        this.isClicked = this.pingPending;

      });
    }

  }

  listBets() {
    if (this.listBetsPending) {
      return;
    }
    this.listBetsPending = true;
    this.clientApi.listBets().subscribe((resp: any) => {
      // console.log(resp);
      if (resp.errorCode == 0) {
        let allbets = this.dfService.matchUnmatchBetsMarketWise(resp.result);
        // console.log(allbets);
        if (allbets.totalUBets != this.totalUBets) {
          this.totalUBets = allbets.totalUBets;
        }
        this.shareService.shareListBets(allbets);
      }
      this.listBetsPending = false;
    }, err => {
      this.listBetsPending = false;
    })
  }

  ngOnDestroy(): void {
    if (this.fundInterval) {
      clearInterval(this.fundInterval);
    }
    if (this.betsInterval) {
      clearInterval(this.betsInterval);
    }
  }
}

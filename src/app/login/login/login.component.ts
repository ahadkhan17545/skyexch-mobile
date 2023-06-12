import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';
import { ShareDataService } from 'src/app/services/share-data.service';
import { ClientApiService } from 'src/app/services/client-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  siteName = environment.siteName;
  isLcRouting = environment.isLcRouting;

  isBajiSites = environment.isBajiSites;

  LoginForm: FormGroup;
  submitted: boolean = false;
  isCaptcha = environment.isCaptcha;
  visiblePassword: boolean = false;
  islc247allcondition = environment.islc247allcondition;

  result: any;
  isPendingLogin: boolean = false;
  AferLoginChangePassword: boolean = environment.AferLoginChangePassword;

  highCom: any;
  language: any;
  Alllanguage: any;

  intervalSub;
  Update: any;
  range = "en";
  selectedlang: string;

  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private router: Router,
    private main: MainService,
    private clientApi: ClientApiService,
    private shareService:ShareDataService

  ) {
    if (this.tokenService.getLanguage()) {
      this.selectedlang = this.tokenService.getLanguage()
      this.selectlanguage(this.selectedlang)
    } else {
      this.selectlanguage('en')
    }
    this.highCom = '/highlight';

    if (this.isLcRouting) {
      this.highCom = '/sports';
    }
  }

  ngOnInit() {
    this.getlanguages();
    this.initLoginForm();
    this.main.apis$.subscribe(res => {
      if (this.isCaptcha) {
        this.getImg();
      }
    })
    // let img = { "log": "638059943609362732", "img": "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" }
    // document
    //   .getElementById('authenticateImage')
    //   .setAttribute('src', this.getSecureImage(img.img));
  }
  getlanguages() {
    this.shareService._lagugageSub$.subscribe(data => {
      if(data != null){
        this.Update = data
        }
    
      // console.log(this.Update);

    })
  }
  selectlanguage(newValue) {
    this.range = newValue;
    this.tokenService.setLanguage(this.range);
    this.getLanguage();
  }
  getLanguage() {
    let L = []
    this.clientApi.getlanguage().subscribe((resp: any) => {
      this.language = resp
      this.language.forEach(data => {
        if (data.lang == this.range) {
          L.push(data)
        }
        this.Alllanguage = L
        // console.log(this.Alllanguage);
        this.shareService.sharelanguage(this.Alllanguage[0]);
      })
    })
  }
  initLoginForm() {
    this.LoginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      captcha: [this.isCaptcha ? '' : '0000', Validators.required],
      log: [this.isCaptcha ? '' : '0000', Validators.required]
    });

    if (!this.isCaptcha) {
      this.LoginForm.addControl('origin', new FormControl(this.getDomainName(location.origin)));
    }

  }

  get f() {
    return this.LoginForm.controls;
  }

  getDomainName(hostName) {
    let formatedHost = "";
    let splithostName = hostName.split('.');
    if (splithostName.length > 2) {
      formatedHost = hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
    } else {
      formatedHost = hostName.split('//')[1]
    }
    return formatedHost;
  }

  getImg() {
    this.loginService
      .getImg()
      .subscribe((response: { img: string; log: string }) => {
        document
          .getElementById('authenticateImage')
          .setAttribute('src', this.getSecureImage(response.img));
        this.LoginForm.get('log').setValue(response.log);
      });
  }

  getSecureImage(img) {
    return `data:image/jpeg;base64, ${img}`;
  }

  Login() {
    this.submitted = true;
    // console.log(this.LoginForm)

    if (!this.LoginForm.valid) {
      return;
    }

    if (this.isPendingLogin) {
      return;
    }
    this.isPendingLogin = true;

    this.loginService
      .login(this.LoginForm.value)
      .subscribe((resp: any) => {
        if (resp.errorCode === 0) {

          if (this.siteName == "betfair21" || this.siteName == "betswiz") {
            resp.result[0]['currencyCode'] = "";
          }
          this.tokenService.setToken(resp.result[0].token);
          this.tokenService.setSiteName(environment.siteName);
          this.tokenService.setUserInfo(resp.result[0]);
          this.result = resp.errorDescription;
          this.LoginForm.reset();
          if (resp.result[0].newUser == 1 && this.AferLoginChangePassword) {
            this.router.navigate(['change_pass']);
          } else {
            let homeCom = 'dash';

            if (this.isLcRouting) {
              homeCom = 'home';
            }
            this.router.navigate([homeCom]);
          }
        } else {
          if (!resp.errorDescription) {
            resp.errorDescription = "Username or password is wrong"
          }
          this.result = resp.errorDescription;
          if (this.isCaptcha) {
            this.getImg();
          }
        }
        this.submitted = false;
        this.isPendingLogin = false;

      }, err => {
        this.submitted = false;
        this.isPendingLogin = false;
      }
      );

  }

  LoginWithDemo() {

    this.LoginForm = this.fb.group({
      userName: ['demomatha', Validators.required],
      password: ['Amma@123', Validators.required],
      captcha: ['0000', Validators.required],
      log: ['0000', Validators.required],
      origin: [this.getDomainName(location.origin)]
    });

    this.Login();
  }

  showPassword() {
    this.visiblePassword = !this.visiblePassword;
  }


}

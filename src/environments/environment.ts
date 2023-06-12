// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

let siteName = "baazi365";
let hostname = window.origin;
let apisUrl = "https://streamingtv.fun:3440/api/all_apis";

let isCaptcha = true;
let isallSports = true;
let isSkyView = false;
let isCaptchademo = false;
let isIcasino = false;
let isskybet369 = false;
let isSNcasino = true;
let isEtgcasino = true;
let isLcRouting = false;

let isBajiSites = true;
let isCasinoTab = false;
let isMultiMarket = true;
let isDiamondCasino = false;
let isIntCasino = false;

let isExchangeGames = true;
let isNayaLudisNet = false;
let isNayaLudisSite = false;

let isSlot=false;
let isPoker=false;
let isbetgame=true;
let ICasinoPad = "https://icasino365.xyz/pad=85";
let Skybet369Pad = "https://api.skybet369.co/pad=87";
let crichomedesign= false;
let lcexchcodesign= false;
let isxpg = false;
let islc247allcondition  = false;
let whatsapp = "+00 00000 00000";
let whatsapp1 = "";
let whatsapp2 = " "
let whatsapp3 = '+15072012580';
let Marketing_whatsapp = ""
let Marketing_skype = ''
let AferLoginChangePassword = false

let islc247Home = false;
let is9betexchHome = false;
let isrunXhome = false;
let diamondcasinoHome = false;
let betWinnerHome = false;
let nayaLudisHome = false;
let isLcexchHome = false;
let palkiHome = false;
let baji365Home = false;
let isCricexch = false;
let isskyfair = false;
let iframehome = false;
let fancySource = false
let isTV =false;
let t10 = false
let isbetxHome = true

if (islc247allcondition) {
  apisUrl = "https://access.streamingtv.fun:3445/api/all_apis";
}
if (islc247allcondition) {
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  isSNcasino = true;
  isSlot=false;
}
if (islc247allcondition || siteName == 'nayaludis'  || siteName == 'betbuz365') {
  isLcRouting = true;
}
if( siteName == 'nayaludis'  || siteName == 'betbuz365' 
  || siteName == 'palki' || siteName == 'starsportsx' || siteName == 'wskyexch'){
  isIntCasino=true;
}

if(siteName=='lc247'){
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  isSNcasino = true;
  isSlot=false;
  isPoker = false;
  islc247allcondition = true
}


export const environment = {
  production: false,
  apisUrl: apisUrl,
  siteName: siteName,
  isCaptcha: isCaptcha,
  isSkyView: isSkyView,
  whatsapp: whatsapp,
  isCaptchademo: isCaptchademo,
  whatsapp1: whatsapp1,
  whatsapp2: whatsapp2,
  whatsapp3: whatsapp3,
  Marketing_whatsapp: Marketing_whatsapp,
  Marketing_skype: Marketing_skype,
  isIcasino: isIcasino,
  isxpg:isxpg,
  isskybet369: isskybet369,
  isEtgcasino: isEtgcasino,
  ICasinoPad: ICasinoPad,
  Skybet369Pad:Skybet369Pad,
  isallSports: isallSports,
  AferLoginChangePassword: AferLoginChangePassword,
  isBajiSites: isBajiSites,
  isCasinoTab: isCasinoTab,
  isMultiMarket: isMultiMarket,
  isDiamondCasino: isDiamondCasino,
  isExchangeGames: isExchangeGames,
  isNayaLudisSite: isNayaLudisSite,
  isNayaLudisNet: isNayaLudisNet,
  isLcRouting: isLcRouting,
  isSNcasino:isSNcasino,
  isSlot:isSlot,
  isPoker:isPoker,
  isbetgame:isbetgame,
  islc247allcondition:islc247allcondition,
  crichomedesign: crichomedesign,
  lcexchcodesign:lcexchcodesign,
  islc247Home:islc247Home,
  is9betexchHome:is9betexchHome,
  isrunXhome:isrunXhome,
  diamondcasinoHome:diamondcasinoHome,
  betWinnerHome:betWinnerHome,
  nayaLudisHome:nayaLudisHome,
  isLcexchHome:isLcexchHome,
  palkiHome:palkiHome,
  baji365Home:baji365Home,
  isCricexch:isCricexch,
  isskyfair:isskyfair,
  isTV:isTV,
  iframehome:iframehome,
  fancySource:fancySource,
  t10:t10,
  isbetxHome:isbetxHome
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

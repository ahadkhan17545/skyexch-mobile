let siteName = 'cricexch';
let hostname = window.origin;
let apisUrl = "https://access.streamingtv.fun:3446/api/all_apis";

let isCaptcha = true;
let isallSports = true;
let isSkyView = false;
let isIcasino = false;
let isskybet369 = false;
let isEtgcasino = false;
let isLcRouting = false;
let isBajiSites = false;
let isCasinoTab = true;
let isMultiMarket = false;
let isDiamondCasino = true;
let isIntCasino = true;
let isSNcasino = false;
let isPoker = false;
let isbetgame = false;
let isExchangeGames = true;
let isSlot = false;
let isNayaLudisNet = false;
let isNayaLudisSite = false;
let isCaptchademo = false;
let AferLoginChangePassword = true
let ICasinoPad = "https://icasino365.xyz/pad=85";
let Skybet369Pad = "https://api.skybet369.co/pad=87";
let islc247allcondition = false;
let crichomedesign = false;
let lcexchcodesign = false;
let isxpg = false
let t10 = false

let whatsapp = '+00 00000 00000';
let whatsapp1 = '';
let whatsapp2 = '';
let whatsapp3 = '';
let Marketing_whatsapp = ''
let Marketing_skype = ''

let islc247Home = false
let is9betexchHome = false
let isrunXhome = false
let diamondcasinoHome = false
let betWinnerHome = false
let nayaLudisHome = false
let isskyfair = false
let isLcexchHome = false
let palkiHome = false
let baji365Home = false
let isCricexch = false
let iframehome = false
let isTV = false
let fancySource = false
let isbetxHome = false
// --------------------------------------------------------------------------



if (hostname.indexOf('mash247.live') > -1) {
  siteName = 'mash247';
  isallSports = false;
  diamondcasinoHome = true
}
else if (hostname.indexOf('cricexch.net') > -1) {
  siteName = 'cricexch';
  isCricexch = true
}
else if (hostname.indexOf('betswiz.com') > -1) {
  siteName = 'betswiz';
  AferLoginChangePassword = false;
  diamondcasinoHome = true
  isExchangeGames = false
} else if (hostname.indexOf('betswiz.in') > -1) {
  siteName = 'betswiz';
  AferLoginChangePassword = false;
  diamondcasinoHome = true
  isExchangeGames = false
}


else if (hostname.indexOf('sports365.pro') > -1) {
  siteName = 'sports365';
  isallSports = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isCaptcha = false;
  isLcRouting = false;
  isrunXhome = true;
  isbetgame = true;
  isTV = true;
  AferLoginChangePassword = false
   t10 = true


}

else if (hostname.indexOf('skyfaire.live') > -1) {
  siteName = 'skyfaire';
  isallSports = false;
  isSNcasino = true;
  diamondcasinoHome = true
} 
else if (hostname.indexOf('bajimat.site') > -1) {
  siteName = 'bajimatsite';
  isallSports = false;
  diamondcasinoHome = true
}
else if (hostname.indexOf('icasino.betskyexch.com') > -1) {
  siteName = 'betskyexch';
  isIcasino = true;
  ICasinoPad = "https://icasino365.xyz/pad=85";
  iframehome = true
  t10 = true

}
else if (hostname.indexOf('billy.betskyexch.com') > -1) {
  siteName = 'betskyexch';
  isIcasino = true;
  iframehome = true
  ICasinoPad = "https://api.betskyexch.com/pad=86";
  t10 = true
}
else if (hostname.indexOf('billyINR.betskyexch.com') > -1) {
  siteName = 'betskyexch';
  isIcasino = true;
  iframehome = true
  ICasinoPad = "https://api.betskyexch.com/pad=94";
  t10 = true
}
else if (hostname.indexOf('billyUSD.betskyexch.com') > -1) {
  siteName = 'betskyexch';
  isIcasino = true;
  iframehome = true
  ICasinoPad = "https://api.betskyexch.com/pad=95";
   t10 = true
}
else if (hostname.indexOf('billyBDT.betskyexch.com') > -1) {
  siteName = 'betskyexch';
  isIcasino = true;
  iframehome = true
  ICasinoPad = "https://api.betskyexch.com/pad=96";
   t10 = true
}
else if (hostname.indexOf('betstar.betskyexchange.com') > -1) {
  siteName = 'betskyexch';
  isIcasino = true;
  iframehome = true
  ICasinoPad = "https://betstar777.net/pad=86";
   t10 = true
}
else if (hostname.indexOf('aws.4wickets.com') > -1) {
  siteName = 'wicket4';
  isskybet369 = true;
  Skybet369Pad = "https://api.4wickets.com/pad=89";
  AferLoginChangePassword = false
  iframehome = true
}
else if (hostname.indexOf('9betexch.com') > -1) {
  siteName = 'betexch9';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  isCaptcha = false;
  is9betexchHome = true;
  whatsapp = '+601128932635';
}

else if (hostname.indexOf('skybet369.co') > -1) {
  siteName = 'skybet369';
  isskybet369 = true;
  Skybet369Pad = "https://api.skybet369.co/pad=87";
  AferLoginChangePassword = false
  iframehome = true
   t10 = true
}
else if (hostname.indexOf('betskyexch.com') > -1) {
  siteName = 'betskyexch';
  diamondcasinoHome = true
}

else if (hostname.indexOf('skybet365.in') > -1) {
  siteName = 'skybet365';
  diamondcasinoHome = true

}

else if (hostname.indexOf('betskyexchange.com') > -1) {
  siteName = 'betskyexchange';
  isCaptcha = false;
  diamondcasinoHome = true

}

else if (hostname.indexOf('jeesky7.com') > -1) {
  siteName = 'jeesky7';
  isCaptcha = false;
  diamondcasinoHome = true

}

else if (hostname.indexOf('betbuzz365.site') > -1) {
  siteName = 'betbuzz365';
  isSkyView = true;
  isallSports = false;
  isbetgame = true;
  diamondcasinoHome = true

}


else if (hostname.indexOf('lc247.live') > -1) {
  siteName = 'lc247';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  isSNcasino = true;
  isbetgame = true;
  isSlot = true;
  islc247allcondition = true
  isLcRouting = true;
  whatsapp = '+919907194219';
  whatsapp1 = '+919088750582';
  islc247Home = true
   t10 = true



}
else if (hostname.indexOf('lc247.co') > -1) {
  siteName = 'lc247co';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  isSNcasino = true;
  isbetgame = true;
  isSlot = true;
  islc247allcondition = true;
  lcexchcodesign = true;
  isLcRouting = true;
}

else if (hostname.indexOf('xpgexch.com') > -1) {
  siteName = 'xpgexch';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isMultiMarket = true;
  isExchangeGames = false;
  isSNcasino = true;
  isbetgame = true;
  isSlot = true;
  islc247allcondition = true;
  isLcRouting = true;
  isxpg = true

}
else if (hostname.indexOf('betwinners.live') > -1) {
  siteName = 'betwinners';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isMultiMarket = true;
  isExchangeGames = false;
  isSNcasino = true;
  isSlot = true;
  islc247allcondition = true;
  isLcRouting = true;
  isCaptcha = false;
  whatsapp = '+601131782043';
  betWinnerHome = true
   t10 = true


}

else if (hostname.indexOf('runexch.co') > -1) {
  siteName = 'runexchco';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  isSNcasino = true;
  isbetgame = true;
  isSlot = true;
  isPoker = true;
  islc247allcondition = true;
  isLcRouting = true;
  isrunXhome = true
}



if (hostname.indexOf('neyaludis.live') > -1) {
  siteName = 'wckt9';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isLcRouting = false;
  isSNcasino = true;
  isrunXhome = true;
  isbetgame = false;
  whatsapp = '+15512339119';

}

if (hostname.indexOf('nayaludis.site') > -1) {
  siteName = 'nayaludis';
  isallSports = false;
  whatsapp = '+15099035070';
  isBajiSites = true;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  isNayaLudisSite = true;
  isLcRouting = true;
  isSlot = true;
  nayaLudisHome = true;
  isbetgame = true;
}
if (hostname.indexOf('t20exchange247.live') > -1) {
  siteName = 'exchange247';
  isallSports = false;
  isBajiSites = true;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  isSlot = true;
  nayaLudisHome = true;
  isbetgame = true;
}

else if (hostname.indexOf('lcexch.in') > -1) {
  siteName = 'lcexch';
  isCaptcha = false;
  AferLoginChangePassword = false
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  isSNcasino = true;
  isbetgame = true;
  isSlot = true;
  isPoker = true;
  isLcexchHome = true
}
else if (hostname.indexOf('skyexch.live') > -1) {
  siteName = 'skyexch';
  diamondcasinoHome = true

}
else if (hostname.indexOf('mathaexchall.com') > -1) {
  siteName = 'mathaexchall';
  isCaptcha = false;
  diamondcasinoHome = true

}
else if (hostname.indexOf('skyexchange8.com') > -1) {
  siteName = 'skyexchange8';
  diamondcasinoHome = true

}

else if (hostname.indexOf('rajbet.win') > -1) {
  siteName = 'rajbet';
  isallSports = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  isbetgame = true;
  islc247allcondition = true;
  AferLoginChangePassword = false
  isCaptcha = false;
  isLcRouting = false;
  whatsapp = "+447917990825";
  isrunXhome = true;
  isTV = true;
   t10 = true



}


else if (hostname.indexOf('mx365.live') > -1) {
  siteName = 'mx365_live';
  isallSports = false;
  diamondcasinoHome = true

}


else if (hostname.indexOf('vellki.pro') > -1) {
  siteName = 'vellki';
  whatsapp = '+447748282954';
  isallSports = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isCaptcha = false;
  isLcRouting = false;
  isrunXhome = true
  isbetgame = true;
  isTV = true;
  AferLoginChangePassword = false


}



else if (hostname.indexOf('palki.bet') > -1) {
  siteName = 'palki';
  isallSports = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  AferLoginChangePassword = false
  isSNcasino = true;
  isbetgame = true;
  isEtgcasino = true;
  isSlot = true;
  isPoker = true;
  palkiHome = true;

}
else if (hostname.indexOf('lcbuzz.com') > -1) {
  siteName = 'lcbuzz';
  isallSports = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  AferLoginChangePassword = false
  isSlot = true;
  palkiHome = true

}

if (hostname.indexOf('bet-365.bet') > -1) {
  siteName = 'bet365';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isLcRouting = false;
  isSNcasino = true;
  isrunXhome = true
  isbetgame = true;


}

else if (hostname.indexOf('runx.bet') > -1) {
  siteName = 'runx';
  isallSports = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isCaptcha = false;
  whatsapp = '+447949358122';
  isLcRouting = false;
  isrunXhome = true;
  isbetgame = true;
  isTV = true;
  AferLoginChangePassword = false
}
else if (hostname.indexOf('fiarsky.com') > -1) {
  siteName = 'luck247';
  isallSports = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isSNcasino = true;
  isLcRouting = false;
  isrunXhome = true;
  isbetgame = true;
  isTV = true;
  AferLoginChangePassword = false
}


else if (hostname.indexOf('cricbuzz365.live') > -1) {
  siteName = 'cricbuzz365';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isLcRouting = false;
  isSNcasino = true;
  whatsapp = '+00 000 00000';
  whatsapp1 = '+00 000 00000';
  isrunXhome = true;
  isbetgame = true;
  isSlot = true;




}
else if (hostname.indexOf('3wickets.bet') > -1) {
  siteName = 'wickets3';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isLcRouting = false;
  isSNcasino = true;
  whatsapp = '+00 000 00000';
  whatsapp1 = '+00 000 00000';
  isrunXhome = true;
  isbetgame = true;
  isSlot = true



}
else if (hostname.indexOf('winbuzz.asia') > -1) {
  siteName = 'winbuzz';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isLcRouting = false;
  isSNcasino = true;
  whatsapp = '+17163203649';
  whatsapp1 = '+00 000 00000';
  isrunXhome = true;
  isbetgame = true;
  isSlot = true;
}
else if (hostname.indexOf('lc247.life') > -1) {
  siteName = 'lc247life';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isLcRouting = false;
  isSNcasino = true;
  whatsapp = '+966594725425';
  whatsapp1 = '+00 000 00000';
  isrunXhome = true;
  isbetgame = true;
  isSlot = true;
}
else if (hostname.indexOf('skyfair.life') > -1) {
  siteName = 'skyfair';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isLcRouting = false;
  isSNcasino = true;
  whatsapp = '+00 000 00000';
  whatsapp1 = '+00 000 00000';
  isskyfair = true;
}
else if (hostname.indexOf('tusky.win') > -1) {
  siteName = 'tusky';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isLcRouting = false;
  isSNcasino = true;
  whatsapp = '+17163203649';
  whatsapp1 = '+15136407646';
  isbetxHome = true;
}
else if (hostname.indexOf('bigwin365.bet') > -1) {
  siteName = 'bigwin365';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isLcRouting = false;
  isSNcasino = true;
  whatsapp = '+17163203649';
  whatsapp1 = '+15136407646';
  isbetxHome = true;
}
else if (hostname.indexOf('luckybuzz.win') > -1) {
  siteName = 'luckybuzz';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isLcRouting = false;
  isSNcasino = true;
  whatsapp = '+17163203649';
  whatsapp1 = '+15136407646';
  isbetxHome = true;
}
else if (hostname.indexOf('betsx365.win') > -1) {
  siteName = 'betsx365';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isLcRouting = false;
  isSNcasino = true;
  whatsapp = '+17163203649';
  whatsapp1 = '+15136407646';
  isbetxHome = true;
}
else if (hostname.indexOf('baazi365.pro') > -1) {
  siteName = 'baazi365';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isLcRouting = false;
  isSNcasino = true;
  whatsapp = '+00 000 0000';
  whatsapp = '+00 000 0000';
  isbetxHome = true;
}
else if (hostname.indexOf('3wickets.io') > -1) {
  siteName = 'wicket3';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isLcRouting = false;
  isSNcasino = true;
  whatsapp = '+00 000 0000';
  whatsapp = '+00 000 0000';
  isbetxHome = true;
}
else if (hostname.indexOf('betbuzz365.fun') > -1) {
  siteName = 'betbuzz365fun';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isLcRouting = false;
  isSNcasino = true;
  whatsapp = '+00 000 0000';
  whatsapp = '+00 000 0000';
  isbetxHome = true;
}
else if (hostname.indexOf('baaaji365.live') > -1) {
  siteName = 'baaaji365';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isLcRouting = false;
  isSNcasino = true;
  whatsapp = '+00 000 0000';
  whatsapp = '+00 000 0000';
  isbetxHome = true;
}


else if (hostname.indexOf('9wickts.live') > -1) {
  siteName = 'wickts9';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isLcRouting = false;
  isSNcasino = true;
  whatsapp = '+16203996717';
  whatsapp1 = '+00 000 00000';
  isskyfair = true;
}
else if (hostname.indexOf('9ex365.bet') > -1) {
  siteName = 'ex3659';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isLcRouting = false;
  isSNcasino = true;
  whatsapp = '+1305396-1580';
  whatsapp1 = '+00 000 00000';
  isskyfair = true;
}
else if (hostname.indexOf('maza247.live') > -1) {
  siteName = 'maza247';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isLcRouting = false;
  isSNcasino = true;
  whatsapp = '+00 000 00000';
  whatsapp1 = '+00 000 00000';
  isskyfair = true;
}

else if (hostname.indexOf('bajimat.win') > -1) {
  siteName = 'bajimat';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isLcRouting = false;
  isSNcasino = true;
  whatsapp = '+00 000 00000';
  whatsapp1 = '+00 000 00000';
  isskyfair = true;
}

else if (hostname.indexOf('magic247.live') > -1) {
  siteName = 'magic247';
  isallSports = false;
  AferLoginChangePassword = false;
  isCasinoTab = false;
  isDiamondCasino = false;
  isMultiMarket = true;
  isExchangeGames = false;
  islc247allcondition = true;
  isLcRouting = false;
  whatsapp = '+00 000 00000';
  whatsapp1 = '+00 000 00000';
  isrunXhome = true;
}






if (siteName == 'lc247' || siteName == 'lc247co' || siteName == 'xpgexch') {
  apisUrl = "https://access.streamingtv.fun:3445/api/all_apis";
}
if (siteName == 'lc247' || siteName == 'winbuzz' || siteName == 'wickets3' || siteName == 'cricbuzz365' || siteName == 'magic247' || siteName == 'neyaludis' || siteName == 'lc247life' || siteName == 'skyfair') {
  fancySource = true
}



export const environment = {
  production: true,
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
  isskybet369: isskybet369,
  isEtgcasino: isEtgcasino,
  ICasinoPad: ICasinoPad,
  Skybet369Pad: Skybet369Pad,
  isallSports: isallSports,
  AferLoginChangePassword: AferLoginChangePassword,
  isBajiSites: isBajiSites,
  isCasinoTab: isCasinoTab,
  isMultiMarket: isMultiMarket,
  isDiamondCasino: isDiamondCasino,
  isExchangeGames: isExchangeGames,
  isSlot: isSlot,
  isPoker: isPoker,
  isbetgame: isbetgame,
  isNayaLudisSite: isNayaLudisSite,
  isNayaLudisNet: isNayaLudisNet,
  isLcRouting: isLcRouting,
  isSNcasino: isSNcasino,
  islc247allcondition: islc247allcondition,
  crichomedesign: crichomedesign,
  lcexchcodesign: lcexchcodesign,
  isxpg: isxpg,
  islc247Home: islc247Home,
  is9betexchHome: is9betexchHome,
  isrunXhome: isrunXhome,
  diamondcasinoHome: diamondcasinoHome,
  betWinnerHome: betWinnerHome,
  nayaLudisHome: nayaLudisHome,
  isskyfair: isskyfair,
  isLcexchHome: isLcexchHome,
  palkiHome: palkiHome,
  baji365Home: baji365Home,
  isCricexch: isCricexch,
  isTV: isTV,
  iframehome: iframehome,
  fancySource: fancySource,
  t10:t10,
  isbetxHome:isbetxHome
};

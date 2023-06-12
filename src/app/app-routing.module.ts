import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountComponent } from './account/account.component';
import { ACasinoComponent } from './casino/a-casino/a-casino.component';
import { AwccasinoComponent } from './casino/awccasino/awccasino.component';
import { LcasinoComponent } from './casino/lcasino/lcasino.component';
import { EventComponent } from './event/event.component';
import { HighlightsComponent } from './highlights/highlights.component';
import { HomeComponent } from './home/home.component';
import { InplayComponent } from './inplay/inplay.component';
import { MainComponent } from './main/main.component';
import { MultiMarketsComponent } from './multi-markets/multi-markets.component';
import { RacesComponent } from './races/races.component';
import { AuthGuard } from './services/auth.guard';
import { AuthMaintananceGuard } from './services/auth.maintainance.guard';
import { TokenComponent } from './token/token.component';
import { VirtualsportsComponent } from './virtualsports/virtualsports.component';
import { XGameComponent } from './x-game/x-game.component';
import { OtherGamesComponent } from './other-games/other-games.component';
import { ResultsComponent } from './results/results.component';
import { SnCasinoListComponent } from './casino/sn-casino-list/sn-casino-list.component';
import { SnCasinoComponent } from './casino/sn-casino/sn-casino.component';
import { SlotcasinoComponent } from './casino/slotcasino/slotcasino.component';
import { SettledbetComponent } from './settledbet/settledbet.component';
import { PokerCasinoComponent } from './casino/poker-casino/poker-casino.component';
import { BetgamesComponent } from './casino/betgames/betgames.component';
import { TwainComponent } from './casino/twain/twain.component';
let siteName = environment.siteName;
let isIcasino = environment.isIcasino;
let isskybet369 = environment.isskybet369;

let isLcRouting = environment.isLcRouting;


let homeCom = 'dash';
let inplayCom = 'running';
let highCom = 'highlight';
let eventCom = 'event';
let redirectCom = 'dash';

let useHashData = true;

if (isLcRouting) {
  homeCom = 'home';
  inplayCom = 'inplay';
  highCom = 'sports';
  eventCom = 'fullmarket';
  redirectCom = 'home';
  useHashData = false;
}
if (isIcasino || isskybet369) {
  redirectCom = "highlight";
}

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
    canActivate: [AuthMaintananceGuard],
  },
  {
    path: 'maintenance',
    loadChildren: () => import('./maintenance/maintenance.module').then((m) => m.MaintenanceModule)

  },
  {
    path: 'change_pass',
    loadChildren: () => import('./change-password/change-password.module').then((m) => m.ChangePasswordModule),
    canActivate: [AuthGuard],

  },

  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: redirectCom },
      { path: homeCom, component: HomeComponent },
      { path: highCom, component: HighlightsComponent },
      { path: highCom + '/:eventTypeId', component: HighlightsComponent },
      { path: inplayCom, component: InplayComponent },
      { path: 'result', component: ResultsComponent },
      { path: homeCom, component: HomeComponent },
      { path: eventCom, component: EventComponent },
      { path: eventCom + '/:eventId', component: EventComponent },
      { path: eventCom + '/:eventId/:marketId/:port', component: EventComponent },

      { path: 'multimarkets', component: MultiMarketsComponent },
      { path: 'races/:eventTypeId', component: RacesComponent },
      { path: 'token/:token', component: TokenComponent },

      { path: 'account', component: AccountComponent },
      { path: 'virtual_sports', component: VirtualsportsComponent },
      { path: 'x-game', component: XGameComponent },
      { path: 'tpp/:opentable', component: ACasinoComponent },
      { path: 'sncasinolist/:providerCode', component: SnCasinoListComponent },
      { path: 'sncasino/:providerCode/:gameCode', component: SnCasinoComponent },
      { path: 'poker', component: PokerCasinoComponent, data: { title: 'poker' } },
      { path: 'lcasino', component: LcasinoComponent },
      { path: 'awccasino', component: AwccasinoComponent },
      { path: 'settledbet', component: SettledbetComponent },
      { path: 'Other-Games', component: OtherGamesComponent },
      { path: 'slotcasino/:id', component: SlotcasinoComponent },
      { path: 'betgames', component: BetgamesComponent},
      { path: 'twain', component: TwainComponent },
      {
        path: 'casino',
        loadChildren: () => import('./casino/casino.module').then((m) => m.CasinoModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'exchange',
        loadChildren: () => import('./exchange-games/exchange-games.module').then((m) => m.ExchangeGamesModule),
        canActivate: [AuthGuard]
      },

    ],
    canActivate: [AuthMaintananceGuard],
  },
  //Wild Card Route for 404 request
  {
    path: '**', pathMatch: 'full',
    loadChildren: () => import('./pagenotfound/pagenotfound.module').then((m) => m.PagenotfoundModule),
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: useHashData })], //for lc and wasim dada site
  // imports: [RouterModule.forRoot(routes, { useHash: true })], //for all

  exports: [RouterModule]
})
export class AppRoutingModule { }

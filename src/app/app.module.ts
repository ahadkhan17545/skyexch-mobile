import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { InplayComponent } from './inplay/inplay.component';
import { HighlightsComponent } from './highlights/highlights.component';
import { SortByDatePipe } from './pipes/sort-by-date.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { ReversePipe } from './pipes/reverse.pipe';
import { RemoveSpacePipe } from './pipes/remove-space.pipe';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MarqueeComponent } from './marquee/marquee.component';
import { PromoteBannerComponent } from './promote-banner/promote-banner.component';
import { NavComponent } from './nav/nav.component';
import { SettingsComponent } from './settings/settings.component';
import { OpenBetsComponent } from './open-bets/open-bets.component';
import { SearchComponent } from './search/search.component';
import { EventComponent } from './event/event.component';
import { MultiMarketsComponent } from './multi-markets/multi-markets.component';
import { AccountComponent } from './account/account.component';
import { OrderByFancyPipe } from './pipes/order-by-fancy.pipe';
import { TokenInterceptor } from './services/token.interceptor';
import { FooterModule } from './footer/footer.module';
import { RacesComponent } from './races/races.component';
import { CasinoModule } from './casino/casino.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { TokenComponent } from './token/token.component';
import { VirtualsportsComponent } from './virtualsports/virtualsports.component';
import { XGameComponent } from './x-game/x-game.component';
import { ACasinoComponent } from './casino/a-casino/a-casino.component';

import { DirectivesModule } from './directives/directives.module';
import { OrderByBookPipe } from './pipes/oder-by-book.pipe';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { OtherGamesComponent } from './other-games/other-games.component';
import { ResultsComponent } from './results/results.component';
import { SettledbetComponent } from './settledbet/settledbet.component';
import { GlobalErrorHandler } from './GlobalErrorHandler/GlobalErrorHandler';
import { LmtScoreComponent } from './lmt-score/lmt-score.component';
import { CrichomeComponent } from './home/crichome/crichome.component';
import { LchomeComponent } from './home/lchome/lchome.component';
import { XpghomeComponent } from './home/xpghome/xpghome.component';
import { Lc247Component } from './home/lc247/lc247.component';
import { Betexch9Component } from './home/betexch9/betexch9.component';
import { RunxComponent } from './home/runx/runx.component';
import { DiamondhomeComponent } from './home/diamondhome/diamondhome.component';
import { IframehomeComponent } from './home/iframehome/iframehome.component';
import { BetwinnerhomeComponent } from './home/betwinnerhome/betwinnerhome.component';
import { NayaludisComponent } from './home/nayaludis/nayaludis.component';
import { LcexchComponent } from './home/lcexch/lcexch.component';
import { PalkihomeComponent } from './home/palkihome/palkihome.component';
import { CricexchComponent } from './home/cricexch/cricexch.component';
import { SkyfairComponent } from './home/skyfair/skyfair.component';
import { BetxhomeComponent } from './home/betxhome/betxhome.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    InplayComponent,
    HighlightsComponent,
    SortByDatePipe,
    OrderByFancyPipe,
    OrderByBookPipe,
    OrderByPipe,
    ReversePipe,
    RemoveSpacePipe,
    HeaderComponent,
    FooterComponent,
    MarqueeComponent,
    PromoteBannerComponent,
    NavComponent,
    SettingsComponent,
    OpenBetsComponent,
    SearchComponent,
    EventComponent,
    MultiMarketsComponent,
    AccountComponent,
    RacesComponent,
    TokenComponent,
    VirtualsportsComponent,
    XGameComponent,
    ACasinoComponent,
    OtherGamesComponent,
    ResultsComponent,
    SettledbetComponent,
    LmtScoreComponent,
    CrichomeComponent,
    LchomeComponent,
    XpghomeComponent,
    Lc247Component,
    Betexch9Component,
    RunxComponent,
    DiamondhomeComponent,
    IframehomeComponent,
    BetwinnerhomeComponent,
    NayaludisComponent,
    LcexchComponent,
    PalkihomeComponent,
    CricexchComponent,
    BetxhomeComponent,
    SkyfairComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FooterModule,
    CasinoModule,
    GoogleChartsModule,
    DirectivesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    // {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

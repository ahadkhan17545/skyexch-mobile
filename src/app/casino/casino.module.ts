import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasinoListComponent } from './casino-list/casino-list.component';
import { RouterModule, Routes } from '@angular/router';
import { CasinoGameComponent } from './casino-game/casino-game.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleChartsModule } from 'angular-google-charts';
import { LcasinoComponent } from './lcasino/lcasino.component';
import { EtgCasinoListComponent } from './etg-casino-list/etg-casino-list.component';
import { SwiperModule } from 'swiper/angular';
import { AwccasinoComponent } from './awccasino/awccasino.component';
import { SnCasinoListComponent } from './sn-casino-list/sn-casino-list.component';
import { SnCasinoComponent } from './sn-casino/sn-casino.component';
import { SlotcasinoComponent } from './slotcasino/slotcasino.component';
import { PokerCasinoComponent } from './poker-casino/poker-casino.component';
import { BetgamesComponent } from './betgames/betgames.component';
import { TwainComponent } from './twain/twain.component';

const routes: Routes = [
  {
    path: '',
    component: CasinoListComponent,
  },
  {
    path: 'cas/:casinoType',
    component: CasinoListComponent,
  },
  {
    path: 'etg',
    component: EtgCasinoListComponent,
  },
  {
    path: 'tp/:tableId/:tableName/:gType',
    component: CasinoGameComponent,
  },
  {
    path: 'cas/:casinoType/tp/:tableId/:tableName/:gType',
    component: CasinoGameComponent,
  },
  {
    path: 'awccasino',
    component: AwccasinoComponent,
  }
];

@NgModule({
  declarations: [
    CasinoListComponent,
    CasinoGameComponent,
    LcasinoComponent,
    EtgCasinoListComponent,
    AwccasinoComponent,
    SnCasinoListComponent,
    SnCasinoComponent,
    SlotcasinoComponent,
    PokerCasinoComponent,
    BetgamesComponent,
    TwainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule,
    SwiperModule
  ],
  exports: [
    RouterModule,
    AwccasinoComponent
  ]
})
export class CasinoModule { }

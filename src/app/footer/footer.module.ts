import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportWrapComponent } from './support-wrap/support-wrap.component';
import { PolicyLinkComponent } from './policy-link/policy-link.component';
import { ExtraWrapComponent } from './extra-wrap/extra-wrap.component';
import { ExtendSupportComponent } from './extend-support/extend-support.component';

@NgModule({
  declarations: [SupportWrapComponent, PolicyLinkComponent, ExtraWrapComponent, ExtendSupportComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SupportWrapComponent, PolicyLinkComponent, ExtraWrapComponent,ExtendSupportComponent
  ]
})
export class FooterModule { }

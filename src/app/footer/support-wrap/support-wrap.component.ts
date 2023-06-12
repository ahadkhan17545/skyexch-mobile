import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-support-wrap',
  templateUrl: './support-wrap.component.html',
  styleUrls: ['./support-wrap.component.css']
})
export class SupportWrapComponent implements OnInit {
  siteName = environment.siteName;
  whatsapp = environment.whatsapp;
  whatsapp1 = environment.whatsapp1;
  whatsapp2 = environment.whatsapp2;
  whatsapp3 = environment.whatsapp3;
  isNayaLudisNet: boolean = environment.isNayaLudisNet;
  isNayaLudisSite: boolean = environment.isNayaLudisSite;
  isskybet369: boolean = environment.isskybet369;
  
  fullSiteName = window.location.hostname.replace('www.', '');
  supportOpen: string = "whatsapp"

  constructor() { 
    if(this.siteName == 'magic247'){
      this.openSupport('fb')
    }else{
      this.openSupport('whatsapp')

    }
  }

  ngOnInit(): void {
  }

  openSupport(supportOpen) {
    this.supportOpen = supportOpen;
  }

}

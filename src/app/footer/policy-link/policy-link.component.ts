import { ShareDataService } from 'src/app/services/share-data.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-policy-link',
  templateUrl: './policy-link.component.html',
  styleUrls: ['./policy-link.component.css'],
})
export class PolicyLinkComponent implements OnInit {
  siteName = environment.siteName;
  fullSiteName = window.location.hostname.replace('www.', '');
  Update: any;
  
  constructor(
    private shareService:ShareDataService
  ) { }

  ngOnInit(): void { 
    this.getlanguages();
    }


  showOverlayInfo(value) {
    $(value).css('display', 'flex');
  }
  hideOverlayInfo(value) {
    $(value).fadeOut();
  }
  getlanguages() {
    this.shareService._lagugageSub$.subscribe(data => {
      if(data != null){
        this.Update = data
        }
      // console.log(this.Update);

    })
  }
}

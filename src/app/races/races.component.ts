import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DataFormatsService } from '../services/data-formats.service';
import { MainService } from '../services/main.service';
import { RacingApiService } from '../services/racing-api.service';
import { ShareDataService } from '../services/share-data.service';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.scss']
})
export class RacesComponent implements OnInit {
  isLcRouting = environment.isLcRouting;

  todayRaces: any = [];
  nextRaces: any = [];

  seletedTab: string = "today";
  eventTypeId: number;
  eventTypeName: string;
  eventCom: any;


  listMeetingPending: boolean = false;
  Update: any;

  constructor(
    private racingApi: RacingApiService,
    private dfService: DataFormatsService,
    private main: MainService,
    private route: ActivatedRoute,
    private shareService: ShareDataService,
  ) {
    this.route.params.subscribe(params => {
      this.eventTypeId = params.eventTypeId;
      if (this.eventTypeId == 7) {
        this.eventTypeName = "Horse";
      } else {
        this.eventTypeName = "Greyhound";
      }
    })
    this.eventCom = '/event';
    if (this.isLcRouting) {
      this.eventCom = '/fullmarket';
    }
    this.main.apis$.subscribe((res) => {
      $('#page_loading').css('display', 'flex');

      this.listMeetings(this.seletedTab);
    });
  }

  ngOnInit(): void {
    this.getlanguages();

  }
  getlanguages() {
    this.shareService._lagugageSub$.subscribe(data => {
      if(data != null){
        this.Update = data
        }
      // console.log(this.Update);

    })
  }

  changeTab(day) {
    $('#page_loading').css('display', 'flex');
    this.seletedTab = day;
    if (this.seletedTab != "dayAfter") {
      this.listMeetings(day);
    } else {
      this.todayRaces = [];
      $('#page_loading').css('display', 'none');

    }
  }

  listMeetings(day) {
    if (this.listMeetingPending) {
      return
    }
    this.listMeetingPending = true;
    this.todayRaces = [];
    this.racingApi.listMeetings(day, this.eventTypeId).subscribe((resp: any) => {
      if (resp) {
        this.todayRaces = this.dfService.getRacingFormat(resp);
        // console.log(this.todayRaces);

        if (day == "today") {
          this.nextRaces = this.dfService.getNextRacingFormat(resp);
          console.log(this.nextRaces);
        }
      }
      $('#page_loading').css('display', 'none');
      this.listMeetingPending = false;
    }, err => {
      $('#page_loading').css('display', 'none');
      this.listMeetingPending = false;
    });
  }

}

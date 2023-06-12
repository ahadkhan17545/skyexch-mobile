import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-extend-support',
  templateUrl: './extend-support.component.html',
  styleUrls: ['./extend-support.component.scss']
})
export class ExtendSupportComponent implements OnInit {
  whatsapp = environment.whatsapp;
  whatsapp1 = environment.whatsapp1;
  siteName = environment.siteName;

  constructor() { }

  ngOnInit(): void {
  }

}

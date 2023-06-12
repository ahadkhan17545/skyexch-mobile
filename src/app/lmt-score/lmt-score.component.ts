import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
const { SIR: SIR }: any = window;

@Component({
  selector: 'app-lmt-score',
  templateUrl: './lmt-score.component.html',
  styleUrls: ['./lmt-score.component.scss']
})
export class LmtScoreComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {


  }


  // ngAfterViewInit(): void {
  //   // setTimeout(() => {
  //   this.loadScript();
  //   // }, 2000);
  // }


  // loadScript() {


  //   (function (a, b, c, d, e, f, g, h, i) {
  //     a[e] || (i = a[e] = function () { (a[e].q = a[e].q || []).push(arguments) }, i.l = (new Date), i.o = f,
  //       g = b.createElement(c), h = b.getElementsByTagName(c)[0], g.async = 1, g.src = d, g.setAttribute("n", e), h.parentNode.insertBefore(g, h)
  //     )
  //   })(window, document, "script", "https://www.satsports.net/score_widget/widgetloader.js", "SIR", {
  //     theme: false, // using custom theme
  //     language: "en"
  //   });

  //   var layout = 'double'; // [single, double, topdown]
  //   var collapseTo = 'momentum'; //  [scoreboard,momentum,disable]
  //   var tabsPosition = 'top'; //  [bottom,top,disable]
  //   var activeSwitcher = 'scoreDetails';
  //   var momentum = 'extended'; //  [compact,bars,extended,disable]
  //   var id = 38882677;
  //   // const { SIR } = window;

  //   SIR("addWidget", ".sr-widget-1", "match.lmtPlus", { showOdds: true, layout: layout, collapseTo: collapseTo, tabsPosition: tabsPosition, activeSwitcher: activeSwitcher, momentum: momentum, matchId: id });


  // }

  ngAfterViewInit() {
    $.getScript("/assets/js/lmt_score.js", function () {
    });
  }

  // loadScript() {

  //   // (function (a, b, c, d, e, f, g, h, i) {
  //   //   a[e] || (i = a[e] = function () { (a[e].q = a[e].q || []).push(arguments) }, i.o = f,
  //   //     g = b.createElement(c), h = b.getElementsByTagName(c)[0], g.async = 1, g.src = d, g.setAttribute("n", e), h.parentNode.insertBefore(g, h)
  //   //   )
  //   // })(window, document, "script", "https://widgets.sir.sportradar.com/6a1128606dbe3870df1cfd9b60e75ef3/widgetloader", "SIR", {
  //   //   theme: false, // using custom theme
  //   //   language: "en"
  //   // });

  //   (function (a, b, c, d, e, f, g, h, i) {
  //     a[e] || (i = a[e] = function () { (a[e].q = a[e].q || []).push(arguments) }, i.l = (new Date), i.o = f,
  //       g = b.createElement(c), h = b.getElementsByTagName(c)[0], g.async = 1, g.src = d, g.setAttribute("n", e), h.parentNode.insertBefore(g, h)
  //     )
  //   })(window, document, "script", "https://widgets.sir.sportradar.com/6a1128606dbe3870df1cfd9b60e75ef3/widgetloader", "SIR", {
  //     theme: false, // using custom theme
  //     language: "en"
  //   });

  //   let layout = 'double'; // [single, double, topdown]
  //   let collapseTo = 'momentum'; //  [scoreboard,momentum,disable]
  //   let tabsPosition = 'top'; //  [bottom,top,disable]
  //   let activeSwitcher = 'scoreDetails';
  //   let momentum = 'extended'; //  [compact,bars,extended,disable]
  //   let matchId = 38882677;

  //   // setTimeout(() => {
  //     const { C: SIR }: any = window;

  //     SIR("addWidget", ".sr-widget-1", "match.lmtPlus", { showOdds: true, layout: layout, collapseTo: collapseTo, tabsPosition: tabsPosition, activeSwitcher: activeSwitcher, momentum: momentum, matchId: matchId });

  //   // }, 5000);
  //   // setTimeout(() => {
  //   // const { C: SIR }: any = window;
  //   // SIR("addWidget", ".sr-widget-1", "match.lmtPlus", { layout: "topdown", matchId: 38882677 });
  //   // }, 2000)
  // }



}


// function SIR(arg0: string, arg1: string, arg2: string, arg3: { showOdds: boolean; layout: string; collapseTo: string; tabsPosition: string; activeSwitcher: string; momentum: string; matchId: number; }) {
//   throw new Error('Function not implemented.');
// }


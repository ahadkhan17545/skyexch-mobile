
(function (a, b, c, d, e, f, g, h, i) {
    a[e] || (i = a[e] = function () { (a[e].q = a[e].q || []).push(arguments) }, i.l = (new Date), i.o = f,
        g = b.createElement(c), h = b.getElementsByTagName(c)[0], g.async = 1, g.src = d, g.setAttribute("n", e), h.parentNode.insertBefore(g, h)
    )
})(window, document, "script", "https://www.satsports.net/score_widget/widgetloader.js", "SIR", {
    theme: false, // using custom theme
    language: "en"
});

var layout = 'double'; // [single, double, topdown]
var collapseTo = 'momentum'; //  [scoreboard,momentum,disable]
var tabsPosition = 'top'; //  [bottom,top,disable]
var activeSwitcher = 'scoreDetails';
var momentum = 'extended'; //  [compact,bars,extended,disable]
var id = document.getElementById("score_id").value;
// const { SIR } = window;

// console.log('scoreId= '+document.getElementById("score_id")?document.getElementById("score_id").value:'')

SIR("addWidget", ".sr-widget-1", "match.lmtPlus", { showOdds: true, layout: layout, collapseTo: collapseTo, tabsPosition: tabsPosition, activeSwitcher: activeSwitcher, momentum: momentum, matchId: id });


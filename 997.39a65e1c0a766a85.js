"use strict";(self.webpackChunkrucogs_website=self.webpackChunkrucogs_website||[]).push([[997],{8009:(y,h,a)=>{a.d(h,{Y:()=>l});var t=a(4537),e=a(3512);const v=["*"];let l=(()=>{class c{constructor(s,r,p){this.elementRef=s,this.cssLength=r,this.changeDetector=p,this.columnWidth="20em",this.columns="auto-fit",this.autofitColumns=!0,this.gridTemplateColumns="",this.observer=new MutationObserver(g=>{this.updateGridTemplateColumns()})}ngOnInit(){this.updateGridTemplateColumns(!0)}ngAfterViewInit(){this.observer.observe(this.elementRef.nativeElement,{childList:!0})}ngOnDestroy(){this.observer.disconnect()}updateGridTemplateColumns(s=!1){let r=this.autofitColumns,p=!1;if(!s){const g=this.elementRef.nativeElement,f=this.cssLength.convertToNumber(this.columnWidth,"px"),u=Math.floor(g.offsetWidth/f);r=!(g.children.length<u)&&this.autofitColumns,p=g.offsetWidth<=f}this.gridTemplateColumns=p?`repeat( ${this.columns} )`:`repeat( ${this.columns}, `+(r?`minmax(${this.columnWidth}, 1fr)`:this.columnWidth)+" )"}}return c.\u0275fac=function(s){return new(s||c)(t.Y36(t.SBq),t.Y36(e.I),t.Y36(t.sBO))},c.\u0275cmp=t.Xpm({type:c,selectors:[["app-card-grid"]],hostVars:2,hostBindings:function(s,r){2&s&&t.Udp("grid-template-columns",r.gridTemplateColumns)},inputs:{columnWidth:["column-width","columnWidth"],columns:"columns",autofitColumns:["auto-fit-columns","autofitColumns"]},ngContentSelectors:v,decls:1,vars:0,template:function(s,r){1&s&&(t.F$t(),t.Hsn(0))},styles:["[_nghost-%COMP%]{box-sizing:border-box;display:grid;align-items:stretch;margin-left:auto;margin-right:auto;gap:.75em}[_nghost-%COMP%] > *[_ngcontent-%COMP%]{width:100%}"]}),c})()},3324:(y,h,a)=>{a.d(h,{m:()=>v});var t=a(4537);const e=["*"];let v=(()=>{class l{constructor(){this.center=!1}ngOnInit(){this.center&&(this.justifyContent="center")}}return l.\u0275fac=function(n){return new(n||l)},l.\u0275cmp=t.Xpm({type:l,selectors:[["app-tag-container"]],hostVars:2,hostBindings:function(n,s){2&n&&t.Udp("justify-content",s.justifyContent)},inputs:{center:"center"},ngContentSelectors:e,decls:1,vars:0,template:function(n,s){1&n&&(t.F$t(),t.Hsn(0))},styles:["[_nghost-%COMP%]{display:flex;flex-wrap:wrap;flex-direction:row;width:100%;height:-moz-fit-content;height:fit-content;gap:8px}"]}),l})()},6387:(y,h,a)=>{a.d(h,{Z:()=>v});var t=a(4537);const e=["*"];let v=(()=>{class l{constructor(){this.color="primary"}ngOnInit(){}}return l.\u0275fac=function(n){return new(n||l)},l.\u0275cmp=t.Xpm({type:l,selectors:[["app-tag"]],inputs:{color:"color"},ngContentSelectors:e,decls:2,vars:3,template:function(n,s){1&n&&(t.F$t(),t.TgZ(0,"div"),t.Hsn(1),t.qZA()),2&n&&t.Gre("app-tag bg ",s.color,"")},styles:["[_nghost-%COMP%]{width:-moz-fit-content;width:fit-content}.bg[_ngcontent-%COMP%]{display:inline-flex;align-items:center;height:100%;width:-moz-fit-content;width:fit-content;border-radius:16px;padding-left:12px;padding-right:12px;padding-top:auto}"]}),l})()},7997:(y,h,a)=>{a.r(h),a.d(h,{ScarletGameJamPageComponent:()=>T,ScarletGameJamPageModule:()=>E});var t=a(8692),e=a(4537),v=a(6527),l=a(1656),c=a(6925),n=a(3324),s=a(6387),r=a(4614),p=a(454);function g(o,d){if(1&o&&(e.TgZ(0,"div",8)(1,"app-button",9),e._uU(2,"\u{1f4c3} Event Page"),e.qZA()()),2&o){const m=e.oxw();e.xp6(1),e.Q6J("link",m.eventPage)}}const f=["*",[["","rightHalf",""]]],u=["*","[rightHalf]"];let C=(()=>{class o{constructor(){this.date="",this.title="",this.time="",this.type="In-person",this.eventPage=""}ngOnInit(){}}return o.\u0275fac=function(m){return new(m||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-event-card"]],inputs:{date:"date",title:"title",time:"time",type:"type",eventPage:["event-page","eventPage"]},ngContentSelectors:u,decls:17,vars:5,consts:[[1,"mb-8"],[1,"mb-16",2,"width","100%","display","flex","flex","row"],[2,"text-align","left","flex","1"],["color","primary"],["color","warn"],["color","accent"],[1,"mb-0"],["class","mt-16","style","max-width: 300px;",4,"ngIf"],[1,"mt-16",2,"max-width","300px"],["target","_blank","color","primary",3,"link"]],template:function(m,i){1&m&&(e.F$t(f),e.TgZ(0,"app-card")(1,"app-column-layout")(2,"div")(3,"h2",0),e._uU(4),e.qZA(),e.TgZ(5,"div",1)(6,"app-tag-container",2)(7,"app-tag",3),e._uU(8),e.qZA(),e.TgZ(9,"app-tag",4),e._uU(10),e.qZA(),e.TgZ(11,"app-tag",5),e._uU(12),e.qZA()()(),e.TgZ(13,"p",6),e.Hsn(14),e.qZA(),e.YNc(15,g,3,1,"div",7),e.qZA(),e.Hsn(16,1),e.qZA()()),2&m&&(e.xp6(4),e.Oqu(i.title),e.xp6(4),e.Oqu(i.date),e.xp6(2),e.Oqu(i.time),e.xp6(2),e.Oqu(i.type),e.xp6(3),e.Q6J("ngIf",""!=i.eventPage))},dependencies:[t.O5,n.m,s.Z,r.A,c.r,p.F]}),o})();var b=a(2426),Z=a(7732),x=a(8340),w=a(7914),A=a(8009);function k(o,d){1&o&&(e.TgZ(0,"div"),e._uU(1," Late Sign Up "),e.qZA())}function S(o,d){1&o&&e._uU(0," Sign Up ")}function P(o,d){if(1&o&&(e.TgZ(0,"app-button",31),e._uU(1,"Itchio Page"),e.qZA()),2&o){const m=e.oxw();e.Q6J("link",m.itchioLink)}}const _=function(o){return{height:o}};let T=(()=>{class o{constructor(m,i){this.breakpointManager=m,this.settings=i,this.startDate="April 10",this.endDate="April 17",this.startDateCalendarEventLink="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20211110T000000Z%2F20211110T020000Z&details=Meetup%20before%20Scarlet%20Game%20Jam%20to%20meet%20those%20participating%2C%20talk%20about%20your%20ideas%2C%20and%20get%20hyped%21&location=The%20CAVE%20-%20Hill%20250&text=Scarlet%20Game%20Jam%20Meetup%20and%20Discussion",this.endDateCalendarEventLink="https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20211120%2F20211121&details=Show%20off%20the%20awesome%20game%20you%20created%20and%20see%20other%20peoples%27%20as%20well%21&location=The%20CAVE%20-%20Hill%20250&text=Scarlet%20Game%20Jam%20Showcase%20and%20End",this.eventActive=!0,this.merchLink="http://scarlet-game-jam.allcolorsllc.com/",this.signupLink="https://forms.gle/jwcnZoYr3cAM4XHMA",this.itchioLink="https://itch.io/jam/sgj2022s",this.startDateTime="2pm - 6pm",this.endDateTime="11am - 11pm",this.startDateEventPage="https://rutgers.campuslabs.com/engage/event/8000723",this.endDateEventPage="https://rutgers.campuslabs.com/engage/event/8000723"}ngOnInit(){if(!this.eventActive){var m=new Date(this.startDate+", 2022 16:00:00 EST").getTime()/1e3;new FlipDown(m,"sgj-countdown",{theme:"dark"}).start()}}}return o.\u0275fac=function(m){return new(m||o)(e.Y36(v.I),e.Y36(l.g))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-scarlet-game-jam-page"]],hostAttrs:[1,"page"],decls:66,vars:23,consts:[["color","primary","bgImage","assets/images/sgj-bg-s2022.png","bgRepeatMode","repeat","bgPosition","0 0"],[1,"app-scarlet-game-jam","split-section"],[1,"mat-display-4","app-scarlet-game-jam","text","mb-4"],[1,"mat-display-1","app-scarlet-game-jam","text","mb-0"],["id","sgj-countdown",1,"app-scarlet-game-jam","flipdown",3,"ngStyle"],[1,"vbox-16",2,"max-width","300px"],["iconifyIcon","form","target","_blank","color","form",3,"link","hidden"],[4,"ngIf","ngIfElse"],["lateSignUp",""],["iconifyIcon","discord","target","_blank","color","discord",3,"link"],["iconifyIcon","itchdotio","target","_blank","color","blank",3,"link",4,"ngIf"],[1,"app-scarlet-game-jam","logo-container",3,"ngClass"],["src","assets/images/sgj-logo-s2022.png",1,"app-scarlet-game-jam","logo-painted",3,"ngClass"],["title","Itinerary","color","foreground-accent-300"],["columns","1"],["title","Jam Meetup and Discussion","type","In-Person",3,"date","time","event-page"],["rightHalf","","src","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12131.923935259512!2d-74.46769013022463!3d40.5199114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3c70c05a35157%3A0xe17f149ca619644e!2sRUTCOR%2C%20Piscataway%2C%20NJ%2008854!5e0!3m2!1sen!2sus!4v1647202302200!5m2!1sen!2sus","allowfullscreen","","loading","lazy",2,"border","0","width","100%","height","100%","min-height","300px"],["title","Game Showcase & Final Remarks","type","In-Person",3,"date","time","event-page"],["rightHalf","","src","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1702.1118570276826!2d-74.46046262755256!3d40.523503979968524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3c70b9391c1db%3A0xed97af4bcd2f4154!2sRutgers%20University%20Busch%20Student%20Center!5e0!3m2!1sen!2sus!4v1647886225990!5m2!1sen!2sus","allowfullscreen","","loading","lazy",2,"border","0","width","100%","height","100%","min-height","300px"],["title","Merch","color","blank","dog-ear",""],[2,"max-width","400px","text-align","justify","margin-bottom","24px"],["target","_blank","color","primary",2,"width","100%",3,"link","hidden"],["title","FAQ","color","primary","dog-ear","","last",""],["title","What is Scarlet Game Jam?"],[1,"mb-0"],["title","Where does Scarlet Game Jam take place?"],["title","Save Event in my Calendar",3,"href"],["title","Who can come?"],["title","Can non-Rutgers students come?"],["title","What if I can't code?"],["title","What can we do with our games?"],["iconifyIcon","itchdotio","target","_blank","color","blank",3,"link"]],template:function(m,i){if(1&m&&(e.TgZ(0,"app-full-page-header",0)(1,"div",1)(2,"div")(3,"h1",2),e._uU(4,"Scarlet Game Jam"),e.qZA(),e.TgZ(5,"h1",3),e._uU(6,"2021"),e.qZA(),e._UZ(7,"div",4),e.TgZ(8,"div",5)(9,"app-button",6),e.YNc(10,k,2,0,"div",7),e.YNc(11,S,1,0,"ng-template",null,8,e.W1O),e.qZA(),e.TgZ(13,"app-button",9),e._uU(14,"Discord"),e.qZA(),e.YNc(15,P,2,1,"app-button",10),e.qZA()(),e.TgZ(16,"div",11),e._UZ(17,"img",12),e.qZA()()(),e.TgZ(18,"app-section",13)(19,"app-card-grid",14)(20,"app-event-card",15)(21,"div"),e._uU(22," First in-person meetup of Scarlet Game Jam. This is the time to meet other people participating in the jam and form groups. The meetup marks the official start of Scarlet Game Jam and will be the reveal of the big theme of the game jam. "),e.qZA(),e._UZ(23,"iframe",16),e.qZA(),e.TgZ(24,"app-event-card",17)(25,"div"),e._uU(26," The main event of Scarlet Game Jam, this is where you will race to finish up your project, showcase your final work, and see everyone else's projects as well. This is the main event of Scarlet Game Jam and it will be a lot of fun. "),e._UZ(27,"br")(28,"br"),e._uU(29," Food will be served. "),e.qZA(),e._UZ(30,"iframe",18),e.qZA()()(),e.TgZ(31,"app-section",19)(32,"p",20),e._uU(33,"Help support the COGs club by buying merchandise! We will use the money raised to make our future events bigger and better. \u{1f604}"),e.qZA(),e.TgZ(34,"app-button",21),e._uU(35,"\u{1f455} Merch Shop"),e.qZA()(),e.TgZ(36,"app-section",22)(37,"mat-accordion")(38,"app-question-panel",23)(39,"p"),e._uU(40,"Scarlet Game Jam is an annual game jam hosted by COGS for all Rutgers students and staff! Similar to any other game jam, participants will be given one week(ish) to design and code a game to show off at the end of the jam. At the beginning of each Scarlet Game Jam we will also be unveiling the (optional) theme to inspire or challenge our participants which changes with every scarlet game jam, so each year is a new experience!"),e.qZA(),e.TgZ(41,"p",24),e._uU(42,"Participants can join our game jam solo or in a group, its up to you! No experience is required either, so feel free to join regardless of your game design experience. Have no experience and no friends to join with? No worries, at the beginning of every game jam we offer a team assembly time where you can get to know other jammers and team up (or not) to make some amazing games by the end of the week."),e.qZA()(),e.TgZ(43,"app-question-panel",25)(44,"p"),e._uU(45,"Scarlet Game Jam takes place over a week(ish), but we're not going to keep you in place for that long. We understand you're busy college students (we are too!) so the large majority of Scarlet Game Jam actually takes place wherever you want it to. This means you can work in the comfort of your home (dorm, apartment, ...), the library, the dining hall, a table in the Yard, literally anywhere. We do this so that you can work around your schedule and, if working with other people, find the perfect time to meet for your group without having to worry about our availability or the availability of a single room."),e.qZA(),e.TgZ(46,"p",24),e._uU(47,"There are portions of Scarlet Game Jam in person, though, those being: "),e.TgZ(48,"a",26),e._uU(49),e.qZA(),e._uU(50,", where you can brainstorm with other people, form a group if you want, and just hang out in general; And "),e.TgZ(51,"a",26),e._uU(52),e.qZA(),e._uU(53,", the end, where you get to show off your game, see what other people have made, and reminisce over the long week you just had (and hopefully how fun it was!)."),e.qZA()(),e.TgZ(54,"app-question-panel",27)(55,"p",24),e._uU(56,"Scarlet Game Jam is open to ALL Rutgers students, faculty, and staff. Because of this, Scarlet Game Jam is a great networking/social event where you can meet fellow Rutgers people and form friendships, partnerships, or whatever. Nothing says you have to stop working on your game after the game jam either. If you like your project and you've worked with some likeminded people, we encourage you to finish that game, polish it up, and then release it online for everyone to play (of course make sure to send us the steam link and maybe a key or two \u{1f609}). "),e.qZA()(),e.TgZ(57,"app-question-panel",28)(58,"p",24),e._uU(59,"Yes! Though they must bring proof of vaccination or an official negative COVID-19 test within 72 hours to all in-person events held during SGJ."),e.qZA()(),e.TgZ(60,"app-question-panel",29)(61,"p",24),e._uU(62,"COGS is the perfect place for people who want to explore ALL aspects of game development. This means we accept all artists, music composers, programmers, etc with open arms! If you have an idea for a game, or just want to learn how to make them, COGS will help you find a place to apply what you're good at."),e.qZA()(),e.TgZ(63,"app-question-panel",30)(64,"p",24),e._uU(65,"Your team owns 100% of the game you make during jam. Feel free to turn your game jam games into a full release if you think the game has potential. "),e.qZA()()()()),2&m){const M=e.MAs(12);e.xp6(7),e.Q6J("ngStyle",e.VKq(21,_,i.eventActive?"20px":"auto")),e.xp6(2),e.s9C("link",i.signupLink),e.Q6J("hidden",""==i.signupLink),e.xp6(1),e.Q6J("ngIf",i.eventActive)("ngIfElse",M),e.xp6(3),e.Q6J("link",i.settings.General.discordLink),e.xp6(2),e.Q6J("ngIf",i.eventActive),e.xp6(1),e.Q6J("ngClass",i.breakpointManager.currentBreakpoint),e.xp6(1),e.Q6J("ngClass",i.breakpointManager.currentBreakpoint),e.xp6(3),e.s9C("date",i.startDate),e.s9C("time",i.startDateTime),e.s9C("event-page",i.startDateEventPage),e.xp6(4),e.s9C("date",i.endDate),e.s9C("time",i.endDateTime),e.s9C("event-page",i.endDateEventPage),e.xp6(10),e.s9C("link",i.merchLink),e.Q6J("hidden",""==i.merchLink),e.xp6(14),e.s9C("href",i.startDateCalendarEventLink,e.LSH),e.xp6(1),e.Oqu(i.startDate),e.xp6(2),e.s9C("href",i.endDateCalendarEventLink,e.LSH),e.xp6(1),e.Oqu(i.endDate)}},dependencies:[t.mk,t.O5,t.PC,c.r,C,b.X,Z.I,x.e,w.pp,A.Y],styles:[".flipdown[_ngcontent-%COMP%]{display:block;padding-top:2em;padding-bottom:3em;width:100%}.logo-container[_ngcontent-%COMP%]{margin-left:2em;flex-grow:1}.logo-container.mobile[_ngcontent-%COMP%]{margin-left:0}.split-section[_ngcontent-%COMP%]{display:flex;height:100%}.logo-painted[_ngcontent-%COMP%]{max-width:30vw;max-height:30vw;filter:drop-shadow(0 0 1rem black)}.logo-painted.desktop[_ngcontent-%COMP%]{float:right}@media screen and (max-width: 1400px){.logo-painted[_ngcontent-%COMP%]{display:none}}"]}),o})();var D=a(7763),G=a(6004),U=a(9638),J=a(8399),j=a(3178);const O=[{path:"",component:T}];let E=(()=>{class o{}return o.\u0275fac=function(m){return new(m||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[j.Bz.forChild(O),t.ez,D.I,w.To,G.m,U.ot,J.QX]}),o})()},3512:(y,h,a)=>{a.d(h,{I:()=>c});var t=function(n){return parseFloat(n)},v=a(4537);const l=function e(n){return function(s,r,p,g){null==p&&(p=n),null==g&&(g=p);var f=String(s).match(/[\d.\-\+]*\s*(.*)/)[1]||"";if(f===r)return s;var u=t(s);if("px"!==f)if("em"===f)u=t(s)*t(p);else if("rem"===f)u=t(s)*t(n);else{if("ex"!==f)return s;u=t(s)*t(p)*2}var C=u;if("px"!==r)if("em"===r)C=u/t(g);else if("rem"===r)C=u/t(n);else{if("ex"!==r)return s;C=u/t(g)/2}return parseFloat(C.toFixed(5))+r}}("16px");let c=(()=>{class n{constructor(){}convert(r,p,g=""){return g?l(r,p,g):l(r,p)}toNumber(r){return parseInt(r.replace(/[^0-9.]/g,""))}convertToNumber(r,p,g=""){return this.toNumber(g?l(r,p,g):l(r,p))}}return n.\u0275fac=function(r){return new(r||n)},n.\u0275prov=v.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})()}}]);
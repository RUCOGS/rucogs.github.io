"use strict";(self.webpackChunkrucogs_website=self.webpackChunkrucogs_website||[]).push([[275],{3535:(P,p,o)=>{o.d(p,{B:()=>O});var e=o(4537),f=o(1379),h=o(8692),c=o(92),d=o(8659),u=o(3331),s=o(7406),g=o(9638);function v(i,n){if(1&i){const t=e.EpF();e.TgZ(0,"mat-form-field",2)(1,"mat-label"),e._uU(2,"Search"),e.qZA(),e.TgZ(3,"input",3,4),e.NdJ("ngModelChange",function(a){e.CHM(t);const m=e.oxw();return e.KtG(m.searchText=a)})("keydown.enter",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.emitNewSearchRequest(a.searchText))}),e.qZA(),e.TgZ(5,"button",5),e.NdJ("click",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.emitNewSearchRequest(a.searchText))}),e.TgZ(6,"mat-icon"),e._uU(7,"search"),e.qZA()()()}if(2&i){const t=e.oxw();e.xp6(3),e.Q6J("ngModel",t.searchText)}}function _(i,n){1&i&&(e.TgZ(0,"div",12),e.Hsn(1),e.qZA())}function M(i,n){if(1&i&&(e.TgZ(0,"mat-option",14),e._uU(1),e.qZA()),2&i){const t=n.$implicit;e.Q6J("value",t.value),e.xp6(1),e.Oqu(t.viewValue)}}function C(i,n){if(1&i&&(e.ynx(0),e.YNc(1,M,2,2,"mat-option",13),e.BQk()),2&i){const t=e.oxw(2);e.xp6(1),e.Q6J("ngForOf",t.sortingModes)}}function y(i,n){if(1&i){const t=e.EpF();e.TgZ(0,"mat-checkbox",15,16),e.NdJ("ngModelChange",function(a){e.CHM(t);const m=e.oxw(2);return e.KtG(m.sortAscending=a)})("ngModelChange",function(){e.CHM(t);const a=e.oxw(2);return e.KtG(a.emitSortAscendingChange(a.sortAscending))}),e._uU(2,"Ascending"),e.qZA()}if(2&i){const t=e.oxw(2);e.Q6J("ngModel",t.sortAscending)}}function x(i,n){if(1&i){const t=e.EpF();e.TgZ(0,"div")(1,"h3",6),e._uU(2,"Filters"),e.qZA(),e.TgZ(3,"section")(4,"mat-form-field",7),e.YNc(5,_,2,0,"div",8),e.TgZ(6,"mat-label"),e._uU(7,"Sort by"),e.qZA(),e.TgZ(8,"mat-select",9,10),e.NdJ("ngModelChange",function(a){e.CHM(t);const m=e.oxw();return e.KtG(m.sortingMode=a)})("ngModelChange",function(){e.CHM(t);const a=e.oxw();return e.KtG(a.emitSortingModeChange(a.sortingMode))}),e.YNc(10,C,2,1,"ng-container",1),e.qZA()(),e.YNc(11,y,3,1,"mat-checkbox",11),e.qZA()()}if(2&i){const t=e.oxw();e.xp6(5),e.Q6J("ngIf",!t.afterViewInitialized),e.xp6(3),e.Q6J("ngModel",t.sortingMode),e.xp6(2),e.Q6J("ngIf",t.afterViewInitialized),e.xp6(1),e.Q6J("ngIf",t.ascendingToggle)}}const T=[[["mat-option"]]],E=["mat-option"];let O=(()=>{class i{constructor(t,l,a){this.newSearchRequest$=new e.vpe,this.sortingModeChange=new e.vpe,this.sortAscendingChange=new e.vpe,this.queryOptions=new e.n_E,this.sortingMode="",this.searchText="",this.sortAscending=!0,this.searchBar=!1,this.filterOptions=!1,this.ascendingToggle=!1,this.sortingModes=[],this.afterViewInitialized=!1,this.searchBar=null!=t,this.filterOptions=null!=l,this.ascendingToggle=null!=a}ngOnInit(){}ngAfterViewInit(){this.sortingModes=this.queryOptions.map(t=>new r(t.value,t.viewValue)),setTimeout(()=>{this.afterViewInitialized=!0})}emitNewSearchRequest(t){this.newSearchRequest$.emit(t)}emitSortingModeChange(t){this.sortingModeChange.emit(t)}emitSortAscendingChange(t){this.sortAscendingChange.emit(t)}}return i.\u0275fac=function(t){return new(t||i)(e.$8M("searchBar"),e.$8M("filterOptions"),e.$8M("ascendingToggle"))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-filter-header"]],contentQueries:function(t,l,a){if(1&t&&e.Suo(a,f.ey,4),2&t){let m;e.iGM(m=e.CRH())&&(l.queryOptions=m)}},inputs:{sortingMode:"sortingMode",searchText:"searchText",sortAscending:"sortAscending"},outputs:{newSearchRequest$:"newSearchRequest$",sortingModeChange:"sortingModeChange",sortAscendingChange:"sortAscendingChange"},ngContentSelectors:E,decls:3,vars:2,consts:[["style","width: 100%;","appearance","outline",4,"ngIf"],[4,"ngIf"],["appearance","outline",2,"width","100%"],["type","search","matInput","",3,"ngModel","ngModelChange","keydown.enter"],["searchInput",""],["mat-icon-button","","matSuffix","",3,"click"],[1,"mt-16"],["appearance","outline"],["style","visibility: hidden;",4,"ngIf"],["placeholder","Mode",3,"ngModel","ngModelChange"],["sortingModeSelect",""],[3,"ngModel","ngModelChange",4,"ngIf"],[2,"visibility","hidden"],[3,"value",4,"ngFor","ngForOf"],[3,"value"],[3,"ngModel","ngModelChange"],["sortAscendingCheckbox",""]],template:function(t,l){1&t&&(e.F$t(T),e.TgZ(0,"div"),e.YNc(1,v,8,1,"mat-form-field",0),e.YNc(2,x,12,4,"div",1),e.qZA()),2&t&&(e.xp6(1),e.Q6J("ngIf",l.searchBar),e.xp6(1),e.Q6J("ngIf",l.filterOptions))},dependencies:[h.sg,h.O5,c.Fj,c.JJ,c.On,f.ey,d.KE,d.hX,d.R9,u.Hw,s.Nt,g.lW],styles:["section[_ngcontent-%COMP%]{display:flex;align-content:center;align-items:center;gap:16px;flex-wrap:wrap}"]}),i})();class r{constructor(n,t){this.value=n,this.viewValue=t}}},4276:(P,p,o)=>{o.d(p,{J:()=>v});var e=o(8692),f=o(92),h=o(1379),c=o(8659),d=o(3331),u=o(7406),s=o(9638),g=o(4537);let v=(()=>{class _{}return _.\u0275fac=function(C){return new(C||_)},_.\u0275mod=g.oAB({type:_}),_.\u0275inj=g.cJS({imports:[e.ez,f.u5,h.Ng,c.lN,d.Ps,u.c,s.ot]}),_})()},3037:(P,p,o)=>{o.d(p,{N3:()=>E,Gh:()=>y,UX:()=>O});var e=o(8692),f=o(92),h=o(8399),c=o(108),d=o(7406),u=o(4276),s=o(4537),g=o(8239),v=o(3451),_=o(3528),M=o(8655),C=o(7545);let y=(()=>{class r extends((0,M.AF)(v.tA,v.ej)){constructor(n,t,l){super(),this.cdn=n,this.backend=t,this.scrollService=l,this._values=[],this.currentPage=0,this.valuesPerPage=5,this.fillingPage=!1,this.loaded=!1,this.loadedEverything=!1,this._valuesQuery=function(){var a=(0,g.Z)(function*(m,F){return[]});return function(m,F){return a.apply(this,arguments)}}()}get values(){return this._values}set values(n){this._values=n}ngOnInit(){super.ngOnInit(),this.scrollService.scrolledToBottom$.pipe((0,_.R)(this.onDestroy$)).subscribe(this.onScrollToBottom.bind(this)),this.queryUntilFillPage()}onScrollToBottom(){var n=this;return(0,g.Z)(function*(){yield n.queryUntilFillPage()})()}resetPages(){this.values=[],this.currentPage=0,this.loaded=!1,this.loadedEverything=!1}queryUntilFillPage(){var n=this;return(0,g.Z)(function*(){if(n.fillingPage||n.loadedEverything)return;n.fillingPage=!0;let t=0;n.scrollService.updateScrollData();const l=n.scrollService.position;do{t=yield n.addPage(),n.scrollService.updateScrollData()}while(n.scrollService.maxPosition-l<300&&t>0);n.fillingPage=!1})()}addPage(){var n=this;return(0,g.Z)(function*(){n.loaded=!1;const t=yield n.valuesQuery(n.currentPage*n.valuesPerPage,n.valuesPerPage);return 0==t.length?(n.loaded=!0,n.loadedEverything=!0,0):(t.length<n.valuesPerPage&&(n.loadedEverything=!0),n.values=n.values?.concat(t)??t,n.currentPage++,n.loaded=!0,t.length)})()}get valuesQuery(){return this._valuesQuery}set valuesQuery(n){this._valuesQuery=n}}return r.\u0275fac=function(n){return new(n||r)(s.Y36(C.Ub),s.Y36(C.v$),s.Y36(C.al))},r.\u0275dir=s.lG2({type:r,features:[s.qOj]}),r})(),x=(()=>{class r extends y{constructor(){super(...arguments),this._filteredValuesQuery=function(){var n=(0,g.Z)(function*(t,l,a){return[]});return function(t,l,a){return n.apply(this,arguments)}}()}get valuesQuery(){var n=this;return function(){var t=(0,g.Z)(function*(l,a){return yield n.filteredValuesQuery(n.getFilter(),l,a)});return function(l,a){return t.apply(this,arguments)}}()}get filteredValuesQuery(){return this._filteredValuesQuery}set filteredValuesQuery(n){this._filteredValuesQuery=n}}return r.\u0275fac=function(){let i;return function(t){return(i||(i=s.n5z(r)))(t||r)}}(),r.\u0275dir=s.lG2({type:r,features:[s.qOj]}),r})();var T=o(3535);let E=(()=>{class r extends x{ngAfterViewInit(){!this.filterHeader||this.filterHeader.newSearchRequest$.pipe((0,_.R)(this.onDestroy$)).subscribe(this.onNewSearchRequest.bind(this))}onNewSearchRequest(n){var t=this;return(0,g.Z)(function*(){void 0!==t.filterHeader&&(n=n.toLowerCase(),t.resetPages(),yield t.queryUntilFillPage())})()}}return r.\u0275fac=function(){let i;return function(t){return(i||(i=s.n5z(r)))(t||r)}}(),r.\u0275dir=s.lG2({type:r,viewQuery:function(n,t){if(1&n&&s.Gf(T.B,5),2&n){let l;s.iGM(l=s.CRH())&&(t.filterHeader=l.first)}},features:[s.qOj]}),r})(),O=(()=>{class r{}return r.\u0275fac=function(n){return new(n||r)},r.\u0275mod=s.oAB({type:r}),r.\u0275inj=s.cJS({imports:[e.ez,f.u5,h.QX,c.vV,d.c,u.J]}),r})()},3324:(P,p,o)=>{o.d(p,{m:()=>h});var e=o(4537);const f=["*"];let h=(()=>{class c{constructor(){this.center=!1}ngOnInit(){this.center&&(this.justifyContent="center")}}return c.\u0275fac=function(u){return new(u||c)},c.\u0275cmp=e.Xpm({type:c,selectors:[["app-tag-container"]],hostVars:2,hostBindings:function(u,s){2&u&&e.Udp("justify-content",s.justifyContent)},inputs:{center:"center"},ngContentSelectors:f,decls:1,vars:0,template:function(u,s){1&u&&(e.F$t(),e.Hsn(0))},styles:["[_nghost-%COMP%]{display:flex;flex-wrap:wrap;flex-direction:row;width:100%;height:-moz-fit-content;height:fit-content;gap:8px}"]}),c})()},6387:(P,p,o)=>{o.d(p,{Z:()=>h});var e=o(4537);const f=["*"];let h=(()=>{class c{constructor(){this.color="primary"}ngOnInit(){}}return c.\u0275fac=function(u){return new(u||c)},c.\u0275cmp=e.Xpm({type:c,selectors:[["app-tag"]],inputs:{color:"color"},ngContentSelectors:f,decls:2,vars:3,template:function(u,s){1&u&&(e.F$t(),e.TgZ(0,"div"),e.Hsn(1),e.qZA()),2&u&&e.Gre("app-tag bg ",s.color,"")},styles:["[_nghost-%COMP%]{width:-moz-fit-content;width:fit-content}.bg[_ngcontent-%COMP%]{display:inline-flex;align-items:center;height:100%;width:-moz-fit-content;width:fit-content;border-radius:16px;padding-left:12px;padding-right:12px;padding-top:auto}"]}),c})()}}]);
"use strict";(self.webpackChunkrucogs_website=self.webpackChunkrucogs_website||[]).push([[239],{6410:(B,f,i)=>{i.d(f,{h:()=>b});var g=i(4537),m=i(8692);function P(l,u){1&l&&g._UZ(0,"div",3)}const C=function(l){return{"full-page":l}},_=["*"];let b=(()=>{class l{constructor(c){this.color="blank",this.fullPage=null!=c}ngOnInit(){}}return l.\u0275fac=function(c){return new(c||l)(g.$8M("full-page"))},l.\u0275cmp=g.Xpm({type:l,selectors:[["app-bg-container"]],inputs:{color:"color"},ngContentSelectors:_,decls:4,vars:7,consts:[[1,"app-bg-container","bg",3,"ngClass"],[1,"app-bg-container","content"],["style","\n    flex: 1;\n  ",4,"ngIf"],[2,"flex","1"]],template:function(c,p){1&c&&(g.F$t(),g.TgZ(0,"div",0)(1,"div",1),g.Hsn(2),g.qZA(),g.YNc(3,P,1,0,"div",2),g.qZA()),2&c&&(g.Tol(p.color),g.Q6J("ngClass",g.VKq(5,C,p.fullPage)),g.xp6(3),g.Q6J("ngIf",p.fullPage))},dependencies:[m.mk,m.O5],styles:["[_nghost-%COMP%]{flex:1 1 auto}.bg[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;box-sizing:border-box;padding:var(--content-padding);z-index:1}.content[_ngcontent-%COMP%]{height:100%;display:block;margin:auto;width:100%;max-width:var(--content-width)}.full-page[_ngcontent-%COMP%]{min-height:100vh}"]}),l})()},9210:(B,f,i)=>{i.r(f),i.d(f,{BlogPageModule:()=>q});var g=i(8692),m=i(3178),P=i(4276),C=i(3037),_=i(9518),b=i(7763),l=i(1769),u=i(3535),c=i(8023),p=i(3528),t=i(4537),A=i(6527),x=i(6410),O=i(9424),h=i(92),Z=i(8399),v=i(108),T=i(8659),M=i(7406);const y=["currentPageToggle"];function N(a,r){if(1&a){const e=t.EpF();t.TgZ(0,"mat-button-toggle",5),t.NdJ("click",function(){const s=t.CHM(e).$implicit,d=t.oxw();return t.KtG(d.onClick(s))}),t._uU(1),t.qZA()}if(2&a){const e=r.$implicit;t.xp6(1),t.Oqu(e)}}function I(a,r){if(1&a){const e=t.EpF();t.TgZ(0,"mat-button-toggle",5),t.NdJ("click",function(){const s=t.CHM(e).$implicit,d=t.oxw();return t.KtG(d.onClick(s))}),t._uU(1),t.qZA()}if(2&a){const e=r.$implicit;t.xp6(1),t.Oqu(e)}}function k(a,r){if(1&a){const e=t.EpF();t.TgZ(0,"mat-form-field",10)(1,"mat-label"),t._uU(2,"Page Number"),t.qZA(),t.TgZ(3,"input",11),t.NdJ("ngModelChange",function(o){t.CHM(e);const s=t.oxw();return t.KtG(s.currentPage=o)}),t.qZA()()}if(2&a){const e=t.oxw();t.xp6(3),t.Q6J("max",e.lastPage)("ngModel",e.currentPage)}}let J=(()=>{class a{constructor(e,n){this.changeDetector=e,this._currentPage=1,this.currentPageChange=new t.vpe,this.pageNumberInput=!1,this._lastPage=1,this.pagesAhead=[],this.pagesBehind=[],this.toggleGroupValue="",this.pageNumberInput||(this.pageNumberInput=null!=n)}set currentPage(e){this._currentPage=e,this._currentPage>this.lastPage&&(this._currentPage=this.lastPage),this._currentPage<1&&(this._currentPage=1),this.updatePagesAheadBehind(),this.currentPageChange.emit(this.currentPage)}setCurrentPageEventless(e){this._currentPage=e,this.updatePagesAheadBehind()}get currentPage(){return this._currentPage}set lastPage(e){this._lastPage=e,this.updatePagesAheadBehind()}get lastPage(){return this._lastPage}ngAfterViewInit(){this.updatePagesAheadBehind(),this.currentPageChange.emit(this.currentPage)}updatePagesAheadBehind(){if(this.currentPageToggle){this.pagesAhead=[],this.pagesBehind=[];for(let n=1;n<=2;n++)this.currentPage+n<=this.lastPage&&this.pagesAhead.push(this.currentPage+n),this.currentPage-n>=1&&this.pagesBehind.push(this.currentPage-n);if(this.pagesBehind.length<2){let n=2-this.pagesBehind.length;for(;n>0&&this.pagesAhead[this.pagesAhead.length-1]<this.lastPage;)this.pagesAhead.push(this.pagesAhead[this.pagesAhead.length-1]+1),n--}else if(this.pagesAhead.length<2){let n=2-this.pagesAhead.length;for(;n>0&&this.pagesBehind[this.pagesBehind.length-1]>1;)this.pagesBehind.push(this.pagesBehind[this.pagesBehind.length-1]-1),n--}this.currentPageToggle.checked=!0,this.pagesBehind.reverse(),this.changeDetector.detectChanges()}}onClick(e){"first"==e?this.currentPage=1:"last"==e?this.currentPage=this.lastPage:"previous"==e&&this.currentPage>1?this.currentPage--:"next"==e&&this.currentPage<this.lastPage?this.currentPage++:"number"==typeof e&&(this.currentPage=e),this.updatePagesAheadBehind()}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(t.sBO),t.$8M("pageNumberInput"))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-paginator"]],viewQuery:function(e,n){if(1&e&&t.Gf(y,5),2&e){let o;t.iGM(o=t.CRH())&&(n.currentPageToggle=o.first)}},inputs:{pageNumberInput:"pageNumberInput",currentPage:"currentPage",lastPage:"lastPage"},outputs:{currentPageChange:"currentPageChange"},decls:15,vars:8,consts:[["name","pageNumber","aria-label","Page Number"],[1,"app-paginator","page-button",3,"disabled","click"],["size","24px","icon","arrowExportLeft",1,"icon"],["size","24px","icon","arrowLeft",1,"icon"],["class","app-paginator page-button",3,"click",4,"ngFor","ngForOf"],[1,"app-paginator","page-button",3,"click"],["currentPageToggle",""],["size","24px","icon","arrowRight",1,"icon"],["size","24px","icon","arrowExportRight",1,"icon"],["class","page-number-input","appearance","outline",4,"ngIf"],["appearance","outline",1,"page-number-input"],["matInput","","type","number","value","0","min","1",3,"max","ngModel","ngModelChange"]],template:function(e,n){1&e&&(t.TgZ(0,"mat-button-toggle-group",0)(1,"mat-button-toggle",1),t.NdJ("click",function(){return n.onClick("first")}),t._UZ(2,"ic-icon",2),t.qZA(),t.TgZ(3,"mat-button-toggle",1),t.NdJ("click",function(){return n.onClick("previous")}),t._UZ(4,"ic-icon",3),t.qZA(),t.YNc(5,N,2,1,"mat-button-toggle",4),t.TgZ(6,"mat-button-toggle",5,6),t.NdJ("click",function(){return n.onClick("currentPage")}),t._uU(8),t.qZA(),t.YNc(9,I,2,1,"mat-button-toggle",4),t.TgZ(10,"mat-button-toggle",1),t.NdJ("click",function(){return n.onClick("next")}),t._UZ(11,"ic-icon",7),t.qZA(),t.TgZ(12,"mat-button-toggle",1),t.NdJ("click",function(){return n.onClick("last")}),t._UZ(13,"ic-icon",8),t.qZA()(),t.YNc(14,k,4,2,"mat-form-field",9)),2&e&&(t.xp6(1),t.Q6J("disabled",1==n.currentPage),t.xp6(2),t.Q6J("disabled",1==n.currentPage),t.xp6(2),t.Q6J("ngForOf",n.pagesBehind),t.xp6(3),t.Oqu(n.currentPage),t.xp6(1),t.Q6J("ngForOf",n.pagesAhead),t.xp6(1),t.Q6J("disabled",n.currentPage==n.lastPage),t.xp6(2),t.Q6J("disabled",n.currentPage==n.lastPage),t.xp6(2),t.Q6J("ngIf",n.pageNumberInput))},dependencies:[g.sg,g.O5,h.Fj,h.wV,h.JJ,h.qQ,h.Fd,h.On,Z.ar,v.A9,v.Yi,T.KE,T.hX,M.Nt],styles:["[_nghost-%COMP%]{align-items:flex-start;display:flex;flex-direction:row;flex-wrap:wrap;gap:1em;align-items:center;justify-content:center}mat-button-toggle-group[_ngcontent-%COMP%]{margin-bottom:1.5em}.page-button[_ngcontent-%COMP%]{min-width:48px;font-weight:800;display:flex;align-items:center;justify-content:center}"]}),a})();var w=i(3451),U=i(3324),F=i(6387);function Q(a,r){if(1&a&&t._UZ(0,"div",10),2&a){const e=t.oxw();t.Jzz("background-image: url('",e.article.imagePath,"')"),t.Q6J("hidden",""==e.article.imagePath)}}function E(a,r){if(1&a&&(t.TgZ(0,"app-tag",11),t._uU(1),t.qZA()),2&a){const e=r.$implicit;t.xp6(1),t.Oqu(e)}}let R=(()=>{class a{constructor(e,n){this.router=e,this.breakpointManager=n,this.article=new w.dg("N/A","N/A","N/A","N/A","N/A",[],[])}ngOnInit(){}onClick(){this.router.navigateByUrl("blog/"+this.article.filePath.split(".")[0])}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(m.F0),t.Y36(A.I))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-article-item"]],inputs:{article:"article"},decls:15,vars:6,consts:[[1,"app-article-item","card","blank",3,"click"],["class","app-article-item article-image",3,"hidden","style",4,"ngIf"],[1,"app-article-item","card-content"],[1,"app-article-item","title"],[1,"app-article-item","subtitle-container"],[1,"app-article-item","subtitle-nested-container"],[1,"app-article-item","authors"],[1,"app-article-item","date"],[2,"text-align","left","flex","1"],["color","primary",4,"ngFor","ngForOf"],[1,"app-article-item","article-image",3,"hidden"],["color","primary"]],template:function(e,n){1&e&&(t.TgZ(0,"a",0),t.NdJ("click",function(){return n.onClick()}),t.YNc(1,Q,1,4,"div",1),t.TgZ(2,"div",2)(3,"h2",3),t._uU(4),t.qZA(),t.TgZ(5,"div",4)(6,"div",5)(7,"div",6),t._uU(8),t.qZA(),t.TgZ(9,"div",7),t._uU(10),t.qZA()(),t.TgZ(11,"app-tag-container",8),t.YNc(12,E,2,1,"app-tag",9),t.qZA()(),t.TgZ(13,"p"),t._uU(14),t.qZA()()()),2&e&&(t.xp6(1),t.Q6J("ngIf",n.breakpointManager.matchedBreakpointOrAbove("DESKTOP")),t.xp6(3),t.Oqu(n.article.title),t.xp6(4),t.Oqu(n.article.getAuthorsString()),t.xp6(2),t.Oqu(n.article.date),t.xp6(2),t.Q6J("ngForOf",n.article.tags),t.xp6(2),t.Oqu(n.article.description))},dependencies:[g.sg,g.O5,U.m,F.Z],styles:["[_nghost-%COMP%]{display:flex}.article-image[_ngcontent-%COMP%]{height:100%;width:25%;background-size:cover;background-position:center;border-top-left-radius:6px;border-bottom-left-radius:6px}.subtitle-nested-container[_ngcontent-%COMP%]{display:flex;flex-direction:row;font-weight:800;opacity:.6}.date[_ngcontent-%COMP%]{margin-left:1em}.title[_ngcontent-%COMP%]{margin-bottom:.25em}.subtitle-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.25em;margin-bottom:1em}.card[_ngcontent-%COMP%]{cursor:pointer;display:flex;position:relative;width:auto;height:auto;width:100%;border-style:solid;border-width:2px;border-radius:8px;box-sizing:border-box}.card-content[_ngcontent-%COMP%]{padding:2.25em;width:75%}.outlined[_ngcontent-%COMP%]{border-width:2px}"]}),a})();const D=["paginatorTop"],Y=["paginatorBottom"];function $(a,r){1&a&&(t.TgZ(0,"div")(1,"h1",9),t._uU(2,"No results found..."),t.qZA()())}function G(a,r){1&a&&t._UZ(0,"app-article-item",10),2&a&&t.Q6J("article",r.$implicit)}let S=(()=>{class a{constructor(e,n){this.changeDetector=e,this.breakpointManager=n,this.currentPage=1,this.articles=l.Fd,this.filteredArticles=[],this.activeArticles=[],this.lastPage=10,this.articlesPerPage=5,this.onDestroy$=new c.x}ngAfterViewInit(){!this.filterHeader||!this.paginatorBottom||!this.paginatorTop||(this.filterHeader.newSearchRequest$.pipe((0,p.R)(this.onDestroy$)).subscribe(this.onNewSearchRequest.bind(this)),this.paginatorTop.currentPageChange.pipe((0,p.R)(this.onDestroy$)).subscribe(this.onCurrentPageChange.bind(this)),this.paginatorBottom.currentPageChange.pipe((0,p.R)(this.onDestroy$)).subscribe(this.onCurrentPageChange.bind(this)),this.filteredArticles=[...this.articles],this.updateLastPage(),this.onNewSearchRequest(""),this.onCurrentPageChange(1),this.changeDetector.detectChanges())}onCurrentPageChange(e){!this.paginatorBottom||!this.paginatorTop||(this.paginatorTop.currentPage!=e&&this.paginatorTop.setCurrentPageEventless(e),this.paginatorBottom.currentPage!=e&&this.paginatorBottom.setCurrentPageEventless(e),this.currentPage=e,this.updateArticleEntries())}updateArticleEntries(){this.activeArticles=[];for(let e=0;e<this.articlesPerPage;e++){const n=(this.currentPage-1)*this.articlesPerPage+e;if(n>=this.filteredArticles.length)break;this.activeArticles.push(this.filteredArticles[n])}}onNewSearchRequest(e){if(void 0!==this.filterHeader){if(""===(e=e.toLowerCase()))this.filteredArticles=[...this.articles],this.filteredArticles.sort((n,o)=>{const s=new Date(n.date),d=new Date(o.date);return s<d?1:s>d?-1:0});else{this.filteredArticles=[];let n=[];for(let o of this.articles){const s=this.getArticleText(o).indexOf(e);s>=0&&n.push(new z(o,s))}n.sort((o,s)=>s.ranking-o.ranking),this.filteredArticles=n.map(o=>o.article)}this.updateLastPage(),this.onCurrentPageChange(1)}}updateLastPage(){this.lastPage=Math.ceil(this.filteredArticles.length/this.articlesPerPage)}getArticleText(e){return(e.title+" "+e.description+" "+e.date+" "+e.authors.join(" ")+" "+e.tags.join(" ")).toLowerCase()}}return a.\u0275fac=function(e){return new(e||a)(t.Y36(t.sBO),t.Y36(A.I))},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-blog-page"]],viewQuery:function(e,n){if(1&e&&(t.Gf(u.B,5),t.Gf(D,5),t.Gf(Y,5)),2&e){let o;t.iGM(o=t.CRH())&&(n.filterHeader=o.first),t.iGM(o=t.CRH())&&(n.paginatorTop=o.first),t.iGM(o=t.CRH())&&(n.paginatorBottom=o.first)}},decls:10,vars:6,consts:[["title","Blog"],["color","blank"],["searchBar",""],[1,"app-blog-page","paginator",3,"lastPage","pageNumberInput"],["paginatorTop",""],[1,"app-blog-page","articles-container"],[4,"ngIf"],[3,"article",4,"ngFor","ngForOf"],["paginatorBottom",""],[1,"app-blog-page","no-results-text"],[3,"article"]],template:function(e,n){1&e&&(t._UZ(0,"app-page-header",0),t.TgZ(1,"app-bg-container",1),t._UZ(2,"app-filter-header",2)(3,"app-paginator",3,4),t.TgZ(5,"div",5),t.YNc(6,$,3,0,"div",6),t.YNc(7,G,1,1,"app-article-item",7),t.qZA(),t._UZ(8,"app-paginator",3,8),t.qZA()),2&e&&(t.xp6(3),t.Q6J("lastPage",n.lastPage)("pageNumberInput",n.breakpointManager.matchedBreakpointOrAbove("DESKTOP")),t.xp6(3),t.Q6J("ngIf",0===n.activeArticles.length),t.xp6(1),t.Q6J("ngForOf",n.activeArticles),t.xp6(1),t.Q6J("lastPage",n.lastPage)("pageNumberInput",n.breakpointManager.matchedBreakpointOrAbove("DESKTOP")))},dependencies:[g.sg,g.O5,x.h,O.q,J,u.B,R],styles:[".articles-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:1em;margin-top:2em;margin-bottom:2em}.paginator[_ngcontent-%COMP%]{margin-left:auto;margin-right:auto}.no-results-text[_ngcontent-%COMP%]{text-align:center;margin-bottom:0}"]}),a})();class z{constructor(r,e){this.article=r,this.ranking=e}}const H=[{path:"",component:S}];let q=(()=>{class a{}return a.\u0275fac=function(e){return new(e||a)},a.\u0275mod=t.oAB({type:a}),a.\u0275inj=t.cJS({imports:[m.Bz.forChild(H),g.ez,b.I,C.UX,P.J,_.I]}),a})()}}]);
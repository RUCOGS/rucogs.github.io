(self.webpackChunkrucogs_website=self.webpackChunkrucogs_website||[]).push([[742],{7946:function(T,P){var s,u;u=typeof global<"u"?global:typeof window<"u"?window:this,s=function(){return function(u){"use strict";var x={navClass:"active",contentClass:"active",nested:!1,nestedClass:"active",offset:0,reflow:!1,events:!0},f=function(o,a,r){if(r.settings.events){var d=new CustomEvent(o,{bubbles:!0,cancelable:!0,detail:r});a.dispatchEvent(d)}},C=function(o){var a=0;if(o.offsetParent)for(;o;)a+=o.offsetTop,o=o.offsetParent;return a>=0?a:0},g=function(o){o&&o.sort(function(a,r){return C(a.content)<C(r.content)?-1:1})},y=function(o,a,r){var p,d=o.getBoundingClientRect(),m="function"==typeof(p=a).offset?parseFloat(p.offset()):parseFloat(p.offset);return r?parseInt(d.bottom,10)<(u.innerHeight||document.documentElement.clientHeight):parseInt(d.top,10)<=m},N=function(o,a){var m,p,r=o[o.length-1];if(m=r,p=a,u.innerHeight+u.pageYOffset>=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)&&y(m.content,p,!0))return r;for(var d=o.length-1;d>=0;d--)if(y(o[d].content,a))return o[d]},w=function(o,a){if(a.nested&&o.parentNode){var r=o.parentNode.closest("li");r&&(r.classList.remove(a.nestedClass),w(r,a))}},A=function(o,a){if(o){var r=o.nav.closest("li");r&&(r.classList.remove(a.navClass),o.content.classList.remove(a.contentClass),w(r,a),f("gumshoeDeactivate",r,{link:o.nav,content:o.content,settings:a}))}},Z=function(o,a){if(a.nested){var r=o.parentNode.closest("li");r&&(r.classList.add(a.nestedClass),Z(r,a))}};return function(o,a){var r,d,m,p,_,S={setup:function(){r=document.querySelectorAll(o),d=[],Array.prototype.forEach.call(r,function(v){var h=document.getElementById(decodeURIComponent(v.hash.substr(1)));h&&d.push({nav:v,content:h})}),g(d)},detect:function(){var v=N(d,_);v?m&&v.content===m.content||(A(m,_),function(h,M){if(h){var b=h.nav.closest("li");b&&(b.classList.add(M.navClass),h.content.classList.add(M.contentClass),Z(b,M),f("gumshoeActivate",b,{link:h.nav,content:h.content,settings:M}))}}(v,_),m=v):m&&(A(m,_),m=null)}},E=function(v){p&&u.cancelAnimationFrame(p),p=u.requestAnimationFrame(S.detect)},B=function(v){p&&u.cancelAnimationFrame(p),p=u.requestAnimationFrame(function(){g(d),S.detect()})};return S.destroy=function(){m&&A(m,_),u.removeEventListener("scroll",E,!1),_.reflow&&u.removeEventListener("resize",B,!1),d=null,r=null,m=null,p=null,_=null},_=function(){var v={};return Array.prototype.forEach.call(arguments,function(h){for(var M in h){if(!h.hasOwnProperty(M))return;v[M]=h[M]}}),v}(x,a||{}),S.setup(),S.detect(),u.addEventListener("scroll",E,!1),_.reflow&&u.addEventListener("resize",B,!1),S}}(u)}.apply(P,[]),void 0!==s&&(T.exports=s)},3324:(T,P,l)=>{"use strict";l.d(P,{m:()=>x});var s=l(4537);const u=["*"];let x=(()=>{class f{constructor(){this.center=!1}ngOnInit(){this.center&&(this.justifyContent="center")}}return f.\u0275fac=function(g){return new(g||f)},f.\u0275cmp=s.Xpm({type:f,selectors:[["app-tag-container"]],hostVars:2,hostBindings:function(g,y){2&g&&s.Udp("justify-content",y.justifyContent)},inputs:{center:"center"},ngContentSelectors:u,decls:1,vars:0,template:function(g,y){1&g&&(s.F$t(),s.Hsn(0))},styles:["[_nghost-%COMP%]{display:flex;flex-wrap:wrap;flex-direction:row;width:100%;height:-moz-fit-content;height:fit-content;gap:.5em}"]}),f})()},6387:(T,P,l)=>{"use strict";l.d(P,{Z:()=>x});var s=l(4537);const u=["*"];let x=(()=>{class f{constructor(){this.color="primary"}ngOnInit(){}}return f.\u0275fac=function(g){return new(g||f)},f.\u0275cmp=s.Xpm({type:f,selectors:[["app-tag"]],inputs:{color:"color"},ngContentSelectors:u,decls:2,vars:3,template:function(g,y){1&g&&(s.F$t(),s.TgZ(0,"div"),s.Hsn(1),s.qZA()),2&g&&s.Gre("app-tag bg ",y.color,"")},styles:["[_nghost-%COMP%]{width:-moz-fit-content;width:fit-content}.bg[_ngcontent-%COMP%]{display:inline-flex;align-items:center;height:100%;width:-moz-fit-content;width:fit-content;border-radius:5em;padding-left:.75em;padding-right:.75em;padding-top:auto}"]}),f})()},7742:(T,P,l)=>{"use strict";l.r(P),l.d(P,{ArticlePageComponent:()=>L,ArticlePageModule:()=>Y});var s=l(8692),u=l(3178),x=l(9638),f=l(6438),C=l(7545),g=l(8399),y=l(7657),t=l(4537);let N=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[s.ez,u.Bz,g.QX]}),n})(),w=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[s.ez,y.JP,x.ot,f.t,N,C.fF,g.QX]}),n})(),A=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[s.ez,s.ez,N,w]}),n})();var Z=l(9518),o=l(7763),a=l(1769),r=l(3794),d=l(3324),m=l(6387),p=l(4091);const _=(0,p.X$)("zoomAnimation",[(0,p.eR)("void => *",[(0,p.oB)({opacity:0,transform:"translateY(32px) scale(0)"}),(0,p.jt)("400ms cubic-bezier(0.35, 0, 0.25, 1)",(0,p.oB)({opacity:1,transform:"translateY(0) scale(1)"}))]),(0,p.eR)("* => void",[(0,p.oB)({opacity:1,transform:"translateY(0)"}),(0,p.jt)("300ms cubic-bezier(0.35, 0, 0.25, 1)",(0,p.oB)({opacity:0,transform:"translateY(32px)"}))])]);var S=l(6527),E=l(7946),B=l(9676);function v(n,c){if(1&n&&(t.TgZ(0,"li")(1,"a",2),t._uU(2),t.qZA()()),2&n){const e=c.$implicit;t.xp6(1),t.Q6J("fragment",e.id),t.xp6(1),t.Oqu(e.innerHTML)}}let h=(()=>{class n{constructor(e,i){this.elementRef=e,this.zone=i}ngOnChanges(e){e.headings&&this.headings&&this.headings?.length>0&&this.setScrollSpy()}ngOnDestroy(){this.destroyScrollSpy()}destroyScrollSpy(){this.scrollSpy&&this.scrollSpy.destroy()}setScrollSpy(){this.scrollSpy?this.scrollSpy.setup():this.zone.onStable.pipe((0,B.P)()).subscribe(()=>{const e=this.elementRef.nativeElement;this.scrollSpy=new E(`${e.tagName}.${e.className} a`,{offset:64,reflow:!0})})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(t.SBq),t.Y36(t.R0b))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-scrollspy-nav"]],inputs:{headings:"headings"},features:[t.TTD],decls:2,vars:1,consts:[[1,"scrollspy-nav"],[4,"ngFor","ngForOf"],["routerLink",".",3,"fragment"]],template:function(e,i){1&e&&(t.TgZ(0,"ul",0),t.YNc(1,v,3,2,"li",1),t.qZA()),2&e&&(t.xp6(1),t.Q6J("ngForOf",i.headings))},dependencies:[s.sg,u.yS],styles:["ul.scrollspy-nav[_ngcontent-%COMP%]{padding:0}ul.scrollspy-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{border-radius:2px;font-size:14px;font-weight:700;list-style:none;padding:4px 0 4px 16px}ul.scrollspy-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%], ul.scrollspy-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]:active, ul.scrollspy-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]:focus, ul.scrollspy-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]:hover{text-decoration:none}ul.scrollspy-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:not(.active){border-color:transparent;opacity:.6}"],changeDetection:0}),n})();function M(n,c){if(1&n){const e=t.EpF();t.TgZ(0,"button",5),t.NdJ("click",function(){t.CHM(e);const O=t.oxw(2);return t.KtG(O.onScrollUp())}),t._UZ(1,"ic-icon",6),t.qZA()}2&n&&t.Q6J("@zoomAnimation",void 0)}function b(n,c){if(1&n&&(t.TgZ(0,"div"),t.YNc(1,M,2,1,"button",4),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",e.showScrollUpButton)}}function z(n,c){if(1&n){const e=t.EpF();t.TgZ(0,"button",10),t.NdJ("click",function(){t.CHM(e);const O=t.oxw(2);return t.KtG(O.onScrollUp())}),t._UZ(1,"ic-icon",11),t.qZA()}2&n&&t.Q6J("@zoomAnimation",void 0)}function I(n,c){if(1&n&&(t.TgZ(0,"div",7),t._UZ(1,"app-scrollspy-nav",8),t.YNc(2,z,2,1,"button",9),t.qZA()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("headings",e.headings),t.xp6(1),t.Q6J("ngIf",e.showScrollUpButton)}}const U=["*"];let k=(()=>{class n{constructor(e){this.breakpointManager=e,this.showScrollUpButton=!1}onWindowScroll(){this.showScrollUpButton=Math.ceil(window.pageYOffset)>64}onScrollUp(){window.scrollTo(0,0),location.hash=""}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(S.I))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-scrollspy-nav-layout"]],hostBindings:function(e,i){1&e&&t.NdJ("scroll",function(){return i.onWindowScroll()},!1,t.Jf7)},inputs:{headings:"headings"},ngContentSelectors:U,decls:5,vars:2,consts:[[2,"display","flex","flex-direction","row","gap","2.5em"],[2,"flex","1 1 calc(100% - 13.75em)"],[4,"ngIf"],["style","\n    display: flex;\n    flex-direction: column;\n    flex: 1 0 180px;\n    align-items: flex-start;\n\n    position: sticky;\n    top: 80px;\n    align-self: flex-start\n  ",4,"ngIf"],["class","scrollup-button--fixed","mat-fab","","color","primary",3,"click",4,"ngIf"],["mat-fab","","color","primary",1,"scrollup-button--fixed",3,"click"],["size","2em","icon","chevronUp",1,"app-button","iconify","icon","icon-large"],[2,"display","flex","flex-direction","column","flex","1 0 180px","align-items","flex-start","position","sticky","top","80px","align-self","flex-start"],[3,"headings"],["class","scrollup-button","mat-mini-fab","","color","primary",3,"click",4,"ngIf"],["mat-mini-fab","","color","primary",1,"scrollup-button",3,"click"],["size","1.5em","icon","chevronUp",1,"app-button","iconify","icon"]],template:function(e,i){1&e&&(t.F$t(),t.TgZ(0,"div",0)(1,"div",1),t.Hsn(2),t.YNc(3,b,2,1,"div",2),t.qZA(),t.YNc(4,I,3,2,"div",3),t.qZA()),2&e&&(t.xp6(3),t.Q6J("ngIf",i.breakpointManager.matchedBreakpointOrBelow("MOBILE")),t.xp6(1),t.Q6J("ngIf",i.breakpointManager.matchedBreakpointOrAbove("DESKTOP")))},dependencies:[s.O5,x.lW,h,g.ar],styles:[".footer[_ngcontent-%COMP%]{margin:32px 0 8px}.footer-text[_ngcontent-%COMP%]{display:block;font-size:13px;padding-top:4px}.icon-large[_ngcontent-%COMP%]{position:relative;top:-5px}.icon[_ngcontent-%COMP%]{position:relative;top:-2px}.scrollup-button[_ngcontent-%COMP%]{margin:14px}.scrollup-button--fixed[_ngcontent-%COMP%]{position:fixed;bottom:32px;right:32px;z-index:10}"],data:{animation:[_]},changeDetection:0}),n})();function J(n,c){if(1&n&&(t.TgZ(0,"app-tag",11),t._uU(1),t.qZA()),2&n){const e=c.$implicit;t.xp6(1),t.Oqu(e)}}let L=(()=>{class n{constructor(e,i,O,R){this.activatedRoute=e,this.markdownService=i,this.elementRef=O,this.seoService=R,this.articles=a.Fd,this.articlesDir=a.Fp,this.markdownService.renderer.link=(D,F,Q)=>`<a href='${D}'`+(F?`title='${F}'`:"")+`target='_blank'>${Q}</a>`}ngOnInit(){var e=this.activatedRoute.snapshot.paramMap.get("article");if(e){const i=decodeURIComponent(e);this.article=this.articles.find(O=>O.filePath==i),this.seoService.update({titleAll:this.article?.title,descriptionAll:this.article?.description,ogImage:this.article?.imagePath})}}onLoad(){this.setHeadings()}setHeadings(){const e=[];this.elementRef.nativeElement.querySelectorAll("h2").forEach(i=>e.push(i)),this.headings=e}getBgStyle(){return{"background-image":"linear-gradient(to bottom, var(--background-color), #00000000), url("+this.article?.imagePath+")"}}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(u.gz),t.Y36(y.Zy),t.Y36(t.SBq),t.Y36(r.L))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-article-page"]],inputs:{article:"article"},decls:14,vars:9,consts:[[1,"app-article-page","bg"],[1,"app-article-page","content-container"],[3,"headings"],[1,"app-article-page","title","mat-display-4"],[1,"app-article-page","subtitle-container"],[1,"app-article-page","subtitle-nested-container"],[1,"app-article-page","authors"],[1,"app-article-page","date"],[2,"text-align","left","flex","1"],["color","primary",4,"ngFor","ngForOf"],["lineNumbers","",3,"src","load"],["color","primary"]],template:function(e,i){1&e&&(t._UZ(0,"div",0),t.TgZ(1,"div",1)(2,"app-scrollspy-nav-layout",2)(3,"h1",3),t._uU(4),t.qZA(),t.TgZ(5,"div",4)(6,"div",5)(7,"div",6),t._uU(8),t.qZA(),t.TgZ(9,"div",7),t._uU(10),t.qZA()(),t.TgZ(11,"app-tag-container",8),t.YNc(12,J,2,1,"app-tag",9),t.qZA()(),t.TgZ(13,"markdown",10),t.NdJ("load",function(){return i.onLoad()}),t.qZA()()()),2&e&&(t.Akn(i.getBgStyle()),t.xp6(2),t.Q6J("headings",i.headings),t.xp6(2),t.Oqu(null==i.article?null:i.article.title),t.xp6(4),t.Oqu(null==i.article?null:i.article.getAuthorsString()),t.xp6(2),t.Oqu(null==i.article?null:i.article.date),t.xp6(2),t.Q6J("ngForOf",null==i.article?null:i.article.tags),t.xp6(1),t.hYB("src","",i.articlesDir,"",null==i.article?null:i.article.filePath,".md"))},dependencies:[s.sg,d.m,m.Z,y.lF,k],styles:["markdown[_ngcontent-%COMP%]  img{max-width:100%}.content-container[_ngcontent-%COMP%]{margin-left:auto;margin-right:auto;padding:var(--content-padding);max-width:var(--markdown-content-width)}.bg[_ngcontent-%COMP%]{position:relative;display:flex;box-sizing:border-box;min-height:calc(50vh - var(--site-header-height));padding:var(--content-padding);background-size:cover;background-position:center}.subtitle-nested-container[_ngcontent-%COMP%]{display:flex;flex-direction:row;font-weight:800;opacity:.6}.date[_ngcontent-%COMP%]{margin-left:1em}.title[_ngcontent-%COMP%]{margin-bottom:.25em}.subtitle-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:.25em;margin-bottom:3em}"]}),n})();const H=[{path:"",component:L}];let Y=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[u.Bz.forChild(H),s.ez,Z.I,y.JP,A,o.I,a.Mc]}),n})()}}]);
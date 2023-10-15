"use strict";(self.webpackChunkrucogs_website=self.webpackChunkrucogs_website||[]).push([[935],{8340:(L,u,n)=>{n.d(u,{e:()=>h});var t=n(4537),l=n(8692);const p=function(s,g,r,o){return{"dog-ear":s,"full-page":g,shadow:r,"full-width":o}},v=function(s){return{last:s}},b=["*"];let h=(()=>{class s{constructor(r,o,P,C,e,M,y){this.elementRef=r,this.title="",this.color="blank",this.bgImage="",this.bgRepeatMode="",this.bgPosition="",this.last=null!=o,this.dogEar=null!=P,this.fullPage=null!=C,this.fullWidth=null!=e,this.shadow=null!=M,this.bottomGradient=null!=y}ngOnInit(){this.last=this.elementRef.nativeElement.hasAttribute("last"),this.dogEar=this.elementRef.nativeElement.hasAttribute("dog-ear"),this.fullPage=this.elementRef.nativeElement.hasAttribute("full-page"),this.fullWidth=this.elementRef.nativeElement.hasAttribute("full-width"),this.shadow=this.elementRef.nativeElement.hasAttribute("shadow")}getBgStyle(){return{...this.bgImage&&{"background-image":"linear-gradient(var(--background-color), #00000000"+(this.bottomGradient?", var(--background-color)":"")+"), url("+this.bgImage+")"},...""!==this.bgRepeatMode&&{"background-repeat":this.bgRepeatMode,"background-size":"auto"},...""!==this.bgPosition&&{"background-position":this.bgPosition}}}}return s.\u0275fac=function(r){return new(r||s)(t.Y36(t.SBq),t.$8M("last"),t.$8M("dog-ear"),t.$8M("full-page"),t.$8M("full-width"),t.$8M("shadow"),t.$8M("bottom-gradient"))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-section"]],inputs:{title:"title",color:"color",bgImage:"bgImage",bgRepeatMode:"bgRepeatMode",bgPosition:"bgPosition"},ngContentSelectors:b,decls:6,vars:18,consts:[[3,"ngClass","ngStyle"],[1,"content"],[1,"mat-display-2","app-section","mb-16",3,"hidden"],[3,"ngClass"]],template:function(r,o){1&r&&(t.F$t(),t.TgZ(0,"div",0)(1,"div",1)(2,"h1",2),t._uU(3),t.qZA(),t.Hsn(4),t.qZA()(),t._UZ(5,"div",3)),2&r&&(t.Gre("app-section bg main-bg ",o.color,""),t.Q6J("ngClass",t.l5B(11,p,o.dogEar,o.fullPage,o.shadow,o.fullWidth))("ngStyle",o.getBgStyle()),t.xp6(2),t.Q6J("hidden",""===o.title),t.xp6(1),t.Oqu(o.title),t.xp6(2),t.Gre("app-section bg bottom ",o.color,""),t.Q6J("ngClass",t.VKq(16,v,o.last)))},dependencies:[l.mk,l.PC],styles:["[_nghost-%COMP%]{display:block;overflow:hidden}.main-bg[_ngcontent-%COMP%]{height:100%;position:relative;display:flex;align-items:center;box-sizing:border-box;padding:var(--content-padding);padding-top:var(--dog-ear-padding);padding-bottom:var(--dog-ear-padding);background-size:cover;background-position:center}.dog-ear[_ngcontent-%COMP%]{border-top-left-radius:var(--dog-ear)}.full-page[_ngcontent-%COMP%]{min-height:100vh}.main-bg.full-width[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}.main-bg.full-width[_ngcontent-%COMP%]   .content[_ngcontent-%COMP%]{width:100%}div.last[_ngcontent-%COMP%]{height:0px}.bottom[_ngcontent-%COMP%]{position:absolute;height:128px;width:100%}.content[_ngcontent-%COMP%]{margin:auto;max-width:var(--content-width)}"]}),s})()},2935:(L,u,n)=>{n.r(u),n.d(u,{LoginPageModule:()=>E});var t=n(8692),l=n(92),p=n(8659),v=n(3331),b=n(7406),h=n(3178),s=n(7763),g=n(8399),r=n(8239),o=n(8023),P=n(9676),C=n(3528),e=n(4537),M=n(9942),y=n(1241),O=n(2709),S=n(9638),R=n(8340);const w=[{path:"",component:(()=>{class a{constructor(i,d,c,f){this.authService=d,this.router=c,this.securityService=f,this.hide=!0,this.errorMessage="",this.isLoginFailed=!1,this.onDestroy$=new o.x,this.form=i.group({username:[null,[l.kI.required]],password:[null,[l.kI.required]]})}ngOnDestroy(){this.onDestroy$.next(),this.onDestroy$.complete()}socialLogin(i){this.performLogin(this.authService.socialLogin(i))}performLogin(i){var c,d=this;i.pipe((0,P.P)(),(0,C.R)(this.onDestroy$)).subscribe({next:(c=(0,r.Z)(function*(f){d.isLoginFailed=!1,yield d.securityService.waitUntilReady(),d.router.navigateByUrl(`/members/${f.user.username}`)}),function(I){return c.apply(this,arguments)}),error:c=>{this.errorMessage=c.error.message,this.isLoginFailed=!0}})}onLoginSubmit(){const i=this.form.value;this.performLogin(this.authService.login(i.username,i.password))}}return a.\u0275fac=function(i){return new(i||a)(e.Y36(l.QS),e.Y36(M.e),e.Y36(h.F0),e.Y36(y.I))},a.\u0275cmp=e.Xpm({type:a,selectors:[["app-login-page"]],decls:8,vars:0,consts:[["full-page","","full-width",""],[1,"app-login-page","login-container"],[1,"app-login-page","social-login-container"],["mat-flat-button","","type","submit","color","#5865F2","text-color","#ffffff","tall-button","",3,"click"],["size","24px","icon","discord",1,"app-button","iconify","icon"]],template:function(i,d){1&i&&(e.TgZ(0,"app-section",0)(1,"div",1)(2,"h1"),e._uU(3,"Log in"),e.qZA(),e.TgZ(4,"div",2)(5,"button",3),e.NdJ("click",function(){return d.socialLogin("discord")}),e._UZ(6,"ic-icon",4),e._uU(7," Login with Discord "),e.qZA()()()())},dependencies:[O.v,S.lW,R.e,g.ar],styles:[".login-container[_ngcontent-%COMP%]{width:min(500px,100%);margin:auto}.social-login-container[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{width:100%;margin-bottom:1em}.login-form[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{width:100%;margin-bottom:1em}.button[_ngcontent-%COMP%]{width:100%}input[type=password][_ngcontent-%COMP%]{font-family:Roboto;font-style:normal;font-weight:700}"]}),a})(),data:{title:"Login"}}];let E=(()=>{class a{}return a.\u0275fac=function(i){return new(i||a)},a.\u0275mod=e.oAB({type:a}),a.\u0275inj=e.cJS({imports:[h.Bz.forChild(w),t.ez,s.I,g.QX,p.lN,b.c,v.Ps,l.UX]}),a})()}}]);
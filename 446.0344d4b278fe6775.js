"use strict";(self.webpackChunkrucogs_website=self.webpackChunkrucogs_website||[]).push([[446],{5446:(k,p,i)=>{i.r(p),i.d(p,{SignupPageModule:()=>Y});var g=i(8692),r=i(92),Z=i(8023),T=i(9676),y=i(3528),t=i(4537);const l="auth-token";let P=(()=>{class e{constructor(){}signOut(){window.sessionStorage.clear()}saveToken(n){window.sessionStorage.removeItem(l),window.sessionStorage.setItem(l,n)}getToken(){return window.sessionStorage.getItem(l)}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var b=i(9942),c=i(3178),C=i(2709),U=i(9638),I=i(8340),f=i(8399),u=i(8659),d=i(3331),S=i(7406);function A(e,a){1&e&&(t.TgZ(0,"mat-error"),t._uU(1," Username is required "),t.qZA())}function w(e,a){1&e&&(t.TgZ(0,"mat-error"),t._uU(1," Email addresss is required "),t.qZA())}function J(e,a){1&e&&(t.TgZ(0,"mat-error"),t._uU(1," Email addresss is invalid "),t.qZA())}function N(e,a){1&e&&(t.TgZ(0,"mat-error"),t._uU(1," Password is required "),t.qZA())}function M(e,a){if(1&e&&(t.TgZ(0,"mat-error"),t._uU(1),t.qZA()),2&e){const n=t.oxw();t.xp6(1),t.hij(" Signup failed: ",n.errorMessage," ")}}let O=(()=>{class e{constructor(n,o,s,m){this.tokenStorage=o,this.authService=s,this.router=m,this.hide=!0,this.errorMessage="",this.isSignupFailed=!1,this.onDestroy$=new Z.x,this.form=n.group({username:[null,[r.kI.required]],email:[null,[r.kI.required,r.kI.email]],password:[null,[r.kI.required]]})}ngOnDestroy(){this.onDestroy$.next(),this.onDestroy$.complete()}socialSignup(n){this.performSignup(this.authService.socialLogin(n))}performSignup(n){n.pipe((0,T.P)(),(0,y.R)(this.onDestroy$)).subscribe({next:o=>{this.isSignupFailed=!1,this.router.navigateByUrl("/user/"+o.user.username)},error:o=>{this.errorMessage=o.error.message,this.isSignupFailed=!0}})}onSignupSubmit(){const n=this.form.value;this.performSignup(this.authService.signup(n.username,n.email,n.password))}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(r.QS),t.Y36(P),t.Y36(b.e),t.Y36(c.F0))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-signup-page"]],decls:34,vars:10,consts:[["full-page",""],[1,"app-signup-page","signup-container"],[1,"app-signup-page","signup-form",3,"formGroup","ngSubmit"],[1,"mb-32"],["appearance","fill"],["matInput","","formControlName","username"],[4,"ngIf"],["matInput","","formControlName","email"],["matInput","","formControlName","password",3,"type"],["type","button","mat-icon-button","","matSuffix","",3,"click"],["mat-flat-button","","type","submit","color","primary","tall-button","",1,"mt-16"],[1,"app-signup-page","social-signup-container"],["mat-flat-button","","type","submit","color","primary","tall-button","",3,"click"],["data-height","24px","icon","google",1,"app-button","iconify","icon"],["mat-flat-button","","type","submit","color","#5865F2","text-color","#ffffff","tall-button","",3,"click"],["data-height","24px","icon","discord",1,"app-button","iconify","icon"]],template:function(n,o){if(1&n&&(t.TgZ(0,"app-section",0)(1,"div",1)(2,"form",2),t.NdJ("ngSubmit",function(){return o.onSignupSubmit()}),t.TgZ(3,"h1",3),t._uU(4,"Sign up"),t.qZA(),t.TgZ(5,"mat-form-field",4)(6,"mat-label"),t._uU(7,"Username"),t.qZA(),t._UZ(8,"input",5),t.YNc(9,A,2,0,"mat-error",6),t.qZA(),t.TgZ(10,"mat-form-field",4)(11,"mat-label"),t._uU(12,"Email"),t.qZA(),t._UZ(13,"input",7),t.YNc(14,w,2,0,"mat-error",6),t.YNc(15,J,2,0,"mat-error",6),t.qZA(),t.TgZ(16,"mat-form-field",4)(17,"mat-label"),t._uU(18,"Password"),t.qZA(),t._UZ(19,"input",8),t.TgZ(20,"button",9),t.NdJ("click",function(){return o.hide=!o.hide}),t.TgZ(21,"mat-icon"),t._uU(22),t.qZA()(),t.YNc(23,N,2,0,"mat-error",6),t.YNc(24,M,2,1,"mat-error",6),t.qZA(),t.TgZ(25,"button",10),t._uU(26,"Sign up"),t.qZA()(),t.TgZ(27,"div",11)(28,"button",12),t.NdJ("click",function(){return o.socialSignup("google")}),t._UZ(29,"ic-icon",13),t._uU(30," Sign up with Google "),t.qZA(),t.TgZ(31,"button",14),t.NdJ("click",function(){return o.socialSignup("discord")}),t._UZ(32,"ic-icon",15),t._uU(33," Sign up with Discord "),t.qZA()()()()),2&n){let s,m,h,v;t.xp6(2),t.Q6J("formGroup",o.form),t.xp6(7),t.Q6J("ngIf",null==(s=o.form.get("username"))?null:s.hasError("required")),t.xp6(5),t.Q6J("ngIf",null==(m=o.form.get("email"))?null:m.hasError("required")),t.xp6(1),t.Q6J("ngIf",null==(h=o.form.get("email"))?null:h.hasError("email")),t.xp6(4),t.Q6J("type",o.hide?"password":"text"),t.xp6(1),t.uIk("aria-label","Hide password")("aria-pressed",o.hide),t.xp6(2),t.Oqu(o.hide?"visibility_off":"visibility"),t.xp6(1),t.Q6J("ngIf",null==(v=o.form.get("password"))?null:v.hasError("required")),t.xp6(1),t.Q6J("ngIf",o.isSignupFailed)}},dependencies:[g.O5,C.v,U.lW,I.e,f.ar,u.TO,u.KE,u.hX,u.R9,d.Hw,r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u,S.Nt],styles:[".signup-container[_ngcontent-%COMP%]{width:min(500px,100%);margin:auto}.social-signup-container[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{width:100%;margin-bottom:1em}.signup-form[_ngcontent-%COMP%] > *[_ngcontent-%COMP%]{width:100%;margin-bottom:1em}input[type=password][_ngcontent-%COMP%]{font-family:Roboto;font-style:normal;font-weight:700}.icon[_ngcontent-%COMP%]{position:relative;top:4px}"]}),e})();var x=i(7763);const E=[{path:"",component:O}];let Y=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[c.Bz.forChild(E),g.ez,x.I,f.QX,u.lN,d.Ps,r.UX,S.c]}),e})()}}]);
"use strict";(self.webpackChunkrucogs_website=self.webpackChunkrucogs_website||[]).push([[725],{4725:(f,i,s)=>{s.r(i),s.d(i,{TestPageModule:()=>b});var a=s(8692),l=s(8239),r=s(274),p=s(8023),g=s(3528),t=s(4537),c=s(7545);let m=(()=>{class e{constructor(n){this.backend=n,this.onDestroy$=new p.x}ngOnInit(){this.testSubscription()}ngOnDestroy(){this.onDestroy$.next(),this.onDestroy$.complete()}triggerTestSubscription(){var n=this;return(0,l.Z)(function*(){yield n.backend.mutate({mutation:r.Ps`
          mutation TriggerTestSubscription {
            test
          }
        `}).toPromise()})()}testSubscription(){this.backend.rebuildClient(),this.backend.subscribe({query:r.Ps`
          subscription TestSubscription($filter: TestSubscriptionFilter) {
            test(filter: $filter) {
              joe
              mama
            }
          }
        `,context:{thisIsInContext:"hey"},variables:{filter:{id:"joes",someField:"I have data!"}}}).pipe((0,g.R)(this.onDestroy$)).subscribe({next:n=>{}})}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(c.v$))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-test-page"]],decls:6,vars:0,consts:[[3,"click"]],template:function(n,u){1&n&&(t.TgZ(0,"p"),t._uU(1,"test-page works!"),t.qZA(),t.TgZ(2,"button",0),t.NdJ("click",function(){return u.testSubscription()}),t._uU(3,"Rest Test Subscription"),t.qZA(),t.TgZ(4,"button",0),t.NdJ("click",function(){return u.triggerTestSubscription()}),t._uU(5,"Trigger Test Subscription"),t.qZA())}}),e})();var T=s(3178);const d=[{path:"",component:m}];let b=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[T.Bz.forChild(d),a.ez,c.fF]}),e})()}}]);
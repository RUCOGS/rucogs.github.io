class FlipDown{constructor(t,e="flipdown",o={}){if("number"!=typeof t)throw new Error(`FlipDown: Constructor expected unix timestamp, got ${typeof t} instead.`);"object"==typeof e&&(o=e,e="flipdown"),this.version="0.3.2",this.initialised=!1,this.now=this._getTime(),this.epoch=t,this.countdownEnded=!1,this.hasEndedCallback=null,this.element=document.getElementById(e),this.rotors=[],this.rotorLeafFront=[],this.rotorLeafRear=[],this.rotorTops=[],this.rotorBottoms=[],this.countdown=null,this.daysRemaining=0,this.clockValues={},this.clockStrings={},this.clockValuesAsString=[],this.prevClockValuesAsString=[],this.opts=this._parseOptions(o),this._setOptions(),console.log(`FlipDown ${this.version} (Theme: ${this.opts.theme})`)}start(){return this.initialised||this._init(),this.countdown=setInterval(this._tick.bind(this),1e3),this}ifEnded(t){return this.hasEndedCallback=function(){t(),this.hasEndedCallback=null},this}_getTime(){return(new Date).getTime()/1e3}_hasCountdownEnded(){return this.epoch-this.now<0?(this.countdownEnded=!0,null!=this.hasEndedCallback&&(this.hasEndedCallback(),this.hasEndedCallback=null),!0):(this.countdownEnded=!1,!1)}_parseOptions(t){let e=["Days","Hours","Minutes","Seconds"];return t.headings&&4===t.headings.length&&(e=t.headings),{theme:t.hasOwnProperty("theme")?t.theme:"dark",headings:e}}_setOptions(){this.element.classList.add(`flipdown__theme-${this.opts.theme}`)}_init(){this.initialised=!0,this.daysremaining=this._hasCountdownEnded()?0:Math.floor((this.epoch-this.now)/86400).toString().length;for(var t=this.daysremaining<=2?2:this.daysremaining,e=0;e<t+6;e++)this.rotors.push(this._createRotor(0));var o=[];for(e=0;e<t;e++)o.push(this.rotors[e]);this.element.appendChild(this._createRotorGroup(o,0));var s=t;for(e=0;e<3;e++){for(var r=[],a=0;a<2;a++)r.push(this.rotors[s]),s++;this.element.appendChild(this._createRotorGroup(r,e+1))}return this.rotorLeafFront=Array.prototype.slice.call(this.element.getElementsByClassName("rotor-leaf-front")),this.rotorLeafRear=Array.prototype.slice.call(this.element.getElementsByClassName("rotor-leaf-rear")),this.rotorTop=Array.prototype.slice.call(this.element.getElementsByClassName("rotor-top")),this.rotorBottom=Array.prototype.slice.call(this.element.getElementsByClassName("rotor-bottom")),this._tick(),this._updateClockValues(!0),this}_createRotorGroup(t,e){var o=document.createElement("div");o.className="rotor-group";var s=document.createElement("div");return s.className="rotor-group-heading",s.setAttribute("data-before",this.opts.headings[e]),o.appendChild(s),appendChildren(o,t),o}_createRotor(t=0){var e=document.createElement("div"),o=document.createElement("div"),s=document.createElement("figure"),r=document.createElement("figure"),a=document.createElement("div"),n=document.createElement("div");return e.className="rotor",o.className="rotor-leaf",s.className="rotor-leaf-rear",r.className="rotor-leaf-front",a.className="rotor-top",n.className="rotor-bottom",s.textContent=t,a.textContent=t,n.textContent=t,appendChildren(e,[o,a,n]),appendChildren(o,[s,r]),e}_tick(){this.now=this._getTime();var t=this.epoch-this.now<=0?0:this.epoch-this.now;this.clockValues.d=Math.floor(t/86400),t-=86400*this.clockValues.d,this.clockValues.h=Math.floor(t/3600),t-=3600*this.clockValues.h,this.clockValues.m=Math.floor(t/60),t-=60*this.clockValues.m,this.clockValues.s=Math.floor(t),this._updateClockValues(),this._hasCountdownEnded()}_updateClockValues(t=!1){function e(){this.rotorTop.forEach((s,r)=>{s.textContent!=this.clockValuesAsString[r]&&(s.textContent=this.clockValuesAsString[r])})}function o(){this.rotorLeafRear.forEach((s,r)=>{if(s.textContent!=this.clockValuesAsString[r]){s.textContent=this.clockValuesAsString[r],s.parentElement.classList.add("flipped");var a=setInterval(function(){s.parentElement.classList.remove("flipped"),clearInterval(a)}.bind(this),500)}})}this.clockStrings.d=pad(this.clockValues.d,2),this.clockStrings.h=pad(this.clockValues.h,2),this.clockStrings.m=pad(this.clockValues.m,2),this.clockStrings.s=pad(this.clockValues.s,2),this.clockValuesAsString=(this.clockStrings.d+this.clockStrings.h+this.clockStrings.m+this.clockStrings.s).split(""),this.rotorLeafFront.forEach((s,r)=>{s.textContent=this.prevClockValuesAsString[r]}),this.rotorBottom.forEach((s,r)=>{s.textContent=this.prevClockValuesAsString[r]}),t?(e.call(this),o.call(this)):(setTimeout(e.bind(this),500),setTimeout(o.bind(this),500)),this.prevClockValuesAsString=this.clockValuesAsString}}function pad(i,t){return(i=i.toString()).length<t?pad("0"+i,t):i}function appendChildren(i,t){t.forEach(e=>{i.appendChild(e)})}
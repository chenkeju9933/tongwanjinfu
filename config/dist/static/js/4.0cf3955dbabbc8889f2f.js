webpackJsonp([4],{"8Ezs":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("WCq4"),a=n("iWHC"),i=n("GFMA"),o=n("FCHv"),r=n("VXJq"),c={components:{countDown:i.a,noData:o.a,noMoreData:r.a},data:function(){return{wxUserInfo:{},isOver:!1,params:{start:1,limit:10},cutDownList:[],expiryTime:"",countDown:""}},mounted:function(){console.log(encodeURIComponent(window.location.href)),this.wxUserInfo=JSON.parse(localStorage.getItem("user")).body.wxUser,console.log(this.wxUserInfo),this.getMycutDownList()},methods:{getMycutDownList:function(){var t=this,e={userId:this.wxUserInfo.userId,start:this.params.start,limit:this.params.limit};s.a.queryMycutDownList(e).then(function(e){if(console.log(e),e&&e.data&&e.data.body&&e.data.body.records){t.cutDownList=e.data.body.records;var n=new Date;t.cutDownList.forEach(function(t){var e=t.endTime-n.getTime();t.isOver=e>0,t.cutDownTime=t.endTime-(new Date).getTime(),t.expiry=a.a.expirationTime(t.endTime)})}})},toBargain:function(t){var e={name:"cutDownDetail",params:{id:t}};this.$router.push(e)}}},l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content",attrs:{id:"myCutDown "}},[t._l(t.cutDownList,function(e,s){return n("div",{staticClass:"cut-list margin-l-r-5 flex-column font-color-666 "},[n("div",{staticClass:"cut-space-line"}),t._v(" "),n("div",{staticClass:"time-action flex-row-sb"},[n("span",[t._v(t._s(e.expiry))]),t._v(" "),n("count-down",{attrs:{endTime:e.endTime,callback:t.callback,endText:"已经结束了"}})],1),t._v(" "),n("div",{staticClass:"bor-bot bor-top p-1"},[n("div",{staticClass:"flex-row-sb"},[n("span",[n("img",{staticClass:"cut-down-list-img",attrs:{src:e.cutDownActivity.goods.thumbnail,alt:""}})]),t._v(" "),n("span",{staticClass:"cut-down-info flex-column"},[n("span",{staticClass:"cut-lgood-name font-color-666"},[t._v(t._s(e.cutDownActivity.goods.goodsName))]),t._v(" "),n("span",{staticClass:"flex-row-start"},[n("span",{staticClass:"wx-kanjia"},[t._v("￥0元")]),t._v(" "),n("span",{staticClass:"original-price"},[t._v("原价"+t._s(e.amount)+"元")])])])]),t._v(" "),n("div",[t._v("离免费领还差"+t._s(e.lastmount)+"元")])]),t._v(" "),n("div",{staticClass:"flex-row-sb activeSchool m-t-b-1"},[n("span",{directives:[{name:"show",rawName:"v-show",value:e.isOver,expression:"list.isOver"}]},[t._v("砍价中")]),t._v(" "),n("span",{directives:[{name:"show",rawName:"v-show",value:!e.isOver,expression:"!list.isOver"}],staticClass:"font-color-666"},[t._v("已结束")]),t._v(" "),n("mt-button",{attrs:{plain:"",type:"danger"},on:{click:function(n){t.toBargain(e.cutDownId)}}},[t._v("继续砍价")])],1)])}),t._v(" "),n("no-data",{directives:[{name:"show",rawName:"v-show",value:0===t.cutDownList.length,expression:"cutDownList.length === 0"}]}),t._v(" "),n("no-more-data",{directives:[{name:"show",rawName:"v-show",value:t.cutDownList.length>0,expression:"cutDownList.length > 0"}]})],2)};l._withStripped=!0;var u={render:l,staticRenderFns:[]},v=u;var d=n("VU/8")(c,v,!1,null,null,null);d.options.__file="src\\components\\content\\cutdown\\myCutDownList.vue";e.default=d.exports},GFMA:function(t,e,n){"use strict";var s=n("Gu7T"),a=n.n(s),i={data:function(){return{content:""}},props:{endTime:{type:String,default:""},endText:{type:String,default:"已结束"},callback:{type:Function,default:""}},mounted:function(){this.countdowm(this.endTime)},methods:{countdowm:function(t){var e=this,n=setInterval(function(){var s=new Date,a=new Date(t).getTime()-s.getTime();if(a>0){var i=Math.floor(a/864e5),o=Math.floor(a/36e5%24),r=Math.floor(a/6e4%60),c=Math.floor(a/1e3%60);o=o<10?"0"+o:o,r=r<10?"0"+r:r,c=c<10?"0"+c:c;var l="";i>0&&(l="倒计时："+i+"天"+o+"小时"+r+"分"+c+"秒"),i<=0&&o>0&&(l="倒计时："+o+"小时"+r+"分"+c+"秒"),i<=0&&o<=0&&r>0&&(l="倒计时："+r+"分"+c+"秒"),i<=0&&o<=0&&r<=0&&c>0&&(l="倒计时："+c+"秒"),e.content=l}else clearInterval(n),e.content=e.endText,e._callback()},1e3)},_callback:function(){this.callback&&this.callback instanceof Function&&this.callback.apply(this,a()(this))}}},o=function(){var t=this.$createElement;return(this._self._c||t)("span",{attrs:{endTime:this.endTime,callback:this.callback,endText:this.endText}},[this._t("default",[this._v("\n    "+this._s(this.content)+"\n  ")])],2)};o._withStripped=!0;var r={render:o,staticRenderFns:[]},c=r;var l=n("VU/8")(i,c,!1,null,null,null);l.options.__file="src\\components\\common\\countDown.vue";e.a=l.exports},iWHC:function(t,e,n){"use strict";var s={expirationTime:function(t){var e=new Date;if(t){e.setTime(t);var n=e.getFullYear(),s=e.getMonth()+1;s=s>=10?s:"0"+s;var a=e.getDate();a=a>=10?a:"0"+a;var i=e.getHours();i=i>=10?i:"0"+i;var o=e.getMinutes();o=o>=10?o:"0"+o;var r=e.getSeconds();r=r>=10?r:"0"+r;var c=e.getMilliseconds();return c=c>=10?c:"0"+c,n+"-"+s+"-"+a+" "+i+":"+o+":"+r}}};e.a=s}});
//# sourceMappingURL=4.0cf3955dbabbc8889f2f.js.map
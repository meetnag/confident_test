(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"8M9k":function(n,l,u){"use strict";u.r(l);var e=u("CcnG"),t=function(){return function(){}}(),o=u("pMnS"),i=u("gIcY"),r=u("Ip0R"),a=u("CcMi"),s=u("AmEu"),c=u("uqJq"),d=u("XGZ3"),p=function(){function n(n,l,u){var e=this;this.router=n,this.dashboardService=l,this.authenticationService=u,this.ocList=[],this.source=new s.a,this.settings={actions:!1,columns:{OCNumber:{title:"OC Number",type:"custom",renderComponent:g,filter:!1},OCDate:{title:"OC Date",filter:!1},ProductID:{title:"Product ID",filter:!1,valuePrepareFunction:function(n){return n.name}},_id:{title:"Actions",type:"custom",renderComponent:m,filter:!1}}},this.searchOcNo="",this.priority="all",this.priorityList=[],this.userRole="",this.currentUser$=this.authenticationService.currentUserSubject.subscribe(function(n){null!=n&&(e.currentUser=n,e.userRole=e.currentUser.userRole)})}return n.prototype.ngOnInit=function(){this.getOcList(),this.getPriority()},n.prototype.ngOnDestroy=function(){this.currentUser$.unsubscribe()},n.prototype.getPriority=function(){var n=this;this.dashboardService.getPriorityList().subscribe(function(l){"success"===l.status&&l.data&&(n.priorityList=l.data.priorityList)})},n.prototype.onPriorityChange=function(){this.getOcList()},n.prototype.getOcList=function(){var n,l=this;n="all"===this.priority?{roleName:this.currentUser.userRole}:{Priority:this.priority,roleName:this.currentUser.userRole},"Branch/Dealer"===this.currentUser.userRole&&(n.branchId=this.currentUser.user.branchId),this.dashboardService.getOcArchives(n).subscribe(function(n){"success"===n.status&&(l.ocList=n.data.ocList,l.source.load(l.ocList))})},n.prototype.onOcNumberChange=function(){var n,l=this;""!=this.searchOcNo?(n=this.ocList.filter(function(n){return n.OCNumber==l.searchOcNo}),this.source.load(n)):this.source.load(this.ocList)},n}(),m=function(){function n(n){this.router=n}return n.prototype.ngOnInit=function(){},n.prototype.onUploadDocuments=function(){this.router.navigate(["/pages/dashboard/upload/"+this.value])},n}(),g=function(){function n(n){this.router=n}return n.prototype.ngOnInit=function(){},n.prototype.onViewOc=function(){this.router.navigate(["/pages/dashboard/view-oc/"+this.rowData.OCNumber])},n}(),h=u("ZYCi"),v=e["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function f(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,9,"div",[["class","col-md-3 col-sm-3"]],null,null,null,null,null)),(n()(),e["\u0275eld"](1,0,null,null,8,"label",[],[[8,"htmlFor",0]],null,null,null,null)),(n()(),e["\u0275eld"](2,0,null,null,6,"input",[["name","enums"],["type","radio"]],[[8,"id",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"change"],[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(n,l,u){var t=!0,o=n.component;return"input"===l&&(t=!1!==e["\u0275nov"](n,3)._handleInput(u.target.value)&&t),"blur"===l&&(t=!1!==e["\u0275nov"](n,3).onTouched()&&t),"compositionstart"===l&&(t=!1!==e["\u0275nov"](n,3)._compositionStart()&&t),"compositionend"===l&&(t=!1!==e["\u0275nov"](n,3)._compositionEnd(u.target.value)&&t),"change"===l&&(t=!1!==e["\u0275nov"](n,4).onChange()&&t),"blur"===l&&(t=!1!==e["\u0275nov"](n,4).onTouched()&&t),"change"===l&&(t=!1!==o.onPriorityChange()&&t),"ngModelChange"===l&&(t=!1!==(o.priority=u)&&t),t},null,null)),e["\u0275did"](3,16384,null,0,i.d,[e.Renderer2,e.ElementRef,[2,i.a]],null,null),e["\u0275did"](4,212992,null,0,i.t,[e.Renderer2,e.ElementRef,i.A,e.Injector],{name:[0,"name"],value:[1,"value"]},null),e["\u0275prd"](1024,null,i.m,function(n,l){return[n,l]},[i.d,i.t]),e["\u0275did"](6,671744,null,0,i.r,[[8,null],[8,null],[8,null],[6,i.m]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,i.n,null,[i.r]),e["\u0275did"](8,16384,null,0,i.o,[[4,i.n]],null,null),(n()(),e["\u0275ted"](9,null,[" "," "]))],function(n,l){var u=l.component;n(l,4,0,"enums",l.context.$implicit.name),n(l,6,0,"enums",u.priority)},function(n,l){n(l,1,0,e["\u0275inlineInterpolate"](1,"priority_",l.context.$implicit.name,"")),n(l,2,0,e["\u0275inlineInterpolate"](1,"priority_",l.context.$implicit.name,""),e["\u0275nov"](l,8).ngClassUntouched,e["\u0275nov"](l,8).ngClassTouched,e["\u0275nov"](l,8).ngClassPristine,e["\u0275nov"](l,8).ngClassDirty,e["\u0275nov"](l,8).ngClassValid,e["\u0275nov"](l,8).ngClassInvalid,e["\u0275nov"](l,8).ngClassPending),n(l,9,0,l.context.$implicit.name)})}function C(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,30,"section",[["class","script"]],null,null,null,null,null)),(n()(),e["\u0275eld"](1,0,null,null,29,"div",[["class","container"]],null,null,null,null,null)),(n()(),e["\u0275eld"](2,0,null,null,28,"div",[["class","panel"]],null,null,null,null,null)),(n()(),e["\u0275eld"](3,0,null,null,2,"div",[["class","panel-heading"]],null,null,null,null,null)),(n()(),e["\u0275eld"](4,0,null,null,1,"h3",[["class","panel-hd"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["OC Archives"])),(n()(),e["\u0275eld"](6,0,null,null,24,"div",[["class","panel-body"],["id","panel-list"]],null,null,null,null,null)),(n()(),e["\u0275eld"](7,0,null,null,21,"div",[["class","btn-group content_btn"]],null,null,null,null,null)),(n()(),e["\u0275eld"](8,0,null,null,1,"label",[["class","col-sm-3 control-label"]],null,null,null,null,null)),(n()(),e["\u0275ted"](-1,null,["OC Number"])),(n()(),e["\u0275eld"](10,0,null,null,6,"div",[["class","col-sm-4"]],null,null,null,null,null)),(n()(),e["\u0275eld"](11,0,null,null,5,"input",[["class","form-control"],["name","numb"],["placeholder","OC Number"],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"change"],[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(n,l,u){var t=!0,o=n.component;return"input"===l&&(t=!1!==e["\u0275nov"](n,12)._handleInput(u.target.value)&&t),"blur"===l&&(t=!1!==e["\u0275nov"](n,12).onTouched()&&t),"compositionstart"===l&&(t=!1!==e["\u0275nov"](n,12)._compositionStart()&&t),"compositionend"===l&&(t=!1!==e["\u0275nov"](n,12)._compositionEnd(u.target.value)&&t),"change"===l&&(t=!1!==o.onOcNumberChange()&&t),"ngModelChange"===l&&(t=!1!==(o.searchOcNo=u)&&t),t},null,null)),e["\u0275did"](12,16384,null,0,i.d,[e.Renderer2,e.ElementRef,[2,i.a]],null,null),e["\u0275prd"](1024,null,i.m,function(n){return[n]},[i.d]),e["\u0275did"](14,671744,null,0,i.r,[[8,null],[8,null],[8,null],[6,i.m]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,i.n,null,[i.r]),e["\u0275did"](16,16384,null,0,i.o,[[4,i.n]],null,null),(n()(),e["\u0275eld"](17,0,null,null,9,"div",[["class","col-md-2 col-sm-2"]],null,null,null,null,null)),(n()(),e["\u0275eld"](18,0,null,null,8,"label",[["for","all"]],null,null,null,null,null)),(n()(),e["\u0275eld"](19,0,null,null,6,"input",[["id","all"],["name","alle"],["type","radio"],["value","all"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"change"],[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(n,l,u){var t=!0,o=n.component;return"input"===l&&(t=!1!==e["\u0275nov"](n,20)._handleInput(u.target.value)&&t),"blur"===l&&(t=!1!==e["\u0275nov"](n,20).onTouched()&&t),"compositionstart"===l&&(t=!1!==e["\u0275nov"](n,20)._compositionStart()&&t),"compositionend"===l&&(t=!1!==e["\u0275nov"](n,20)._compositionEnd(u.target.value)&&t),"change"===l&&(t=!1!==e["\u0275nov"](n,21).onChange()&&t),"blur"===l&&(t=!1!==e["\u0275nov"](n,21).onTouched()&&t),"change"===l&&(t=!1!==o.onPriorityChange()&&t),"ngModelChange"===l&&(t=!1!==(o.priority=u)&&t),t},null,null)),e["\u0275did"](20,16384,null,0,i.d,[e.Renderer2,e.ElementRef,[2,i.a]],null,null),e["\u0275did"](21,212992,null,0,i.t,[e.Renderer2,e.ElementRef,i.A,e.Injector],{name:[0,"name"],value:[1,"value"]},null),e["\u0275prd"](1024,null,i.m,function(n,l){return[n,l]},[i.d,i.t]),e["\u0275did"](23,671744,null,0,i.r,[[8,null],[8,null],[8,null],[6,i.m]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),e["\u0275prd"](2048,null,i.n,null,[i.r]),e["\u0275did"](25,16384,null,0,i.o,[[4,i.n]],null,null),(n()(),e["\u0275ted"](-1,null,[" All "])),(n()(),e["\u0275and"](16777216,null,null,1,null,f)),e["\u0275did"](28,278528,null,0,r.NgForOf,[e.ViewContainerRef,e.TemplateRef,e.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),e["\u0275eld"](29,0,null,null,1,"ng2-smart-table",[["class","table table-striped table-bordered table-hover table-responsive"]],null,null,null,a.b,a.a)),e["\u0275did"](30,573440,null,0,s.s,[],{source:[0,"source"],settings:[1,"settings"]},null)],function(n,l){var u=l.component;n(l,14,0,"numb",u.searchOcNo),n(l,21,0,"alle","all"),n(l,23,0,"alle",u.priority),n(l,28,0,u.priorityList),n(l,30,0,u.source,u.settings)},function(n,l){n(l,11,0,e["\u0275nov"](l,16).ngClassUntouched,e["\u0275nov"](l,16).ngClassTouched,e["\u0275nov"](l,16).ngClassPristine,e["\u0275nov"](l,16).ngClassDirty,e["\u0275nov"](l,16).ngClassValid,e["\u0275nov"](l,16).ngClassInvalid,e["\u0275nov"](l,16).ngClassPending),n(l,19,0,e["\u0275nov"](l,25).ngClassUntouched,e["\u0275nov"](l,25).ngClassTouched,e["\u0275nov"](l,25).ngClassPristine,e["\u0275nov"](l,25).ngClassDirty,e["\u0275nov"](l,25).ngClassValid,e["\u0275nov"](l,25).ngClassInvalid,e["\u0275nov"](l,25).ngClassPending)})}function y(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"app-oc-history",[],null,null,null,C,v)),e["\u0275did"](1,245760,null,0,p,[h.l,c.a,d.a],null,null)],function(n,l){n(l,1,0)},null)}var b=e["\u0275ccf"]("app-oc-history",p,y,{},{},[]),O=e["\u0275crt"]({encapsulation:2,styles:[],data:{}});function N(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"span",[["class","font-medium-1 mr-2"],["style","cursor:pointer;"]],null,[[null,"click"]],function(n,l,u){var e=!0;return"click"===l&&(e=!1!==n.component.onUploadDocuments()&&e),e},null,null)),(n()(),e["\u0275ted"](-1,null,["Supporting Documents"]))],null,null)}function R(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"app-custom-renderer",[],null,null,null,N,O)),e["\u0275did"](1,114688,null,0,m,[h.l],null,null)],function(n,l){n(l,1,0)},null)}var D=e["\u0275ccf"]("app-custom-renderer",m,R,{value:"value",rowData:"rowData"},{},[]),L=e["\u0275crt"]({encapsulation:2,styles:[],data:{}});function I(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"span",[["class","font-medium-1 mr-2"],["style","cursor:pointer;color:blue"]],null,[[null,"click"]],function(n,l,u){var e=!0;return"click"===l&&(e=!1!==n.component.onViewOc()&&e),e},null,null)),(n()(),e["\u0275ted"](1,null,["",""]))],null,function(n,l){n(l,1,0,l.component.value)})}function _(n){return e["\u0275vid"](0,[(n()(),e["\u0275eld"](0,0,null,null,1,"app-custom-renderer",[],null,null,null,I,L)),e["\u0275did"](1,114688,null,0,g,[h.l],null,null)],function(n,l){n(l,1,0)},null)}var P=e["\u0275ccf"]("app-custom-renderer",g,_,{value:"value",rowData:"rowData"},{},[]),T=u("u1Dc"),w=u("t/Na"),M=u("8SOd"),S=u("k2u+"),U=u("PCNd"),k=function(){return function(){}}();u.d(l,"OcHistoryModuleNgFactory",function(){return A});var A=e["\u0275cmf"](t,[],function(n){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,b,P,D]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,r.NgLocalization,r.NgLocaleLocalization,[e.LOCALE_ID,[2,r["\u0275angular_packages_common_common_a"]]]),e["\u0275mpd"](4608,i.A,i.A,[]),e["\u0275mpd"](4608,i.e,i.e,[]),e["\u0275mpd"](4608,T.i,T.i,[]),e["\u0275mpd"](4608,T.k,T.k,[w.c]),e["\u0275mpd"](4608,T.c,T.c,[T.i,T.k]),e["\u0275mpd"](4608,M.i,M.i,[]),e["\u0275mpd"](4608,M.g,M.g,[]),e["\u0275mpd"](4608,M.f,M.f,[]),e["\u0275mpd"](1073742336,r.CommonModule,r.CommonModule,[]),e["\u0275mpd"](1073742336,h.n,h.n,[[2,h.t],[2,h.l]]),e["\u0275mpd"](1073742336,i.y,i.y,[]),e["\u0275mpd"](1073742336,i.j,i.j,[]),e["\u0275mpd"](1073742336,i.u,i.u,[]),e["\u0275mpd"](1073742336,T.j,T.j,[]),e["\u0275mpd"](1073742336,s.c,s.c,[]),e["\u0275mpd"](1073742336,s.D,s.D,[]),e["\u0275mpd"](1073742336,s.L,s.L,[]),e["\u0275mpd"](1073742336,s.N,s.N,[]),e["\u0275mpd"](1073742336,s.h,s.h,[]),e["\u0275mpd"](1073742336,s.b,s.b,[]),e["\u0275mpd"](1073742336,S.a,S.a,[]),e["\u0275mpd"](1073742336,M.c,M.c,[]),e["\u0275mpd"](1073742336,U.a,U.a,[]),e["\u0275mpd"](1073742336,k,k,[]),e["\u0275mpd"](1073742336,t,t,[]),e["\u0275mpd"](256,M.a,{notFoundText:"No items found",typeToSearchText:"Type to search",addTagText:"Add item",loadingText:"Loading...",clearAllText:"Clear all",disableVirtualScroll:!1},[]),e["\u0275mpd"](1024,h.j,function(){return[[{path:"",component:p}]]},[])])})}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{tePd:function(l,n,u){"use strict";u.r(n);var e=u("CcnG"),a=function(){return function(){}}(),t=u("pMnS"),d=u("z5nN"),o=u("t68o"),r=u("pBdS"),i=u("hkAg"),c=(u("q2se"),function(){function l(l){var n=this;this.authenticationService=l,this.userName="",this.currentUser$=this.authenticationService.currentUserSubject.subscribe(function(l){null!=l&&(n.currentUser=l,n.userName=l.user.name)})}return l.prototype.ngOnInit=function(){},l.prototype.ngOnDestroy=function(){this.currentUser$.unsubscribe()},l.prototype.onLogout=function(){this.authenticationService.logout()},l}()),s=u("XGZ3"),p=e["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function m(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,13,"div",[["class","top-nav"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,12,"div",[["class","container"]],null,null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,11,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](3,0,null,null,10,"div",[["class","col-xs-12"]],null,null,null,null,null)),(l()(),e["\u0275eld"](4,0,null,null,9,"ul",[["class","right_ul"],["style","margin-top:-5px;"]],null,null,null,null,null)),(l()(),e["\u0275eld"](5,0,null,null,8,"li",[["id","welcome_id"]],null,null,null,null,null)),(l()(),e["\u0275eld"](6,0,null,null,7,"div",[["class","dropdown"],["id","admin-dd"]],null,null,null,null,null)),(l()(),e["\u0275eld"](7,0,null,null,2,"button",[["aria-expanded","true"],["aria-haspopup","true"],["class","btn btn-primary dropdown-toggle"],["data-toggle","dropdown"],["id","dropdownMenu"],["type","button"]],null,null,null,null,null)),(l()(),e["\u0275ted"](8,null,["Welcome "," "])),(l()(),e["\u0275eld"](9,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-user"],["id","admin-user"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,3,"ul",[["aria-labelledby","dropdownMenu"],["class","dropdown-menu"],["id","admin-drop"]],null,null,null,null,null)),(l()(),e["\u0275eld"](11,0,null,null,2,"li",[],null,null,null,null,null)),(l()(),e["\u0275eld"](12,0,null,null,1,"a",[],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.onLogout()&&e),e},null,null)),(l()(),e["\u0275ted"](-1,null,["Logout"]))],null,function(l,n){l(n,8,0,n.component.userName)})}var f=u("ZYCi"),h=u("Ip0R"),b=function(){function l(){}return l.prototype.ngOnInit=function(){},l}(),g=e["\u0275crt"]({encapsulation:0,styles:[["[_nghost-%COMP%]   a[_ngcontent-%COMP%]{color:#007bff;text-decoration:none;font-size:15px;background-color:transparent}"]],data:{}});function v(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,38,"header",[["class","header"],["id","nav"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,37,"div",[["class","container"],["id","container-fullwidth"]],null,null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,36,"nav",[["class","navbar navbar-default"]],null,null,null,null,null)),(l()(),e["\u0275eld"](3,0,null,null,8,"div",[["class","navbar-header"]],null,null,null,null,null)),(l()(),e["\u0275eld"](4,0,null,null,5,"button",[["aria-expanded","false"],["class","navbar-toggle collapsed"],["data-target","#bs-example-navbar-collapse-1"],["data-toggle","collapse"],["type","button"]],null,null,null,null,null)),(l()(),e["\u0275eld"](5,0,null,null,1,"span",[["class","sr-only"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Toggle navigation"])),(l()(),e["\u0275eld"](7,0,null,null,0,"span",[["class","icon-bar"]],null,null,null,null,null)),(l()(),e["\u0275eld"](8,0,null,null,0,"span",[["class","icon-bar"]],null,null,null,null,null)),(l()(),e["\u0275eld"](9,0,null,null,0,"span",[["class","icon-bar"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,1,"a",[["class","navbar-brand"],["href","#"]],null,null,null,null,null)),(l()(),e["\u0275eld"](11,0,null,null,0,"img",[["alt","logo"],["src","assets/logo.png"]],null,null,null,null,null)),(l()(),e["\u0275eld"](12,0,null,null,26,"div",[["class","collapse navbar-collapse"],["id","bs-example-navbar-collapse-1"]],null,null,null,null,null)),(l()(),e["\u0275eld"](13,0,null,null,25,"ul",[["class","nav navbar-nav"]],null,null,null,null,null)),(l()(),e["\u0275eld"](14,0,null,null,4,"li",[],null,null,null,null,null)),(l()(),e["\u0275eld"](15,0,null,null,3,"a",[["routerLink","/pages"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var a=!0;return"click"===n&&(a=!1!==e["\u0275nov"](l,16).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&a),a},null,null)),e["\u0275did"](16,671744,null,0,f.m,[f.l,f.a,h.LocationStrategy],{routerLink:[0,"routerLink"]},null),(l()(),e["\u0275eld"](17,0,null,null,0,"i",[["aria-hidden","true"],["class","btn btn-icon fa fa-building-o"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" OC List"])),(l()(),e["\u0275eld"](19,0,null,null,4,"li",[],null,null,null,null,null)),(l()(),e["\u0275eld"](20,0,null,null,3,"a",[["routerLink","/pages/oc-history"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var a=!0;return"click"===n&&(a=!1!==e["\u0275nov"](l,21).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&a),a},null,null)),e["\u0275did"](21,671744,null,0,f.m,[f.l,f.a,h.LocationStrategy],{routerLink:[0,"routerLink"]},null),(l()(),e["\u0275eld"](22,0,null,null,0,"i",[["aria-hidden","true"],["class","btn btn-icon fa fa-share-alt-square"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" OC Archives"])),(l()(),e["\u0275eld"](24,0,null,null,4,"li",[],null,null,null,null,null)),(l()(),e["\u0275eld"](25,0,null,null,3,"a",[["routerLink","/pages/oc-list/scan-oc"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var a=!0;return"click"===n&&(a=!1!==e["\u0275nov"](l,26).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&a),a},null,null)),e["\u0275did"](26,671744,null,0,f.m,[f.l,f.a,h.LocationStrategy],{routerLink:[0,"routerLink"]},null),(l()(),e["\u0275eld"](27,0,null,null,0,"i",[["aria-hidden","true"],["class","btn btn-icon fa fa-tasks"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" OC Track"])),(l()(),e["\u0275eld"](29,0,null,null,4,"li",[],null,null,null,null,null)),(l()(),e["\u0275eld"](30,0,null,null,3,"a",[["routerLink","/pages/oc-upload"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var a=!0;return"click"===n&&(a=!1!==e["\u0275nov"](l,31).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&a),a},null,null)),e["\u0275did"](31,671744,null,0,f.m,[f.l,f.a,h.LocationStrategy],{routerLink:[0,"routerLink"]},null),(l()(),e["\u0275eld"](32,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-files-o"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" OC Documents"])),(l()(),e["\u0275eld"](34,0,null,null,4,"li",[],null,null,null,null,null)),(l()(),e["\u0275eld"](35,0,null,null,3,"a",[["routerLink","/pages/dashboard"]],[[1,"target",0],[8,"href",4]],[[null,"click"]],function(l,n,u){var a=!0;return"click"===n&&(a=!1!==e["\u0275nov"](l,36).onClick(u.button,u.ctrlKey,u.metaKey,u.shiftKey)&&a),a},null,null)),e["\u0275did"](36,671744,null,0,f.m,[f.l,f.a,h.LocationStrategy],{routerLink:[0,"routerLink"]},null),(l()(),e["\u0275eld"](37,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-dashboard"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" Dashboard"]))],function(l,n){l(n,16,0,"/pages"),l(n,21,0,"/pages/oc-history"),l(n,26,0,"/pages/oc-list/scan-oc"),l(n,31,0,"/pages/oc-upload"),l(n,36,0,"/pages/dashboard")},function(l,n){l(n,15,0,e["\u0275nov"](n,16).target,e["\u0275nov"](n,16).href),l(n,20,0,e["\u0275nov"](n,21).target,e["\u0275nov"](n,21).href),l(n,25,0,e["\u0275nov"](n,26).target,e["\u0275nov"](n,26).href),l(n,30,0,e["\u0275nov"](n,31).target,e["\u0275nov"](n,31).href),l(n,35,0,e["\u0275nov"](n,36).target,e["\u0275nov"](n,36).href)})}var y=function(){return function(){}}(),k=e["\u0275crt"]({encapsulation:2,styles:[],data:{}});function L(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,56,"footer",[],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,50,"div",[["class","footer-info"]],null,null,null,null,null)),(l()(),e["\u0275eld"](2,0,null,null,49,"div",[["class","container"]],null,null,null,null,null)),(l()(),e["\u0275eld"](3,0,null,null,48,"div",[["class","row"]],null,null,null,null,null)),(l()(),e["\u0275eld"](4,0,null,null,4,"div",[["class","col-sm-4 col-md-4"]],null,null,null,null,null)),(l()(),e["\u0275eld"](5,0,null,null,1,"h6",[["class","up-services"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["About"])),(l()(),e["\u0275eld"](7,0,null,null,1,"p",[["class","foot-para"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["\u201cLambdaBlocks \u2013 trailLedger\u201d (LTL) is a Blockchain solution that builds trust and transparency in the distribution system to ensure genuineness of product to customer and to maintain product history."])),(l()(),e["\u0275eld"](9,0,null,null,27,"div",[["class","col-sm-4 col-md-4"]],null,null,null,null,null)),(l()(),e["\u0275eld"](10,0,null,null,1,"h6",[["class","up-services"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Quick Links"])),(l()(),e["\u0275eld"](12,0,null,null,24,"ul",[["class","links"]],null,null,null,null,null)),(l()(),e["\u0275eld"](13,0,null,null,3,"li",[],null,null,null,null,null)),(l()(),e["\u0275eld"](14,0,null,null,2,"a",[["href","assetTracking.html"]],null,null,null,null,null)),(l()(),e["\u0275eld"](15,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-caret-right"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" \xa0 Track"])),(l()(),e["\u0275eld"](17,0,null,null,3,"li",[],null,null,null,null,null)),(l()(),e["\u0275eld"](18,0,null,null,2,"a",[["href","manufacturer.html"]],null,null,null,null,null)),(l()(),e["\u0275eld"](19,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-caret-right"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" \xa0 Manufacturer"])),(l()(),e["\u0275eld"](21,0,null,null,3,"li",[],null,null,null,null,null)),(l()(),e["\u0275eld"](22,0,null,null,2,"a",[["href","distributor.html"]],null,null,null,null,null)),(l()(),e["\u0275eld"](23,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-caret-right"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" \xa0 Distributor"])),(l()(),e["\u0275eld"](25,0,null,null,3,"li",[],null,null,null,null,null)),(l()(),e["\u0275eld"](26,0,null,null,2,"a",[["href","wholesaler.html"]],null,null,null,null,null)),(l()(),e["\u0275eld"](27,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-caret-right"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" \xa0 Wholesaler"])),(l()(),e["\u0275eld"](29,0,null,null,3,"li",[],null,null,null,null,null)),(l()(),e["\u0275eld"](30,0,null,null,2,"a",[["href","retailer.html"]],null,null,null,null,null)),(l()(),e["\u0275eld"](31,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-caret-right"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" \xa0 Retailer"])),(l()(),e["\u0275eld"](33,0,null,null,3,"li",[["class","last-border"]],null,null,null,null,null)),(l()(),e["\u0275eld"](34,0,null,null,2,"a",[["href","assets/img/trailLedgerHelpManual.chm"]],null,null,null,null,null)),(l()(),e["\u0275eld"](35,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-caret-right"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,[" \xa0 Help Files"])),(l()(),e["\u0275eld"](37,0,null,null,14,"div",[["class","col-sm-4 col-md-4"]],null,null,null,null,null)),(l()(),e["\u0275eld"](38,0,null,null,1,"h6",[["class","up-services"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Support Details"])),(l()(),e["\u0275eld"](40,0,null,null,11,"ul",[["class","personal-info"]],null,null,null,null,null)),(l()(),e["\u0275eld"](41,0,null,null,3,"li",[],null,null,null,null,null)),(l()(),e["\u0275eld"](42,0,null,null,2,"a",[["href","#"],["style","color: #ffffff;"]],null,null,null,null,null)),(l()(),e["\u0275eld"](43,0,null,null,0,"i",[["class","fa fa-envelope"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Support"])),(l()(),e["\u0275eld"](45,0,null,null,2,"li",[],null,null,null,null,null)),(l()(),e["\u0275eld"](46,0,null,null,0,"i",[["class","fa fa-phone"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["+91 98860 41305"])),(l()(),e["\u0275eld"](48,0,null,null,3,"li",[],null,null,null,null,null)),(l()(),e["\u0275eld"](49,0,null,null,2,"a",[["href","http://lambdablocks.com/"],["style","color: #ffffff;"],["target","_blank"]],null,null,null,null,null)),(l()(),e["\u0275eld"](50,0,null,null,0,"i",[["class","fa fa-globe"]],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["www.LambdaBlocks.com"])),(l()(),e["\u0275eld"](52,0,null,null,4,"div",[["class","rights"]],null,null,null,null,null)),(l()(),e["\u0275eld"](53,0,null,null,3,"div",[["class","container"]],null,null,null,null,null)),(l()(),e["\u0275eld"](54,0,null,null,2,"div",[["class","text_center"]],null,null,null,null,null)),(l()(),e["\u0275eld"](55,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),e["\u0275ted"](-1,null,["Copyright \xa9 2019 LambdaBlocks. All Rights Reserved."]))],null,null)}var C=function(){function l(){this.isPrinting=!1}return l.prototype.ngOnInit=function(){},l}(),w=e["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function M(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,11,"div",[["class","wrapper"]],null,null,null,null,null)),(l()(),e["\u0275eld"](1,0,null,null,1,"app-header",[],[[2,"isPrinting",null]],null,null,m,p)),e["\u0275did"](2,245760,null,0,c,[s.a],null,null),(l()(),e["\u0275eld"](3,0,null,null,1,"app-sidebar",[],null,null,null,v,g)),e["\u0275did"](4,114688,null,0,b,[],null,null),(l()(),e["\u0275eld"](5,0,null,null,4,"div",[["class","main-panel desc-panel"]],null,null,null,null,null)),(l()(),e["\u0275eld"](6,0,null,null,3,"div",[["class","main-content"]],null,null,null,null,null)),(l()(),e["\u0275eld"](7,0,null,null,2,"div",[["class","content-wrapper desc-panel"]],null,null,null,null,null)),(l()(),e["\u0275eld"](8,16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),e["\u0275did"](9,212992,null,0,f.o,[f.b,e.ViewContainerRef,e.ComponentFactoryResolver,[8,null],e.ChangeDetectorRef],null,null),(l()(),e["\u0275eld"](10,0,null,null,1,"app-footer",[],[[2,"isPrinting",null]],null,null,L,k)),e["\u0275did"](11,49152,null,0,y,[],null,null)],function(l,n){l(n,2,0),l(n,4,0),l(n,9,0)},function(l,n){var u=n.component;l(n,1,0,!u.isPrinting),l(n,10,0,!u.isPrinting)})}function S(l){return e["\u0275vid"](0,[(l()(),e["\u0275eld"](0,0,null,null,1,"app-pages",[],null,null,null,M,w)),e["\u0275did"](1,114688,null,0,C,[],null,null)],function(l,n){l(n,1,0)},null)}var R=e["\u0275ccf"]("app-pages",C,S,{},{},[]),D=u("XBuG"),N=u("YtD8"),F=u("P9z2"),O=u("p0ck"),T=u("B0zD"),x=u("tc02"),A=u("6k3F"),K=u("GcV1"),P=u("dpEq"),_=u("gIcY"),j=u("u1Dc"),I=u("t/Na"),z=u("8SOd"),B=u("eDkP"),q=u("Fzqc"),Z=u("4tE/"),U=u("o3x0"),W=u("NJnL"),E=u("lqqz"),G=u("DQlY"),Y=u("5Ccn"),H=u("AmEu"),V=u("k2u+"),J=u("Wf4p"),Q=u("ZYjt"),X=u("FVSy"),$=u("eF4m"),ll=u("dWZg"),nl=u("4c35"),ul=u("qAlS"),el=u("LC5p"),al=u("Blfk"),tl=u("PCNd"),dl=function(){return function(){}}(),ol=u("ea/W"),rl=u("/2RN"),il=u("W+kz"),cl=u("l7hM"),sl=u("U5Cf"),pl=u("Gx4f"),ml=u("4LBu"),fl=u("kq2R"),hl=u("IEvM"),bl=u("AAGW"),gl=u("H70O"),vl=u("qSCF"),yl=u("qiuZ");u.d(n,"PagesModuleNgFactory",function(){return kl});var kl=e["\u0275cmf"](a,[],function(l){return e["\u0275mod"]([e["\u0275mpd"](512,e.ComponentFactoryResolver,e["\u0275CodegenComponentFactoryResolver"],[[8,[t.a,d.a,d.b,o.a,r.a,i.a,R,D.c,N.a,F.a,O.a,T.a,x.c,A.a,K.c,D.a,F.b,D.b,x.a,x.b,K.a,K.b,P.a]],[3,e.ComponentFactoryResolver],e.NgModuleRef]),e["\u0275mpd"](4608,h.NgLocalization,h.NgLocaleLocalization,[e.LOCALE_ID,[2,h["\u0275angular_packages_common_common_a"]]]),e["\u0275mpd"](4608,_.B,_.B,[]),e["\u0275mpd"](4608,_.e,_.e,[]),e["\u0275mpd"](4608,j.i,j.i,[]),e["\u0275mpd"](4608,j.k,j.k,[I.c]),e["\u0275mpd"](4608,j.c,j.c,[j.i,j.k]),e["\u0275mpd"](4608,z.i,z.i,[]),e["\u0275mpd"](4608,z.g,z.g,[]),e["\u0275mpd"](4608,z.f,z.f,[]),e["\u0275mpd"](4608,B.a,B.a,[B.g,B.c,e.ComponentFactoryResolver,B.f,B.d,e.Injector,e.NgZone,h.DOCUMENT,q.b,[2,h.Location]]),e["\u0275mpd"](5120,B.h,B.i,[B.a]),e["\u0275mpd"](5120,Z.a,Z.b,[B.a]),e["\u0275mpd"](5120,U.c,U.d,[B.a]),e["\u0275mpd"](135680,U.e,U.e,[B.a,e.Injector,[2,h.Location],[2,U.b],U.c,[3,U.e],B.c]),e["\u0275mpd"](4608,W.a,W.a,[e.NgZone,e.RendererFactory2,e.PLATFORM_ID]),e["\u0275mpd"](4608,E.a,E.a,[e.ComponentFactoryResolver,e.NgZone,e.Injector,W.a,e.ApplicationRef]),e["\u0275mpd"](4608,G.b,G.b,[e.RendererFactory2,E.a]),e["\u0275mpd"](4608,Y.b,Y.b,[e.PLATFORM_ID]),e["\u0275mpd"](4608,G.a,G.a,[]),e["\u0275mpd"](1073742336,h.CommonModule,h.CommonModule,[]),e["\u0275mpd"](1073742336,f.n,f.n,[[2,f.t],[2,f.l]]),e["\u0275mpd"](1073742336,_.z,_.z,[]),e["\u0275mpd"](1073742336,_.j,_.j,[]),e["\u0275mpd"](1073742336,_.v,_.v,[]),e["\u0275mpd"](1073742336,j.j,j.j,[]),e["\u0275mpd"](1073742336,H.c,H.c,[]),e["\u0275mpd"](1073742336,H.D,H.D,[]),e["\u0275mpd"](1073742336,H.L,H.L,[]),e["\u0275mpd"](1073742336,H.N,H.N,[]),e["\u0275mpd"](1073742336,H.h,H.h,[]),e["\u0275mpd"](1073742336,H.b,H.b,[]),e["\u0275mpd"](1073742336,V.a,V.a,[]),e["\u0275mpd"](1073742336,z.c,z.c,[]),e["\u0275mpd"](1073742336,q.a,q.a,[]),e["\u0275mpd"](1073742336,J.b,J.b,[[2,J.a],[2,Q.g]]),e["\u0275mpd"](1073742336,X.d,X.d,[]),e["\u0275mpd"](1073742336,G.e,G.e,[]),e["\u0275mpd"](1073742336,Y.a,Y.a,[]),e["\u0275mpd"](1073742336,$.a,$.a,[]),e["\u0275mpd"](1073742336,ll.b,ll.b,[]),e["\u0275mpd"](1073742336,J.f,J.f,[]),e["\u0275mpd"](1073742336,J.e,J.e,[]),e["\u0275mpd"](1073742336,J.c,J.c,[]),e["\u0275mpd"](1073742336,nl.f,nl.f,[]),e["\u0275mpd"](1073742336,ul.b,ul.b,[]),e["\u0275mpd"](1073742336,B.e,B.e,[]),e["\u0275mpd"](1073742336,Z.c,Z.c,[]),e["\u0275mpd"](1073742336,el.b,el.b,[]),e["\u0275mpd"](1073742336,U.j,U.j,[]),e["\u0275mpd"](1073742336,al.c,al.c,[]),e["\u0275mpd"](1073742336,tl.a,tl.a,[]),e["\u0275mpd"](1073742336,dl,dl,[]),e["\u0275mpd"](1073742336,ol.a,ol.a,[]),e["\u0275mpd"](1073742336,rl.a,rl.a,[]),e["\u0275mpd"](1073742336,il.a,il.a,[]),e["\u0275mpd"](1073742336,cl.a,cl.a,[]),e["\u0275mpd"](1073742336,a,a,[]),e["\u0275mpd"](256,z.a,{notFoundText:"No items found",typeToSearchText:"Type to search",addTagText:"Add item",loadingText:"Loading...",clearAllText:"Clear all",disableVirtualScroll:!1},[]),e["\u0275mpd"](1024,f.j,function(){return[[{path:"",component:C,children:[{path:"oc-list",loadChildren:"./dashboard/dashboard.module#DashboardModule"},{path:"oc-history",loadChildren:"./oc-history/oc-history.module#OcHistoryModule"},{path:"oc-upload",loadChildren:"./oc-upload/oc-upload.module#OcUploadModule"},{path:"dashboard",loadChildren:"./dashboard2/dashboard2.module#Dashboard2Module"},{path:"product",loadChildren:"./product/product.module#ProductModule"},{path:"spare",loadChildren:"./spare/spare.module#SpareModule"},{path:"sub-assembly",loadChildren:"./sub-assembly/sub-assembly.module#SubAssemblyModule"},{path:"",redirectTo:"oc-list",pathMatch:"full"}]}],[{path:"",component:sl.c},{path:"add-oc",component:pl.a},{path:"edit-oc/:id",component:pl.a},{path:"add-edit-srno",component:ml.a},{path:"add-edit-labels",component:fl.a},{path:"view-oc/:id",component:hl.a},{path:"upload/:id",component:bl.c},{path:"scan-oc",component:gl.a},{path:"report/:id",component:vl.c}],[{path:"",component:yl.a}]]},[])])})}}]);
(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{MDPZ:function(l,n,e){"use strict";e.r(n);var u=e("CcnG"),t=function(){return function(){}}(),o=e("pMnS"),d=e("z5nN"),i=e("Ip0R"),a=e("gIcY"),s=e("gMr2"),c=e("8SOd"),r=e("uqJq"),p=(e("q2se"),function(){function l(l,n,e,u,t){var o=this;this.dashboardService=l,this.router=n,this.authenticationService=e,this.route=u,this.toasterService=t,this.fileToUpload=null,this.docHash="",this.fileNote="",this.productList=[],this.ocList=[],this.selectedProduct="",this.selectedOc=[],this.ocFilterList=[],this.currentUser$=this.authenticationService.currentUserSubject.subscribe(function(l){null!=l&&(o.currentUser=l)})}return l.prototype.ngOnInit=function(){this.getProduct(),this.getOcList()},l.prototype.ngOnDestroy=function(){this.currentUser$.unsubscribe()},l.prototype.getProduct=function(){var l=this;this.dashboardService.getProductList().subscribe(function(n){"success"===n.status&&n.data?l.productList=n.data.productList:l.toasterService.error(n.message)})},l.prototype.getOcList=function(){var l,n=this;l={roleName:this.currentUser.userRole},"Branch/Dealer"===this.currentUser.userRole&&(l.branchId=this.currentUser.user.branchId),this.dashboardService.getOcList(l).subscribe(function(l){"success"===l.status&&(n.ocList=l.data.ocList)})},l.prototype.handleFileInput=function(l){var n=this;this.fileToUpload=l[0],console.log(this.fileToUpload);var e=new FileReader;e.readAsBinaryString(this.fileToUpload),e.onload=function(){n.docHash=btoa(e.result)}},l.prototype.onUploadFile=function(l){var n=this;if(null!=this.fileToUpload){console.log("this.sele",this.selectedOc);var e=0,u="",t="";this.selectedOc.length&&this.selectedOc.forEach(function(o,d){var i=new FormData;i.append("FileInfo",JSON.stringify({ocid:o,documentname:n.fileToUpload.name,uploadedby:n.currentUser.user.name,uploadeddate:new Date,notes:n.fileNote})),i.append("file",new File([n.fileToUpload],n.fileToUpload.name+".")),console.log("body",i),n.dashboardService.uploadDocument(i).subscribe(function(o){"success"===o.status?(u=o.message,++e==n.selectedOc.length&&d==n.selectedOc.length-1&&(n.toasterService.success(u),l.resetForm(),n.selectedOc=[],n.fileNote="",n.fileToUpload=null,n.myInput.nativeElement.value="")):(t=o.message,e!==n.selectedOc.length&&d==n.selectedOc.length-1&&n.toasterService.error(t))})})}else this.toasterService.error("Select File to Upload!!")},l.prototype.onBack=function(){this.router.navigate(["/pages/dashboard"])},l}()),m=e("ZYCi"),g=e("XGZ3"),v=e("SZbH"),h=u["\u0275crt"]({encapsulation:0,styles:[[""]],data:{}});function f(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,0,"input",[["type","checkbox"]],[[8,"id",0],[8,"checked",0]],null,null,null,null)),(l()(),u["\u0275ted"](1,null,[" "," "]))],null,function(l,n){var e=n.component;l(n,0,0,u["\u0275inlineInterpolate"](1,"item-",n.context.index,""),e.selectedOc.indexOf(n.context.item._id)>-1),l(n,1,0,n.context.item.OCNumber)})}function b(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"div",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,[" Oc is required. "]))],null,null)}function C(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,2,"div",[["class","errors"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,b)),u["\u0275did"](2,16384,null,0,i.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null)],function(l,n){l(n,2,0,u["\u0275nov"](n.parent,34).errors&&u["\u0275nov"](n.parent,34).errors.required)},null)}function y(l){return u["\u0275vid"](0,[u["\u0275qud"](402653184,1,{myInput:0}),(l()(),u["\u0275eld"](1,0,null,null,62,"div",[["class","container"]],null,null,null,null,null)),(l()(),u["\u0275eld"](2,0,null,null,61,"div",[["class","panel"]],null,null,null,null,null)),(l()(),u["\u0275eld"](3,0,null,null,2,"div",[["class","panel-heading"]],null,null,null,null,null)),(l()(),u["\u0275eld"](4,0,null,null,1,"h3",[["class","panel-hd"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["OC Documents"])),(l()(),u["\u0275eld"](6,0,null,null,57,"div",[["class","panel-body"]],null,null,null,null,null)),(l()(),u["\u0275eld"](7,0,null,null,56,"form",[["class","form-horizontal mt-5 ml-5 mr-5"],["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],function(l,n,e){var t=!0;return"submit"===n&&(t=!1!==u["\u0275nov"](l,9).onSubmit(e)&&t),"reset"===n&&(t=!1!==u["\u0275nov"](l,9).onReset()&&t),t},null,null)),u["\u0275did"](8,16384,null,0,a.A,[],null,null),u["\u0275did"](9,4210688,[["uploadFile",4]],0,a.q,[[8,null],[8,null]],null,null),u["\u0275prd"](2048,null,a.c,null,[a.q]),u["\u0275did"](11,16384,null,0,a.p,[[4,a.c]],null,null),(l()(),u["\u0275eld"](12,0,null,null,28,"div",[["class","row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](13,0,null,null,27,"div",[["class","col-md-6"]],null,null,null,null,null)),(l()(),u["\u0275eld"](14,0,null,null,26,"div",[["class","form-group required"]],null,null,null,null,null)),(l()(),u["\u0275eld"](15,0,null,null,1,"label",[["class","col-sm-4 control-label"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["OC Number"])),(l()(),u["\u0275eld"](17,0,null,null,23,"div",[["class","col-sm-8"]],null,null,null,null,null)),(l()(),u["\u0275eld"](18,0,null,null,20,"ng-select",[["bindLabel","OCNumber"],["bindValue","_id"],["class","ng-select"],["name","oc"],["required",""],["role","listbox"]],[[1,"required",0],[2,"ng-select-single",null],[2,"ng-select-typeahead",null],[2,"ng-select-multiple",null],[2,"ng-select-taggable",null],[2,"ng-select-searchable",null],[2,"ng-select-opened",null],[2,"ng-select-disabled",null],[2,"ng-select-filtered",null],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"keydown"]],function(l,n,e){var t=!0,o=l.component;return"keydown"===n&&(t=!1!==u["\u0275nov"](l,21).handleKeyDown(e)&&t),"ngModelChange"===n&&(t=!1!==(o.selectedOc=e)&&t),t},s.b,s.a)),u["\u0275did"](19,16384,null,0,a.w,[],{required:[0,"required"]},null),u["\u0275prd"](1024,null,a.l,function(l){return[l]},[a.w]),u["\u0275did"](21,4964352,null,11,c.b,[c.a,[8,null],u.ChangeDetectorRef,c.i,u.NgZone,c.g,u.ElementRef],{items:[0,"items"],bindLabel:[1,"bindLabel"],bindValue:[2,"bindValue"],closeOnSelect:[3,"closeOnSelect"],multiple:[4,"multiple"]},null),u["\u0275qud"](335544320,2,{optionTemplate:0}),u["\u0275qud"](335544320,3,{optgroupTemplate:0}),u["\u0275qud"](335544320,4,{labelTemplate:0}),u["\u0275qud"](335544320,5,{multiLabelTemplate:0}),u["\u0275qud"](335544320,6,{headerTemplate:0}),u["\u0275qud"](335544320,7,{footerTemplate:0}),u["\u0275qud"](335544320,8,{notFoundTemplate:0}),u["\u0275qud"](335544320,9,{typeToSearchTemplate:0}),u["\u0275qud"](335544320,10,{loadingTextTemplate:0}),u["\u0275qud"](335544320,11,{tagTemplate:0}),u["\u0275qud"](603979776,12,{ngOptions:1}),u["\u0275prd"](1024,null,a.m,function(l){return[l]},[c.b]),u["\u0275did"](34,671744,[["ocId",4]],0,a.r,[[2,a.c],[6,a.l],[8,null],[6,a.m]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),u["\u0275prd"](2048,null,a.n,null,[a.r]),u["\u0275did"](36,16384,null,0,a.o,[[4,a.n]],null,null),(l()(),u["\u0275and"](0,[[2,2]],null,1,null,f)),u["\u0275did"](38,16384,null,0,c.d,[u.TemplateRef],null,null),(l()(),u["\u0275and"](16777216,null,null,1,null,C)),u["\u0275did"](40,16384,null,0,i.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275eld"](41,0,null,null,21,"div",[["class","row"]],null,null,null,null,null)),(l()(),u["\u0275eld"](42,0,null,null,1,"div",[["class","col-md-3"]],null,null,null,null,null)),(l()(),u["\u0275eld"](43,0,[[1,0],["myInput",1]],null,0,"input",[["id","file"],["name","file"],["type","file"]],null,[[null,"change"]],function(l,n,e){var u=!0;return"change"===n&&(u=!1!==l.component.handleFileInput(e.target.files)&&u),u},null,null)),(l()(),u["\u0275eld"](44,0,null,null,12,"div",[["class","col-md-3"]],null,null,null,null,null)),(l()(),u["\u0275eld"](45,0,null,null,11,"div",[["class","form-group"]],null,null,null,null,null)),(l()(),u["\u0275eld"](46,0,null,null,1,"label",[["class","col-sm-3 control-label"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Note"])),(l()(),u["\u0275eld"](48,0,null,null,8,"div",[["class","col-sm-8"]],null,null,null,null,null)),(l()(),u["\u0275eld"](49,0,null,null,7,"input",[["class","form-control"],["maxlength","50"],["name","filetext"],["placeholder","File Note"],["type","text"]],[[1,"maxlength",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(l,n,e){var t=!0,o=l.component;return"input"===n&&(t=!1!==u["\u0275nov"](l,50)._handleInput(e.target.value)&&t),"blur"===n&&(t=!1!==u["\u0275nov"](l,50).onTouched()&&t),"compositionstart"===n&&(t=!1!==u["\u0275nov"](l,50)._compositionStart()&&t),"compositionend"===n&&(t=!1!==u["\u0275nov"](l,50)._compositionEnd(e.target.value)&&t),"ngModelChange"===n&&(t=!1!==(o.fileNote=e)&&t),t},null,null)),u["\u0275did"](50,16384,null,0,a.d,[u.Renderer2,u.ElementRef,[2,a.a]],null,null),u["\u0275did"](51,540672,null,0,a.k,[],{maxlength:[0,"maxlength"]},null),u["\u0275prd"](1024,null,a.l,function(l){return[l]},[a.k]),u["\u0275prd"](1024,null,a.m,function(l){return[l]},[a.d]),u["\u0275did"](54,671744,null,0,a.r,[[2,a.c],[6,a.l],[8,null],[6,a.m]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),u["\u0275prd"](2048,null,a.n,null,[a.r]),u["\u0275did"](56,16384,null,0,a.o,[[4,a.n]],null,null),(l()(),u["\u0275eld"](57,0,null,null,2,"div",[["class","col-md-2"]],null,null,null,null,null)),(l()(),u["\u0275eld"](58,0,null,null,1,"button",[["class","btn btn-primary btn-asset  mb-5"],["type","button"]],[[8,"disabled",0]],[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.onUploadFile(u["\u0275nov"](l,9))&&t),t},null,null)),(l()(),u["\u0275ted"](-1,null,["Upload File"])),(l()(),u["\u0275eld"](60,0,null,null,2,"div",[["class","col-md-2"]],null,null,null,null,null)),(l()(),u["\u0275eld"](61,0,null,null,1,"button",[["class","btn btn-primary btn-asset"],["type","button"]],null,[[null,"click"]],function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.onBack()&&u),u},null,null)),(l()(),u["\u0275ted"](-1,null,["Back "])),(l()(),u["\u0275eld"](63,0,null,null,0,"br",[],null,null,null,null,null))],function(l,n){var e=n.component;l(n,19,0,""),l(n,21,0,e.ocList,"OCNumber","_id",!1,!0),l(n,34,0,"oc",e.selectedOc),l(n,40,0,u["\u0275nov"](n,34).invalid&&(u["\u0275nov"](n,34).dirty||u["\u0275nov"](n,34).touched)),l(n,51,0,"50"),l(n,54,0,"filetext",e.fileNote)},function(l,n){l(n,7,0,u["\u0275nov"](n,11).ngClassUntouched,u["\u0275nov"](n,11).ngClassTouched,u["\u0275nov"](n,11).ngClassPristine,u["\u0275nov"](n,11).ngClassDirty,u["\u0275nov"](n,11).ngClassValid,u["\u0275nov"](n,11).ngClassInvalid,u["\u0275nov"](n,11).ngClassPending),l(n,18,1,[u["\u0275nov"](n,19).required?"":null,!u["\u0275nov"](n,21).multiple,u["\u0275nov"](n,21).typeahead,u["\u0275nov"](n,21).multiple,u["\u0275nov"](n,21).addTag,u["\u0275nov"](n,21).searchable,u["\u0275nov"](n,21).isOpen,u["\u0275nov"](n,21).isDisabled,u["\u0275nov"](n,21).filtered,u["\u0275nov"](n,36).ngClassUntouched,u["\u0275nov"](n,36).ngClassTouched,u["\u0275nov"](n,36).ngClassPristine,u["\u0275nov"](n,36).ngClassDirty,u["\u0275nov"](n,36).ngClassValid,u["\u0275nov"](n,36).ngClassInvalid,u["\u0275nov"](n,36).ngClassPending]),l(n,49,0,u["\u0275nov"](n,51).maxlength?u["\u0275nov"](n,51).maxlength:null,u["\u0275nov"](n,56).ngClassUntouched,u["\u0275nov"](n,56).ngClassTouched,u["\u0275nov"](n,56).ngClassPristine,u["\u0275nov"](n,56).ngClassDirty,u["\u0275nov"](n,56).ngClassValid,u["\u0275nov"](n,56).ngClassInvalid,u["\u0275nov"](n,56).ngClassPending),l(n,58,0,u["\u0275nov"](n,9).invalid)})}function T(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"app-oc-upload",[],null,null,null,y,h)),u["\u0275did"](1,245760,null,0,p,[r.a,m.l,g.a,m.a,v.j],null,null)],function(l,n){l(n,1,0)},null)}var O=u["\u0275ccf"]("app-oc-upload",p,T,{},{},[]),N=e("u1Dc"),q=e("t/Na"),F=e("eDkP"),I=e("Fzqc"),L=e("4tE/"),S=e("NJnL"),U=e("lqqz"),R=e("DQlY"),x=e("5Ccn"),D=e("AmEu"),k=e("k2u+"),w=e("eF4m"),M=e("Wf4p"),P=e("ZYjt"),_=e("dWZg"),j=e("4c35"),A=e("qAlS"),Z=e("PCNd"),E=function(){return function(){}}();e.d(n,"OcUploadModuleNgFactory",function(){return V});var V=u["\u0275cmf"](t,[],function(l){return u["\u0275mod"]([u["\u0275mpd"](512,u.ComponentFactoryResolver,u["\u0275CodegenComponentFactoryResolver"],[[8,[o.a,d.a,d.b,O]],[3,u.ComponentFactoryResolver],u.NgModuleRef]),u["\u0275mpd"](4608,i.NgLocalization,i.NgLocaleLocalization,[u.LOCALE_ID,[2,i["\u0275angular_packages_common_common_a"]]]),u["\u0275mpd"](4608,a.B,a.B,[]),u["\u0275mpd"](4608,a.e,a.e,[]),u["\u0275mpd"](4608,N.i,N.i,[]),u["\u0275mpd"](4608,N.k,N.k,[q.c]),u["\u0275mpd"](4608,N.c,N.c,[N.i,N.k]),u["\u0275mpd"](4608,c.i,c.i,[]),u["\u0275mpd"](4608,c.g,c.g,[]),u["\u0275mpd"](4608,c.f,c.f,[]),u["\u0275mpd"](4608,F.a,F.a,[F.g,F.c,u.ComponentFactoryResolver,F.f,F.d,u.Injector,u.NgZone,i.DOCUMENT,I.b,[2,i.Location]]),u["\u0275mpd"](5120,F.h,F.i,[F.a]),u["\u0275mpd"](5120,L.a,L.b,[F.a]),u["\u0275mpd"](4608,S.a,S.a,[u.NgZone,u.RendererFactory2,u.PLATFORM_ID]),u["\u0275mpd"](4608,U.a,U.a,[u.ComponentFactoryResolver,u.NgZone,u.Injector,S.a,u.ApplicationRef]),u["\u0275mpd"](4608,R.b,R.b,[u.RendererFactory2,U.a]),u["\u0275mpd"](4608,x.b,x.b,[u.PLATFORM_ID]),u["\u0275mpd"](1073742336,i.CommonModule,i.CommonModule,[]),u["\u0275mpd"](1073742336,m.n,m.n,[[2,m.t],[2,m.l]]),u["\u0275mpd"](1073742336,a.z,a.z,[]),u["\u0275mpd"](1073742336,a.j,a.j,[]),u["\u0275mpd"](1073742336,a.v,a.v,[]),u["\u0275mpd"](1073742336,N.j,N.j,[]),u["\u0275mpd"](1073742336,D.c,D.c,[]),u["\u0275mpd"](1073742336,D.D,D.D,[]),u["\u0275mpd"](1073742336,D.L,D.L,[]),u["\u0275mpd"](1073742336,D.N,D.N,[]),u["\u0275mpd"](1073742336,D.h,D.h,[]),u["\u0275mpd"](1073742336,D.b,D.b,[]),u["\u0275mpd"](1073742336,k.a,k.a,[]),u["\u0275mpd"](1073742336,c.c,c.c,[]),u["\u0275mpd"](1073742336,R.e,R.e,[]),u["\u0275mpd"](1073742336,x.a,x.a,[]),u["\u0275mpd"](1073742336,w.a,w.a,[]),u["\u0275mpd"](1073742336,I.a,I.a,[]),u["\u0275mpd"](1073742336,M.b,M.b,[[2,M.a],[2,P.g]]),u["\u0275mpd"](1073742336,_.b,_.b,[]),u["\u0275mpd"](1073742336,M.f,M.f,[]),u["\u0275mpd"](1073742336,M.e,M.e,[]),u["\u0275mpd"](1073742336,M.c,M.c,[]),u["\u0275mpd"](1073742336,j.b,j.b,[]),u["\u0275mpd"](1073742336,A.b,A.b,[]),u["\u0275mpd"](1073742336,F.e,F.e,[]),u["\u0275mpd"](1073742336,L.c,L.c,[]),u["\u0275mpd"](1073742336,Z.a,Z.a,[]),u["\u0275mpd"](1073742336,E,E,[]),u["\u0275mpd"](1073742336,t,t,[]),u["\u0275mpd"](256,c.a,{notFoundText:"No items found",typeToSearchText:"Type to search",addTagText:"Add item",loadingText:"Loading...",clearAllText:"Clear all",disableVirtualScroll:!1},[]),u["\u0275mpd"](1024,m.j,function(){return[[{path:"",component:p}]]},[])])})}}]);
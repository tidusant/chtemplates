models["header"]={
	isInit:ko.observable(false),	
	curPage:ko.observable(),
	curLang:ko.observable(),
	LangLinks:ko.observable(),
	ModelName:'header',
	HtmlEl:'headerhtml',
  	KoEl:'headerhtml',
  	menuclick:function(data, e){		
		
        $("nav").toggleClass('hide');
        $("#menubutton").toggleClass("lnr-menu lnr-cross");
        $(".main-menu").addClass('mobile-menu');
	},

	getAssetFolder:function(folder){
		return getAppAssetFolder(folder);
	},
	init:function(){
		initModel(this);
	},
	CommonData:function(){
		return myApp["CommonData"];
	},
	Configs:function(){
		return myApp["Configs"];
	},
	isCurPage:function(pagename){
		return this.curPage==pagename;
	},
	isCurLang:function(lang){
		return this.curLang==lang;
	}
};
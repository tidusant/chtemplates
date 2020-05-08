models["header"]={
	isInit:ko.observable(false),	
	curPage:ko.observable(),
	curLang:ko.observable(),
	LangLinks:ko.observable(),
	ModelName:'header',
	HtmlEl:'headerhtml',
  	KoEl:'headerhtml',
  	test:ko.observable(),

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
		
		
		return this.curPage()==pagename;
	},
	isCurLang:function(lang){
		return this.curLang()==lang;
	}
};




models["home"]={
	isInit:ko.observable(false),
 data:ko.observable({}),  
  ModelName:'home',
  HtmlEl:'pagehtml',
  KoEl:'pagehtml',
  getAssetFolder:function(folder){
		return getAppAssetFolder(folder);
	},
	init:function(isRedirect){
		initModel(this,isRedirect);
	},
	CommonData:function(){
		return myApp["CommonData"];
	}
};
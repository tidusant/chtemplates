models["investors"]={
	isInit:ko.observable(false),
	data:ko.observable(),
	
  ModelName:'investors',
  HtmlEl:'pagecontent',
  KoEl:'pagecontent',
  getAssetFolder:function(folder){
    return getAppAssetFolder(folder);
  },
  CommonData:function(){
    return myApp["CommonData"];
  },
	init:function(isRedirect){
    initModel(this,isRedirect);   
		
	}
	
};
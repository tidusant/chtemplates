models["investors"]={
	isInit:ko.observable(false),
	data:ko.observable(),
	
  ModelName:'investors',
  HtmlEl:'pagecontent',
  KoEl:'pagecontent',
  getAssetFolder:function(folder){
    return getAppAssetFolder(folder);
  },
  
	init:function(isRedirect){
    initModel(this,isRedirect);   
		
	}
	
};
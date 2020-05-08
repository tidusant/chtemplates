models["property_management"]={
	isInit:ko.observable(false),
	data:ko.observable(),
	
  ModelName:'property_management',
  HtmlEl:'pagecontent',
  KoEl:'pagecontent',
  getAssetFolder:function(folder){
    return getAppAssetFolder(folder);
  },
	init:function(isRedirect){
    initModel(this,isRedirect);
		
	}
};
models["distressed_sellers"]={
	data:ko.observable(),
	
  ModelName:'distressed_sellers',
  HtmlEl:'pagecontent',
  KoEl:'pagecontent',
  getAssetFolder:function(folder){
    return getAppAssetFolder(folder);
  },
	init:function(isRedirect){
    initModel(this,isRedirect);   
		
	}
};

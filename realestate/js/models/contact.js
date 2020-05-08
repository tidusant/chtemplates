models["contact"]={
	data:ko.observable(),
	
  ModelName:'contact',
  HtmlEl:'pagecontent',
  KoEl:'pagecontent',
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
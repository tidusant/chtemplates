models["real_estate"]={
  isInit:ko.observable(false),
  data:ko.observable(),
  
  ModelName:'real_estate',
  HtmlEl:'pagecontent',
  KoEl:'pagecontent',
  getAssetFolder:function(folder){
    return getAppAssetFolder(folder);
  },
  init:function(isRedirect){
    initModel(this,isRedirect);   
  	
  }
};
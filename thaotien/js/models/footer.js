models["footer"]={
	
	ModelName:'footer',
	HtmlEl:'footerhtml',
  	KoEl:'footerhtml',
	getAssetFolder:function(folder){
		return getAppAssetFolder(folder);
	},
	init:function(){
		initModel(this);
	},
	CommonData:function(){
		return myApp["CommonData"];
	}

};
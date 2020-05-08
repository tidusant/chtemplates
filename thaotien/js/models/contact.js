models["contact"]={
	isInit:ko.observable(false),
	data:ko.observable({}),	
	
	  ModelName:'contact',
	  HtmlEl:'pagecontainer',
	  KoEl:'pagecontainer',
	init:function(isRedirect){
    initModel(this,isRedirect);
	},
	CommonData:function(){
		return myApp["CommonData"];
	}
};
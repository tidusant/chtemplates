models["contact"]={
	isInit:ko.observable(false),
	data:ko.observable({}),	
	
  ModelName:'contact',
  HtmlEl:'pagecontainer',
  KoEl:'pagecontainer',
	init:function(){
		initModel(this);
	},
	CommonData:function(){
		return myApp["CommonData"];
	}
};
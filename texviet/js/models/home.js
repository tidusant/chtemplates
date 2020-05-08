



models["home"]={
	isInit:ko.observable(false),
 data:ko.observable({}),  
  ModelName:'home',
  HtmlEl:'pagecontainer',
  KoEl:'pagecontainer',
	init:function(isRedirect){
    	initModel(this,isRedirect); 

	}
	,
	Configs:function(){
		return myApp["Configs"];
	},
	CommonData:function(){
		return myApp["CommonData"];
	}
};




models["home"]={
	isInit:ko.observable(false),
 data:ko.observable({}),  
  ModelName:'home',
  HtmlEl:'pagecontainer',
  KoEl:'pagecontainer',
	init:function(isRedirect){
    	initModel(this,isRedirect); 

	},
	CommonData:function(){
		return myApp["CommonData"];
	}
};
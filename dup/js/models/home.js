



models["home"]={
	isInit:ko.observable(false),
 data:ko.observable({}),  
  ModelName:'home',
  HtmlEl:'pagecontainer',
  KoEl:'pagecontainer',
	init:function(isRediredect){
		initModel(this,isRediredect);  
		
	},
	CommonData:function(){
		return myApp["CommonData"];
	}
};
models["home"]={
	isInit:ko.observable(false),
  data:ko.observable(),  
  ModelName:'home',
  HtmlEl:'pagecontent',
  KoEl:'pagecontent',
  getAssetFolder:function(folder){
    return getAppAssetFolder(folder);
  },  
  CommonData:function(){
    return myApp["CommonData"];
  },
  init:function(isRedirect){
    initModel(this,isRedirect);
    

    var window_width     = $(window).width();
    var window_height        = window.innerHeight;
    var header_height        = $(".default-header").height();
    var header_height_static = $(".site-header.static").outerHeight();
    var fitscreen            = window_height - header_height;

    $(".fullscreen").css("height", window_height);
    $(".fitscreen").css("height", fitscreen);

  
  

  //------- Active Nice Select --------//
     if(document.getElementById("default-select")){
          $('select').niceSelect();
    };

    if(document.getElementById("property")){
          $('select').niceSelect();
    };

    $("#range").ionRangeSlider({
              hide_min_max: true,
              keyboard: true,
              min: 0,
              max: 5000,
              from: 1000,
              to: 4000,
              type: 'double',
              step: 1,
              prefix: "$",
              grid: true
          });
    $("#range2").ionRangeSlider({
        hide_min_max: true,
        keyboard: true,
        min: 0,
        max: 5000,
        from: 1000,
        to: 4000,
        type: 'double',
        step: 1,
        prefix: "",
        grid: true
    }); 
    
	}
};
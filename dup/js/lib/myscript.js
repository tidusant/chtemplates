function Myscript() {
	var cartcount=0;
	this.init = function() {
		var window_width 	 = $(window).width(),
		window_height 		 = window.innerHeight,
		header_height 		 = $(".default-header").height(),
		header_height_static = $(".site-header.static").outerHeight(),
		fitscreen 			 = window_height - header_height;


		$(".fullscreen").css("height", window_height)
		$(".fitscreen").css("height", fitscreen);

	     
	     // -------   Active Mobile Menu-----//

	    $(".menu-bar").on('click', function(e){
	        e.preventDefault();
	        $("nav").toggleClass('hide');
	        $("span", this).toggleClass("lnr-menu lnr-cross");
	        $(".main-menu").addClass('mobile-menu');
	    });
	     
	    $('select').niceSelect();
	    $('.img-pop-up').magnificPopup({
	        type: 'image',
	        gallery:{
	        enabled:true
	        }
	    });

	  

	    $('.play-btn').magnificPopup({
	        disableOn: 700,
	        type: 'iframe',
	        mainClass: 'mfp-fade',
	        removalDelay: 160,
	        preloader: false,
	        fixedContentPos: false
	    });

		$('#mc_embed_signup').find('form').ajaxChimp();   

		$("body").show();
		this.initFunc();
	};

	this.initFunc=function(){
		
	};
	
}
var msc = new Myscript();
function Myscript() {
	var cartcount=0;
	this.init = function() {	
	
    	/*----------------------------------------------------*/
        /*  MailChimp Slider
        /*----------------------------------------------------*/
        function mailChimp(){
            $('#mc_embed_signup').find('form').ajaxChimp();
        }
        mailChimp();
    	
    	$('select').niceSelect();
    	
    	/*----------------------------------------------------*/
        /*  Simple LightBox js
        /*----------------------------------------------------*/
        $('.imageGallery1 .light').simpleLightbox();
    	
    	/*----------------------------------------------------*/
        /*  Jquery Ui slider js
        /*----------------------------------------------------*/
    	$( "#slider-range, #slider-range2" ).slider({
          range: true,
          min: 0,
          max: 500,
          values: [ 80, 500 ],
          slide: function( event, ui ) {
            $( "#amount, #amount2" ).val( "$" + ui.values[ 0 ] + " $" + ui.values[ 1 ] );
          }
        });
        $( "#amount, #amount2" ).val( "$" + $( "#slider-range, #slider-range2" ).slider( "values", 0 )+
          "   $" + $( "#slider-range, #slider-range2" ).slider( "values", 1 ) );
    	
    	
    	
    	$( "#slider-range2" ).slider({
          range: true,
          min: 0,
          max: 500,
          values: [ 80, 500 ],
          slide: function( event, ui ) {
            $( "#amount2" ).val( "$" + ui.values[ 0 ] + " $" + ui.values[ 1 ] );
          }
        });
        $( "#amount2" ).val( "$" + $( "#slider-range2" ).slider( "values", 0 )+
          "   $" + $( "#slider-range2" ).slider( "values", 1 ) );
    
		$("body").show();
		this.initFunc();
	};

	this.initFunc=function(){
		parallaxEffect();
        clients_slider();
        testi_slider();
        menuActive();
	};

    function menuActive() {
        console.log(commonData);
        $(".menu_nav li.active").removeClass("active");
        $("#menuitem-"+commonData["Page"]["Code"]).addClass("active");
       
    }


    /*----------------------------------------------------*/
    /*  Parallax Effect js
    /*----------------------------------------------------*/
    function parallaxEffect() {
        $('.bg-parallax').parallax();
    }
    
    
    /*----------------------------------------------------*/
    /*  Clients Slider
    /*----------------------------------------------------*/
    function clients_slider(){        
        if ( $('.clients_slider').length ){
            
            $('.clients_slider').owlCarousel({
                loop:true,
                margin: 30,
                items: 5,
                nav: false,
                autoplay: false,
                smartSpeed: 1500,
                dots:false, 
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    400: {
                        items: 2,
                    },
                    575: {
                        items: 3,
                    },
                    768: {
                        items: 4,
                    },
                    992: {
                        items: 5,
                    }
                }
            })
        }
    }
    
    
    /*----------------------------------------------------*/
    /*  Testimonials Slider
    /*----------------------------------------------------*/
    function testi_slider(){
        if ( $('.testi_slider').length ){
            $('.testi_slider').owlCarousel({
                loop:true,
                margin: 30,
                items: 2,
                nav: false,
                autoplay: false,
                smartSpeed: 1500,
                dots:true, 
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                    },
                    576: {
                        items: 2,
                    }
                }
            })
        }
    }

	
}
var msc = new Myscript();

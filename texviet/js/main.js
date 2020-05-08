//main js function call after js is loaded

var menuActive = false;
function mainjs() {
    models['header'].init();
    models['footer'].init();
    loadAllLink();

     

}
//function that call after reload page
function redirectinit() {
    loadAllLink();
    window.scrollTo(0,0);
  $("li.nav-item .nav-link").on("click",function(){        
        $('#navbarSupportedContent').collapse('hide');
    });
}
var nav_offset_top = $('.header_area').height()+50; 
 $(window).scroll(function() {
                
                var scroll = $(window).scrollTop();   
                if (scroll >= nav_offset_top ) {
                    $(".header_area").addClass("navbar_fixed");
                } else {
                    $(".header_area").removeClass("navbar_fixed");
                }
            });


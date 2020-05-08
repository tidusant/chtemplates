//main js function call after js is loaded
function mainjs(){
        models['header'].init();
    models['footer'].init();
    loadAllLink();
      
}
//function that call after reload page
function redirectinit(){
	loadAllLink();
	window.scrollTo(0,0);

	$(".navbar-nav li a").on('click', function(event) {
        $('#navbarSupportedContent').removeClass('show');
      });
	//-------- Active Sticky Js ----------//
    $(".default-header").sticky({topSpacing:0});
}

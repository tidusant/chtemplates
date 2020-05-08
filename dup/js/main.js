//main js function call after js is loaded

var menuActive = false;
function mainjs() {
    models['header'].init();
    models['footer'].init();
    $('body').addClass('dup-body');
    loadAllLink();
    initScrolling() ;


}
function initScrolling() {
    if ($('a[data-scroll-to]').length) {
        var links = $('a[data-scroll-to]');
        links.each(function() {
            var ele = $(this);
            var target = ele.data('scroll-to');
            ele.on('click', function(e) {
                mylog("click scrool");
                mylog($(window));
                e.preventDefault();
                $(window).scrollTo(target, 1500, {
                    offset: -90,
                    easing: 'easeInOutQuart'
                });
            });
        });
    }

}
//function that call after reload page
function redirectinit() {
    var window_width     = $(window).width(),
    window_height        = window.innerHeight,
    header_height        = $(".default-header").height(),
    header_height_static = $(".site-header.static").outerHeight(),
    fitscreen            = window_height - header_height;


    $(".fullscreen").css("height", window_height)
    $(".fitscreen").css("height", fitscreen);

     
     // -------   Active Mobile Menu-----//
    
     
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

    
}

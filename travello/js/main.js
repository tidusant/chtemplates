//main js function call after js is loaded

var menuActive = false;
function mainjs() {
    models["header"].init();
    models["footer"].init();
    loadAllLink();
    $(".headermenu li").on("click", function() {
        $(".headermenu li.active").removeClass("active");
        $(this).addClass("active");
    });

    setHeader();

    initMenu();
    initMenuScrolling();


}
//function that call after reload page
function redirectinit() {
    loadAllLink();
    window.scrollTo(0,0);
    //header click
    
    //initHomeSlider();
    //initIsotope();
    initTestimonialsSlider();
    
    initInput();


    setTimeout(function() {
        $(window).trigger('resize.px.parallax');
    }, 5375);

    initFunc();
}




function initFunc() {
    initHomeSlider();
    initTestimonialsSlider();
    $('.parallax-window').parallax();
};

/* 

   4. Init Home Slider

   */

function initHomeSlider() {
    if ($('.home_slider').length) {
        var homeSlider = $('.home_slider');
        homeSlider.owlCarousel({
            items: 1,
            autoplay: true,
            loop: true,
            nav: false,
            dots: false,
            smartSpeed: 1000
        });
    }
}

/* 

        2. Set Header

        */

function setHeader() {
    var header = $('.header');
var headerSocial = $('.header_social');

    if ($(window).scrollTop() > 127) {
        header.addClass('scrolled');
        headerSocial.addClass('scrolled');
    } else {
        header.removeClass('scrolled');
        headerSocial.removeClass('scrolled');
    }
}

/* 

3. Set Menu

*/

function initMenu() {

    var burger = $('.hamburger');
    if ($('.menu').length) {
        var menu = $('.menu');
        if ($('.hamburger').length) {
            burger.on('click', function() {
                if (menuActive) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });
        }
    }
    if ($('.menu_close').length) {
        var close = $('.menu_close');
        close.on('click', function() {
            if (menuActive) {
                closeMenu();
            }
        });
    }

    $(".menu_content li a").on("click",function(){
        closeMenu();
    });
}

function openMenu() {
    var menu = $('.menu');
    menu.addClass('active');
    menuActive = true;
}

function closeMenu() {
    var menu = $('.menu');
    menu.removeClass('active');
    menuActive = false;
}



/* 

5. Init Scrolling

*/

function initMenuScrolling() {
    if ($('.main_nav ul li a[data-scroll-to]').length) {
        var links = $('.main_nav ul li a[data-scroll-to]');
        links.each(function() {
            var ele = $(this);
            var target = ele.data('scroll-to');
            ele.on('click', function(e) {
                e.preventDefault();
                $(window).scrollTo(target, 1500, {
                    offset: -90,
                    easing: 'easeInOutQuart'
                });
            });
        });
    }

    if ($('.menu_content ul li a[data-scroll-to]').length) {
        var links = $('.menu_content ul li a[data-scroll-to]');
        links.each(function() {
            var ele = $(this);
            var target = ele.data('scroll-to');
            ele.on('click', function(e) {
                e.preventDefault();
                $(window).scrollTo(target, 1500, {
                    offset: -90,
                    easing: 'easeInOutQuart'
                });
                closeMenu();
            });
        });
    }
}

/* 

6. Init Isotope

*/

function initIsotope() {

    if ($('.item_grid').length) {
        var grid = $('.item_grid').isotope({
            itemSelector: '.item',
            getSortData: {
                price: function(itemElement) {
                    var priceEle = $(itemElement).find('.destination_price').text().replace('From $', '');
                    return parseFloat(priceEle);
                },
                name: '.destination_title a'
            },
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
    }
}

/* 

7. Init Testimonials Slider

*/

function initTestimonialsSlider() {

    if ($('.testimonials_slider').length) {
        var testSlider = $('.testimonials_slider');

        testSlider.owlCarousel({
            animateOut: 'fadeOut',
            animateIn: 'flipInX',
            items: 1,
            autoplay: true,
            loop: true,
            smartSpeed: 1200,
            dots: false,
            nav: false
        });

    }
}

/* 

8. Init Input

*/

function initInput() {

    if ($('.newsletter_input').length) {
        var inpt = $('.newsletter_input');
        inpt.each(function() {
            var ele = $(this);
            var border = ele.next();

            ele.focus(function() {
                border.css({
                    'visibility': "visible",
                    'opacity': "1"
                });
            });
            ele.blur(function() {
                border.css({
                    'visibility': "hidden",
                    'opacity': "0"
                });
            });

            ele.on("mouseenter", function() {
                border.css({
                    'visibility': "visible",
                    'opacity': "1"
                });
            });

            ele.on("mouseleave", function() {
                if (!ele.is(":focus")) {
                    border.css({
                        'visibility': "hidden",
                        'opacity': "0"
                    });
                }
            });

        });
    }

}

$(window).on('resize', function() {
    setHeader();

    setTimeout(function() {
        $(window).trigger('resize.px.parallax');
    }, 375);
});

$(document).on('scroll', function() {
    setHeader();
});
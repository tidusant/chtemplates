
$('#header__icon').click(function(e){
	console.log(e);
	window.scroll(0,0);
	$('body').toggleClass('with--sidebar');
});  
$('#mainmenu').hover(function(e){
	$('#plugin_menuCat').attr('style','');
	
});

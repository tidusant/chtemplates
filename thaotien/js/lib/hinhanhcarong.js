
$('#DetailController .maindetail .thumbnail img').each(function( index ) {
$( this ).css({'width':'100px','float':'left','margin-left':'10px'});
$( this ).parent().attr('data-src',$( this ).attr('src'));
});


lightGallery(document.getElementById('lightgallery'));
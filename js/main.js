
function mycarousel_initCallback(carousel) {
	    $('.slider-navigation a').bind('click', function() {
	        carousel.scroll($.jcarousel.intval($(this).text()));
	        return false;
	    });	        
};
	
function mycarousel_itemFirstInCallback(carousel, item, idx, state) {
	$('.slider-navigation a').removeClass('active');
	$('.slider-navigation a').eq(idx-1).addClass('active');
};

$(document).ready(function(){
	
	$(".slider-holder ul").jcarousel({
		scroll: 1,
        wrap:"both",
        auto: 4,
        start: 1,
        itemFirstInCallback: mycarousel_itemFirstInCallback,
        initCallback: mycarousel_initCallback,
        // This tells jCarousel NOT to autobuild prev/next buttons
        buttonNextHTML: null,
        buttonPrevHTML: null	
	});
});
$(document).ready(function () {

    // 비디오 맞춰주는 스크립트
	$(".vid_wrap").fitVids();

    // 비디오 맞춰주는 스크립트.(매거진 세부의 경우)
    $(".box.magazine .content").fitVids();
    $(".box.single .content").fitVids();
   
    // masonry 스크립트
    $("#modules").masonry({
        itemSelector: '.module',
        isAnimated: false,
        columnWidth: 320
    });

    //모바일 베뉴 토글 스크립트
    $('a.menu_toggle').click(function() {
    	$mobile_menu = $('.mobile_menu');

    	if ($mobile_menu.hasClass('shown')) {
    		$mobile_menu.removeClass('shown');
    	} else {
    		$mobile_menu.addClass('shown');
    	}
    });


    
});
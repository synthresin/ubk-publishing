$(document).ready(function () {

    // 비디오 맞춰주는 스크립트

    function resizeVids() {

        var selector_string = "iframe[src*='player.vimeo.com'],iframe[src*='www.youtube.com'], iframe[src*='www.youtube-nocookie.com'], iframe[src*='www.kickstarter.com'], object, embed"

        $(selector_string).each(function(idx, elem){

          var $elem = $(elem);
          var width = $elem.width();
          var height = $elem.height();
          var ratio = width/height;

          var $parent = $elem.parent();
          var parentWidth = $parent.width();

          $elem.width(parentWidth);
          var newHeight = parentWidth / ratio;

          if(newHeight < 200) {
            $elem.height(200);
          } else {
            $elem.height(parentWidth / ratio );
          }
        });  
    }

    resizeVids();

    $(window).resize(resizeVids);
   
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
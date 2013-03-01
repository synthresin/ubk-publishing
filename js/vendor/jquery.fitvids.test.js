/*global jQuery */
/*jshint multistr:true browser:true */
/*!
* FitVids 1.0
*
* Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    };

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='www.youtube.com']",
        "iframe[src*='www.youtube-nocookie.com']",
        "iframe[src*='www.kickstarter.com']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = $(this).find(selectors.join(','));

      $(window).ready(function() {

        $allVideos.each(function(idx, elem){

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
      });

      $(window).resize(function() {

        $allVideos.each(function(idx, elem){

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
      });

      
    });
  };
})( jQuery );

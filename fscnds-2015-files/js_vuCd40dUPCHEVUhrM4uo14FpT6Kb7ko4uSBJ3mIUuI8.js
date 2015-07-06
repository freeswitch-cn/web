(function ($) {
  Drupal.behaviors.respImg = {
    attach: function (context) {
      Drupal.respImg_processSuffixes();
      $(window).resize(function() {
        if ($(window).width() > 10) {
          Drupal.respImg_processSuffixes();
        }
      });
    }
  }

  Drupal.respImg_getOptimalSuffix = function() {
    var devicePixelRatio = 1;
    if(window.devicePixelRatio !== undefined && Drupal.settings.respImg.useDevicePixelRatio) {
      devicePixelRatio = window.devicePixelRatio;
    }
    $.cookie(
      "respimg_ratio",
      devicePixelRatio,
      {
        path: Drupal.settings.basePath,
        expires: 1
      }
    );
    // Helper function to calculate width off border and scrollbars
    function borderAndScroll() {
      if (typeof borderAndScroll.current == 'undefined' ) {
        borderAndScroll.current = 0;
        if (window.innerWidth && window.outerWidth) {
          borderAndScroll.current = window.outerWidth - window.innerWidth;
        }
        else if (document.body.offsetWidth && document.body.clientWidth) {
          borderAndScroll.current = document.body.offsetWidth - document.body.clientWidth;
        }
      }
      return borderAndScroll.current;
    }

    var suffix = '';
    var suffix_set = false;
    var cookie_set = false;
    $.each(Drupal.settings.respImg.suffixes, function(index, value) {
      var breakpoint = value - borderAndScroll();
      if (breakpoint <= $(window).width() && !cookie_set) {
        // set cookie with new width
        $.cookie(
          "respimg",
          value,
          {
            path: Drupal.settings.basePath,
            expires: 1
          }
        );
        cookie_set = true;
      }
      if ((breakpoint / devicePixelRatio) <= $(window).width() && !suffix_set) {
        suffix = index;
        suffix_set = true;
      }
      if (cookie_set && suffix_set) {
        return false; // break .each
      }
    });
    return suffix;
  }

  Drupal.respImg_processSuffixes = function() {
    // Redirect user if needed / wanted
    if (Drupal.settings.respImg.current_suffix === false && Drupal.settings.respImg.forceRedirect == "1") {
      // Make sure browser accepts cookies
      if (Drupal.respImg_cookiesEnabled()) {
        var suffix = Drupal.respImg_getOptimalSuffix();
        location.replace(location.href);
        return;
      }
    }

    // get currently used suffix, or default
    var current_suffix = Drupal.settings.respImg.current_suffix;
    if (Drupal.settings.respImg.current_suffix === false) {
      current_suffix = Drupal.settings.respImg.default_suffix;
    }

    // get optimal suffix
    var suffix = Drupal.respImg_getOptimalSuffix();

    if (Drupal.settings.respImg.reloadOnResize == "1" && suffix !== '' && suffix !== current_suffix && Drupal.respImg_cookiesEnabled()) {
      setTimeout(function() {location.reload(true)}, 100);
      return;
    }

    if (Drupal.settings.respImg.forceResize == "1" && suffix !== '' && suffix !== current_suffix) {
      // support for images
      $('img').each(function() {
        var img = $(this);
        var src = img.attr('src').replace(current_suffix, suffix);
        img.attr('src', src);
        img.removeAttr('width');
        img.removeAttr('height');
      });

      // support for colorbox links
      $('a.colorbox').each(function() {
        var a = $(this);
        var href = a.attr('href').replace(current_suffix, suffix);
        a.attr('href', href);
      });

      // support for field_slideshow (kind of)
      if (typeof(Drupal.behaviors.field_slideshow) == "object") {
        $('div.field-slideshow-processed')
          .cycle('destroy')
          .removeClass('field-slideshow-processed')
          .css('width', '')
          .css('height', '')
          .css('padding-bottom', '')
          .each(function() {
            var $field = $(this);
            var $child = $field.children('div.field-slideshow-slide').first();
            console.log($child);
            console.log($child.css('width'));
            $field.css('width', $child.css('width'));
          });
        $('div.field-slideshow-slide').css('width', '').css('height', '');
        Drupal.behaviors.field_slideshow.attach();
      }

      // store last used suffix
      Drupal.settings.respImg.current_suffix = suffix;
    }
  }

  Drupal.respImg_cookiesEnabled = function() {
    var cookieEnabled = (navigator.cookieEnabled) ? true : false;

    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled)
    {
        $.cookie('respimg_test', 'ok');
        cookieEnabled = ($cookie('respimg_test') === 'ok');
    }
    return cookieEnabled;
  }
} (jQuery));;
/* $Id: lightbox_video.js,v 1.1.4.20 2010/09/21 17:57:22 snpower Exp $ */

/**
 * Lightbox video
 * @author
 *   Stella Power, <http://drupal.org/user/66894>
 */
var Lightvideo;

// start jQuery block
(function ($) {

Lightvideo = {

  // startVideo()
  startVideo: function (href) {
    if (Lightvideo.checkKnownVideos(href)) {
      return;
    }
    else if (href.match(/\.mov$/i)) {
      if (navigator.plugins && navigator.plugins.length) {
        Lightbox.modalHTML ='<object id="qtboxMovie" type="video/quicktime" codebase="http://www.apple.com/qtactivex/qtplugin.cab" data="'+href+'" width="'+Lightbox.modalWidth+'" height="'+Lightbox.modalHeight+'"><param name="allowFullScreen" value="true"></param><param name="src" value="'+href+'" /><param name="scale" value="aspect" /><param name="controller" value="true" /><param name="autoplay" value="true" /><param name="bgcolor" value="#000000" /><param name="enablejavascript" value="true" /></object>';
      } else {
        Lightbox.modalHTML = '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" width="'+Lightbox.modalWidth+'" height="'+Lightbox.modalHeight+'" id="qtboxMovie"><param name="allowFullScreen" value="true"></param><param name="src" value="'+href+'" /><param name="scale" value="aspect" /><param name="controller" value="true" /><param name="autoplay" value="true" /><param name="bgcolor" value="#000000" /><param name="enablejavascript" value="true" /></object>';
      }
    }
    else if (href.match(/\.wmv$/i) || href.match(/\.asx$/i)) {
      Lightbox.modalHTML = '<object NAME="Player" WIDTH="'+Lightbox.modalWidth+'" HEIGHT="'+Lightbox.modalHeight+'" align="left" hspace="0" type="application/x-oleobject" CLASSID="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6"><param name="allowFullScreen" value="true"></param><param NAME="URL" VALUE="'+href+'"></param><param NAME="AUTOSTART" VALUE="true"></param><param name="showControls" value="true"></param><embed WIDTH="'+Lightbox.modalWidth+'" HEIGHT="'+Lightbox.modalHeight+'" align="left" hspace="0" SRC="'+href+'" TYPE="application/x-oleobject" AUTOSTART="false"></embed></object>';
    }
    else {
      Lightbox.videoId = href;
      variables = '';
      if (!href.match(/\.swf$/i)) {
        href = Lightbox.flvPlayer + '?file=' + href;
        if (Lightbox.flvFlashvars.length) {
          variables = Lightbox.flvFlashvars;
        }
      }

      Lightvideo.createEmbed(href, "flvplayer", "#ffffff", variables);
    }
  },

  // createEmbed()
  createEmbed: function(href, id, color, variables) {
    var bgcolor = 'bgcolor="' + color + '"';
    var flashvars = '';
    if (variables) {
      flashvars = 'flashvars="' + variables + '"';

    }
    Lightbox.modalHTML = '<embed type="application/x-shockwave-flash" ' +
      'src="' + href + '" ' +
      'id="' + id + '" name="' + id + '" ' + bgcolor + ' ' +
      'quality="high" wmode="transparent" ' + flashvars + ' ' +
      'height="' + Lightbox.modalHeight + '" ' +
      'width="' + Lightbox.modalWidth + '" ' +
      'allowfullscreen="true" ' +
      '></embed>';
  },


  // checkKnownVideos()
  checkKnownVideos: function(href) {
    if (Lightvideo.checkYouTubeVideo(href) || Lightvideo.checkGoogleVideo(href) ||
      Lightvideo.checkMySpaceVideo(href) || Lightvideo.checkLiveVideo(href) ||
      Lightvideo.checkMetacafeVideo(href) ||
      Lightvideo.checkIFilmSpikeVideo(href) || Lightvideo.checkVimeoVideo(href)
      ) {
      return true;
    }
    return false;
  },


  // checkYouTubeVideo()
  checkYouTubeVideo: function(href) {
    var patterns = [
      'youtube.com/v/([^"&]+)',
      'youtube.com/watch\\?v=([^"&]+)',
      'youtube.com/\\?v=([^"&]+)'
      ];

    for (var i = 0; i < patterns.length; i++) {
      var pattern = new RegExp(patterns[i], "i");
      var results = pattern.exec(href);
      if (results !== null) {
        Lightbox.videoId = results[1];
        var href = "//www.youtube.com/embed/"+Lightbox.videoId;
        var variables = 'fs=1';
        if (Lightbox.flvFlashvars.length) {
          variables = variables + '&' + Lightbox.flvFlashvars;
          href = href + '&' + variables;
        }
        //Lightvideo.createEmbed(href, "flvvideo", "#ffffff", variables);
        Lightvideo.createIFrameEmbed(href, "flvvideo", "#ffffff");
        return true;
      }
    }
    return false;
  },

  // createIFrameEmbed()
  createIFrameEmbed: function(href, id, color, variables) {
    var bgcolor = 'bgcolor="' + color + '"';
    Lightbox.modalHTML = '<iframe width="'+Lightbox.modalWidth+'" height="'+Lightbox.modalHeight+'" ' +
      'src="' + href + '" webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder="0"' +
      '></iframe>';
  },  
  
  checkVimeoVideo: function(href) {
        var patterns = [
          'vimeo.com/([^/]*)'
          ];
     
        for (var i = 0; i < patterns.length; i++) {
          var pattern = new RegExp(patterns[i], "i");
          var results = pattern.exec(href);
          if (results !== null) {
            Lightbox.videoId = results[1];
            href = "//player.vimeo.com/video/"+Lightbox.videoId;
            Lightvideo.createIFrameEmbed(href, "flvvideo", "#ffffff");
            return true;
          }
        }
        return false;
  },


  // checkGoogleVideo()
  checkGoogleVideo: function(href) {
    var patterns = [
      'http://video.google.[a-z]{2,4}/googleplayer.swf\\?docId=(-?\\d*)',
      'http://video.google.[a-z]{2,4}/videoplay\\?docid=([^&]*)&',
      'http://video.google.[a-z]{2,4}/videoplay\\?docid=(.*)'
      ];

    for (var i = 0; i < patterns.length; i++) {
      var pattern = new RegExp(patterns[i], "i");
      var results = pattern.exec(href);
      if (results !== null) {
        Lightbox.videoId = results[1];
        var href = "http://video.google.com/googleplayer.swf?docId="+Lightbox.videoId+"&hl=en";
        var variables = 'fs=true';
        if (Lightbox.flvFlashvars.length) {
          variables = variables + '&' + Lightbox.flvFlashvars;
          href = href + '&' + variables;
        }
        Lightvideo.createEmbed(href, "flvvideo", "#ffffff", variables);
        return true;
      }
    }
    return false;
  },

  // checkMetacafeVideo()
  checkMetacafeVideo: function(href) {
    var patterns = [
      'metacafe.com/watch/(\.[^/]*)/(\.[^/]*)/',
      'metacafe.com/watch/(\.[^/]*)/(\.*)',
      'metacafe.com/fplayer/(\.[^/]*)/(\.[^.]*).'
      ];

    for (var i = 0; i < patterns.length; i++) {
      var pattern = new RegExp(patterns[i], "i");
      var results = pattern.exec(href);
      if (results !== null) {
        Lightbox.videoId = results[1];
        Lightvideo.createEmbed("http://www.metacafe.com/fplayer/"+Lightbox.videoId+"/.swf", "flvvideo", "#ffffff");
        return true;
      }
    }
    return false;
  },

  // checkIFilmSpikeVideo()
  checkIFilmSpikeVideo: function(href) {
    var patterns = [
      'spike.com/video/[^/&"]*?/(\\d+)',
      'ifilm.com/video/[^/&"]*?/(\\d+)',
      'spike.com/video/([^/&"]*)',
      'ifilm.com/video/([^/&"]*)'
      ];

    for (var i = 0; i < patterns.length; i++) {
      var pattern = new RegExp(patterns[i], "i");
      var results = pattern.exec(href);
      if (results !== null) {
        Lightbox.videoId = results[1];
        Lightvideo.createEmbed("http://www.spike.com/efp", "flvvideo", "#000", "flvbaseclip="+Lightbox.videoId+"&amp;");
        return true;
      }
    }
    return false;
  },

  // checkMySpaceVideo()
  checkMySpaceVideo: function(href) {
    var patterns = [
      'src="myspace.com/index.cfm\\?fuseaction=vids.individual&videoid=([^&"]+)',
      'myspace.com/index.cfm\\?fuseaction=vids.individual&videoid=([^&"]+)',
      'src="myspacetv.com/index.cfm\\?fuseaction=vids.individual&videoid=([^&"]+)"',
      'myspacetv.com/index.cfm\\?fuseaction=vids.individual&videoid=([^&"]+)'
      ];

    for (var i = 0; i < patterns.length; i++) {
      var pattern = new RegExp(patterns[i], "i");
      var results = pattern.exec(href);
      if (results !== null) {
        Lightbox.videoId = results[1];
        Lightvideo.createEmbed("http://lads.myspace.com/videos/vplayer.swf", "flvvideo", "#ffffff", "m="+Lightbox.videoId);
        return true;
      }
    }
    return false;
  },

  // checkLiveVideo()
  checkLiveVideo: function(href) {
    var patterns = [
      'livevideo.com/flvplayer/embed/([^"]*)"',
      'livevideo.com/video/[^/]*?/([^/]*)/',
      'livevideo.com/video/([^/]*)/'
      ];

    for (var i = 0; i < patterns.length; i++) {
      var pattern = new RegExp(patterns[i], "i");
      var results = pattern.exec(href);
      if (results !== null) {
        Lightbox.videoId = results[1];
        Lightvideo.createEmbed("http://www.livevideo.com/flvplayer/embed/"+Lightbox.videoId, "flvvideo", "#ffffff");
        return true;
      }
    }
    return false;
  }

};

//End jQuery block
}(jQuery));
;

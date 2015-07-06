(function($) {

  // Behavior to load FlexSlider
  Drupal.behaviors.flexslider = {
    attach: function(context, settings) {
      var sliders = [];
      if ($.type(settings.flexslider) !== 'undefined' && $.type(settings.flexslider.instances) !== 'undefined') {

        for (id in settings.flexslider.instances) {

          if (settings.flexslider.optionsets[settings.flexslider.instances[id]] !== undefined) {
            if (settings.flexslider.optionsets[settings.flexslider.instances[id]].asNavFor !== '') {
              // We have to initialize all the sliders which are "asNavFor" first.
              _flexslider_init(id, settings.flexslider.optionsets[settings.flexslider.instances[id]], context);
            } else {
              // Everyone else is second
              sliders[id] = settings.flexslider.optionsets[settings.flexslider.instances[id]];
            }
          }
        }
      }
      // Slider set
      for (id in sliders) {
        _flexslider_init(id, settings.flexslider.optionsets[settings.flexslider.instances[id]], context);
      }
    }
  };

  /**
   * Initialize the flexslider instance
   */

  function _flexslider_init(id, optionset, context) {
    $('#' + id, context).once('flexslider', function() {
      // Remove width/height attributes
      // @todo load the css path from the settings
      $(this).find('ul.slides > li > *').removeAttr('width').removeAttr('height');

      if (optionset) {
        // Add events that developers can use to interact.
        $(this).flexslider($.extend(optionset, {
          start: function(slider) {
            slider.trigger('start');
          },
          before: function(slider) {
            slider.trigger('before');
          },
          after: function(slider) {
            slider.trigger('after');
          },
          end: function(slider) {
            slider.trigger('end');
          },
          added: function(slider) {
            slider.trigger('added');
          },
          removed: function(slider) {
            slider.trigger('removed');
          }
        }));
      } else {
        $(this).flexslider();
      }
    });
  }

}(jQuery));
;
Drupal.settings.spotlight_settings = Drupal.settings.spotlight_settings || {};

(function ($) {

 /**
  * Get the total displacement of given region.
  *
  * @param region
  *   Region name. Either "top" or "bottom".
  *
  * @return
  *   The total displacement of given region in pixels.
  */
  if (Drupal.overlay) {
    Drupal.overlay.getDisplacement = function (region) {
      var displacement = 0;
      var lastDisplaced = $('.overlay-displace-' + region + ':last');
      if (lastDisplaced.length) {
        displacement = lastDisplaced.offset().top + lastDisplaced.outerHeight();

        // In modern browsers (including IE9), when box-shadow is defined, use the
        // normal height.
        var cssBoxShadowValue = lastDisplaced.css('box-shadow');
        var boxShadow = (typeof cssBoxShadowValue !== 'undefined' && cssBoxShadowValue !== 'none');
        // In IE8 and below, we use the shadow filter to apply box-shadow styles to
        // the toolbar. It adds some extra height that we need to remove.
        if (!boxShadow && /DXImageTransform\.Microsoft\.Shadow/.test(lastDisplaced.css('filter'))) {
          displacement -= lastDisplaced[0].filters.item('DXImageTransform.Microsoft.Shadow').strength;
          displacement = Math.max(0, displacement);
        }
      }
      return displacement;
    };
  };

 /**
  * Form behavior for Spotlight
  */
 Drupal.behaviors.panopolySpotlight = {
   attach: function (context, settings) {
     if ($('.field-name-field-basic-spotlight-items').length) {
       var rotation_time = Drupal.settings.spotlight_settings.rotation_time;
       $('.field-name-field-basic-spotlight-items').tabs().tabs("rotate", rotation_time, true);
       // $('.field-name-field-basic-spotlight-items').css('height', $('.field-name-field-basic-spotlight-items').height());
       // $('.field-name-field-basic-spotlight-items').css('overflow', 'hidden');

       // Navigation is hidden by default, display it if JavaScript is enabled.
       $('.panopoly-spotlight-buttons-wrapper').css('display', 'block');
       
       $('.panopoly-spotlight-pause-play').bind('click', function(event) {
         event.preventDefault();
         if ($(this).hasClass('paused')) {
           $('.field-name-field-basic-spotlight-items').tabs().tabs("rotate", rotation_time, true);
           $(this).text(Drupal.t('Pause'));
           $(this).removeClass('paused');
         } 
         else {
           $('.field-name-field-basic-spotlight-items').tabs().tabs("rotate", 0, false);
           $('.field-name-field-basic-spotlight-items .ui-tabs-nav li a').attr('tabindex', 0);
           $(this).text(Drupal.t('Play'));
           $(this).addClass('paused');
        }
       });
     }
   }
 }

 /**
  * Create responsive magic for Table Widget
  */
 Drupal.behaviors.panopolyWidgetTables = {
   attach: function (context, settings) {

     $('table.tablefield', context).each(function() {
       var table = $(this); // cache table object.
       var head = table.find('thead th');
       var rows = table.find('tbody tr').clone(); // appending afterwards does not break original table.

       // create new table
       var newtable = $(
         '<table class="mobile-table">' +
         '  <tbody>' +
         '  </tbody>' +
         '</table>'
       );

       // cache tbody where we'll be adding data.
       var newtable_tbody = newtable.find('tbody');

       rows.each(function(i) {
         var cols = $(this).find('td');
         var classname = i % 2 ? 'even' : 'odd';
         cols.each(function(k) {
           var new_tr = $('<tr class="' + classname + '"></tr>').appendTo(newtable_tbody);
           new_tr.append(head.clone().get(k));
           new_tr.append($(this));
         });
       });

       $(this).after(newtable);
     });

   }
 }
})(jQuery);
;
;(function($){
	$.extend( $.ui.tabs.prototype, {
		rotation: null,
		rotationDelay: null,
		continuing: null,
		rotate: function( ms, continuing ) {
			var self = this,
				o = this.options;

			if((ms > 1 || self.rotationDelay === null) && ms !== undefined){//only set rotationDelay if this is the first time through or if not immediately moving on from an unpause
				self.rotationDelay = ms;
			}

			if(continuing !== undefined){
				self.continuing = continuing;
			}

			var rotate = self._rotate || ( self._rotate = function( e ) {
				clearTimeout( self.rotation );
				self.rotation = setTimeout(function() {
					var t = o.active;
					self.option( "active",  ++t < self.anchors.length ? t : 0 );
				}, ms );

				if ( e ) {
					e.stopPropagation();
				}
			});

			var stop = self._unrotate || ( self._unrotate = !continuing
				? function(e) {
					if (e.clientX) { // in case of a true click
						self.rotate(null);
					}
				}
				: function( e ) {
					t = o.active;
					rotate();
				});

			// start rotation
			if ( ms ) {
				this.element.bind( "tabsactivate", rotate );
				this.anchors.bind( o.event + ".tabs", self.pause );
				rotate();
			// stop rotation
			} else {
				clearTimeout( self.rotation );
				this.element.unbind( "tabsactivate", rotate );
				this.anchors.unbind( o.event + ".tabs", self.pause );
				delete this._rotate;
				delete this._unrotate;
			}

			//rotate immediately and then have normal rotation delay
			if(ms === 1){
				//set ms back to what it was originally set to
				ms = self.rotationDelay;
			}

			return this;
		},
		pause: function() {
			var self = this,
				o = this.options;

			self.rotate(0);
		},
		unpause: function(){
			var self = this,
				o = this.options;

			self.rotate(1, self.continuing);
		}
	});
})(jQuery);
;

/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e,t){function i(t,i){var a,n,r,o=t.nodeName.toLowerCase();return"area"===o?(a=t.parentNode,n=a.name,t.href&&n&&"map"===a.nodeName.toLowerCase()?(r=e("img[usemap=#"+n+"]")[0],!!r&&s(r)):!1):(/input|select|textarea|button|object/.test(o)?!t.disabled:"a"===o?t.href||i:i)&&s(t)}function s(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}var a=0,n=/^ui-id-\d+$/;e.ui=e.ui||{},e.extend(e.ui,{version:"1.10.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),scrollParent:function(){var t;return t=e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(i){if(i!==t)return this.css("zIndex",i);if(this.length)for(var s,a,n=e(this[0]);n.length&&n[0]!==document;){if(s=n.css("position"),("absolute"===s||"relative"===s||"fixed"===s)&&(a=parseInt(n.css("zIndex"),10),!isNaN(a)&&0!==a))return a;n=n.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++a)})},removeUniqueId:function(){return this.each(function(){n.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var s=e.attr(t,"tabindex"),a=isNaN(s);return(a||s>=0)&&i(t,!a)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(i,s){function a(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===s?["Left","Right"]:["Top","Bottom"],r=s.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+s]=function(i){return i===t?o["inner"+s].call(this):this.each(function(){e(this).css(r,a(this,i)+"px")})},e.fn["outer"+s]=function(t,i){return"number"!=typeof t?o["outer"+s].call(this,t):this.each(function(){e(this).css(r,a(this,t,!0,i)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.support.selectstart="onselectstart"in document.createElement("div"),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,i,s){var a,n=e.ui[t].prototype;for(a in s)n.plugins[a]=n.plugins[a]||[],n.plugins[a].push([i,s[a]])},call:function(e,t,i){var s,a=e.plugins[t];if(a&&e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType)for(s=0;a.length>s;s++)e.options[a[s][0]]&&a[s][1].apply(e.element,i)}},hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",a=!1;return t[s]>0?!0:(t[s]=1,a=t[s]>0,t[s]=0,a)}})})(jQuery);;
/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e,t){var i=0,s=Array.prototype.slice,n=e.cleanData;e.cleanData=function(t){for(var i,s=0;null!=(i=t[s]);s++)try{e(i).triggerHandler("remove")}catch(a){}n(t)},e.widget=function(i,s,n){var a,r,o,h,l={},u=i.split(".")[0];i=i.split(".")[1],a=u+"-"+i,n||(n=s,s=e.Widget),e.expr[":"][a.toLowerCase()]=function(t){return!!e.data(t,a)},e[u]=e[u]||{},r=e[u][i],o=e[u][i]=function(e,i){return this._createWidget?(arguments.length&&this._createWidget(e,i),t):new o(e,i)},e.extend(o,r,{version:n.version,_proto:e.extend({},n),_childConstructors:[]}),h=new s,h.options=e.widget.extend({},h.options),e.each(n,function(i,n){return e.isFunction(n)?(l[i]=function(){var e=function(){return s.prototype[i].apply(this,arguments)},t=function(e){return s.prototype[i].apply(this,e)};return function(){var i,s=this._super,a=this._superApply;return this._super=e,this._superApply=t,i=n.apply(this,arguments),this._super=s,this._superApply=a,i}}(),t):(l[i]=n,t)}),o.prototype=e.widget.extend(h,{widgetEventPrefix:r?h.widgetEventPrefix:i},l,{constructor:o,namespace:u,widgetName:i,widgetFullName:a}),r?(e.each(r._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete r._childConstructors):s._childConstructors.push(o),e.widget.bridge(i,o)},e.widget.extend=function(i){for(var n,a,r=s.call(arguments,1),o=0,h=r.length;h>o;o++)for(n in r[o])a=r[o][n],r[o].hasOwnProperty(n)&&a!==t&&(i[n]=e.isPlainObject(a)?e.isPlainObject(i[n])?e.widget.extend({},i[n],a):e.widget.extend({},a):a);return i},e.widget.bridge=function(i,n){var a=n.prototype.widgetFullName||i;e.fn[i]=function(r){var o="string"==typeof r,h=s.call(arguments,1),l=this;return r=!o&&h.length?e.widget.extend.apply(null,[r].concat(h)):r,o?this.each(function(){var s,n=e.data(this,a);return n?e.isFunction(n[r])&&"_"!==r.charAt(0)?(s=n[r].apply(n,h),s!==n&&s!==t?(l=s&&s.jquery?l.pushStack(s.get()):s,!1):t):e.error("no such method '"+r+"' for "+i+" widget instance"):e.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+r+"'")}):this.each(function(){var t=e.data(this,a);t?t.option(r||{})._init():e.data(this,a,new n(r,this))}),l}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,s){s=e(s||this.defaultElement||this)[0],this.element=e(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),s!==this&&(e.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===s&&this.destroy()}}),this.document=e(s.style?s.ownerDocument:s.document||s),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(i,s){var n,a,r,o=i;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof i)if(o={},n=i.split("."),i=n.shift(),n.length){for(a=o[i]=e.widget.extend({},this.options[i]),r=0;n.length-1>r;r++)a[n[r]]=a[n[r]]||{},a=a[n[r]];if(i=n.pop(),s===t)return a[i]===t?null:a[i];a[i]=s}else{if(s===t)return this.options[i]===t?null:this.options[i];o[i]=s}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,n){var a,r=this;"boolean"!=typeof i&&(n=s,s=i,i=!1),n?(s=a=e(s),this.bindings=this.bindings.add(s)):(n=s,s=this.element,a=this.widget()),e.each(n,function(n,o){function h(){return i||r.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?r[o]:o).apply(r,arguments):t}"string"!=typeof o&&(h.guid=o.guid=o.guid||h.guid||e.guid++);var l=n.match(/^(\w+)\s*(.*)$/),u=l[1]+r.eventNamespace,c=l[2];c?a.delegate(c,u,h):s.bind(u,h)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,r=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(r)&&r.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var r,o=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),r=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),r&&e.effects&&e.effects.effect[o]?s[t](n):o!==t&&s[o]?s[o](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}})})(jQuery);;
/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t,e){function i(){return++n}function s(t){return t.hash.length>1&&decodeURIComponent(t.href.replace(a,""))===decodeURIComponent(location.href.replace(a,""))}var n=0,a=/#.*$/;t.widget("ui.tabs",{version:"1.10.2",delay:300,options:{active:null,collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_create:function(){var e=this,i=this.options;this.running=!1,this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",i.collapsible).delegate(".ui-tabs-nav > li","mousedown"+this.eventNamespace,function(e){t(this).is(".ui-state-disabled")&&e.preventDefault()}).delegate(".ui-tabs-anchor","focus"+this.eventNamespace,function(){t(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this._processTabs(),i.active=this._initialActive(),t.isArray(i.disabled)&&(i.disabled=t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"),function(t){return e.tabs.index(t)}))).sort()),this.active=this.options.active!==!1&&this.anchors.length?this._findActive(i.active):t(),this._refresh(),this.active.length&&this.load(i.active)},_initialActive:function(){var i=this.options.active,s=this.options.collapsible,n=location.hash.substring(1);return null===i&&(n&&this.tabs.each(function(s,a){return t(a).attr("aria-controls")===n?(i=s,!1):e}),null===i&&(i=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),(null===i||-1===i)&&(i=this.tabs.length?0:!1)),i!==!1&&(i=this.tabs.index(this.tabs.eq(i)),-1===i&&(i=s?!1:0)),!s&&i===!1&&this.anchors.length&&(i=0),i},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):t()}},_tabKeydown:function(i){var s=t(this.document[0].activeElement).closest("li"),n=this.tabs.index(s),a=!0;if(!this._handlePageNav(i)){switch(i.keyCode){case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:n++;break;case t.ui.keyCode.UP:case t.ui.keyCode.LEFT:a=!1,n--;break;case t.ui.keyCode.END:n=this.anchors.length-1;break;case t.ui.keyCode.HOME:n=0;break;case t.ui.keyCode.SPACE:return i.preventDefault(),clearTimeout(this.activating),this._activate(n),e;case t.ui.keyCode.ENTER:return i.preventDefault(),clearTimeout(this.activating),this._activate(n===this.options.active?!1:n),e;default:return}i.preventDefault(),clearTimeout(this.activating),n=this._focusNextTab(n,a),i.ctrlKey||(s.attr("aria-selected","false"),this.tabs.eq(n).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",n)},this.delay))}},_panelKeydown:function(e){this._handlePageNav(e)||e.ctrlKey&&e.keyCode===t.ui.keyCode.UP&&(e.preventDefault(),this.active.focus())},_handlePageNav:function(i){return i.altKey&&i.keyCode===t.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):i.altKey&&i.keyCode===t.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):e},_findNextTab:function(e,i){function s(){return e>n&&(e=0),0>e&&(e=n),e}for(var n=this.tabs.length-1;-1!==t.inArray(s(),this.options.disabled);)e=i?e+1:e-1;return e},_focusNextTab:function(t,e){return t=this._findNextTab(t,e),this.tabs.eq(t).focus(),t},_setOption:function(t,i){return"active"===t?(this._activate(i),e):"disabled"===t?(this._setupDisabled(i),e):(this._super(t,i),"collapsible"===t&&(this.element.toggleClass("ui-tabs-collapsible",i),i||this.options.active!==!1||this._activate(0)),"event"===t&&this._setupEvents(i),"heightStyle"===t&&this._setupHeightStyle(i),e)},_tabId:function(t){return t.attr("aria-controls")||"ui-tabs-"+i()},_sanitizeSelector:function(t){return t?t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var e=this.options,i=this.tablist.children(":has(a[href])");e.disabled=t.map(i.filter(".ui-state-disabled"),function(t){return i.index(t)}),this._processTabs(),e.active!==!1&&this.anchors.length?this.active.length&&!t.contains(this.tablist[0],this.active[0])?this.tabs.length===e.disabled.length?(e.active=!1,this.active=t()):this._activate(this._findNextTab(Math.max(0,e.active-1),!1)):e.active=this.tabs.index(this.active):(e.active=!1,this.active=t()),this._refresh()},_refresh:function(){this._setupDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-expanded":"false","aria-hidden":"true"}),this.active.length?(this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true",tabIndex:0}),this._getPanelForTab(this.active).show().attr({"aria-expanded":"true","aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var e=this;this.tablist=this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist"),this.tabs=this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1}),this.anchors=this.tabs.map(function(){return t("a",this)[0]}).addClass("ui-tabs-anchor").attr({role:"presentation",tabIndex:-1}),this.panels=t(),this.anchors.each(function(i,n){var a,o,r,h=t(n).uniqueId().attr("id"),l=t(n).closest("li"),u=l.attr("aria-controls");s(n)?(a=n.hash,o=e.element.find(e._sanitizeSelector(a))):(r=e._tabId(l),a="#"+r,o=e.element.find(a),o.length||(o=e._createPanel(r),o.insertAfter(e.panels[i-1]||e.tablist)),o.attr("aria-live","polite")),o.length&&(e.panels=e.panels.add(o)),u&&l.data("ui-tabs-aria-controls",u),l.attr({"aria-controls":a.substring(1),"aria-labelledby":h}),o.attr("aria-labelledby",h)}),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role","tabpanel")},_getList:function(){return this.element.find("ol,ul").eq(0)},_createPanel:function(e){return t("<div>").attr("id",e).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)},_setupDisabled:function(e){t.isArray(e)&&(e.length?e.length===this.anchors.length&&(e=!0):e=!1);for(var i,s=0;i=this.tabs[s];s++)e===!0||-1!==t.inArray(s,e)?t(i).addClass("ui-state-disabled").attr("aria-disabled","true"):t(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");this.options.disabled=e},_setupEvents:function(e){var i={click:function(t){t.preventDefault()}};e&&t.each(e.split(" "),function(t,e){i[e]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(this.anchors,i),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(e){var i,s=this.element.parent();"fill"===e?(i=s.height(),i-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var e=t(this),s=e.css("position");"absolute"!==s&&"fixed"!==s&&(i-=e.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){i-=t(this).outerHeight(!0)}),this.panels.each(function(){t(this).height(Math.max(0,i-t(this).innerHeight()+t(this).height()))}).css("overflow","auto")):"auto"===e&&(i=0,this.panels.each(function(){i=Math.max(i,t(this).height("").height())}).height(i))},_eventHandler:function(e){var i=this.options,s=this.active,n=t(e.currentTarget),a=n.closest("li"),o=a[0]===s[0],r=o&&i.collapsible,h=r?t():this._getPanelForTab(a),l=s.length?this._getPanelForTab(s):t(),u={oldTab:s,oldPanel:l,newTab:r?t():a,newPanel:h};e.preventDefault(),a.hasClass("ui-state-disabled")||a.hasClass("ui-tabs-loading")||this.running||o&&!i.collapsible||this._trigger("beforeActivate",e,u)===!1||(i.active=r?!1:this.tabs.index(a),this.active=o?t():a,this.xhr&&this.xhr.abort(),l.length||h.length||t.error("jQuery UI Tabs: Mismatching fragment identifier."),h.length&&this.load(this.tabs.index(a),e),this._toggle(e,u))},_toggle:function(e,i){function s(){a.running=!1,a._trigger("activate",e,i)}function n(){i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),o.length&&a.options.show?a._show(o,a.options.show,s):(o.show(),s())}var a=this,o=i.newPanel,r=i.oldPanel;this.running=!0,r.length&&this.options.hide?this._hide(r,this.options.hide,function(){i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),n()}):(i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),r.hide(),n()),r.attr({"aria-expanded":"false","aria-hidden":"true"}),i.oldTab.attr("aria-selected","false"),o.length&&r.length?i.oldTab.attr("tabIndex",-1):o.length&&this.tabs.filter(function(){return 0===t(this).attr("tabIndex")}).attr("tabIndex",-1),o.attr({"aria-expanded":"true","aria-hidden":"false"}),i.newTab.attr({"aria-selected":"true",tabIndex:0})},_activate:function(e){var i,s=this._findActive(e);s[0]!==this.active[0]&&(s.length||(s=this.active),i=s.find(".ui-tabs-anchor")[0],this._eventHandler({target:i,currentTarget:i,preventDefault:t.noop}))},_findActive:function(e){return e===!1?t():this.tabs.eq(e)},_getIndex:function(t){return"string"==typeof t&&(t=this.anchors.index(this.anchors.filter("[href$='"+t+"']"))),t},_destroy:function(){this.xhr&&this.xhr.abort(),this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(),this.tabs.add(this.panels).each(function(){t.data(this,"ui-tabs-destroy")?t(this).remove():t(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")}),this.tabs.each(function(){var e=t(this),i=e.data("ui-tabs-aria-controls");i?e.attr("aria-controls",i).removeData("ui-tabs-aria-controls"):e.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(i){var s=this.options.disabled;s!==!1&&(i===e?s=!1:(i=this._getIndex(i),s=t.isArray(s)?t.map(s,function(t){return t!==i?t:null}):t.map(this.tabs,function(t,e){return e!==i?e:null})),this._setupDisabled(s))},disable:function(i){var s=this.options.disabled;if(s!==!0){if(i===e)s=!0;else{if(i=this._getIndex(i),-1!==t.inArray(i,s))return;s=t.isArray(s)?t.merge([i],s).sort():[i]}this._setupDisabled(s)}},load:function(e,i){e=this._getIndex(e);var n=this,a=this.tabs.eq(e),o=a.find(".ui-tabs-anchor"),r=this._getPanelForTab(a),h={tab:a,panel:r};s(o[0])||(this.xhr=t.ajax(this._ajaxSettings(o,i,h)),this.xhr&&"canceled"!==this.xhr.statusText&&(a.addClass("ui-tabs-loading"),r.attr("aria-busy","true"),this.xhr.success(function(t){setTimeout(function(){r.html(t),n._trigger("load",i,h)},1)}).complete(function(t,e){setTimeout(function(){"abort"===e&&n.panels.stop(!1,!0),a.removeClass("ui-tabs-loading"),r.removeAttr("aria-busy"),t===n.xhr&&delete n.xhr},1)})))},_ajaxSettings:function(e,i,s){var n=this;return{url:e.attr("href"),beforeSend:function(e,a){return n._trigger("beforeLoad",i,t.extend({jqXHR:e,ajaxSettings:a},s))}}},_getPanelForTab:function(e){var i=t(e).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+i))}})})(jQuery);;
/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t){var e=0,i={},s={};i.height=i.paddingTop=i.paddingBottom=i.borderTopWidth=i.borderBottomWidth="hide",s.height=s.paddingTop=s.paddingBottom=s.borderTopWidth=s.borderBottomWidth="show",t.widget("ui.accordion",{version:"1.10.2",options:{active:0,animate:{},collapsible:!1,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},_create:function(){var e=this.options;this.prevShow=this.prevHide=t(),this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role","tablist"),e.collapsible||e.active!==!1&&null!=e.active||(e.active=0),this._processPanels(),0>e.active&&(e.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():t(),content:this.active.length?this.active.next():t()}},_createIcons:function(){var e=this.options.icons;e&&(t("<span>").addClass("ui-accordion-header-icon ui-icon "+e.header).prependTo(this.headers),this.active.children(".ui-accordion-header-icon").removeClass(e.header).addClass(e.activeHeader),this.headers.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()},_destroy:function(){var t;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function(){/^ui-accordion/.test(this.id)&&this.removeAttribute("id")}),this._destroyIcons(),t=this.headers.next().css("display","").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function(){/^ui-accordion/.test(this.id)&&this.removeAttribute("id")}),"content"!==this.options.heightStyle&&t.css("height","")},_setOption:function(t,e){return"active"===t?(this._activate(e),undefined):("event"===t&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(e)),this._super(t,e),"collapsible"!==t||e||this.options.active!==!1||this._activate(0),"icons"===t&&(this._destroyIcons(),e&&this._createIcons()),"disabled"===t&&this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",!!e),undefined)},_keydown:function(e){if(!e.altKey&&!e.ctrlKey){var i=t.ui.keyCode,s=this.headers.length,n=this.headers.index(e.target),a=!1;switch(e.keyCode){case i.RIGHT:case i.DOWN:a=this.headers[(n+1)%s];break;case i.LEFT:case i.UP:a=this.headers[(n-1+s)%s];break;case i.SPACE:case i.ENTER:this._eventHandler(e);break;case i.HOME:a=this.headers[0];break;case i.END:a=this.headers[s-1]}a&&(t(e.target).attr("tabIndex",-1),t(a).attr("tabIndex",0),a.focus(),e.preventDefault())}},_panelKeyDown:function(e){e.keyCode===t.ui.keyCode.UP&&e.ctrlKey&&t(e.currentTarget).prev().focus()},refresh:function(){var e=this.options;this._processPanels(),(e.active===!1&&e.collapsible===!0||!this.headers.length)&&(e.active=!1,this.active=t()),e.active===!1?this._activate(0):this.active.length&&!t.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(e.active=!1,this.active=t()):this._activate(Math.max(0,e.active-1)):e.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){this.headers=this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"),this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()},_refresh:function(){var i,s=this.options,n=s.heightStyle,a=this.element.parent(),o=this.accordionId="ui-accordion-"+(this.element.attr("id")||++e);this.active=this._findActive(s.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"),this.active.next().addClass("ui-accordion-content-active").show(),this.headers.attr("role","tab").each(function(e){var i=t(this),s=i.attr("id"),n=i.next(),a=n.attr("id");s||(s=o+"-header-"+e,i.attr("id",s)),a||(a=o+"-panel-"+e,n.attr("id",a)),i.attr("aria-controls",a),n.attr("aria-labelledby",s)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false",tabIndex:-1}).next().attr({"aria-expanded":"false","aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true",tabIndex:0}).next().attr({"aria-expanded":"true","aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(s.event),"fill"===n?(i=a.height(),this.element.siblings(":visible").each(function(){var e=t(this),s=e.css("position");"absolute"!==s&&"fixed"!==s&&(i-=e.outerHeight(!0))}),this.headers.each(function(){i-=t(this).outerHeight(!0)}),this.headers.next().each(function(){t(this).height(Math.max(0,i-t(this).innerHeight()+t(this).height()))}).css("overflow","auto")):"auto"===n&&(i=0,this.headers.next().each(function(){i=Math.max(i,t(this).css("height","").height())}).height(i))},_activate:function(e){var i=this._findActive(e)[0];i!==this.active[0]&&(i=i||this.active[0],this._eventHandler({target:i,currentTarget:i,preventDefault:t.noop}))},_findActive:function(e){return"number"==typeof e?this.headers.eq(e):t()},_setupEvents:function(e){var i={keydown:"_keydown"};e&&t.each(e.split(" "),function(t,e){i[e]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,i),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(e){var i=this.options,s=this.active,n=t(e.currentTarget),a=n[0]===s[0],o=a&&i.collapsible,r=o?t():n.next(),h=s.next(),l={oldHeader:s,oldPanel:h,newHeader:o?t():n,newPanel:r};e.preventDefault(),a&&!i.collapsible||this._trigger("beforeActivate",e,l)===!1||(i.active=o?!1:this.headers.index(n),this.active=a?t():n,this._toggle(l),s.removeClass("ui-accordion-header-active ui-state-active"),i.icons&&s.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header),a||(n.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),i.icons&&n.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader),n.next().addClass("ui-accordion-content-active")))},_toggle:function(e){var i=e.newPanel,s=this.prevShow.length?this.prevShow:e.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=i,this.prevHide=s,this.options.animate?this._animate(i,s,e):(s.hide(),i.show(),this._toggleComplete(e)),s.attr({"aria-expanded":"false","aria-hidden":"true"}),s.prev().attr("aria-selected","false"),i.length&&s.length?s.prev().attr("tabIndex",-1):i.length&&this.headers.filter(function(){return 0===t(this).attr("tabIndex")}).attr("tabIndex",-1),i.attr({"aria-expanded":"true","aria-hidden":"false"}).prev().attr({"aria-selected":"true",tabIndex:0})},_animate:function(t,e,n){var a,o,r,h=this,l=0,c=t.length&&(!e.length||t.index()<e.index()),u=this.options.animate||{},d=c&&u.down||u,p=function(){h._toggleComplete(n)};return"number"==typeof d&&(r=d),"string"==typeof d&&(o=d),o=o||d.easing||u.easing,r=r||d.duration||u.duration,e.length?t.length?(a=t.show().outerHeight(),e.animate(i,{duration:r,easing:o,step:function(t,e){e.now=Math.round(t)}}),t.hide().animate(s,{duration:r,easing:o,complete:p,step:function(t,i){i.now=Math.round(t),"height"!==i.prop?l+=i.now:"content"!==h.options.heightStyle&&(i.now=Math.round(a-e.outerHeight()-l),l=0)}}),undefined):e.animate(i,r,o,p):t.animate(s,r,o,p)},_toggleComplete:function(t){var e=t.oldPanel;e.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),e.length&&(e.parent()[0].className=e.parent()[0].className),this._trigger("activate",null,t)}})})(jQuery);;
/*
* qTip2 - Pretty powerful tooltips
* http://craigsworks.com/projects/qtip2/
*
* Version: 2.0.0pre
* Copyright 2009-2010 Craig Michael Thompson - http://craigsworks.com
*
* Dual licensed under MIT or GPLv2 licenses
*   http://en.wikipedia.org/wiki/MIT_License
*   http://en.wikipedia.org/wiki/GNU_General_Public_License
*
* Date: Fri Aug 19 08:14:39 2011 +0100
*/

/*jslint browser: true, onevar: true, undef: true, nomen: true, bitwise: true, regexp: true, newcap: true, immed: true, strict: true */
/*global window: false, jQuery: false, console: false */


(function($, window, undefined) {

	"use strict"; // Enable ECMAScript "strict" operation for this function. See more: http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
	
	// Munge the primitives - Paul Irish tip
	var TRUE = true,
		FALSE = false,
		NULL = null,
		
		// Shortcut vars
		QTIP, PLUGINS, MOUSE,
		usedIDs = {},
		uitooltip = 'ui-tooltip',
		widget = 'ui-widget',
		disabled = 'ui-state-disabled',
		selector = 'div.qtip.'+uitooltip,
		defaultClass = uitooltip + '-default',
		focusClass = uitooltip + '-focus',
		hoverClass = uitooltip + '-hover',
		fluidClass = uitooltip + '-fluid',
		hideOffset = '-31000px',
		replaceSuffix = '_replacedByqTip',
		oldtitle = 'oldtitle',
		trackingBound;
		
	/* Thanks to Paul Irish for this one: http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/ */
	function log() {
		log.history = log.history || [];
		log.history.push(arguments);
		
		// Make sure console is present
		if('object' === typeof console) {

			// Setup console and arguments
			var c = console[ console.warn ? 'warn' : 'log' ],
			args = Array.prototype.slice.call(arguments), a;

			// Add qTip2 marker to first argument if it's a string
			if(typeof arguments[0] === 'string') { args[0] = 'qTip2: ' + args[0]; }

			// Apply console.warn or .log if not supported
			a = c.apply ? c.apply(console, args) : c(args);
		}
	}

// Option object sanitizer
function sanitizeOptions(opts)
{
	var content;

	if(!opts || 'object' !== typeof opts) { return FALSE; }

	if('object' !== typeof opts.metadata) {
		opts.metadata = {
			type: opts.metadata
		};
	}

	if('content' in opts) {
		if('object' !== typeof opts.content || opts.content.jquery) {
			opts.content = {
				text: opts.content
			};
		}

		content = opts.content.text || FALSE;
		if(!$.isFunction(content) && ((!content && !content.attr) || content.length < 1 || ('object' === typeof content && !content.jquery))) {
			opts.content.text = FALSE;
		}

		if('title' in opts.content) {
			if('object' !== typeof opts.content.title) {
				opts.content.title = {
					text: opts.content.title
				};
			}

			content = opts.content.title.text || FALSE;
			if(!$.isFunction(content) && ((!content && !content.attr) || content.length < 1 || ('object' === typeof content && !content.jquery))) {
				opts.content.title.text = FALSE;
			}
		}
	}

	if('position' in opts) {
		if('object' !== typeof opts.position) {
			opts.position = {
				my: opts.position,
				at: opts.position
			};
		}
	}

	if('show' in opts) {
		if('object' !== typeof opts.show) {
			if(opts.show.jquery) {
				opts.show = { target: opts.show };
			}
			else {
				opts.show = { event: opts.show };
			}
		}
	}

	if('hide' in opts) {
		if('object' !== typeof opts.hide) {
			if(opts.hide.jquery) {
				opts.hide = { target: opts.hide };
			}
			else {
				opts.hide = { event: opts.hide };
			}
		}
	}

	if('style' in opts) {
		if('object' !== typeof opts.style) {
			opts.style = {
				classes: opts.style
			};
		}
	}

	// Sanitize plugin options
	$.each(PLUGINS, function() {
		if(this.sanitize) { this.sanitize(opts); }
	});
	
	return opts;
}

/*
* Core plugin implementation
*/
function QTip(target, options, id, attr)
{
	// Declare this reference
	var self = this,
		docBody = document.body,
		tooltipID = uitooltip + '-' + id,
		isPositioning = 0,
		isDrawing = 0,
		tooltip = $(),
		namespace = '.qtip-' + id,
		elements, cache;

	// Setup class attributes
	self.id = id;
	self.rendered = FALSE;
	self.elements = elements = { target: target };
	self.timers = { img: {} };
	self.options = options;
	self.checks = {};
	self.plugins = {};
	self.cache = cache = {
		event: {},
		target: $(),
		disabled: FALSE,
		attr: attr
	};

	/*
	* Private core functions
	*/
	function convertNotation(notation)
	{
		var i = 0, obj, option = options, 

		// Split notation into array
		levels = notation.split('.');

		// Loop through
		while( option = option[ levels[i++] ] ) {
			if(i < levels.length) { obj = option; }
		}

		return [obj || options, levels.pop()];
	}

	function setWidget() {
		var on = options.style.widget;

		tooltip.toggleClass(widget, on).toggleClass(defaultClass, !on);
		elements.content.toggleClass(widget+'-content', on);
		
		if(elements.titlebar){
			elements.titlebar.toggleClass(widget+'-header', on);
		}
		if(elements.button){
			elements.button.toggleClass(uitooltip+'-icon', !on);
		}
	}

	function removeTitle(reposition)
	{
		if(elements.title) {
			elements.titlebar.remove();
			elements.titlebar = elements.title = elements.button = NULL;

			// Reposition if enabled
			if(reposition !== FALSE) { self.reposition(); }
		}
	}

	function createButton()
	{
		var button = options.content.title.button,
			isString = typeof button === 'string',
			close = isString ? button : 'Close tooltip';

		if(elements.button) { elements.button.remove(); }

		// Use custom button if one was supplied by user, else use default
		if(button.jquery) {
			elements.button = button;
		}
		else {
			elements.button = $('<a />', {
				'class': 'ui-state-default ' + (options.style.widget ? '' : uitooltip+'-icon'),
				'title': close,
				'aria-label': close
			})
			.prepend(
				$('<span />', {
					'class': 'ui-icon ui-icon-close',
					'html': '&times;'
				})
			);
		}

		// Create button and setup attributes
		elements.button.appendTo(elements.titlebar)
			.attr('role', 'button')
			.hover(function(event){ $(this).toggleClass('ui-state-hover', event.type === 'mouseenter'); })
			.click(function(event) {
				if(!tooltip.hasClass(disabled)) { self.hide(event); }
				return FALSE;
			})
			.bind('mousedown keydown mouseup keyup mouseout', function(event) {
				$(this).toggleClass('ui-state-active ui-state-focus', event.type.substr(-4) === 'down');
			});

		// Redraw the tooltip when we're done
		self.redraw();
	}

	function createTitle()
	{
		var id = tooltipID+'-title';

		// Destroy previous title element, if present
		if(elements.titlebar) { removeTitle(); }

		// Create title bar and title elements
		elements.titlebar = $('<div />', {
			'class': uitooltip + '-titlebar ' + (options.style.widget ? 'ui-widget-header' : '')
		})
		.append(
			elements.title = $('<div />', {
				'id': id,
				'class': uitooltip + '-title',
				'aria-atomic': TRUE
			})
		)
		.insertBefore(elements.content);

		// Create button if enabled
		if(options.content.title.button) { createButton(); }

		// Redraw the tooltip dimensions if it's rendered
		else if(self.rendered){ self.redraw(); } 
	}

	function updateButton(button)
	{
		var elem = elements.button,
			title = elements.title;

		// Make sure tooltip is rendered and if not, return
		if(!self.rendered) { return FALSE; }

		if(!button) {
			elem.remove();
		}
		else {
			if(!title) {
				createTitle();
			}
			createButton();
		}
	}

	function updateTitle(content, reposition)
	{
		var elem = elements.title;

		// Make sure tooltip is rendered and if not, return
		if(!self.rendered || !content) { return FALSE; }

		// Use function to parse content
		if($.isFunction(content)) {
			content = content.call(target, cache.event, self);
		}

		// Remove title if callback returns false
		if(content === FALSE) { return removeTitle(FALSE); }

		// Append new content if its a DOM array and show it if hidden
		else if(content.jquery && content.length > 0) {
			elem.empty().append(content.css({ display: 'block' }));
		}

		// Content is a regular string, insert the new content
		else { elem.html(content); }

		// Redraw and reposition
		self.redraw();
		if(reposition !== FALSE && self.rendered && tooltip.is(':visible')) {
			self.reposition(cache.event);
		}
	}

	function updateContent(content, reposition)
	{
		var elem = elements.content;

		// Make sure tooltip is rendered and content is defined. If not return
		if(!self.rendered || !content) { return FALSE; }

		// Use function to parse content
		if($.isFunction(content)) {
			content = content.call(target, cache.event, self) || '';
		}

		// Append new content if its a DOM array and show it if hidden
		if(content.jquery && content.length > 0) {
			elem.empty().append(content.css({ display: 'block' }));
		}

		// Content is a regular string, insert the new content
		else { elem.html(content); }

		// Image detection
		function detectImages(next) {
			var images, srcs = {};

			function imageLoad(image) {
				// Clear src from object and any timers and events associated with the image
				if(image) {
					delete srcs[image.src];
					clearTimeout(self.timers.img[image.src]);
					$(image).unbind(namespace);
				}

				// If queue is empty after image removal, update tooltip and continue the queue
				if($.isEmptyObject(srcs)) {
					self.redraw();
					if(reposition !== FALSE) {
						self.reposition(cache.event);
					}
					
					next();
				}
			}

			// Find all content images without dimensions, and if no images were found, continue
			if((images = elem.find('img:not([height]):not([width])')).length === 0) { return imageLoad(); }

			// Apply timer to each image to poll for dimensions
			images.each(function(i, elem) {
				// Skip if the src is already present
				if(srcs[elem.src] !== undefined) { return; }

				(function timer(){
					// When the dimensions are found, remove the image from the queue
					if(elem.height || elem.width) { return imageLoad(elem); }

					// Restart timer
					self.timers.img[elem.src] = setTimeout(timer, 700);
				}());

				// Also apply regular load/error event handlers
				$(elem).bind('error'+namespace+' load'+namespace, function(){ imageLoad(this); });

				// Store the src and element in our object
				srcs[elem.src] = elem;
			});
		}

		/*
		 * If we're still rendering... insert into 'fx' queue our image dimension
		 * checker which will halt the showing of the tooltip until image dimensions
		 * can be detected properly.
		 */
		if(self.rendered < 0) { tooltip.queue('fx', detectImages); }

		// We're fully rendered, so reset isDrawing flag and proceed without queue delay
		else { isDrawing = 0; detectImages($.noop); }

		return self;
	}

	function assignEvents()
	{
		var posOptions = options.position,
			targets = {
				show: options.show.target,
				hide: options.hide.target,
				viewport: $(posOptions.viewport),
				document: $(document),
				window: $(window)
			},
			events = {
				show: $.trim('' + options.show.event).split(' '),
				hide: $.trim('' + options.hide.event).split(' ')
			},
			IE6 = $.browser.msie && parseInt($.browser.version, 10) === 6;

		// Define show event method
		function showMethod(event)
		{
			if(tooltip.hasClass(disabled)) { return FALSE; }

			// If set, hide tooltip when inactive for delay period
			targets.show.trigger('qtip-'+id+'-inactive');

			// Clear hide timers
			clearTimeout(self.timers.show);
			clearTimeout(self.timers.hide);

			// Start show timer
			var callback = function(){ self.toggle(TRUE, event); };
			if(options.show.delay > 0) {
				self.timers.show = setTimeout(callback, options.show.delay);
			}
			else{ callback(); }
		}

		// Define hide method
		function hideMethod(event)
		{
			if(tooltip.hasClass(disabled) || isPositioning || isDrawing) { return FALSE; }

			// Check if new target was actually the tooltip element
			var relatedTarget = $(event.relatedTarget || event.target),
				ontoTooltip = relatedTarget.closest(selector)[0] === tooltip[0],
				ontoTarget = relatedTarget[0] === targets.show[0];

			// Clear timers and stop animation queue
			clearTimeout(self.timers.show);
			clearTimeout(self.timers.hide);

			// Prevent hiding if tooltip is fixed and event target is the tooltip. Or if mouse positioning is enabled and cursor momentarily overlaps
			if((posOptions.target === 'mouse' && ontoTooltip) || (options.hide.fixed && ((/mouse(out|leave|move)/).test(event.type) && (ontoTooltip || ontoTarget)))) {
				event.preventDefault(); event.stopImmediatePropagation(); return;
			}

			// If tooltip has displayed, start hide timer
			if(options.hide.delay > 0) {
				self.timers.hide = setTimeout(function(){ self.hide(event); }, options.hide.delay);
			}
			else{ self.hide(event); }
		}

		// Define inactive method
		function inactiveMethod(event)
		{
			if(tooltip.hasClass(disabled)) { return FALSE; }

			// Clear timer
			clearTimeout(self.timers.inactive);
			self.timers.inactive = setTimeout(function(){ self.hide(event); }, options.hide.inactive);
		}

		function repositionMethod(event) {
			if(tooltip.is(':visible')) { self.reposition(event); }
		}

		// On mouseenter/mouseleave...
		tooltip.bind('mouseenter'+namespace+' mouseleave'+namespace, function(event) {
			var state = event.type === 'mouseenter';

			// Focus the tooltip on mouseenter (z-index stacking)
			if(state) { self.focus(event); }

			// Add hover class
			tooltip.toggleClass(hoverClass, state);
		});

		// Enable hide.fixed
		if(options.hide.fixed) {
			// Add tooltip as a hide target
			targets.hide = targets.hide.add(tooltip);

			// Clear hide timer on tooltip hover to prevent it from closing
			tooltip.bind('mouseover'+namespace, function() {
				if(!tooltip.hasClass(disabled)) { clearTimeout(self.timers.hide); }
			});
		}

		// If using mouseout/mouseleave as a hide event...
		if(/mouse(out|leave)/i.test(options.hide.event)) {
			// Hide tooltips when leaving current window/frame (but not select/option elements)
			if(options.hide.leave === 'window') {
				targets.window.bind('mouseout' + namespace, function(event) {
					if(/select|option/.test(event.target) && !event.relatedTarget) { self.hide(event); }
				});
			}
		}

		/*
		 * Make sure hoverIntent functions properly by using mouseleave to clear show timer if
		 * mouseenter/mouseout is used for show.event, even if it isn't in the users options.
		 */
		else if(/mouse(over|enter)/i.test(options.show.event)) {
			targets.hide.bind('mouseleave'+namespace, function(event) {
				clearTimeout(self.timers.show);
			});
		}

		// Hide tooltip on document mousedown if unfocus events are enabled
		if(('' + options.hide.event).indexOf('unfocus') > -1) {
			targets.document.bind('mousedown'+namespace, function(event) {
				var $target = $(event.target),
					enabled = !tooltip.hasClass(disabled) && tooltip.is(':visible');

				if($target[0] !== tooltip[0] && $target.parents(selector).length === 0 && $target.add(target).length > 1) {
					self.hide(event);
				}
			});
		}

		// Check if the tooltip hides when inactive
		if('number' === typeof options.hide.inactive) {
			// Bind inactive method to target as a custom event
			targets.show.bind('qtip-'+id+'-inactive', inactiveMethod);
			
			// Define events which reset the 'inactive' event handler
			$.each(QTIP.inactiveEvents, function(index, type){
				targets.hide.add(elements.tooltip).bind(type+namespace+'-inactive', inactiveMethod);
			});
		}

		// Apply hide events
		$.each(events.hide, function(index, type) {
			var showIndex = $.inArray(type, events.show),
					targetHide = $(targets.hide);

			// Both events and targets are identical, apply events using a toggle
			if((showIndex > -1 && targetHide.add(targets.show).length === targetHide.length) || type === 'unfocus')
			{
				targets.show.bind(type+namespace, function(event) {
					if(tooltip.is(':visible')) { hideMethod(event); }
					else { showMethod(event); }
				});

				// Don't bind the event again
				delete events.show[ showIndex ];
			}

			// Events are not identical, bind normally
			else { targets.hide.bind(type+namespace, hideMethod); }
		});

		// Apply show events
		$.each(events.show, function(index, type) {
			targets.show.bind(type+namespace, showMethod);
		});

		// Check if the tooltip hides when mouse is moved a certain distance
		if('number' === typeof options.hide.distance) {
			// Bind mousemove to target to detect distance difference
			targets.show.add(tooltip).bind('mousemove'+namespace, function(event) {
				var origin = cache.origin || {},
					limit = options.hide.distance,
					abs = Math.abs;

				// Check if the movement has gone beyond the limit, and hide it if so
				if(abs(event.pageX - origin.pageX) >= limit || abs(event.pageY - origin.pageY) >= limit) {
					self.hide(event);
				}
			});
		}

		// Mouse positioning events
		if(posOptions.target === 'mouse') {
			// Cache mousemove coords on show targets
			targets.show.bind('mousemove'+namespace, function(event) {
				MOUSE = { pageX: event.pageX, pageY: event.pageY, type: 'mousemove' };
			});

			// If mouse adjustment is on...
			if(posOptions.adjust.mouse) {
				// Apply a mouseleave event so we don't get problems with overlapping
				if(options.hide.event) {
					tooltip.bind('mouseleave'+namespace, function(event) {
						if((event.relatedTarget || event.target) !== targets.show[0]) { self.hide(event); }
					});
				}

				// Update tooltip position on mousemove
				targets.document.bind('mousemove'+namespace, function(event) {
					// Update the tooltip position only if the tooltip is visible and adjustment is enabled
					if(!tooltip.hasClass(disabled) && tooltip.is(':visible')) {
						self.reposition(event || MOUSE);
					}
				});
			}
		}

		// Adjust positions of the tooltip on window resize if enabled
		if(posOptions.adjust.resize || targets.viewport.length) {
			($.event.special.resize ? targets.viewport : targets.window).bind('resize'+namespace, repositionMethod);
		}

		// Adjust tooltip position on scroll if screen adjustment is enabled
		if(targets.viewport.length || (IE6 && tooltip.css('position') === 'fixed')) {
			targets.viewport.bind('scroll'+namespace, repositionMethod);
		}
	}

	function unassignEvents()
	{
		var targets = [
				options.show.target[0],
				options.hide.target[0],
				self.rendered && elements.tooltip[0],
				options.position.container[0],
				options.position.viewport[0],
				window,
				document
			];

		// Check if tooltip is rendered
		if(self.rendered) {
			$([]).pushStack( $.grep(targets, function(i){ return typeof i === 'object'; }) ).unbind(namespace);
		}

		// Tooltip isn't yet rendered, remove render event
		else { options.show.target.unbind(namespace+'-create'); }
	}

	// Setup builtin .set() option checks
	self.checks.builtin = {
		// Core checks
		'^id$': function(obj, o, v) {
			var id = v === TRUE ? QTIP.nextid : v,
				tooltipID = uitooltip + '-' + id;

			if(id !== FALSE && id.length > 0 && !$('#'+tooltipID).length) {
				tooltip[0].id = tooltipID;
				elements.content[0].id = tooltipID + '-content';
				elements.title[0].id = tooltipID + '-title';
			}
		},

		// Content checks
		'^content.text$': function(obj, o, v){ updateContent(v); },
		'^content.title.text$': function(obj, o, v) {
			// Remove title if content is null
			if(!v) { return removeTitle(); }

			// If title isn't already created, create it now and update
			if(!elements.title && v) { createTitle(); }
			updateTitle(v);
		},
		'^content.title.button$': function(obj, o, v){ updateButton(v); },

		// Position checks
		'^position.(my|at)$': function(obj, o, v){
			// Parse new corner value into Corner objecct
			if('string' === typeof v) {
				obj[o] = new PLUGINS.Corner(v);
			}
		},
		'^position.container$': function(obj, o, v){
			if(self.rendered) { tooltip.appendTo(v); }
		},

		// Show checks
		'^show.ready$': function() {
			if(!self.rendered) { self.render(1); }
			else { self.toggle(TRUE); }
		},

		// Style checks
		'^style.classes$': function(obj, o, v) { 
			tooltip.attr('class', uitooltip + ' qtip ui-helper-reset ' + v);
		},
		'^style.widget|content.title': setWidget,

		// Events check
		'^events.(render|show|move|hide|focus|blur)$': function(obj, o, v) {
			tooltip[($.isFunction(v) ? '' : 'un') + 'bind']('tooltip'+o, v);
		},

		// Properties which require event reassignment
		'^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)': function() {
			var posOptions = options.position;

			// Set tracking flag
			tooltip.attr('tracking', posOptions.target === 'mouse' && posOptions.adjust.mouse);

			// Reassign events
			unassignEvents(); assignEvents();
		}
	};

	/*
	* Public API methods
	*/
	$.extend(self, {
		render: function(show)
		{
			if(self.rendered) { return self; } // If tooltip has already been rendered, exit

			var title = options.content.title.text,
				posOptions = options.position,
				callback = $.Event('tooltiprender');

			// Add ARIA attributes to target
			$.attr(target[0], 'aria-describedby', tooltipID);

			// Create tooltip element
			tooltip = elements.tooltip = $('<div/>', {
					'id': tooltipID,
					'class': uitooltip + ' qtip ui-helper-reset ' + defaultClass + ' ' + options.style.classes,
					'width': options.style.width || '',
					'height': options.style.height || '',
					'tracking': posOptions.target === 'mouse' && posOptions.adjust.mouse,

					/* ARIA specific attributes */
					'role': 'alert',
					'aria-live': 'polite',
					'aria-atomic': FALSE,
					'aria-describedby': tooltipID + '-content',
					'aria-hidden': TRUE
				})
				.toggleClass(disabled, cache.disabled)
				.data('qtip', self)
				.appendTo(options.position.container)
				.append(
					// Create content element
					elements.content = $('<div />', {
						'class': uitooltip + '-content',
						'id': tooltipID + '-content',
						'aria-atomic': TRUE
					})
				);

			// Set rendered flag and prevent redundant redraw/reposition calls for now
			self.rendered = -1;
			isDrawing = 1; isPositioning = 1;

			// Update title
			if(title) { 
				createTitle();
				updateTitle(title, FALSE);
			}

			// Set proper rendered flag and update content
			updateContent(options.content.text, FALSE);
			self.rendered = TRUE;

			// Setup widget classes
			setWidget();

			// Assign passed event callbacks (before plugins!)
			$.each(options.events, function(name, callback) {
				if($.isFunction(callback)) {
					tooltip.bind(name === 'toggle' ? 'tooltipshow tooltiphide' : 'tooltip'+name, callback);
				}
			});

			// Initialize 'render' plugins
			$.each(PLUGINS, function() {
				if(this.initialize === 'render') { this(self); }
			});

			// Assign events
			assignEvents();

			/* Queue this part of the render process in our fx queue so we can
			 * load images before the tooltip renders fully.
			 *
			 * See: updateContent method
			*/
			tooltip.queue('fx', function(next) {
				// Trigger tooltiprender event and pass original triggering event as original
				callback.originalEvent = cache.event;
				tooltip.trigger(callback, [self]);

				// Reset flags
				isDrawing = 0; isPositioning = 0;

				// Redraw the tooltip manually now we're fully rendered
				self.redraw();

				// Show tooltip if needed
				if(options.show.ready || show) {
					self.toggle(TRUE, cache.event);
				}

				next(); // Move on to next method in queue
			});

			return self;
		},

		get: function(notation)
		{
			var result, o;

			switch(notation.toLowerCase())
			{
				case 'dimensions':
					result = {
						height: tooltip.outerHeight(), width: tooltip.outerWidth()
					};
				break;

				case 'offset':
					result = PLUGINS.offset(tooltip, options.position.container);
				break;

				default:
					o = convertNotation(notation.toLowerCase());
					result = o[0][ o[1] ];
					result = result.precedance ? result.string() : result;
				break;
			}

			return result;
		},

		set: function(option, value)
		{
			var rmove = /^position\.(my|at|adjust|target|container)|style|content|show\.ready/i,
				rdraw = /^content\.(title|attr)|style/i,
				reposition = FALSE,
				redraw = FALSE,
				checks = self.checks,
				name;

			function callback(notation, args) {
				var category, rule, match;

				for(category in checks) {
					for(rule in checks[category]) {
						if(match = (new RegExp(rule, 'i')).exec(notation)) {
							args.push(match);
							checks[category][rule].apply(self, args);
						}
					}
				}
			}

			// Convert singular option/value pair into object form
			if('string' === typeof option) {
				name = option; option = {}; option[name] = value;
			}
			else { option = $.extend(TRUE, {}, option); }

			// Set all of the defined options to their new values
			$.each(option, function(notation, value) {
				var obj = convertNotation( notation.toLowerCase() ), previous;

				// Set new obj value
				previous = obj[0][ obj[1] ];
				obj[0][ obj[1] ] = 'object' === typeof value && value.nodeType ? $(value) : value;

				// Set the new params for the callback
				option[notation] = [obj[0], obj[1], value, previous];

				// Also check if we need to reposition / redraw
				reposition = rmove.test(notation) || reposition;
				redraw = rdraw.test(notation) || redraw;
			});

			// Re-sanitize options
			sanitizeOptions(options);

			/*
			 * Execute any valid callbacks for the set options
			 * Also set isPositioning/isDrawing so we don't get loads of redundant repositioning
			 * and redraw calls.
			 */
			isPositioning = isDrawing = 1; $.each(option, callback); isPositioning = isDrawing = 0;

			// Update position / redraw if needed
			if(tooltip.is(':visible') && self.rendered) {
				if(reposition) {
					self.reposition( options.position.target === 'mouse' ? NULL : cache.event );
				}
				if(redraw) { self.redraw(); }
			}

			return self;
		},

		toggle: function(state, event)
		{
			// Make sure tooltip is rendered
			if(!self.rendered) {
				if(state) { self.render(1); } // Render the tooltip if showing and it isn't already
				else { return self; }
			}

			var type = state ? 'show' : 'hide',
				opts = options[type],
				visible = tooltip.is(':visible'),
				sameTarget = !event || options[type].target.length < 2 || cache.target[0] === event.target,
				posOptions = options.position,
				contentOptions = options.content,
				delay,
				callback;

			// Detect state if valid one isn't provided
			if((typeof state).search('boolean|number')) { state = !visible; }

			// Return if element is already in correct state
			if(!tooltip.is(':animated') && visible === state && sameTarget) { return self; }

			// Try to prevent flickering when tooltip overlaps show element
			if(event) {
				if((/over|enter/).test(event.type) && (/out|leave/).test(cache.event.type) &&
					event.target === options.show.target[0] && tooltip.has(event.relatedTarget).length) {
					return self;
				}

				// Cache event
				cache.event = $.extend({}, event);
			}

			// Call API methods
			callback = $.Event('tooltip'+type);
			callback.originalEvent = event ? cache.event : NULL;
			tooltip.trigger(callback, [self, 90]);
			if(callback.isDefaultPrevented()){ return self; }

			// Set ARIA hidden status attribute
			$.attr(tooltip[0], 'aria-hidden', !!!state);

			// Execute state specific properties
			if(state) {
				// Store show origin coordinates
				cache.origin = $.extend({}, MOUSE);

				// Focus the tooltip
				self.focus(event);

				// Update tooltip content & title if it's a dynamic function
				if($.isFunction(contentOptions.text)) { updateContent(contentOptions.text, FALSE); }
				if($.isFunction(contentOptions.title.text)) { updateTitle(contentOptions.title.text, FALSE); }

				// Cache mousemove events for positioning purposes (if not already tracking)
				if(!trackingBound && posOptions.target === 'mouse' && posOptions.adjust.mouse) {
					$(document).bind('mousemove.qtip', function(event) {
						MOUSE = { pageX: event.pageX, pageY: event.pageY, type: 'mousemove' };
					});
					trackingBound = TRUE;
				}

				// Update the tooltip position
				self.reposition(event);

				// Hide other tooltips if tooltip is solo, using it as the context
				if(opts.solo) { $(selector, opts.solo).not(tooltip).qtip('hide', callback); }
			}
			else {
				// Clear show timer if we're hiding 
				clearTimeout(self.timers.show);

				// Remove cached origin on hide
				delete cache.origin;

				// Remove mouse tracking event if not needed (all tracking qTips are hidden)
				if(trackingBound && !$(selector+'[tracking="true"]:visible', opts.solo).not(tooltip).length) {
					$(document).unbind('mousemove.qtip');
					trackingBound = FALSE;
				}
				
				// Blur the tooltip
				self.blur(event);
			}

			// Define post-animation, state specific properties
			function after() {
				if(state) {
					// Prevent antialias from disappearing in IE by removing filter
					if($.browser.msie) { tooltip[0].style.removeAttribute('filter'); }

					// Remove overflow setting to prevent tip bugs
					tooltip.css('overflow', '');

					// Autofocus elements if enabled
					if('string' === typeof opts.autofocus) {
						$(opts.autofocus, tooltip).focus();
					}

					// Call API method
					callback = $.Event('tooltipvisible');
					callback.originalEvent = event ? cache.event : NULL;
					tooltip.trigger(callback, [self]);
				}
				else {
					// Reset CSS states
					tooltip.css({
						display: '',
						visibility: '',
						opacity: '',
						left: '',
						top: ''
					});
				}
			}

			// Clear animation queue if same target
			if(sameTarget) { tooltip.stop(0, 1); }

			// If no effect type is supplied, use a simple toggle
			if(opts.effect === FALSE) {
				tooltip[ type ]();
				after.call(tooltip);
			}

			// Use custom function if provided
			else if($.isFunction(opts.effect)) {
				opts.effect.call(tooltip, self);
				tooltip.queue('fx', function(n){ after(); n(); });
			}

			// Use basic fade function by default
			else { tooltip.fadeTo(90, state ? 1 : 0, after); }

			// If inactive hide method is set, active it
			if(state) { opts.target.trigger('qtip-'+id+'-inactive'); }

			return self;
		},

		show: function(event){ return self.toggle(TRUE, event); },

		hide: function(event){ return self.toggle(FALSE, event); },

		focus: function(event)
		{
			if(!self.rendered) { return self; }

			var qtips = $(selector),
				curIndex = parseInt(tooltip[0].style.zIndex, 10),
				newIndex = QTIP.zindex + qtips.length,
				cachedEvent = $.extend({}, event),
				focusedElem, callback;

			// Only update the z-index if it has changed and tooltip is not already focused
			if(!tooltip.hasClass(focusClass))
			{
				// Call API method
				callback = $.Event('tooltipfocus');
				callback.originalEvent = cachedEvent;
				tooltip.trigger(callback, [self, newIndex]);

				// If default action wasn't prevented...
				if(!callback.isDefaultPrevented()) {
					// Only update z-index's if they've changed
					if(curIndex !== newIndex) {
						// Reduce our z-index's and keep them properly ordered
						qtips.each(function() {
							if(this.style.zIndex > curIndex) {
								this.style.zIndex = this.style.zIndex - 1;
							}
						});
						
						// Fire blur event for focused tooltip
						qtips.filter('.' + focusClass).qtip('blur', cachedEvent);
					}

					// Set the new z-index
					tooltip.addClass(focusClass)[0].style.zIndex = newIndex;
				}
			}

			return self;
		},

		blur: function(event) {
			var cachedEvent = $.extend({}, event),
				callback;

			// Set focused status to FALSE
			tooltip.removeClass(focusClass);

			// Trigger blur event
			callback = $.Event('tooltipblur');
			callback.originalEvent = cachedEvent;
			tooltip.trigger(callback, [self]);

			return self;
		},

		reposition: function(event, effect)
		{
			if(!self.rendered || isPositioning) { return self; }

			// Set positioning flag
			isPositioning = 1;
	
			var target = options.position.target,
				posOptions = options.position,
				my = posOptions.my, 
				at = posOptions.at,
				adjust = posOptions.adjust,
				method = adjust.method.split(' '),
				elemWidth = tooltip.outerWidth(),
				elemHeight = tooltip.outerHeight(),
				targetWidth = 0,
				targetHeight = 0,
				callback = $.Event('tooltipmove'),
				fixed = tooltip.css('position') === 'fixed',
				viewport = posOptions.viewport,
				position = { left: 0, top: 0 },
				tip = self.plugins.tip,
				readjust = {
					// Repositioning method and axis detection
					horizontal: method[0],
					vertical: method[1] || method[0],

					// Reposition methods
					left: function(posLeft) {
						var isShift = readjust.horizontal === 'shift',
							viewportScroll = viewport.offset.left + viewport.scrollLeft,
							myWidth = my.x === 'left' ? elemWidth : my.x === 'right' ? -elemWidth : -elemWidth / 2,
							atWidth = at.x === 'left' ? targetWidth : at.x === 'right' ? -targetWidth : -targetWidth / 2,
							tipWidth = tip && tip.size ? tip.size.width || 0 : 0,
							tipAdjust = tip && tip.corner && tip.corner.precedance === 'x' && !isShift ? tipWidth : 0,
							overflowLeft = viewportScroll - posLeft + tipAdjust,
							overflowRight = posLeft + elemWidth - viewport.width - viewportScroll + tipAdjust,
							offset = myWidth - (my.precedance === 'x' || my.x === my.y ? atWidth : 0),
							isCenter = my.x === 'center';

						// Optional 'shift' style repositioning
						if(isShift) {
							tipAdjust = tip && tip.corner && tip.corner.precedance === 'y' ? tipWidth : 0;
							offset = (my.x === 'left' ? 1 : -1) * myWidth - tipAdjust;

							// Adjust position but keep it within viewport dimensions
							position.left += overflowLeft > 0 ? overflowLeft : overflowRight > 0 ? -overflowRight : 0;
							position.left = Math.max(
								viewport.offset.left + (tipAdjust && tip.corner.x === 'center' ? tip.offset : 0),
								posLeft - offset,
								Math.min(
									Math.max(viewport.offset.left + viewport.width, posLeft + offset),
									position.left
								)
							);
						}

						// Default 'flip' repositioning
						else {
							if(overflowLeft > 0 && (my.x !== 'left' || overflowRight > 0)) {
								position.left -= offset + (isCenter ? 0 : 2 * adjust.x);
							}
							else if(overflowRight > 0 && (my.x !== 'right' || overflowLeft > 0)  ) {
								position.left -= isCenter ? -offset : offset + (2 * adjust.x);
							}
							if(position.left !== posLeft && isCenter) { position.left -= adjust.x; }
							
							// Make sure we haven't made things worse with the adjustment and return the adjusted difference
							if(position.left < viewportScroll && -position.left > overflowRight) { position.left = posLeft; }
						}

						return position.left - posLeft;
					},
					top: function(posTop) {
						var isShift = readjust.vertical === 'shift',
							viewportScroll = viewport.offset.top + viewport.scrollTop,
							myHeight = my.y === 'top' ? elemHeight : my.y === 'bottom' ? -elemHeight : -elemHeight / 2,
							atHeight = at.y === 'top' ? targetHeight : at.y === 'bottom' ? -targetHeight : -targetHeight / 2,
							tipHeight = tip && tip.size ? tip.size.height || 0 : 0,
							tipAdjust = tip && tip.corner && tip.corner.precedance === 'y' && !isShift ? tipHeight : 0,
							overflowTop = viewportScroll - posTop + tipAdjust,
							overflowBottom = posTop + elemHeight - viewport.height - viewportScroll + tipAdjust,
							offset = myHeight - (my.precedance === 'y' || my.x === my.y ? atHeight : 0),
							isCenter = my.y === 'center';
							
						// Optional 'shift' style repositioning
						if(isShift) {
							tipAdjust = tip && tip.corner && tip.corner.precedance === 'x' ? tipHeight : 0;
							offset = (my.y === 'top' ? 1 : -1) * myHeight - tipAdjust;

							// Adjust position but keep it within viewport dimensions
							position.top += overflowTop > 0 ? overflowTop : overflowBottom > 0 ? -overflowBottom : 0;
							position.top = Math.max(
								viewport.offset.top + (tipAdjust && tip.corner.x === 'center' ? tip.offset : 0),
								posTop - offset,
								Math.min(
									Math.max(viewport.offset.top + viewport.height, posTop + offset),
									position.top
								)
							);
						}

						// Default 'flip' repositioning
						else {
							if(overflowTop > 0 && (my.y !== 'top' || overflowBottom > 0)) {
								position.top -= offset + (isCenter ? 0 : 2 * adjust.y);
							}
							else if(overflowBottom > 0 && (my.y !== 'bottom' || overflowTop > 0)  ) {
								position.top -= isCenter ? -offset : offset + (2 * adjust.y);
							}
							if(position.top !== posTop && isCenter) { position.top -= adjust.y; }

							// Make sure we haven't made things worse with the adjustment and return the adjusted difference
							if(position.top < 0 && -position.top > overflowBottom) { position.top = posTop; }
						}

						return position.top - posTop;
					}
				};

			// Check if absolute position was passed
			if($.isArray(target) && target.length === 2) {
				// Force left top and set position
				at = { x: 'left', y: 'top' };
				position = { left: target[0], top: target[1] };
			}

			// Check if mouse was the target
			else if(target === 'mouse' && ((event && event.pageX) || cache.event.pageX)) {
				// Force left top to allow flipping
				at = { x: 'left', y: 'top' };

				// Use cached event if one isn't available for positioning
				event = (event && (event.type === 'resize' || event.type === 'scroll') ? cache.event :
					event && event.pageX && event.type === 'mousemove' ? event :
					MOUSE && MOUSE.pageX && (adjust.mouse || !event || !event.pageX) ? { pageX: MOUSE.pageX, pageY: MOUSE.pageY } :
					!adjust.mouse && cache.origin && cache.origin.pageX ? cache.origin :
					event) || event || cache.event || MOUSE || {};

				// Use event coordinates for position
				position = { top: event.pageY, left: event.pageX };
			}

			// Target wasn't mouse or absolute...
			else {
				// Check if event targetting is being used
				if(target === 'event') {
					if(event && event.target && event.type !== 'scroll' && event.type !== 'resize') {
						target = cache.target = $(event.target);
					}
					else {
						target = cache.target;
					}
				}
				else { cache.target = $(target); }

				// Parse the target into a jQuery object and make sure there's an element present
				target = $(target).eq(0);
				if(target.length === 0) { return self; }

				// Check if window or document is the target
				else if(target[0] === document || target[0] === window) {
					targetWidth = PLUGINS.iOS ? window.innerWidth : target.width();
					targetHeight = PLUGINS.iOS ? window.innerHeight : target.height();

					if(target[0] === window) {
						position = {
							top: !fixed || PLUGINS.iOS ? (viewport || target).scrollTop() : 0,
							left: !fixed || PLUGINS.iOS ? (viewport || target).scrollLeft() : 0
						};
					}
				}

				// Use Imagemap/SVG plugins if needed
				else if(target.is('area') && PLUGINS.imagemap) {
					position = PLUGINS.imagemap(target, at);
				}
				else if(target[0].namespaceURI === 'http://www.w3.org/2000/svg' && PLUGINS.svg) {
					position = PLUGINS.svg(target, at);
				}

				else {
					targetWidth = target.outerWidth();
					targetHeight = target.outerHeight();

					position = PLUGINS.offset(target, posOptions.container, fixed);
				}

				// Parse returned plugin values into proper variables
				if(position.offset) {
					targetWidth = position.width;
					targetHeight = position.height;
					position = position.offset;
				}

				// Adjust position relative to target
				position.left += at.x === 'right' ? targetWidth : at.x === 'center' ? targetWidth / 2 : 0;
				position.top += at.y === 'bottom' ? targetHeight : at.y === 'center' ? targetHeight / 2 : 0;
			}

			// Adjust position relative to tooltip
			position.left += adjust.x + (my.x === 'right' ? -elemWidth : my.x === 'center' ? -elemWidth / 2 : 0);
			position.top += adjust.y + (my.y === 'bottom' ? -elemHeight : my.y === 'center' ? -elemHeight / 2 : 0);

			// Calculate collision offset values if viewport positioning is enabled
			if(viewport.jquery && target[0] !== window && target[0] !== docBody &&
				readjust.vertical+readjust.horizontal !== 'nonenone')
			{
				// Cache our viewport details
				viewport = {
					elem: viewport,
					height: viewport[ (viewport[0] === window ? 'h' : 'outerH') + 'eight' ](),
					width: viewport[ (viewport[0] === window ? 'w' : 'outerW') + 'idth' ](),
					scrollLeft: fixed ? 0 : viewport.scrollLeft(),
					scrollTop: fixed ? 0 : viewport.scrollTop(),
					offset: viewport.offset() || { left: 0, top: 0 }
				};

				// Adjust position based onviewport and adjustment options
				position.adjusted = {
					left: readjust.horizontal !== 'none' ? readjust.left(position.left) : 0,
					top: readjust.vertical !== 'none' ? readjust.top(position.top) : 0
				};
			}

			//Viewport adjustment is disabled, set values to zero
			else { position.adjusted = { left: 0, top: 0 }; }

			// Set tooltip position class
			tooltip.attr('class', function(i, val) {
				return $.attr(this, 'class').replace(/ui-tooltip-pos-\w+/i, '');
			})
			.addClass(uitooltip + '-pos-' + my.abbreviation());

			// Call API method
			callback.originalEvent = $.extend({}, event);
			tooltip.trigger(callback, [self, position, viewport.elem || viewport]);
			if(callback.isDefaultPrevented()){ return self; }
			delete position.adjusted;

			// If effect is disabled, target it mouse, no animation is defined or positioning gives NaN out, set CSS directly
			if(effect === FALSE || isNaN(position.left) || isNaN(position.top) || target === 'mouse' || !$.isFunction(posOptions.effect)) {
				tooltip.css(position);
			}
			
			// Use custom function if provided
			else if($.isFunction(posOptions.effect)) {
				posOptions.effect.call(tooltip, self, $.extend({}, position));
				tooltip.queue(function(next) {
					// Reset attributes to avoid cross-browser rendering bugs
					$(this).css({ opacity: '', height: '' });
					if($.browser.msie) { this.style.removeAttribute('filter'); }

					next();
				});
			}

			// Set positioning flag
			isPositioning = 0;

			return self;
		},

		// Max/min width simulator function for all browsers.. yeaaah!
		redraw: function()
		{
			if(self.rendered < 1 || isDrawing) { return self; }

			var container = options.position.container,
				perc, width, max, min;

			// Set drawing flag
			isDrawing = 1;

			// If tooltip has a set height, just set it... like a boss!
			if(options.style.height) { tooltip.css('height', options.style.height); }

			// If tooltip has a set width, just set it... like a boss!
			if(options.style.width) { tooltip.css('width', options.style.width); }

			// Otherwise simualte max/min width...
			else {
				// Reset width and add fluid class
				tooltip.css('width', '').addClass(fluidClass);

				// Grab our tooltip width (add 1 so we don't get wrapping problems.. huzzah!)
				width = tooltip.width() + 1;

				// Grab our max/min properties
				max = tooltip.css('max-width') || '';
				min = tooltip.css('min-width') || '';

				// Parse into proper pixel values
				perc = (max + min).indexOf('%') > -1 ? container.width() / 100 : 0;
				max = ((max.indexOf('%') > -1 ? perc : 1) * parseInt(max, 10)) || width;
				min = ((min.indexOf('%') > -1 ? perc : 1) * parseInt(min, 10)) || 0;

				// Determine new dimension size based on max/min/current values
				width = max + min ? Math.min(Math.max(width, min), max) : width;

				// Set the newly calculated width and remvoe fluid class
				tooltip.css('width', Math.round(width)).removeClass(fluidClass);
			}

			// Set drawing flag
			isDrawing = 0;

			return self;
		},

		disable: function(state)
		{
			if('boolean' !== typeof state) {
				state = !(tooltip.hasClass(disabled) || cache.disabled);
			}
			 
			if(self.rendered) {
				tooltip.toggleClass(disabled, state);
				$.attr(tooltip[0], 'aria-disabled', state);
			}
			else {
				cache.disabled = !!state;
			}

			return self;
		},
		
		enable: function() { return self.disable(FALSE); },

		destroy: function()
		{
			var t = target[0],
				title = $.attr(t, oldtitle);

			// Destroy tooltip and  any associated plugins if rendered
			if(self.rendered) {
				tooltip.remove();
				
				$.each(self.plugins, function() {
					if(this.destroy) { this.destroy(); }
				});
			}

			// Clear timers and remove bound events
			clearTimeout(self.timers.show);
			clearTimeout(self.timers.hide);
			unassignEvents();

			// Remove api object
			$.removeData(t, 'qtip');

			// Reset old title attribute if removed 
			if(options.suppress && title) {
				$.attr(t, 'title', title);
				target.removeAttr(oldtitle);
			}

			// Remove ARIA attributes and bound qtip events
			target.removeAttr('aria-describedby').unbind('.qtip');

			// Remove ID from sued id object
			delete usedIDs[self.id];

			return target;
		}
	});
}

// Initialization method
function init(id, opts)
{
	var obj, posOptions, attr, config, title,

	// Setup element references
	elem = $(this),
	docBody = $(document.body),

	// Use document body instead of document element if needed
	newTarget = this === document ? docBody : elem,

	// Grab metadata from element if plugin is present
	metadata = (elem.metadata) ? elem.metadata(opts.metadata) : NULL,

	// If metadata type if HTML5, grab 'name' from the object instead, or use the regular data object otherwise
	metadata5 = opts.metadata.type === 'html5' && metadata ? metadata[opts.metadata.name] : NULL,

	// Grab data from metadata.name (or data-qtipopts as fallback) using .data() method,
	html5 = elem.data(opts.metadata.name || 'qtipopts');

	// If we don't get an object returned attempt to parse it manualyl without parseJSON
	try { html5 = typeof html5 === 'string' ? (new Function("return " + html5))() : html5; }
	catch(e) { log('Unable to parse HTML5 attribute data: ' + html5); }

	// Merge in and sanitize metadata
	config = $.extend(TRUE, {}, QTIP.defaults, opts, 
		typeof html5 === 'object' ? sanitizeOptions(html5) : NULL,
		sanitizeOptions(metadata5 || metadata));

	// Re-grab our positioning options now we've merged our metadata and set id to passed value
	posOptions = config.position;
	config.id = id;
	
	// Setup missing content if none is detected
	if('boolean' === typeof config.content.text) {
		attr = elem.attr(config.content.attr);

		// Grab from supplied attribute if available
		if(config.content.attr !== FALSE && attr) { config.content.text = attr; }

		// No valid content was found, abort render
		else {
			log('Unable to locate content for tooltip! Aborting render of tooltip on element: ', elem);
			return FALSE;
		}
	}

	// Setup target options
	if(posOptions.container === FALSE) { posOptions.container = docBody; }
	if(posOptions.target === FALSE) { posOptions.target = newTarget; }
	if(config.show.target === FALSE) { config.show.target = newTarget; }
	if(config.show.solo === TRUE) { config.show.solo = docBody; }
	if(config.hide.target === FALSE) { config.hide.target = newTarget; }
	if(config.position.viewport === TRUE) { config.position.viewport = posOptions.container; }

	// Convert position corner values into x and y strings
	posOptions.at = new PLUGINS.Corner(posOptions.at);
	posOptions.my = new PLUGINS.Corner(posOptions.my);

	// Destroy previous tooltip if overwrite is enabled, or skip element if not
	if($.data(this, 'qtip')) {
		if(config.overwrite) {
			elem.qtip('destroy');
		}
		else if(config.overwrite === FALSE) {
			return FALSE;
		}
	}

	// Remove title attribute and store it if present
	if(config.suppress && (title = $.attr(this, 'title'))) {
		$(this).removeAttr('title').attr(oldtitle, title);
	}

	// Initialize the tooltip and add API reference
	obj = new QTip(elem, config, id, !!attr);
	$.data(this, 'qtip', obj);

	// Catch remove events on target element to destroy redundant tooltip
	elem.bind('remove.qtip', function(){ obj.destroy(); });

	return obj;
}

// jQuery $.fn extension method
QTIP = $.fn.qtip = function(options, notation, newValue)
{
	var command = ('' + options).toLowerCase(), // Parse command
		returned = NULL,
		args = command === 'disable' ? [TRUE] : $.makeArray(arguments).slice(1),
		event = args[args.length - 1],
		opts = this[0] ? $.data(this[0], 'qtip') : NULL;

	// Check for API request
	if((!arguments.length && opts) || command === 'api') {
		return opts;
	}

	// Execute API command if present
	else if('string' === typeof options)
	{
		this.each(function()
		{
			var api = $.data(this, 'qtip');
			if(!api) { return TRUE; }

			// Cache the event if possible
			if(event && event.timeStamp) { api.cache.event = event; }

			// Check for specific API commands
			if((command === 'option' || command === 'options') && notation) {
				if($.isPlainObject(notation) || newValue !== undefined) {
					api.set(notation, newValue);
				}
				else {
					returned = api.get(notation);
					return FALSE;
				}
			}

			// Execute API command
			else if(api[command]) {
				api[command].apply(api[command], args);
			}
		});

		return returned !== NULL ? returned : this;
	}

	// No API commands. validate provided options and setup qTips
	else if('object' === typeof options || !arguments.length)
	{
		opts = sanitizeOptions($.extend(TRUE, {}, options));

		// Bind the qTips
		return QTIP.bind.call(this, opts, event);
	}
};

// $.fn.qtip Bind method
QTIP.bind = function(opts, event)
{
	return this.each(function(i) {
		var options, targets, events, namespace, api, id;

		// Find next available ID, or use custom ID if provided
		id = $.isArray(opts.id) ? opts.id[i] : opts.id;
		id = !id || id === FALSE || id.length < 1 || usedIDs[id] ? QTIP.nextid++ : (usedIDs[id] = id);

		// Setup events namespace
		namespace = '.qtip-'+id+'-create';

		// Initialize the qTip and re-grab newly sanitized options
		api = init.call(this, id, opts);
		if(api === FALSE) { return TRUE; }
		options = api.options;

		// Initialize plugins
		$.each(PLUGINS, function() {
			if(this.initialize === 'initialize') { this(api); }
		});

		// Determine hide and show targets
		targets = { show: options.show.target, hide: options.hide.target };
		events = {
			show: $.trim('' + options.show.event).replace(/ /g, namespace+' ') + namespace,
			hide: $.trim('' + options.hide.event).replace(/ /g, namespace+' ') + namespace
		};

		/*
		 * Make sure hoverIntent functions properly by using mouseleave as a hide event if
		 * mouseenter/mouseout is used for show.event, even if it isn't in the users options.
		 */
		if(/mouse(over|enter)/i.test(events.show) && !/mouse(out|leave)/i.test(events.hide)) {
			events.hide += ' mouseleave' + namespace;
		}

		/*
		 * Also make sure initial mouse targetting works correctly by caching mousemove coords
		 * on show targets before the tooltip has rendered.
		 */
		targets.show.bind('mousemove'+namespace, function(event) {
			MOUSE = { pageX: event.pageX, pageY: event.pageY, type: 'mousemove' };
		});

		// Define hoverIntent function
		function hoverIntent(event) {
			function render() {
				// Cache mouse coords,render and render the tooltip
				api.render(typeof event === 'object' || options.show.ready);

				// Unbind show and hide events
				targets.show.add(targets.hide).unbind(namespace);
			}

			// Only continue if tooltip isn't disabled
			if(api.cache.disabled) { return FALSE; }

			// Cache the event data
			api.cache.event = $.extend({}, event);
			api.cache.target = event ? $(event.target) : [undefined];

			// Start the event sequence
			if(options.show.delay > 0) {
				clearTimeout(api.timers.show);
				api.timers.show = setTimeout(render, options.show.delay);
				if(events.show !== events.hide) {
					targets.hide.bind(events.hide, function() { clearTimeout(api.timers.show); });
				}
			}
			else { render(); }
		}

		// Bind show events to target
		targets.show.bind(events.show, hoverIntent);

		// Prerendering is enabled, create tooltip now
		if(options.show.ready || options.prerender) { hoverIntent(event); }
	});
};

// Setup base plugins
PLUGINS = QTIP.plugins = {
	// Corner object parser
	Corner: function(corner) {
		corner = ('' + corner).replace(/([A-Z])/, ' $1').replace(/middle/gi, 'center').toLowerCase();
		this.x = (corner.match(/left|right/i) || corner.match(/center/) || ['inherit'])[0].toLowerCase();
		this.y = (corner.match(/top|bottom|center/i) || ['inherit'])[0].toLowerCase();

		this.precedance = (corner.charAt(0).search(/^(t|b)/) > -1) ? 'y' : 'x';
		this.string = function() { return this.precedance === 'y' ? this.y+this.x : this.x+this.y; };
		this.abbreviation = function() { 
			var x = this.x.substr(0,1), y = this.y.substr(0,1);
			return x === y ? x : (x === 'c' || (x !== 'c' && y !== 'c')) ? y + x : x + y;
		};
	},

	// Custom (more correct for qTip!) offset calculator
	offset: function(elem, container, fixed) {
		var pos = elem.offset(),
			parent = container,
			deep = 0,
			docBody = document.body,
			coffset;

		function scroll(e, i) {
			pos.left += i * e.scrollLeft();
			pos.top += i * e.scrollTop();
		}

		if(parent) {
			// Compensate for non-static containers offset
			do {
				if(parent.css('position') !== 'static') {
					coffset = parent[0] === docBody ?
						{ left: parseInt(parent.css('left'), 10) || 0, top: parseInt(parent.css('top'), 10) || 0 } :
						parent.position();

					pos.left -= coffset.left + (parseInt(parent.css('borderLeftWidth'), 10) || 0) + (parseInt(parent.css('marginLeft'), 10) || 0);
					pos.top -= coffset.top + (parseInt(parent.css('borderTopWidth'), 10) || 0);

					deep++;
				}
				if(parent[0] === docBody) { break; }
			}
			while(parent = parent.offsetParent());

			// Compensate for containers scroll if it also has an offsetParent
			if(container[0] !== docBody && deep > 1) { scroll( container, 1 ); }

			// Adjust for position.fixed tooltips (and also iOS scroll bug in v3.2 - v4.0)
			if((PLUGINS.iOS < 4.1 && PLUGINS.iOS > 3.1) || (!PLUGINS.iOS && fixed)) { scroll( $(window), -1 ); }
		}

		return pos;
	},
	
	/*
	 * iOS 3.2 - 4.0 scroll fix detection used in offset() function.
	 */
	iOS: parseFloat(
		('' + (/CPU.*OS ([0-9_]{1,3})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0,''])[1])
			.replace('undefined', '3_2').replace('_','.')
	) || FALSE,
	
	/*
	 * jQuery-specific $.fn overrides
	 */
	fn: {
		/* Allow other plugins to successfully retrieve the title of an element with a qTip applied */
		attr: function(attr, val) {
			if(this.length) {
				var self = this[0],
					title = 'title',
					api = $.data(self, 'qtip');

				if(attr === title && 'object' === typeof api && api.options.suppress) {
					if(arguments.length < 2) {
						return $.attr(self, oldtitle);
					}
					else {
						// If qTip is rendered and title was originally used as content, update it
						if(api && api.options.content.attr === title && api.cache.attr) {
							api.set('content.text', val);
						}

						// Use the regular attr method to set, then cache the result
						return this.attr(oldtitle, val);
					}
				}
			}

			return $.fn['attr'+replaceSuffix].apply(this, arguments);
		},
		
		/* Allow clone to correctly retrieve cached title attributes */
		clone: function(keepData) {
			var titles = $([]), title = 'title',

			// Clone our element using the real clone method
			elems = $.fn['clone'+replaceSuffix].apply(this, arguments);

			// Grab all elements with an oldtitle set, and change it to regular title attribute, if keepData is false
			if(!keepData) {
				elems.filter('['+oldtitle+']').attr('title', function() {
					return $.attr(this, oldtitle);
				})
				.removeAttr(oldtitle);
			}

			return elems;
		},

		/* 
		 * Taken directly from jQuery 1.8.2 widget source code
		 * Trigger 'remove' event on all elements on removal if jQuery UI isn't present 
		 */
		remove: $.ui ? NULL : function( selector, keepData ) {
			$(this).each(function() {
				if (!keepData) {
					if (!selector || $.filter( selector, [ this ] ).length) {
						$('*', this).add(this).each(function() {
							$(this).triggerHandler('remove');
						});
					}
				}
			});
		}
	}
};

// Apply the fn overrides above
$.each(PLUGINS.fn, function(name, func) {
	if(!func) { return TRUE; }
	
	var old = $.fn[name+replaceSuffix] = $.fn[name];
	$.fn[name] = function() {
		return func.apply(this, arguments) || old.apply(this, arguments);
	};
});

// Set global qTip properties
QTIP.version = '2.0.0pre';
QTIP.nextid = 0;
QTIP.inactiveEvents = 'click dblclick mousedown mouseup mousemove mouseleave mouseenter'.split(' ');
QTIP.zindex = 15000;

// Define configuration defaults
QTIP.defaults = {
	prerender: FALSE,
	id: FALSE,
	overwrite: TRUE,
	suppress: TRUE,
	content: {
		text: TRUE,
		attr: 'title',
		title: {
			text: FALSE,
			button: FALSE
		}
	},
	position: {
		my: 'top left',
		at: 'bottom right',
		target: FALSE,
		container: FALSE,
		viewport: FALSE,
		adjust: {
			x: 0, y: 0,
			mouse: TRUE,
			resize: TRUE,
			method: 'flip flip'
		},
		effect: function(api, pos, viewport) {
			$(this).animate(pos, {
				duration: 200,
				queue: FALSE
			});
		}
	},
	show: {
		target: FALSE,
		event: 'mouseenter',
		effect: TRUE,
		delay: 90,
		solo: FALSE,
		ready: FALSE,
		autofocus: FALSE
	},
	hide: {
		target: FALSE,
		event: 'mouseleave',
		effect: TRUE,
		delay: 0,
		fixed: FALSE,
		inactive: FALSE,
		leave: 'window',
		distance: FALSE
	},
	style: {
		classes: '',
		widget: FALSE,
		width: FALSE,
		height: FALSE
	},
	events: {
		render: NULL,
		move: NULL,
		show: NULL,
		hide: NULL,
		toggle: NULL,
		visible: NULL,
		focus: NULL,
		blur: NULL
	}
};

function Ajax(api)
{
	var self = this,
		tooltip = api.elements.tooltip,
		opts = api.options.content.ajax,
		namespace = '.qtip-ajax',
		rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
		first = TRUE;

	api.checks.ajax = {
		'^content.ajax': function(obj, name, v) {
			// If content.ajax object was reset, set our local var
			if(name === 'ajax') { opts = v; }

			if(name === 'once') {
				self.init();
			}
			else if(opts && opts.url) {
				self.load();
			}
			else {
				tooltip.unbind(namespace);
			}
		}
	};

	$.extend(self, {
		init: function()
		{
			// Make sure ajax options are enabled and bind event
			if(opts && opts.url) {
				tooltip.unbind(namespace)[ opts.once ? 'one' : 'bind' ]('tooltipshow'+namespace, self.load);
			}

			return self;
		},

		load: function(event, first)
		{
			// Make sure default event hasn't been prevented
			if(event && event.isDefaultPrevented()) { return self; }
			
			var hasSelector = opts.url.indexOf(' '),
				url = opts.url,
				selector,
				hideFirst = opts.once && !opts.loading && first;

			// If loading option is disabled, hide the tooltip until content is retrieved (first time only)
			if(hideFirst) { tooltip.css('visibility', 'hidden'); }

			// Check if user delcared a content selector like in .load()
			if(hasSelector > -1) {
				selector = url.substr(hasSelector);
				url = url.substr(0, hasSelector);
			}

			// Define common after callback for both success/error handlers
			function after() {
				// Re-display tip if loading and first time, and reset first flag
				if(hideFirst) { tooltip.css('visibility', ''); first = FALSE; }

				// Call users complete if it was defined
				if($.isFunction(opts.complete)) { opts.complete.apply(this, arguments); }
			}

			// Define success handler
			function successHandler(content) {
				if(selector) {
					// Create a dummy div to hold the results and grab the selector element
					content = $('<div/>')
						// inject the contents of the document in, removing the scripts
						// to avoid any 'Permission Denied' errors in IE
						.append(content.replace(rscript, ""))
						
						// Locate the specified elements
						.find(selector);
				}

				// Set the content
				api.set('content.text', content);
			}

			// Error handler
			function errorHandler(xh, status, error){ api.set('content.text', status + ': ' + error); }

			// Setup $.ajax option object and process the request
			$.ajax( $.extend({ success: successHandler, error: errorHandler, context: api }, opts, { url: url, complete: after }) );
			
			return self;
		}
	});

	self.init();
}


PLUGINS.ajax = function(api)
{
	var self = api.plugins.ajax;
	
	return 'object' === typeof self ? self : (api.plugins.ajax = new Ajax(api));
};

PLUGINS.ajax.initialize = 'render';

// Setup plugin sanitization
PLUGINS.ajax.sanitize = function(options)
{
	var content = options.content, opts;
	if(content && 'ajax' in content) {
		opts = content.ajax;
		if(typeof opts !== 'object') { opts = options.content.ajax = { url: opts }; }
		if('boolean' !== typeof opts.once && opts.once) { opts.once = !!opts.once; }
	}
};

// Extend original api defaults
$.extend(TRUE, QTIP.defaults, {
	content: {
		ajax: {
			loading: TRUE,
			once: TRUE
		}
	}
});

/* 
 * BGIFrame adaption (http://plugins.jquery.com/project/bgiframe)
 * Special thanks to Brandon Aaron
 */
function BGIFrame(api)
{
	var self = this,
		elems = api.elements,
		tooltip = elems.tooltip,
		namespace = '.bgiframe-' + api.id;

	$.extend(self, {
		init: function()
		{
			// Create the BGIFrame element
			elems.bgiframe = $('<iframe class="ui-tooltip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';" ' +
				' style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); ' +
					'-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>');

			// Append the new element to the tooltip
			elems.bgiframe.appendTo(tooltip);

			// Update BGIFrame on tooltip move
			tooltip.bind('tooltipmove'+namespace, self.adjust);
		},

		adjust: function()
		{
			var dimensions = api.get('dimensions'), // Determine current tooltip dimensions
				plugin = api.plugins.tip,
				tip = elems.tip,
				tipAdjust, offset;

			// Adjust border offset
			offset = parseInt(tooltip.css('border-left-width'), 10) || 0;
			offset = { left: -offset, top: -offset };

			// Adjust for tips plugin
			if(plugin && tip) {
				tipAdjust = (plugin.corner.precedance === 'x') ? ['width', 'left'] : ['height', 'top'];
				offset[ tipAdjust[1] ] -= tip[ tipAdjust[0] ]();
			}

			// Update bgiframe
			elems.bgiframe.css(offset).css(dimensions);
		},

		destroy: function()
		{
			// Remove iframe
			elems.bgiframe.remove();

			// Remove bound events
			tooltip.unbind(namespace);
		}
	});

	self.init();
}

PLUGINS.bgiframe = function(api)
{
	var browser = $.browser,
		self = api.plugins.bgiframe;
	
		// Proceed only if the browser is IE6 and offending elements are present
		if($('select, object').length < 1 || !(browser.msie && browser.version.charAt(0) === '6')) {
		return FALSE;
	}

	return 'object' === typeof self ? self : (api.plugins.bgiframe = new BGIFrame(api));
};

// Plugin needs to be initialized on render
PLUGINS.bgiframe.initialize = 'render';

PLUGINS.imagemap = function(area, corner)
{
	if(!area.jquery) { area = $(area); }

	var shape = area.attr('shape').toLowerCase(),
		baseCoords = area.attr('coords').split(','),
		coords = [],
		image = $('img[usemap="#'+area.parent('map').attr('name')+'"]'),
		imageOffset = image.offset(),
		result = {
			width: 0, height: 0,
			offset: { top: 1e10, right: 0, bottom: 0, left: 1e10 }
		},
		i = 0, next = 0;

	// POLY area coordinate calculator
	//	Special thanks to Ed Cradock for helping out with this.
	//	Uses a binary search algorithm to find suitable coordinates.
	function polyCoordinates(result, coords)
	{
		var i = 0,
			compareX = 1, compareY = 1,
			realX = 0, realY = 0,
			newWidth = result.width,
			newHeight = result.height;

		// Use a binary search algorithm to locate most suitable coordinate (hopefully)
		while(newWidth > 0 && newHeight > 0 && compareX > 0 && compareY > 0)
		{
			newWidth = Math.floor(newWidth / 2);
			newHeight = Math.floor(newHeight / 2);

			if(corner.x === 'left'){ compareX = newWidth; }
			else if(corner.x === 'right'){ compareX = result.width - newWidth; }
			else{ compareX += Math.floor(newWidth / 2); }

			if(corner.y === 'top'){ compareY = newHeight; }
			else if(corner.y === 'bottom'){ compareY = result.height - newHeight; }
			else{ compareY += Math.floor(newHeight / 2); }

			i = coords.length; while(i--)
			{
				if(coords.length < 2){ break; }

				realX = coords[i][0] - result.offset.left;
				realY = coords[i][1] - result.offset.top;

				if((corner.x === 'left' && realX >= compareX) ||
				(corner.x === 'right' && realX <= compareX) ||
				(corner.x === 'center' && (realX < compareX || realX > (result.width - compareX))) ||
				(corner.y === 'top' && realY >= compareY) ||
				(corner.y === 'bottom' && realY <= compareY) ||
				(corner.y === 'center' && (realY < compareY || realY > (result.height - compareY)))) {
					coords.splice(i, 1);
				}
			}
		}

		return { left: coords[0][0], top: coords[0][1] };
	}

	// Make sure we account for padding and borders on the image
	imageOffset.left += Math.ceil((image.outerWidth() - image.width()) / 2);
	imageOffset.top += Math.ceil((image.outerHeight() - image.height()) / 2);

	// Parse coordinates into proper array
	if(shape === 'poly') {
		i = baseCoords.length; while(i--)
		{
			next = [ parseInt(baseCoords[--i], 10), parseInt(baseCoords[i+1], 10) ];

			if(next[0] > result.offset.right){ result.offset.right = next[0]; }
			if(next[0] < result.offset.left){ result.offset.left = next[0]; }
			if(next[1] > result.offset.bottom){ result.offset.bottom = next[1]; }
			if(next[1] < result.offset.top){ result.offset.top = next[1]; }

			coords.push(next);
		}
	}
	else {
		coords = $.map(baseCoords, function(coord){ return parseInt(coord, 10); });
	}

	// Calculate details
	switch(shape)
	{
		case 'rect':
			result = {
				width: Math.abs(coords[2] - coords[0]),
				height: Math.abs(coords[3] - coords[1]),
				offset: { left: coords[0], top: coords[1] }
			};
		break;

		case 'circle':
			result = {
				width: coords[2] + 2,
				height: coords[2] + 2,
				offset: { left: coords[0], top: coords[1] }
			};
		break;

		case 'poly':
			$.extend(result, {
				width: Math.abs(result.offset.right - result.offset.left),
				height: Math.abs(result.offset.bottom - result.offset.top)
			});

			if(corner.string() === 'centercenter') {
				result.offset = {
					left: result.offset.left + (result.width / 2),
					top: result.offset.top + (result.height / 2)
				};
			}
			else {
				result.offset = polyCoordinates(result, coords.slice());
			}

			result.width = result.height = 0;
		break;
	}

	// Add image position to offset coordinates
	result.offset.left += imageOffset.left;
	result.offset.top += imageOffset.top;

	return result;
};

function Modal(api)
{
	var self = this,
		options = api.options.show.modal,
		elems = api.elements,
		tooltip = elems.tooltip,
		overlaySelector = '#qtip-overlay',
		globalNamespace = '.qtipmodal',
		namespace = globalNamespace + api.id,
		attr = 'is-modal-qtip',
		docBody = $(document.body),
		overlay;

	// Setup option set checks
	api.checks.modal = {
		'^show.modal.(on|blur)$': function() {
			// Initialise
			self.init();
			
			// Show the modal if not visible already and tooltip is visible
			elems.overlay.toggle( tooltip.is(':visible') );
		}
	};

	$.extend(self, {
		init: function()
		{
			// If modal is disabled... return
			if(!options.on) { return self; }

			// Create the overlay if needed
			overlay = self.create();

			// Add unique attribute so we can grab modal tooltips easily via a selector
			tooltip.attr(attr, TRUE)

			.css('z-index', PLUGINS.modal.zindex + $(selector+'['+attr+']').length)
			
			// Remove previous bound events in globalNamespace
			.unbind(globalNamespace).unbind(namespace)

			// Apply our show/hide/focus modal events
			.bind('tooltipshow'+globalNamespace+' tooltiphide'+globalNamespace, function(event, api, duration) {
				var oEvent = event.originalEvent;
				
				// Make sure mouseout doesn't trigger a hide when showing the modal and mousing onto backdrop
				if(oEvent && event.type === 'tooltiphide' && /mouse(leave|enter)/.test(oEvent.type) && $(oEvent.relatedTarget).closest(overlay[0]).length) {
					event.preventDefault();
				}
				else {
					self[ event.type.replace('tooltip', '') ](event, duration);
				}
			})

			// Adjust modal z-index on tooltip focus
			.bind('tooltipfocus'+globalNamespace, function(event) {
				// If focus was cancelled before it reearch us, don't do anything
				if(event.isDefaultPrevented()) { return; }

				var qtips = $(selector).filter('['+attr+']'),

				// Keep the modal's lower than other, regular qtips
				newIndex = PLUGINS.modal.zindex + qtips.length,
				curIndex = parseInt(tooltip[0].style.zIndex, 10);

				// Set overlay z-index
				overlay[0].style.zIndex = newIndex;

				// Reduce modal z-index's and keep them properly ordered
				qtips.each(function() {
					if(this.style.zIndex > curIndex) {
						this.style.zIndex -= 1;
					}
				});

				// Fire blur event for focused tooltip
				qtips.end().filter('.' + focusClass).qtip('blur', event.originalEvent);

				// Set the new z-index
				tooltip.addClass(focusClass)[0].style.zIndex = newIndex;

				// Prevent default handling
				event.preventDefault();
			})

			// Focus any other visible modals when this one hides
			.bind('tooltiphide'+globalNamespace, function(event) {
				$('[' + attr + ']').filter(':visible').not(tooltip).last().qtip('focus', event);
			});

			// Apply keyboard "Escape key" close handler
			if(options.escape) {
				$(window).unbind(namespace).bind('keydown'+namespace, function(event) {
					if(event.keyCode === 27 && tooltip.hasClass(focusClass)) {
						api.hide(event);
					}
				});
			}

			// Apply click handler for blur option
			if(options.blur) {
				elems.overlay.unbind(namespace).bind('click'+namespace, function(event) {
					if(tooltip.hasClass(focusClass)) { api.hide(event); }
				});
			}

			return self;
		},

		create: function()
		{
			var elem = $(overlaySelector);

			// Return if overlay is already rendered
			if(elem.length) { elems.overlay = elem; return elem; }

			// Create document overlay
			overlay = elems.overlay = $('<div />', {
				id: overlaySelector.substr(1),
				html: '<div></div>',
				mousedown: function() { return FALSE; }
			})
			.insertBefore( $(selector).first() );

			// Update position on window resize or scroll
			$(window).unbind(globalNamespace).bind('resize'+globalNamespace, function() {
				overlay.css({
					height: $(window).height(),
					width: $(window).width()
				});
			})
			.triggerHandler('resize');

			return overlay;
		},

		toggle: function(event, state, duration)
		{
			// Make sure default event hasn't been prevented
			if(event && event.isDefaultPrevented()) { return self; }

			var effect = options.effect,
				type = state ? 'show': 'hide',
				visible = overlay.is(':visible'),
				modals = $('[' + attr + ']').filter(':visible').not(tooltip),
				zindex;

			// Create our overlay if it isn't present already
			if(!overlay) { overlay = self.create(); }

			// Prevent modal from conflicting with show.solo, and don't hide backdrop is other modals are visible
			if((overlay.is(':animated') && visible === state) || (!state && modals.length)) { return self; }

			// State specific...
			if(state) {
				// Set position
				overlay.css({ left: 0, top: 0 });

				// Toggle backdrop cursor style on show
				overlay.toggleClass('blurs', options.blur);

				// Make sure we can't focus anything outside the tooltip
				docBody.delegate('*', 'focusin'+namespace, function(event) {
					if($(event.target).closest(selector)[0] !== tooltip[0]) {
						$('a, :input, img', tooltip).add(tooltip).focus();
					}
				});
			}
			else {
				// Undelegate focus handler
				docBody.undelegate('*', 'focusin'+namespace);
			}

			// Stop all animations
			overlay.stop(TRUE, FALSE);

			// Use custom function if provided
			if($.isFunction(effect)) {
				effect.call(overlay, state);
			}

			// If no effect type is supplied, use a simple toggle
			else if(effect === FALSE) {
				overlay[ type ]();
			}

			// Use basic fade function
			else {
				overlay.fadeTo( parseInt(duration, 10) || 90, state ? 1 : 0, function() {
					if(!state) { $(this).hide(); }
				});
			}

			// Reset position on hide
			if(!state) {
				overlay.queue(function(next) {
					overlay.css({ left: '', top: '' });
					next();
				});
			}

			return self;
		},

		show: function(event, duration) { return self.toggle(event, TRUE, duration); },
		hide: function(event, duration) { return self.toggle(event, FALSE, duration); },

		destroy: function()
		{
			var delBlanket = overlay;

			if(delBlanket) {
				// Check if any other modal tooltips are present
				delBlanket = $('[' + attr + ']').not(tooltip).length < 1;

				// Remove overlay if needed
				if(delBlanket) {
					elems.overlay.remove();
					$(window).unbind(globalNamespace);
				}
				else {
					elems.overlay.unbind(globalNamespace+api.id);
				}

				// Undelegate focus handler
				docBody.undelegate('*', 'focusin'+namespace);
			}

			// Remove bound events
			return tooltip.removeAttr(attr).unbind(globalNamespace);
		}
	});

	self.init();
}

PLUGINS.modal = function(api) {
	var self = api.plugins.modal;

	return 'object' === typeof self ? self : (api.plugins.modal = new Modal(api));
};

// Plugin needs to be initialized on render
PLUGINS.modal.initialize = 'render';

// Setup sanitiztion rules
PLUGINS.modal.sanitize = function(opts) {
	if(opts.show) { 
		if(typeof opts.show.modal !== 'object') { opts.show.modal = { on: !!opts.show.modal }; }
		else if(typeof opts.show.modal.on === 'undefined') { opts.show.modal.on = TRUE; }
	}
};

// Base z-index for all modal tooltips (use qTip core z-index as a base)
PLUGINS.modal.zindex = QTIP.zindex -= 200;

// Extend original api defaults
$.extend(TRUE, QTIP.defaults, {
	show: {
		modal: {
			on: FALSE,
			effect: TRUE,
			blur: TRUE,
			escape: TRUE
		}
	}
});

PLUGINS.svg = function(svg, corner)
{
	var doc = $(document),
		elem = svg[0],
		result = {
			width: 0, height: 0,
			offset: { top: 1e10, left: 1e10 }
		},
		box, mtx, root, point, tPoint;

	if (elem.getBBox && elem.parentNode) {
		box = elem.getBBox();
		mtx = elem.getScreenCTM();
		root = elem.farthestViewportElement || elem;

		// Return if no method is found
		if(!root.createSVGPoint) { return result; }

		// Create our point var
		point = root.createSVGPoint();

		// Adjust top and left
		point.x = box.x;
		point.y = box.y;
		tPoint = point.matrixTransform(mtx);
		result.offset.left = tPoint.x;
		result.offset.top = tPoint.y;

		// Adjust width and height
		point.x += box.width;
		point.y += box.height;
		tPoint = point.matrixTransform(mtx);
		result.width = tPoint.x - result.offset.left;
		result.height = tPoint.y - result.offset.top;

		// Adjust by scroll offset
		result.offset.left += doc.scrollLeft();
		result.offset.top += doc.scrollTop();
	}

	return result;
};

// Tip coordinates calculator
function calculateTip(corner, width, height)
{	
	var width2 = Math.ceil(width / 2), height2 = Math.ceil(height / 2),

	// Define tip coordinates in terms of height and width values
	tips = {
		bottomright:	[[0,0],				[width,height],		[width,0]],
		bottomleft:		[[0,0],				[width,0],				[0,height]],
		topright:		[[0,height],		[width,0],				[width,height]],
		topleft:			[[0,0],				[0,height],				[width,height]],
		topcenter:		[[0,height],		[width2,0],				[width,height]],
		bottomcenter:	[[0,0],				[width,0],				[width2,height]],
		rightcenter:	[[0,0],				[width,height2],		[0,height]],
		leftcenter:		[[width,0],			[width,height],		[0,height2]]
	};

	// Set common side shapes
	tips.lefttop = tips.bottomright; tips.righttop = tips.bottomleft;
	tips.leftbottom = tips.topright; tips.rightbottom = tips.topleft;

	return tips[ corner.string() ];
}


function Tip(qTip, command)
{
	var self = this,
		opts = qTip.options.style.tip,
		elems = qTip.elements,
		tooltip = elems.tooltip,
		cache = { 
			top: 0, 
			left: 0, 
			corner: ''
		},
		size = {
			width: opts.width,
			height: opts.height
		},
		color = { },
		border = opts.border || 0,
		namespace = '.qtip-tip',
		hasCanvas = !!($('<canvas />')[0] || {}).getContext;

	self.corner = NULL;
	self.mimic = NULL;
	self.border = border;
	self.offset = opts.offset;
	self.size = size;

	// Add new option checks for the plugin
	qTip.checks.tip = {
		'^position.my|style.tip.(corner|mimic|border)$': function() {
			// Make sure a tip can be drawn
			if(!self.init()) {
				self.destroy();
			}

			// Reposition the tooltip
			qTip.reposition();
		},
		'^style.tip.(height|width)$': function() {
			// Re-set dimensions and redraw the tip
			size = {
				width: opts.width,
				height: opts.height
			};
			self.create();
			self.update();

			// Reposition the tooltip
			qTip.reposition();
		},
		'^content.title.text|style.(classes|widget)$': function() {
			if(elems.tip) {
				self.update();
			}
		}
	};

	function reposition(event, api, pos, viewport) {
		if(!elems.tip) { return; }

		var newCorner = $.extend({}, self.corner),
			adjust = pos.adjusted,
			method = qTip.options.position.adjust.method.split(' '),
			horizontal = method[0],
			vertical = method[1] || method[0],
			shift = { left: FALSE, top: FALSE, x: 0, y: 0 },
			offset, css = {}, props;

		// Make sure our tip position isn't fixed e.g. doesn't adjust with viewport
		if(self.corner.fixed !== TRUE) {
			// Horizontal - Shift or flip method
			if(horizontal === 'shift' && newCorner.precedance === 'x' && adjust.left && newCorner.y !== 'center') {
				newCorner.precedance = newCorner.precedance === 'x' ? 'y' : 'x';
			}
			else if(horizontal === 'flip' && adjust.left){
				newCorner.x = newCorner.x === 'center' ? (adjust.left > 0 ? 'left' : 'right') : (newCorner.x === 'left' ? 'right' : 'left');
			}

			// Vertical - Shift or flip method
			if(vertical === 'shift' && newCorner.precedance === 'y' && adjust.top && newCorner.x !== 'center') {
				newCorner.precedance = newCorner.precedance === 'y' ? 'x' : 'y';
			}
			else if(vertical === 'flip' && adjust.top) {
				newCorner.y = newCorner.y === 'center' ? (adjust.top > 0 ? 'top' : 'bottom') : (newCorner.y === 'top' ? 'bottom' : 'top');
			}

			// Update and redraw the tip if needed (check cached details of last drawn tip)
			if(newCorner.string() !== cache.corner && (cache.top !== adjust.top || cache.left !== adjust.left)) {
				self.update(newCorner, FALSE);
			}
		}

		// Setup tip offset properties
		offset = self.position(newCorner, adjust);
		if(offset.right !== undefined) { offset.left = -offset.right; }
		if(offset.bottom !== undefined) { offset.top = -offset.bottom; }
		offset.user = Math.max(0, opts.offset);

		// Viewport "shift" specific adjustments
		if(shift.left = (horizontal === 'shift' && !!adjust.left)) {
			if(newCorner.x === 'center') {
				css['margin-left'] = shift.x = offset['margin-left'] - adjust.left;
			}
			else {
				props = offset.right !== undefined ?
					[ adjust.left, -offset.left ] : [ -adjust.left, offset.left ];

				if( (shift.x = Math.max(props[0], props[1])) > props[0] ) {
					pos.left -= adjust.left;
					shift.left = FALSE;
				}
				
				css[ offset.right !== undefined ? 'right' : 'left' ] = shift.x;
			}
		}
		if(shift.top = (vertical === 'shift' && !!adjust.top)) {
			if(newCorner.y === 'center') {
				css['margin-top'] = shift.y = offset['margin-top'] - adjust.top;
			}
			else {
				props = offset.bottom !== undefined ?
					[ adjust.top, -offset.top ] : [ -adjust.top, offset.top ];

				if( (shift.y = Math.max(props[0], props[1])) > props[0] ) {
					pos.top -= adjust.top;
					shift.top = FALSE;
				}

				css[ offset.bottom !== undefined ? 'bottom' : 'top' ] = shift.y;
			}
		}

		/*
		 * If the tip is adjusted in both dimensions, or in a
		 * direction that would cause it to be anywhere but the
		 * outer border, hide it!
		 */
		elems.tip.css(css).toggle(
			!((shift.x && shift.y) || (newCorner.x === 'center' && shift.y) || (newCorner.y === 'center' && shift.x))
		);

		// Adjust position to accomodate tip dimensions
		pos.left -= offset.left.charAt ? offset.user : horizontal !== 'shift' || shift.top || !shift.left && !shift.top ? offset.left : 0;
		pos.top -= offset.top.charAt ? offset.user : vertical !== 'shift' || shift.left || !shift.left && !shift.top ? offset.top : 0;

		// Cache details
		cache.left = adjust.left; cache.top = adjust.top;
		cache.corner = newCorner.string();
	}

	/* border width calculator */
	function borderWidth(corner, side, backup) {
		side = !side ? corner[corner.precedance] : side;
		
		var isFluid = tooltip.hasClass(fluidClass),
			isTitleTop = elems.titlebar && corner.y === 'top',
			elem = isTitleTop ? elems.titlebar : elems.content,
			css = 'border-' + side + '-width',
			val;

		// Grab the border-width value (add fluid class if needed)
		tooltip.addClass(fluidClass);
		val = parseInt(elem.css(css), 10);
		val = (backup ? val || parseInt(tooltip.css(css), 10) : val) || 0;
		tooltip.toggleClass(fluidClass, isFluid);

		return val;
	}

	function borderRadius(corner) {
		var isTitleTop = elems.titlebar && corner.y === 'top',
			elem = isTitleTop ? elems.titlebar : elems.content,
			moz = $.browser.mozilla,
			prefix = moz ? '-moz-' : $.browser.webkit ? '-webkit-' : '',
			side = corner.y + (moz ? '' : '-') + corner.x,
			css = prefix + (moz ? 'border-radius-' + side : 'border-' + side + '-radius');

		return parseInt(elem.css(css), 10) || parseInt(tooltip.css(css), 10) || 0;
	}

	function calculateSize(corner) {
		var y = corner.precedance === 'y',
			width = size [ y ? 'width' : 'height' ],
			height = size [ y ? 'height' : 'width' ],
			isCenter = corner.string().indexOf('center') > -1,
			base = width * (isCenter ? 0.5 : 1),
			pow = Math.pow,
			round = Math.round,
			bigHyp, ratio, result,

		smallHyp = Math.sqrt( pow(base, 2) + pow(height, 2) ),
		
		hyp = [
			(border / base) * smallHyp, (border / height) * smallHyp
		];
		hyp[2] = Math.sqrt( pow(hyp[0], 2) - pow(border, 2) );
		hyp[3] = Math.sqrt( pow(hyp[1], 2) - pow(border, 2) );

		bigHyp = smallHyp + hyp[2] + hyp[3] + (isCenter ? 0 : hyp[0]);
		ratio = bigHyp / smallHyp;

		result = [ round(ratio * height), round(ratio * width) ];
		return { height: result[ y ? 0 : 1 ], width: result[ y ? 1 : 0 ] };
	}

	$.extend(self, {
		init: function()
		{
			var enabled = self.detectCorner() && (hasCanvas || $.browser.msie);

			// Determine tip corner and type
			if(enabled) {
				// Create a new tip and draw it
				self.create();
				self.update();

				// Bind update events
				tooltip.unbind(namespace).bind('tooltipmove'+namespace, reposition);
			}
			
			return enabled;
		},

		detectCorner: function()
		{
			var corner = opts.corner,
				posOptions = qTip.options.position,
				at = posOptions.at,
				my = posOptions.my.string ? posOptions.my.string() : posOptions.my;

			// Detect corner and mimic properties
			if(corner === FALSE || (my === FALSE && at === FALSE)) {
				return FALSE;
			}
			else {
				if(corner === TRUE) {
					self.corner = new PLUGINS.Corner(my);
				}
				else if(!corner.string) {
					self.corner = new PLUGINS.Corner(corner);
					self.corner.fixed = TRUE;
				}
			}

			return self.corner.string() !== 'centercenter';
		},

		detectColours: function() {
			var i, fill, border,
				tip = elems.tip.css({ backgroundColor: '', border: '' }),
				corner = self.corner,
				precedance = corner[ corner.precedance ],

				borderSide = 'border-' + precedance + '-color',
				borderSideCamel = 'border' + precedance.charAt(0) + precedance.substr(1) + 'Color',

				invalid = /rgba?\(0, 0, 0(, 0)?\)|transparent/i,
				backgroundColor = 'background-color',
				transparent = 'transparent',

				bodyBorder = $(document.body).css('color'),
				contentColour = qTip.elements.content.css('color'),

				useTitle = elems.titlebar && (corner.y === 'top' || (corner.y === 'center' && tip.position().top + (size.height / 2) + opts.offset < elems.titlebar.outerHeight(1))),
				colorElem = useTitle ? elems.titlebar : elems.content;

			// Apply the fluid class so we can see our CSS values properly
			tooltip.addClass(fluidClass);

			// Detect tip colours from CSS styles
			color.fill = fill = tip.css(backgroundColor);
			color.border = border = tip[0].style[ borderSideCamel ] || tip.css(borderSide) || tooltip.css(borderSide);
			
			// Make sure colours are valid
			if(!fill || invalid.test(fill)) {
				color.fill = colorElem.css(backgroundColor) || transparent;
				if(invalid.test(color.fill)) {
					color.fill = tooltip.css(backgroundColor) || fill;
				}
			}
			if(!border || invalid.test(border) || border === bodyBorder) {
				color.border = colorElem.css(borderSide) || transparent;
				if(invalid.test(color.border) || color.border === contentColour) {
					color.border = border;
				}
			}

			// Reset background and border colours
			$('*', tip).add(tip).css(backgroundColor, transparent).css('border', '');

			// Remove fluid class
			tooltip.removeClass(fluidClass);
		},

		create: function()
		{
			var width = size.width,
				height = size.height,
				vml;

			// Remove previous tip element if present
			if(elems.tip) { elems.tip.remove(); }

			// Create tip element and prepend to the tooltip
			elems.tip = $('<div />', { 'class': 'ui-tooltip-tip' }).css({ width: width, height: height }).prependTo(tooltip);

			// Create tip drawing element(s)
			if(hasCanvas) {
				// save() as soon as we create the canvas element so FF2 doesn't bork on our first restore()!
				$('<canvas />').appendTo(elems.tip)[0].getContext('2d').save();
			}
			else {
				vml = '<vml:shape coordorigin="0,0" style="display:inline-block; position:absolute; behavior:url(#default#VML);"></vml:shape>';
				elems.tip.html(vml + vml);
			}
		},

		update: function(corner, position)
		{
			var tip = elems.tip,
				inner = tip.children(),
				width = size.width,
				height = size.height,
				regular = 'px solid ',
				transparent = 'px dashed transparent', // Dashed IE6 border-transparency hack. Awesome!
				mimic = opts.mimic,
				round = Math.round,
				precedance, context, coords, translate, newSize;

			// Re-determine tip if not already set
			if(!corner) { corner = self.corner; }

			// Use corner property if we detect an invalid mimic value
			if(mimic === FALSE) { mimic = corner; }

			// Otherwise inherit mimic properties from the corner object as necessary
			else {
				mimic = new PLUGINS.Corner(mimic);
				mimic.precedance = corner.precedance;

				if(mimic.x === 'inherit') { mimic.x = corner.x; }
				else if(mimic.y === 'inherit') { mimic.y = corner.y; }
				else if(mimic.x === mimic.y) {
					mimic[ corner.precedance ] = corner[ corner.precedance ];
				}
			}
			precedance = mimic.precedance;

			// Update our colours
			self.detectColours();

			// Detect border width, taking into account colours
			if(color.border !== 'transparent' && color.border !== '#123456') {
				// Grab border width
				border = borderWidth(corner, NULL, TRUE);

				// If border width isn't zero, use border color as fill (1.0 style tips)
				if(opts.border === 0 && border > 0) { color.fill = color.border; }

				// Set border width (use detected border width if opts.border is true)
				self.border = border = opts.border !== TRUE ? opts.border : border;
			}

			// Border colour was invalid, set border to zero
			else { self.border = border = 0; }

			// Calculate coordinates
			coords = calculateTip(mimic, width , height);

			// Determine tip size
			self.size = newSize = calculateSize(corner);
			tip.css(newSize);

			// Calculate tip translation
			if(corner.precedance === 'y') {
				translate = [
					round(mimic.x === 'left' ? border : mimic.x === 'right' ? newSize.width - width - border : (newSize.width - width) / 2),
					round(mimic.y === 'top' ?  newSize.height - height : 0)
				];
			}
			else {
				translate = [
					round(mimic.x === 'left' ? newSize.width - width : 0),
					round(mimic.y === 'top' ? border : mimic.y === 'bottom' ? newSize.height - height - border : (newSize.height - height) / 2)
				];
			}

			// Canvas drawing implementation
			if(hasCanvas) {
				// Set the canvas size using calculated size
				inner.attr(newSize);
				
				// Grab canvas context and clear/save it
				context = inner[0].getContext('2d');
				context.restore(); context.save();
				context.clearRect(0,0,3000,3000);
				
				// Translate origin
				context.translate(translate[0], translate[1]);
				
				// Draw the tip
				context.beginPath();
				context.moveTo(coords[0][0], coords[0][1]);
				context.lineTo(coords[1][0], coords[1][1]);
				context.lineTo(coords[2][0], coords[2][1]);
				context.closePath();
				context.fillStyle = color.fill;
				context.strokeStyle = color.border;
				context.lineWidth = border * 2;
				context.lineJoin = 'miter';
				context.miterLimit = 100;
				if(border) { context.stroke(); }
				context.fill();
			}

			// VML (IE Proprietary implementation)
			else {
				// Setup coordinates string
				coords = 'm' + coords[0][0] + ',' + coords[0][1] + ' l' + coords[1][0] +
					',' + coords[1][1] + ' ' + coords[2][0] + ',' + coords[2][1] + ' xe';

				// Setup VML-specific offset for pixel-perfection
				translate[2] = border && /^(r|b)/i.test(corner.string()) ?
					parseFloat($.browser.version, 10) === 8 ? 2 : 1 : 0;

				// Set initial CSS
				inner.css({
					antialias: ''+(mimic.string().indexOf('center') > -1),
					left: translate[0] - (translate[2] * Number(precedance === 'x')),
					top: translate[1] - (translate[2] * Number(precedance === 'y')),
					width: width + border,
					height: height + border
				})
				.each(function(i) {
					var $this = $(this);

					// Set shape specific attributes
					$this[ $this.prop ? 'prop' : 'attr' ]({
						coordsize: (width+border) + ' ' + (height+border),
						path: coords,
						fillcolor: color.fill,
						filled: !!i,
						stroked: !!!i
					})
					.css({ display: border || i ? 'block' : 'none' });

					// Check if border is enabled and add stroke element
					if(!i && $this.html() === '') {
						$this.html(
							'<vml:stroke weight="'+(border*2)+'px" color="'+color.border+'" miterlimit="1000" joinstyle="miter" ' +
							' style="behavior:url(#default#VML); display:inline-block;" />'
						);
					}
				});
			}

			// Position if needed
			if(position !== FALSE) { self.position(corner); }
		},

		// Tip positioning method
		position: function(corner)
		{
			var tip = elems.tip,
				position = {},
				userOffset = Math.max(0, opts.offset),
				precedance, dimensions, corners;

			// Return if tips are disabled or tip is not yet rendered
			if(opts.corner === FALSE || !tip) { return FALSE; }

			// Inherit corner if not provided
			corner = corner || self.corner;
			precedance = corner.precedance;

			// Determine which tip dimension to use for adjustment
			dimensions = calculateSize(corner);

			// Setup corners and offset array
			corners = [ corner.x, corner.y ];
			if(precedance === 'x') { corners.reverse(); }

			// Calculate tip position
			$.each(corners, function(i, side) {
				var b, br;

				if(side === 'center') {
					b = precedance === 'y' ? 'left' : 'top';
					position[ b ] = '50%';
					position['margin-' + b] = -Math.round(dimensions[ precedance === 'y' ? 'width' : 'height' ] / 2) + userOffset;
				}
				else {
					b = borderWidth(corner, side, TRUE);
					br = borderRadius(corner);
					
					position[ side ] = i ?
						border ? borderWidth(corner, side) : 0 : 
						userOffset + (br > b ? br : 0);
				}
			});

			// Adjust for tip dimensions
			position[ corner[precedance] ] -= dimensions[ precedance === 'x' ? 'width' : 'height' ];

			// Set and return new position
			tip.css({ top: '', bottom: '', left: '', right: '', margin: '' }).css(position);
			return position;
		},
		
		destroy: function()
		{
			// Remov tip and bound events
			if(elems.tip) { elems.tip.remove(); }
			tooltip.unbind(namespace);
		}
	});
	
	self.init();
}

PLUGINS.tip = function(api)
{
	var self = api.plugins.tip;
	
	return 'object' === typeof self ? self : (api.plugins.tip = new Tip(api));
};

// Initialize tip on render
PLUGINS.tip.initialize = 'render';

// Setup plugin sanitization options
PLUGINS.tip.sanitize = function(options)
{
	var style = options.style, opts;
	if(style && 'tip' in style) {
		opts = options.style.tip;
		if(typeof opts !== 'object'){ options.style.tip = { corner: opts }; }
		if(!(/string|boolean/i).test(typeof opts.corner)) { opts.corner = TRUE; }
		if(typeof opts.width !== 'number'){ delete opts.width; }
		if(typeof opts.height !== 'number'){ delete opts.height; }
		if(typeof opts.border !== 'number' && opts.border !== TRUE){ delete opts.border; }
		if(typeof opts.offset !== 'number'){ delete opts.offset; }
	}
};

// Extend original qTip defaults
$.extend(TRUE, QTIP.defaults, {
	style: {
		tip: {
			corner: TRUE,
			mimic: FALSE,
			width: 6,
			height: 6,
			border: TRUE,
			offset: 0
		}
	}
});


}(jQuery, window));;
(function ($) {
Drupal.behaviors.qtip = {
  attach: function(context) {

    // Set delay on click to immediate
    if (Drupal.settings.qtip.show_event_type == 'click') {
      show_delay = 1;
    }
    else {
      show_delay = 140; // This is the default qTip value, set for hover links
    }

    // Determine how to position the tooltip
    if (Drupal.settings.qtip.show_speech_bubble_tip) {
      // Set the proper qtip speech-bubble tip position
      if (Drupal.settings.qtip.show_speech_bubble_tip_side) {
        switch_position = Drupal.settings.qtip.tooltip_position.split('_');
        // We do not want to put tooltip on it's side if it is being displayed
        // in the center or side of an element
        if (switch_position[1] == 'center') {
          tip_position = Drupal.settings.qtip.tooltip_position;
        }
        else {
          tip_position = switch_position[1] + ' ' + switch_position[0];
        }
      }
      // Otherwise just set it to the same value as the tooltip
      else {
        tip_position = Drupal.settings.qtip.tooltip_position;
      }
    }
    else {
      tip_position = false;
    }
    
    // Is a custom style declared by the admin?
    if(Drupal.settings.qtip.color == 'custom-color') {
      Drupal.settings.qtip.color = Drupal.settings.qtip.custom_color;
    }

    // Do we want a shadow to show under the tooltip?
    if(Drupal.settings.qtip.show_shadow) {
      style_classes = 'ui-tooltip-shadow ' + Drupal.settings.qtip.color;
    }
    else {
      style_classes = Drupal.settings.qtip.color;
    }
    
    // Do we want to show the tooltips with rounded corners?
    if(Drupal.settings.qtip.rounded_corners) {
      style_classes += ' ui-tooltip-rounded';
    }
    
    //Do we want a solid tip to display
    if (Drupal.settings.qtip.show_speech_bubble_tip_solid) {
      solid_tip = false;
    }
    else {
      solid_tip = 5;
    }

/*** Standard Settings ***/
    $('.qtip-link').each(function() {
      if(Drupal.settings.qtip.show_event_type == 'click') {
        $(this).addClass('ui-tooltip-click');
      }
      
      // if there is a title associated with this qtip...
      if ($(this).children('.qtip-header').length) {
        tooltip_title = $(this).children('.qtip-header').html();
      }
      // if there isn't we don't want a blank title area to show on the qtip...
      else {
        tooltip_title = false;
      }
      
      build_qtip(this, 'node');
    });
    
/*** Additional Elements ***/
    if(Drupal.settings.qtip.additional_elements) {
      $(Drupal.settings.qtip.additional_elements).each(function() {
        $(this).addClass('qtip-additional-element');
        if(Drupal.settings.qtip.show_event_type == 'click') {
          $(this).addClass('ui-tooltip-click');
        }
        
        // if there is a title associated with this qtip...
        if ($(this).children('.qtip-header').length) {
          tooltip_title = $(this).children('.qtip-header').html();
        }
        // if there isn't we don't want a blank title area to show on the qtip...
        else {
          tooltip_title = false;
        }
        
        build_qtip(this, 'node');
      });
    }

/*** Webform Settings ***/
    // Does the admin even want the descriptions to show up in a tooltip?
    if (Drupal.settings.qtip.show_webform_descriptions) {
      /*
       form-text - works well
       form-textarea - works, but width can throw off the tooltip
       form-radios - works, but the radios element wrapper is 100% width, so throws off tooltip like form-textarea
       form-select - works well - should maybe have something like mouseenter or something for usability
      */
      // Elements where description is a sibling to the selected element
      $('form.webform-client-form .form-text,' +
        'form.webform-client-form .form-select').each(function() {
        description = $(this).siblings('.description');
        description.css('display', 'none');
        tooltip_title = false;
        show_delay = 1;
        build_qtip(this, 'form', description.html());
      });
  
      // Elements where description is a sibling to the PARENT of the selected element
      $('form.webform-client-form .form-radios,' +
        'form.webform-client-form .form-textarea').each(function() {
        description = $(this).parent().siblings('.description');
        description.css('display', 'none');
        tooltip_title = false;
        show_delay = 1;
        
        build_qtip(this, 'form', description.html());
      });
    }
    
    
    
    function build_qtip(el, type, desc) {
      if (type == 'form') {
        show_text = desc ? desc : '';
        // By default, the description text is wrapped inside <p>
        // Since we are putting this in a tooltip we want to remove this
        // and any other tags that might possibly get set
        show_text = show_text.replace(/(<.*?>)/ig,"");
        set_my = 'left_center';
        tip_position = 'left_center';
        set_at = 'right_center';
        show_event = 'focus';
        hide_event = 'blur';
      }
      else { // "Normal" tooltip
        show_text = $(el).children('.qtip-tooltip');
        set_my = Drupal.settings.qtip.tooltip_position;
        set_at = Drupal.settings.qtip.target_position;
        show_event = Drupal.settings.qtip.show_event_type;
        hide_event = Drupal.settings.qtip.hide_event_type;
      }
      $(el).qtip({
        content: {
          text: show_text,
          title: {
            text: tooltip_title
          }
        },
        position: {
          my: set_my, // my = speech bubble position on tooltip
          at: set_at, // at = where on link text tooltip will appear
          adjust: {
            screen: true // Keeps tooltip within visible window
          }
        },
        style: {
          classes: style_classes,
          tip: {
            corner: tip_position, // Position of speech bubble tip...false will not display tip
            border: solid_tip, // parseInt(Drupal.settings.qtip.border_width)
            width: parseInt(Drupal.settings.qtip.speech_bubble_size),
            height: parseInt(Drupal.settings.qtip.speech_bubble_size)
          }
        },
        show: {
          event: show_event,
          solo: true, // Determines whether or not the tooltip will hide all others when the show.event is triggered on the show.target. 
          delay: show_delay
        },
        hide: {
          event: hide_event,
          fixed: true //When set to true, the tooltip will not hide if moused over, allowing the contents to be clicked and interacted with.
        }
      });
    }
  }
};
})(jQuery);
;
/*jslint browser: true */ /*global jQuery: true */

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

// TODO JsDoc

/**
 * Create a cookie with the given key and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String key The key of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given key.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (key, value, options) {

    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = jQuery.extend({}, options);

        if (value === null) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};
;

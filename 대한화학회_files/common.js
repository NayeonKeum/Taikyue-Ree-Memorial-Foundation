// Scroll Move
function scrollMove(t,h) {
	'use strict';
	if(h==undefined) h=0;
	var o = jQuery('html, body');
	o.animate({
		scrollTop:jQuery(t).offset().top-h
	},500);
}

// Menu Open
function menuOpen(o, t){
	"use strict";
	var o = jQuery(o).attr('id');
	var a = -jQuery(window).scrollTop();
	jQuery('#wrap').css('top',a);
	jQuery('#'+o).before('<a class="dim" onclick="menuClose('+o+');"><i class="sr-only">close</i></a>');
	jQuery('body').addClass('nav-open');
	setTimeout(function  () {
		jQuery('#'+o).show(0,function(){
			jQuery('body').addClass(o+'-open');
		});
	},300);
}

// Menu Close
function menuClose(o, t){
	'use strict';
	var o = jQuery(o).attr('id');
	var originScroll = -jQuery('#wrap').position().top;
	t = !t && 0;
	jQuery('body').removeClass(o+'-open').find('.dim').remove();
	setTimeout(function(){
		jQuery('#'+o).hide();
		jQuery('body').removeClass('nav-open');
		if (originScroll != -0) {
			jQuery(window).scrollTop(originScroll);
		}
		jQuery('#wrap').removeAttr('style');
	},300);
}

jQuery(function($){
	'use strict';
	var $body = $('body');
	var $window = $(window);
//	if($window.width()<1023){
//		$window.scroll(function(){
//			if($window.scrollTop() > $window.height()/2){
//				$body.addClass('is-scroll');
//			}else{
//				$body.removeClass('is-scroll');
//			}
//		});
//	}
	var jbOffset = jQuery( '.gnb' ).offset();
	$window.scroll(function(){
		if(jQuery(document).scrollTop() > jbOffset.top) {
			jQuery('.float-buttons').addClass('float-buttons_view');
		}else {
			jQuery('.float-buttons').removeClass('float-buttons_view');
		}
	});
	jQuery('body').append('<div class="float-buttons"><a href="#wrap" class="btn-top js-btn-scroll"><i class="xi-arrow-up"></i><i class="sr-only">상단으로</i></a></div>');

	$('.js-btn-scroll').on('click',function(){
		var t = $(this);
		var offset = t.attr('data-offset') || 0;
		scrollMove($(this).attr('href'), offset);
		return false;
	});

	$('[data-toggle="buttons"]').click(function(){
		var target = $(this).attr('data-target');
		target && $(target).toggleClass('active');
	});

	// gnb
	$('.hd-menu').mouseenter(function(){
		menuOpen(gnb);
	});
	$('#hd').mouseleave(function(){
		menuClose(gnb);
	});
	$('.hd-menu>a:first, .hd-menu>a:last').focus(function(){
		menuOpen(gnb);
	});
	$('.logo a, .util a').focus(function(){
		menuClose(gnb);
	});
	$('.js-mn').click(function  () {
		$body.hasClass('nav-open') ? menuClose(gnb) : menuOpen(gnb);
	});
	$('.dep').on('click',function  () {
		if($window.width()<992){
			$(this).toggleClass('on').next('.depth').toggle();
			return false;
		}
	});

	// url
	var hashUrl = String(parent.location).split('#')[1];
	if(hashUrl){
		$('a[href=#'+hashUrl+']').click();
	}
});

function rule(ref){
	var window_left = (screen.width-800)/2;
	var window_top = (screen.height-700)/2;
	window.open(ref,"rule",'toolbar=0,location=0,directories=0,status=0,menubar=1,scrollbars=yes,resizable=0,copyhistory=0,width=620,height=600,status=no,top=' + window_top + ',left=' + window_left + '');
 }
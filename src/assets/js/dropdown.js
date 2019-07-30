jQuery(document).ready(function($){

	
	// $('.msg_send_btn').click(function(){
	// 	alert('gel');
	// 	$('.msg_history').scrollTo($("#Locationtrue"));
	// });
    $(window).bind("load", function() {
		
			$(document).on("mouseenter","#cd-dropdown-trigger, .cd-dropdown-trigger",function(event) {   
				event.preventDefault();
				toggleNav();
			});
			var headerHeight = $(".aa-header-bottom").height() + 40;
			console.log(headerHeight);
		$(window).scroll(function(){
			if ($(this).scrollTop() > 100) {	
				$('.aa-header-bottom').addClass('fixed');
				$('#tabs_fixed').addClass('tabs-fixed');
				$('.aa-product-inner .tabs').css('top', headerHeight + 'px');
			} else {
				$('.aa-header-bottom').removeClass('fixed');
				$('#tabs_fixed').removeClass('tabs-fixed');
				$('.aa-product-inner .tabs').css('top','0px');
			}
		});
			$(document).on("keypress","#write_msg",function(e) {   
			var key = e.which;
			if(key == 13)  // the enter key code
			 {
				$("#msg_history").stop().animate({ scrollTop: $("#msg_history")[0].scrollHeight}, 1000);
			   return false;
			 }
		   });
				$(document).on("click","#chat_list",function() {
					$('html,body').animate({
						scrollTop: $(".mesgs").offset().top},
						'slow');
				});
		$(document).on("click",".msg_send_btn",function() {   
			$(".msg_history").stop().animate({ scrollTop: $(".msg_history")[0].scrollHeight}, 1000);
		 });
	//open/close mega-navigation
	
	//close meganavigation
	$(document).on("click",".cd-dropdown .cd-close",function(event) {
		event.preventDefault();
		toggleNav();
	});
	//on mobile - open submenu
	$('.has-children').children('a').on('click', function(event){
		//prevent default clicking on direct children of .has-children
		event.preventDefault();
		var selected = $(this);
		selected.next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('move-out');
	});

	//on desktop - differentiate between a user trying to hover over a dropdown item vs trying to navigate into a submenu's contents
	var submenuDirection = ( !$('.cd-dropdown-wrapper').hasClass('open-to-left') ) ? 'right' : 'left';
	$('.cd-dropdown-content').menuAim({
        activate: function(row) {
        	$(row).children().addClass('is-active').removeClass('fade-out');
        	if( $('.cd-dropdown-content .fade-in').length == 0 ) $(row).children('ul').addClass('fade-in');
        },
        deactivate: function(row) {
        	$(row).children().removeClass('is-active');
        	if( $('li.has-children:hover').length == 0 || $('li.has-children:hover').is($(row)) ) {
        		$('.cd-dropdown-content').find('.fade-in').removeClass('fade-in');
        		$(row).children('ul').addClass('fade-out')
        	}
        },
        exitMenu: function() {
        	$('.cd-dropdown-content').find('.is-active').removeClass('is-active');
        	return true;
        },
        submenuDirection: submenuDirection,
    });

	//submenu items - go back link
	$('.go-back').on('click', function(){
		var selected = $(this),
			visibleNav = $(this).parent('ul').parent('.has-children').parent('ul');
		selected.parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('move-out');
	});
	$('#file-upload').change(function() {
		var i = $(this).next('label').clone();
		var file = $('#file-upload')[0].files[0].name;
		$(this).next('label').text(file);
	  });
	function toggleNav(){
		var navIsVisible = ( !$('.cd-dropdown').hasClass('dropdown-is-active') ) ? true : false;
		$('.cd-dropdown').toggleClass('dropdown-is-active', navIsVisible);
		$('.cd-dropdown-trigger').toggleClass('dropdown-is-active', navIsVisible);
		if( !navIsVisible ) {
			$('.cd-dropdown').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
				$('.has-children ul').addClass('is-hidden');
				$('.move-out').removeClass('move-out');
				$('.is-active').removeClass('is-active');
			});
		}
	}
});
});

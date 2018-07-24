(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 0);
			});

		// Touch mode.
			if (skel.vars.mobile)
				$body.addClass('is-touch');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Scrolly links.
			$('.scrolly').scrolly({
				speed: 2000
			});

		// Dropdowns.
			// $('#nav > ul').dropotron({
				// alignment: 'right',
				// hideDelay: 350
			// });

		// Off-Canvas Navigation.

			// Title Bar.
				$(
					'<div id="titleBar">' +
						'<a href="tel:+7(499)390-72-14" class="toggle"></a>' +
						'<span class="title">' + $('#logo').html() + '</span>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				// $(
					// '<div id="navPanel">' +
						// '<nav>' +
							// $('#nav').navList() +
						// '</nav>' +
					// '</div>'
				// )
					// .appendTo($body)
					// .panel({
						// delay: 500,
						// hideOnClick: true,
						// hideOnSwipe: true,
						// resetScroll: true,
						// resetForms: true,
						// side: 'left',
						// target: $body,
						// visibleClass: 'navPanel-visible'
					// });

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#titleBar, #navPanel, #page-wrapper')
						.css('transition', 'none');

		// Parallax.
		// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
			if (skel.vars.browser == 'ie'
			||	skel.vars.mobile) {

				$.fn._parallax = function() {

					return $(this);

				};

			}
			else {

				$.fn._parallax = function() {

					$(this).each(function() {

						var $this = $(this),
							on, off;

						on = function() {

							$this
								.css('background-position', 'center 0px');

							$window
								.on('scroll._parallax', function() {

									var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

									$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

								});

						};

						off = function() {

							$this
								.css('background-position', '');

							$window
								.off('scroll._parallax');

						};

						skel.on('change', function() {

							if (skel.breakpoint('medium').active)
								(off)();
							else
								(on)();

						});

					});

					return $(this);

				};

				$window
					.on('load resize', function() {
						$window.trigger('scroll');
					});

			}

		// Spotlights.
			var $spotlights = $('.spotlight');

			$spotlights
				._parallax()
				.each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						// Use main <img>'s src as this spotlight's background.
							$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

						// Enable transitions (if supported).
							if (skel.canUse('transition')) {

								var top, bottom, mode;

								// Side-specific scrollex tweaks.
									if ($this.hasClass('top')) {

										mode = 'top';
										top = '-20%';
										bottom = 0;

									}
									else if ($this.hasClass('bottom')) {

										mode = 'bottom-only';
										top = 0;
										bottom = '20%';

									}
									else {

										mode = 'middle';
										top = 0;
										bottom = 0;

									}

								// Add scrollex.
									$this.scrollex({
										mode:		mode,
										top:		top,
										bottom:		bottom,
										initialize:	function(t) { $this.addClass('inactive'); },
										terminate:	function(t) { $this.removeClass('inactive'); },
										enter:		function(t) { $this.removeClass('inactive'); },

										// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

										//leave:	function(t) { $this.addClass('inactive'); },

									});

							}

					};

					off = function() {

						// Clear spotlight's background.
							$this.css('background-image', '');

						// Disable transitions (if supported).
							if (skel.canUse('transition')) {

								// Remove scrollex.
									$this.unscrollex();

							}

					};

					skel.on('change', function() {

						if (skel.breakpoint('medium').active)
							(off)();
						else
							(on)();

					});

				});

		// Wrappers.
			var $wrappers = $('.wrapper');

			$wrappers
				.each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						if (skel.canUse('transition')) {

							$this.scrollex({
								top:		250,
								bottom:		0,
								initialize:	function(t) { $this.addClass('inactive'); },
								terminate:	function(t) { $this.removeClass('inactive'); },
								enter:		function(t) { $this.removeClass('inactive'); },

								// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

								//leave:	function(t) { $this.addClass('inactive'); },

							});

						}

					};

					off = function() {

						if (skel.canUse('transition'))
							$this.unscrollex();

					};

					skel.on('change', function() {

						if (skel.breakpoint('medium').active)
							(off)();
						else
							(on)();

					});

				});

		// Banner.
			var $banner = $('#banner');

			$banner
				._parallax();

	});
	
	// Fancybox init
	$(document).ready(function() {
		$(".fancybox").fancybox({
			padding		: 0,
			autoSize : true,
			fitToView : true,
			beforeLoad : function() {         
				this.width  = parseInt(this.element.data('fancybox-width'));  
				this.height = parseInt(this.element.data('fancybox-height'));
				this.fitToView  = !(this.element.data('fancybox-fit') == false);
			},
			helpers: {
					title : {
						type : 'outside'
					},
					overlay : {
						speedOut : 0,
						showEarly : true
						}
					}
		});
	});
	
	// Forms validation
	$(".ajax-form-msg").validate({
		rules: {
			name: {
			required: true,
			minlength: 2
			},
			email: {
			required: true,
			email: true
			},
			message: {
			required: true,
			}
		},
		messages: {
			name: "Укажите Ваше имя",
			email: {
			  required: "Укажите Ваш e-mail",
			  email: "Формат: name@domain.com"
			},
			message: {
			  required: "Напишите нам что-нибудь"
			}
		},
		// errorPlacement: function(error, element) {
		// },
		submitHandler: function(form) {
			$.ajax({
				dataType: "jsonp",
				url: "https://getsimpleform.com/messages/ajax?form_api_token=f346c137e5a7ca4624adddbae2e9b3a4",
				data: $(".ajax-form-msg").serialize() 
				}).done(function() {
				//callback which can be used to show a thank you message
				//and reset the form
				$(".ajax-form-msg").hide();
				$(".form-thank-you-msg").fadeIn("400");
			});
			return false; //to stop the form from submitting
		}
	});
	
	$(".ajax-form-callback").validate({
		rules: {
			name: {
			required: true,
			minlength: 2
			},
			phone: {
			required: true
			}
		},
		messages: {
			name: "Укажите Ваше имя",
			phone: "Укажите Ваш телефон"
		},
		// errorPlacement: function(error, element) {
		// },
		submitHandler: function(form) {
			$.ajax({
				dataType: "jsonp",
				url: "https://briskforms.com/go/3a72f453e9d85f7772c11185f7173f67",
				data: $(".ajax-form-callback").serialize() 
				}).done(function() {
				//callback which can be used to show a thank you message
				//and reset the form
				$(".ajax-form-callback").hide();
				$(".form-thank-you-callback").fadeIn("400");
			});
			return false; //to stop the form from submitting
		}
	});

})(jQuery);
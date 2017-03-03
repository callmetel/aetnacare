$(document).ready(function() {

	var tm = TweenMax;
	var tl = TweenLite;

	// Get IE or Edge browser version
	    var version = detectIE();

	    if (version === false) {
	      $('html').removeClass('IE');
	    } 
	    else if (version >= 12) {
	    	 console.log('You are using IE');
	      $('html').addClass('IE');
	    } 
	    else {
	      console.log('You are using IE');
	      $('html').addClass('IE');
	    };

	    function detectIE() {
	      var ua = window.navigator.userAgent;

	      var msie = ua.indexOf('MSIE ');
	      if (msie > 0) {
	        // IE 10 or older => return version number
	        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	      }

	      var trident = ua.indexOf('Trident/');
	      if (trident > 0) {
	        // IE 11 => return version number
	        var rv = ua.indexOf('rv:');
	        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	      }

	      var edge = ua.indexOf('Edge/');
	      if (edge > 0) {
	        // Edge (IE 12+) => return version number
	        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	      }

	      // other browser
	      return false;
	    };

	// Create isMobile Function

		var isMobile = {
            detectMobile: function() {
                return navigator.userAgent.match(/Mobi/i);
            }
        };

    // Change Videos on Mobile
    	
    	if(isMobile.detectMobile()){
    		$('#videos').after('<div id="mobile-videos"><img src="app/images/loop-0.jpg" id="loop-0" class="loop-video video"></div>');
    		$('#videos').remove();
    		tm.to('#loop-0', 1, {alpha:1, ease:Power2.easeInOut});
    	}
	
	// Remove Focus On Click For Tab Index 
		
		// $('*').mousedown(function(event) {
		// 	$('*').blur();
		// 	$('*').addClass('no-focus');
		// });

		// $('*').bind('keydown', function(event) {
		// 	if(event.keyCode === 9){
		// 		$('*').removeClass('no-focus');
		// 	}
		// });

	// Set Animations

		tm.set('#prev-next', {alpha:0});
		tm.set('nav', {alpha:0});
		tm.set('.start-stroke', {drawSVG:"100% 100%"});
		tm.to('body', 1, {alpha:1, ease:Power2.easeInOut});
		tm.to('#loop-0', 1, {alpha:1, ease:Power2.easeInOut});


	// Section Timelines
		
		var introTL = new TimelineLite, 
			    // titleText = new SplitText("#introduction .section-title", {type:"words"}), 
			    // chars = titleText.words,
			    descrText = new SplitText("#introduction .heading", {type:"words"}), 
			    chars2 = descrText.words;

			introTL.set('#introduction', {alpha:1}, "+=1.1");
			introTL.fromTo('#introduction .section-title', .65, {alpha:0, y:20}, {alpha:1, y:0}, "+=1");
			// introTL.staggerFromTo(chars, 1, {alpha:0, y:80}, {alpha:1, y:0}, 0.01, "+=0");
			introTL.staggerFromTo(chars2, 0.5, {alpha:0, y:20}, {alpha:1, y:0}, 0.01, "-=.25");
			introTL.fromTo('#journey-btn', 0.5, {alpha:0, y:20}, {alpha:1, y:0}, "+=0");
			// introTL.fromTo('#journey-btn .start-stroke', 1, {drawSVG:"100% 100%", ease: Power1.easeInOut}, {drawSVG:"0% 100%", ease: Power1.easeIn}, "-=.5");
			introTL.fromTo('header', 0.5, {alpha:0, y:-20}, {alpha:1, x:'-50%', y:0}, "-=1.5");	


		// document.getElementById("animate").onclick = function() {
		//   introTL.restart();
		// }

		var journeyTL = new TimelineMax({paused:true}), 
			journeyTL2 = new TimelineMax({paused:true}), 
		    sectitleText1 = new SplitText("#journey .section-title", {type:"words"}), 
		    titleText1 = new SplitText("#journey .headline:eq(1)", {type:"words"}), 
		    wrds1 = sectitleText1.words,
		    chars1 = titleText1.words,
		    descrText1 = new SplitText("#journey .content p.content:eq(0)", {type:"words"}), 
		    chars12 = descrText1.words;

		function startJourney() {

			journeyTL.fromTo('#loop-0', .5, {alpha:1}, {alpha:0, ease:Power4.easeOut});
			journeyTL.fromTo('.nav-item-label:eq(0)', .5, {alpha:.1}, {alpha:1, ease:Power4.easeOut},"-=.5");
			journeyTL.fromTo('#introduction', 1, {alpha:1}, {alpha:0, ease:Power4.easeOut},"-=1.5");
			journeyTL.fromTo('.aetna-logo', 1, {alpha:1, y:'-50%'}, {alpha:0, y:'-70%', ease:Power4.easeOut},"-=.75");
			journeyTL.fromTo('.aetnacare-logo', 1, {alpha:0, y:'-30%'}, {alpha:1, y:'-50%', ease:Power4.easeOut},"-=.5");
			journeyTL.set('#introduction', {display:'none'});
			journeyTL.fromTo('#journey', .5, {alpha:0, display:'inherit',x:'-50%',y:'-30%'}, {alpha:1,x:'-50%',y:'-50%', ease:Power4.easeIn},"-=.5");
			journeyTL.staggerFromTo(wrds1, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.01, "+=2.25");
			journeyTL.staggerFromTo(chars1, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.02, "+=2.25");
			tm.set('.prev-btn', {alpha:0});
			tm.to('#prev-next', 1, {display:'inherit', alpha:1, ease:Power4.easeOut});

			journeyTL.staggerTo(wrds1, 1, {alpha:0, y:-30}, 0.01, "+=10");
			journeyTL.staggerTo(chars1, 1, {alpha:0, y:-30}, 0.01, "-=.85")
			journeyTL.fromTo('#journey .content:eq(0)', 2, {display:'none', height:0, autoAlpha:0}, {display:'inherit', height:'auto', autoAlpha:1}, "-=0");;
			// journeyTL.staggerFromTo(chars12, 1, {alpha:1, y:0}, {alpha:0, y:-30}, 0.01);
			// journeyTL.fromTo('#journey .divider:eq(0)', 1, {alpha:1, y:0}, {alpha:0, y:-30});
			// journeyTL.fromTo('#journey .divider:eq(1)', 1, {alpha:1, y:0}, {alpha:0, y:-30});
			// journeyTL.fromTo('.more-btn', 1, {alpha:1, y:0}, {alpha:0, y:-30});
			journeyTL.set([wrds1, chars1, '#journey h2'], {height:0, margin:0});
			journeyTL.set('#journey div.content', {height:'auto'});
			journeyTL.fromTo('.learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut});

			tl.fromTo('#videos', 4, {alpha:.7}, {alpha:.27, ease: Power1.easeInOut, delay: 17});

			journeyTL.play();

		}


	// Button Hover Animations
		
		$('.start-btn').mouseenter(function(e){
			var stroke = $(this).find('.start-stroke');
			var triangle = $(this).find('.triangle');
			tm.fromTo(stroke, 1, {drawSVG:"100% 100%", ease: Power1.easeInOut}, {drawSVG:"0% 100%", ease: Power1.easeIn});
			tm.fromTo(triangle, .5, {y:0, alpha:1, ease: Power1.easeInOut}, {y:-4, alpha:0, ease: Power1.easeIn});
			tm.fromTo(triangle, .5, {y:4, alpha:0, ease: Power1.easeInOut}, {y:0, alpha:1, ease: Power1.easeInOut, delay:.5});
		});

		$('#journey-btn').mouseenter(function(e){
			var stroke = $(this).find('.rect-stroke');
			tm.fromTo(stroke, 1, {drawSVG:"100% 100%", ease: Power1.easeInOut}, {drawSVG:"0% 100%", ease: Power1.easeInOut});
		});

	// Video Timers
	
		var v0Duration = 22;
		var v1Duration = 22;

		var journeyPerc = 0;

	// Start Video Loops 
		
		function startLoop0() {
			tl.fromTo('#loop-0', 1, {alpha:0}, {alpha:1, ease:Power1.easeInOut});

		}

		function startLoop1() {
			tl.fromTo('#loop-1', 1, {alpha:0}, {alpha:1, ease:Power1.easeInOut});

		}

	// Start Video Scenes
		
		function startVideo1() {
			$('#video-1')[0].play();
		}

		var journeyContentHeight;
		$(window).resize(function(){
			journeyContentHeight = $('#journey .content:eq(0)').outerHeight();
	
		}).resize();
		
	// Video Ended Function
		
		$('#video-1')[0].addEventListener('timeupdate', checkVideo1Time);

		function checkVideo1Time(){
		
			if($('#video-1')[0].currentTime >= $('#video-1')[0].duration-.5){
				tl.fromTo('#video-1', 1, {alpha:1}, {alpha:0, ease:Power1.easeInOut, delay:.5});
				tl.fromTo('#loop-1', .15, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
				$('#video-1')[0].removeEventListener('timeupdate', checkVideo1Time);
				$('#loop-1')[0].play();

				// journeyTL.to('#journey', 1, {className:"copy absolute-center is-active"});
				// journeyTL.staggerFromTo(wrds1, 1, {x:50}, {x:0, color:'rgba(255,255,255,0.4)', ease:Power1.easeInOut}, 0.01, "-=1");
				// journeyTL.fromTo('#journey .content:eq(0)', 2, {display:'none', height:0, autoAlpha:0}, {display:'inherit', height:journeyContentHeight, autoAlpha:1}, "-=.5");
				// journeyTL.staggerFromTo(chars1, 1, {alpha:0, y:30}, {alpha:1, y:0}, 0.01, "-=2");
				// journeyTL.fromTo('#journey .divider:eq(0)', .5, {scaleX:0}, {scaleX:1, ease:Power1.easeOut}, "-=1.5");
				// journeyTL.staggerFromTo(chars12, 1, {alpha:0, y:30}, {alpha:1, y:0}, 0.01, "-=1.25");
				// journeyTL.fromTo('#journey .divider:eq(1)', .25, {scaleX:0}, {scaleX:1, ease:Power1.easeOut},"-=1.25");
				// journeyTL.fromTo('#journey .more-btn', 1, {alpha:0, y:30}, {alpha:1, y:0}, "-=1.25");
			}else{
				console.log('hey');
			}	
		}

	// Start Button Click Functions
		
		$('#journey-btn').on('click', function(e){
			e.preventDefault();
startJourney();
			$('#loop-0')[0].pause();
			tl.fromTo('#video-1', .5, {alpha:0}, {alpha:1, ease:Power1.easeInOut, onComplete:startVideo1()});
			var v1Dur = parseInt($('#video-1')[0].duration);
			tl.to('.nav-item:eq(0) .bar > span', v1Dur, {x:0});
			tl.fromTo('#videos', .5, {alpha:.27}, {alpha:.7, ease: Power1.easeInOut});
			tl.to(['#prev-next img','header'], .5, {alpha:.1, ease: Power1.easeInOut});
			tl.fromTo('nav', 0.5, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut});	

			setTimeout(function(){
				$('#introduction').removeClass('is-active');
			}, 2000);
		});

	// Learn More Button

		$('#journey .more-btn').on('click', function(e){
			e.preventDefault();
			journeyScrollDown();
			console.log('clicked');
		});

	// Nav Timer Animation

	// Show Links
		
		$('#header-links').mouseover(function() {
		  	$(this).addClass('show-links');
		}).mouseout(function() {
		  	$(this).removeClass('show-links');
		});

	// Mousemove
		
		// $(document).mouseup(function() {
		//     $(document).off("mousemove", mouse);
		// });
		var movementTimer;
		$('body').mousemove(function(event) {
			// event.stopPropagation();
			clearTimeout(movementTimer);
			if(!$('#introduction').hasClass('is-active')){
				console.log('uooo');
				tl.fromTo(['#prev-next img','header'], .15, {alpha:.1}, {alpha:1, ease: Power1.easeInOut});

		    	movementTimer = setTimeout(function()
		    	{
		    		tl.fromTo(['#prev-next img','header'], .15, {alpha:1}, {alpha:.1, ease: Power1.easeInOut});
		    	}, 2000);
			};
			
		});
		// 

	// Bind Page Function
	
		function bindPage(){
			scrollstart=1;
			checkClicked = false;

			setTimeout(function(){
				var status=0,
					touchReg = false,
					keypress = false;

				if( isMobile.detectMobile() ){
					var ts;
			        $('body').bind('touchstart', function (event){
			           ts = event.originalEvent.touches[0].clientY;
			        });


			        $('body').bind('touchmove', function (event){

			           var te = event.originalEvent.changedTouches[0].clientY;

			           if (touchReg == false && status === 0) {

			                $(this).on('touchend touchcancel', function(){
			                    touchReg = false;
			                });

			                if (ts > te+175){
			                	

			                    touchReg = true;
			                    status = 1;
			                    counterSlide = 1;


			                    setTimeout(function(){
			                        status=0;
			                        scrollstart=0;
			                    },850);

			                } else if (ts < te-175) {

			                  touchReg = true;
			                  status = 1;

			                  setTimeout(function(){
			                    status=0;
			                    scrollstart=0;
			                  },850);

			               }
			            
			            } else if (status > 0){
			                //do nothing
			                console.log('waiting');
			            }
			        });
	            } else{
	            	$('body').bind('mousewheel', function(e) {
						console.log('working');
						var currentY = e.deltaY;

	                    if (status === 0) {
	                        
	                        if(currentY < 0) {
	                            console.log(e.deltaY);
	                            status=1;
	                            
	                            if($('#journey').hasClass('is-active') && $('#journey .learn-more').css('display') == 'none'){
	                            	journeyScrollDown();
	                            };

	                            setTimeout(function(){
	                                status=0;
	                            },2000);

	                        } else if(e.deltaY > 0){

	                            status = 1;

	                            if($('#journey').hasClass('is-active') && $('#journey .learn-more').css('display') !== 'none'){
	                            	journeyScrollUp();
	                            };
	                           
	                            setTimeout(function(){

	                                status=0;
	                            },2000);

	                        }
	                        return false;

	                    } else if (status > 0){
	                        //do nothing
	                        // console.log('waiting');
	                    }
	            	});
	            }
			}, 500);
		}

		bindPage();

	function journeyScrollDown() {
		tm.staggerFromTo(wrds1, 1, {alpha:1, y:0}, {alpha:0, y:-30}, 0.01);
		tm.staggerFromTo(chars1, 1, {alpha:1, y:0}, {alpha:0, y:-30, delay:.15}, 0.01);
		tm.staggerFromTo(chars12, 1, {alpha:1, y:0}, {alpha:0, y:-30, delay:.3}, 0.01);
		tl.fromTo('#journey .divider:eq(0)', 1, {alpha:1, y:0}, {alpha:0, y:-30, delay:.45});
		tl.fromTo('#journey .divider:eq(1)', 1, {alpha:1, y:0}, {alpha:0, y:-30, delay:.6});
		tl.fromTo('.more-btn', 1, {alpha:1, y:0}, {alpha:0, y:-30, delay:.75});
		tl.set(['.more-btn', wrds1, chars1, chars12, '#journey .divider:eq(0)', '#journey .divider:eq(1)', '#journey div.content p.content:eq(0)'], {height:0, margin:0, delay:1.75});
		tl.set('#journey div.content', {height:'60vh', overflowY:'auto', delay:1.75});
		tl.fromTo('.learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut, delay:2});
	}

	function journeyScrollUp() {
		tl.fromTo('.learn-more', 1, {alpha:1, y:0}, {alpha:0, y:30, ease:Power1.easeOut});
		tl.set(['.learn-more', '.more-btn', '#journey .divider:eq(0)', '#journey .divider:eq(1)', '#journey div.content p.content:eq(0)'], {clearProps:'display,margin,height', delay:1});
		tl.set([wrds1, chars1, chars12], {clearProps:'margin,height', delay:1});
		tl.set('#journey div.content:eq(0)', {height:journeyContentHeight, delay:1});
		tl.fromTo('.more-btn', 1, {alpha:0, y:-30}, {alpha:1, y:0, ease:Power1.easeOut, delay:1.15});
		tl.fromTo('#journey .divider:eq(1)', 1, {alpha:0, y:-30}, {alpha:1, y:0, ease:Power1.easeOut, delay:1.3});
		tl.fromTo('#journey p.content:eq(0)', 1, {alpha:0, y:-30}, {alpha:1, y:0, delay:1.45});
		tl.fromTo('#journey .divider:eq(0)', 1, {alpha:0, y:-30}, {alpha:1, y:0, delay:1.6});
		tm.staggerFromTo(chars12, 1, {alpha:0, y:-30}, {alpha:1, y:0, delay:.45, delay:1.6}, 0.01);
		tm.staggerFromTo(chars1, 1, {alpha:0, y:-30}, {alpha:1, y:0, delay:1.75}, 0.01);
		tm.staggerFromTo(wrds1, 1, {alpha:0, y:-30}, {alpha:1, y:0, delay:1.9}, 0.01);
		
		// tl.set(['.more-btn', wrds1, chars1, chars12, '#journey .divider:eq(0)', '#journey .divider:eq(1), #journey div.content p.content:eq(0)'], {height:0, margin:0, delay:1.75});
		// tl.set('#journey div.content', {height:'60vh', overflowY:'auto', delay:1.75});
	}



	// Hide Pages from Aria
		
		function addAriaHiddenPages(){

		}

	// Tab Index Functions
	
		// $("body").on("keydown", function(event) {
		// 	$('*').removeClass('no-focus');
	 //    });


});




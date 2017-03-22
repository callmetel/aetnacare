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
 
    	
    	// if(isMobile.detectMobile()){
    	// 	$('#videos').after('<div id="mobile-videos"><img src="app/images/loop-0.jpg" id="loop-0" class="loop-video video"></div>');
    	// 	$('#videos').remove();
    		tm.to('#loop-0', 1, {alpha:1, ease:Power2.easeInOut});
    	// } else{
    		$('#loop-0')[0].play();
    	// }

    	$('.video').attr('aria-hidden', 'true');
    // Mousemove
		
		var mousestatus = 0;
		// $(document).mouseup(function() {
		//     $(document).off("mousemove", mouse);
		// });
		
		function mouseTimeout(){
			mousestatus = 1;
			setTimeout(function(){
				mousestatus = 0;
				tl.to('#prev-next', .5, {alpha:0.08, ease:Power1.easeOut});
				tl.fromTo('header', .15, {alpha:1}, {alpha:.1, ease: Power1.easeInOut});
			},1750);
		} 

	// Popup Buttons

		$('#disclaimer-link').on('click', function(){
			$('#disclaimer-popup').addClass('popup-is-active');
		});

		$('#contact-link').on('click', function(){
			$('#contact-popup').addClass('popup-is-active');
		});

		$('.close-btn').on('click', function(){
			$('.popup').removeClass('popup-is-active');
		});

		var i = document.getElementById("aetnacare-full-video");

		$('#vision-link').on('click', function(){
			tm.set('#vision-popup', {display:'block', alpha:0, className:'is-active-video'});
			tm.to('#vision-popup', .5, {alpha:1});
			$('#aetnacare-full-video')[0].currentTime=0;
			$('#aetnacare-full-video')[0].play();
			$('#close-fs-video').addClass('is-active');
			
			if(!$('#introduction').hasClass('is-active')){
				$('#play-pause').trigger('click');	
			};
			
			if (i.requestFullscreen) {
				i.requestFullscreen();
			} else if (i.webkitRequestFullscreen) {
				i.webkitRequestFullscreen();
			} else if (i.mozRequestFullScreen) {
				i.mozRequestFullScreen();
			} else if (i.msRequestFullscreen) {
				i.msRequestFullscreen();
			;}
		});

		$('#close-fs-video').on('click', function(){
			$(this).removeClass('is-active');
			$('#aetnacare-full-video')[0].pause();
			
			if(!$('#introduction').hasClass('is-active')){
				$('#play-pause').trigger('click');	
			};

			tm.to('#vision-popup', .5, {alpha:0});
			tm.set('#vision-popup', {display:'none', alpha:0, delay:.5, className:'-=is-active-video'});

			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		});
	
	// Remove Focus On Click For Tab Index 
		
		$('*').mousedown(function(event) {
			$('*').blur();
			$('*').addClass('no-focus');
		});

		$('*').bind('keydown', function(event) {
			$('*').removeClass('no-focus');
		});
		
	
	// Video Durations 
		
		var v1tlDur = parseInt($('#video-1')[0].duration-3),
			v2tlDur = parseInt($('#video-2')[0].duration-3),
			v3tlDur = parseInt($('#video-3')[0].duration-3);

	// Set Animations

		tm.set('#prev-next', {alpha:0});
		tm.set('nav', {alpha:0});
		tm.set(['.start-stroke', '.next-arrow', '.prev-arrow'], {drawSVG:"0% 0%"});
		tm.to('body', 1, {alpha:1, ease:Power2.easeInOut});
		tm.to('#loop-0', 1, {alpha:1, ease:Power2.easeInOut});

		var	nexttxt1 = new SplitText("#next .name:eq(0)", {type:"chars"}), 
		    next1 = nexttxt1.chars,
		    nexttxt2 = new SplitText("#next .name:eq(1)", {type:"chars"}), 
		    next2 = nexttxt2.chars,
		    nexttxt3 = new SplitText("#next .name:eq(2)", {type:"chars"}), 
		    next3 = nexttxt3.chars,
		    nexttxt4 = new SplitText("#next .name:eq(3)", {type:"chars"}), 
		    next4 = nexttxt4.chars,
		    nexttxt5 = new SplitText("#next .name:eq(4)", {type:"chars"}), 
		    next5 = nexttxt5.chars,
		    nexttxt6 = new SplitText("#next .name:eq(5)", {type:"chars"}), 
		    next6 = nexttxt6.chars;

	// Section Timelines
		
		var introTL = new TimelineLite,
		    descrText = new SplitText("#introduction .heading", {type:"words"}), 
		    chars2 = descrText.words;

			introTL.set('#introduction', {alpha:1}, "+=1.1");
			introTL.fromTo('#introduction .section-title', .65, {alpha:0, y:20}, {alpha:1, y:0}, "+=0");
			introTL.staggerFromTo(chars2, 0.5, {alpha:0, y:20}, {alpha:1, y:0}, 0.01, "+=0");
			introTL.fromTo('#journey-btn', 0.5, {alpha:0, y:20}, {alpha:1, y:0}, "+=0");
			introTL.fromTo('header', 0.5, {alpha:0, y:-20}, {alpha:1, x:'-50%', y:0}, "-=1.5");	
			introTL.fromTo('#volume-warning', 0.5, {alpha:0}, {alpha:1}, "-=1.5");	

		var journeyTL = new TimelineMax({paused:true}), 
			journeyTL2 = new TimelineMax({paused:true}), 
		    sectitleText1 = new SplitText("#journey .section-title", {type:"words"}), 
		    titleText1 = new SplitText("#journey .headline:eq(1)", {type:"words"}), 
		    wrds1 = sectitleText1.words,
		    chars1 = titleText1.words,
		    descrText1 = new SplitText("#journey .content p.content:eq(0)", {type:"words"}), 
		    chars12 = descrText1.words;

		function startJourney() {
			journeyTL.set('#prev', {alpha:0})
					 .set(["#next .name:not(:eq(0))",'section:not(#journey)'], {className:'-=is-active'})
					 .set(["#next .name:eq(0)", '#journey'], {className:'+=is-active'})
					 .set(next1, {alpha:0})
					 .fromTo('#loop-0', .5, {alpha:1}, {alpha:0, ease:Power4.easeOut})
					 .fromTo('.nav-item-label:eq(0)', .5, {alpha:.1}, {alpha:1, ease:Power4.easeOut},"-=.5")
					 .fromTo(['#introduction','#volume-warning'], 1, {alpha:1}, {alpha:0, ease:Power4.easeOut},"-=1.5")
					 .fromTo('.aetna-logo', 1, {alpha:1, y:'-50%'}, {alpha:0, y:'-70%', ease:Power4.easeOut},"-=.75")
					 .fromTo('.aetnacare-logo', 1, {alpha:0, y:'-30%'}, {alpha:1, y:'-50%', ease:Power4.easeOut},"-=.5")
					 .set('#introduction', {display:'none'})
					 .fromTo('#journey', .5, {alpha:0, display:'inherit',x:'-50%',y:'-30%'}, {alpha:1,x:'-50%',y:'-50%', ease:Power4.easeIn},"-=.5")
					 .staggerFromTo(wrds1, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.02, "+=10")
					 .to('#videos', 1, {alpha:.65}, "-=1")
					 .to(wrds1, 1.7, {y:-50, alpha:.4, ease: Power1.easeInOut}, "+=3")
					 .fromTo(chars1, 1.5, {alpha:0, y:50}, {alpha:1,y:0, ease: Power1.easeOut},"-=1.1");

			journeyTL2.fromTo('#videos', 4, {alpha:.65}, {alpha:.2, ease: Power1.easeInOut}, "+=18")
					  .staggerTo(wrds1, 1, {alpha:0, y:-80}, 0.01, "-=2")
					  .staggerTo(chars1, 1, {alpha:0, y:-40}, 0.01, "-=1.5")
					  .set('#play-pause-fs', {display:'none'}, 'end')
					  .set('#journey .content:eq(0)', {display:'inherit', height:'auto', autoAlpha:1})
					  .set([wrds1, chars1, '#journey h2'], {height:0, margin:0})
					  .set('#journey div.content', {height:'auto'})
					  .fromTo('#journey .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut})
					  .set('#prev-next', {display:'inherit'})
					  .to('#prev-next', .25, {alpha:0}, {alpha:1})
					  .to('#prev', .5, {alpha:0}, {alpha:.1})
					  .to('#next', .5, {alpha:0}, {alpha:1},'-=.5')
					  .fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut})
					  .staggerFromTo(next1, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01,"-=1");

			journeyTL.play();
			journeyTL2.play();
		}

		var identifyTL = new TimelineMax({paused:true}), 
			identifyTL2 = new TimelineMax({paused:true}), 
		    sectitleText2 = new SplitText("#identify .section-title", {type:"words"}), 
		    titleText2 = new SplitText("#identify .headline:eq(1)", {type:"words"}), 
		    wrds2 = sectitleText2.words,
		    chars2 = titleText2.words,
		    descrText2 = new SplitText("#identify .content p.content:eq(0)", {type:"words"}), 
		    chars22 = descrText2.words;

		function startIdentify() {
			identifyTL.set(["#next .name:not(:eq(1))",'section:not(#identify)'], {className:'-=is-active'},'+=1')
					  .set(["#next .name:eq(1)", '#identify'], {className:'+=is-active'})
					  .set(next2, {alpha:0})
					  .set('#prev', {alpha:0, className:'fixed-left is-in-use'})
					  .fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut})
					  .staggerFromTo(next2, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.01, "-=1")
					  .fromTo('#identify', .5, {alpha:0, display:'inherit',x:'-50%',y:'-30%'}, {alpha:1,x:'-50%',y:'-50%', ease:Power4.easeIn},"-=1")
					  .to(['#prev','#next'], 1, {alpha:0, ease:Power1.easeOut})
					  .staggerFromTo(wrds2, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.02, "+=10")
					  .to('#videos', 1, {alpha:.65}, "-=1")
					  .to(wrds2, 1.7, {y:-50, alpha:.4, ease: Power1.easeInOut}, "+=3")
					  .fromTo(chars2, 1.5, {alpha:0, y:50}, {alpha:1,y:0, ease: Power1.easeOut},"-=1.1");

			identifyTL2.to('#videos', 4, {alpha:.2, ease: Power1.easeInOut}, "+=26")
					   .staggerTo(wrds2, 1, {alpha:0, y:-80}, 0.01, "-=2")
					   .staggerTo(chars2, 1, {alpha:0, y:-40}, 0.01, "-=1.5")
					   .set('#play-pause-fs', {display:'none'}, 'end')
					   .set('#identify .content:eq(0)', {display:'inherit', height:'auto', autoAlpha:1}, "+=.25")
					   .set([wrds2, chars2, '#identify h2'], {height:0, margin:0})
					   .set('#identify div.content', {height:'auto'})
					   .fromTo('#identify .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut})
					   .set('#prev-next', {display:'inherit', alpha:1})
					   .fromTo(['#prev'], .5, {alpha:.1}, {alpha:.1})
					   .fromTo(['#next'], .5, {alpha:.1}, {alpha:1}, '-=.5')
					   .staggerFromTo(next2, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01, '-=.5');

			identifyTL.play();
			identifyTL2.play();
		}

		var connectTL = new TimelineMax({paused:true}), 
			connectTL2 = new TimelineMax({paused:true}), 
		    sectitleText3 = new SplitText("#connect .section-title", {type:"words"}), 
		    titleText3 = new SplitText("#connect .headline:eq(1)", {type:"words"}), 
		    wrds3 = sectitleText3.words,
		    chars3 = titleText3.words;

		function startConnect() {
			connectTL.set(["#next .name:not(:eq(2))",'section:not(#connect)'], {className:'-=is-active'},'+=1')
					 .set(["#next .name:eq(2)",'#connect'], {className:'+=is-active'})
					 .set(next3, {alpha:0})
					 .set('#prev', {alpha:0, className:'fixed-left is-in-use'})
					 .fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut})
					 .staggerFromTo(next3, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.01, "-=1")
					 .fromTo('#connect', .5, {alpha:0, display:'inherit',x:'-50%',y:'-30%'}, {alpha:1,x:'-50%',y:'-50%', ease:Power4.easeIn},"-=1")
					 .staggerFromTo(wrds3, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.02, "+=10")
					 .to('#videos', 1, {alpha:.65}, "-=1")
					 .to(wrds3, 1.7, {y:-50, alpha:.4, ease: Power1.easeInOut}, "+=3")
					 .fromTo(chars3, 1.5, {alpha:0, y:50}, {alpha:1,y:0, ease: Power1.easeOut},"-=1.1");

			connectTL2.to('#videos', 4, {alpha:.2, ease: Power1.easeInOut}, "+=21")
					  .staggerTo(wrds3, 1, {alpha:0, y:-80}, 0.01, "-=2")
					  .staggerTo(chars3, 1, {alpha:0, y:-40}, 0.01, "-=1.5")
					  .set('#play-pause-fs', {display:'none'}, 'end')
					  .set('#connect .content:eq(0)', {display:'inherit', height:'auto', autoAlpha:1}, "+=.25")
					  .set([wrds3, chars3, '#connect h2'], {height:0, margin:0})
					  .set('#connect div.content', {height:'auto'})
					  .fromTo('#connect .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut})
					  .set('#prev-next', {display:'inherit', alpha:1})
					  .fromTo(['#prev','#next'], .5, {alpha:.1}, {alpha:1})
					  .staggerFromTo(next3, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01);

			connectTL.play();
			connectTL2.play();
		}

		var guideTL = new TimelineMax({paused:true}), 
			guideTL2 = new TimelineMax({paused:true}), 
		    sectitleText4 = new SplitText("#guide .section-title", {type:"words"}), 
		    titleText4 = new SplitText("#guide .headline:eq(1)", {type:"words"}), 
		    wrds4 = sectitleText4.words,
		    chars4 = titleText4.words;

		function startGuide() {
			guideTL.set(["#next .name:not(:eq(3))",'section:not(#guide)'], {className:'-=is-active'},'+=1')
				   .set(["#next .name:eq(3)",'#guide'], {className:'+=is-active'})
				   .set(next4, {alpha:0})
				   .set('#prev', {alpha:0, className:'fixed-left is-in-use'})
				   .fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut})
				   .staggerFromTo(next4, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.01, "-=1")
				   .fromTo('#guide', .5, {alpha:0, display:'inherit',x:'-50%',y:'-30%'}, {alpha:1,x:'-50%',y:'-50%', ease:Power4.easeIn},"-=1")
				   .staggerFromTo(wrds4, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.02)
				   .to('#videos', 1, {alpha:.65}, "-=1")
				   .to(wrds4, 1.7, {y:-70, alpha:.4, ease: Power1.easeInOut}, "+=3")
				   .fromTo(chars4, 1.5, {alpha:0, y:50}, {alpha:1,y:0, ease: Power1.easeOut},"-=1.1");

			guideTL2.to('#videos', 4, {alpha:.2, ease: Power1.easeInOut}, "+=11")
					.staggerTo(wrds4, 1, {alpha:0, y:-80}, 0.01, "-=2")
					.staggerTo(chars4, 1, {alpha:0, y:-40}, 0.01, "-=1.5")
					.set('#play-pause-fs', {display:'none'}, 'end')
					.set('#guide .content:eq(0)', {display:'inherit', height:'auto', autoAlpha:1}, "+=.25")
					.set([wrds4, chars4, '#guide h2'], {height:0, margin:0})
					.set('#guide div.content', {height:'auto'})
					.fromTo('#guide .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut})
					.set('#prev-next', {display:'inherit', alpha:1})
					.fromTo(['#prev','#next'], .5, {alpha:.1}, {alpha:1})
					.staggerFromTo(next4, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01);

			guideTL.play();
			guideTL2.play();
		}

		var supportTL = new TimelineMax({paused:true}), 
			supportTL2 = new TimelineMax({paused:true}), 
		    sectitleText5 = new SplitText("#support .section-title", {type:"words"}), 
		    titleText5 = new SplitText("#support .headline:eq(1)", {type:"words"}), 
		    wrds5 = sectitleText5.words,
		    chars5 = titleText5.words;

		function startSupport() {
			supportTL.set(["#next .name:not(:eq(4))",'section:not(#support)'], {className:'-=is-active'},'+=1')
					 .set(["#next .name:eq(4)",'#support'], {className:'+=is-active'})
					 .set(next5, {alpha:0})
					 .set('#prev', {alpha:0, className:'fixed-left is-in-use'})
					 .set('#prev-next', {display:'inherit', alpha:1})
					 .fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut})
					 .staggerFromTo(next5, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.01, "-=1")
					 .fromTo('#support', .5, {alpha:0, display:'inherit',x:'-50%',y:'-30%'}, {alpha:1,x:'-50%',y:'-50%', ease:Power4.easeIn},"-=1")
					 .staggerFromTo(wrds5, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.02, "+=8")
				   	 .to('#videos', 1, {alpha:.65}, "-=1")
				   	 .to(wrds5, 1.7, {y:-50, alpha:.4, ease: Power1.easeInOut}, "+=3")
				   	 .fromTo(chars5, 1.5, {alpha:0, y:50}, {alpha:1,y:0, ease: Power1.easeOut},"-=1.1");

			supportTL2.to('#videos', 4, {alpha:.2, ease: Power1.easeInOut}, "+=24")
					  .staggerTo(wrds5, 1, {alpha:0, y:-80}, 0.01, "-=2")
					  .staggerTo(chars5, 1, {alpha:0, y:-40}, 0.01, "-=1.5")
					  .set('#play-pause-fs', {display:'none'}, 'end')
					  .set('#support .content:eq(0)', {display:'inherit', height:'auto', autoAlpha:1}, "+=.25")
					  .set([wrds5, chars5, '#support h2'], {height:0, margin:0})
					  .set('#support div.content', {height:'auto'})
					  .fromTo('#support .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut})
					  .set('#prev-next', {display:'inherit', alpha:1})
					  .fromTo(['#prev','#next'], .5, {alpha:.1}, {alpha:1})
					  .staggerFromTo(next5, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01);
			
			supportTL.play();
			supportTL2.play();
		}

		var sustainTL = new TimelineMax({paused:true}), 
			sustainTL2 = new TimelineMax({paused:true}), 
		    sectitleText6 = new SplitText("#sustain .section-title", {type:"words"}), 
		    titleText6 = new SplitText("#sustain .headline:eq(1)", {type:"words"}), 
		    wrds6 = sectitleText6.words,
		    chars6 = titleText6.words;

		function startSustain() {
			sustainTL.set(["#next .name:not(:eq(5))",'section:not(#sustain)'], {className:'-=is-active'},'+=1')
					 .set(["#next .name:eq(5)", '#sustain'], {className:'+=is-active'})
					 .set(next6, {alpha:0})
					 .set('#prev', {alpha:0, className:'fixed-left is-in-use'})
					 .set('#prev-next', {display:'inherit', alpha:1})
					 .fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut})
					 .staggerFromTo(next6, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.01, "-=1")
					 .fromTo('#sustain', .5, {alpha:0, display:'inherit',x:'-50%',y:'-30%'}, {alpha:1,x:'-50%',y:'-50%', ease:Power4.easeIn},"-=1")
					 .staggerFromTo(wrds6, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.02, "+=5")
				   	 .to('#videos', 1, {alpha:.65}, "-=1")
				   	 .to(wrds6, 1.7, {y:-50, alpha:.4, ease: Power1.easeInOut}, "+=3")
				   	 .fromTo(chars6, 1.5, {alpha:0, y:50}, {alpha:1,y:0, ease: Power1.easeOut},"-=1.1");

			sustainTL2.to('#videos', 4, {alpha:.2, ease: Power1.easeInOut}, "+=16")
					  .staggerTo(wrds6, 1, {alpha:0, y:-80}, 0.01, "-=2")
					  .staggerTo(chars6, 1, {alpha:0, y:-40}, 0.01, "-=1.5")
					  .set('#play-pause-fs', {display:'none'}, 'end')
					  .set('#sustain .content:eq(0)', {display:'inherit', height:'auto', autoAlpha:1}, "+=.25")
					  .set([wrds6, chars6, '#support h2'], {height:0, margin:0})
					  .set('#sustain div.content', {height:'auto'})
					  .fromTo('#sustain .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut})
					  .set('#prev-next', {display:'inherit', alpha:1})
					  .fromTo(['#prev','#next'], .5, {alpha:.1}, {alpha:1})
					  .staggerFromTo(next6, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01);
			
			sustainTL.play();
			sustainTL2.play();
		}

		var conclusionTL = new TimelineMax({paused:true}), 
			conclusionTL2 = new TimelineMax({paused:true});

		function startConclusion() {
			conclusionTL.set(['section:not(#conclusion)'], {className:'-=is-active'},'+=1')
						.set(['#conclusion'], {className:'+=is-active'})
						.set(['#prev-next'], {display:'none'})
						.set('#conclusion', {alpha:1}, '+=1');

			conclusionTL2.to('#videos', 4, {alpha:.2, ease: Power1.easeInOut}, "+=10")
						 .set('#conclusion .content:eq(0)', {display:'inherit', height:'auto', autoAlpha:1}, "+=.25")
						 .set('#play-pause-fs', {display:'none'}, 'end')
						 .set('#conclusion div.content', {height:'auto'})
						 .set('#conclusion .learn-more', {display:'inherit', alpha:1, y:0})
						 .staggerFromTo('.ct', .35, {alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeInOut}, 0.1);
			
			conclusionTL.play();
			conclusionTL2.play();
		}


	// Button Hover Animations
		
		$('.start-btn').mouseenter(function(e){
			var stroke = $(this).find('.start-stroke');
			var triangle = $(this).find('.triangle');
			tm.fromTo(stroke, 1, {drawSVG:"100% 100%", ease: Power1.easeInOut}, {drawSVG:"0% 100%", ease: Power1.easeIn});
			tm.fromTo(triangle, .5, {y:0, alpha:1, ease: Power1.easeInOut}, {y:-4, alpha:0, ease: Power1.easeIn});
			tm.fromTo(triangle, .5, {y:4, alpha:0, ease: Power1.easeInOut}, {y:0, alpha:1, ease: Power1.easeInOut, delay:.5});
		});

		$('#journey-btn, #restart-btn, #burger').mouseenter(function(e){
			var stroke = $(this).find('.rect-stroke');
			tm.fromTo(stroke, 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Sine.easeInOut});
		});

		function fireButtonAnimation() {
			var stroke = $('#journey-btn, #restart-btn').find('.rect-stroke');
			tm.fromTo(stroke, 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Sine.easeInOut});
			tm.fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut})
			
			setTimeout(function(){
				tm.fromTo(stroke, 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Sine.easeInOut});
				tm.fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut})
			}, 3000);
	    }

	    setInterval(fireButtonAnimation, 6000);


	// Start Video Scenes
		
		function startVideo1() {
			$('#video-1')[0].currentTime = 0;
			$('#video-1')[0].play();
			tm.set('#play-pause-fs', {display:'block'});
		}

		function startVideo2() {
			$('#video-2')[0].currentTime = 0;
			$('#video-2')[0].play();
			startIdentify();
			tm.set('#play-pause-fs', {display:'block'});
		}

		function startVideo3() {
			$('#video-3')[0].currentTime = 0;
			$('#video-3')[0].play();
			startConnect();
			tm.set('#play-pause-fs', {display:'block'});
		}

		function startVideo4() {
			$('#video-4')[0].currentTime = 0;
			$('#video-4')[0].play();
			startGuide();
			tm.set('#play-pause-fs', {display:'block'});
		}

		function startVideo5() {
			$('#video-5')[0].currentTime = 0;
			$('#video-5')[0].play();
			startSupport();
			tm.set('#play-pause-fs', {display:'block'});
		}

		function startVideo6() {
			$('#video-6')[0].currentTime = 0;
			$('#video-6')[0].play();
			startSustain();
			tm.set('#play-pause-fs', {display:'block'});
		}

		function startVideo7() {
			$('#video-7')[0].currentTime = 0;
			$('#video-7')[0].play();
			startConclusion();
			tm.set('#play-pause-fs', {display:'block'});
		}
		
	// Video Ended Function


		function checkTimeVideo1(){
			if(!isMobile.detectMobile()){
				if($('#video-1')[0].currentTime >= $('#video-1')[0].duration-.5){
					tl.fromTo('#video-1', 1, {alpha:1}, {alpha:0, ease:Power1.easeInOut, delay:.5});
					tl.fromTo('#loop-1', .15, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
					$('#video-1')[0].removeEventListener('timeupdate', checkTimeVideo1);
					$('#loop-1')[0].play();
					$('#loop-1').attr('loop',1);

					console.log('video1 is finished');
				}else{
					// console.log('video1 is still playing');
					// console.log('video time:' + $('#video-1')[0].currentTime);
				};	
			}
		}

		function checkTimeVideo2(){
			if(!isMobile.detectMobile()){
				if($('#video-2')[0].currentTime >= $('#video-2')[0].duration-.5){
					tl.fromTo('#video-2', 1, {alpha:1}, {alpha:0, ease:Power1.easeInOut, delay:.5});
					tl.fromTo('#loop-2', .15, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
					$('#video-2')[0].removeEventListener('timeupdate', checkTimeVideo2);
					$('#loop-2')[0].play();
					$('#loop-2').attr('loop',1);
					console.log('video2 is finished');
				}else{
					console.log('video2 is still playing');
				};
			}
		}

		function checkTimeVideo3(){
			if(!isMobile.detectMobile()){
				if($('#video-3')[0].currentTime >= $('#video-3')[0].duration-.5){
					tl.fromTo('#video-3', 1, {alpha:1}, {alpha:0, ease:Power1.easeInOut, delay:.5});
					tl.fromTo('#loop-3', .15, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
					$('#video-3')[0].removeEventListener('timeupdate', checkTimeVideo3);
					$('#loop-3')[0].play();
					$('#loop-3').attr('loop',1);
					console.log('video3 is finished');
				}else{
					console.log('video3 is still playing');
				}
			};
		}

		function checkTimeVideo4(){
			if(!isMobile.detectMobile()){
				if($('#video-4')[0].currentTime >= $('#video-4')[0].duration-.5){
					tl.fromTo('#video-4', 1, {alpha:1}, {alpha:0, ease:Power1.easeInOut, delay:.5});
					tl.fromTo('#loop-4', .15, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
					$('#video-4')[0].removeEventListener('timeupdate', checkTimeVideo4);
					$('#loop-4')[0].play();
					$('#loop-4').attr('loop',1);
					console.log('video4 is finished');
				}else{
					console.log('video4 is still playing');
				}
			};
		}

		function checkTimeVideo5(){
			if(!isMobile.detectMobile()){
				if($('#video-5')[0].currentTime >= $('#video-5')[0].duration-.5){
					tl.fromTo('#video-5', 1, {alpha:1}, {alpha:0, ease:Power1.easeInOut, delay:.5});
					tl.fromTo('#loop-5', .15, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
					$('#video-5')[0].removeEventListener('timeupdate', checkTimeVideo5);
					$('#loop-5')[0].play();
					$('#loop-5').attr('loop',1);
					console.log('video5 is finished');
				}else{
					console.log('video5 is still playing');
				}
			};
		}

		function checkTimeVideo6(){
			if(!isMobile.detectMobile()){
				if($('#video-6')[0].currentTime >= $('#video-6')[0].duration-.5){
					tl.fromTo('#video-6', 1, {alpha:1}, {alpha:0, ease:Power1.easeInOut, delay:.5});
					tl.fromTo('#loop-6', .15, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
					$('#video-6')[0].removeEventListener('timeupdate', checkTimeVideo6);
					$('#loop-6')[0].play();
					$('#loop-6').attr('loop',1);
					console.log('video6 is finished');
				}else{
					console.log('video6 is still playing');
				}
			};
		}

		function checkTimeVideo7(){
			if(!isMobile.detectMobile()){
				if($('#video-7')[0].currentTime >= $('#video-7')[0].duration-.5){
					tl.fromTo('#video-7', 1, {alpha:1}, {alpha:0, ease:Power1.easeInOut, delay:.5});
					tl.fromTo('#loop-7', .15, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
					$('#video-7')[0].removeEventListener('timeupdate', checkTimeVideo7);
					$('#loop-7')[0].play();
					$('#loop-7').attr('loop',1);
					console.log('video7 is finished');
				}else{
					console.log('video7 is still playing');
				}
			};
		}

		var	dataAttr, activeVideo, activeEvL, activeTL;

		function getActiveVideo(){
			dataAttr = $('section.is-active').attr('data-index');
			activeVideo = $('#video-' + dataAttr)[0];
			activeEvL = 'checkTimeVideo' + dataAttr;
		}

		function addEvL(){
			getActiveVideo();
			console.log('activeVideo: ' + '#video-' + dataAttr);
			activeVideo.addEventListener('timeupdate', activeEvL);
			activeVideo.play();
		}

		function removeEvL(){
			getActiveVideo();
			console.log('activeVideo: ' + '#video-' + dataAttr);
			activeVideo.removeEventListener('timeupdate', activeEvL);
			$('#video-1')[0].pause();
			$('#video-2')[0].pause();
			$('#video-3')[0].pause();
			$('#video-4')[0].pause();
			$('#video-5')[0].pause();
			$('#video-6')[0].pause();
			$('#video-7')[0].pause();
		}

		function pauseActiveTL(){
			console.log('called');
			if(ffTL1.isActive() || journeyTL.isActive()) {
				activeTL = 1;
				ffTL1.pause();
				journeyTL.pause();
				journeyTL2.pause();
				console.log('used');
			}
			else if(ffTL2.isActive() || identifyTL.isActive()) {
				activeTL = 2;
				ffTL2.pause();
				identifyTL.pause();
				identifyTL2.pause();
			}
			else if(ffTL3.isActive() || connectTL.isActive()) {
				activeTL = 3;
				ffTL3.pause();
				connectTL.pause();
				connectTL2.pause();
			}
			else if(ffTL4.isActive() || guideTL.isActive()) {
				activeTL = 4;
				ffTL4.pause();
				guideTL.pause();
				guideTL2.pause();
			}
			else if(ffTL5.isActive() || supportTL.isActive()) {
				activeTL = 5;
				ffTL5.pause();
				supportTL.pause();
				supportTL2.pause();
			}
			else if(ffTL6.isActive() || sustainTL.isActive()) {
				activeTL = 6;
				ffTL6.pause();
				sustainTL.pause();
				sustainTL2.pause();
			}
			else if(ffTL7.isActive() || conclusionTL.isActive()) {
				activeTL = 7;
				ffTL7.pause();
				conclusionTL.pause();
				conclusionTL2.pause();
			}
		}

		function playActiveTL(){
			if(activeTL == 1) {
				activeTL = 0;
				ffTL1.play();
				journeyTL.play();
				journeyTL2.play();
			}
			else if(activeTL == 2) {
				activeTL = 0;
				ffTL2.play();
				identifyTL.play();
				identifyTL2.play();
			}
			else if(activeTL == 3) {
				activeTL = 0;
				ffTL3.play();
				connectTL.play();
				connectTL2.play();
			}
			else if(activeTL == 4) {
				activeTL = 0;
				ffTL4.play();
				guideTL.play();
				guideTL2.play();
			}
			else if(activeTL == 5) {
				activeTL = 0;
				ffTL5.play();
				supportTL.play();
				supportTL2.play();
			}
			else if(activeTL == 6) {
				activeTL = 0;
				ffTL6.play();
				sustainTL.play();
				sustainTL2.play();
			}
			else if(activeTL == 7) {
				activeTL = 0;
				ffTL7.play();
				conclusionTL.play();
				conclusionTL2.play();
			}
		}

	// Play Pause Button
		
		$('#play-pause, #play-pause-fs').on('click', function(){
			if(!$('#play-pause').hasClass('play-active')){
				$('#play-pause').addClass('play-active');
				removeEvL();
				activeVideo.pause();
				pauseActiveTL();
				$('#sound-bar').trigger('click');
			} else{
				$('#play-pause').removeClass('play-active');
				addEvL();
				getActiveVideo();
				activeVideo.play();
				playActiveTL();
				$('#sound-bar').trigger('click');
			}
		});

	// To Timelines 
		
		var ffTL1 = new TimelineMax({paused:true}); 

		function FFtoJourney(){
			$('#loop-0').removeAttr('loop');
			$('#video-1')[0].addEventListener('timeupdate', checkTimeVideo1);
			var v1Dur = parseInt($('#video-1')[0].duration) + 4;

			ffTL1.add('end',.5)
				 .fromTo('#video-1', .25, {alpha:0}, {alpha:1, ease:Power1.easeInOut, onComplete:startVideo1()}, 'end')
				 .set('.loop-video', {alpha:0}, 'end')
				 .set('.scene-video:not(#video-1)', {alpha:0}, 'end')
				 .to('.nav-item:eq(0) .bar > span', v1Dur, {x:0, onComplete:startJourney()}, 'end')
				 .set('.nav-item:eq(0) .bar > span', {alpha:1}, 'end')
				 .set('.nav-item:not(:eq(0)) .bar > span', {alpha:.2, clearProps:'transform'}, 'end')
				 .fromTo('.nav-item-label:not(:eq(0))', .5, {alpha:1}, {alpha:.1, ease: Power1.easeInOut}, 'end')
				 .fromTo('.nav-item-label:eq(0)', .5, {alpha:.1}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .fromTo('#videos', .5, {alpha:.2}, {alpha:.85, ease: Power1.easeInOut}, 'end')
				 .to(['#prev-next #next','header'], .5, {alpha:.1, ease: Power1.easeInOut}, 'end')
				 .set(['#prev-next #prev'], {alpha:0}, 'end')
				 .set(['#prev-next'], {display:'none'}, 'end')
				 .fromTo('nav', 0.5, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .set('#introduction', {className:'-=is-active'}, 'end')
				 .set(['#journey','#video-1'], {className:'+=is-active'}, 'end')
				 .set('.scene-video:not(#video-1)', {className:'-=is-active'}, 'end');

			ffTL1.play();
		}

		var ffTL2 = new TimelineMax({paused:true});

		function FFtoIdentify(){
			$('#loop-1').removeAttr('loop');
			$('#loop-1')[0].currentTime = $('#loop-1')[0].duration;
			$('#video-2')[0].addEventListener('timeupdate', checkTimeVideo2);
			var v2Dur = parseInt($('#video-2')[0].duration) + 4;

			ffTL2.add('end',.01)
				 .fromTo('#video-2', 1, {alpha:0}, {alpha:1, ease:Power1.easeInOut}, 'end')
				 .to('#loop-1', .5, {alpha:0, ease:Power1.easeInOut}, 'end')
				 .set('.scene-video:not(#video-2)', {alpha:0}, 'end')
				 .set(['#video-2'], {className:'+=is-active', display:'inherit'}, 'end')
				 .fromTo('#journey .learn-more', .75, {alpha:1, y:0}, {alpha:0, y:-30, ease:Power1.easeOut}, 'end')
				 .fromTo('nav', .25, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .to(['#prev-next', '#prev', '#next'], .75, {alpha:0, ease:Power1.easeOut}, 'end')
				 .to(['header'], .5, {alpha:.1, ease:Power1.easeInOut}, 'end')
				 .to('#videos', 2, {alpha:.65, ease: Power1.easeInOut}, '+=.5')
				 .set(['#prev-next'], {display:'none'}, '-=1.75')
				 .to('.loop-video:not(#loop-1)', .5, {alpha:0, onComplete:startVideo2()}, '-=1')
				 .set('.scene-video:not(#video-2)', {className:'-=is-active'}, 'end')
				 .set('.nav-item:eq(1) .bar > span', {alpha:1}, 'end')
				 .to('.nav-item:eq(1) .bar > span', v2Dur, {x:0}, 'end')
				 .set('.nav-item:not(:eq(1)) .bar > span', {alpha:.1, clearProps:'transform'}, 'end')
				 .fromTo('.nav-item-label:not(:eq(1))', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut}, 'end')
				 .fromTo('.nav-item-label:eq(1)', .5, {alpha:.1}, {alpha:1, ease: Power1.easeInOut}, 'end');

			setTimeout(function(){
				ffTL2.play();
			}, 200);
		}

		var ffTL3 = new TimelineMax({paused:true});

		function FFtoConnect(){
			$('#loop-2').removeAttr('loop');
			$('#loop-2')[0].currentTime = $('#loop-2')[0].duration;
			$('#video-3')[0].addEventListener('timeupdate', checkTimeVideo3);
			var v3Dur = parseInt($('#video-3')[0].duration) + 4;

			ffTL3.add('end',.01)
				 .fromTo('#video-3', 1, {alpha:0}, {alpha:1, ease:Power1.easeInOut}, 'end')
				 .to('#loop-2', .5, {alpha:0, ease:Power1.easeInOut}, 'end')
				 .set('.scene-video:not(#video-3)', {alpha:0}, 'end')
				 .set(['#video-3'], {className:'+=is-active', display:'inherit'}, 'end')
				 .fromTo('#identify .learn-more', .75, {alpha:1, y:0}, {alpha:0, y:-30, ease:Power1.easeOut}, 'end')
				 .fromTo('nav', .25, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .to(['#prev-next', '#prev', '#next'], .75, {alpha:0, ease:Power1.easeOut}, 'end')
				 .to(['header'], .5, {alpha:.1, ease:Power1.easeInOut}, 'end')
				 .to('#videos', 2, {alpha:.65, ease: Power1.easeInOut}, '+=.5')
				 .set(['#prev-next'], {display:'none'}, '-=1.75')
				 .to('.loop-video:not(#loop-2)', .5, {alpha:0, onComplete:startVideo3()}, '-=1')
				 .set('.scene-video:not(#video-3)', {className:'-=is-active'}, 'end')
				 .set('.nav-item:eq(2) .bar > span', {alpha:1}, 'end')
				 .to('.nav-item:eq(2) .bar > span', v3Dur, {x:0}, 'end')
				 .set('.nav-item:not(:eq(2)) .bar > span', {alpha:.1, clearProps:'transform'}, 'end')
				 .fromTo('.nav-item-label:not(:eq(2))', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut}, 'end')
				 .fromTo('.nav-item-label:eq(2)', .5, {alpha:.1}, {alpha:1, ease: Power1.easeInOut}, 'end');

			setTimeout(function(){
				ffTL3.play();
			}, 200);
				
		}

		var ffTL4 = new TimelineMax({paused:true});

		function FFtoGuide(){
			$('#loop-3').removeAttr('loop');
			$('#loop-3')[0].currentTime = $('#loop-3')[0].duration;
			$('#video-4')[0].addEventListener('timeupdate', checkTimeVideo4);
			var v4Dur = parseInt($('#video-4')[0].duration) + 4;

			ffTL4.add('end',.01)
				 .fromTo('#video-4', 1, {alpha:0}, {alpha:1, ease:Power1.easeInOut}, 'end')
				 .to('#loop-3', .5, {alpha:0, ease:Power1.easeInOut}, 'end')
				 .set('.scene-video:not(#video-4)', {alpha:0}, 'end')
				 .set(['#video-4'], {className:'+=is-active', display:'inherit'}, 'end')
				 .fromTo('#connect .learn-more', .75, {alpha:1, y:0}, {alpha:0, y:-30, ease:Power1.easeOut}, 'end')
				 .fromTo('nav', .25, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .to(['#prev-next', '#prev', '#next'], .75, {alpha:0, ease:Power1.easeOut}, 'end')
				 .to(['header'], .5, {alpha:.1, ease:Power1.easeInOut}, 'end')
				 .to('#videos', 2, {alpha:.65, ease: Power1.easeInOut}, '+=.5')
				 .set(['#prev-next'], {display:'none'}, '-=1.75')
				 .to('.loop-video:not(#loop-3)', .5, {alpha:0, onComplete:startVideo4()}, '-=1')
				 .set('.scene-video:not(#video-4)', {className:'-=is-active'}, 'end')
				 .set('.nav-item:eq(3) .bar > span', {alpha:1}, 'end')
				 .to('.nav-item:eq(3) .bar > span', v4Dur, {x:0}, 'end')
				 .set('.nav-item:not(:eq(3)) .bar > span', {alpha:.1, clearProps:'transform'}, 'end')
				 .fromTo('.nav-item-label:not(:eq(3))', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut}, 'end')
				 .fromTo('.nav-item-label:eq(3)', .5, {alpha:.1}, {alpha:1, ease: Power1.easeInOut}, 'end');

			setTimeout(function(){
				ffTL4.play();
			}, 200);
		}

		var ffTL5 = new TimelineMax({paused:true});

		function FFtoSupport(){
			$('#loop-4').removeAttr('loop');
			$('#loop-4')[0].currentTime = $('#loop-4')[0].duration;
			$('#video-5')[0].addEventListener('timeupdate', checkTimeVideo5);
			var v5Dur = parseInt($('#video-5')[0].duration) + 4;

			ffTL5.add('end',.01)
				 .fromTo('#video-5', 1, {alpha:0}, {alpha:1, ease:Power1.easeInOut}, 'end')
				 .to('#loop-4', .5, {alpha:0, ease:Power1.easeInOut}, 'end')
				 .set('.scene-video:not(#video-5)', {alpha:0}, 'end')
				 .set(['#video-5'], {className:'+=is-active', display:'inherit'}, 'end')
				 .fromTo('#guide .learn-more', .75, {alpha:1, y:0}, {alpha:0, y:-30, ease:Power1.easeOut}, 'end')
				 .fromTo('nav', .25, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .to(['#prev-next', '#prev', '#next'], .75, {alpha:0, ease:Power1.easeOut}, 'end')
				 .to(['header'], .5, {alpha:.1, ease:Power1.easeInOut}, 'end')
				 .to('#videos', 2, {alpha:.65, ease: Power1.easeInOut}, '+=.5')
				 .set(['#prev-next'], {display:'none'}, '-=1.75')
				 .to('.loop-video:not(#loop-4)', .5, {alpha:0, onComplete:startVideo5()}, '-=1')
				 .set('.scene-video:not(#video-5)', {className:'-=is-active'}, 'end')
				 .set('.nav-item:eq(4) .bar > span', {alpha:1}, 'end')
				 .to('.nav-item:eq(4) .bar > span', v5Dur, {x:0}, 'end')
				 .set('.nav-item:not(:eq(4)) .bar > span', {alpha:.1, clearProps:'transform'}, 'end')
				 .fromTo('.nav-item-label:not(:eq(4))', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut}, 'end')
				 .fromTo('.nav-item-label:eq(4)', .5, {alpha:.1}, {alpha:1, ease: Power1.easeInOut}, 'end');

			setTimeout(function(){
				ffTL5.play();
			}, 200);
		}

		var ffTL6 = new TimelineMax({paused:true});

		function FFtoSustain(){
			$('#loop-5').removeAttr('loop');
			$('#loop-5')[0].currentTime = $('#loop-5')[0].duration;
			$('#video-6')[0].addEventListener('timeupdate', checkTimeVideo6);
			var v6Dur = parseInt($('#video-6')[0].duration) + 4;

			ffTL6.add('end',.01)
				 .fromTo('#video-6', 1, {alpha:0}, {alpha:1, ease:Power1.easeInOut}, 'end')
				 .to('#loop-5', .5, {alpha:0, ease:Power1.easeInOut}, 'end')
				 .set('.scene-video:not(#video-6)', {alpha:0}, 'end')
				 .set(['#video-6'], {className:'+=is-active', display:'inherit'}, 'end')
				 .fromTo('#support .learn-more', .75, {alpha:1, y:0}, {alpha:0, y:-30, ease:Power1.easeOut}, 'end')
				 .fromTo('nav', .25, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .to(['#prev-next', '#prev', '#next'], .75, {alpha:0, ease:Power1.easeOut}, 'end')
				 .to(['header'], .5, {alpha:.1, ease:Power1.easeInOut}, 'end')
				 .to('#videos', 2, {alpha:.65, ease: Power1.easeInOut}, '+=.5')
				 .set(['#prev-next'], {display:'none'}, '-=1.75')
				 .to('.loop-video:not(#loop-5)', .5, {alpha:0, onComplete:startVideo6()}, '-=1')
				 .set('.scene-video:not(#video-6)', {className:'-=is-active'}, 'end')
				 .set('.nav-item:eq(5) .bar > span', {alpha:1}, 'end')
				 .to('.nav-item:eq(5) .bar > span', v6Dur, {x:0}, 'end')
				 .set('.nav-item:not(:eq(5)) .bar > span', {alpha:.1, clearProps:'transform'}, 'end')
				 .fromTo('.nav-item-label:not(:eq(5))', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut}, 'end')
				 .fromTo('.nav-item-label:eq(5)', .5, {alpha:.1}, {alpha:1, ease: Power1.easeInOut}, 'end');

			setTimeout(function(){
				ffTL6.play();
			}, 200);
		}

		var ffTL7 = new TimelineMax({paused:true});

		function FFtoConclusion(){
			$('#loop-6').removeAttr('loop');
			$('#loop-6')[0].currentTime = $('#loop-6')[0].duration;
			$('#video-7')[0].addEventListener('timeupdate', checkTimeVideo7);
			var v7Dur = parseInt($('#video-7')[0].duration) + 4;

			ffTL7.add('end',.01)
				 .fromTo('#video-7', 1, {alpha:0}, {alpha:1, ease:Power1.easeInOut}, 'end')
				 .to('#loop-6', .5, {alpha:0, ease:Power1.easeInOut}, 'end')
				 .set('.scene-video:not(#video-7)', {alpha:0}, 'end')
				 .set(['#video-7'], {className:'+=is-active', display:'inherit'}, 'end')
				 .fromTo('#sustain .learn-more', .75, {alpha:1, y:0}, {alpha:0, y:-30, ease:Power1.easeOut}, 'end')
				 .fromTo('nav', .25, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .to(['#prev-next', '#prev', '#next'], .75, {alpha:0, ease:Power1.easeOut}, 'end')
				 .to(['header'], .5, {alpha:.1, ease:Power1.easeInOut}, 'end')
				 .to('#videos', 2, {alpha:.65, ease: Power1.easeInOut}, '+=.5')
				 .set(['#prev-next'], {display:'none'}, '-=1.75')
				 .to('.loop-video:not(#loop-6)', .5, {alpha:0, onComplete:startVideo7()}, '-=1')
				 .set('.scene-video:not(#video-7)', {className:'-=is-active'}, 'end')
				 .set('.nav-item:eq(6) .bar > span', {alpha:1}, 'end')
				 .to('.nav-item:eq(6) .bar > span', v7Dur, {x:0}, 'end')
				 .set('.nav-item:not(:eq(6)) .bar > span', {alpha:.1, clearProps:'transform'}, 'end')
				 .fromTo('.nav-item-label:not(:eq(6))', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut}, 'end')
				 .fromTo('.nav-item-label:eq(6)', .5, {alpha:.1}, {alpha:1, ease: Power1.easeInOut}, 'end');

			setTimeout(function(){
				ffTL7.play();
			}, 200);
		}

	// Skip Functions

		function skipJourney(){
			var dur2 = parseInt(journeyTL2.duration() - 4);
			if(journeyTL.isActive()){
				$('#video-1')[0].currentTime = $('#video-1')[0].duration-4;
				journeyTL.seek(journeyTL.duration(), false);
				journeyTL2.seek(dur2, false);
				tl.to('.dummy', 4, {alpha:1,onComplete:ffJourney});

			} else{
				ffJourney();
			}
		}

		function ffJourney(){
			FFtoIdentify();
			$('#video-1')[0].removeEventListener('timeupdate', checkTimeVideo1);
		}

		function skipIdentify(){
			var dur2 = parseInt(identifyTL2.duration() - 4);
			if(identifyTL.isActive()){
				var timeline = new TimelineMax({onComplete:ffIdentify});
				$('#video-2')[0].currentTime = $('#video-2')[0].duration-4;
				identifyTL.seek(identifyTL.duration(), false);
				identifyTL2.seek(dur2, false);
				timeline.fromTo('.dummy', 4, {alpha:0}, {alpha:1});

			} else{
				ffIdentify();
			}
		}

		function ffIdentify(){
			FFtoConnect();
			$('#video-2')[0].removeEventListener('timeupdate', checkTimeVideo2);
		}

		function skipConnect(){
			var dur2 = parseInt(connectTL2.duration() - 4);
			if(connectTL.isActive()){
				var timeline = new TimelineMax({onComplete:ffConnect});
				$('#video-3')[0].currentTime = $('#video-3')[0].duration-4;
				connectTL.seek(connectTL.duration(), false);
				connectTL2.seek(dur2, false);

			} else{
				ffConnect();
			}
		}

		function ffConnect(){
			FFtoGuide();
			$('#video-3')[0].removeEventListener('timeupdate', checkTimeVideo3);
		}

		function skipGuide(){
			var dur2 = parseInt(guideTL2.duration() - 4);
			if(guideTL.isActive()){
				var timeline = new TimelineMax({onComplete:ffGuide});
				$('#video-4')[0].currentTime = $('#video-4')[0].duration-4;
				guideTL.seek(guideTL.duration(), false);
				guideTL2.seek(dur2, false);

			} else{
				ffGuide();
			}
		}

		function ffGuide(){
			FFtoSupport();
			$('#video-4')[0].removeEventListener('timeupdate', checkTimeVideo4);
		}

		function skipSupport(){
			var dur2 = parseInt(supportTL2.duration() - 4);
			if(supportTL.isActive()){
				var timeline = new TimelineMax({onComplete:ffSupport});
				$('#video-5')[0].currentTime = $('#video-5')[0].duration-4;
				supportTL.seek(supportTL.duration(), false);
				supportTL2.seek(dur2, false);

			} else{
				ffSupport();
			}
		}

		function ffSupport(){
			FFtoSustain();
			$('#video-5')[0].removeEventListener('timeupdate', checkTimeVideo5);
		}

		function skipSustain(){
			var dur2 = parseInt(sustainTL2.duration() - 4);
			if(sustainTL.isActive()){
				var timeline = new TimelineMax({onComplete:ffSustain});
				$('#video-6')[0].currentTime = $('#video-6')[0].duration-4;
				sustainTL.seek(sustainTL.duration(), false);
				sustainTL2.seek(dur2, false);

			} else{
				ffSustain();
			}
		}

		function ffSustain(){
			FFtoConclusion();
			$('#video-6')[0].removeEventListener('timeupdate', checkTimeVideo6);
		}

	// Skip Timeout
		
		var skipTimer=0;

		function skipTimeout(){
			skipTimer = 1;
			setTimeout(function(){
				skipTimer = 0;
			},4000);
		} 

		function hideChanges(){
			tl.to('body', .5, {alpha:0, ease:Power1.easeOut});
			tl.to(['#videos','section'], .5, {alpha:0, ease:Power1.easeOut});
			tl.set(['section','#prev-next', '#prev', '#next'], {alpha:0});
			tl.set('#videos', {alpha:.6, ease:Power1.easeOut, delay:.6});
			tl.set('section.is-active', {alpha:1, delay:.6});
			tl.to('body', 1, {alpha:1, ease:Power1.easeOut, delay:1.5});
			tl.to(['#prev-next', '#prev', '#next'], .75, {alpha:0, ease:Power1.easeOut}, 'end')
			tl.to(['header'], .5, {alpha:.1, ease:Power1.easeInOut}, 'end')
			tl.set(['#prev-next'], {display:'none', delay:.85});
		}




	// Start Button Click Functions
		
		$('#journey-btn').on('click', function(e){
			e.preventDefault();
			FFtoJourney();
			mouseTimeout();
		});

		$('.next-btn').on('click', function(e){
			mouseTimeout();
			if(skipTimer === 0){
				if($('#journey').hasClass('is-active')){
					skipJourney();
				}
				else if($('#identify').hasClass('is-active')){
					skipIdentify();		
				}
				else if($('#connect').hasClass('is-active')){
					skipConnect();
				}
				else if($('#guide').hasClass('is-active')){
					skipGuide();
				}
				else if($('#support').hasClass('is-active')){
					skipSupport();		
				}
				else if($('#sustain').hasClass('is-active')){
					skipSustain();		
				};
				skipTimeout();
			};
			
		});

		$('#prev').on('click', function(){
			hideChanges();
			if($('#journey').hasClass('is-active')){
				ffTL1.seek(0, false).pause(0).clear();
				journeyTL.seek(0, false).pause(0).clear(); journeyTL2.seek(0, false).pause(0).clear();
				setTimeout(function(){
					FFtoJourney();	
				}, 200);	
			}
			else if($('#identify').hasClass('is-active')){
				ffTL2.seek(0, false).pause(0).clear();
				identifyTL.seek(0, false).pause(0).clear(); identifyTL2.seek(0, false).pause(0).clear();
				setTimeout(function(){
					FFtoIdentify();
				}, 200);
			}
			else if($('#connect').hasClass('is-active')){
				ffTL3.seek(0, false).pause(0).clear();
				connectTL.seek(0, false).pause(0).clear(); connectTL2.seek(0, false).pause(0).clear();
				setTimeout(function(){
					FFtoConnect();
				}, 200);
			}
			else if($('#guide').hasClass('is-active')){
				ffTL4.seek(0, false).pause(0).clear();
				guideTL.seek(0, false).pause(0).clear(); guideTL2.seek(0, false).pause(0).clear();
				setTimeout(function(){	
					FFtoGuide();
				}, 200);
			}
			else if($('#support').hasClass('is-active')){
				ffTL5.seek(0, false).pause(0).clear();
				supportTL.seek(0, false).pause(0).clear(); supportTL2.seek(0, false).pause(0).clear();
				setTimeout(function(){		
					FFtoSupport();
				}, 200);
			}
			else if($('#sustain').hasClass('is-active')){
				ffTL6.seek(0, false).pause(0).clear();
				sustainTL.seek(0, false).pause(0).clear(); sustainTL2.seek(0, false).pause(0).clear();
				setTimeout(function(){	
					FFtoSustain();
				}, 200);
			};
		});


	// Timeline Navigation Functions

		$('.nav-item:eq(0)').on('click', function(){
			console.log('clicked 1');
			if(skipTimer === 0){
				skipTimeout();
				console.log('clicked 2');

				if($('#journey').hasClass('is-active') ){
					// do nothing
				} else{
					hideChanges();
					journeyTL.seek(0, false).pause(0).clear(); journeyTL2.seek(0, false).pause(0).clear();
					identifyTL.seek(0, false).pause(0).clear(); identifyTL2.seek(0, false).pause(0).clear();
					connectTL.seek(0, false).pause(0).clear(); connectTL2.seek(0, false).pause(0).clear();
					guideTL.seek(0, false).pause(0).clear(); guideTL2.seek(0, false).pause(0).clear();
					supportTL.seek(0, false).pause(0).clear(); supportTL2.seek(0, false).pause(0).clear();
					sustainTL.seek(0, false).pause(0).clear(); sustainTL2.seek(0, false).pause(0).clear();
					conclusionTL.seek(0, false).pause(0).clear(); conclusionTL2.seek(0, false).pause(0).clear();

					ffTL1.seek(0, false).pause(0).clear();
					ffTL2.seek(0, false).pause(0).clear();
					ffTL3.seek(0, false).pause(0).clear();
					ffTL4.seek(0, false).pause(0).clear();
					ffTL5.seek(0, false).pause(0).clear();
					ffTL6.seek(0, false).pause(0).clear();
					ffTL7.seek(0, false).pause(0).clear();

					removeEvL();

					tl.to('.loop-video:not(#loop-0)', .5, {alpha:0});
					tl.set(['section:not(#journey)', 'section:not(#introduction)'], {display:'none', clearProps:'transform'});
					
					FFtoJourney();
				}
			};
		});

		$('.nav-item:eq(1)').on('click', function(){
			if(skipTimer === 0){
				skipTimeout();
				if($('#journey').hasClass('is-active')){
					skipJourney();
				}
				else if($('#identify').hasClass('is-active')){
					// do nothing
				} else{
					hideChanges();
					setTimeout(function(){
						identifyTL.pause(0).clear(); identifyTL2.pause(0).clear();
						connectTL.pause(0).clear(); connectTL2.pause(0).clear();
						guideTL.pause(0).clear(); guideTL2.pause(0).clear();
						supportTL.pause(0).clear(); supportTL2.pause(0).clear();
						sustainTL.pause(0).clear(); sustainTL2.pause(0).clear();

						ffTL2.pause(0).clear();
						ffTL3.pause(0).clear();
						ffTL4.pause(0).clear();
						ffTL5.pause(0).clear();
						ffTL6.pause(0).clear();

						removeEvL();

						tl.to('.loop-video:not(#loop-0)', .5, {alpha:0});
					
						tl.set(['section:not(#identify)', 'section:not(#introduction)'], {display:'none', clearProps:'transform'});
						FFtoIdentify();
					},400);
				};	
			};	
		});

		$('.nav-item:eq(2)').on('click', function(){
			if(skipTimer === 0){
				skipTimeout();
				if($('#journey').hasClass('is-active') ){
					hideChanges();
					removeEvL();
					setTimeout(function(){
						ffTL1.pause(0).seek(ffTL2.duration(), false);
						ffTL2.pause(0).seek(ffTL2.duration(), false);
						journeyTL.pause(0).seek(journeyTL.duration(), false); 
						journeyTL2.pause(0).seek(journeyTL2.duration(), false);
						identifyTL.pause(0).seek(identifyTL.duration(), false); 
						identifyTL2.pause(0).seek(identifyTL2.duration(), false);

						tl.set(['section:not(#connect)', 'section:not(#introduction)'], {display:'none', clearProps:'transform'});
						FFtoConnect();
					},400);
					
				} 
				else if($('#identify').hasClass('is-active')){
					skipIdentify();		
				} 
				else if($('#connect').hasClass('is-active')){
					// do nothing
				} 
				else{
					hideChanges();
					tl.to('.loop-video:not(#loop-0)', .5, {alpha:0});
					setTimeout(function(){
						identifyTL.pause(0).clear(); identifyTL2.pause(0).clear();
						connectTL.pause(0).clear(); connectTL2.pause(0).clear();
						guideTL.pause(0).clear(); guideTL2.pause(0).clear();
						supportTL.pause(0).clear(); supportTL2.pause(0).clear();
						sustainTL.pause(0).clear(); sustainTL2.pause(0).clear();

						ffTL3.pause(0).clear();
						ffTL4.pause(0).clear();
						ffTL5.pause(0).clear();
						ffTL6.pause(0).clear();

						removeEvL();
						tl.set(['section:not(#connect)', 'section:not(#introduction)'], {display:'none', clearProps:'transform'});	
						FFtoConnect();
					},400);
				};
			};
		});

		$('.nav-item:eq(3)').on('click', function(){
			if(skipTimer === 0){
				skipTimeout();
				if($('#journey').hasClass('is-active') || $('#identify').hasClass('is-active')){
					hideChanges();
					tl.to('.loop-video:not(#loop-0)', .5, {alpha:0});
					setTimeout(function(){
						removeEvL();
						ffTL1.pause(0).seek(ffTL2.duration(), false);
						ffTL2.pause(0).seek(ffTL2.duration(), false);
						ffTL3.pause(0).seek(ffTL3.duration(), false);
						journeyTL.pause(0).seek(journeyTL.duration(), false); 
						journeyTL2.pause(0).seek(journeyTL2.duration(), false);
						identifyTL.pause(0).seek(identifyTL.duration(), false); 
						identifyTL2.pause(0).seek(identifyTL2.duration(), false);
						connectTL.pause(0).seek(connectTL.duration(), false); 
						connectTL2.pause(0).seek(connectTL2.duration(), false);

						tl.set(['section:not(#journey)', 'section:not(#introduction)'], {display:'none', clearProps:'transform'});
						FFtoGuide();
					},400);
				}
				else if($('#connect').hasClass('is-active')){
					skipConnect();
				}
				else if($('#guide').hasClass('is-active')){
					
				}
				else{
					hideChanges();
					tl.to('.loop-video:not(#loop-0)', .5, {alpha:0});
					setTimeout(function(){
						identifyTL.pause(0).clear(); identifyTL2.pause(0).clear();
						connectTL.pause(0).clear(); connectTL2.pause(0).clear();
						guideTL.pause(0).clear(); guideTL2.pause(0).clear();
						supportTL.pause(0).clear(); supportTL2.pause(0).clear();
						sustainTL.pause(0).clear(); sustainTL2.pause(0).clear();

						ffTL3.pause(0).clear();
						ffTL4.pause(0).clear();
						ffTL5.pause(0).clear();
						ffTL6.pause(0).clear();

						removeEvL();
						tl.set(['section:not(#guide)', 'section:not(#introduction)'], {display:'none', clearProps:'transform'});
						FFtoGuide();
					},400);
				};
			};
		});

		$('.nav-item:eq(4)').on('click', function(){
			if(skipTimer === 0){
				skipTimeout();
				if($('#sustain').hasClass('is-active')){
					tl.to('.loop-video:not(#loop-0)', .5, {alpha:0});
					identifyTL.pause(0).clear(); identifyTL2.pause(0).clear();
					connectTL.pause(0).clear(); connectTL2.pause(0).clear();
					guideTL.pause(0).clear(); guideTL2.pause(0).clear();
					supportTL.pause(0).clear(); supportTL2.pause(0).clear();
					sustainTL.pause(0).clear(); sustainTL2.pause(0).clear();

					ffTL3.pause(0).clear();
					ffTL4.pause(0).clear();
					ffTL5.pause(0).clear();
					ffTL6.pause(0).clear();

					removeEvL();
					tl.set(['section:not(#support)', 'section:not(#introduction)'], {display:'none', clearProps:'transform'});
					FFtoSupport();
				}
				else if($('#guide').hasClass('is-active')){
					skipGuide();
				}
				else if($('#support').hasClass('is-active')){
					// do nothing
				}
				else{
					hideChanges();
					setTimeout(function(){
						tl.to('.loop-video:not(#loop-0)', .5, {alpha:0});
						removeEvL();
						connectTL.pause(0).seek(connectTL.duration(), false); 
						connectTL2.pause(0).seek(connectTL2.duration(), false);
						ffTL1.pause(0).seek(ffTL1.duration(), false);
						ffTL2.pause(0).seek(ffTL2.duration(), false);
						ffTL3.pause(0).seek(ffTL3.duration(), false);
						ffTL4.pause(0).seek(ffTL4.duration(), false);
						guideTL.pause(0).seek(guideTL.duration(), false); 
						guideTL2.pause(0).seek(guideTL2.duration(), false);
						identifyTL.pause(0).seek(identifyTL.duration(), false); 
						identifyTL2.pause(0).seek(identifyTL2.duration(), false);
						journeyTL.pause(0).seek(journeyTL.duration(), false); 
						journeyTL2.pause(0).seek(journeyTL2.duration(), false);

						FFtoSupport();
					},400);
				};
			};
		});

		$('.nav-item:eq(5)').on('click', function(){
			if(skipTimer === 0){
				skipTimeout();
				if($('#support').hasClass('is-active')){
					identifyTL.pause(0).clear(); identifyTL2.pause(0).clear();
					connectTL.pause(0).clear(); connectTL2.pause(0).clear();
					guideTL.pause(0).clear(); guideTL2.pause(0).clear();
					supportTL.pause(0).clear(); supportTL2.pause(0).clear();
					sustainTL.pause(0).clear(); sustainTL2.pause(0).clear();

					ffTL3.pause(0).clear();
					ffTL4.pause(0).clear();
					ffTL5.pause(0).clear();
					ffTL6.pause(0).clear();

					removeEvL();

					tl.to('.loop-video:not(#loop-0)', .5, {alpha:0});
					
					FFtoSustain();
				}
				else if($('#sustain').hasClass('is-active')){
					// do nothing
				} else{
					hideChanges();
					tl.to('.loop-video:not(#loop-0)', .5, {alpha:0});

					setTimeout(function(){
						identifyTL.pause(0).clear(); identifyTL2.pause(0).clear();
						connectTL.pause(0).clear(); connectTL2.pause(0).clear();
						guideTL.pause(0).clear(); guideTL2.pause(0).clear();
						supportTL.pause(0).clear(); supportTL2.pause(0).clear();
						sustainTL.pause(0).clear(); sustainTL2.pause(0).clear();

						ffTL2.pause(0).clear();
						ffTL3.pause(0).clear();
						ffTL4.pause(0).clear();
						ffTL5.pause(0).clear();
						ffTL6.pause(0).clear();

						tl.set(['section:not(#sustain)', 'section:not(#introduction)'], {display:'none', clearProps:'transform'});				
						removeEvL();
						FFtoSustain();
					},400);
				};	
			};
		});

		$('.nav-item:eq(6)').on('click', function(){
			if(skipTimer === 0){
				skipTimeout();
				if($('#sustain').hasClass('is-active')){
					identifyTL.pause(0).clear(); identifyTL2.pause(0).clear();
					connectTL.pause(0).clear(); connectTL2.pause(0).clear();
					guideTL.pause(0).clear(); guideTL2.pause(0).clear();
					supportTL.pause(0).clear(); supportTL2.pause(0).clear();
					sustainTL.pause(0).clear(); sustainTL2.pause(0).clear();

					ffTL3.pause(0).clear();
					ffTL4.pause(0).clear();
					ffTL5.pause(0).clear();
					ffTL6.pause(0).clear();

					removeEvL();

					tl.to('.loop-video:not(#loop-0)', .5, {alpha:0});
					
					FFtoConclusion();
				}
				else if($('#conclusion').hasClass('is-active')){
					// do nothing
				} else{
					hideChanges();
					tl.to('.loop-video:not(#loop-0)', .5, {alpha:0});
					
					setTimeout(function(){
						removeEvL();
						connectTL.pause(0).seek(connectTL.duration(), false); 
						connectTL2.pause(0).seek(connectTL2.duration(), false);
						ffTL1.pause(0).seek(ffTL1.duration(), false);
						ffTL2.pause(0).seek(ffTL2.duration(), false);
						ffTL3.pause(0).seek(ffTL3.duration(), false);
						ffTL4.pause(0).seek(ffTL4.duration(), false);
						ffTL5.pause(0).seek(ffTL5.duration(), false);
						ffTL6.pause(0).seek(ffTL6.duration(), false);
						ffTL7.pause(0).seek(ffTL6.duration(), false);
						guideTL.pause(0).seek(guideTL.duration(), false); 
						guideTL2.pause(0).seek(guideTL2.duration(), false);
						identifyTL.pause(0).seek(identifyTL.duration(), false); 
						identifyTL2.pause(0).seek(identifyTL2.duration(), false);
						journeyTL.pause(0).seek(journeyTL.duration(), false); 
						journeyTL2.pause(0).seek(journeyTL2.duration(), false);
						supportTL.pause(0).seek(supportTL.duration(), false); 
						supportTL2.pause(0).seek(supportTL2.duration(), false);
						sustainTL.pause(0).seek(sustainTL.duration(), false); 
						sustainTL2.pause(0).seek(sustainTL2.duration(), false);
						conclusionTL.pause(0).seek(0, false); 
						conclusionTL2.pause(0).seek(0, false);

						ffSustain();
					},400);
				};	
			};
		});

	// Skip Button Functions
		
		$('#skip-backward').on('click', function(){
			if($('#journey').hasClass('is-active')){
				$('#prev').trigger('click');
			}
			else if($('#identify').hasClass('is-active')){
				$('.nav-item:eq(0)').trigger('click');
			}
			else if($('#connect').hasClass('is-active')){
				$('.nav-item:eq(1)').trigger('click');
			}
			else if($('#guide').hasClass('is-active')){
				$('.nav-item:eq(2)').trigger('click');
			}
			else if($('#support').hasClass('is-active')){
				$('.nav-item:eq(3)').trigger('click');
			}
			else if($('#sustain').hasClass('is-active')){
				$('.nav-item:eq(4)').trigger('click');
			}
			else if($('#conclusion').hasClass('is-active')){
				$('.nav-item:eq(5)').trigger('click');
			};
		});

		$('#skip-forward').on('click', function(){
			if($('#journey').hasClass('is-active')){
				$('.nav-item:eq(1)').trigger('click');
			}
			else if($('#identify').hasClass('is-active')){
				$('.nav-item:eq(2)').trigger('click');
			}
			else if($('#connect').hasClass('is-active')){
				$('.nav-item:eq(3)').trigger('click');
			}
			else if($('#guide').hasClass('is-active')){
				$('.nav-item:eq(4)').trigger('click');
			}
			else if($('#support').hasClass('is-active')){
				$('.nav-item:eq(5)').trigger('click');
			}
			else if($('#sustain').hasClass('is-active')){
				$('.nav-item:eq(6)').trigger('click');
			}
			else if($('#conclusion').hasClass('is-active')){
				console.log("you've reached the end");
			};
		});

	$('.aetnacare-logo, #restart-btn').on('click', function(e){
		location.reload();
	});

	// Learn More Button

		$('#journey .more-btn').on('click', function(e){
			e.preventDefault();
			journeyScrollDown();
			console.log('clicked');
			mouseTimeout();
		});

	// Nav Timer Animation

	// Show Links
		
		// $('#header-links').mouseover(function() {
		//   	if(!$('#introduction').hasClass('is-active') || !$('#conclusion').hasClass('is-active') || $('#videos').css('opacity') > .2){
		// 	  	mouseTimeout();	
		// 	};
		// }).mouseout(function() {
		//   	if(!$('#introduction').hasClass('is-active') || !$('#conclusion').hasClass('is-active') || $('#videos').css('opacity') > .2){
		//   		mouseTimeout();
		//   	};
		// });

		$('#burger').on('click', function(){
			if($('#header-links').hasClass('show-links')){
				$('#header-links').removeClass('show-links');
				$('.burger').removeClass('is-inactive');
				$('.close').addClass('is-inactive');
			} else{
				$('#header-links').addClass('show-links');
				$('.burger').addClass('is-inactive');
				$('.close').removeClass('is-inactive');
			}
		});

		$('#sound-bar').on('click',function(){
			if($('#sound-bar .bar:eq(0)').hasClass('soundbar')){
				$('#sound-bar .bar').removeClass('soundbar soundbar2 soundbar3');
				$('audio, video').attr('muted', 0);
				tm.set('#sound-bar .bar', {height:1});
			} else {
				$('#sound-bar .bar:eq(0)').addClass('soundbar');
				$('#sound-bar .bar:eq(1), #sound-bar .bar:eq(4)').addClass('soundbar2');
				$('#sound-bar .bar:eq(2), #sound-bar .bar:eq(3)').addClass('soundbar3');
				$('audio, video').attr('muted', 1);
				tm.set('#sound-bar .bar', {clearProps:'height'});
			}
		});


	// Mousemove
		
		var movementTimer;
		$('body').mousemove(function(event) {
			// console.log('event page: ' + event.pageX);
			// event.stopPropagation();
			var distance = parseInt($('body').innerWidth() / 3);
			
			if(!$('#introduction').hasClass('is-active') && $('#videos').css('opacity') > .2 && mousestatus == 0){
				// console.log('moving');
				clearTimeout(movementTimer);
				tl.fromTo('header', .15, {alpha:.1}, {alpha:1, ease: Power1.easeInOut});

		    	movementTimer = setTimeout(function()
		    	{
		    		tl.fromTo('header', .15, {alpha:1}, {alpha:.1, ease: Power1.easeInOut});
		    	}, 2000);

		    	if (event.pageX < distance) {
			        // console.log('left');
			        tl.to('.prev-arrow', .5, {drawSVG:"0% 100%", ease: Power1.easeInOut});
			        tl.to('#prev-next', .5, {alpha:1, ease:Power1.easeOut});
			        tl.to('#prev', .5, {alpha:.1, ease:Power1.easeOut});
			        tl.to('#next', .5, {alpha:.08, ease:Power1.easeOut});
			        mouseTimeout();
			    }
			    else if (event.pageX > distance*2) {
			        // console.log('right');
			        tl.to('.next-arrow', .5, {drawSVG:"0% 100%", ease: Power1.easeInOut});
			        tl.to('#prev-next', .5, {alpha:1, ease:Power1.easeOut});
			        tl.to('#prev', .5, {alpha:.08, ease:Power1.easeOut});
			        tl.to('#next', .5, {alpha:1, ease:Power1.easeOut});
			        mouseTimeout();
			    }
			} else if($('#videos').css('opacity') <= .2){
				tl.to('header', .15, {alpha:.1, ease: Power1.easeInOut});
				tl.to('#prev-next', .5, {alpha:1, ease:Power1.easeOut});
				tl.to(['#next'], .5, {alpha:1, ease:Power1.easeOut});
				tl.to(['#prev'], .5, {alpha:.1, ease:Power1.easeOut});
			} else if($('#conclusion').hasClass('is-active')){
				tl.to('header', .15, {alpha:1, ease: Power1.easeInOut});
				tl.to('#prev-next', .5, {alpha:1, ease:Power1.easeOut});
				tl.to(['#next'], .5, {alpha:1, ease:Power1.easeOut});
				tl.to(['#prev'], .5, {alpha:.1, ease:Power1.easeOut});
			};
			
		});

	// Hide Pages from Aria
		
		function addAriaHiddenPages(){

		}

	// Tab Index Functions
	
		$("body").bind("keydown", function(event) {
			$('*').removeClass('no-focus');

			if(!$('#introduction').hasClass('is-active') && !$('#vision-popup').hasClass('is-active-video')){
				if(event.keyCode === 32){
		    		event.preventDefault();
		    		$('#play-pause').trigger('click');
		    	}
	    	};
	    });


});




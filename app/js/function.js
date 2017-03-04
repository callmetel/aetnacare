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
		// 
	
	// Video Durations 
		
		var v1tlDur = parseInt($('#video-1')[0].duration-3),
			v2tlDur = parseInt($('#video-2')[0].duration-3),
			v3tlDur = parseInt($('#video-3')[0].duration-3);

	// Set Animations

		tm.set('#prev-next', {alpha:0});
		tm.set('nav', {alpha:0});
		tm.set('.start-stroke', {drawSVG:"100% 100%"});
		tm.to('body', 1, {alpha:1, ease:Power2.easeInOut});
		tm.to('#loop-0', 1, {alpha:1, ease:Power2.easeInOut});

		var	nexttxt = new SplitText("#next .next", {type:"chars"}), 
		    next1 = nexttxt.chars,
		    nextname1 = new SplitText("#next .name:eq(0)", {type:"chars"}), 
		    next2 = nextname1.chars;

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
			journeyTL2 = new TimelineMax({paused:true, delay:17}), 
		    sectitleText1 = new SplitText("#journey .section-title", {type:"words"}), 
		    titleText1 = new SplitText("#journey .headline:eq(1)", {type:"words"}), 
		    wrds1 = sectitleText1.words,
		    chars1 = titleText1.words,
		    descrText1 = new SplitText("#journey .content p.content:eq(0)", {type:"words"}), 
		    chars12 = descrText1.words;

		function startJourney() {
			journeyTL.set([next1,next2], {alpha:0});
			journeyTL.set('#prev', {alpha:0});
			journeyTL.to('#prev-next', 1, {display:'inherit', alpha:1, ease:Power4.easeOut});

			journeyTL.fromTo('#loop-0', .5, {alpha:1}, {alpha:0, ease:Power4.easeOut}, "-=1");
			journeyTL.fromTo('.nav-item-label:eq(0)', .5, {alpha:.1}, {alpha:1, ease:Power4.easeOut},"-=.5");
			journeyTL.fromTo('#introduction', 1, {alpha:1}, {alpha:0, ease:Power4.easeOut},"-=1.5");
			journeyTL.fromTo('.aetna-logo', 1, {alpha:1, y:'-50%'}, {alpha:0, y:'-70%', ease:Power4.easeOut},"-=.75");
			journeyTL.fromTo('.aetnacare-logo', 1, {alpha:0, y:'-30%'}, {alpha:1, y:'-50%', ease:Power4.easeOut},"-=.5");
			journeyTL.set('#introduction', {display:'none'});
			journeyTL.fromTo('#journey', .5, {alpha:0, display:'inherit',x:'-50%',y:'-30%'}, {alpha:1,x:'-50%',y:'-50%', ease:Power4.easeIn},"-=.5");
			journeyTL.staggerFromTo(wrds1, 1, {alpha:0, y:20}, {alpha:1, y:-20}, 0.01, "+=2.25");
			journeyTL.staggerFromTo(chars1, 1, {alpha:0, y:20}, {alpha:1, y:-40}, 0.05, "+=2.25");
			journeyTL.staggerTo(wrds1, 1, {y:-50, alpha:.4, ease: Power1.easeInOut}, 0.01, "-=1.5");

			journeyTL2.fromTo('#videos', 4, {alpha:.7}, {alpha:.27, ease: Power1.easeInOut});
			journeyTL2.staggerTo(wrds1, 1, {alpha:0, y:-80}, 0.01, "-=2");
			journeyTL2.staggerTo(chars1, 1, {alpha:0, y:-80}, 0.05, "-=.85")
			journeyTL2.set('#journey .content:eq(0)', {display:'inherit', height:'auto', autoAlpha:1}, "+=.25");
			journeyTL2.set([wrds1, chars1, '#journey h2'], {height:0, margin:0});
			journeyTL2.set('#journey div.content', {height:'auto'});
			journeyTL2.fromTo('#journey .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut});
			journeyTL2.staggerFromTo(next1, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01);
			journeyTL2.staggerFromTo(next2, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01);
			journeyTL2.staggerTo(next1, .5, {alpha:0, y:-10, height:0}, 0.01, "+=1");
			journeyTL2.to('#next-text .next', .5, {height:0}, "-=.5");

			journeyTL.play();
			journeyTL2.play();
		}

		var identifyTL = new TimelineMax({paused:true}), 
			identifyTL2 = new TimelineMax({paused:true, delay:28}), 
		    sectitleText2 = new SplitText("#identify .section-title", {type:"words"}), 
		    titleText2 = new SplitText("#identify .headline:eq(1)", {type:"words"}), 
		    wrds2 = sectitleText2.words,
		    chars2 = titleText2.words,
		    descrText2 = new SplitText("#identify .content p.content:eq(0)", {type:"words"}), 
		    chars22 = descrText2.words;

		function startIdentify() {
			tm.set([next1], {clearProps:"height,tranform"});
			// tm.set([next3], {alpha:0});
			// tm.set('#prev', {alpha:0});
			tm.to('#prev-next', 1, {display:'inherit', alpha:1, ease:Power4.easeOut});

			identifyTL.fromTo('#identify', .5, {alpha:0, display:'inherit',x:'-50%',y:'-30%'}, {alpha:1,x:'-50%',y:'-50%', ease:Power4.easeIn},"-=.5");
			identifyTL.staggerFromTo(wrds2, 1, {alpha:0, y:20}, {alpha:1, y:-20}, 0.01, "+=2.25");
			identifyTL.staggerFromTo(chars2, 1, {alpha:0, y:20}, {alpha:1, y:-40}, 0.05, "+=5");
			identifyTL.staggerTo(wrds2, 1, {y:-50, alpha:.4, ease: Power1.easeInOut}, 0.01, "-=1.5");

			identifyTL2.staggerTo(wrds2, 1, {alpha:0, y:-80}, 0.01);
			identifyTL2.staggerTo(chars2, 1, {alpha:0, y:-80}, 0.05, "-=.85")
			identifyTL2.set('#identify .content:eq(0)', {display:'inherit', height:'auto', autoAlpha:1}, "+=.25");
			identifyTL2.set([wrds2, chars2, '#identify h2'], {height:0, margin:0});
			identifyTL2.set('#identify div.content', {height:'auto'});
			identifyTL2.fromTo('#identify .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut});
			identifyTL2.staggerFromTo(next1, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01);
			// identifyTL.staggerFromTo(next2, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01);
			// identifyTL.staggerTo(next1, .5, {alpha:0, y:-10, height:0}, 0.01, "+=1");
			// identifyTL.to('#next-text .next', .5, {height:0}, "-=.5");
			tl.fromTo('#videos', 4, {alpha:.7}, {alpha:.27, ease: Power1.easeInOut, delay: 26});

			identifyTL.play();
			identifyTL2.play();
		}

		var connectTL = new TimelineMax({paused:true}), 
			connectTL2 = new TimelineMax({paused:true, delay:20}), 
		    sectitleText3 = new SplitText("#connect .section-title", {type:"words"}), 
		    titleText3 = new SplitText("#connect .headline:eq(1)", {type:"words"}), 
		    wrds3 = sectitleText3.words,
		    chars3 = titleText3.words;

		function startConnect() {
			tm.set([next1], {clearProps:"height,tranform"});
			// tm.set([next3], {alpha:0});
			// tm.set('#prev', {alpha:0});
			tm.to('#prev-next', 1, {display:'inherit', alpha:1, ease:Power4.easeOut});

			connectTL.fromTo('#connect', .5, {alpha:0, display:'inherit',x:'-50%',y:'-30%'}, {alpha:1,x:'-50%',y:'-50%', ease:Power4.easeIn},"-=.5");
			connectTL.staggerFromTo(wrds3, 1, {alpha:0, y:20}, {alpha:1, y:-20}, 0.01, "+=2.25");
			connectTL.staggerFromTo(chars3, 1, {alpha:0, y:20}, {alpha:1, y:-40}, 0.05, "+=5");
			connectTL.staggerTo(wrds3, 1, {y:-50, alpha:.4, ease: Power1.easeInOut}, 0.01, "-=1.5");

			connectTL2.staggerTo(wrds3, 1, {alpha:0, y:-80}, 0.01);
			connectTL2.staggerTo(chars3, 1, {alpha:0, y:-80}, 0.05, "-=.85")
			connectTL2.set('#connect .content:eq(0)', {display:'inherit', height:'auto', autoAlpha:1}, "+=.25");
			connectTL2.set([wrds3, chars3, '#connect h2'], {height:0, margin:0});
			connectTL2.set('#connect div.content', {height:'auto'});
			connectTL2.fromTo('#connect .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut});
			connectTL2.staggerFromTo(next1, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01);
			// identifyTL.staggerFromTo(next2, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01);
			// identifyTL.staggerTo(next1, .5, {alpha:0, y:-10, height:0}, 0.01, "+=1");
			// identifyTL.to('#next-text .next', .5, {height:0}, "-=.5");
			tl.fromTo('#videos', 4, {alpha:.7}, {alpha:.27, ease: Power1.easeInOut, delay: 18});

			connectTL.play();
			connectTL2.play();
		}

		var guideTL = new TimelineMax({paused:true}), 
			guideTL2 = new TimelineMax({paused:true, delay:13}), 
		    sectitleText4 = new SplitText("#guide .section-title", {type:"words"}), 
		    titleText4 = new SplitText("#guide .headline:eq(1)", {type:"words"}), 
		    wrds4 = sectitleText4.words,
		    chars4 = titleText4.words;

		function startGuide() {
			tm.set([next1], {clearProps:"height,tranform"});
			// tm.set([next3], {alpha:0});
			// tm.set('#prev', {alpha:0});
			tm.to('#prev-next', 1, {display:'inherit', alpha:1, ease:Power4.easeOut});

			guideTL.fromTo('#guide', .5, {alpha:0, display:'inherit',x:'-50%',y:'-30%'}, {alpha:1,x:'-50%',y:'-50%', ease:Power4.easeIn},"-=.5");
			guideTL.staggerFromTo(wrds4, 1, {alpha:0, y:20}, {alpha:1, y:-20}, 0.01, "+=2.25");
			guideTL.staggerFromTo(chars4, 1, {alpha:0, y:20}, {alpha:1, y:-40}, 0.05, "+=5");
			guideTL.staggerTo(wrds4, 1, {y:-50, alpha:.4, ease: Power1.easeInOut}, 0.01, "-=1.5");

			guideTL2.staggerTo(wrds4, 1, {alpha:0, y:-80}, 0.01);
			guideTL2.staggerTo(chars4, 1, {alpha:0, y:-80}, 0.05, "-=.85")
			guideTL2.set('#guide .content:eq(0)', {display:'inherit', height:'auto', autoAlpha:1}, "+=.25");
			guideTL2.set([wrds4, chars4, '#guide h2'], {height:0, margin:0});
			guideTL2.set('#guide div.content', {height:'auto'});
			guideTL2.fromTo('#guide .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut});
			guideTL2.staggerFromTo(next1, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01);
			// identifyTL.staggerFromTo(next2, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01);
			// identifyTL.staggerTo(next1, .5, {alpha:0, y:-10, height:0}, 0.01, "+=1");
			// identifyTL.to('#next-text .next', .5, {height:0}, "-=.5");
			tl.fromTo('#videos', 4, {alpha:.7}, {alpha:.27, ease: Power1.easeInOut, delay: 11});

			guideTL.play();
			guideTL2.play();
		}

		var supportTL = new TimelineMax({paused:true}), 
			supportTL2 = new TimelineMax({paused:true, delay:26}), 
		    sectitleText5 = new SplitText("#support .section-title", {type:"words"}), 
		    titleText5 = new SplitText("#support .headline:eq(1)", {type:"words"}), 
		    wrds5 = sectitleText5.words,
		    chars5 = titleText5.words;

		function startSupport() {
			tm.set([next1], {clearProps:"height,tranform"});
			// tm.set([next3], {alpha:0});
			// tm.set('#prev', {alpha:0});
			tm.to('#prev-next', 1, {display:'inherit', alpha:1, ease:Power4.easeOut});

			supportTL.fromTo('#support', .5, {alpha:0, display:'inherit',x:'-50%',y:'-30%'}, {alpha:1,x:'-50%',y:'-50%', ease:Power4.easeIn},"-=.5");
			supportTL.staggerFromTo(wrds5, 1, {alpha:0, y:20}, {alpha:1, y:-20}, 0.01, "+=2.25");
			supportTL.staggerFromTo(chars5, 1, {alpha:0, y:20}, {alpha:1, y:-40}, 0.05, "+=5");
			supportTL.staggerTo(wrds5, 1, {y:-50, alpha:.4, ease: Power1.easeInOut}, 0.01, "-=1.5");

			supportTL2.staggerTo(wrds5, 1, {alpha:0, y:-80}, 0.01);
			supportTL2.staggerTo(chars5, 1, {alpha:0, y:-80}, 0.05, "-=.85")
			supportTL2.set('#support .content:eq(0)', {display:'inherit', height:'auto', autoAlpha:1}, "+=.25");
			supportTL2.set([wrds5, chars5, '#support h2'], {height:0, margin:0});
			supportTL2.set('#support div.content', {height:'auto'});
			supportTL2.fromTo('#support .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut});
			supportTL2.staggerFromTo(next1, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01);
			// identifyTL.staggerFromTo(next2, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01);
			// identifyTL.staggerTo(next1, .5, {alpha:0, y:-10, height:0}, 0.01, "+=1");
			// identifyTL.to('#next-text .next', .5, {height:0}, "-=.5");
			tl.fromTo('#videos', 4, {alpha:.7}, {alpha:.27, ease: Power1.easeInOut, delay: 24});

			supportTL.play();
			supportTL2.play();
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
	
		// var v0Duration = 22;
		// var v1Duration = 22;
		// var v2Duration = 22;

		// var journeyPerc = 0;

	// Start Video Loops 
		
		function startLoop0() {
			tl.fromTo('#loop-0', 1, {alpha:0}, {alpha:1, ease:Power1.easeInOut});

		}

		function startLoop1() {
			tl.fromTo('#loop-1', 1, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
		}

		function startLoop2() {
			tl.fromTo('#loop-2', 1, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
		}

		function startLoop3() {
			tl.fromTo('#loop-3', 1, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
		}

		function startLoop4() {
			tl.fromTo('#loop-4', 1, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
		}

		function startLoop5() {
			tl.fromTo('#loop-5', 1, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
		}

	// Start Video Scenes
		
		function startVideo1() {
			$('#video-1')[0].play();
		}

		function startVideo2() {
			$('#video-2')[0].play();
		}

		function startVideo3() {
			$('#video-3')[0].play();
		}

		function startVideo4() {
			$('#video-4')[0].play();
		}

		function startVideo5() {
			$('#video-5')[0].play();
		}
		
	// Video Ended Function
		
		$('#video-1')[0].addEventListener('timeupdate', checkVideo1Time);

		function checkVideo1Time(){
		
			if($('#video-1')[0].currentTime >= $('#video-1')[0].duration-.5){
				tl.fromTo('#video-1', 1, {alpha:1}, {alpha:0, ease:Power1.easeInOut, delay:.5});
				tl.fromTo('#loop-1', .15, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
				$('#video-1')[0].removeEventListener('timeupdate', checkVideo1Time);
				$('#loop-1')[0].play();

				console.log('video1 is finished');
			}else{
				console.log('video1 is still playing');
			}	
		}

		$('#video-2')[0].addEventListener('timeupdate', checkVideo2Time);

		function checkVideo2Time(){
		
			if($('#video-2')[0].currentTime >= $('#video-2')[0].duration-.5){
				tl.fromTo('#video-2', 1, {alpha:1}, {alpha:0, ease:Power1.easeInOut, delay:.5});
				tl.fromTo('#loop-2', .15, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
				$('#video-2')[0].removeEventListener('timeupdate', checkVideo2Time);
				$('#loop-2')[0].play();
				console.log('video2 is finished');
			}else{
				console.log('video2 is still playing');
			}
		}

		$('#video-3')[0].addEventListener('timeupdate', checkVideo3Time);

		function checkVideo3Time(){
		
			if($('#video-3')[0].currentTime >= $('#video-3')[0].duration-.5){
				tl.fromTo('#video-3', 1, {alpha:1}, {alpha:0, ease:Power1.easeInOut, delay:.5});
				tl.fromTo('#loop-3', .15, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
				$('#video-3')[0].removeEventListener('timeupdate', checkVideo3Time);
				$('#loop-3')[0].play();
				console.log('video3 is finished');
			}else{
				console.log('video3 is still playing');
			}
		}

		$('#video-4')[0].addEventListener('timeupdate', checkVideo4Time);

		function checkVideo4Time(){
		
			if($('#video-4')[0].currentTime >= $('#video-4')[0].duration-.5){
				tl.fromTo('#video-4', 1, {alpha:1}, {alpha:0, ease:Power1.easeInOut, delay:.5});
				tl.fromTo('#loop-4', .15, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
				$('#video-4')[0].removeEventListener('timeupdate', checkVideo4Time);
				$('#loop-4')[0].play();
				console.log('video4 is finished');
			}else{
				console.log('video4 is still playing');
			}
		}

		$('#video-5')[0].addEventListener('timeupdate', checkVideo5Time);

		function checkVideo5Time(){
		
			if($('#video-5')[0].currentTime >= $('#video-5')[0].duration-.5){
				tl.fromTo('#video-5', 1, {alpha:1}, {alpha:0, ease:Power1.easeInOut, delay:.5});
				tl.fromTo('#loop-5', .15, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
				$('#video-5')[0].removeEventListener('timeupdate', checkVideo4Time);
				$('#loop-5')[0].play();
				console.log('video5 is finished');
			}else{
				console.log('video5 is still playing');
			}
		}

	// To Timelines 
		
		var ffTL1 = new TimelineMax({paused:true}); 

		function FFtoJourney(){
			$('#loop-0').removeAttr('loop');
			var v1Dur = parseInt($('#video-1')[0].duration);

			ffTL1.add('end',.5)
				 .fromTo('#video-1', .25, {alpha:0}, {alpha:1, ease:Power1.easeInOut, onComplete:startVideo1()}, 'end')
				 .to('.nav-item:eq(0) .bar > span', v1Dur, {x:0, onComplete:startJourney()}, 'end')
				 .fromTo('#videos', .5, {alpha:.27}, {alpha:.7, ease: Power1.easeInOut}, 'end')
				 .to(['#prev-next img','header'], .5, {alpha:.1, ease: Power1.easeInOut}, 'end')
				 .fromTo('nav', 0.5, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .set('#introduction', {className:'-=is-active'}, 'end')
				 .set('#journey', {className:'+=is-active'}, 'end');

			ffTL1.play();
		}

		var ffTL2 = new TimelineMax({paused:true});

		function FFtoIdentify(){
			$('#loop-1').removeAttr('loop');
			var v2Dur = parseInt($('#video-2')[0].duration);

			ffTL2.add('end',.5)
				 .fromTo('#video-2', .5, {alpha:0}, {alpha:1, ease:Power1.easeInOut, onComplete:startVideo2()}, 'end')
				 .fromTo('#loop-1', .5, {alpha:1}, {alpha:0, ease:Power1.easeInOut, onComplete:startIdentify()}, 'end')
				 .fromTo('#journey .learn-more', .5, {alpha:1, y:0}, {alpha:0, y:-30, ease:Power1.easeOut}, 'end')
				 .staggerTo(next2, .5, {alpha:0, y:-10, height:0}, 0.01, 'end')
				 .to('.nav-item:eq(1) .bar > span', v2Dur, {x:0}, 'end')
				 .fromTo('.nav-item:eq(0) .bar > span', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut}, 'end')
				 .fromTo('.nav-item-label:eq(0)', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut}, 'end')
				 .fromTo('.nav-item-label:eq(1)', .5, {alpha:.1}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .fromTo('#videos', .5, {alpha:.27}, {alpha:.7, ease: Power1.easeInOut}, 'end')
				 .to(['#prev-next img','header'], .5, {alpha:.1, ease: Power1.easeInOut}, 'end')
				 .fromTo('nav', 0.5, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .set(next2, {display:'none'}, "+=1")
				 .set('#journey', {className:'-=is-active' ,display:'none'},"-=1")
				 .set('#identify', {className:'+=is-active'}, "-=1");

			ffTL2.play();
		}

		var ffTL3 = new TimelineMax({paused:true});

		function FFtoConnect(){
			$('#loop-2').removeAttr('loop');
			var v3Dur = parseInt($('#video-3')[0].duration);

			ffTL3.add('end',.5)
				 .fromTo('#video-3', .5, {alpha:0}, {alpha:1, ease:Power1.easeInOut, onComplete:startVideo3()}, 'end')
				 .fromTo('#loop-2', .5, {alpha:1}, {alpha:0, ease:Power1.easeInOut, onComplete:startConnect()}, 'end')
				 .fromTo('#identify .learn-more', .5, {alpha:1, y:0}, {alpha:0, y:-30, ease:Power1.easeOut}, 'end')
				 .staggerTo(next2, .5, {alpha:0, y:-10, height:0}, 0.01, 'end')
				 .to('.nav-item:eq(2) .bar > span', v2Dur, {x:0}, 'end')
				 .fromTo('.nav-item:eq(1) .bar > span', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut}, 'end')
				 .fromTo('.nav-item-label:eq(1)', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut}, 'end')
				 .fromTo('.nav-item-label:eq(2)', .5, {alpha:.1}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .fromTo('#videos', .5, {alpha:.27}, {alpha:.7, ease: Power1.easeInOut}, 'end')
				 .to(['#prev-next img','header'], .5, {alpha:.1, ease: Power1.easeInOut}, 'end')
				 .fromTo('nav', 0.5, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .set('#identify', {className:'-=is-active' ,display:'none'},"-=1")
				 .set('#connect', {className:'+=is-active'}, "-=1");

			ffTL3.play();
		}


	// Start Button Click Functions
		
		$('#journey-btn').on('click', function(e){
			e.preventDefault();
			FFtoJourney();
		});

		$('.next-btn').on('click', function(e){

			if($('#journey').hasClass('is-active')){
				if(journeyTL.isActive()){
					console.log('still goin');
					$('#video-1')[0].currentTime = $('#video-1')[0].duration-1;
					journeyTL.seek(journeyTL.duration(), false);
					journeyTL2.seek(journeyTL2.duration(), false);

				} else{
					FFtoIdentify();
				}
			}
			else if($('#identify').hasClass('is-active')){
				if(identifyTL.isActive()){
					console.log('still goin');
					$('#video-2')[0].currentTime = $('#video-2')[0].duration-1;
					identifyTL.seek(identifyTL.duration(), false);
					identifyTL2.seek(identifyTL2.duration(), false);

				} else{
					FFtoConnect();
				}		
			}
			else if($('#connect').hasClass('is-active')){
				$('#loop-3').removeAttr('loop');
				startGuide();
				tl.fromTo('#video-4', .5, {alpha:0}, {alpha:1, ease:Power1.easeInOut, onComplete:startVideo4()});
				tl.fromTo('#loop-3', .5, {alpha:1}, {alpha:0, ease:Power1.easeInOut});
				tl.fromTo('#connect .learn-more', .5, {alpha:1, y:0}, {alpha:0, y:-30, ease:Power1.easeOut});
				tm.staggerTo(next2, .5, {alpha:0, y:-10, height:0}, 0.01);
				tm.set(next2, {display:'none', delay:1});
				var v4Dur = parseInt($('#video-4')[0].duration);
				tl.to('.nav-item:eq(3) .bar > span', v4Dur, {x:0});
				tl.fromTo('.nav-item:eq(2) .bar > span', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut});
				tl.fromTo('.nav-item-label:eq(2)', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut});
				tl.fromTo('.nav-item-label:eq(3)', .5, {alpha:.1}, {alpha:1, ease: Power1.easeInOut});
				tl.set('#connect', {className:'-=is-active' ,display:'none', delay:1});
				tl.fromTo('#videos', .5, {alpha:.27}, {alpha:.7, ease: Power1.easeInOut});
				tl.to(['#prev-next img','header'], .5, {alpha:.1, ease: Power1.easeInOut});
				tl.fromTo('nav', 0.5, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut});	

				setTimeout(function(){
					$('#guide').addClass('is-active');
				}, 1000);		
			}
			else if($('#guide').hasClass('is-active')){
				$('#loop-4').removeAttr('loop');
				startSupport();
				tl.fromTo('#video-5', .5, {alpha:0}, {alpha:1, ease:Power1.easeInOut, onComplete:startVideo5()});
				tl.fromTo('#loop-4', .5, {alpha:1}, {alpha:0, ease:Power1.easeInOut});
				tl.fromTo('#guide .learn-more', .5, {alpha:1, y:0}, {alpha:0, y:-30, ease:Power1.easeOut});
				tm.staggerTo(next2, .5, {alpha:0, y:-10, height:0}, 0.01);
				tm.set(next2, {display:'none', delay:1});
				var v5Dur = parseInt($('#video-5')[0].duration);
				tl.to('.nav-item:eq(4) .bar > span', v5Dur, {x:0});
				tl.fromTo('.nav-item:eq(3) .bar > span', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut});
				tl.fromTo('.nav-item-label:eq(3)', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut});
				tl.fromTo('.nav-item-label:eq(4)', .5, {alpha:.1}, {alpha:1, ease: Power1.easeInOut});
				tl.set('#guide', {className:'-=is-active' ,display:'none', delay:1});
				tl.fromTo('#videos', .5, {alpha:.27}, {alpha:.7, ease: Power1.easeInOut});
				tl.to(['#prev-next img','header'], .5, {alpha:.1, ease: Power1.easeInOut});
				tl.fromTo('nav', 0.5, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut});	

				setTimeout(function(){
					$('#support').addClass('is-active');
				}, 1000);		
			}
			
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
				console.log('moving');
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
	                            
	                            // if($('#journey').hasClass('is-active') && $('#journey .learn-more').css('display') == 'none'){
	                            // 	journeyScrollDown();
	                            // };

	                            setTimeout(function(){
	                                status=0;
	                            },2000);

	                        } else if(e.deltaY > 0){

	                            status = 1;

	                            // if($('#journey').hasClass('is-active') && $('#journey .learn-more').css('display') !== 'none'){
	                            // 	journeyScrollUp();
	                            // };
	                           
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

	// function journeyScrollDown() {
	// 	tm.staggerFromTo(wrds1, 1, {alpha:1, y:0}, {alpha:0, y:-30}, 0.01);
	// 	tm.staggerFromTo(chars1, 1, {alpha:1, y:0}, {alpha:0, y:-30, delay:.15}, 0.01);
	// 	tm.staggerFromTo(chars12, 1, {alpha:1, y:0}, {alpha:0, y:-30, delay:.3}, 0.01);
	// 	tl.fromTo('#journey .divider:eq(0)', 1, {alpha:1, y:0}, {alpha:0, y:-30, delay:.45});
	// 	tl.fromTo('#journey .divider:eq(1)', 1, {alpha:1, y:0}, {alpha:0, y:-30, delay:.6});
	// 	tl.fromTo('.more-btn', 1, {alpha:1, y:0}, {alpha:0, y:-30, delay:.75});
	// 	tl.set(['.more-btn', wrds1, chars1, chars12, '#journey .divider:eq(0)', '#journey .divider:eq(1)', '#journey div.content p.content:eq(0)'], {height:0, margin:0, delay:1.75});
	// 	tl.set('#journey div.content', {height:'60vh', overflowY:'auto', delay:1.75});
	// 	tl.fromTo('.learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut, delay:2});
	// }

	// function journeyScrollUp() {
	// 	tl.fromTo('.learn-more', 1, {alpha:1, y:0}, {alpha:0, y:30, ease:Power1.easeOut});
	// 	tl.set(['.learn-more', '.more-btn', '#journey .divider:eq(0)', '#journey .divider:eq(1)', '#journey div.content p.content:eq(0)'], {clearProps:'display,margin,height', delay:1});
	// 	tl.set([wrds1, chars1, chars12], {clearProps:'margin,height', delay:1});
	// 	tl.set('#journey div.content:eq(0)', {height:journeyContentHeight, delay:1});
	// 	tl.fromTo('.more-btn', 1, {alpha:0, y:-30}, {alpha:1, y:0, ease:Power1.easeOut, delay:1.15});
	// 	tl.fromTo('#journey .divider:eq(1)', 1, {alpha:0, y:-30}, {alpha:1, y:0, ease:Power1.easeOut, delay:1.3});
	// 	tl.fromTo('#journey p.content:eq(0)', 1, {alpha:0, y:-30}, {alpha:1, y:0, delay:1.45});
	// 	tl.fromTo('#journey .divider:eq(0)', 1, {alpha:0, y:-30}, {alpha:1, y:0, delay:1.6});
	// 	tm.staggerFromTo(chars12, 1, {alpha:0, y:-30}, {alpha:1, y:0, delay:.45, delay:1.6}, 0.01);
	// 	tm.staggerFromTo(chars1, 1, {alpha:0, y:-30}, {alpha:1, y:0, delay:1.75}, 0.01);
	// 	tm.staggerFromTo(wrds1, 1, {alpha:0, y:-30}, {alpha:1, y:0, delay:1.9}, 0.01);
		
	// 	// tl.set(['.more-btn', wrds1, chars1, chars12, '#journey .divider:eq(0)', '#journey .divider:eq(1), #journey div.content p.content:eq(0)'], {height:0, margin:0, delay:1.75});
	// 	// tl.set('#journey div.content', {height:'60vh', overflowY:'auto', delay:1.75});
	// }



	// Hide Pages from Aria
		
		function addAriaHiddenPages(){

		}

	// Tab Index Functions
	
		// $("body").on("keydown", function(event) {
		// 	$('*').removeClass('no-focus');
	 //    });


});




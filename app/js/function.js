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
		tm.set(['.start-stroke', '.next-arrow', '.prev-arrow'], {drawSVG:"0% 0%"});
		tm.to('body', 1, {alpha:1, ease:Power2.easeInOut});
		tm.to('#loop-0', 1, {alpha:1, ease:Power2.easeInOut});

		// var	prevtxt1 = new SplitText("#prev .name:eq(0)", {type:"chars"}), 
		//     prev1 = prevtxt1.chars,
		//     prevtxt2 = new SplitText("#prev .name:eq(1)", {type:"chars"}), 
		//     prev2 = prevtxt2.chars,
		//     prevtxt3 = new SplitText("#prev .name:eq(2)", {type:"chars"}), 
		//     prev3 = prevtxt3.chars,
		//     prevtxt4 = new SplitText("#prev .name:eq(3)", {type:"chars"}), 
		//     prev4 = prevtxt4.chars,
		//     prevtxt5 = new SplitText("#prev .name:eq(4)", {type:"chars"}), 
		//     next5 = prevtxt5.chars,
		//     prevtxt6 = new SplitText("#prev .name:eq(5)", {type:"chars"}), 
		//     prev6 = prevtxt6.chars;

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
			journeyTL.set(next1, {alpha:0});
			journeyTL.set('#prev', {alpha:0});
			journeyTL.set(next1, {alpha:1, y:0});
			journeyTL.set('#prev-next', {display:'inherit', alpha:0});

			journeyTL.fromTo('#loop-0', .5, {alpha:1}, {alpha:0, ease:Power4.easeOut});
			journeyTL.fromTo('.nav-item-label:eq(0)', .5, {alpha:.1}, {alpha:1, ease:Power4.easeOut},"-=.5");
			journeyTL.fromTo('#introduction', 1, {alpha:1}, {alpha:0, ease:Power4.easeOut},"-=1.5");
			journeyTL.fromTo('.aetna-logo', 1, {alpha:1, y:'-50%'}, {alpha:0, y:'-70%', ease:Power4.easeOut},"-=.75");
			journeyTL.fromTo('.aetnacare-logo', 1, {alpha:0, y:'-30%'}, {alpha:1, y:'-50%', ease:Power4.easeOut},"-=.5");
			journeyTL.set('#introduction', {display:'none'});
			journeyTL.fromTo('#journey', .5, {alpha:0, display:'inherit',x:'-50%',y:'-30%'}, {alpha:1,x:'-50%',y:'-50%', ease:Power4.easeIn},"-=.5");
			journeyTL.staggerFromTo(wrds1, 1, {alpha:0, y:20}, {alpha:1, y:-20}, 0.01, "+=2.25");
			journeyTL.fromTo(chars1, 1.5, {alpha:0, y:-40}, {alpha:1}, "+=2.25");
			journeyTL.staggerTo(wrds1, 1.75, {y:-50, alpha:.4, ease: Power1.easeInOut}, 0.01, "-=2.5");

			journeyTL2.fromTo('#videos', 4, {alpha:.7}, {alpha:.27, ease: Power1.easeInOut}, "+=17");
			journeyTL2.staggerTo(wrds1, 1, {alpha:0, y:-80}, 0.01, "-=2");
			journeyTL2.staggerTo(chars1, 1, {alpha:0, y:-80}, 0.05, "-=.85")
			journeyTL2.set('#journey .content:eq(0)', {display:'inherit', height:'auto', autoAlpha:1}, "+=.25");
			journeyTL2.set([wrds1, chars1, '#journey h2'], {height:0, margin:0});
			journeyTL2.set('#journey div.content', {height:'auto'});
			journeyTL2.fromTo('#journey .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut});
			journeyTL2.fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut});
			journeyTL2.staggerFromTo(next1, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.01, "-=1");
			journeyTL2.to(['#prev','#next'], 1, {alpha:0, ease:Power1.easeOut}, "+=3");

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
			identifyTL.set("#next .name:not(:eq(1))", {className:'-=is-active'});
			identifyTL.set("#next .name:eq(1)", {className:'+=is-active'});
			identifyTL.set(next2, {alpha:0});
			identifyTL.set('#prev', {alpha:0, className:'fixed-left is-in-use'});
			identifyTL.set('#prev-next', {display:'inherit', alpha:1});

			identifyTL.fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut});
			identifyTL.staggerFromTo(next2, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.01, "-=1");
			identifyTL.fromTo('#identify', .5, {alpha:0, display:'inherit',x:'-50%',y:'-30%'}, {alpha:1,x:'-50%',y:'-50%', ease:Power4.easeIn},"-=1");
			identifyTL.to(['#prev','#next'], 1, {alpha:0, ease:Power1.easeOut});
			identifyTL.staggerFromTo(wrds2, 1, {alpha:0, y:20}, {alpha:1, y:-20}, 0.01, "+=2.25");
			identifyTL.fromTo(chars2, 1.5, {alpha:0, y:-40}, {alpha:1}, "+=4");
			identifyTL.staggerTo(wrds2, 1.75, {y:-50, alpha:.4, ease: Power1.easeInOut}, 0.01, "-=2.5");

			identifyTL2.fromTo('#videos', 4, {alpha:.7}, {alpha:.27, ease: Power1.easeInOut}, "+=26");
			identifyTL2.staggerTo(wrds2, 1, {alpha:0, y:-80}, 0.01, "-=2");
			identifyTL2.staggerTo(chars2, 1, {alpha:0, y:-80}, 0.05, "-=.85")
			identifyTL2.set('#identify .content:eq(0)', {display:'inherit', height:'auto', autoAlpha:1}, "+=.25");
			identifyTL2.set([wrds2, chars2, '#identify h2'], {height:0, margin:0});
			identifyTL2.set('#identify div.content', {height:'auto'});
			identifyTL2.fromTo('#identify .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut});

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
			connectTL.set(["#next .name:not(:eq(2))","#prev .name:not(:eq(1))"], {className:'-=is-active'});
			connectTL.set(["#next .name:eq(2)","#prev .name:eq(1)"], {className:'+=is-active'});
			connectTL.set(next3, {alpha:0});
			connectTL.set('#prev', {alpha:0, className:'fixed-left is-in-use'});
			connectTL.set('#prev-next', {display:'inherit', alpha:1});

			connectTL.fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut});
			connectTL.staggerFromTo(next3, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.01, "-=1");
			connectTL.fromTo('#connect', .5, {alpha:0, display:'inherit',x:'-50%',y:'-30%'}, {alpha:1,x:'-50%',y:'-50%', ease:Power4.easeIn},"-=1");
			connectTL.staggerFromTo(wrds3, 1, {alpha:0, y:20}, {alpha:1, y:-20}, 0.01, "+=2.25");
			connectTL.fromTo(chars3, 1.5, {alpha:0, y:-40}, {alpha:1}, "+=3");
			connectTL.staggerTo(wrds3, 1.75, {y:-50, alpha:.4, ease: Power1.easeInOut}, 0.01, "-=2.5");

			connectTL2.fromTo('#videos', 4, {alpha:.7}, {alpha:.27, ease: Power1.easeInOut}, "+=18");
			connectTL2.staggerTo(wrds3, 1, {alpha:0, y:-80}, 0.01, "-=2");
			connectTL2.staggerTo(chars3, 1, {alpha:0, y:-80}, 0.05, "-=.85")
			connectTL2.set('#connect .content:eq(0)', {display:'inherit', height:'auto', autoAlpha:1}, "+=.25");
			connectTL2.set([wrds3, chars3, '#connect h2'], {height:0, margin:0});
			connectTL2.set('#connect div.content', {height:'auto'});
			connectTL2.fromTo('#connect .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut});
			connectTL2.staggerFromTo(next1, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01);

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
			guideTL.set(["#next .name:not(:eq(3))","#prev .name:not(:eq(2))"], {className:'-=is-active'});
			guideTL.set(["#next .name:eq(3)","#prev .name:eq(2)"], {className:'+=is-active'});
			guideTL.set(next4, {alpha:0});
			guideTL.set('#prev', {alpha:0, className:'fixed-left is-in-use'});
			guideTL.set('#prev-next', {display:'inherit', alpha:1});

			guideTL.fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut});
			guideTL.staggerFromTo(next4, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.01, "-=1");
			guideTL.fromTo('#guide', .5, {alpha:0, display:'inherit',x:'-50%',y:'-30%'}, {alpha:1,x:'-50%',y:'-50%', ease:Power4.easeIn},"-=1");
			guideTL.staggerFromTo(wrds4, 1, {alpha:0, y:20}, {alpha:1, y:-20}, 0.01, "+=2.25");
			guideTL.fromTo(chars4, 1.5, {alpha:0, y:-40}, {alpha:1}, "+=2.25");
			guideTL.staggerTo(wrds4, 1.75, {y:-50, alpha:.4, ease: Power1.easeInOut}, 0.01, "-=2.5");

			guideTL2.fromTo('#videos', 4, {alpha:.7}, {alpha:.27, ease: Power1.easeInOut}, "+=11");
			guideTL2.staggerTo(wrds4, 1, {alpha:0, y:-80}, 0.01, "-=2");
			guideTL2.staggerTo(chars4, 1, {alpha:0, y:-80}, 0.05, "-=.85")
			guideTL2.set('#guide .content:eq(0)', {display:'inherit', height:'auto', autoAlpha:1}, "+=.25");
			guideTL2.set([wrds4, chars4, '#guide h2'], {height:0, margin:0});
			guideTL2.set('#guide div.content', {height:'auto'});
			guideTL2.fromTo('#guide .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut});
			guideTL2.staggerFromTo(next1, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01);

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
			supportTL.set(["#next .name:not(:eq(4))","#prev .name:not(:eq(3))"], {className:'-=is-active'});
			supportTL.set(["#next .name:eq(4)","#prev .name:eq(3)"], {className:'+=is-active'});
			supportTL.set(next5, {alpha:0});
			supportTL.set('#prev', {alpha:0, className:'fixed-left is-in-use'});
			supportTL.set('#prev-next', {display:'inherit', alpha:1});

			supportTL.fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut});
			supportTL.staggerFromTo(next5, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.01, "-=1");
			supportTL.fromTo('#support', .5, {alpha:0, display:'inherit',x:'-50%',y:'-30%'}, {alpha:1,x:'-50%',y:'-50%', ease:Power4.easeIn},"-=1");
			supportTL.staggerFromTo(wrds5, 1, {alpha:0, y:20}, {alpha:1, y:-20}, 0.01, "+=2.25");
			supportTL.fromTo(chars5, 1.5, {alpha:0, y:-40}, {alpha:1}, "+=4");
			supportTL.staggerTo(wrds5, 1.75, {y:-50, alpha:.4, ease: Power1.easeInOut}, 0.01, "-=2.5");

			supportTL2.fromTo('#videos', 4, {alpha:.7}, {alpha:.27, ease: Power1.easeInOut}, "+=24");
			supportTL2.staggerTo(wrds5, 1, {alpha:0, y:-80}, 0.01, "-=2");
			supportTL2.staggerTo(chars5, 1, {alpha:0, y:-80}, 0.05, "-=.85")
			supportTL2.set('#support .content:eq(0)', {display:'inherit', height:'auto', autoAlpha:1}, "+=.25");
			supportTL2.set([wrds5, chars5, '#support h2'], {height:0, margin:0});
			supportTL2.set('#support div.content', {height:'auto'});
			supportTL2.fromTo('#support .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut});
			supportTL2.staggerFromTo(next1, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01);
			
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
			sustainTL.set(["#next .name:not(:eq(5))","#prev .name:not(:eq(4))"], {className:'-=is-active'});
			sustainTL.set(["#next .name:eq(5)","#prev .name:eq(4)"], {className:'+=is-active'});
			sustainTL.set(next6, {alpha:0});
			sustainTL.set('#prev', {alpha:0, className:'fixed-left is-in-use'});
			sustainTL.set('#prev-next', {display:'inherit', alpha:1});

			sustainTL.fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut});
			sustainTL.staggerFromTo(next5, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.01, "-=1");
			sustainTL.fromTo('#sustain', .5, {alpha:0, display:'inherit',x:'-50%',y:'-30%'}, {alpha:1,x:'-50%',y:'-50%', ease:Power4.easeIn},"-=1");
			sustainTL.staggerFromTo(wrds6, 1, {alpha:0, y:20}, {alpha:1, y:-20}, 0.01, "+=2.25");
			sustainTL.fromTo(chars6, 1.5, {alpha:0, y:-40}, {alpha:1}, "+=2.25");
			sustainTL.staggerTo(wrds6, 1.75, {y:-50, alpha:.4, ease: Power1.easeInOut}, 0.01, "-=2.5");

			sustainTL2.fromTo('#videos', 4, {alpha:.7}, {alpha:.27, ease: Power1.easeInOut}, "+=16");
			sustainTL2.staggerTo(wrds6, 1, {alpha:0, y:-80}, 0.01, "-=2");
			sustainTL2.staggerTo(chars6, 1, {alpha:0, y:-80}, 0.05, "-=.85")
			sustainTL2.set('#sustain .content:eq(0)', {display:'inherit', height:'auto', autoAlpha:1}, "+=.25");
			sustainTL2.set([wrds6, chars6, '#support h2'], {height:0, margin:0});
			sustainTL2.set('#sustain div.content', {height:'auto'});
			sustainTL2.fromTo('#sustain .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut});
			sustainTL2.staggerFromTo(next1, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01);
			
			sustainTL.play();
			sustainTL2.play();
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
			tm.fromTo(stroke, 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Sine.easeInOut});
		});


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

		function startLoop6() {
			tl.fromTo('#loop-6', 1, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
		}

	// Start Video Scenes
		
		function startVideo1() {
			$('#video-1')[0].currentTime = 0;
			$('#video-1')[0].play();
		}

		function startVideo2() {
			$('#video-2')[0].currentTime = 0;
			$('#video-2')[0].play();
		}

		function startVideo3() {
			$('#video-3')[0].currentTime = 0;
			$('#video-3')[0].play();
		}

		function startVideo4() {
			$('#video-4')[0].currentTime = 0;
			$('#video-4')[0].play();
		}

		function startVideo5() {
			$('#video-5')[0].currentTime = 0;
			$('#video-5')[0].play();
		}

		function startVideo6() {
			$('#video-6')[0].currentTime = 0;
			$('#video-6')[0].play();
		}
		
	// Video Ended Function

		function checkTimeVideo1(){
		
			if($('#video-1')[0].currentTime >= $('#video-1')[0].duration-.5){
				tl.fromTo('#video-1', 1, {alpha:1}, {alpha:0, ease:Power1.easeInOut, delay:.5});
				tl.fromTo('#loop-1', .15, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
				$('#video-1')[0].removeEventListener('timeupdate', checkTimeVideo1);
				$('#loop-1')[0].play();

				console.log('video1 is finished');
			}else{
				console.log('video1 is still playing');
			}	
		}

		function checkTimeVideo2(){
		
			if($('#video-2')[0].currentTime >= $('#video-2')[0].duration-.5){
				tl.fromTo('#video-2', 1, {alpha:1}, {alpha:0, ease:Power1.easeInOut, delay:.5});
				tl.fromTo('#loop-2', .15, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
				$('#video-2')[0].removeEventListener('timeupdate', checkTimeVideo2);
				$('#loop-2')[0].play();
				console.log('video2 is finished');
			}else{
				console.log('video2 is still playing');
			}
		}

		function checkTimeVideo3(){
		
			if($('#video-3')[0].currentTime >= $('#video-3')[0].duration-.5){
				tl.fromTo('#video-3', 1, {alpha:1}, {alpha:0, ease:Power1.easeInOut, delay:.5});
				tl.fromTo('#loop-3', .15, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
				$('#video-3')[0].removeEventListener('timeupdate', checkTimeVideo3);
				$('#loop-3')[0].play();
				console.log('video3 is finished');
			}else{
				console.log('video3 is still playing');
			}
		}

		function checkTimeVideo4(){
		
			if($('#video-4')[0].currentTime >= $('#video-4')[0].duration-.5){
				tl.fromTo('#video-4', 1, {alpha:1}, {alpha:0, ease:Power1.easeInOut, delay:.5});
				tl.fromTo('#loop-4', .15, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
				$('#video-4')[0].removeEventListener('timeupdate', checkTimeVideo4);
				$('#loop-4')[0].play();
				console.log('video4 is finished');
			}else{
				console.log('video4 is still playing');
			}
		}

		function checkTimeVideo5(){
		
			if($('#video-5')[0].currentTime >= $('#video-5')[0].duration-.5){
				tl.fromTo('#video-5', 1, {alpha:1}, {alpha:0, ease:Power1.easeInOut, delay:.5});
				tl.fromTo('#loop-5', .15, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
				$('#video-5')[0].removeEventListener('timeupdate', checkTimeVideo5);
				$('#loop-5')[0].play();
				console.log('video5 is finished');
			}else{
				console.log('video5 is still playing');
			}
		}

		function checkTimeVideo6(){
		
			if($('#video-6')[0].currentTime >= $('#video-6')[0].duration-.5){
				tl.fromTo('#video-6', 1, {alpha:1}, {alpha:0, ease:Power1.easeInOut, delay:.5});
				tl.fromTo('#loop-6', .15, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
				$('#video-6')[0].removeEventListener('timeupdate', checkTimeVideo6);
				$('#loop-6')[0].play();
				console.log('video6 is finished');
			}else{
				console.log('video6 is still playing');
			}
		}

		function removeEvL(){
			var	dataAttr = $('section.is-active').attr('data-index');
			var activeVideo = $('#video-' + dataAttr)[0];
			var activeEvL = 'checkTimeVideo' + dataAttr;
			// var vidid = $('.scene-video.is-active').attr('id');
			activeVideo.removeEventListener('timeupdate', activeEvL);
			$('#video-1')[0].pause();
			$('#video-2')[0].pause();
			$('#video-3')[0].pause();
			$('#video-4')[0].pause();
			$('#video-5')[0].pause();
			$('#video-6')[0].pause();
			// activeVideo.currentTime=0;
			// alert('hey');
		}

	// To Timelines 
		
		var ffTL1 = new TimelineMax({paused:true}); 

		function FFtoJourney(){
			$('#loop-0').removeAttr('loop');
			$('#video-1')[0].addEventListener('timeupdate', checkTimeVideo1);
			var v1Dur = parseInt($('#video-1')[0].duration);

			ffTL1.add('end',.5)
				 .fromTo('#video-1', .25, {alpha:0}, {alpha:1, ease:Power1.easeInOut, onComplete:startVideo1()}, 'end')
				 .to('.nav-item:eq(0) .bar > span', v1Dur, {x:0, onComplete:startJourney()}, 'end')
				 .fromTo('#videos', .5, {alpha:.27}, {alpha:.7, ease: Power1.easeInOut}, 'end')
				 .to(['#prev-next img','header'], .5, {alpha:.1, ease: Power1.easeInOut}, 'end')
				 .fromTo('nav', 0.5, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .set('#introduction', {className:'-=is-active'}, 'end')
				 .set(['#journey','#video-1'], {className:'+=is-active'}, 'end')
				 .set('.scene-video:not(#video-1)', {className:'-=is-active'}, 'end');

			ffTL1.play();
		}

		var ffTL2 = new TimelineMax({paused:true});

		function FFtoIdentify(){
			$('#loop-1').removeAttr('loop');
			$('#video-2')[0].addEventListener('timeupdate', checkTimeVideo2);
			var v2Dur = parseInt($('#video-2')[0].duration);

			ffTL2.add('end',.5)
				 .fromTo('#video-2', .5, {alpha:0}, {alpha:1, ease:Power1.easeInOut, onComplete:startVideo2()}, 'end')
				 .fromTo('#loop-1', .5, {alpha:1}, {alpha:0, ease:Power1.easeInOut, onComplete:startIdentify()}, 'end')
				 .fromTo('#journey .learn-more', .5, {alpha:1, y:0}, {alpha:0, y:-30, ease:Power1.easeOut}, 'end')
				 .set('.nav-item:eq(1) .bar > span', {alpha:1}, 'end')
				 .to('.nav-item:eq(1) .bar > span', v2Dur, {x:0}, 'end')
				 .set('.nav-item:not(:eq(1)) .bar > span', {alpha:.2, clearProps:'transform'}, 'end')
				 .fromTo('.nav-item-label:not(:eq(1))', .5, {alpha:1}, {alpha:.1, ease: Power1.easeInOut}, 'end')
				 .fromTo('.nav-item-label:eq(1)', .5, {alpha:.1}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .fromTo('#videos', .5, {alpha:.27}, {alpha:.7, ease: Power1.easeInOut}, 'end')
				 .to(['#prev-next img','header'], .5, {alpha:.1, ease: Power1.easeInOut}, 'end')
				 .fromTo('nav', 0.5, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .set('section:not(#identify)', {className:'-=is-active', display:'none'}, 'end')
				 .set(['#identify','#video-2'], {className:'+=is-active', display:'inherit'}, 'end')
				 .set('.scene-video:not(#video-2)', {className:'-=is-active'}, 'end');

			setTimeout(function(){
				ffTL2.play();
			}, 200);
		}

		var ffTL3 = new TimelineMax({paused:true});

		function FFtoConnect(){
			$('#loop-2').removeAttr('loop');
			$('#video-3')[0].addEventListener('timeupdate', checkTimeVideo3);
			var v3Dur = parseInt($('#video-3')[0].duration);

			ffTL3.add('end',.5)
				 .fromTo('#video-3', .5, {alpha:0}, {alpha:1, ease:Power1.easeInOut, onComplete:startVideo3()}, 'end')
				 .fromTo('#loop-2', .5, {alpha:1}, {alpha:0, ease:Power1.easeInOut, onComplete:startConnect()}, 'end')
				 .fromTo('#identify .learn-more', .5, {alpha:1, y:0}, {alpha:0, y:-30, ease:Power1.easeOut}, 'end')
				 .set('.nav-item:eq(2) .bar > span', {alpha:1}, 'end')
				 .to('.nav-item:eq(2) .bar > span', v3Dur, {x:0}, 'end')
				 .set('.nav-item:not(:eq(2)) .bar > span', {alpha:.2, clearProps:'transform'}, 'end')
				 .fromTo('.nav-item-label:not(:eq(2))', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut}, 'end')
				 .fromTo('.nav-item-label:eq(2)', .5, {alpha:.1}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .fromTo('#videos', .5, {alpha:.27}, {alpha:.7, ease: Power1.easeInOut}, 'end')
				 .to(['#prev-next img','header'], .5, {alpha:.1, ease: Power1.easeInOut}, 'end')
				 .fromTo('nav', 0.5, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .set('section:not(#connect)', {className:'-=is-active', display:'none'}, 'end')
				 .set(['#connect','#video-3'], {className:'+=is-active', display:'inherit'}, 'end')
				 .set('.scene-video:not(#video-3)', {className:'-=is-active'}, 'end');

			setTimeout(function(){
				ffTL3.play();
			}, 200);
				
		}

		var ffTL4 = new TimelineMax({paused:true});

		function FFtoGuide(){
			$('#loop-3').removeAttr('loop');
			$('#video-4')[0].addEventListener('timeupdate', checkTimeVideo4);
			var v4Dur = parseInt($('#video-4')[0].duration);

			ffTL4.add('end',.5)
				 .fromTo('#video-4', .5, {alpha:0}, {alpha:1, ease:Power1.easeInOut, onComplete:startVideo4()}, 'end')
				 .fromTo('#loop-3', .5, {alpha:1}, {alpha:0, ease:Power1.easeInOut, onComplete:startGuide()}, 'end')
				 .fromTo('#connect .learn-more', .5, {alpha:1, y:0}, {alpha:0, y:-30, ease:Power1.easeOut}, 'end')
				 .set('.nav-item:eq(3) .bar > span', {alpha:1}, 'end')
				 .to('.nav-item:eq(3) .bar > span', v4Dur, {x:0}, 'end')
				 .set('.nav-item:not(:eq(3)) .bar > span', {alpha:.2, clearProps:'transform'}, 'end')
				 .fromTo('.nav-item-label:not(:eq(3))', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut}, 'end')
				 .fromTo('.nav-item-label:eq(3)', .5, {alpha:.1}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .fromTo('#videos', .5, {alpha:.27}, {alpha:.7, ease: Power1.easeInOut}, 'end')
				 .to(['#prev-next img','header'], .5, {alpha:.1, ease: Power1.easeInOut}, 'end')
				 .fromTo('nav', 0.5, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .set('section:not(#guide)', {className:'-=is-active', display:'none'}, 'end')
				 .set(['#guide','#video-4'], {className:'+=is-active', display:'inherit'}, 'end')
				 .set('.scene-video:not(#video-4)', {className:'-=is-active'}, 'end');

			setTimeout(function(){
				ffTL4.play();
			}, 200);
		}

		var ffTL5 = new TimelineMax({paused:true});

		function FFtoSupport(){
			$('#loop-4').removeAttr('loop');
			$('#video-5')[0].addEventListener('timeupdate', checkTimeVideo5);
			var v5Dur = parseInt($('#video-5')[0].duration);

			ffTL5.add('end',.5)
				 .fromTo('#video-5', .5, {alpha:0}, {alpha:1, ease:Power1.easeInOut, onComplete:startVideo5()}, 'end')
				 .fromTo('#loop-4', .5, {alpha:1}, {alpha:0, ease:Power1.easeInOut, onComplete:startSupport()}, 'end')
				 .fromTo('#guide .learn-more', .5, {alpha:1, y:0}, {alpha:0, y:-30, ease:Power1.easeOut}, 'end')
				 .set('.nav-item:eq(4) .bar > span', {alpha:1}, 'end')
				 .to('.nav-item:eq(4) .bar > span', v5Dur, {x:0}, 'end')
				 .set('.nav-item:not(:eq(4)) .bar > span', {alpha:.2, clearProps:'transform'}, 'end')
				 .fromTo('.nav-item-label:not(:eq(4))', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut}, 'end')
				 .fromTo('.nav-item-label:eq(4)', .5, {alpha:.1}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .fromTo('#videos', .5, {alpha:.27}, {alpha:.7, ease: Power1.easeInOut}, 'end')
				 .to(['#prev-next img','header'], .5, {alpha:.1, ease: Power1.easeInOut}, 'end')
				 .fromTo('nav', 0.5, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .set('section:not(#support)', {className:'-=is-active' ,display:'none'}, 'end')
				 .set(['#support','#video-5'], {className:'+=is-active', display:'inherit'}, 'end')
				 .set('.scene-video:not(#video-5)', {className:'-=is-active'}, 'end');

			setTimeout(function(){
				ffTL5.play();
			}, 200);
		}

		var ffTL6 = new TimelineMax({paused:true});

		function FFtoSustain(){
			$('#loop-5').removeAttr('loop');
			$('#video-6')[0].addEventListener('timeupdate', checkTimeVideo6);
			var v6Dur = parseInt($('#video-6')[0].duration);

			ffTL6.add('end',.5)
				 .fromTo('#video-6', .5, {alpha:0}, {alpha:1, ease:Power1.easeInOut, onComplete:startVideo6()}, 'end')
				 .fromTo('#loop-5', .5, {alpha:1}, {alpha:0, ease:Power1.easeInOut, onComplete:startSustain()}, 'end')
				 .fromTo('#support .learn-more', .5, {alpha:1, y:0}, {alpha:0, y:-30, ease:Power1.easeOut}, 'end')
				 .set('.nav-item:eq(5) .bar > span', {alpha:1}, 'end')
				 .to('.nav-item:eq(5) .bar > span', v6Dur, {x:0}, 'end')
				 .set('.nav-item:not(:eq(5)) .bar > span', {alpha:.2, clearProps:'transform'}, 'end')
				 .fromTo('.nav-item-label:not(:eq(5))', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut}, 'end')
				 .fromTo('.nav-item-label:eq(5)', .5, {alpha:.1}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .fromTo('#videos', .5, {alpha:.27}, {alpha:.7, ease: Power1.easeInOut}, 'end')
				 .to(['#prev-next img','header'], .5, {alpha:.1, ease: Power1.easeInOut}, 'end')
				 .fromTo('nav', 0.5, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut}, 'end')
				 .set('section:not(#sustain)', {className:'-=is-active' ,display:'none'}, 'end')
				 .set(['#sustain','#video-6'], {className:'+=is-active', display:'inherit'}, 'end')
				 .set('.scene-video:not(#video-6)', {className:'-=is-active'}, 'end');

			setTimeout(function(){
				ffTL6.play();
			}, 200);
		}

	// Skip Functions

		function skipJourney(){
			var dur2 = parseInt(journeyTL2.duration() - 4);
			if(journeyTL.isActive()){
				var timeline = new TimelineMax({ onComplete:ffJourney});
				$('#video-1')[0].currentTime = $('#video-1')[0].duration-4;
				journeyTL.seek(journeyTL.duration(), false);
				journeyTL2.seek(dur2, false);
				timeline.fromTo('.dummy', 4, {alpha:0}, {alpha:1});

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

	// Skip Timeout
		
		var skipTimer=0;

		function skipTimeout(){
			skipTimer = 1;
			setTimeout(function(){
				skipTimer = 0;
			},4000);
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
				};
				skipTimeout();
			};
			
		});

		$('.nav-item:eq(0)').on('click', function(){
			if(skipTimer === 0){
				skipTimeout();
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
					FFtoIdentify();
					
				};	
			};
			
		});

		$('.nav-item:eq(2)').on('click', function(){
			if(skipTimer === 0){
				skipTimeout();
				if($('#journey').hasClass('is-active') ){
					removeEvL();
					ffTL1.pause(0).seek(ffTL2.duration(), false);
					ffTL2.pause(0).seek(ffTL2.duration(), false);
					journeyTL.pause(0).seek(journeyTL.duration(), false); 
					journeyTL2.pause(0).seek(journeyTL2.duration(), false);
					identifyTL.pause(0).seek(identifyTL.duration(), false); 
					identifyTL2.pause(0).seek(identifyTL2.duration(), false);

					tl.to('#videos', 1, {alpha:0, ease:Power1.easeOut});
					tl.set('section', {alpha:0});
					tl.to('#videos', 1, {alpha:.7, ease:Power1.easeOut, delay:2});
					tl.to('section.is-active', 1, {alpha:1, ease:Power1.easeOut, delay:2});
					FFtoConnect();
					
				} 
				else if($('#identify').hasClass('is-active')){
					skipIdentify();		
				} 
				else if($('#connect').hasClass('is-active')){
					// do nothing
				} 
				else if($('#guide').hasClass('is-active')){
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
					
					FFtoConnect();
					
				} else{
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
					tl.to('#videos', 1, {alpha:0, ease:Power1.easeOut});
					tl.set('section', {alpha:0});
					tl.to('#videos', 1, {alpha:.7, ease:Power1.easeOut, delay:2});
					tl.to('section.is-active', 1, {alpha:1, ease:Power1.easeOut, delay:2});
					
					FFtoConnect();
				};
			};
		});

		$('.nav-item:eq(3)').on('click', function(){
			if(skipTimer === 0){
				skipTimeout();
				if($('#journey').hasClass('is-active') || $('#identify').hasClass('is-active')){
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

					tl.to('#videos', 1, {alpha:0, ease:Power1.easeOut});
					tl.set('section', {alpha:0});
					tl.to('#videos', 1, {alpha:.7, ease:Power1.easeOut, delay:2});
					tl.to('section.is-active', 1, {alpha:1, ease:Power1.easeOut, delay:2});
					FFtoGuide();
				}
				else if($('#connect').hasClass('is-active')){
					skipConnect();
				}
				else if($('#support').hasClass('is-active')){
					guideTL.pause(0).clear(); guideTL2.pause(0).clear();
					supportTL.pause(0).clear(); supportTL2.pause(0).clear();
					sustainTL.pause(0).clear(); sustainTL2.pause(0).clear();

					ffTL4.pause(0).clear();
					ffTL5.pause(0).clear();
					ffTL6.pause(0).clear();

					removeEvL();

					tl.to('.loop-video:not(#loop-0)', .5, {alpha:0});
					
					FFtoGuide();	
				}
				else{
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
					tl.to('#videos', 1, {alpha:0, ease:Power1.easeOut});
					tl.set('section', {alpha:0});
					tl.to('#videos', 1, {alpha:.7, ease:Power1.easeOut, delay:2});
					tl.to('section.is-active', 1, {alpha:1, ease:Power1.easeOut, delay:2});
					
					FFtoGuide();
				};
			};
		});

		$('.nav-item:eq(4)').on('click', function(){
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
					tl.to('#videos', 1, {alpha:0, ease:Power1.easeOut});
					tl.set('section', {alpha:0});
					tl.to('#videos', 1, {alpha:.7, ease:Power1.easeOut, delay:2});
					tl.to('section.is-active', 1, {alpha:1, ease:Power1.easeOut, delay:2});
					
					FFtoSupport();
				}
				else if($('#guide').hasClass('is-active')){
					skipGuide();
				}
				else if($('#support').hasClass('is-active')){
					// do nothing
				}
				else{
					removeEvL();
					ffTL1.pause(0).seek(ffTL2.duration(), false);
					ffTL2.pause(0).seek(ffTL2.duration(), false);
					ffTL3.pause(0).seek(ffTL3.duration(), false);
					ffTL4.pause(0).seek(ffTL4.duration(), false);
					journeyTL.pause(0).seek(journeyTL.duration(), false); 
					journeyTL2.pause(0).seek(journeyTL2.duration(), false);
					identifyTL.pause(0).seek(identifyTL.duration(), false); 
					identifyTL2.pause(0).seek(identifyTL2.duration(), false);
					connectTL.pause(0).seek(connectTL.duration(), false); 
					connectTL2.pause(0).seek(connectTL2.duration(), false);
					guideTL.pause(0).seek(guideTL.duration(), false); 
					guideTL2.pause(0).seek(guideTL2.duration(), false);

					tl.to('#videos', 1, {alpha:0, ease:Power1.easeOut});
					tl.set('section', {alpha:0});
					tl.to('#videos', 1, {alpha:.7, ease:Power1.easeOut, delay:2});
					tl.to('section.is-active', 1, {alpha:1, ease:Power1.easeOut, delay:2});
					FFtoSupport();
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
					FFtoSustain();
					
				};	
			};
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
		
		$('#header-links').mouseover(function() {
		  	$(this).addClass('show-links');
		  	mouseTimeout();
		}).mouseout(function() {
		  	$(this).removeClass('show-links');
		  	mouseTimeout();
		});

	// Mousemove
		
		var movementTimer;
		$('body').mousemove(function(event) {
			// console.log('event page: ' + event.pageX);
			// event.stopPropagation();
			var distance = parseInt($('body').innerWidth() / 3);
			clearTimeout(movementTimer);
			if(!$('#introduction').hasClass('is-active') && mousestatus == 0){
				// console.log('moving');
				tl.fromTo('header', .15, {alpha:.1}, {alpha:1, ease: Power1.easeInOut});

		    	movementTimer = setTimeout(function()
		    	{
		    		tl.fromTo('header', .15, {alpha:1}, {alpha:.1, ease: Power1.easeInOut});
		    	}, 2000);

		    	if (event.pageX < distance) {
			        // console.log('left');
			        tl.to('.prev-arrow', .5, {drawSVG:"0% 100%", ease: Power1.easeInOut});
			        tl.to('#prev-next', .5, {alpha:1, ease:Power1.easeOut});
			        tl.to('#prev.is-in-use', .5, {alpha:1, ease:Power1.easeOut});
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




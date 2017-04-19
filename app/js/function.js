$(document).ready(function() {

  
    var tm = TweenMax;
    var tl = TweenLite;

    $('.video').attr('aria-hidden', 'true');

    // Mousemove
      
    var mousestatus = 0;

    function mouseTimeout(){
      mousestatus = 1;
      setTimeout(function(){
        mousestatus = 0;
        if($(window).width() > 1024 && !isMobile.detectMobile() && !$('#introduction').hasClass('is-active')){
          tl.to('.prev-next', .5, {alpha:0.08, ease:Power1.easeOut});
          tl.fromTo('header', .15, {alpha:1}, {alpha:1, ease: Power1.easeInOut});
        }
      },1750);
    } 

  // Get IE or Edge browser version
        var version = detectIE();

        if (version === false) {
          $('html').removeClass('IE');
        } 
        else if (version >= 12) {
          console.log('You are using IE');
          $('html').addClass('IE');

          $('body').on('click', function(e){
             var e = jQuery.Event("keydown");
             e.which = 17; // # Some key code value
             $("body").trigger(e);
             console.log('clicked');
          });
        } 
        else {
            console.log('You are using IE');
            $('html').addClass('IE');
          $('body').on('click', function(e){
             var e = jQuery.Event("keydown");
             e.which = 17; // # Some key code value
             $("body").trigger(e);
             console.log('clicked');
          });
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

  // Redirect History Push State URLs
    
    var pathname = window.location.pathname;
    console.log(pathname);

  // Create isMobile Function

    var isMobile = {
            detectMobile: function() {
                return navigator.userAgent.match(/Mobi/i);
            }
        };

    // Remove Video Controls
      
      $('.video').removeAttr('controls');

    // Add Videos if Desktop
      
      var dMenu = $('#desktop-menu')[0].cloneNode(true);
      var mMenu = $('#mobile-menu')[0].cloneNode(true);
      var desktop = $('#desktop')[0].cloneNode(true);
      var mobile = $('#mobile')[0].cloneNode(true);
      var resized = 0;
      var topNum1, topNum2, opa;

      $(window).resize(function(){
        if($(window).width() <= 1024 && !$('body').hasClass('mobile')) {
          $('main').html(mobile);
          $('#mobile').contents().filter(function(){return this.nodeType === 8;}).replaceWith(function(){return this.data;});
          console.log('mobile');
          opa=1;
          topNum1 = 0;
          topNum2 = 0;
          $('body').unbind('mousewheel');
          $('header').addClass('mobile-header');
          $('header > .container').html(mMenu);
          $('main, body').removeClass('desktop').addClass('mobile');
          $('body').unbind('mousemove');
          TweenMax.set('header', {clearProps:'all'});
          resized = 1;
          initMobileClicks();
        } 
        else if($(window).width() > 1024 && !$('body').hasClass('desktop')){
          $('main').html(desktop);
          $('#desktop').contents().filter(function(){return this.nodeType === 8;}).replaceWith(function(){return this.data;});
          $('header').removeClass('mobile-header');
          $('header > .container').html(dMenu);
          $('main, body').removeClass('mobile').addClass('desktop');

          setVariables();
          opa=0;
          topNum1 = -20;
          topNum2 = '3%';

          if(resized == 0) {
            $('#loop-0')[0].play();
            setTimeout(function(){
              resized = 1;
              initDesktopClicks();
            },200);
          }
          else if(resized == 1){
            console.log('desktop: ' + resized);

            setTimeout(function(){
              resized=0;
              goTo0();
              initDesktopClicks();
            },200);
            setTimeout(function(){
              goTo0();
              TweenMax.set('header', {clearProps:'all'});
              $('#loop-0')[0].play();
            },1000);
          };
        }
      }).resize();

      $('a.history').on('click',function(e){
        e.preventDefault();
      });

  // Mobile / Vision Click Functions
      
      function initMobileClicks(){
        $('#mobile-burger').on('click', function(){
          var $menu = $('#mobile-menu .menu');
          var $links = $menu.find('.mobile-link');

          if($menu.hasClass('is-active')){
            $menu.removeClass('is-active');
            $('.mobile-burger').removeClass('is-inactive');
            $('.mobile-close').addClass('is-inactive');
            $links.attr('tabindex', "-1").attr('aria-hidden', 'true');
            tm.fromTo('#mobile-menu .menu', .45, {display:'block', alpha:1}, {alpha:0, ease:Power1.easeInOut});
            tm.set('#mobile-menu .menu', {clearProps:'all', delay:.45});
          } else{
            $menu.addClass('is-active');
            $links.attr('tabindex', "").attr('aria-hidden', 'false');
            $('.mobile-burger').addClass('is-inactive');
            $('.mobile-close').removeClass('is-inactive');
            tm.fromTo('#mobile-menu .menu', .55, {display:'block', alpha:0, height:400}, {display:'block', alpha:1, height:400, ease:Power1.easeInOut});
          }
        });

        $(".menu > .absolute-center > a").on('click', function(){
          $('#mobile-burger').trigger('click');

          var link = $(this).attr('href');
          var secTop = $(link).offset().top;
          // var link = this.hash.substr(1);

          // TweenLite.to('#main', 1, {scrollTo:secTop - curScroll});

        });

        $('#play-vision-btn').on('click', function(){
          tm.fromTo('#vision-video', .75, {display:'block', alpha:0, zIndex:20}, {display:'block', alpha:1, zIndex:20, ease:Power1.easeInOut});

          $('#vision-video').addClass('is-active');
          $('#mobile-intro .hero').addClass('video-active');
          $('#vision-video')[0].play();
          $('#vision-video')[0].addEventListener('pause', checkState);
        });

      }

  // Desktop Click Functions
      
      function initDesktopClicks(){
        $('#burger').on('click', function(){
          var $header = $('#header-links');
          var $buttons = $header.find('.link button');

          if($header.hasClass('show-links')){
            $header.removeClass('show-links');
                $buttons.attr('tabindex', "-1").attr('aria-hidden', 'true');
            $('.burger').removeClass('is-inactive');
            $('.close').addClass('is-inactive');
          } else{
            $header.addClass('show-links');
                $buttons.attr('tabindex', "").attr('aria-hidden', 'false');
            $('.burger').addClass('is-inactive');
            $('.close').removeClass('is-inactive');
          }
        });

        // Popup Buttons

          $('#disclaimer-link').on('click', function(){
            $('#disclaimer-popup').addClass('popup-is-active');
            $('#disclaimer-popup, #disclaimer-popup button, #disclaimer-popup a').removeAttr('tabindex');
            $('section button, header a, header button').attr('tabindex', '-1');
          });

          $('#contact-link').on('click', function(){
            $('#contact-popup').addClass('popup-is-active');
            $('#contact-popup, #contact-popup button, #contact-popup a').removeAttr('tabindex');
            $('section button, header, header a, header button').attr('tabindex', '-1');
          });

          $('.close-btn').on('click', function(){
            $('.popup').removeClass('popup-is-active');
            $('.popup, .popup button, .popup a').attr('tabindex', '-1');
            $('section button, header a:not(.aetnacare-logo), header button, .active-logo').removeAttr('tabindex');
          });

          $('#vision-link').on('click', function(){
              tm.set('#vision-popup', {display:'block', alpha:0, className:'is-active-video'});
              tm.to('#vision-popup', .5, {alpha:1});
              $('#aetnacare-full-video').attr('tabindex', '0');
              $('#close-fs-video').addClass('is-active');
              $('#close-fs-video').focus();
              $('#vision-popup, #vision-popup button').removeAttr('tabindex');
              $('section button, header a, header button').attr('tabindex', '-1');
          });

          $('#close-fs-video').on('click', function(){
            $(this).removeClass('is-active');

            tm.to('#vision-popup', .5, {alpha:0});
            tm.set('#vision-popup', {display:'none', alpha:0, delay:.5, className:'-=is-active-video'});
            $('#vision-popup, #vision-popup button').attr('tabindex', '-1');
            $('section button, header a:not(.aetnacare-logo), header button, .active-logo').removeAttr('tabindex');
          });

        // Play/Pause Button
      
          $('#play-pause-btn').on('click', function(){
            if(!$('#play-pause').hasClass('play-active')){
              $('#play-pause').addClass('play-active');
              $('.scene-video').each(function(){
                var id = $(this).attr('id');
                $('#'+id)[0].pause();
              });
              pauseActiveTL();
              $('#sound-bar').trigger('click');
              if($('section:not(#introduction)').hasClass('is-active')){
                removeEvL();
              } else{
                console.log('No event Listeners to remove');
              };
            } else{
              $('#play-pause').removeClass('play-active');
              addEvL();
              getActiveVideo();
              activeVideo.play();
              playActiveTL();
              $('#sound-bar').trigger('click');
            }
          });
        
        // Previous Button

          $('.previous-button').on('click', function(){
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


      }

  // Set Interval
    
    function startGlobalIntervals(){
      function checkVideoOpacity(){
        if($("#videos").css('opacity') <= .2 && $(window).width() > 1024 && !$('#introduction').hasClass('is-active')){
          tl.to('header', .25, {alpha:1, ease:Power1.easeOut});
        } else if($("#videos").css('opacity') > .2 && $(window).width() > 1024 && ($("#desktop-menu button").is(":focus") || $("#desktop-menu a").is(":focus")) || $('#introduction').hasClass('is-active')){
          tl.to('header', .25, {alpha:1, ease:Power1.easeOut});
        } else {
          tl.to('header', .25, {alpha:1, ease:Power1.easeOut});
        }
      }

      var checkVO = setInterval(checkVideoOpacity,100);  

      function checkFocus(){
        if($(".previous-button").is(":focus") || $(".next-button").is(":focus")){
          tl.to('.is-active .prev-next-section', .25, {alpha:1, ease:Power1.easeOut});
        } else if($("#desktop-menu button").is(":focus") || $("#desktop-menu a").is(":focus")){
          tl.to('header', .25, {alpha:1, ease:Power1.easeOut});
        } else if($('skip-button').is(":focus")){
          tl.to
        }
      }

      var checkF = setInterval(checkFocus,100);

      function checkRest(){
        if($('div.content').css('opacity') > .5 && $('#introduction').hasClass('is-active')){
          tl.to('.prev-next-section', .25, {alpha:1, ease:Power1.easeOut});
          tl.to('.next-button', .25, {alpha:1, ease:Power1.easeOut});
          tl.to('.previous-button', .25, {alpha:.2, ease:Power1.easeOut});
        } else if($("#desktop-menu button").is(":focus") || $("#desktop-menu a").is(":focus")){
          tl.to('.prev-next-section', .25, {alpha:0, ease:Power1.easeOut});
        }
      }

      var checkR = setInterval(checkRest,100);
    }

  // Remove Focus On Click For Tab Index

    $('*').mousedown(function(event) {
      $('*').blur();
      $('*').addClass('no-focus');
    });

    $('*').bind('keydown', function(event) {
      $('*').removeClass('no-focus');
    });

      $('*').on('focus', function(ev){
        console.log(ev.target);
      });

      var $skipButton = $('#skip-button');

      function focusEnd() {
        $skipButton.addClass('hidden');
        $('section.is-active').find('h2').focus();
        $('section.is-active').find('h2').addClass('no-focus');
      }

    // Skip Video Button

      function setupSkipVideoButton(cb) {

        setTimeout(function(){
          $skipButton.removeClass('hidden')
        }, 0);
        $skipButton.off('click.currentTL');

        $skipButton.on('click.currentTL', cb);

        $skipButton.focus();
      }

  // Set Animations

    tm.set('.prev-next', {alpha:0});
    tm.set('nav', {alpha:0});
    tm.set(['.start-stroke', '.next-arrow', '.prev-arrow'], {drawSVG:"0% 0%"});
    tm.to('body', 1, {alpha:1, ease:Power2.easeInOut});
    tm.to('#loop-0', 1, {alpha:1, ease:Power2.easeInOut});

    var nexttxt1, next1, nexttxt2, next2, nexttxt3, next3, nexttxt4, next4, next5, descrText, chars2, sectitleText1, titleText1, wrds1, chars1, descrText1, chars12, sectitleText2, titleText2, wrds2, chars2, descrText2, chars22, sectitleText3, titleText3, wrds3, chars3, sectitleText4, titleText4, wrds4, chars4, sectitleText5, titleText5, wrds5, chars5, sectitleText6, titleText6, wrds6, chars6;

    function setVariables(){
      nexttxt1 = new SplitText("#next-journey .name", {type:"chars"}); 
        next1 = nexttxt1.chars;
        nexttxt2 = new SplitText("#next-identify .name", {type:"chars"}); 
        next2 = nexttxt2.chars;
        nexttxt3 = new SplitText("#next-connect .name", {type:"chars"}); 
        next3 = nexttxt3.chars;
        nexttxt4 = new SplitText("#next-guide .name", {type:"chars"}); 
        next4 = nexttxt4.chars;
        nexttxt5 = new SplitText("#next-support .name", {type:"chars"}); 
        next5 = nexttxt5.chars;
        descrText = new SplitText("#introduction .heading", {type:"words"});
        chars2 = descrText.words;
        sectitleText1 = new SplitText("#journey > .question", {type:"words"}); 
        titleText1 = new SplitText("#journey > .answer", {type:"words"});
        wrds1 = sectitleText1.words;
        chars1 = titleText1.words;
        sectitleText2 = new SplitText("#identify > .question", {type:"words"}); 
        titleText2 = new SplitText("#identify > .answer", {type:"words"}); 
        wrds2 = sectitleText2.words;
        chars22 = titleText2.words;
        sectitleText3 = new SplitText("#connect > .question", {type:"words"}); 
        titleText3 = new SplitText("#connect > .answer", {type:"words"});
        wrds3 = sectitleText3.words;
        chars3 = titleText3.words;
        sectitleText4 = new SplitText("#guide > .question", {type:"words"});
        titleText4 = new SplitText("#guide > .answer", {type:"words"});
        wrds4 = sectitleText4.words;
        chars4 = titleText4.words;
        sectitleText5 = new SplitText("#support > .question", {type:"words"});
        titleText5 = new SplitText("#support > .answer", {type:"words"});
        wrds5 = sectitleText5.words;
        chars5 = titleText5.words;
        sectitleText6 = new SplitText("#sustain > .question", {type:"words"});
        titleText6 = new SplitText("#sustain > .answer", {type:"words"});
        wrds6 = sectitleText6.words;
        chars6 = titleText6.words;
    }

  // Section Timelines

    var introTL = new TimelineLite();

      introTL.set('#introduction', {alpha:1}, "+=1.1")
           .fromTo('#introduction .section-title', .65, {alpha:0, y:20}, {alpha:1, y:0}, "+=0")
           .staggerFromTo(chars2, 0.5, {alpha:0, y:20}, {alpha:1, y:0}, 0.01, "+=0")
           .fromTo(['#journey-btn', '#vision-btn'], 0.5, {alpha:0, y:20}, {alpha:1, y:0}, "+=0")
           .fromTo('header', 0.5, {alpha:opa, y:topNum1}, {alpha:1, x:'-50%', y:topNum2}, "-=1.5")
           .fromTo('#volume-warning', 0.5, {alpha:0}, {alpha:1}, "-=1.5");

    var journeyTL = new TimelineMax({paused:true, onComplete: focusEnd}),
      journeyTL2 = new TimelineMax({paused:true});

    function startJourney() {
      journeyTL.set('#prev-journey', {alpha:0})
           .set([".next-button:not(:eq(0)) .name",'section:not(#journey)'], {className:'-=is-active'})
           .set(["#next-journey .name", '#journey'], {className:'+=is-active'})
           .set(next1, {alpha:0})
           .fromTo('#loop-0', .5, {alpha:1}, {alpha:0, ease:Power4.easeOut})
           .fromTo('.nav-item-label:eq(0)', .5, {alpha:.1}, {alpha:1, ease:Power4.easeOut},"-=.5")
           .fromTo(['#introduction','#volume-warning'], 1, {alpha:1}, {alpha:0, ease:Power4.easeOut},"-=1.5")
           .fromTo('.aetna-logo', 1, {alpha:1, y:'-50%'}, {alpha:0, y:'-70%', ease:Power4.easeOut},"-=.75")
           .fromTo('.aetnacare-logo', 1, {alpha:0, y:'-30%'}, {alpha:1, y:'-50%', className:'+=active-logo', ease:Power4.easeOut},"-=.5")
           .set('#introduction', {display:'none'})
           .fromTo('#journey', .5, {alpha:0, display:'inherit',x:'-50%',y:'-30%'}, {alpha:1,x:'-50%',y:'-50%', ease:Power4.easeIn},"-=.5")
           .staggerFromTo(wrds1, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.02, "+=10")
           .to('#videos', 1, {alpha:.65}, "-=1")
           .to(wrds1, 1.7, {y:-50, alpha:.4, ease: Power1.easeInOut}, "+=3")
           .fromTo(chars1, 1.5, {alpha:0, y:50}, {alpha:1,y:0, ease: Power1.easeOut},"-=1.1");

      journeyTL2.fromTo('#videos', 4, {alpha:.65}, {alpha:.2, ease: Power1.easeInOut}, "+=18")
            .staggerTo(wrds1, 1, {alpha:0, y:-80}, 0.01, "-=2")
            .staggerTo(chars1, 1, {alpha:0, y:-40}, 0.01, "-=1.5")
            .set('#play-pause-fs', {display:'none'})
            .set('#journey .content:eq(0)', {display:'inherit', height:'auto', autoAlpha:1, onComplete:startAudioLoop})
            .set([wrds1, chars1], {height:0, margin:0})
            .set('#journey div.content', {height:'auto'})
            .fromTo('#journey .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut})
            .set('#prev-next-journey', {display:'inherit'}, '+=1.5')
            .to('#prev-next-journey', .25, {alpha:1})
            .to('#next-journey', .5, {alpha:1},'-=.25')
            .to('#prev-journey', .5, {alpha:.2},'-=.25')
            .fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut})
            .staggerFromTo(next1, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01,"-=1")
            .to('#loop-1', .15, {alpha:1, ease:Power1.easeInOut});


      journeyTL.play();
      journeyTL2.play();

      $('#skip-button').one('click', function(){
        journeyTL.seek(journeyTL.duration(), false);
        journeyTL2.seek(journeyTL2.duration(), false);
        $('#video-1')[0].currentTime=$('#video-1')[0].duration;
        tl.set('#videos', {alpha:.2});
      });
    }

    var identifyTL = new TimelineMax({paused:true, onComplete: focusEnd}),
      identifyTL2 = new TimelineMax({paused:true});

    function startIdentify() {
      identifyTL.set([".next-button:not(:eq(1))",'section:not(#identify)'], {className:'-=is-active'},'+=1')
            .set(["#next-identify .name", '#identify'], {className:'+=is-active'})
            .set(next2, {alpha:0})
            .set('#prev-identify', {alpha:0, className:'previous-button fixed-left is-in-use'})
            .fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut})
            .staggerFromTo(next2, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.01, "-=1")
            .fromTo('#identify', .5, {alpha:0, display:'inherit',x:'-50%',y:'-30%'}, {alpha:1,x:'-50%',y:'-50%', ease:Power4.easeIn},"-=1")
            .to(['#prev-identify','#next-identify'], 1, {alpha:0, ease:Power1.easeOut})
            .staggerFromTo(wrds2, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.02, "+=12")
            .to('#videos', 1, {alpha:.65}, "-=1")
            .to(wrds2, 1.7, {y:-50, alpha:.4, ease: Power1.easeInOut}, "+=4")
            .fromTo(chars22, 1.5, {alpha:0, y:50}, {alpha:1,y:0, ease: Power1.easeOut},"-=1.1");

      identifyTL2.to('#videos', 4, {alpha:.2, ease: Power1.easeInOut}, "+=26")
             .staggerTo(wrds2, 1, {alpha:0, y:-80}, 0.01, "-=2")
             .staggerTo(chars22, 1, {alpha:0, y:-40}, 0.01, "-=1.5")
             .set('#play-pause-fs', {display:'none'})
             .set('#identify > .content', {display:'inherit', height:'auto', autoAlpha:1, onComplete:startAudioLoop}, "+=.25")
             .set([wrds2, chars22], {height:0, margin:0})
             .set('#identify div.content', {height:'auto'})
             .fromTo('#identify .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut})
             .set('#prev-next-identify', {display:'inherit', alpha:1}, '+=1.5')
             .to('#next-identify', .5, {alpha:1},'-=.25')
             .to('#prev-identify', .5, {alpha:.2},'-=.25')
             .fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut})
             .staggerFromTo(next2, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01, '-=.5')
             .to('#loop-2', .15, {alpha:1, ease:Power1.easeInOut});

      identifyTL.play();
      identifyTL2.play();

      $('#skip-button').one('click', function(){
          identifyTL.seek(identifyTL.duration(), false);
            identifyTL2.seek(identifyTL2.duration(), false);
          $('#video-2')[0].currentTime=$('#video-2')[0].duration;
          tl.set('#videos', {alpha:.2});
        });
    }

    var connectTL = new TimelineMax({paused:true, onComplete: focusEnd}),
      connectTL2 = new TimelineMax({paused:true});

    function startConnect() {
          // console.log('startConnect');
      
      connectTL.set([".next-button:not(:eq(2))",'section:not(#connect)'], {className:'-=is-active'},'+=1')
           .set(["#next-connect .name",'#connect'], {className:'+=is-active'})
           .set(next3, {alpha:0})
           .set('#prev-connect', {alpha:0, className:'previous-button fixed-left is-in-use'})
           .fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut})
           .staggerFromTo(next3, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.01, "-=1")
           .fromTo('#connect', .5, {alpha:0, display:'inherit',x:'-50%',y:'-30%'}, {alpha:1,x:'-50%',y:'-50%', ease:Power4.easeIn},"-=1")
           .staggerFromTo(wrds3, 1, {alpha:0, y:20}, {alpha:1, y:0}, 0.02, "+=8")
           .to('#videos', 1, {alpha:.65}, "-=1")
           .to(wrds3, 1.7, {y:-50, alpha:.4, ease: Power1.easeInOut}, "+=2")
           .fromTo(chars3, 1.5, {alpha:0, y:50}, {alpha:1,y:0, ease: Power1.easeOut},"-=1.1");

      connectTL2.to('#videos', 4, {alpha:.2, ease: Power1.easeInOut}, "+=21")
            .staggerTo(wrds3, 1, {alpha:0, y:-80}, 0.01, "-=2")
            .staggerTo(chars3, 1, {alpha:0, y:-40}, 0.01, "-=1.5")
            .set('#play-pause-fs', {display:'none'})
            .set('#connect .content:eq(0)', {display:'inherit', height:'auto', autoAlpha:1, onComplete:startAudioLoop}, "+=.25")
            .set([wrds3, chars3], {height:0, margin:0})
            .set('#connect div.content', {height:'auto'})
            .fromTo('#connect .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut})
            .set('#prev-next-connect', {display:'inherit', alpha:1}, '+=1.5')
            .to('#next-connect', .5, {alpha:1},'-=.25')
            .to('#prev-connect', .5, {alpha:.2},'-=.25')
            .fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut})
            .staggerFromTo(next3, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01)
            .to('#loop-3', .15, {alpha:1, ease:Power1.easeInOut});

      connectTL.play();
      connectTL2.play();

      $('#skip-button').one('click', function(){
            connectTL.seek(connectTL.duration(), false);
            connectTL2.seek(connectTL2.duration(), false);
            $('#video-3')[0].currentTime=$('#video-3')[0].duration;
            tl.set('#videos', {alpha:.2});
        });
    }

    var guideTL = new TimelineMax({paused:true, onComplete: focusEnd}),
      guideTL2 = new TimelineMax({paused:true});

    function startGuide() {
          // console.log('startGuide');
      guideTL.set([".next-button:not(:eq(3))",'section:not(#guide)'], {className:'-=is-active'},'+=1')
           .set(["#next-guide .name",'#guide'], {className:'+=is-active'})
           .set(next4, {alpha:0})
           .set('#prev-guide', {alpha:0, className:'previous-button fixed-left is-in-use'})
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
          .set([wrds4, chars4], {height:0, margin:0})
          .set('#guide div.content', {height:'auto'})
          .fromTo('#guide .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut})
          .set('#prev-next-guide', {display:'inherit', alpha:1}, '+=1.5')
          .to('#next-guide', .5, {alpha:1},'-=.25')
          .to('#prev-guide', .5, {alpha:.2},'-=.25')
          .fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut})
          .staggerFromTo(next4, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01)
          .to('#loop-4', .15, {alpha:1, ease:Power1.easeInOut});

      guideTL.play();
      guideTL2.play();

      $('#skip-button').one('click', function(){
            guideTL.seek(guideTL.duration(), false);
            guideTL2.seek(guideTL2.duration(), false);
            $('#video-4')[0].currentTime=$('#video-4')[0].duration;
            tl.set('#videos', {alpha:.2});
        });
    }

    var supportTL = new TimelineMax({paused:true, onComplete: focusEnd}),
      supportTL2 = new TimelineMax({paused:true});

    function startSupport() {
          // console.log('startSupport');
      supportTL.set([".next-button:not(:eq(4))",'section:not(#support)'], {className:'-=is-active'},'+=1')
           .set(["#next-support .name",'#support'], {className:'+=is-active'})
           .set(next5, {alpha:0})
           .set('#prev-support', {alpha:0, className:'previous-button fixed-left is-in-use'})
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
            .set([wrds5, chars5], {height:0, margin:0})
            .set('#support div.content', {height:'auto'})
            .fromTo('#support .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut})
            .set('#prev-next-support', {display:'inherit', alpha:1}, '+=1.5')
            .to('#next-support', .5, {alpha:1},'-=.25')
            .to('#prev-support', .5, {alpha:.2},'-=.25')
            .fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut})
            .staggerFromTo(next5, .5, {alpha:0, y:10}, {alpha:1, y:0}, 0.01)
            .to('#loop-5', .15, {alpha:1, ease:Power1.easeInOut});

      supportTL.play();
      supportTL2.play();

      $('#skip-button').one('click', function(){
            supportTL.seek(supportTL.duration(), false);
            supportTL2.seek(supportTL2.duration(), false);
            $('#video-5')[0].currentTime=$('#video-5')[0].duration;
            tl.set('#videos', {alpha:.2});
        });
    }

    var sustainTL = new TimelineMax({paused:true, onComplete: focusEnd}),
      sustainTL2 = new TimelineMax({paused:true});

    function startSustain() {
      sustainTL.set([".next-button:not(:eq(5))",'section:not(#sustain)'], {className:'-=is-active'},'+=1')
           .set(['#sustain'], {className:'+=is-active'})
           .set('#prev-sustain', {alpha:0, className:'previous-button fixed-left is-in-use'})
           .fromTo('#sustain', .5, {alpha:0, display:'inherit',x:'-50%',y:'-30%'}, {alpha:1,x:'-50%',y:'-50%', ease:Power4.easeIn})
           .staggerFromTo(wrds6, 1, {alpha:0, y:20}, {alpha:1, y:0}, 1.75, "+=19")
           .to('#videos', 1, {alpha:.65}, "-=1")
           .to(wrds6, 1.7, {y:-50, alpha:.4, ease: Power1.easeInOut}, "+=2.5")
           .fromTo(chars6, 1.5, {alpha:0, y:50}, {alpha:1,y:0, ease: Power1.easeOut},"-=1.1");

      sustainTL2.to('#videos', 4, {alpha:.2, ease: Power1.easeInOut}, "+=33")
            .staggerTo(wrds6, 1, {alpha:0, y:-80}, 0.01, "-=2")
            .staggerTo(chars6, 1, {alpha:0, y:-40}, 0.01, "-=1.5")
            .set('#play-pause-fs', {display:'none'})
            .set('#sustain .content:eq(0)', {display:'inherit', height:'auto', autoAlpha:1}, "+=.25")
            .set([wrds6, chars6], {height:0, margin:0})
            .set('#sustain div.content', {height:'auto'})
            .fromTo('#sustain .learn-more', 1, {display:'inherit', alpha:0, y:30}, {alpha:1, y:0, ease:Power1.easeOut})
            .set('#prev-next-sustain', {display:'inherit', alpha:1}, '+=1.5')
            .to('#next-support', .5, {alpha:0})
            .to('#prev-support', .5, {alpha:.2}, '-=.5')
            .to('#loop-6', .15, {alpha:1, ease:Power1.easeInOut});
      
      sustainTL.play();
      sustainTL2.play();

      $('#skip-button').one('click', function(){
            sustainTL.seek(sustainTL.duration(), false);
            sustainTL2.seek(sustainTL2.duration(), false);
            $('#video-6')[0].currentTime=$('#video-6')[0].duration;
            tl.set('#videos', {alpha:.2});
        });
    }


  // Button Hover Animations

    $('.start-btn').mouseenter(function(e){
      var stroke = $(this).find('.start-stroke');
      var triangle = $(this).find('.triangle');
      tm.fromTo(stroke, 1, {drawSVG:"100% 100%", ease: Power1.easeInOut}, {drawSVG:"0% 100%", ease: Power1.easeIn});
      tm.fromTo(triangle, .5, {y:0, alpha:1, ease: Power1.easeInOut}, {y:-4, alpha:0, ease: Power1.easeIn});
      tm.fromTo(triangle, .5, {y:4, alpha:0, ease: Power1.easeInOut}, {y:0, alpha:1, ease: Power1.easeInOut, delay:.5});
    });

    $('#vision-btn, #journey-btn, #restart-btn, #burger').mouseenter(function(e){
      var stroke = $(this).find('.rect-stroke');
      tm.fromTo(stroke, 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Sine.easeInOut});
    });

    function fireButtonAnimation() {
      var stroke = $('#vision-btn, #journey-btn, #restart-btn').find('.rect-stroke');
      tm.fromTo(stroke, 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Sine.easeInOut});
      tm.fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut})

      setTimeout(function(){
        tm.fromTo(stroke, 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Sine.easeInOut});
        tm.fromTo('.next-arrow', 1, {drawSVG:"0% 0%"}, {drawSVG:"0% 100%", ease: Power1.easeInOut})
      }, 3000);
      }

      setInterval(fireButtonAnimation, 6000);


  // Start Video Scenes
      
    var num, cat;
    var v1Dur, v2Dur, v3Dur, v4Dur, v5Dur, v6Dur;

    function startVideo() {
      if(!isMobile.detectMobile() && $(window).width() > 1024){
        $('#video-' + num)[0].currentTime = 0;
        setTimeout(function(){
          $('#video-' + num)[0].play();
        },2000);
        tm.set('#play-pause-fs', {display:'block'});
        eval("start" + cat + "()"); 
      };
    }

  // Pause Audio Loop
      
    function pauseAudio(){
      $('audio').each(function(){
        var id = $(this).attr('id');
        $('#'+id)[0].pause();
      });
    }

  // Check if Sound is Playing
      
    function checkifPaused(){
      $('audio').each(function(){
        var id = $(this).attr('id');
        if($('#'+id)[0].paused){
          
        }
      });
    }

  // Video Ended Function

    function checkTimeVideo(){
      if(!isMobile.detectMobile()){
        var $video = $('#video-' + num);
        var $loop = $('#loop-' + num);

        if($video[0].currentTime >= $video[0].duration-.5){
          tl.fromTo($video, 1, {alpha:1}, {alpha:0, ease:Power1.easeInOut, delay:.5});
          tl.fromTo($loop, .15, {alpha:0}, {alpha:1, ease:Power1.easeInOut});
          $video[0].removeEventListener('timeupdate', checkTimeVideo);
          $loop[0].play();
          $loop.attr('loop',1);

          console.log($video + ' is finished');
        }else{
          // console.log($video + ' is still playing');
        };  
      }
    }

  // Get Active Video

    var dataAttr, activeVideo, activeAudio, activeEvL, activeTL;

    function getActiveVideo(){
      dataAttr = $('section.is-active').attr('data-index');
      activeVideo = $('#video-' + dataAttr)[0];
      activeAudio = $('#audio-' + dataAttr)[0];
    }

  // Get Active Audio
    
    dataAttr = $('section.is-active').attr('data-index');
    activeAudio = $('#audio-' + dataAttr)[0];
    // console.log(activeAudio);
    function startAudioLoop() {
      dataAttr = $('section.is-active').attr('data-index');
      activeAudio = $('#audio-' + dataAttr)[0];
      activeAudio.play();
    }

  // Add/Remove Event Listeners

    function addEvL(){
      getActiveVideo();
      // console.log('activeVideo: ' + '#video-' + dataAttr);
      activeVideo.addEventListener('timeupdate', checkTimeVideo);
      activeVideo.play();
    }

    function removeEvL(){
      getActiveVideo();
      // console.log('activeVideo: ' + '#video-' + dataAttr);
      activeVideo.removeEventListener('timeupdate', checkTimeVideo);
      $('#video-1')[0].pause();
      $('#video-2')[0].pause();
      $('#video-3')[0].pause();
      $('#video-4')[0].pause();
      $('#video-5')[0].pause();
      $('#video-6')[0].pause();
      // console.log('activeAudio: ' + '#audio-' + dataAttr + activeAudio);
      pauseAudio();
    }

  // Pause/Play Active Timelines

    window.pause = pauseActiveTL;

    function pauseActiveTL(){
      console.log('paused');
      if(ffTL1.isActive() || journeyTL.isActive()) {
        activeTL = 1;
        ffTL1.pause();
        journeyTL.pause();
        journeyTL2.pause();
        // console.log('used');
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
    }

  // Buffering

    var checkInterval  = 50.0;
    var lastPlayPos    = 0;
    var currentPlayPos = 0;
    var bufferingDetected = false;

    setInterval(checkBuffering, checkInterval)
    function checkBuffering() {
      if(!$('#introduction').hasClass('is-active') && $(window).width() > 1024){
        getActiveVideo();
        currentPlayPos = activeVideo.currentTime

        // checking offset, e.g. 1 / 50ms = 0.02
        var offset = 1 / checkInterval

        // if no buffering is currently detected,
        // and the position does not seem to increase
        // and the player isn't manually paused...
        if (
                !bufferingDetected 
                && currentPlayPos < (lastPlayPos + offset)
                && !activeVideo.paused
            ) {
            console.log("buffering");
            pauseActiveTL();
            bufferingDetected = true;
        }

        // if we were buffering but the player has advanced,
        // then there is no buffering
        if (
            bufferingDetected 
            && currentPlayPos > (lastPlayPos + offset)
            && !activeVideo.paused
            ) {
            console.log("not buffering anymore");
            playActiveTL();
            bufferingDetected = false
        }
        lastPlayPos = currentPlayPos;
      }
    }


  // Go To Scene Timelines 

    var lastScene;

    var ffTL1 = new TimelineMax({paused:true});

    function FFtoJourney(){
          // console.log('FFtoJourney');
      $('#loop-0').removeAttr('loop');
      
      $('#video-1')[0].addEventListener('timeupdate', checkTimeVideo);
      v1Dur = parseInt($('#video-1')[0].duration) + 4;

      ffTL1.add('end',.5)
         .fromTo('#video-1', .25, {alpha:0}, {alpha:1, ease:Power1.easeInOut, onComplete:startVideo()}, 'end')
         .set('.loop-video', {alpha:0}, 'end')
         .set('.scene-video:not(#video-1)', {alpha:0}, 'end')
         .to('.nav-item:eq(0) .bar > span', v1Dur, {x:0}, 'end')
         .set('.nav-item:eq(0) .bar > span', {alpha:1}, 'end')
         .set('.nav-item:not(:eq(0)) .bar > span', {alpha:.2, clearProps:'transform'}, 'end')
         .fromTo('.nav-item-label:not(:eq(0))', .5, {alpha:1}, {alpha:.1, ease: Power1.easeInOut}, 'end')
         .fromTo('.nav-item-label:eq(0)', .5, {alpha:.1}, {alpha:1, ease: Power1.easeInOut}, 'end')
         .to('#videos', .5, {alpha:1, ease: Power1.easeInOut}, 'end')
         .to(['#next-journey','header'], .5, {alpha:1, ease: Power1.easeInOut}, 'end')
         .set(['#prev-journey'], {alpha:0}, 'end')
         .set(['#prev-next-journey'], {display:'none'}, 'end')
         .fromTo('nav', 0.5, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut}, 'end')
         .set('#introduction', {className:'-=is-active'}, 'end')
         .set(['#journey','#video-1'], {className:'+=is-active'}, 'end')
         .set('.scene-video:not(#video-1)', {className:'-=is-active'}, 'end');


      setupSkipVideoButton(function(){
        ffTL1.time(ffTL1.duration(), false);
        $('section.is-active').find('h2').focus();
        $('section.is-active').find('h2').addClass('no-focus');
        $skipButton.addClass('hidden');
      });

      ffTL1.play();
    }

    var ffTL2 = new TimelineMax({paused:true});

    function FFtoIdentify(){
      // console.log('FFtoIdentify');
      $('#loop-1').removeAttr('loop');
      function checkLoop1Time(){
        if (lastScene == 'journey' && $('#loop-1')[0].currentTime > 0 && $('#loop-1')[0].currentTime < $('#loop-1')[0].duration) {
          // do nothing
          // console.log($('#loop-1')[0].currentTime);
          tm.to(['#prev-next-journey', '#prev-journey', '#next-journey'], .75, {alpha:0, ease:Power1.easeOut});
          tm.set(['#prev-next-journey'], {display:'none', delay:.75});
          tm.to('#journey .learn-more', .75, {alpha:0, y:-30, ease:Power1.easeOut});
        } else {
          clearInterval(checkLoop1);
          $('#video-2')[0].addEventListener('timeupdate', checkTimeVideo);
          var v2Dur = parseInt($('#video-2')[0].duration) + 4;

          ffTL2.add('end',.01)
               .fromTo('#video-2', .5, {alpha:0}, {alpha:1, ease:Power1.easeInOut}, 'end')
               .to('#loop-1', .5, {alpha:0, ease:Power1.easeInOut}, 'end')
               .set('.scene-video:not(#video-2)', {alpha:0}, 'end')
               .set(['#video-2'], {className:'+=is-active', display:'inherit', alpha:1}, 'end')
               .to('#journey .learn-more', .75, {alpha:0, y:-30, ease:Power1.easeOut}, 'end')
               .fromTo('nav', .25, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut}, 'end')
               .to(['#prev-next-journey', '#prev-journey', '#next-journey'], .75, {alpha:0, ease:Power1.easeOut}, 'end')
               .to(['header'], .5, {alpha:1, ease:Power1.easeInOut}, 'end')
               .to('#videos', .5, {alpha:1, ease: Power1.easeInOut}, '+=.5')
               .set(['#prev-next-journey'], {display:'none'}, '-=1.75')
               .to('.loop-video:not(#loop-1)', .5, {alpha:0, onComplete:startVideo()}, '-=1')
               .set('.scene-video:not(#video-2)', {className:'-=is-active'}, 'end')
               .set('.nav-item:eq(1) .bar > span', {alpha:1}, 'end')
               .to('.nav-item:eq(1) .bar > span', v2Dur, {x:0}, 'end')
               .set('.nav-item:not(:eq(1)) .bar > span', {alpha:.1, clearProps:'transform'}, 'end')
               .fromTo('.nav-item-label:not(:eq(1))', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut}, 'end')
               .fromTo('.nav-item-label:eq(1)', .5, {alpha:.1}, {alpha:1, ease: Power1.easeInOut}, 'end');

          setupSkipVideoButton(function(){
            ffTL2.time(ffTL2.duration(), false);
            $('section.is-active').find('h2').focus();
            $('section.is-active').find('h2').addClass('no-focus');
            $skipButton.addClass('hidden');
          });

          setTimeout(function(){
            ffTL2.play();
          }, 200);
        }
      }
      var checkLoop1 = setInterval(checkLoop1Time, 100);
    }

    var ffTL3 = new TimelineMax({paused:true});

    function FFtoConnect(){
      // console.log('FFtoConnect');
      $('#loop-2').removeAttr('loop');
      function checkLoop2Time(){
        if (lastScene == 'identify' && $('#loop-2')[0].currentTime > 0 && $('#loop-2')[0].currentTime < $('#loop-2')[0].duration) {
          // do nothing
          // console.log($('#loop-2')[0].currentTime);
          tm.to(['#prev-next-identify', '#prev-identify', '#next-identify'], .75, {alpha:0, ease:Power1.easeOut});
          tm.set(['#prev-next-identify'], {display:'none', delay:.75});
          tm.to('#identify .learn-more', .75, {alpha:0, y:-30, ease:Power1.easeOut});
        } else {
          clearInterval(checkLoop2);
          $('#video-3')[0].addEventListener('timeupdate', checkTimeVideo);
          v3Dur = parseInt($('#video-3')[0].duration) + 4;

          ffTL3.add('end',.01)
             .fromTo('#video-3', .5, {alpha:0}, {className:'+=is-active', display:'inherit', alpha:1, ease:Power1.easeInOut}, 'end')
             .to('#loop-2', .5, {alpha:0, ease:Power1.easeInOut}, 'end')
             .set('.scene-video:not(#video-3)', {alpha:0}, 'end')
             .to('#identify .learn-more', .75, {alpha:0, y:-30, ease:Power1.easeOut}, 'end')
             .fromTo('nav', .25, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut}, 'end')
             .to(['#prev-next-identify', '#prev-identify', '#next-identify'], .75, {alpha:0, ease:Power1.easeOut}, 'end')
             .to(['header'], .5, {alpha:1, ease:Power1.easeInOut}, 'end')
             .to('#videos', .5, {alpha:1, ease: Power1.easeInOut}, '+=.5')
             .set(['#prev-next-identify'], {display:'none'}, '-=1.75')
             .to('.loop-video:not(#loop-2)', .5, {alpha:0, onComplete:startVideo()})
             .set('.scene-video:not(#video-3)', {className:'-=is-active'}, 'end')
             .set('.nav-item:eq(2) .bar > span', {alpha:1}, 'end')
             .to('.nav-item:eq(2) .bar > span', v3Dur, {x:0}, 'end')
             .set('.nav-item:not(:eq(2)) .bar > span', {alpha:.1, clearProps:'transform'}, 'end')
             .fromTo('.nav-item-label:not(:eq(2))', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut}, 'end')
             .fromTo('.nav-item-label:eq(2)', .5, {alpha:.1}, {alpha:1, ease: Power1.easeInOut}, 'end');

          setupSkipVideoButton(function(){
            ffTL3.time(ffTL3.duration(), false);
            $('section.is-active').find('h2').focus();
            $('section.is-active').find('h2').addClass('no-focus');
            $skipButton.addClass('hidden');
          });

          setTimeout(function(){
            ffTL3.play();
          }, 200);    
        } 
      }

      var checkLoop2 = setInterval(checkLoop2Time, 100);

    }

    var ffTL4 = new TimelineMax({paused:true});

    function FFtoGuide(){
      // console.log('FFtoGuide');
      $('#loop-3').removeAttr('loop');
      function checkLoop3Time(){
        if (lastScene == 'connect' && $('#loop-3')[0].currentTime > 0 && $('#loop-3')[0].currentTime < $('#loop-3')[0].duration) {
          // do nothing
          // console.log($('#loop-3')[0].currentTime);
          tm.to(['#prev-next-guide', '#prev-guide', '#next-guide'], .75, {alpha:0, ease:Power1.easeOut});
          tm.set(['#prev-next-guide'], {display:'none', delay:.75});
          tm.to('#connect .learn-more', .75, {alpha:0, y:-30, ease:Power1.easeOut});
        } else {
          clearInterval(checkLoop3);
          $('#video-4')[0].addEventListener('timeupdate', checkTimeVideo);
          v4Dur = parseInt($('#video-4')[0].duration) + 4;

          ffTL4.add('end',.01)
             .fromTo('#video-4', .5, {alpha:0}, {alpha:1, ease:Power1.easeInOut}, 'end')
             .to('#loop-3', .5, {alpha:0, ease:Power1.easeInOut}, 'end')
             .set('.scene-video:not(#video-4)', {alpha:0}, 'end')
             .set(['#video-4'], {className:'+=is-active', display:'inherit', alpha:1}, 'end')
             .to('#connect .learn-more', .75, {alpha:0, y:-30, ease:Power1.easeOut}, 'end')
             .fromTo('nav', .25, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut}, 'end')
             .to(['#prev-next-guide', '#prev-guide', '#next-guide'], .75, {alpha:0, ease:Power1.easeOut}, 'end')
             .to(['header'], .5, {alpha:1, ease:Power1.easeInOut}, 'end')
             .to('#videos', .5, {alpha:1, ease: Power1.easeInOut}, '+=.5')
             .set(['#prev-next-guide'], {display:'none'}, '-=1.75')
             .to('.loop-video:not(#loop-3)', .5, {alpha:0, onComplete:startVideo()}, '-=1')
             .set('.scene-video:not(#video-4)', {className:'-=is-active'}, 'end')
             .set('.nav-item:eq(3) .bar > span', {alpha:1}, 'end')
             .to('.nav-item:eq(3) .bar > span', v4Dur, {x:0}, 'end')
             .set('.nav-item:not(:eq(3)) .bar > span', {alpha:.1, clearProps:'transform'}, 'end')
             .fromTo('.nav-item-label:not(:eq(3))', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut}, 'end')
             .fromTo('.nav-item-label:eq(3)', .5, {alpha:.1}, {alpha:1, ease: Power1.easeInOut}, 'end');

          setupSkipVideoButton(function(){
            ffTL4.time(ffTL4.duration(), false);
            $('section.is-active').find('h2').focus();
            $('section.is-active').find('h2').addClass('no-focus');
            $skipButton.addClass('hidden');
          });

          setTimeout(function(){
            ffTL4.play();
          }, 200);
        }
      }

      var checkLoop3 = setInterval(checkLoop3Time, 100);
    }

    var ffTL5 = new TimelineMax({paused:true});

    function FFtoSupport(){
      // console.log('FFtoSupport');
      $('#loop-4').removeAttr('loop');
      function checkLoop4Time(){
        if (lastScene == 'guide' && $('#loop-4')[0].currentTime > 0 && $('#loop-4')[0].currentTime < $('#loop-4')[0].duration) {
          // do nothing
          // console.log($('#loop-4')[0].currentTime);
        } else {
          clearInterval(checkLoop4);
          $('#video-5')[0].addEventListener('timeupdate', checkTimeVideo);
          v5Dur = parseInt($('#video-5')[0].duration) + 4;

          ffTL5.add('end',.01)
             .to('#video-5', .5, {alpha:1, ease:Power1.easeInOut}, 'end')
             .to('#loop-4', .5, {alpha:0, ease:Power1.easeInOut}, 'end')
             .set('.scene-video:not(#video-5)', {alpha:0}, 'end')
             .set(['#video-5'], {className:'+=is-active', display:'inherit', alpha:1}, 'end')
             .fromTo('#guide .learn-more', .75, {alpha:1, y:0}, {alpha:0, y:-30, ease:Power1.easeOut}, 'end')
             .fromTo('nav', .25, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut}, 'end')
             .to(['#prev-next-support', '#prev-support', '#next-support'], .75, {alpha:0, ease:Power1.easeOut}, 'end')
             .to(['header'], .5, {alpha:1, ease:Power1.easeInOut}, 'end')
             .to('#videos', .5, {alpha:1, ease: Power1.easeInOut}, '+=.5')
             .set(['#prev-next-support'], {display:'none'}, '-=1.75')
             .to('.loop-video:not(#loop-4)', .5, {alpha:0, onComplete:startVideo()}, '-=1')
             .set('.scene-video:not(#video-5)', {className:'-=is-active'}, 'end')
             .set('.nav-item:eq(4) .bar > span', {alpha:1}, 'end')
             .to('.nav-item:eq(4) .bar > span', v5Dur, {x:0}, 'end')
             .set('.nav-item:not(:eq(4)) .bar > span', {alpha:.1, clearProps:'transform'}, 'end')
             .fromTo('.nav-item-label:not(:eq(4))', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut}, 'end')
             .fromTo('.nav-item-label:eq(4)', .5, {alpha:.1}, {alpha:1, ease: Power1.easeInOut}, 'end');

          setupSkipVideoButton(function(){
            ffTL5.time(ffTL5.duration(), false);
            $('section.is-active').find('h2').focus();
            $('section.is-active').find('h2').addClass('no-focus');
            $skipButton.addClass('hidden');
          });

          setTimeout(function(){
            ffTL5.play();
          }, 200);
        }
      }

      var checkLoop4 = setInterval(checkLoop4Time, 100);

    }

    var ffTL6 = new TimelineMax({paused:true});

    function FFtoSustain(){
      // console.log('FFtoSustain');
      $('#loop-5').removeAttr('loop');
      function checkLoop5Time(){
        if (lastScene == 'journey' && $('#loop-5')[0].currentTime > 0 && $('#loop-5')[0].currentTime < $('#loop-5')[0].duration) {
          // do nothing
          // console.log($('#loop-5')[0].currentTime);
        } else {
          clearInterval(checkLoop5);
          $('#video-6')[0].addEventListener('timeupdate', checkTimeVideo);
          v6Dur = parseInt($('#video-6')[0].duration) + 4;

          ffTL6.add('end',.01)
             .fromTo('#video-6', .5, {alpha:0}, {alpha:1, ease:Power1.easeInOut}, 'end')
             .to('#loop-5', .5, {alpha:0, ease:Power1.easeInOut}, 'end')
             .set('.scene-video:not(#video-6)', {alpha:0}, 'end')
             .set(['#video-6'], {className:'+=is-active', display:'inherit', alpha:1}, 'end')
             .fromTo('#support .learn-more', .75, {alpha:1, y:0}, {alpha:0, y:-30, ease:Power1.easeOut}, 'end')
             .fromTo('nav', .25, {alpha:0, display:'block'}, {alpha:1, ease: Power1.easeInOut}, 'end')
             .to(['#prev-next-sustain', '#prev-sustain'], .75, {alpha:0, ease:Power1.easeOut}, 'end')
             .to(['header'], .5, {alpha:1, ease:Power1.easeInOut}, 'end')
             .to('#videos', .5, {alpha:1, ease: Power1.easeInOut}, '+=.5')
             .set(['#prev-next-sustain'], {display:'none'}, '-=1.75')
             .to('.loop-video:not(#loop-5)', .5, {alpha:0, onComplete:startVideo()}, '-=1')
             .set('.scene-video:not(#video-6)', {className:'-=is-active'}, 'end')
             .set('.nav-item:eq(5) .bar > span', {alpha:1}, 'end')
             .to('.nav-item:eq(5) .bar > span', v6Dur, {x:0}, 'end')
             .set('.nav-item:not(:eq(5)) .bar > span', {alpha:.1, clearProps:'transform'}, 'end')
             .fromTo('.nav-item-label:not(:eq(5))', .5, {alpha:1}, {alpha:.2, ease: Power1.easeInOut}, 'end')
             .fromTo('.nav-item-label:eq(5)', .5, {alpha:.1}, {alpha:1, ease: Power1.easeInOut}, 'end');

          setupSkipVideoButton(function(){
            ffTL6.time(ffTL6.duration(), false);
            $('section.is-active').find('h2').focus();
            $('section.is-active').find('h2').addClass('no-focus');
            $skipButton.addClass('hidden');
          });

          setTimeout(function(){
            ffTL6.play();
          }, 200);
        }
      }

      var checkLoop5 = setInterval(checkLoop5Time, 100);
    }

  // Skip Functions

    function skipJourney(){
      if(journeyTL.isActive()){
        var timeline = new TimelineMax({onComplete:ffJourney});
        $('#video-1')[0].currentTime = $('#video-1')[0].duration;
        journeyTL.seek(journeyTL.duration(), false);
        journeyTL2.seek(journeyTL2.duration(), false);

      } else{
        ffJourney();
      }
    }

    function ffJourney(){
      FFtoIdentify();
      $('#video-1')[0].removeEventListener('timeupdate', checkTimeVideo);
    }

    function skipIdentify(){
      if(identifyTL.isActive()){
        var timeline = new TimelineMax({onComplete:ffIdentify});
        $('#video-2')[0].currentTime = $('#video-2')[0].duration;
        identifyTL.seek(identifyTL.duration(), false);
        identifyTL2.seek(identifyTL2.duration(), false);

      } else{
        ffIdentify();
      }
    }

    function ffIdentify(){
      FFtoConnect();
      $('#video-2')[0].removeEventListener('timeupdate', checkTimeVideo);
    }

    function skipConnect(){
      if(connectTL.isActive()){
        var timeline = new TimelineMax({onComplete:ffConnect});
        $('#video-3')[0].currentTime = $('#video-3')[0].duration;
        connectTL.seek(connectTL.duration(), false);
        connectTL2.seek(connectTL2.duration(), false);
      } else{
        ffConnect();
      }
    }

    function ffConnect(){
      FFtoGuide();
      $('#video-3')[0].removeEventListener('timeupdate', checkTimeVideo);
    }

    function skipGuide(){
      if(guideTL.isActive()){
        var timeline = new TimelineMax({onComplete:ffGuide});
        $('#video-4')[0].currentTime = $('#video-4')[0].duration;
        guideTL.seek(guideTL.duration(), false);
        guideTL2.seek(guideTL2.duration(), false);
      } else{
        ffGuide();
      }
    }

    function ffGuide(){
      FFtoSupport();
      $('#video-4')[0].removeEventListener('timeupdate', checkTimeVideo);
    }

    function skipSupport(){
      if(supportTL.isActive()){
        var timeline = new TimelineMax({onComplete:ffSupport});
        $('#video-5')[0].currentTime = $('#video-5')[0].duration;
        supportTL.seek(supportTL.duration(), false);
        supportTL2.seek(supportTL2.duration(), false);
      } else{
        ffSupport();
      }
    }

    function ffSupport(){
      FFtoSustain();
      $('#video-5')[0].removeEventListener('timeupdate', checkTimeVideo);
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
      // tl.to(['#videos','section'], .5, {alpha:0, ease:Power1.easeOut});
      // tl.set(['section','.prev-next', '.previous-button', '.next-button'], {alpha:0});
      // tl.set('#videos', {alpha:1, ease:Power1.easeOut, delay:.6});
      // tl.set('section.is-active', {alpha:1, delay:.6});
      tl.to('body', 1, {alpha:1, ease:Power1.easeOut, delay:1.5});
      // tl.to(['.prev-next', '.previous-button', '.next-button'], .75, {alpha:0, ease:Power1.easeOut}, 'end')
      // tl.to(['header'], .5, {alpha:1, ease:Power1.easeInOut}, 'end')
      // tl.set(['.prev-next'], {display:'none', delay:.85});
      tl.set('.prev-next-section',{display:'none'});
    }




  // Start Button Click Functions

    // $('#journey-btn').on('click', function(e){
    //  e.preventDefault();
    //  FFtoJourney();
    //  mouseTimeout();
    // });

  // Skip Current

      function skipCurrent() {
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
      }

  // Next Button

    // $('.next-button').on('click', function(e){
    //  mouseTimeout();
    //  skipCurrent();
    // });

  // Skip Button Functions

    // $('#skip-backward').on('click', function(){
    //   if($('#journey').hasClass('is-active')){
    //     console.log('you are at the first scene');
    //   }
    //   else if($('#identify').hasClass('is-active')){
    //     goTo1();
    //   }
    //   else if($('#connect').hasClass('is-active')){
    //     goTo2();
    //   }
    //   else if($('#guide').hasClass('is-active')){
    //     goTo3();
    //   }
    //   else if($('#support').hasClass('is-active')){
    //     goTo4();
    //   }
    //   else if($('#sustain').hasClass('is-active')){
    //     goTo5();
    //   };
    // });

    // $('#skip-forward').on('click', function(){
    //   if($('#journey').hasClass('is-active')){
    //     goTo2();
    //   }
    //   else if($('#identify').hasClass('is-active')){
    //     goTo3();
    //   }
    //   else if($('#connect').hasClass('is-active')){
    //     goTo4();
    //   }
    //   else if($('#guide').hasClass('is-active')){
    //     goTo5();
    //   }
    //   else if($('#support').hasClass('is-active')){
    //     goTo6();
    //   }
    //   else if($('#sustain').hasClass('is-active')){
    //     console.log("you've reached the end");
    //   };
    // });


  // Learn More Button

    // $('#journey .more-btn').on('click', function(e){
    //   e.preventDefault();
    //   journeyScrollDown();
    //   console.log('clicked');
    //   mouseTimeout();
    // });

  // Show Links

    // $('#header-links').mouseover(function() {
    //    if(!$('#introduction').hasClass('is-active') || !$('#conclusion').hasClass('is-active') || $('#videos').css('opacity') > .2){
    //      mouseTimeout();
    //  };
    // }).mouseout(function() {
    //    if(!$('#introduction').hasClass('is-active') || !$('#conclusion').hasClass('is-active') || $('#videos').css('opacity') > .2){
    //      mouseTimeout();
    //    };
    // });

    // $('#sound-bar').on('click',function(){
    //   if($('#sound-bar .bar:eq(0)').hasClass('soundbar')){
    //     $('#sound-bar .bar').removeClass('soundbar soundbar2 soundbar3');
    //     $('audio, video').attr('muted', 0);
    //     tm.set('#sound-bar .bar', {height:1});
    //   } else {
    //     $('#sound-bar .bar:eq(0)').addClass('soundbar');
    //     $('#sound-bar .bar:eq(1), #sound-bar .bar:eq(4)').addClass('soundbar2');
    //     $('#sound-bar .bar:eq(2), #sound-bar .bar:eq(3)').addClass('soundbar3');
    //     $('audio, video').attr('muted', 1);
    //     tm.set('#sound-bar .bar', {clearProps:'height'});
    //   }
    // });

    function checkState(){
      $('#vision-video')[0].removeEventListener('pause', checkState);
      tm.to('#vision-video', .75, {alpha:0, ease:Power1.easeInOut});
      tm.set('#vision-video',{display:'none', zIndex:-20, delay:.75});
      
      setTimeout(function(){
        $('#mobile-intro .hero').removeClass('video-active');
      },500);
      setTimeout(function(){
        $('#vision-video').removeClass('is-active');
        $('#mobile-intro .hero').removeClass('video-active');
      },750);
    }


  // Mousemove

    var movementTimer;
    $('body').mousemove(function(event) {
      // console.log('event page: ' + event.pageX);
      // event.stopPropagation();
      var distance = parseInt($('body').innerWidth() / 3);

      if(!$('#introduction').hasClass('is-active') && $('#videos').css('opacity') > .2 && mousestatus == 0){
        // console.log('moving');
        clearTimeout(movementTimer);
        tl.fromTo('header', .15, {alpha:1}, {alpha:1, ease: Power1.easeInOut});

          movementTimer = setTimeout(function()
          {
            // tl.fromTo('header', .15, {alpha:1}, {alpha:.1, ease: Power1.easeInOut});
          }, 2000);

          if (event.pageX < distance) {
              // console.log('left');
              tl.to('.prev-arrow', .5, {drawSVG:"0% 100%", ease: Power1.easeInOut});
              tl.to('.is-active .prev-next-section', .5, {alpha:1, ease:Power1.easeOut});
              tl.to('.is-active .previous-button', .5, {alpha:.1, ease:Power1.easeOut});
              tl.to('.is-active .next-button', .5, {alpha:.08, ease:Power1.easeOut});
              mouseTimeout();
          }
          else if (event.pageX > distance*2) {
              // console.log('right');
              tl.to('.next-arrow', .5, {drawSVG:"0% 100%", ease: Power1.easeInOut});
              tl.to('.is-active .prev-next-section', .5, {alpha:1, ease:Power1.easeOut});
              tl.to('.is-active .previous-button', .5, {alpha:.08, ease:Power1.easeOut});
              tl.to('.is-active .next-button', .5, {alpha:1, ease:Power1.easeOut});
              mouseTimeout();
          }
      } else if($('#videos').css('opacity') <= .2 && !$('#introduction').hasClass('is-active')){
        tl.to('header', .15, {alpha:1, ease: Power1.easeInOut});
        tl.to('.is-active .prev-next-section', .5, {alpha:1, ease:Power1.easeOut});
        tl.to(['.is-active .next-button'], .5, {alpha:1, ease:Power1.easeOut});
        tl.to(['.is-active .previous-button'], .5, {alpha:.5, ease:Power1.easeOut});
      } else if($('#sustain').hasClass('is-active')){
        tl.to('header', .15, {alpha:1, ease: Power1.easeInOut});
        tl.to('#prev-next-sustain', .5, {alpha:1, ease:Power1.easeOut});
        tl.to(['#next-sustain'], .5, {alpha:1, ease:Power1.easeOut});
        tl.to(['#prev-sustain'], .5, {alpha:.1, ease:Power1.easeOut});
      };

    });

  // Hide Pages from Aria

    function addAriaHiddenPages(){

    }

  // Individual Timeline Navigation Functions

    // Home Navigation Function
      
      var initialLoad = 0; 
      var goTo0 = function(){
        num = 0;
        console.log('0 called');
        startGlobalIntervals();
        
        $('.aetna-logo').removeAttr('tabindex');
        $('.aetnacare-logo').attr('tabindex', '-1');
        $('.aetna-logo').addClass('active-logo');
        $('.aetnacare-logo').removeClass('active-logo');

        if(initialLoad !=0){

          if($('body').hasClass('vision')){
            $('body').removeClass('vision');
            $('main').removeClass('vision');
            $('header').removeClass('mobile-header');
            $('header > .container').html(dMenu);
            $('#mobile').remove();

            setTimeout(function(){
              initDesktopClicks();
            },200);
          };

          startGlobalIntervals();
          if($('section:not(#introduction)').hasClass('is-active')){
            removeEvL();
            pauseAudio();
          } else{
            console.log('No event Listeners to remove');
          };  

          tl.to('.loop-video:not(#loop-0)', .5, {alpha:0});
          journeyTL.seek(0, false).pause(0).clear(); journeyTL2.seek(0, false).pause(0).clear();
          identifyTL.seek(0, false).pause(0).clear(); identifyTL2.seek(0, false).pause(0).clear();
          connectTL.seek(0, false).pause(0).clear(); connectTL2.seek(0, false).pause(0).clear();
          guideTL.seek(0, false).pause(0).clear(); guideTL2.seek(0, false).pause(0).clear();
          supportTL.seek(0, false).pause(0).clear(); supportTL2.seek(0, false).pause(0).clear();
          sustainTL.seek(0, false).pause(0).clear(); sustainTL2.seek(0, false).pause(0).clear();

          ffTL1.seek(0, false).pause(0).clear();
          ffTL2.seek(0, false).pause(0).clear();
          ffTL3.seek(0, false).pause(0).clear();
          ffTL4.seek(0, false).pause(0).clear();
          ffTL5.seek(0, false).pause(0).clear();
          ffTL6.seek(0, false).pause(0).clear();

          $('section:not(#introduction)').removeClass('is-active');
          
          tl.set(['#loop-0', '#introduction'],{alpha:1, clearProps:'display'});
          
          tl.set('#videos',{alpha:.27});
          
          tl.to('body', .5, {alpha:0, ease:Power1.easeOut});
          tl.to('body', 1, {alpha:1, ease:Power1.easeOut, delay:1.5});
          tl.to('.video:not(#loop-0)', .5, {alpha:0});

          introTL.seek(0, false).play();
          tl.set('#play-pause-fs', {clearProps:'all'});

          $('#introduction').addClass('is-active');

          tm.set('#volume-warning', {display: 'inherit'});

          if($(window).width() > 1024 || !isMobile.detectMobile()){
              $('#loop-0')[0].play();
              $('#loop-0').attr('loop', 1);
              tm.to('#loop-0', 1, {alpha:1, ease:Power2.easeInOut});
            } 
            else if($(window).width() <= 1024 && !isMobile.detectMobile()) {
              $('#loop-0')[0].play();
              $('#loop-0').attr('loop', 1);
              tm.to('#loop-0', 1, {alpha:1, ease:Power2.easeInOut});
            };
        } else{
          setTimeout(function(){
            initialLoad=1;
          },400);
        }
        
      };

    // Journey Navigation Function
      
      var goTo1 = function() {
        initDesktopClicks();
        if(skipTimer === 0){
          num = 1;
          cat = 'Journey';
          skipTimeout();
          console.log('clicked 2');
          $('.aetna-logo').attr('tabindex', '-1');
          $('.aetnacare-logo').removeAttr('tabindex');
          $('.aetna-logo').removeClass('active-logo');
          $('.aetnacare-logo').addClass('active-logo');
          

          if($('#journey').hasClass('is-active') ){
            // do nothing
          } else{
            hideChanges();
            console.log('heyy');
            pauseAudio();
            journeyTL.seek(0, false).pause(0).clear(); journeyTL2.seek(0, false).pause(0).clear();
            identifyTL.seek(0, false).pause(0).clear(); identifyTL2.seek(0, false).pause(0).clear();
            connectTL.seek(0, false).pause(0).clear(); connectTL2.seek(0, false).pause(0).clear();
            guideTL.seek(0, false).pause(0).clear(); guideTL2.seek(0, false).pause(0).clear();
            supportTL.seek(0, false).pause(0).clear(); supportTL2.seek(0, false).pause(0).clear();
            sustainTL.seek(0, false).pause(0).clear(); sustainTL2.seek(0, false).pause(0).clear();

            ffTL1.seek(0, false).pause(0).clear();
            ffTL2.seek(0, false).pause(0).clear();
            ffTL3.seek(0, false).pause(0).clear();
            ffTL4.seek(0, false).pause(0).clear();
            ffTL5.seek(0, false).pause(0).clear();
            ffTL6.seek(0, false).pause(0).clear();

            tm.set('#volume-warning', {display: 'none'});

            if($('section:not(#introduction)').hasClass('is-active')){
              removeEvL();
            } else{
              console.log('No event Listeners to remove');
            };

            tl.to('.loop-video:not(#loop-0,#video-1)', .5, {alpha:0});
            tl.set(['section:not(#journey)', 'section:not(#introduction)'], {display:'none', clearProps:'transform'});
            
            FFtoJourney();
          }
        };
      };

      // Mobile 

    // Identify Navigation Function
      
      var goTo2 = function() {
        initDesktopClicks();
        if(skipTimer === 0){
          num = 2;
          cat = 'Identify';
          skipTimeout();
          if($('#journey').hasClass('is-active') && $('#videos').css('opacity') <= .2){
            lastScene = 'journey';
            skipJourney();
            pauseAudio();
          }
          else if($('#identify').hasClass('is-active')){
            // do nothing
          } else{
            hideChanges();
            pauseAudio();
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

              journeyTL.pause(0).seek(journeyTL.duration(), false);
              ffTL1.pause(0).seek(ffTL1.duration(), false); 

              removeEvL();
              tm.set('#volume-warning', {display: 'none'});

              tl.to('.loop-video:not(#loop-0,#video-2)', .5, {alpha:0});
            
              tl.set(['section:not(#identify)', 'section:not(#introduction)'], {display:'none', clearProps:'transform'});
              FFtoIdentify();
            },400);
          };  
        };  
      };

    // Connect Navigation Function
      
      var goTo3 = function() {
        initDesktopClicks();
        if(skipTimer === 0){
          num = 3;
          cat = 'Connect';
          skipTimeout();

          if($('#identify').hasClass('is-active') && $('#videos').css('opacity') <= .2){
            lastScene = 'identify';
            skipIdentify(); 
            pauseAudio();
          } 
          else if($('#connect').hasClass('is-active')){
            // do nothing
          } 
          else{
            hideChanges();
            tl.to('.loop-video:not(#loop-0,#video-3)', .5, {alpha:0});
            pauseAudio();
            setTimeout(function(){
              connectTL.pause(0).clear(); connectTL2.pause(0).clear();
              guideTL.pause(0).clear(); guideTL2.pause(0).clear();
              supportTL.pause(0).clear(); supportTL2.pause(0).clear();
              sustainTL.pause(0).clear(); sustainTL2.pause(0).clear();

              ffTL3.pause(0).clear();
              ffTL4.pause(0).clear();
              ffTL5.pause(0).clear();
              ffTL6.pause(0).clear();
              
              journeyTL.pause(0).seek(journeyTL.duration(), false); 
              journeyTL2.pause(0).seek(journeyTL2.duration(), false);
              identifyTL.pause(0).seek(identifyTL.duration(), false); 
              identifyTL2.pause(0).seek(identifyTL2.duration(), false);

              ffTL1.pause(0).seek(ffTL1.duration(), false);
              ffTL2.pause(0).seek(ffTL2.duration(), false);
              tm.set('#volume-warning', {display: 'none'});

              removeEvL();
              tl.set(['section:not(#connect)', 'section:not(#introduction)'], {display:'none', clearProps:'transform'});  
              FFtoConnect();
            },400);
          };
        };
      };

    // Guide Navigation Function
      
      var goTo4 = function() {
        initDesktopClicks();
        if(skipTimer === 0){
          num = 4;
          cat = 'Guide';
          skipTimeout();
          
          if($('#connect').hasClass('is-active') && $('#videos').css('opacity') <= .2){
            lastScene = 'connect';
            skipConnect();
            pauseAudio();
          }
          else if($('#guide').hasClass('is-active')){
            
          }
          else{
            hideChanges();
            tl.to('.loop-video:not(#loop-0,#video-4)', .5, {alpha:0});
            pauseAudio();
            setTimeout(function(){
              guideTL.pause(0).clear(); guideTL2.pause(0).clear();
              supportTL.pause(0).clear(); supportTL2.pause(0).clear();
              sustainTL.pause(0).clear(); sustainTL2.pause(0).clear();

              ffTL4.pause(0).clear();
              ffTL5.pause(0).clear();
              ffTL6.pause(0).clear();
              
              journeyTL.pause(0).seek(journeyTL.duration(), false); 
              journeyTL2.pause(0).seek(journeyTL2.duration(), false);
              identifyTL.pause(0).seek(identifyTL.duration(), false); 
              identifyTL2.pause(0).seek(identifyTL2.duration(), false);
              connectTL.pause(0).seek(connectTL.duration(), false); 
              connectTL2.pause(0).seek(connectTL2.duration(), false);

              ffTL1.pause(0).seek(ffTL1.duration(), false);
              ffTL2.pause(0).seek(ffTL2.duration(), false);
              ffTL3.pause(0).seek(ffTL3.duration(), false);
              tm.set('#volume-warning', {display: 'none'});

              removeEvL();
              tl.set(['section:not(#guide)', 'section:not(#introduction)'], {display:'none', clearProps:'transform'});
              FFtoGuide();
            },400);
          };
        };
      };

    // Support Navigation Function
      
      var goTo5 = function() {
        initDesktopClicks();
        if(skipTimer === 0){
          num = 5;
          cat = 'Support';
          skipTimeout();
          if($('#guide').hasClass('is-active') && $('#videos').css('opacity') <= .2){
            lastScene='guide';
            skipGuide();
            pauseAudio();
          }
          else if($('#support').hasClass('is-active')){
            // do nothing
          }
          else{
            hideChanges();
            tl.to('.loop-video:not(#loop-0,#video-5)', .5, {alpha:0});
            pauseAudio();
            setTimeout(function(){
              removeEvL();
              
              supportTL.pause(0).clear(); supportTL2.pause(0).clear();
              sustainTL.pause(0).clear(); sustainTL2.pause(0).clear();

              ffTL5.pause(0).clear();
              ffTL6.pause(0).clear();
              
              journeyTL.pause(0).seek(journeyTL.duration(), false); 
              journeyTL2.pause(0).seek(journeyTL2.duration(), false);
              identifyTL.pause(0).seek(identifyTL.duration(), false); 
              identifyTL2.pause(0).seek(identifyTL2.duration(), false);
              connectTL.pause(0).seek(connectTL.duration(), false); 
              connectTL2.pause(0).seek(connectTL2.duration(), false);
              guideTL.pause(0).seek(guideTL.duration(), false); 
              guideTL2.pause(0).seek(guideTL2.duration(), false);

              ffTL1.pause(0).seek(ffTL1.duration(), false);
              ffTL2.pause(0).seek(ffTL2.duration(), false);
              ffTL3.pause(0).seek(ffTL3.duration(), false);
              ffTL4.pause(0).seek(ffTL4.duration(), false);

              tm.set('#volume-warning', {display: 'none'});

              tl.set(['section:not(#support)', 'section:not(#introduction)'], {display:'none', clearProps:'transform'});
              FFtoSupport();
            },400);
          };
        };
      };

    // Sustain Navigation Function
      
      var goTo6 = function() {
        initDesktopClicks();
        if(skipTimer === 0){
          num = 6;
          cat = 'Sustain';
          skipTimeout();
          if($('#support').hasClass('is-active') && $('#videos').css('opacity') <= .2){
            lastScene = 'support';
            skipSupport();
            pauseAudio();
          }
          else if($('#sustain').hasClass('is-active')){
            // do nothing
          } else{
            hideChanges();
            tl.to('.loop-video:not(#loop-0,#video-6)', .5, {alpha:0});
            pauseAudio();
            removeEvL();

            setTimeout(function(){

              sustainTL.pause(0).clear(); sustainTL2.pause(0).clear();

              ffTL6.pause(0).clear();
              
              journeyTL.pause(0).seek(journeyTL.duration(), false); 
              journeyTL2.pause(0).seek(journeyTL2.duration(), false);
              identifyTL.pause(0).seek(identifyTL.duration(), false); 
              identifyTL2.pause(0).seek(identifyTL2.duration(), false);
              connectTL.pause(0).seek(connectTL.duration(), false); 
              connectTL2.pause(0).seek(connectTL2.duration(), false);
              guideTL.pause(0).seek(guideTL.duration(), false); 
              guideTL2.pause(0).seek(guideTL2.duration(), false);
              supportTL.pause(0).seek(supportTL.duration(), false); 
              supportTL2.pause(0).seek(supportTL2.duration(), false);

              ffTL1.pause(0).seek(ffTL1.duration(), false);
              ffTL2.pause(0).seek(ffTL2.duration(), false);
              ffTL3.pause(0).seek(ffTL3.duration(), false);
              ffTL4.pause(0).seek(ffTL4.duration(), false);
              ffTL5.pause(0).seek(ffTL5.duration(), false);

              tm.set('#volume-warning', {display: 'none'});

              tl.set(['section:not(#sustain)', 'section:not(#introduction)'], {display:'none', clearProps:'transform'});        
              
              FFtoSustain();
            },400);
          };  
        };
      };

    // Vision Navigation Function
      
      var goTo7 = function() {
        num = 7;
        cat = 'Vision';

        if(!$('#introduction').hasClass('is-active')){
          pauseAudio();
          removeEvL();
        };

        $('main').prepend(mobile);

        tl.fromTo('body', .65, {alpha:0}, {alpha:1, ease:Power1.easeInOut});

        setTimeout(function(){
          $('#mobile').contents().filter(function(){return this.nodeType === 8;}).replaceWith(function(){return this.data;});
          initMobileClicks();
        }, 200);

        $('body, main').addClass('vision');
        $('header > .container').html(mMenu);
        $('header').addClass('mobile-header');
        tl.set('header', {clearProps:'all'});

        setTimeout(function(){
          journeyTL.seek(0, false).pause(0).clear(); journeyTL2.seek(0, false).pause(0).clear();
          identifyTL.seek(0, false).pause(0).clear(); identifyTL2.seek(0, false).pause(0).clear();
          connectTL.seek(0, false).pause(0).clear(); connectTL2.seek(0, false).pause(0).clear();
          guideTL.seek(0, false).pause(0).clear(); guideTL2.seek(0, false).pause(0).clear();
          supportTL.seek(0, false).pause(0).clear(); supportTL2.seek(0, false).pause(0).clear();
          sustainTL.seek(0, false).pause(0).clear(); sustainTL2.seek(0, false).pause(0).clear();

          ffTL1.seek(0, false).pause(0).clear();
          ffTL2.seek(0, false).pause(0).clear();
          ffTL3.seek(0, false).pause(0).clear();
          ffTL4.seek(0, false).pause(0).clear();
          ffTL5.seek(0, false).pause(0).clear();
          ffTL6.seek(0, false).pause(0).clear();
        },400);
      };

  // Tab Index Functions

    // $("body").bind("keydown", function(event) {
      //  $('*').removeClass('no-focus');

      //  if(!$('#introduction').hasClass('is-active') && !$('#vision-popup').hasClass('is-active-video')){
      //    if(event.keyCode === 32){
      //        event.preventDefault();
      //        $('#play-pause').trigger('click');
      //      }
     //     };
     //    });

      $(".address").bind("keydown", function(event) {
      if($(window).width() <= 1024 || isMobile.detectMobile()){
        if(event.keyCode === 9){
            $('#main').scrollTop($('#main').scrollTop() - 2);
          }
      }
      });

      $(".menu > .absolute-center > a").bind("keydown", function(event) {
      if($(window).width() <= 1024 || isMobile.detectMobile() || $('body').hasClass('vision')){
          
          if(event.keyCode === 32){
            event.preventDefault();
            $(this).trigger('click');
          } 
          else if(event.keyCode === 9 && $(this).is('.menu > .absolute-center > a:last')){
          event.preventDefault();
            $("#burger").focus();
          }
          else if(event.which === 40  && !$(this).is('.menu > .absolute-center > a:last')){
            $(this).next().focus();
          }
          else if(event.which === 40  && $(this).is('.menu > .absolute-center > a:last')){
            $('#burger').focus();
          }
          else if(event.which === 38  && !$(this).is('.menu > .absolute-center > a:first')){
            $(this).prev().focus();
          }
          else if(event.which === 38  && $(this).is('.menu > .absolute-center > a:first')){
            $('#burger').focus();
          }
      }
      });

    $('#sound-btn').bind("keydown", function(event) {
      if(event.keyCode === 9 && !$('#volume').hasClass('is-muted')){
        event.preventDefault();
        $('#volume').addClass('show-controlbar');
        $('#volume-control input').focus();
      }
      else if(event.keyCode === 32){
        event.preventDefault();
        $('#sound-btn').trigger('click');
      }
    });

    $('#volume-control input').bind("keydown", function(event) {
      if(event.keyCode === 9){
        $('#volume').removeClass('show-controlbar');
      }
    });


    $("#mobile-menu #burger").keydown(function(e){  
      if($(window).width() <= 1024 || isMobile.detectMobile() || $('body').hasClass('vision')){
             // spacebar
            if (e.keyCode === 32) {
              e.preventDefault();
              $('#burger').trigger('click');
            }

            // down key
            else if (e.keyCode === 40) { 
              e.preventDefault(); 
                $('.menu > .absolute-center > a:first').focus();
            }

            // up key
            else if (e.keyCode === 38) {  
             e.preventDefault();
             $('.menu > .absolute-center > a:last').focus(); 
            }
        }
      });
      $('.menu').keydown(function(e){
        //ESC key
        
        if (e.keyCode === 27) {
          e.preventDefault();
              $('#burger').trigger('click');
            $('#burger').focus();
          }
      });

  // Scroll Function

      var lastScrollTop = 0;
    $('.mobile #main, .vision #main').scroll(function(event){
      // if ($(window).width() <= 1024) {
         var st = $(this).scrollTop();
         if (st > lastScrollTop && $('#main').scrollTop() > 54){
             // downscroll code
             console.log('Down');
             $('.mobile-header').addClass('hide-navbar');
         } else {
            // upscroll code
            console.log('Up');
            $('.mobile-header').removeClass('hide-navbar');
         }
         lastScrollTop = st;
      // }
    });

        // PushState Function

    function start() {
    
      // Content for the pages.
      // Note: You would probably want to load the page content using AJAX in a 
      // real application.
        var pages = {
          index: {
            title:"Home",
            number:0
          },
          journey: {
            title: "Journey",
            number:1
          },
          identify: {
            title: "Identify",
            number:2
          },
          connect: {
            title: "Connect",
            number:3
          },
          guide: {
            title: "Guide",
            number:4
          },
          support: {
            title: "Support",
            number:5
          },
          sustain: {
            title: "Sustain",
            number:6
          },
          vision: {
            title: "Vision",
            number:7
          }
      }


      // Get references to the page elements.
      var navLinks = document.querySelectorAll('.history');
      var contentElement = document.getElementById('content');


      // Update the page content.
      var updateContent = function(stateObj) {
        // Check to make sure that this state object is not null.
        if (stateObj) {
          document.title = stateObj.title;

          eval("goTo" + stateObj.number + "()");
        }
      };


      // Attach click listeners for each of the nav links.
      for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function(e) {

          // Fetch the page data using the URL in the link.
          var pageURL = this.attributes['data-category'].value;
          var pageData = pages[pageURL.split('.')[0]];

          console.log(pageData);

          // Update the title and content.
          updateContent(pageData);
          
          // Create a new history item.
          history.pushState(pageData, pageData.title, pageURL);
        });
      }
        

      // Update the page content when the popstate event is called.
      window.addEventListener('popstate', function(event) {
        updateContent(event.state)
      });


      // Load initial content.
      updateContent(pages.index);

      // Update this history event so that the state object contains the data
      // for the homepage.
       history.replaceState(pages.index, pages.index.title, 'home');

       if (document.location.pathname.indexOf("") == 0) {
        history.replaceState(pages.index, pages.index.title, 'home');
        console.log('fired');
      };

      
    }

    start();

});
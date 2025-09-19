(function($) {
  "use strict";

  /*--------------------------
  preloader
  ---------------------------- */
  $(window).on('load', function() {
    var pre_loader = $('#preloader');
    pre_loader.fadeOut('slow', function() {
      $(this).remove();
    });
  });

  /*---------------------
   TOP Menu Stick
  --------------------- */
  var s = $("#sticker");
  var pos = s.position();
  $(window).on('scroll', function() {
    var windowpos = $(window).scrollTop() > 300;
    if (windowpos > pos.top) {
      s.addClass("stick");
    } else {
      s.removeClass("stick");
    }
  });

  /*----------------------------
   Navbar nav
  ------------------------------ */
  var main_menu = $(".main-menu ul.navbar-nav li ");
  main_menu.on('click', function() {
    main_menu.removeClass("active");
    $(this).addClass("active");
  });

  /*----------------------------
   wow js active
  ------------------------------ */
  new WOW().init();

  $(".navbar-collapse a").on('click', function() {
    $(".navbar-collapse.collapse").removeClass('in');
  });

  //---------------------------------------------
  //Nivo slider
  //---------------------------------------------
  $('#ensign-nivoslider').nivoSlider({
    effect: 'random',
    slices: 15,
    boxCols: 12,
    boxRows: 8,
    animSpeed: 500,
    pauseTime: 5000,
    startSlide: 0,
    directionNav: true,
    controlNavThumbs: false,
    pauseOnHover: true,
    manualAdvance: false,
  });

  /*----------------------------
   Scrollspy js
  ------------------------------ */
  var Body = $('body');
  Body.scrollspy({
    target: '.navbar-collapse',
    offset: 80
  });

  /*---------------------
    Venobox
  --------------------- */
  var veno_box = $('.venobox');
  veno_box.venobox();

  /*----------------------------
  Page Scroll
  ------------------------------ */
  var page_scroll = $('a.page-scroll');
  page_scroll.on('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top - 55
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });

  /*--------------------------
    Back to top button
  -------------------------- */
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

  /*----------------------------
   Parallax
  ------------------------------ */
  var well_lax = $('.wellcome-area');
  well_lax.parallax("50%", 0.4);
  var well_text = $('.wellcome-text');
  well_text.parallax("50%", 0.6);

  /*--------------------------
   collapse
  ---------------------------- */
  var panel_test = $('.panel-heading a');
  panel_test.on('click', function() {
    panel_test.removeClass('active');
    $(this).addClass('active');
  });

  /*---------------------
   Testimonial carousel
  ---------------------*/
  var test_carousel = $('.testimonial-carousel');
  test_carousel.owlCarousel({
    loop: true,
    nav: false,
    dots: true,
    autoplay: true,
    responsive: {
      0: { items: 1 },
      768: { items: 1 },
      1000: { items: 1 }
    }
  });

  /*----------------------------
   isotope active
  ------------------------------ */
  $(window).on("load", function() {
    var $container = $('.awesome-project-content');
    $container.isotope({
      filter: '*',
      animationOptions: { duration: 750, easing: 'linear', queue: false }
    });
    var pro_menu = $('.project-menu li a');
    pro_menu.on("click", function() {
      $('.project-menu li a.active').removeClass('active');
      $(this).addClass('active');
      var selector = $(this).attr('data-filter');
      $container.isotope({
        filter: selector,
        animationOptions: { duration: 750, easing: 'linear', queue: false }
      });
      return false;
    });
  });

  /*---------------------
   Circular Bars - Knob
  ---------------------*/
  if (typeof($.fn.knob) != 'undefined') {
    var knob_tex = $('.knob');
    knob_tex.each(function() {
      var $this = $(this),
          knobVal = $this.attr('data-rel');
      $this.knob({ 'draw': function() { $(this.i).val(this.cv + '%') } });
      $this.appear(function() {
        $({value: 0}).animate({value: knobVal}, {
          duration: 2000,
          easing: 'swing',
          step: function() { $this.val(Math.ceil(this.value)).trigger('change'); }
        });
      }, { accX: 0, accY: -150 });
    });
  }

  /*---------------------
   Custom Counter 
  ---------------------*/
  function runCounter() {
    $('.counter').each(function() {
      var $el = $(this);
      var target = parseInt($el.data('count') || $el.text(), 10) || 0;
      $el.text('0');
      $({count: 0}).animate({count: target}, {
        duration: 2000,
        easing: 'swing',
        step: function(now){ $el.text(Math.floor(now)); },
        complete: function(){ $el.text(target); }
      });
    });
  }

  // window load 이후 실행
  $(window).on('load', function() {
    var headerHeight = $('#sticker').outerHeight() || 0;
    var counterRow = $('.counter-row');
    if (counterRow.length) {
      // IntersectionObserver 지원시
      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries, obs){
          entries.forEach(function(entry){
            if(entry.isIntersecting){
              runCounter();
              obs.disconnect();
            }
          });
        }, {threshold: 0.35});
        observer.observe(counterRow[0]);
      } else {
        // 레거시 브라우저: scroll fallback
        var fired = false;
        $(window).on('scroll load', function(){
          if(fired) return;
          var top = counterRow.offset().top;
          var winBottom = $(window).scrollTop() + $(window).height();
          if(winBottom > top + 50 - headerHeight){
            fired = true;
            runCounter();
            $(window).off('scroll load');
          }
        });
      }
    }
  });

  /*---------------------
     Google Maps
  --------------------- */
  var get_latitude = $('#google-map').data('latitude');
  var get_longitude = $('#google-map').data('longitude');

  function initialize_google_map() {
    var myLatlng = new google.maps.LatLng(get_latitude, get_longitude);
    var mapOptions = { zoom: 14, scrollwheel: false, center: myLatlng };
    var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
    var marker = new google.maps.Marker({ position: myLatlng, map: map });
  }
  google.maps.event.addDomListener(window, 'load', initialize_google_map);

})(jQuery);

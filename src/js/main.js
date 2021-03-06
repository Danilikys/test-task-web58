"use strict";

$(document).ready(function(){

  var windowWidth = window.screen.width;
  var meta = document.createElement('meta');
  meta.name = "viewport";

  //MEDIA < 468

  if (windowWidth < 469){
    meta.content = "width=468, shrink-to-fit=no";
  } else {
    meta.content = "width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1";
  }
  document.getElementsByTagName('head')[0].appendChild(meta);

  //SLIDER

  var owl = $('.owl-carousel');
  owl.owlCarousel({
    loop: true,
    items: 1,
    dots: false
  });

  $('.slider-next').click(function() {
    owl.trigger('next.owl.carousel');
  });

  $('.slider-prev').click(function() {
    owl.trigger('prev.owl.carousel');
  });

  // SCROLL MENU

  $('.header__burger').on('click', function (event) {
    event.preventDefault();
    var id = $(this).attr('href');
    var top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 800);
  });

  //MENU

  $('.menu__list-item__title').on('click', function () {
    if ($(this).parent().hasClass('menu__list-item_o')) {
      $(this).parent().addClass('menu__list-item_c').removeClass('menu__list-item_o');
    } else if ($(this).parent().hasClass('menu__list-item_c')) {
      $(this).parent().addClass('menu__list-item_o').removeClass('menu__list-item_c');
    }
  });

});


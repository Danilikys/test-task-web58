$(document).ready(function(){

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

});


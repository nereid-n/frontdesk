$(document).ready(function(){
  if (window.innerWidth < 480) {
    $('.steps-main').slick({
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false
    });
  }
});
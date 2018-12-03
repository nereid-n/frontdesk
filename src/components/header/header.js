$(document).ready(function() {
  $('.header__menu-btn').click(function() {
    $('.header__menu').toggleClass('header__menu_show');
  });
  $('.menu-link').click(function() {
    $('.header__menu').toggleClass('header__menu_show');
  });

  if (document.querySelector('.header__menu')) {
    let items = document.querySelectorAll('.header__menu li a');
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (document.body.clientWidth >= 1200) {
        if (item.clientWidth > 140) {
            item.style.width = '140px';
            item.setAttribute('title', item.innerHTML);
        }
      }
      else if (document.body.clientWidth >= 992) {
        if (item.clientWidth > 120) {
          item.style.width = '120px';
          item.setAttribute('title', item.innerHTML);
        }
      }
    }
  }
  $('.jsClientSlider').slick({
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    prevArrow: '<button type="button" class="prevSlick"><img src="assets/images/icons/right-arrow.svg"></button>',
    nextArrow: '<button type="button" class="nextSlick"><img src="assets/images/icons/right-arrow.svg"></button>',
  });
});
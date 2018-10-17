$(document).ready(function() {
  $('.header__menu-btn').click(function() {
    $('.header__menu').toggleClass('header__menu_show');
  });
  $('.menu-link').click(function() {
    $('.header__menu').toggleClass('header__menu_show');
  });
});
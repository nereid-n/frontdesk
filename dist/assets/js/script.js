'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shared = function Shared() {
  _classCallCheck(this, Shared);
};

$(document).ready(function () {
  $('.select').click(function () {
    $(this).parents('.select-wrap').find('.select-options').slideToggle();
  });
  $('.select-option').click(function () {
    var text = $(this).text();
    $(this).parents('.select-wrap').find('.select span').text(text);
    $(this).parents('.select-wrap').find('.input-hidden').text(text);
  });
});

$(document).ready(function () {
  $('.header__menu-btn').click(function () {
    $('.header__menu').toggleClass('header__menu_show');
  });
});
$(document).ready(function () {
  $('.video-btn-js').click(function () {
    $('.modal-video').addClass('modal-video-show');
  });
  $('.modal-video').click(function (e) {
    var block = $('.modal-video__content');
    if (!block.is(e.target) && block.has(e.target).length === 0) {
      $('.modal-video').removeClass('modal-video-show');
    }
  });
});
//# sourceMappingURL=script.js.map

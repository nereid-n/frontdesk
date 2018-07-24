$(document).ready(function() {
  $('.video-btn-js').click(function() {
    $('.modal-video').addClass('modal-video-show');
  });
  $('.modal-video').click(function(e) {
    var block = $('.modal-video__content-js');
    if(!block.is(e.target) && block.has(e.target).length === 0 || $('.modal-video__btn-close-js').is(e.target)) {
      $('.modal-video').removeClass('modal-video-show');
    }
  });
});
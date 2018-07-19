$(document).ready(function() {
  $('.select').click(function() {
    $(this).parents('.select-wrap').find('.select-options').slideToggle();
  });
  $('.select-option').click(function() {
    var text = $(this).text();
    $(this).parents('.select-wrap').find('.select').text(text);
    $(this).parents('.select-wrap').find('.input-hidden').text(text);
  });
});
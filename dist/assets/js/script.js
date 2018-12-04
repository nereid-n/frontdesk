'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shared = function Shared() {
  _classCallCheck(this, Shared);
};

var Calculator = function () {
  function Calculator() {
    _classCallCheck(this, Calculator);

    this.currStatePriceEl = document.querySelector('.js-currStatePrice');
    this.currEmployeeEl = document.querySelector('.js-currEmployee');
    this.currHrsWeekEl = document.querySelector('.js-currTime');
    this.stateFinalPrice = document.querySelector('.js-stateFinalPrice');
    this.stateOfferPrice = document.querySelector('.js-statePrice');
    this.ourFinalPrice = document.querySelector('.js-ourFinalPrice');
    this.ourOfferPrice = document.querySelector('.js-ourPrice');
    this.defaultStatePrice = document.querySelector('[data-type="price"]');
    this.ourPrice = Number(this.currStatePriceEl.getAttribute('data-ourPrice'));
    this.statePrice = 0;
    this.getAndSetCurrentPrice(this.defaultStatePrice);
  }

  /**
   * calculate price for 1hr in current state
   *
   * @param el
   * @returns {number}
   */


  _createClass(Calculator, [{
    key: 'priceHrCalc',
    value: function priceHrCalc(el) {
      var tax = 0;
      var price = el.getAttribute('data-basePrice');
      var taxArr = el.getAttribute('data-tax').split('+');

      for (var i = 0; i < taxArr.length; i++) {
        tax += Number(taxArr[i]);
      }
      return Math.round(Number(price) * (1 + tax / 100) * 100) / 100;
    }

    /**
     * calculate final price
     *
     * @param type - type state price or beacons
     * @param employee
     * @param hrs
     * @returns {number}
     */

  }, {
    key: 'priceCalc',
    value: function priceCalc(type, employee, hrs) {
      if (type === 'state') {
        return Math.round(Number(this.currStatePriceEl.getAttribute('data-currPrice')) * hrs * employee * 100) / 100;
      } else if (type === 'our') {
        return Math.round(this.ourPrice * hrs * employee * 100) / 100;
      }
    }
  }, {
    key: 'getHrs',
    value: function getHrs() {
      return Number(this.currHrsWeekEl.getAttribute('data-currTime'));
    }
  }, {
    key: 'getEmployees',
    value: function getEmployees() {
      return Number(this.currEmployeeEl.getAttribute('data-currEmployee'));
    }

    /**
     * get element attribute
     *
     * @param el - element on click
     */

  }, {
    key: 'getAttribute',
    value: function getAttribute(el) {
      var dataType = el.getAttribute('data-type');

      if (dataType === 'price') {
        var price = this.priceHrCalc(el);
        this.statePrice = price;
        this.currStatePriceEl.setAttribute('data-currPrice', price);
      }

      if (dataType === 'time') {
        var time = el.getAttribute('data-time');
        this.currHrsWeekEl.setAttribute('data-currTime', time);
      }

      if (dataType === 'employee') {
        var employee = el.getAttribute('data-employee');
        this.currEmployeeEl.setAttribute('data-currEmployee', employee);
      }
    }

    /**
     * calculate price and write it to fields
     *
     * @param el - element on click
     */

  }, {
    key: 'getAndSetCurrentPrice',
    value: function getAndSetCurrentPrice(el) {
      this.getAttribute(el);
      var hrs = this.getHrs();
      var employees = this.getEmployees();
      this.stateOfferPrice.innerHTML = '$' + this.statePrice;
      this.stateFinalPrice.innerHTML = '$' + this.priceCalc('state', hrs, employees);
      this.ourOfferPrice.innerHTML = '$' + this.ourPrice;
      this.ourFinalPrice.innerHTML = '$' + this.priceCalc('our', hrs, employees);
    }
  }]);

  return Calculator;
}();

document.addEventListener('DOMContentLoaded', function () {
  var calc = new Calculator();
  var selects = document.querySelectorAll('.select-wrap');
  var options = document.querySelectorAll('.select-option');

  for (var i = 0; i < selects.length; i++) {
    selects[i].addEventListener('click', function () {
      $(this.querySelector('.select-options')).slideToggle(200);
    });
  }

  var _loop = function _loop(j) {
    options[j].addEventListener('click', function () {
      var text = this.innerHTML;
      var parent = this.closest('.select-wrap');
      parent.querySelector('.select span').innerHTML = text;
      parent.querySelector('.input-hidden').value = text;

      calc.getAndSetCurrentPrice(options[j]);
    });
  };

  for (var j = 0; j < options.length; j++) {
    _loop(j);
  }
});
$(document).ready(function () {
  $('.header__menu-btn').click(function () {
    $('.header__menu').toggleClass('header__menu_show');
  });
  $('.menu-link').click(function () {
    $('.header__menu').toggleClass('header__menu_show');
  });

  if (document.querySelector('.header__menu')) {
    var items = document.querySelectorAll('.header__menu li a');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (document.body.clientWidth >= 1200) {
        if (item.clientWidth > 140) {
          item.style.width = '140px';
          item.setAttribute('title', item.innerHTML);
        }
      } else if (document.body.clientWidth >= 992) {
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
    nextArrow: '<button type="button" class="nextSlick"><img src="assets/images/icons/right-arrow.svg"></button>'
  });
});
$(document).ready(function () {
  $('.video-btn-js').click(function () {
    $('.modal-video').addClass('modal-video-show');
  });
  $('.modal-video').click(function (e) {
    var block = $('.modal-video__content-js');
    if (!block.is(e.target) && block.has(e.target).length === 0 || $('.modal-video__btn-close-js').is(e.target)) {
      $('.modal-video').removeClass('modal-video-show');
    }
  });
});

$(document).ready(function () {
  if (window.innerWidth < 480) {
    $('.steps-main').slick({
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false
    });
  }
});
//# sourceMappingURL=script.js.map

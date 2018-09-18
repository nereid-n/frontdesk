'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shared = function Shared() {
  _classCallCheck(this, Shared);
};

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
    var block = $('.modal-video__content-js');
    if (!block.is(e.target) && block.has(e.target).length === 0 || $('.modal-video__btn-close-js').is(e.target)) {
      $('.modal-video').removeClass('modal-video-show');
    }
  });
});

var Calculator = function () {
  function Calculator() {
    _classCallCheck(this, Calculator);

    this.currStatePriceEl = document.querySelector('.js-currStatePrice');
    this.currEmployeeEl = document.querySelector('.js-currEmployee');
    this.currHrsWeekEl = document.querySelector('.js-currTime');
    this.finalPrice = document.querySelector('.js-stateFinalPrice');
    this.ourFinalPrice = document.querySelector('.js-ourFinalPrice');
    this.defaultStatePrice = document.querySelector('.js-statePrice');
    this.ourPrice = 7;

    this.writeCurrentPrice(this.defaultStatePrice);
  }

  /**
   * calculate price for 1hr in current state
   *
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
      return Math.round(Number(price) * (1 + tax / 100));
    }

    /**
     * calculate final price
     *
     * @param employee
     * @param hrs
     * @returns {number}
     */

  }, {
    key: 'priceCalc',
    value: function priceCalc(employee, hrs) {
      return Number(this.currStatePriceEl.getAttribute('data-currPrice')) * hrs * employee;
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
  }, {
    key: 'writeCurrentPrice',
    value: function writeCurrentPrice(el) {
      var hrs = this.getHrs();
      var employees = this.getEmployees();
      this.finalPrice.innerHTML = '$' + this.priceCalc(el, hrs, employees);
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

  for (var j = 0; j < options.length; j++) {
    options[j].addEventListener('click', function () {
      var text = this.innerHTML;
      var parent = this.closest('.select-wrap');
      parent.querySelector('.select span').innerHTML = text;
      parent.querySelector('.input-hidden').value = text;
    });
  }
});
//# sourceMappingURL=script.js.map

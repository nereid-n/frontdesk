class Calculator {
  constructor() {
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
  priceHrCalc(el) {
    let tax = 0;
    const price = el.getAttribute('data-basePrice');
    const taxArr = el.getAttribute('data-tax').split('+');

    for (let i = 0; i < taxArr.length; i++) {
      tax += Number(taxArr[i]);
    }
    return Math.round(Number(price) * (1 + (tax/100)) * 100) / 100;
  }

  /**
   * calculate final price
   *
   * @param type - type state price or beacons
   * @param employee
   * @param hrs
   * @returns {number}
   */
  priceCalc(type, employee, hrs) {
    if (type === 'state') {
      return Math.round(Number(this.currStatePriceEl.getAttribute('data-currPrice')) * hrs * employee * 100) / 100;
    } else if (type === 'our') {
      return Math.round(this.ourPrice * hrs * employee * 100) / 100;
    }
  }

  getHrs() {
    return Number(this.currHrsWeekEl.getAttribute('data-currTime'));
  }

  getEmployees() {
    return Number(this.currEmployeeEl.getAttribute('data-currEmployee'));
  }

  /**
   * get element attribute
   *
   * @param el - element on click
   */
  getAttribute(el) {
    const dataType = el.getAttribute('data-type');

    if (dataType === 'price') {
      const price = this.priceHrCalc(el);
      this.statePrice = price;
      this.currStatePriceEl.setAttribute('data-currPrice', price);
    }

    if (dataType === 'time') {
      const time = el.getAttribute('data-time');
      this.currHrsWeekEl.setAttribute('data-currTime', time);
    }

    if (dataType === 'employee') {
      const employee = el.getAttribute('data-employee');
      this.currEmployeeEl.setAttribute('data-currEmployee', employee);
    }
  }

  /**
   * calculate price and write it to fields
   *
   * @param el - element on click
   */
  getAndSetCurrentPrice(el) {
    this.getAttribute(el);
    const hrs = this.getHrs();
    const employees = this.getEmployees();
    this.stateOfferPrice.innerHTML = `$${this.statePrice}`;
    this.stateFinalPrice.innerHTML = `$${this.priceCalc('state', hrs, employees)}`;
    this.ourOfferPrice.innerHTML = `$${this.ourPrice}`;
    this.ourFinalPrice.innerHTML = `$${this.priceCalc('our', hrs, employees)}`;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  let calc = new Calculator();
  const selects = document.querySelectorAll('.select-wrap');
  const options = document.querySelectorAll('.select-option');

  for (let i = 0; i < selects.length; i++) {
    selects[i].addEventListener('click', function () {
      $(this.querySelector('.select-options')).slideToggle(200);
    });
  }

  for (let j = 0; j < options.length; j++) {
    options[j].addEventListener('click', function () {
      let text = this.innerHTML;
      let parent = this.closest('.select-wrap');
      parent.querySelector('.select span').innerHTML = text;
      parent.querySelector('.input-hidden').value = text;

      calc.getAndSetCurrentPrice(options[j]);
    })
  }
});
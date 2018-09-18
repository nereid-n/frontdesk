class Calculator {
  constructor() {
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
  priceHrCalc(el) {
    let tax = 0;
    const price = el.getAttribute('data-basePrice');
    const taxArr = el.getAttribute('data-tax').split('+');

    for (let i = 0; i < taxArr.length; i++) {
      tax += Number(taxArr[i]);
    }
    return Math.round(Number(price) * (1 + (tax/100)));
  }

  /**
   * calculate final price
   *
   * @param employee
   * @param hrs
   * @returns {number}
   */
  priceCalc(employee, hrs) {
    return Number(this.currStatePriceEl.getAttribute('data-currPrice')) * hrs * employee;
  }

  getHrs() {
    return Number(this.currHrsWeekEl.getAttribute('data-currTime'));
  }

  getEmployees() {
    return Number(this.currEmployeeEl.getAttribute('data-currEmployee'));
  }

  writeCurrentPrice(el) {
    const hrs = this.getHrs();
    const employees = this.getEmployees();
    this.finalPrice.innerHTML = `$${this.priceCalc(el, hrs, employees)}`;
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


    })
  }
});
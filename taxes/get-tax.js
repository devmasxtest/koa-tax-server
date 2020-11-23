const taxRegulator = require('./tax-regulators')
const calculator = require('./calculator')
const cityTaxes = {
    "NY": {vat: 23, specific: {city: 1, insurance: 2}, state: 5},
    "AL": {vat: 30, specific: { cold_weather: 5 }, state: 0},
};
const defaultTax = { vat: 21, state: 2}

module.exports = (ctx) => {
    const body = ctx.request.body
    const taxes = cityTaxes[body.state] ? cityTaxes[body.state] : defaultTax;

    result = calculator(body.productPrice, taxes);

    // const regulator = taxRegulator(body.state);
    // regulator.notify();
    ctx.body = result;

};
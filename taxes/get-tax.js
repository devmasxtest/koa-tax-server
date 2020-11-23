const taxRegulator = require('./tax-regulators')
const calculator = require('./calculator')
const cityTaxes = {
    "NY": {vat: 23, specific: {city: 1, insurance: 2}, state: 5},
    "AL": {vat: 30, specific: { cold_weather: 5 }, state: 0},
};
const defaultTax = { vat: 21, state: 2}

module.exports = (ctx) => {
    const body = ctx.request.body
    if (!body.state || !body.productPrice) {
        return ctx.body = { error: "Required parameters not present" };
    }
    const taxes = cityTaxes[body.state] ? cityTaxes[body.state] : defaultTax;

    if (body.notifyRegulator) {
        try {
            const regulator = taxRegulator(body.state);
            regulator.notify();
        } catch(error) {
            return ctx.body = { error: error.message };
        }
    }

    ctx.body = calculator(body.productPrice, taxes);
};
const taxRegulator = require('./tax-regulators')
const calculator = require('./calculator')

const cityTaxes = {
    "NY": {vat: 23, specific: {city: 1, insurance: 2}, state: 5},
    "AL": {vat: 30, specific: { cold_weather: 5 }, state: 0},
};
const defaultTax = { vat: 21, state: 2}

const targetTax = (state) => {
    return (cityTaxes[state] || defaultTax)
}

const notifyRegulator = (state, taxes) => {
    taxRegulator(state).notify(taxes)
};

module.exports = (ctx) => {
    const body = ctx.request.body
    if (!body.state || !body.productPrice) {
        return ctx.body = { error: "Required parameters not present" };
    }
    const taxes = targetTax(body.state);

    try {
        const resultCalculator = calculator(body.productPrice, taxes);

        if (body.notifyRegulator) {
            notifyRegulator(body.state, resultCalculator);
        }
        return ctx.body = resultCalculator;
    } catch(error) {
        return ctx.body = { error: error.message };
    }

};
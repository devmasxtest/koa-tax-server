const taxRegulator = require('./tax-regulators')
const calculator = require('./calculator')



const targetTax = (state) => {
    const cityTaxes = {
        "NY": {vat: 23, specific: {city: 1, insurance: 2}, state: 5},
        "AL": {vat: 30, specific: { cold_weather: 5 }, state: 0},
    };
    const defaultTax = { vat: 21, state: 2}

    return (cityTaxes[state] || defaultTax)
}

const notifyRegulator = (state, taxes) => {
    taxRegulator(state).notify(taxes)
};

module.exports = (ctx) => {
    const newCtx = {...ctx}
    if (!newCtx.request.body.state || !newCtx.request.body.productPrice) {
        return { error: "Required parameters not present" };
    }

    try {
        const taxes = targetTax(newCtx.request.body.state);
        const resultCalculator = calculator(newCtx.request.body.productPrice, taxes);

        if (newCtx.request.body.notifyRegulator) {
            notifyRegulator(newCtx.request.body.state, resultCalculator);
        }
        return resultCalculator;
    } catch(error) {
        return { error: error.message };
    }

};
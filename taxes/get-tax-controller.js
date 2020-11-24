const Calculator = require('./calculator')
const TaxRegulator = require('./tax-regulators')

class GetTaxController {
    process(ctx) {
        const body = ctx.request.body;
        if (!body.state || !body.productPrice) {
            return ctx.body = { error: "Required parameters not present" };
        }

        try {
            const calculatorResult = new Calculator(body.productPrice, body.state).calculate();
            if (body.notifyRegulator) {
                const regulator = new TaxRegulator(body.state).getRegulator();
                regulator.notify(calculatorResult);
            }
            return ctx.body = calculatorResult;
        } catch(error) {
            return ctx.body = { error: error.message };
        }

    }
}

module.exports = GetTaxController;
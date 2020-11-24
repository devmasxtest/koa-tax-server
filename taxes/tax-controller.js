const Calculator = require('./calculator')
const TaxRegulatorFactory = require('./tax-regulators')

class TaxController {
    process(ctx) {
        const body = ctx.request.body;
        if (!body.state || !body.productPrice) {
            return ctx.body = { error: "Required parameters not present" };
        }

        try {
            const calculatorResult = new Calculator().calculate(body.productPrice, body.state);
            if (body.notifyRegulator) {
                const regulator = new TaxRegulatorFactory(body.state).getRegulator();
                regulator.notify(calculatorResult);
            }
            return ctx.body = calculatorResult;
        } catch(error) {
            return ctx.body = { error: error.message };
        }

    }
}

module.exports = TaxController;
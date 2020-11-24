class GetTaxController {
    constructor(dependencies = {}) {
        this.calculator = dependencies.calculator;
        this.taxRegulator = dependencies.taxRegulator;
        this.cityTaxes = {
            "NY": {vat: 23, specific: {city: 1, insurance: 2}, state: 5},
            "AL": {vat: 30, specific: { cold_weather: 5 }, state: 0},
        };
        this.defaultTax = {vat: 21, state: 2};
    }

    process(ctx) {
        const body = ctx.request.body;
        if (!body.state || !body.productPrice) {
            return ctx.body = { error: "Required parameters not present" };
        }

        const taxes = this.cityTaxes[body.state] ? this.cityTaxes[body.state] : this.defaultTax;

        if (body.notifyRegulator) {
            try {
                const regulator = this.taxRegulator(body.state);
                regulator.notify();
            } catch(error) {
                return ctx.body = { error: error.message };
            }
        }

        ctx.body = this.calculator(body.productPrice, taxes);
    }
}

module.exports = GetTaxController;
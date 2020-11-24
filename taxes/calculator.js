class Calculator {
    constructor() {
        this.cityTaxes = {
            "NY": {vat: 23, specific: {city: 1, insurance: 2}, state: 5},
            "AL": {vat: 30, specific: { cold_weather: 5 }, state: 0},
        };
        this.defaultTax = {vat: 21, state: 2};
    }

    getTaxes(state) {
        return this.cityTaxes[state] ? this.cityTaxes[state] : this.defaultTax;
    }

    calculate(productPrice, state) {
        const taxes = this.getTaxes(state);
        const result = {...taxes};
        result.vat = this.percentageOf(productPrice, result.vat);
        result.state = this.percentageOf(productPrice, result.state);
        Object.keys(result.specific).forEach((tax) => {
            result.specific[tax] = this.percentageOf(productPrice, taxes.specific[tax]);
        });

        return result;
    }

    percentageOf(value, percent) {
        return Math.round(value * percent / 100);
    }
}

module.exports = Calculator;
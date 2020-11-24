class Calculator {
    constructor(productPrice, state) {
        this.productPrice = productPrice;
        this.state = state;
        this.cityTaxes = {
            "NY": {vat: 23, specific: {city: 1, insurance: 2}, state: 5},
            "AL": {vat: 30, specific: { cold_weather: 5 }, state: 0},
        };
        this.defaultTax = {vat: 21, state: 2};
    }

    getTaxes() {
        return this.cityTaxes[this.state] ? this.cityTaxes[this.state] : this.defaultTax;
    }

    calculate() {
        const taxes = this.getTaxes();
        const result = {...taxes};
        result.vat = this.productPrice * result.vat / 100
        result.state = this.productPrice * result.state / 100
        Object.keys(result.specific).forEach((tax) => {
            result.specific[tax] = this.productPrice * taxes.specific[tax] / 100
        });

        return result;
    }
}

module.exports = Calculator;
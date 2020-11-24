class NyTaxRegulator {
    notify(taxes) {
        console.log('NY taxes sent', taxes)
    }
}

class GeneralTaxRegulator {
    notify(taxes) {
        console.log('General taxes sent', taxes)
    }
}

class TaxRegulators {
    constructor(state) {
        this.state = state;
    }

    getRegulator() {
        switch (this.state) {
            case 'NY':
                return new NyTaxRegulator;
            case 'AL':
                throw new Error("Tax regulator for AL is not implemented")
            default:
                return new GeneralTaxRegulator
        }
    }
}

module.exports = TaxRegulators;
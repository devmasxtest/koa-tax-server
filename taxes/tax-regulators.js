class NyTaxRegulator {
    notify(taxes) {
        console.log('NY taxes sent')
    }
}

class GeneralTaxRegulator {
    notify(taxes) {
        console.log('General taxes sent')
    }
}

module.exports = (state) => {
    switch (state) {
        case 'NY':
            return new NyTaxRegulator;
        case 'AL':
            throw new Error("Tax regulator for AL is not implemented")
        default:
            return new GeneralTaxRegulator
    }

}
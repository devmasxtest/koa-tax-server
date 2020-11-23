module.exports = (productPrice, taxes) => {
    const result = {...taxes}
    Object.keys(taxes).forEach((tax) => {
        if (typeof taxes[tax] === 'object') {
            Object.keys(taxes[tax]).forEach((subTax) => {
                result[tax][subTax] = productPrice * taxes[tax][subTax] / 100
            });
        } else {
            result[tax] = productPrice * taxes[tax] / 100
        }
    })
    return result;
}
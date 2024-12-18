import formatCurrency from "../../scripts/utils/money.js";

describe('test suite: formatCurrency', () => {    //create test suite
    it('converts cents into dollars', () => {    //create test case
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('works with zero', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('rounds up with nearest cent', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
        expect(formatCurrency(2000.4)).toEqual('20.00');
        expect(formatCurrency(-2000.3)).toEqual('-20.00');
    });
});

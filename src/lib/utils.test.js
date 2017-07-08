const utils = require('./utils');

describe('last', () => {
    test('empty arrays return undefined', () => {
        expect(utils.last([])).toBeUndefined();
    });

    test('it retuns the last item in the array', () => {
        expect(utils.last([1,4,5,2])).toBe(2);
    });
});

describe('padLeft', () => {
    test('it adds 0s until the result is the correct width', () => {
        expect(utils.padLeft('124', 5)).toBe('00124');
    });
    test('it can use numbers as inputs too', () => {
        expect(utils.padLeft(124, 5)).toBe('00124');
    });
    test('it can use a custom padding character', () => {
        expect(utils.padLeft(124, 5, 'x')).toBe('xx124');
    });
    test("it doesn't pad if the input is already the right length", () => {
        expect(utils.padLeft(124, 3)).toBe('124');
    });
    test("it doesn't pad if the input is longer than the padding length", () => {
        expect(utils.padLeft(124, 1)).toBe('124');
    });
});

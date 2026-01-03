import { chainAdd } from "./chainAddition";

test('test chain addition', () => {
    expect(chainAdd('1234', 8)).toBe('123457049660')
})




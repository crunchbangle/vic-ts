import {noCarryAddString, noCarrySubtractString} from './noCarryAddition'

test('test no carry add string', () => {
    expect(noCarryAddString('1234','4321')).toBe('5555')
});

test('test no carry add string with potential carries', () => {
    expect(noCarryAddString('6789','6789')).toBe('2468')
});


test('test no carry subtract string', () => {
    expect(noCarrySubtractString('1234','4321')).toBe('7913')
});


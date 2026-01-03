import {extractLastTwoUnique} from './extractLastTwoUnique';

test('extractLastTwoUnique abcde', () => {
    const p = extractLastTwoUnique('abcde')
    expect(p[0]).toBe('d');
    expect(p[1]).toBe('e');
})
test('extractLastTwoUnique abcdee', () => {
    const p = extractLastTwoUnique('abcdee')
    expect(p[0]).toBe('d');
    expect(p[1]).toBe('e');
})
test('extractLastTwoUnique abcdde', () => {
    const p = extractLastTwoUnique('abcdde')
    expect(p[0]).toBe('d');
    expect(p[1]).toBe('e');
})
test('extractLastTwoUnique abcddee', () => {
    const p = extractLastTwoUnique('abcddee')
    expect(p[0]).toBe('d');
    expect(p[1]).toBe('e');
})
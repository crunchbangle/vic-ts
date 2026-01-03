import { getDiagonalLengths, populateDiagonalsOnly, diagonalize, unDiagonalize } from "./diagonalize";


const key = '536124';
const messageLength = 60;
const expected = [3,4,5,6,4,5,6,1,2,3];

test('getDiagonalLengths', ()=>{
    expect(getDiagonalLengths(key, messageLength)).toStrictEqual(expected);
})

const message = `ABCDEF
GHIJKL
MONPQR
STUVWX
abcdef
ghijkl
mnopqr
stuvwx
012345
6789YZ`

const expectedIntermediate = [
    'ABC',
    'DEFG',
    'HIJKL',
    'MONPQR',
    'STUV',
    'WXabc',
    'defghi',
    'j',
    'kl',
    'mno',
    'pqrstuvwx0123456789YZ'
];

const expectedDiagonal = [
    'ABCpqr',
    'DEFGst',
    'HIJKLu',
    'MONPQR',
    'STUVvw',
    'WXabcx',
    'defghi',
    'j01234',
    'kl5678',
    'mno9YZ'
];

test('populateDiagonalsOnly', ()=>{
    expect(populateDiagonalsOnly(key, message)).toStrictEqual(expectedIntermediate)
})

test('populateDiagonalsOnly', ()=>{
    expect(diagonalize(key, message)).toStrictEqual(expectedDiagonal)
})

test('unDiagonalize', ()=>{
    expect(unDiagonalize(key, expectedDiagonal)).toStrictEqual(message.replace(/\s+/g, ''))
})
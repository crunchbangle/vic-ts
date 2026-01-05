import { encrypt, shapeForTranspose } from "./encrypt";

const keyLength1 = 7;
const keyLength2 = 10;
const padWith = '0';
const input = `12345 67890
12345 67890
12345 67890
`;
const expected1 = [
    '1234567',
    '8901234',
    '5678901',
    '2345678',
    '9000000'
];
const expected2 = [
    '1234567890',
    '1234567890',
    '1234567890'
];

test('shapeForTranspose', () => {
    expect(shapeForTranspose(keyLength1, input, padWith)).toStrictEqual(expected1);
    expect(shapeForTranspose(keyLength2, input, padWith)).toStrictEqual(expected2);
});


const pin = 5;
const date = '1231961';
const phrase = 'i never want another man like that';
const csPhrase = 'AT ONE SIR';
const text = `LetsSeeIfWeCanEncryptThisMessage.ItWillNotBeAsEasilyReadableWhenEncrypted.73.`;

test('encrypt', () => {
    expect(encrypt(
        pin, date, phrase, csPhrase, text
    )).toBe('');
});



import { straddlingCheckerboard } from "./straddlingCheckerboard";

const cs = straddlingCheckerboard('5961328470', 'AT ONE SIR');

const block = ` 5961328470
 AT ONE SIR
6BCDFGHJKLM
8PQUVWXYZ./
`

test('straddlingCheckerboard:block', ()=>{
    expect(cs.block).toBe(block);
    expect(cs.enc.get('A')).toBe('5');
    expect(cs.enc.get('T')).toBe('9');
    expect(cs.enc.get('O')).toBe('1');
    expect(cs.enc.get('N')).toBe('3');
    expect(cs.enc.get('E')).toBe('2');
    expect(cs.enc.get('S')).toBe('4');
    expect(cs.enc.get('I')).toBe('7');
    expect(cs.enc.get('R')).toBe('0');

    expect(cs.enc.get('B')).toBe('65');
    expect(cs.enc.get('C')).toBe('69');
    expect(cs.enc.get('D')).toBe('66');
    expect(cs.enc.get('F')).toBe('61');
    expect(cs.enc.get('G')).toBe('63');
    expect(cs.enc.get('H')).toBe('62');
    expect(cs.enc.get('J')).toBe('68');
    expect(cs.enc.get('K')).toBe('64');
    expect(cs.enc.get('L')).toBe('67');
    expect(cs.enc.get('M')).toBe('60');

    expect(cs.enc.get('P')).toBe('85');
    expect(cs.enc.get('Q')).toBe('89');
    expect(cs.enc.get('U')).toBe('86');
    expect(cs.enc.get('V')).toBe('81');
    expect(cs.enc.get('W')).toBe('83');
    expect(cs.enc.get('X')).toBe('82');
    expect(cs.enc.get('Y')).toBe('88');
    expect(cs.enc.get('Z')).toBe('84');
    expect(cs.enc.get('.')).toBe('87');
    expect(cs.enc.get('/')).toBe('80');
})


const testText = 'this is a message for encoding. the spaces should get removed. here is a number 7 and another 42 and a third 90210.';
const formattedText = `THISI SAMES SAGEF ORENC
ODING .THES PACES SHOUL
DGETR EMOVE D.HER EISAN
UMBER 7ANDA NOTHE R42AN
DATHI RD902 10.
`;
const encoded = `96274 74560 24456 32611
02369 16673 63879 62248
55692 44621 86676 66329
02601 81266 87622 02745
38660 65208 07778 05366
53196 22080 44422 28053
66596 27066 80999 00022
21110 00808 7
`;

test('checkerboard encoding', () =>{
    const e = cs.encode(testText);
    const d = cs.decode(e);
    expect(e).toBe(encoded);
    expect(d).toBe(formattedText);
})

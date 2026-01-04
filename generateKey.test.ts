import { encode, getKeyGenerator } from "./generateKey";

const pin = 6;
const date = '1391959';
const phrase = 'twas the night before christmas';
const keyGroup = '72401';

test('encoding', ()=>{
    expect(encode('6013589427', '1234567890', '90210'))
        .toBe('27067');
})

test('Key Generator', () => {
    const kg = getKeyGenerator(pin, date, phrase, keyGroup);
    expect(kg.keyInsertion).toBe(5);
    expect(kg.lineA).toBe('72401');
    expect(kg.lineB).toBe('13919');
    expect(kg.lineC).toBe('69592');
    expect(kg.lineD).toBe('TWASTHENIG HTBEFORECH');
    expect(kg.lineE).toBe('8017942653 6013589427');
    expect(kg.lineF).toBe('6959254417 1234567890');
    expect(kg.lineG).toBe('4966196060');
    expect(kg.lineH).toBe('3288628787');
    expect(kg.lineJ).toBe('3178429506');
    expect(kg.lineK).toBe('5064805552');
    expect(kg.lineL).toBe('5602850077');
    expect(kg.lineM).toBe('1620350748');
    expect(kg.lineN).toBe('7823857125');
    expect(kg.lineP).toBe('5051328370');
    expect(kg.lineQ).toBe('0668005552551');
    expect(kg.lineR).toBe('758838');
    expect(kg.lineS).toBe('5961328470');
    expect(kg.getColumnarKey()).toBe('0668005552551');
    expect(kg.getDiagonalKey()).toBe('758838');
    expect(kg.getStraddlingCheckerboardKey()).toBe('5961328470');
})


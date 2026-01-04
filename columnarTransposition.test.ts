import { columnarTransposeBlock, getSequence, getSequencePositions, reverseColumnarTransposeBlock } from "./columnarTransposition";

test('getSequencePositions', ()=>{
    expect(getSequencePositions('SEQUENCE')).toStrictEqual([6,1,4,7,5,2,0,3]);
})

test('getSequence', ()=>{
    expect(getSequence('TWASTHENIG')).toBe('8017942653');
    expect(getSequence('HTBEFORECH')).toBe('6013589427');
    expect(getSequence('5051328370')).toBe('5961328470');
})

const egBlock = `SEQUENCE
IMADETHI
SEXAMPLE`;

const egResult = `HL
ME
EM
IE
TP
AX
IS
DA`


test('columnar transpose', ()=>{
    expect(columnarTransposeBlock(egBlock)).toStrictEqual(egResult);
})


const regResult = `IMADETHI
SEXAMPLE`;

const regBlock = `SEQUENCE
HL
ME
EM
IE
TP
AX
IS
DA`


test('reverse columnar transpose', ()=>{
    expect(reverseColumnarTransposeBlock(regBlock)).toStrictEqual(regResult);
})




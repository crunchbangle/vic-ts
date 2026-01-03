import { columnarTransposeBlock, getSequencePositions, reverseColumnarTransposeBlock } from "./columnarTransposition";

test('sequence', ()=>{
    expect(getSequencePositions('SEQUENCE')).toStrictEqual([6,1,4,7,5,2,0,3]);
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


test('columnar transpose', ()=>{
    expect(reverseColumnarTransposeBlock(regBlock)).toStrictEqual(regResult);
})




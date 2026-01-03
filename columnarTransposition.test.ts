import { sequence } from "./columnarTransposition";

test('sequence', ()=>{
    expect(sequence('SEQUENCE')).toStrictEqual([7,2,6,8,3,5,1,4]);
})

import { straddlingCheckerboard } from "./straddlingCheckerboard";

const cs = straddlingCheckerboard('5961328470', 'AT ONE SIR');

const block = ` 5961328470
 AT ONE SIR
6BCDFGHJKLM
8PQUVWXYZ./
`

test('straddlingCheckerboard:block', ()=>{
    expect(cs.block).toBe(block);
})


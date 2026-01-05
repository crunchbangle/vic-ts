import { extractGroup, insertGroup, reGroup } from "./grouping";

const input = 'aa aaab bbb bccc ccd d d d d eee eefff ff';
const expected = `aaaaa bbbbb ccccc ddddd
eeeee fffff
`;

test('re-group', () => {
    expect(reGroup(input)).toBe(expected);
})

const insert = 'xxxxx';
const at = 4;

const expectedInserted = `aaaaa bbbbb xxxxx ccccc
ddddd eeeee fffff
`;

test('insert group', ()=>{
    expect(insertGroup(input, insert, at)).toBe(expectedInserted);
})

test('extract group', ()=>{
    expect(extractGroup(expectedInserted, at))
    .toStrictEqual([insert, reGroup(input)]);
})

const input10 = `aaaaa bbbbb ccccc ddddd
eeeee fffff ggggg hhhhh
jjjjj kkkkk lllll mmmmm
ppppp qqqqq rrrrr sssss
`
const expect10 = `aaaaa bbbbb ccccc ddddd
eeeee fffff xxxxx ggggg
hhhhh jjjjj kkkkk lllll
mmmmm ppppp qqqqq rrrrr
sssss
`

test('insert group edge case at=0', ()=>{
    expect(insertGroup(input10, insert, 0)).toBe(expect10);
})

test('extract group edge case at=0', ()=>{
    expect(extractGroup(expect10, 0))
    .toStrictEqual([insert, reGroup(input10)]);
})

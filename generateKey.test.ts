import { chainAdd } from "./chainAddition";
import { columnarTransposeRows, getSequence } from "./columnarTransposition";
import { extractLastTwoUnique } from "./extractLastTwoUnique";
import { noCarryAddString, noCarrySubtractString } from "./noCarryAddition";

const pin = 6;
const date = '1391959';
const phrase = 'twas the night before christmas';
const keyGroup = '72401';


const encode = (key:string, aide:string, text:string) => {
    let result = '';
    for(let i=0; i<text.length; i++){
        result += key[aide.indexOf(text[i])];
    }
    return result;
}

test('encoding', ()=>{
    expect(encode('6013589427', '1234567890', '90210'))
        .toBe('27067');
})


export const generateKey = (pin:number, date:string, phrase:string, keyGroup:string) => {
    const truncDate = date.substr(0, 5);
    const keyInsertion = parseInt(date.substr(5,1));
    const lineC = noCarrySubtractString(keyGroup, truncDate);
    const lineD = phrase.toUpperCase()
        .replace(/ /g,'')
        .substr(0, 20)
        .replace(/^(.{10})/, '$1 ');
    const lineE = getSequence(lineD.substr(0,10)) +
        ' ' + getSequence(lineD.substr(11,10));
    const lineF = lineC+chainAdd(lineC, 5) 
        + ' 1234567890';
    const lineG = noCarryAddString(lineE.substr(0,10),lineF.substr(0,10))
    const lineH = encode(lineE.substr(11,10), lineF.substr(11,10), lineG);
    const lineJ = getSequence(lineH); // columnar key for the next rows
    const lineK = chainAdd(lineH, 10);
    const lineL = chainAdd(lineK, 10);
    const lineM = chainAdd(lineL, 10);
    const lineN = chainAdd(lineM, 10);
    const lineP = chainAdd(lineN, 10);
    const ltned = extractLastTwoUnique(lineP);
    const a = pin + parseInt(ltned[0]);
    const b = pin + parseInt(ltned[1]);

    const rows = [lineK, lineL, lineM, lineN, lineP];
    const qr = columnarTransposeRows(lineJ, rows).join('');

    const lineQ = qr.substr(0,a); // key to columnar
    const lineR = qr.substr(a,b); // key to diagonal

    const lineS = getSequence(lineP); // key to straddling checkerboard

    return `${lineC}
${lineD}
${lineE}
${lineF}
${lineG}
${lineH}
${lineJ}
${lineK}
${lineL}
${lineM}
${lineN}
${lineP}
${lineQ}
${lineR}
${lineS}
`;
}

const expected = `69592
TWASTHENIG HTBEFORECH
8017942653 6013589427
6959254417 1234567890
4966196060
3288628787
3178429506
5064805552
5602850077
1620350748
7823857125
5051328370
0668005552551
758838
5961328470
`;

test('update this', () => {
    expect(generateKey(pin, date, phrase, keyGroup)).toBe(expected);
})


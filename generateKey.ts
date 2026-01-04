/*
A random keygroup of 5 digits
B date, truncated to 5 digits
C A-B (no carrying)
D phrase truncated to 20 characters
E D sequenced (groups of 10)
F chain addition of C + '1234567890'
G E.1 + F.1
H encode G using E.2 for substitution (F.2 is lookup)
J H sequenced
K-P chain addition of H for 50 digits
*/

import { chainAdd } from "./chainAddition";
import { columnarTransposeRows, getSequence } from "./columnarTransposition";
import { extractLastTwoUnique } from "./extractLastTwoUnique";
import { noCarryAddString, noCarrySubtractString } from "./noCarryAddition";

class KeyGenerator {
    personalNumber: number;
    date: string; // we'll keep the whole thing here
    phrase: string; // we'll keep the whole thing here
    keyInsertion: number; // 6th digit of date
    lineA: string; // keygroup
    lineB: string; // 5 digits of date
    lineC: string;
    lineD: string;
    lineE: string;
    lineF: string;
    lineG: string;
    lineH: string;
    lineJ: string;
    lineK: string;
    lineL: string;
    lineM: string;
    lineN: string;
    lineP: string;
    lineQ: string;
    lineR: string;
    lineS: string;

    constructor(pin:number, date:string, phrase:string, keyGroup:string){

        this.personalNumber = pin;
        this.date = date;
        this.phrase = phrase;
        this.lineA = keyGroup;

        this.lineB = date.substr(0, 5);
        this.keyInsertion = parseInt(date.substr(5,1));
        this.lineC = noCarrySubtractString(keyGroup, this.lineB);
        this.lineD = phrase.toUpperCase()
            .replace(/ /g,'')
            .substr(0, 20)
            .replace(/^(.{10})/, '$1 ');
        this.lineE = getSequence(this.lineD.substr(0,10)) +
            ' ' + getSequence(this.lineD.substr(11,10));
        this.lineF = this.lineC + chainAdd(this.lineC, 5) 
            + ' 1234567890';
        this.lineG = noCarryAddString(this.lineE.substr(0,10), this.lineF.substr(0,10))
        this.lineH = encode(this.lineE.substr(11,10), this.lineF.substr(11,10), this.lineG);
        this.lineJ = getSequence(this.lineH); // columnar key for the next rows
        this.lineK = chainAdd(this.lineH, 10);
        this.lineL = chainAdd(this.lineK, 10);
        this.lineM = chainAdd(this.lineL, 10);
        this.lineN = chainAdd(this.lineM, 10);
        this.lineP = chainAdd(this.lineN, 10);
        const ltned = extractLastTwoUnique(this.lineP);
        const a = pin + parseInt(ltned[0]);
        const b = pin + parseInt(ltned[1]);

        const rows = [this.lineK, this.lineL, this.lineM, this.lineN, this.lineP];
        const qr = columnarTransposeRows(this.lineJ, rows).join('');

        this.lineQ = qr.substr(0,a); // key to columnar
        this.lineR = qr.substr(a,b); // key to diagonal

        this.lineS = getSequence(this.lineP); // key to straddling checkerboard

    }
}

export const encode = (key:string, aide:string, text:string) => {
    let result = '';
    for(let i=0; i<text.length; i++){
        result += key[aide.indexOf(text[i])];
    }
    return result;
}

export const getKeyGenerator = (pin:number, date:string, phrase:string, keyGroup:string) => {
    return new KeyGenerator(pin, date, phrase, keyGroup);
}

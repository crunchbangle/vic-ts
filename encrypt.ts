import { columnarTransposeBlock, columnarTransposeRows } from "./columnarTransposition";
import { diagonalize } from "./diagonalize";
import { getKeyGenerator } from "./generateKey"
import { insertGroup } from "./grouping";
import { straddlingCheckerboard } from "./straddlingCheckerboard";

const randomDigits = () => {
    return (Math.random()).toString().substr(2,5);
}

export const shapeForTranspose = (keyLength:number, text:string, padA:string):string[] => {
    if(padA.length !== 1) throw new Error(`Excpected 1-digit for padA`);
    const s = text.replace(/\s+/g, '');
    const re = new RegExp(`(.{${keyLength}})`, 'g');
    const spaced = s.replace(re, '$1 ').trim();
    const rows = spaced.split(' ');
    // todo: pad the last row as necessary
    const l = rows[rows.length-1].length;

    while(rows[rows.length-1].length < keyLength){
        rows[rows.length-1] += padA;
    }

    return rows;
}

export const encrypt = (pin:number, date:string, phrase:string, csPhrase:string, text:string) => {
    // known (shared) items passed as args

    // random keygroup
    const keyGroup = randomDigits();
    console.log(keyGroup);

    // generate keys
    const kg = getKeyGenerator(pin, date, phrase, keyGroup);

    // straddled checkeboard encode
    const sc = straddlingCheckerboard(kg.getStraddlingCheckerboardKey(), csPhrase);
    const encoded = sc.encode(text);

    console.log(encoded);

    // columnar transposition
    // first we need to make it the right shape for this transpose
    const shapedForColumnar = shapeForTranspose(kg.getColumnarKey().length, encoded, sc.enc.get('A')!);
    console.log(shapedForColumnar);
    const col = columnarTransposeRows(kg.getColumnarKey(), shapedForColumnar);

    console.log(col);

    // diagonal transposition
    const shapedForDiagonal = shapeForTranspose(kg.getDiagonalKey().length, col.join(''), sc.enc.get('E')!);
    console.log(shapedForDiagonal);
    const row = diagonalize(kg.getDiagonalKey(), shapedForDiagonal.join(''));

    console.log(row);


    const diag = columnarTransposeRows(kg.getDiagonalKey(), row);

    console.log(diag);

    // key group insertion
    return insertGroup(diag.join(''), keyGroup, kg.keyInsertion);
}

export const decrypt = (pin:number, date:string, phrase:string, text:string) => {
    // known (shared) items passed as args

    // get key group insertion position from date and extract key group

    // generate keys

    // reverse diagonal transposition

    // reverse columnar transposition

    // straddled ckeckerboard decode


}
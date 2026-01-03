import { getSequencePositions } from "./columnarTransposition"

export const getDiagonalLengths = (key:string, messageLength:number):number[] => {
    const width = key.length;
    const height = messageLength/width;
    if(parseInt(height.toString()) !== height){
        throw new Error(`message length ${messageLength} not a multiple of key length ${key}`);
    }
    const seq = getSequencePositions(key);

    const result = [];
    let currentPosition = width;
    let currentKey = 1;
    while(result.length<height){
        if(currentPosition === width){
            currentPosition = key.indexOf(currentKey.toString());
            result.push(currentPosition);
            currentKey++;
            if(currentKey>key.length) currentKey = 0;
        }
        else {
            currentPosition++;
            result.push(currentPosition);
        }
    }
    return result;
}

export const populateDiagonalsOnly = (key:string, message:string):string[] => {
    let text = message.replace(/\s+/g, '');
    const lengths = getDiagonalLengths(key, text.length);
    const rows = [];
    for(const l of lengths){
        rows.push(text.substr(0,l));
        text = text.substr(l);
    }
    rows.push(text);
    return rows
}

export const diagonalize = (key:string, message:string):string[] => {
    const rows = populateDiagonalsOnly(key, message);
    const l = key.length;
    let remainder = rows.pop()!;
    for(const i in rows){
        const n = l-rows[i].length;
        if(n==0) continue;

        rows[i] += remainder.substr(0,n);
        remainder = remainder.substr(n);
    }
    return rows
}

export const unDiagonalize = (key:string, rows:string[]) => {
    const lengths = getDiagonalLengths(key, rows.join('').length);
    let result = '';
    let remainder = '';
    for(const i in lengths){
        result += rows[i].substr(0, lengths[i]);
        remainder += rows[i].substr(lengths[i]);
    }
    return result+remainder;
}

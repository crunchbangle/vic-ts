

export const getSequencePositions = (s:string):number[] => {
    return s.split('')
        .map((char, position) => ({char, position})) // original index
        .sort((a, b) => a.char>b.char?1:a.char<b.char?-1:
                a.position>b.position?1:a.position<b.position?-1:0) // sort by char
        .map(x => x.position); // sorted positions
}

export const columnarTransposeRows = (key:string, rows:string[]):string[] => {

    if(rows.length < 2){
        throw new Error('cannot transpose less than 2 rows');
    }
    for(const row of rows){
        if(row.length != key.length){
            throw new Error(`Row ${row} is a different length from ${key}`);
        }
    }

    // sort by order and then use the position to get the indices to use...

    const seq = getSequencePositions(key);

    let result = [];
    for(const i of seq){
        let newRow = '';
        for(const row of rows){
            newRow += row[i];
        }
        result.push(newRow);
    }

    return result;
}

export const reverseColumnarTransposeRows = (key:string, rows:string[]):string[] => {

    if(rows.length < 2){
        throw new Error('cannot transpose less than 2 rows');
    }
    if(rows.length != key.length){
        throw new Error(`Number of rows ${rows.length} from length of key ${key}`);
    }

    const seq0 = getSequencePositions(key);
    // need to sequence the sequence to get the targets going back...
    const seq = getSequencePositions(seq0.join(''));

    const result = [];
    for(let i=0; i<rows[0].length; i++){
        let s = '';
        for(const j of seq){
            s += rows[j][i];
        }
        result.push(s);
    }
    return result;
}

export const columnarTransposeBlock = (block:string):string => {
    const rows = block.split(/\n/);
    if(rows.length < 3){
        throw new Error('cannot transpose block with less than 3 rows');
    }
    return columnarTransposeRows(rows.shift()!, rows).join('\n');
}

export const reverseColumnarTransposeBlock = (block:string):string => {
    const rows = block.split(/\n/);
    if(rows.length < 3){
        throw new Error('cannot transpose block with less than 3 rows');
    }
    return reverseColumnarTransposeRows(rows.shift()!, rows).join('\n');
}
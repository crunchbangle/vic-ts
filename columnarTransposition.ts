export const sequence = (s:string):number[] => {
    return s.split('')
        .map((s, i) => ({s, i})) // original index
        .sort((a, b) => a.s>b.s?1:a.s<b.s?-1:0) // sort by char
        .map((x, j) => ({...x, j:(j+1)%10})) // new index (mod 10, start at 1)
        .sort((a, b) => a.i>b.i?1:a.i<b.i?-1:0) // sort by char
        .map(x =>x.j); // new index with original order
}

export const columnarTransposeRows = (key:string, rows:string[]):string[] => {

    if(rows.length < 2){
        throw new Error('cannot transpose less than 2 rows');
    }
    for(const row in rows){
        if(row.length != key.length){
            throw new Error('All rows must be same length as key!');
        }
    }
    return [];
}

export const columnarTransposeBlock = (block:string):string => {
    const rows = block.split(/\n/);
    if(rows.length < 3){
        throw new Error('cannot transpose block with less than 3 rows');
    }
    return columnarTransposeRows(rows.shift()!, rows).join('\n');
}
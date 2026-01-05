export const reGroup = (text:string):string => {
    return text.replace(/\s/g, '')
        .replace(/(\S{20})(?=\S)/g, '$1\n')
        .replace(/(\S{5})(?=\S)/g, '$1 ') + '\n';
}

export const insertGroup = (text:string, insert:string, at:number):string => {
    const i = at === 0 ? 10 : at;
    const groups = reGroup(text).trim().split(/\s+/);
    groups.splice(-i, 0, insert);
    return reGroup(groups.join(''));
}

export const extractGroup = (text:string, at:number):string[] => {
    const i = at === 0 ? 10 : at;
    const groups = reGroup(text).trim().split(/\s+/);
    const extract = groups.splice(-i-1, 1);
    return [extract[0], reGroup(groups.join(''))];
}

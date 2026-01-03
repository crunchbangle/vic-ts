

export const noCarryAddDigit = (x: string, y: string):string => {
    const a = parseInt(x);
    const b = parseInt(y);
    let c = a+b;
    if(c >= 10) c -= 10;
    return c+'';
}

export const noCarrySubtractDigit = (x:string, y:string):string => {
    const a = parseInt(x);
    const b = parseInt(y);
    let c = a-b;
    if(c < 0) c += 10;
    return c+'';
}

export const noCarryAddString = (a:string, b:string):string => {
    return zipStrings(a, b, noCarryAddDigit);
}

export const noCarrySubtractString = (a:string, b:string):string => {
    return zipStrings(a, b, noCarrySubtractDigit);
}

export const zipStrings = (a:string, b:string, fun:(x:string,y:string)=>string):string => {
    const x = a+''; // ensure it's a string!
    const y = b+''; // ensure it's a string!
    if(x.length != y.length){
        throw new Error('zipStrings got items of different length');
    }
    let s = '';
    for(let i=0; i < x.length; i++){
        s += fun(x[i], y[i]);
    }
    return s;
}

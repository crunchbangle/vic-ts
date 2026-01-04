import { noCarryAddDigit } from "./noCarryAddition"

export const chainAdd = (s:string, n:number):string => {
    let i=0;
    let t = '';
    while(i<n){
        const r = noCarryAddDigit(s[i], s[i+1]);
        s += r;
        t += r;
        i++;
    }
    return t;
}
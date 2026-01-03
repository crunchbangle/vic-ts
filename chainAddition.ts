import { noCarryAddDigit } from "./noCarryAddition"

export const chainAdd = (s:string, n:number):string => {
    let i=0;
    let j=s.length-1;
    while(i<n){
        s += noCarryAddDigit(s[i], s[j]);
        i++;
        j++;
    }
    return s;
}
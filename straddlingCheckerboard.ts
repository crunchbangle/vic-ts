import { getSequencePositions } from "./columnarTransposition";

export const reGroup = (text:string):string => {
    return text.replace(/\s/g, '')
        .replace(/(\S{20})(?=\S)/g, '$1\n')
        .replace(/(\S{5})(?=\S)/g, '$1 ') + '\n';
}

class StraddlingCheckerboard {
    key: string[];
    phrase: string;
    dotPosition: number;
    slashPosition: number;
    enc: Map<string, string>;
    dec: Map<string, string>;
    block:string;
    
    constructor(key:string, phrase:string, dotPosition:number=18, slashPosition: 19){
        this.key = key.split('');
        this.phrase = phrase.toUpperCase();
        this.dotPosition = dotPosition;
        this.slashPosition = slashPosition;

        let abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        const topLine = this.phrase.split('');
        const shifts = [];

        this.enc = new Map<string, string>();
        this.dec = new Map<string, string>();

        this.block = ' '+this.key.join('')+'\n '+this.phrase+'\n';

        for(let i = 0; i < topLine.length; i++){
            const c = topLine[i];
            if(c === ' '){
                shifts.push(key[i]);
            }
            else {
                // remove from list
                abc = abc.replace(c, '');
                // add lookup
                this.enc.set(c, this.key[i]);
                this.dec.set(this.key[i], c);
            }
        }

        for(var j=0; j<shifts.length; j++){
            this.block += shifts[j];
            for(var i=0; i<this.key.length; i++){
                let c = '';
                if(this.dotPosition === j*10 + i){
                    c = '.';
                }
                else if(slashPosition === j*10 + i){
                    c = '/';
                }
                else {
                    c = abc[0];
                    abc = abc.substr(1);
                }
                this.block += c;
                const k = `${shifts[j]}${this.key[i]}`;
                this.enc.set(c, k);
                this.dec.set(k, c);
            }
            this.block += '\n';
        }
    }

    encode = (text:string):string => {
        const u = text.toUpperCase().replace(/\s+/g, '');
        if(u.match(/[^A-Z0-9\.]/) !== null){
            throw new Error('unencodable characters in input');
        }

        const parts = u.split(/(\d+)/);
        let s = '';
        for(let i=0; i<parts.length; i++){
            const part = parts[i];
            if(i % 2 == 0){
                // text for encoding
                for(var j=0; j<part.length; j++){
                    s += this.enc.get(part[j]);
                }
            }
            else {
                // numbers for shifting
                s += this.enc.get('/');
                for(var j=0; j<part.length; j++){
                    s += part[j] + part[j] + part[j];
                }
                s += this.enc.get('/');
            }
        }
        return reGroup(s);
    }

    decode = (text:string):string => {

        const u = text.replace(/\s+/g, '');
        if(u.match(/[^0-9]/) !== null){
            throw new Error('deencodable characters in input');
        }

        let i=0;
        let s='';
        while(i<u.length){
            const digit = u[i];
            if(this.dec.has(digit)){
                s += this.dec.get(digit);
            }
            else {
                i++;
                const digits = digit+u[i];
                if(!this.dec.has(digits)){
                    throw new Error(`input '${digits}' pair not decodable`);
                }
                const char = this.dec.get(digits);
                if(char === '/'){
                    // handle number shift
                    while(true){
                        i++;
                        const x = u[i];
                        i++;
                        const y = u[i];
                        if(x+y === this.enc.get('/')){
                            break; // '/' found, so break this loop
                        }
                        i++;
                        const z = u[i];
                        if(x !== y || y !== z){
                            throw new Error(`number shift decode failure at ${x}${y}${z}`);
                        }
                        s += x;
                    }
                }
                else {
                    s += char;
                }
            }
            i++;
        }

        return reGroup(s);
    }
}



export const straddlingCheckerboard = (key:string, phrase:string) => {
    return new StraddlingCheckerboard(key, phrase, 18, 19);
}


/*
 *

behaviours... remove spaces or replace them with . ?
/ is always number shift

 */
import { getSequencePositions } from "./columnarTransposition";


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
}



export const straddlingCheckerboard = (key:string, phrase:string) => {
    return new StraddlingCheckerboard(key, phrase, 18, 19);
}


/*
 *

behaviours... remove spaces or replace them with . ?
/ is always number shift

 */
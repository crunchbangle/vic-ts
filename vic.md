A random keygroup of 5 digits
B date, truncated to 5 digits
C A-B (no carrying)
D phrase truncated to 20 characters
E D sequenced (groups of 10)
F chain addition of C + '1234567890'
G E.1 + F.1
H encode G using E.2 for substitution (F.2 is lookup)
J H sequenced
K-P chain addition of H for 50 digits

add last two non identical digits to personal number
to get two new numbers
Q extract the first number from the start of K-P
and transpose via J (for columnar transposition)

R extract the next number from the remaining, probably
mid column, and transpose via J (for diagonal transposition)

S sequence P, used to key straddling checkerboard

S: 5961328470
   AT ONE SIR
6  BCDFGHLKLM
8  PQUVWXYZ./

Diagonal transposition is:

1. write row but stop before lowest key
2. write next row, making it one more than last
3. repeat 2 until back to key length
4. repeat 1-3 but stop before 2nd, 3rd, etc lowest key
5. continue until you have length/key rows
6. fill the blank spaces with the remainder

And then do a standard columnar transposition on the block.


Decipher:

Extract key group
generate the keys
undo diagonal columnar transposition
undo columnar transposition
generate checkerboard

So... functions:

store:
pin
date
phrase

gen random key
no carry addition
no carry subtraction
chain addition
extract last two non-repeated numbers
columnar transposition
diagonal transposition part 1: define shape
diagonal transposition part 2: fill
diagonal transposition part 3: extract
^
done all that now! 

straddling checkerboard

TODO: 

- straddling checkerboard encode/decode methods
- make a KnownData interface for pin/date/phrase?
- grouping
- keygroup insertion
- keygroup extraction
- full encryption
- full decryption



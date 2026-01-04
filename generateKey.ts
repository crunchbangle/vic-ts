/*
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
*/


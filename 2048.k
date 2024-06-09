// 2048 the game written by James Betz

// functions are single letter
// variables are double letter

// objective - terse as possible
//           - 2048 in 1 sentence

// character ruler
//' ^  ' |1 ' ^  ' |2 ' ^  ' |3 ' ^  ' |4 ' ^  ' |5 ' ^  ' |6 ' ^  ' |7 ' ^  ' |8 ' ^  ' |9 ' ^  ' |10

// Set the seed
// ."\\S ",*."\\date +%s"

// initialize table
n:4;l:(n*n)#0                                           // 13char
b::(n*!n)_l                                             // 11char
i::(+|:)\b                                              // 10char

// random number generation
g:{@[`l;(-x)?&l=0;:;x?4,9#2]}                           // 29char

// partial movement components
s:{n#(x@&~x=0),n#0}                                     // 19char
c:{7h$x*0{(2*~x=2)*(y+1)%2}\x=1_x,0N}                   // 37char

// general movement logic
m:{L:l;l::,/*|x(+|:')\(s c s@)'i x;if[~L~l;g 1;k`];b}   // 53char

// end game - definitely needs refactor
k:{exit@$[|/2048=l;0;(&/l>0)&&//~=':'i;1;:1]}           // 45char

// start game 
g 2;b                                                   // 5char

/-----------------------------------------------------------------
                                                        // 222char

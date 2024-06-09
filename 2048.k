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
sz:4;lb:pb:(sz*sz)#0                            // 20char
b::(sz*!sz)_lb                                  // 14char
i::(+|:)\b                                      // 10char

// random number generation
g:{@[`lb;(-x)?&lb=0;:;x?4,9#2]}                 // 31char

// partial movement components
s:{sz#(x@&~x=0),sz#0}                           // 21char
c:{7h$x*0{(2*~x=2)*(y+1)%2}\x=1_x,0N}           // 37char

// general movement logic
m:{@[`lb;x;:;s c s x]}                          // 22char
m:{lb::,/*|x(+|:')\(s c s@)'i x}                // 32char
mv:{l:lb;m x;if[~l~lb;pb::l;g 1;ck[]];b}        // 40char

// end game - definitely needs refactor
u:{lb::pb;b}                                    // 12char
ck:{exit@$[|/2048=lb;0;l lb;1;:1]}              // 34char
l:{$[&/x=0;0b;&//~=':'i]}                       // 25char

// start game 
g 2;b                                           // 5char

/-------------------------------------------------------
                                                // 303char

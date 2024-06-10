// 2048 the game written by James Betz

// objective - terse as possible
//           - 2048 in 1 sentence

// how to play:
// b - board
// m - move
//      0 - left
//      1 - down
//      2 - right
//      3 - up

// how to win: 
// read exit code
//      0 - win
//      1 - lose

// example start command
// q 2048.k -S 12345 && echo "You win!" || echo "You lose!"

// character ruler
//' ^  ' |1 ' ^  ' |2 ' ^  ' |3 ' ^  ' |4 ' ^  ' |5

// initialize table
l:16#0                                                  // 6char
b::(4*!4)_l                                             // 11char
i::3(+|:)\b                                             // 11char

// random number generation
g:{@[`l;(-x)?&l=0;:;x?4,9#2]}                           // 29char

// partial movement components
s:{4#(x@&x>0),4#0}                                      // 18char
c:{x*0{(x<2)*y+1}\x=1_x,1}                              // 26char

// general movement logic
m:{L:l;l::,/*|x(+|:')\(s c s@)'i x;g@~L~l;k`;b}         // 47char

// end game 
k:{exit@$[|/2048=l;0;(&/l>0)&&//~=':'i;1;:1]}           // 45char

// start game 
g 2                                                     // 3char

/-----------------------------------------------------------------
                                                        // 196char

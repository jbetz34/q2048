// 2048 the game written by James Betz

// random seed
system"S ",string "i"$.z.T

// initialization
SIZE:4;
lineboard:(SIZE*SIZE)#0;
prevboard:(SIZE*SIZE)#0;
board::SIZE cut lineboard

// random number generation
gen:{@[`lineboard;neg[x]?where lineboard=0;:;twoOrFour[x]]}
twoOrFour:{x?4,9#2}  / 90% chance of 2

// partial movement components
slide:{SIZE#,[;SIZE#0] x where not x=0}
collapse:{7h$x*1_({(2*x<>2)*(y+1)%2}\) 0b,x=next x}

// general movement logic
m:{@[`lineboard;x;:;slide collapse slide lineboard[x]]};
move:{l:lineboard;(m')indx x;if[not l~lineboard;prevboard::l;gen 1;check[]];board}

// directional indexes
ui::*[SIZE;til SIZE] +/: til SIZE
di::*[SIZE;desc til SIZE] +/: til SIZE
li::til[SIZE] +/: SIZE*til SIZE
ri::desc[til SIZE] +/: SIZE*til SIZE

// directional index dictionary
indx::`up`down`left`right!(ui;di;li;ri)

// end game
undo:{lineboard::prevboard;board}
check:{$[any 2048=lineboard;show "Congrats you win!"; lose[lineboard];show "You lost";(::)]}
lose:{$[any x=0;0b;c~(collapse') c:x[ui,di,li,ri]]}

// start game
init:{lineboard::(SIZE*SIZE)#0;gen 2;show board}
init[]

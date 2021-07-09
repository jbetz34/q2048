// 2048 the game written by James Betz


// initialization
lineboard:16#0;
board:{4 cut lineboard};

// random number generation
gen:{[x] @[`lineboard;x?where lineboard=0;:;twoOrFour[x]]}
twoOrFour:{[x] x?2 2 2 2 2 2 2 2 2 4}

// partial movement components
slide:{4#,[;4#0] x where not x=0};
collapse:{[x] 
	$[not null i:first where ({all (x=y;not x=0)}':)x;
	  [
		x:@[x;i;2*];
		x:@[x;i-1;:;0];
		.z.s x
	  ];
		:x
	]
	};

// general movement logic
move:{@[`lineboard;x;:;slide collapse slide lineboard[x]]};

// directional indexes
ui:*[4;til 4] +/: til 4;
di:*[4;desc til 4] +/: til 4;
li:til[4] +/: 4*til 4;
ri:desc[til 4] +/: 4*til 4;

// directional moves
u:{move each ui;gen 1;check[];board[]}
d:{move each di;gen 1;check[];board[]}
l:{move each li;gen 1;check[];board[]}
r:{move each ri;gen 1;check[];board[]}

// end game
check:{$[win[lineboard];show "Congrats you win!";lose[lineboard];show "You lost";(::)]}
win:{any x=2048}
lose:{$[any x=0;0b;all {all x=collapse x}each x[ui,di,li,ri]]}

// start game
gen 2;show board[]

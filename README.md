# 2048 in q

### Game description
"2048 is played on a plain 4×4 grid, with numbered tiles that slide when a player moves them using the four arrow keys. Every turn, a new tile randomly appears in an empty spot on the board with a value of either 2 or 4. Tiles slide as far as possible in the chosen direction until they are stopped by either another tile or the edge of the grid. If two tiles of the same number collide while moving, they will merge into a tile with the total value of the two tiles that collided. The resulting tile cannot merge with another tile again in the same move. Higher-scoring tiles emit a soft glow; the highest possible tile is 131,072.

If a move causes three consecutive tiles of the same value to slide together, only the two tiles farthest along the direction of motion will combine. If all four spaces in a row or column are filled with tiles of the same value, a move parallel to that row/column will combine the first two and last two.[8] A scoreboard on the upper-right keeps track of the user's score. The user's score starts at zero, and is increased whenever two tiles combine, by the value of the new tile.

The game is won when a tile with a value of 2048 appears on the board. Players can continue beyond that to reach higher scores. When the player has no legal moves (there are no empty spaces and no adjacent tiles with the same value), the game ends."
	-- Wikipedia

### Game Functions
- board[]
	- Will display the current board

- undo[]
        - Reverts board to previous state
        - Only works once

- u[]
	- Will move all current board tiles *up*
	- Will generate another tile
	- Will check to see if the game is won or lost
	- Will display the new baord 

- d[]
	- Will move all current board tiles *down*
	- Will generate another tile
	- Will check to see if the game is won or lost
	- Will display the new baord 

- l[]
	- Will move all current board tiles *left*
	- Will generate another tile
	- Will check to see if the game is won or lost
	- Will display the new baord 

- r[]
	- Will move all current board tiles *right*
	- Will generate another tile
	- Will check to see if the game is won or lost
	- Will display the new baord 

### Technical Specifications
- lineboard
	- The critical list variable that contains all the values for the game. Movement functions manipulate this variable to achieve desired movement and board function simply formats the resutls
	- Originally consisting of 16#0, the script initialization randomly generates 2 tiles on this board to begin

- gen[x]
	- generation function responsible for creating new tiles at the beginning of the game and after each move
	- x determines the number of random empty tiles (denoted by 0 value) that should be filled
	- the is a 90% chance of 2 and 10% chance of 4

- check[]
	- Function used to determine if a player has won or lost
	- A player will win if any of the lineboard values are equal to 2048
	- A player will lose if both of the conditions are met:
		1. There are no more empty tiles
		2. There are no equal, adjacent tiles on the board

### Future Improvements
There are hopes and aspirations to add a UI to this using web sockets or possibly host this as awidely accessible game on the cloud. These goals will very likely never be achieved, but a man can dream. 

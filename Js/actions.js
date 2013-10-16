//touch create the events 
var touchable = 'createTouch' in document;
var canvas = document.getElementById('gameCanvas');
ctx = canvas.getContext('2d');

// class for the game play 
var gamePlay = new (function()
{  
	// player variables
	keyY = 250;
	//keyYold = 250;
	cpuY = 250;
	cpuYold = 0;
	ballX = 400;
	ballY = 295;
	ballXSpeed = -4;
	ballYSpeed = 0;
	cpuScore = 0;
	playerScore = 0;
	baseSpeed = 4;
	speedUpper = 0;
	lives = 3;
		
	window.addEventListener('keydown', function(e)
	{
	    if (e.keyCode === 38) 
	    { 
	    	keyY = keyY - 10;
	    	cpuY = cpuY - 10;
	    }
	    if (e.keyCode === 40) 
	    { 
	    	cpuY = cpuY + 10;
	    	keyY = keyY + 10;
	    }
	});
	
	
	/// this is my gameloop where all collisions and drawing is performed
	setInterval(function()
	{
		
		
		// gives the ball its velocity
		ballX = ballX + ballXSpeed;
		ballY = ballY + ballYSpeed;	
		
		// checks if the ball is within the canvas 
		if(ballX > 757)
		{
			// checks the paddle to see if the ball has hit it.
			if((cpuY - 60) < ballY && (cpuY + 60) > ballY)
			{
				// switches the ball direction if it hits the paddle.
				ballXSpeed = -baseSpeed;
				// checks where the paddle is
				hitPlace = (cpuY - ballY) + 60;
				// when it hits the paddle change the direction so that it does keep goin in the same direction
				hitPlaceP = 100 - (Math.round((hitPlace / 120 * 100)));
				// change the y pos of the ball.
				ballYSpeed = ((8 * (hitPlaceP / 100)) - 4)+0.5;
				//increments the score every time it hits the paddle.
				playerScore++;
				//play a sound when the ball hits the paddle 
				play();
			}
			// else the ball has gone beyond the player and reset the ball  pos and score
			else
			{
				//if the ball goes out of bounds reset all variables.
				reset();
			}
		}
		// if the ball is less than 0 player paddle.
		if(ballX < 0)
		{
			// checks the paddle to see if the ball has hit it.
			if((keyY - 60) < ballY && (keyY + 60) > ballY)
			{
				// switches the ball direction if it hits the paddle.
				ballXSpeed = baseSpeed;
				// checks where the paddle is
				hitPlace = (keyY - ballY) + 60;
				// when it hits the paddle change the direction so that it does keep goin in the same direction
				hitPlaceP = 100 - (Math.round((hitPlace / 120 * 100)));
				// change the y pos of the ball.
				ballYSpeed = ((8 * (hitPlaceP / 100)) - 4)+0.5;
				//increments the score every time it hits the paddle.
				playerScore++;
				play();
			}
			else
			{
				//if the ball goes out of bounds reset all variables.
				reset();
			}
		}
		// keeps the ball within the canvas border
		if(ballY>594)
		{
			ballYSpeed = ballYSpeed * -1;
		}
		// keeps the ball within the canvas border
		if(ballY<1)
		{
			ballYSpeed = ballYSpeed * -1;
		}
		
		// this check for touch events
		//checkPosition();
		// draw the black background for game
		drawBackground();
		// draws the player bat 
		drawPlayerBat();
		// draws the player2 bat 
		drawComputerBat();
		// draws the game 
		drawBall();
		// draws the current score
		drawScore();
		// draws remaining lives
		drawLives();
		checkPosition();
		// this checks if the game is over
		if(lives == 0)
		{
			//all lives are gone so game over, option to play again
			gameOver();
			//stops the ball from moving.
			ballXSpeed = 0;
			ballYSpeed = 0;
			//takes the ball off screen
			ballX = 100;
			ballY = -10;
		}
		
	},(1000/60));// game loop
});
// check position for the touch events
function checkPosition()
{
	// checks the old pos to the new pos
    if (gamePlay.keyY != gamePlay.keyYold)
    {
            // if the touchY < touchOldY
            if(gamePlay.keyY < gamePlay.keyYold)
            {
            	// moves paddle up 
            	gamePlay.keyY = gamePlay.keyY + 10;
            }
            if(gamePlay.keyY > gamePlay.keyYold)
            { 
            	// moves paddle down
            	gamePlay.keyY = gamePlay.keyY - 10;
            }
    }
};
// declaring the touch events for game
if(touchable) 
{
	b_canvas.addEventListener( 'touchstart', onTouchStart, false );
	b_canvas.addEventListener( 'touchmove', onTouchMove, false );
	b_canvas.addEventListener( 'touchend', onTouchEnd, false );
}
//makes the pos of paddle to touch event Y 
function onTouchStart(event) 
{
	touches = event.touches;
	gamePlay.keyYold = touches[0].clientY;
}
// prevents from upsetting the game 
function onTouchMove(event) 
{
	 // Prevent the browser from doing its default thing (scroll, zoom)
	event.preventDefault(); 
	touches = event.touches;
}
// play the sound when ball hits the paddle
function play()
{
	var ping = new Audio("sounds/paddleSound.ogg");
	ping.play();
}
// this is the function to reset all the variables if ball goes out of bounds.
function reset()
{
	lives--;
	var OOB = new Audio("sounds/boom.mp3");
	OOB.play();
	ballX = 400;
	ballY = 295;
	ballXSpeed = -4;
	ballYSpeed = 0;
	baseSpeed = 4;
}
// function for gameOver displaying the text and enable player to play again
function gameOver()
{
	//declaring the font type
	ctx.font = "30px Verdana";
	// declaring the font colour
	ctx.fillStyle = "#7FFF00";
	//the text displayed and its position
	ctx.fillText("Well Done",350,250);
	ctx.fillText("Final Score:" + playerScore,340,300);
	ctx.fillText("Start New Game ",320,350);
	ctx.fillText("     Y)es",350,400);
	//press the y key to start after game over
	window.addEventListener('keydown', function(e)
	{
		// key code for Y key
		  if (e.keyCode === 89) 
		  	{ 
			  	// resets all positions and UI value
			   	reset();
			   	//lives back to 3 
			    lives = 3;
			    //sets the player's score back to 0
			    playerScore = 0;
			}	
	});
}

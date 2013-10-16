
var gameObjects = new (function()
{  
//this shows the final score after the game is over 
function gameOver()
{
	ctx.font = "22px Verdana";
	ctx.fillText("Well Done",340,50);
	ctx.fillText("Final Score:" + playerScore,340,100);
	ctx.fillStyle = "#7FFF00";
}
});

//draws the score 
function drawScore()
{
	ctx.font = "26px Verdana";
	ctx.fillText("Score: " + playerScore, 340, 30);
	ctx.fillStyle = "#7FFF00";
}
function drawLives()
{
	ctx.font = "22px Verdana";
	ctx.fillText("Lives:" + lives,200,30);
	ctx.fillStyle = "#7FFF00";
}
// draws the ball 
function drawBall()
{
	ctx.fillStyle = "#7FFF00";
	ctx.fillRect((18+ballX),ballY,8,8);
}
// draws the paddle on left 
function drawPlayerBat()
{
	ctx.fillStyle = "#7FFF00";
	ctx.fillRect(10,(keyY - 60),8,120);
}
//draws the paddle on the right 
function drawComputerBat()
{
	ctx.fillStyle = "#7FFF00";
	ctx.fillRect(780, (cpuY - 60),8,120);
}
// draws the black back ground
function drawBackground()
{
	ctx.clearRect(0,0,800,600);
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,0,800,600);	
}


var context;
var pacman = new Object();
var board= getBoard();
var boardColLength = board.length;
var boardRowLength = board[0].length;
var upKey;
var downKey;
var leftKey;
var rightKey;
var pacDir;
var pacEyeX;
var pacEyeY;
var score;
var pac_color;//TODO DELETE if delete green
var start_time;
var time_elapsed;
var end_time;
var pac_interval;	
var ghost_interval;	
var refrashRateGhosts = 300;	
var refrashRatePacman = 120;

var food_remain;
var smallFoodColor;
var mediumFoodColor;
var largeFoodColor;
var numOfGhosts;
var lives;
var ghosts_curr_loc ={0:[1,1],1:[boardColLength-2,boardRowLength-2],2:[1, boardRowLength-2],  3:[boardColLength-2, 1]};
var ghost_starter_loc =  {0:[1,1], 1:[boardColLength-2,boardRowLength-2], 2:[1, boardRowLength-2],  3:[boardColLength-2, 1]};//TODO change const 
var moving_score_loc = [13,15];
var moving_score_eaten = false;
var canvas_background_color = "black";	
var clock_img = new Image();	
clock_img.src = "./images/clock.png";	
var heart_img = new Image();	
heart_img.src = "./images/heart.png";	
var moving_score_img = new Image();	
moving_score_img.src = "./images/strawberry.png";	
var ghosts_imges = [new Image(),new Image(),new Image(),new Image()];	
const ghosts_srcs = ["./images/ghost1.png", "./images/ghost2.png", "./images/ghost3.png", "./images/ghost4.png"]	
for (var i = 0; i < 4; i++){	
	ghosts_imges[i].src = ghosts_srcs[i];	
}


$(document).ready(function() {
	context = canvas.getContext("2d");
	scale = (canvas.height/(boardRowLength));
	$("#newGameBtn").click(Start);
	// $("#endNewGame").click(showGameScreen);
	// $("#endToSettings").click(showSettingScreen);
	// $("#pause_play_Btn").click(pauseGame);
	// $("#mute_Btn").click(muteAudio);
	//Start();//TODO: DELETE
});

//setSettings(38,40,37,39,60,"#1ACFCE", "#F1C216", "#46D852",60,4)//TODO DELETE
function setSettings(up, down, left, right,numOfBalls, smallBallColor, mediumBallColor, largeBallColor, gameTime, numOfMonsters){
	upKey = up;
	downKey = down;
	leftKey = left;
	rightKey = right;
	food_remain = numOfBalls;
	end_time = gameTime;
	smallFoodColor = smallBallColor;
	mediumFoodColor = mediumBallColor;
	largeFoodColor = largeBallColor;
	numOfGhosts = numOfMonsters;
}

function showGameScreen(){
	$("#gameScreen").show();
	$("#welcomeScreen").hide();
	$("#registerScreen").hide();
    $("#loginScreen").hide();
	$("#settingScreen").hide();
	Start();
}

function Start() {
	board = getBoard();
	score = 0;
	lives=5;
	pac_color = "yellow";
	pacDir = 0;
	pacEyeX = scale/12;
	pacEyeY = -3*scale/12;
	start_time = new Date();
	window.clearInterval(pac_interval);
	window.clearInterval(ghost_interval);
	//creating movingScore
	moving_score_loc = [13,15];
	moving_score_eaten = false;

	respawnPlayers();

	//create time 
	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 8;

	//creating heart
	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 7;

	//creating food
	let small_food_num = parseInt((food_remain*60)/100);
	let medium_food_num = parseInt((food_remain*30)/100);
	let large_food_num = parseInt((food_remain*10)/100);
	let diff = food_remain-small_food_num - medium_food_num - large_food_num;
	if(diff > 0){
		small_food_num +=diff;
	}

	while (small_food_num > 0) { //create small balls
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 5;
		small_food_num--;
	}
	while (medium_food_num > 0) { //create small balls
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 15;
		medium_food_num--;
	}
	while (large_food_num > 0) { //create small balls
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 25;
		large_food_num--;
	}

	//event of key press
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	Draw();
	pac_interval = setInterval(UpdatePositionPacman, refrashRatePacman);	
	ghost_interval = setInterval(UpdatePositionGhosts, refrashRateGhosts);
	
	
	//display settings inside the game:
	displaySettings()
}

function displaySettings(){
	$("#upKeyDisplay").html($("#upKey").val());
	$("#downKeyDisplay").html($("#downKey").val());
	$("#leftKeyDisplay").html($("#leftKey").val());
	$("#rightKeyDisplay").html($("#rightKey").val());
	$("#numOfBallsDisplay").html(food_remain);
	$("#bigBallColorDisplay").val(largeFoodColor);
	$("#midBallColorDisplay").val(mediumFoodColor);
	$("#smallBallColorDisplay").val(smallFoodColor);
	$("#gameTimeDisplay").html(end_time);
	$("#numOfGhostsDisplay").html(numOfGhosts);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * (boardColLength-1) + 1);
	var j = Math.floor(Math.random() * (boardRowLength-1) + 1);
	while (board[i][j] != 0 || isGhostInLoc(i,j)!=-1 || isMovingScore(i,j)) {
		i = Math.floor(Math.random() * (boardColLength-1) + 1);
		j = Math.floor(Math.random() * (boardRowLength-1) + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[upKey]) {
		return 1;
	}
	if (keysDown[downKey]) {
		return 2;
	}
	if (keysDown[leftKey]) {
		return 3;
	}
	if (keysDown[rightKey]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	lblLives.value = lives;
	for (var i = 0; i < boardColLength; i++) {
		for (var j = 0; j < boardRowLength; j++) {
			var center = new Object();
			center.x = i *  scale + scale/2;
			center.y = j *  scale + scale/2;
			context.beginPath();	
			context.rect(center.x - scale/2, center.y - scale/2, scale, scale);	
			context.fillStyle = canvas_background_color; //color	
			context.fill();
			if (board[i][j] == 2) {//Draw pacman
				context.beginPath();
				context.arc(center.x, center.y, scale/2, (pacDir*0.5 +0.15) * Math.PI, (pacDir*0.5 +1.85 )* Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + pacEyeX, center.y +pacEyeY, scale/12, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();

			} else if (board[i][j] == 4) {//draw wall
				context.beginPath();
				context.rect(center.x - scale/2, center.y - scale/2, scale, scale);
				context.fillStyle = "pink"; //color
				context.fill();
			} else if (board[i][j] == 5) {//draw small food
				context.beginPath();
				context.arc(center.x, center.y, scale/7, 0, 2 * Math.PI); // small circle
				context.fillStyle = smallFoodColor; //small color
				context.fill();

			} else if (board[i][j] == 15) {//draw medium food
				context.beginPath();
				context.arc(center.x, center.y, scale/4, 0, 2 * Math.PI); // medium circle
				context.fillStyle = mediumFoodColor; //medium color
				context.fill();

			} else if (board[i][j] == 25) {//draw large food
				context.beginPath();
				context.arc(center.x, center.y, scale/3, 0, 2 * Math.PI); // large circle
				context.fillStyle = largeFoodColor; //large color
				context.fill();
			}
			else if (board[i][j] == 8) {//draw time
				context.drawImage(clock_img, i*scale, j*scale,scale, scale);

			}
			else if (board[i][j] == 7) {//draw heart
				context.drawImage(heart_img, i*scale, j*scale,scale, scale);

			}
			if (isMovingScore(i,j) && !moving_score_eaten) {//draw moving score 
				context.drawImage(moving_score_img, i*scale, j*scale,scale, scale);
			} 
			let ghost_id = isGhostInLoc(i,j);	
			if (ghost_id!=-1 &&board[i][j] != 4) {//draw ghost	
				context.drawImage(ghosts_imges[ghost_id], i*scale, j*scale,scale, scale);
			}

		}
	}
}

function movePacman(new_i,new_j, newPacDir, Xscale, Yscale){
	pacman.i = new_i;
	pacman.j = new_j;
	pacDir = newPacDir;
	pacEyeX = Xscale*scale/12;
	pacEyeY = Yscale*scale/12;
}

function UpdatePositionPacman() {//update pos is called by a time interval so it can be used to update the position for everybody
	//TODO? pause
	//update pacman position
	board[pacman.i][pacman.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {//up
		if (isValidMove(pacman.i,pacman.j-1)) {
			movePacman(pacman.i,pacman.j-1,3,3,-1)
		}
	}
	if (x == 2) {//down
		if (isValidMove(pacman.i,pacman.j+1)) {
			movePacman(pacman.i,pacman.j+1,1,3,1)
		}
	}
	if (x == 3) {//left
		if (isValidMove(pacman.i-1,pacman.j)) {
			movePacman(pacman.i-1,pacman.j,2,-1,-3)

		}
		else if(isValidOpposite(pacman.i-1,pacman.j)){
			movePacman(boardColLength-1,pacman.j,2,-1,-3)
		}
	}
	if (x == 4) {//right
		if (isValidMove(pacman.i+1,pacman.j)) {
			movePacman(pacman.i+1,pacman.j,0,1,-3)
		}
		else if(isValidOpposite(pacman.i+1,pacman.j)){
			movePacman(0,pacman.j,0,1,-3)
		}
	}
	
	//check if pacman interacted with food/monsters
	if(isGhostInLoc(pacman.i,pacman.j)==-1){
		if (board[pacman.i][pacman.j] == 5) {//if pacman reached small ball
			score+=5;
			food_remain--;
		}
		else if (board[pacman.i][pacman.j] == 15) {//if pacman reached medium ball
			score+=15;
			food_remain--;
		}
		else if (board[pacman.i][pacman.j] == 25) {//if pacman reached large ball
			score+=25;
			food_remain--;
		}
		else if (board[pacman.i][pacman.j] == 8) {//if pacman reached clock
			end_time=parseInt(end_time)+10;

		}	
		else if (board[pacman.i][pacman.j] == 7) {//if pacman reached heart
			lives++;
		}
		if (isMovingScore(pacman.i,pacman.j)&&!moving_score_eaten) {//if pacman reached movingScore
			moving_score_eaten=true;
			score+=50;
		}	
		board[pacman.i][pacman.j] = 2;

	}
	else {//if pacman reached ghost
		score-=10;
		lives--;
		lblLives.value=lives;
		//TODO eaten music
		if(lives==0){
			window.clearInterval(pac_interval);	
			window.clearInterval(ghost_interval);
			//TODO gameOver();
		}
		else{
		respawnPlayers();
		}
	}
	
	var currentTime = new Date();
	time_elapsed = parseInt(end_time- (currentTime - start_time) / 1000)+1;
	// if (score >= 20 && time_elapsed <= 10) {
	// 	pac_color = "green";
	// }
	Draw();
	
	if (food_remain== 0) {//TODO win

		window.clearInterval(pac_interval);	
		window.clearInterval(ghost_interval);
		//window.alert("Game completed");
	} 	
	else if (time_elapsed <= 0) {//TODO win
		lblTime.value = 0;
		window.clearInterval(pac_interval);	
		window.clearInterval(ghost_interval);
		//window.alert("Game over");
	} 
}

function UpdatePositionGhosts(){	
	moveGhosts();	
	moveMovingScore();	
}

function respawnPlayers(){
	//creating ghosts
	for(var i=0;i<numOfGhosts;i++){
		ghosts_curr_loc[i] =  ghost_starter_loc[i];
		
	}

	//creating pacman
	var emptyCell = findRandomEmptyCell(board);
	board[emptyCell[0]][emptyCell[1]] = 2;
	pacman.i = emptyCell[0];
	pacman.j = emptyCell[1];
}

function getBoard(){
	let board = [
		[4, 4, 4, 4, 4 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
		[4, 0, 0, 0, 0 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 4 ,4 ,0 ,4 ,4, 4, 4, 4, 0, 4, 4, 0, 4, 4, 4 ,4 ,4 ,0 ,4, 4, 4, 4, 0, 4],
		[4, 0, 4, 4, 4 ,4 ,0 ,4 ,4, 4, 4, 4, 0, 4, 4, 0, 4, 4, 4 ,4 ,4 ,0 ,4, 4, 4, 4, 0, 4],
		[4, 0, 4, 4, 4 ,4 ,0 ,4 ,4, 4, 4, 4, 0, 4, 4, 0, 4, 4, 4 ,4 ,4 ,0 ,4, 4, 4, 4, 0, 4],
		[4, 0, 0, 0, 0 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 4 ,4 ,0 ,4 ,4, 0, 4, 4, 4, 4, 4, 4, 4, 4 ,0 ,4, 4 ,0 ,4, 4, 4, 4, 0, 4],
		[4, 0, 4, 4, 4 ,4 ,0 ,4 ,4, 0, 4, 4, 4, 4, 4, 4, 4, 4 ,0 ,4 ,4, 0 ,4, 4, 4, 4, 0, 4],
		[4, 0, 0, 0, 0 ,0 ,0 ,4 ,4, 0, 0, 0, 0, 4, 4, 0, 0, 0 ,0 ,4 ,4, 0 ,0, 0, 0, 0, 0, 4],
		[4, 4, 4, 4, 4 ,4 ,0 ,4 ,4, 4, 4, 4, 0, 4, 4, 0, 4, 4, 4 ,4 ,4 ,0 ,4, 4, 4, 4, 4, 4],
		[3, 3, 3, 3, 3 ,4 ,0 ,4 ,4, 4, 4, 4, 0, 4, 4, 0, 4, 4, 4 ,4 ,4 ,0 ,4, 3, 3, 3, 3, 3],
		[3, 3, 3, 3, 3 ,4 ,0 ,4 ,4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,4 ,4 ,0 ,4, 3, 3, 3, 3, 3],
		[3, 3, 3, 3, 3 ,4 ,0 ,4 ,4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,4 ,4 ,0 ,4, 3, 3, 3, 3, 3],
		[4, 4, 4, 4, 4 ,4 ,0 ,4 ,4, 0, 4, 4, 4, 0, 0, 4, 4, 4, 0 ,4 ,4 ,0 ,4, 4, 4, 4, 4, 4],
		[0, 0, 0, 0, 0 ,0 ,0 ,0 ,0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0 ,0 ,0 ,0 ,0, 0, 4, 0, 0, 0, 0, 0, 0, 4, 0 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 0],
		[4, 4, 4, 4, 4 ,4 ,0 ,4 ,4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0 ,4 ,4 ,0 ,4, 4, 4, 4, 4, 4],
		[3, 3, 3, 3, 3 ,4 ,0 ,4 ,4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,4 ,4 ,0 ,4, 3, 3, 3, 3, 3],
		[3, 3, 3, 3, 3 ,4 ,0 ,4 ,4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,4 ,4 ,0 ,4, 3, 3, 3, 3, 3],
		[4, 4, 4, 4, 4 ,4 ,0 ,4 ,4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0 ,4 ,4 ,0 ,4, 4, 4, 4, 4, 4],
		[4, 0, 0, 0, 0 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 4 ,4 ,0 ,4 ,4, 4, 4, 4, 0, 4, 4, 0, 4, 4, 4 ,4 ,4 ,0 ,4, 4, 4, 4, 0, 4],
		[4, 0, 4, 4, 4 ,4 ,0 ,4 ,4, 4, 4, 4, 0, 4, 4, 0, 4, 4, 4 ,4 ,4 ,0 ,4, 4, 4, 4, 0, 4],
		[4, 0, 0, 0, 4 ,4 ,0 ,0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,4, 4, 0, 0, 0, 4],
		[4, 4, 4, 0, 4 ,4 ,0 ,4 ,4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0 ,4 ,4 ,0 ,4, 4, 0, 4, 4, 4],
		[4, 4, 4, 0, 4 ,4 ,0 ,4 ,4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 0 ,4 ,4 ,0 ,4, 4, 0, 4, 4, 4],
		[4, 0, 0, 0, 0 ,0 ,0 ,4 ,4, 0, 0, 0, 0, 4, 4, 0, 0, 0 ,0 ,4 ,4, 0 ,0, 0, 0, 0, 0, 4],
		[4, 0, 4, 4, 4 ,4 ,4 ,4 ,4, 4, 4, 4, 0, 4, 4, 0, 4, 4, 4 ,4 ,4 ,4 ,4, 4, 4, 4, 0, 4],
		[4, 0, 4, 4, 4 ,4 ,4 ,4 ,4, 4, 4, 4, 0, 4, 4, 0, 4, 4, 4 ,4 ,4 ,4 ,4, 4, 4, 4, 0, 4],
		[4, 0, 0, 0, 0 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 4],
		[4, 4, 4, 4, 4 ,4 ,4 ,4 ,4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
	]
	 return board = board[0].map((_, colIndex) => board.map(row => row[colIndex]));
}

function isValidMove(i,j){
	if(i<0 || i>=boardColLength || j<0 || j>=boardRowLength){
		return false; 
	}
	if(board[i][j] == 4){
		return false;
	}
	return true;
}

function isValidOpposite(i,j){
	//only horizontal
	if(j==-1 || j==boardRowLength){
		return false;
	}
	if(i==-1 && board[boardColLength-1][j] != 4){
		return true;
	}
	if(i==boardColLength && board[0][j] != 4){
		return true;
	}
	return false;
}

//Ghost functions
function isGhostInLoc(i,j){
	for(var n=0; n<numOfGhosts; n++){
		if(ghosts_curr_loc[n][0]==i && ghosts_curr_loc[n][1]==j)
			return n;
	}
	return -1;
}

function isMovingScore(i,j){
	if(moving_score_loc[0]==i && moving_score_loc[1]==j && !moving_score_eaten)
		return true;
	return false;

}

function ghostMinDiffFromPac(ghost_i,ghost_j,previousBestMove){
	let diff = Infinity;
	let min_diff=previousBestMove[2]
	if(isGhostInLoc(ghost_i,ghost_j)!=-1 || isMovingScore(ghost_i,ghost_j)){
		return previousBestMove;
	}
	if(isValidMove(ghost_i,ghost_j)){
		diff = Math.abs(pacman.i-ghost_i)+Math.abs(pacman.j-ghost_j);
	}
	else if(isValidOpposite(ghost_i,ghost_j)&&ghost_i==-1){
		diff = Math.abs(pacman.i-(boardColLength-1))+Math.abs(pacman.j-ghost_j);
		ghost_i=boardColLength-1
	}
	else if(isValidOpposite(ghost_i,ghost_j)&&ghost_i==boardColLength){
		diff = Math.abs(pacman.i-0)+Math.abs(pacman.j-ghost_j);
		ghost_i=0;
	}
	if (diff<min_diff){
		min_diff=diff;
		return [ghost_i,ghost_j,min_diff]
	}
	return previousBestMove
}

function ghostBestMove(ghost_i, ghost_j){
	var best_move = [ghost_i,ghost_j,Infinity];
	best_move = ghostMinDiffFromPac(ghost_i,ghost_j-1,best_move)
	best_move = ghostMinDiffFromPac(ghost_i,ghost_j+1,best_move)
	best_move = ghostMinDiffFromPac(ghost_i-1,ghost_j,best_move)
	best_move = ghostMinDiffFromPac(ghost_i+1,ghost_j,best_move)
	return [best_move[0],best_move[1]];
}


function moveGhosts(){  
	for(var n = 0 ; n < numOfGhosts ; n++){
		let best_move = ghostBestMove(ghosts_curr_loc[n][0],ghosts_curr_loc[n][1])
		ghosts_curr_loc[n] = best_move
	}

}

function moveMovingScore(){ 
	if(!moving_score_eaten){
		moving_score_loc=randomMove(moving_score_loc[0],moving_score_loc[1])
	}
}

function randomMove(i,j){
	var move = Math.floor(Math.random() * 4);
	var foundMove = false;
	let new_i = i;
	let new_j = j;
	while (!foundMove) {
		new_i = i;
		new_j = j;
		if(move==0){//up{
			new_j=j-1;
		}
		else if(move==1){//down
			new_j=j+1;
		}
		else if(move==2){//left
			new_i=i-1;
		}
		else if(move==3){//right
			new_i=i+1;
		}
		if(isGhostInLoc(new_i,new_j)==-1 && board[new_i][new_j]!=4){
			foundMove=true;
		}
		move = Math.floor(Math.random() * 4);
	}
	return [new_i,new_j]
}


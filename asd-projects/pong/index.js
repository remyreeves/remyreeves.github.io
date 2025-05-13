/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13
  }
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height()
  // Game Item Objects
  var leftPaddle = ObjectFactory("#leftPaddle");
  var rightPaddle = ObjectFactory("#rightPaddle");
  var ball = ObjectFactory("#ball");
  var player1Score = 0;
  var player2Score = 0;
  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  //$(document).on('eventType', handleEvent);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keydown', handleKeyDown);                           // handling key down events
  $(document).on('keyup', handleKeyUp);
  startBall();
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem(leftPaddle);
    repositionGameItem(rightPaddle);
    repositionGameItem(ball);
    wallCollision(leftPaddle);
    wallCollision(rightPaddle);
    wallCollision(ball);
    redrawGameItem(leftPaddle);
    redrawGameItem(rightPaddle);
    redrawGameItem(ball);
  }
  /*
  Called in response to keypresses.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.W) {
      leftPaddle.speedY = -5;
      console.log("W pressed");
    }
    if (event.which === KEY.S) {
      leftPaddle.speedY = 5;
      console.log("S pressed");
    }
    if (event.which === KEY.UP) {
      rightPaddle.speedY = -5;
      console.log("UP pressed");
    }
    if (event.which === KEY.DOWN) {
      rightPaddle.speedY = 5;
      console.log("DOWN pressed");
    }
    if (event.which === KEY.ENTER) {
      changeColor();
    }
    //console.log(event.which)
  }
  /*
    Called in response to key releases.
  */
  function handleKeyUp(event){
    if (event.which === KEY.W) {
      leftPaddle.speedY = 0;
      console.log("W released");
    }
    if (event.which === KEY.S) {
      leftPaddle.speedY = 0;
      console.log("S released");
    }
    if (event.which === KEY.UP) {
      rightPaddle.speedY = 0;
      console.log("UP released");
    }
    if (event.which === KEY.DOWN) {
      rightPaddle.speedY = 0;
      console.log("DOWN released");
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  /*
  Create game items with good coding practices
  */
  function ObjectFactory(id){
    var gameItem = {};
    gameItem.id = id;
    gameItem.x = parseFloat($(id).css("left"));
    gameItem.y = parseFloat($(id).css("top"));
    gameItem.speedX = 0;
    gameItem.speedY = 0;
    gameItem.width = $(id).width();
    gameItem.height = $(id).height();
    return gameItem;
  }
  //taking an object and moving it
  function repositionGameItem(item) {
    //pulling all relevant data
    let speedX = item.speedX;
    let speedY = item.speedY;
    //move position in data
    item.x += speedX;
    item.y += speedY;
  }
  //taking an object and moving it visually
  function redrawGameItem(item) {
    //pulling all relevant data, minus speed values, it's already been moved by repositionGameItem
    let coordX = item.x;
    let coordY = item.y;
    let id = item.id;
    //redraw X pixels from the left of origin and Y pixels from the top according to new values from repositionGameItem
    $(item.id).css("left", coordX);
    $(item.id).css("top", coordY);
  }
  //be moved behind walls when past them
  function wallCollision(item) {
    //pull relevant data, dont copy coords to a container you need to edit them directly, not the copied version
    //actually nevermind, do make containers for shortening the conditionals parts
    let coordX = item.x;
    let coordY = item.y;
    let speedX = item.speedX;
    let speedY = item.speedY;
    let width = BOARD_WIDTH; 
    let height = BOARD_HEIGHT; 

    if(doCollide(ball,leftPaddle)) {
      //collide with left paddle
      item.x -= speedX;
      item.speedX = -speedX;
    }
    if(coordX < 0){
      //ball collides with left wall, reset ball, increment score
      if(item.id === "#ball"){
        player2Score++;
        $("#score2").text("Player 2 Score: " + player2Score);
        if(player2Score === 7){
          endGame();
          alert("Player 2 Wins! Press Enter to randomize colors when you refresh!");
        }
        startBall();
      }
    }
    if (coordY < 0) {
      //collide with top wall
      item.y -= speedY;
      item.speedY = -speedY;
    }
    if (coordX + item.width > width || doCollide(ball,rightPaddle)) {
      //collide with right wall
      item.x -= speedX;
      item.speedX = -speedX;
    }
    if (coordY + item.height > height) {
      //collide with bottom wall
      item.y -= speedY;
      item.speedY = -speedY;
    }
    if(coordX + item.width > width){
      //ball collides with right paddle, reset ball, increment score
      if(item.id === "#ball"){
        player1Score++;
        $("#score1").text("Player 1 Score: " + player1Score);
        if(player1Score === 7){
          endGame();
          alert("Player 1 Wins! Press Enter to randomize colors when you refresh!");
        }
        startBall();
      }
    }
  }
  //handle paddle-ball collisions
  function doCollide(square1, square2) {
    // TODO: calculate and store the remaining
    // sides of the square1
    square1.leftX = square1.x;
    square1.topY = square1.y;
    square1.rightX = square1.x+square1.width;
    square1.bottomY = square1.y+square1.height;
    // TODO: Do the same for square2
    square2.leftX = square2.x;
    square2.topY = square2.y;
    square2.rightX = square2.x+square2.width;
    square2.bottomY = square2.y+square2.height;
    //debugger;
    // TODO: Return true if they are overlapping, false otherwise
    if(square1.leftX > square2.rightX){
      return false;
    } else if(square1.rightX < square2.leftX){
      return false;
    } else if(square1.topY > square2.bottomY){
      return false;
    } else if(square1.bottomY < square2.topY){
      return false;
    } else {
      return true;
    }
    // Hint: use the following conditions:
      // red left < blue right
      // red right > blue left
      // red top < blue bottom
      // red bottom > blue top
  }
  // make ball's starting position and random speed
  function startBall(){
    ball.x = (BOARD_WIDTH / 2);
    ball.y = (BOARD_HEIGHT / 2);
    ball.speedX = randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }
  //calls in response to enter presses
  function changeColor() {
    var randomColor = "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });
    
    $("#leftPaddle").css('background-color', randomColor);
    $("#rightPaddle").css('background-color', randomColor);
    $("#ball").css('background-color', randomColor);
    $("#middle").css('background-color', randomColor);
    $("#score1").css('background-color', randomColor);
    $("#score2").css('background-color', randomColor);
    $("#board").css('border-color', randomColor);
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}

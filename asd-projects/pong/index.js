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
    DOWN: 40
  }
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height()
  // Game Item Objects
  var leftPaddle = ObjectFactory("#leftPaddle");
  var rightPaddle = ObjectFactory("#rightPaddle");
  var ball = ObjectFactory("#ball");
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
    doCollide(ball,leftPaddle);
    doCollide(ball,rightPaddle);
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
    // if(parseFloat($(id).css("right"))){
    //   gameItem.x = BOARD_WIDTH - parseFloat($(id).css("right"));
    // }
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

    if (coordX < 0) {
      //collide with left wall
      item.x -= speedX;
      item.speedX = -speedX;
    }
    if (coordY < 0) {
      //collide with top wall
      item.y -= speedY;
      item.speedY = -speedY;
    }
    if (coordX + item.width > width) {
      //collide with right wall
      item.x -= speedX;
      item.speedX = -speedX;
    }
    if (coordY + item.height > height) {
      //collide with bottom wall
      item.y -= speedY;
      item.speedY = -speedY;
    }
  }
  //handle paddle-ball collisions
  function doCollide(square1, square2) {
    // TODO: calculate and store the remaining
    // sides of the square1
    let speedX = square1.speedX;
    let speedY = square1.speedY;
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
      square1.x -= speedX;
      square1.speedX = -speedX;
      square1.y -= speedY;
      square1.speedY = -speedY;
    } else if(square1.rightX < square2.leftX){
      square1.x -= speedX;
      square1.speedX = -speedX;
      square1.y -= speedY;
      square1.speedY = -speedY;
    } else if(square1.topY > square2.bottomY){
      square1.x -= speedX;
      square1.speedX = -speedX;
      square1.y -= speedY;
      square1.speedY = -speedY;
    } else if(square1.bottomY < square2.topY){
      square1.x -= speedX;
      square1.speedX = -speedX;
      square1.y -= speedY;
      square1.speedY = -speedY;
    } else {
      
    }
    // Hint: use the following conditions:
      // red left < blue right
      // red right > blue left
      // red top < blue bottom
      // red bottom > blue top
  }
  // make ball's starting position and random speed
  function startBall(){
    ball.x = 200;
    ball.y = 340;
    ball.speedX = randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
    ball.speedY = randomNum = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1);
  }
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}

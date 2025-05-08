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
  function paddleCollision(item){
    //pull relevant data, dont copy coords to a container you need to edit them directly, not the copied version
    //actually nevermind, do make containers for shortening the conditionals parts
    let coordX = item.x;
    //let coordY = item.y;
    let speedX = item.speedX;
    //let speedY = item.speedY;
    //let width = BOARD_WIDTH; 
    //let height = BOARD_HEIGHT; 

    if (coordX < 0) {
      //collide with left paddle
      item.x -= speedX;
      item.speedX = -speedX;
    }
    if (coordX + item.width > width) {
      //collide with right paddle
      item.x -= speedX;
      item.speedX = -speedX;
    }
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

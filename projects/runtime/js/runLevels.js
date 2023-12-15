var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(false);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createEvilBot(x,y){ // Obstacle creation code, not enemies
      var hitZoneSize = 25;
      var damageFromObstacle = 10;
      var evilHalleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
      evilHalleHitZone.x = x;
      evilHalleHitZone.y = y;
      game.addGameItem(evilHalleHitZone);
      var obstacleImage = draw.bitmap("img/flyingevilhallebot.png");
      obstacleImage.scaleX = 0.3;
      obstacleImage.scaleY = 0.3;
      obstacleImage.x = -29;
      obstacleImage.y = -35;
      evilHalleHitZone.addChild(obstacleImage);
    }

    function createEnemy(x,y){ // Actual enemy creation code, not obstacles
      var enemy = game.createGameItem("enemy", 25);
      var redSquare = draw.bitmap("img/evilhallebot.png");
      redSquare.x = -70;
      redSquare.y = -75;
      redSquare.scaleX = 0.4;
      redSquare.scaleY = 0.4;
      enemy.x = x;
      enemy.y = y;
      enemy.velocityX = -2;
      enemy.onPlayerCollision = function () {
        game.changeIntegrity(-10);
      };
      enemy.onProjectileCollision = function () {
        game.increaseScore(100);
        enemy.fadeOut();
      };
      enemy.addChild(redSquare);
      game.addGameItem(enemy);
    }

    function createReward(x,y){
      var enemy = game.createGameItem("reward", 25);
      var redSquare = draw.bitmap("img/reward.png");
      redSquare.x = -30;
      redSquare.y = -30;
      redSquare.scaleX = 0.4;
      redSquare.scaleY = 0.4;
      enemy.x = x;
      enemy.y = y;
      enemy.velocityX = -2;

      enemy.onPlayerCollision = function () {
        game.increaseScore(500);
        enemy.fadeOut();
      }
      enemy.onProjectileCollision = function () {
        game.increaseScore(500);
        enemy.fadeOut();
      }
      enemy.addChild(redSquare);
      game.addGameItem(enemy);
    }

    function createMarker(x,y){
      var enemy = game.createGameItem("marker", 75);
      var redSquare = draw.bitmap("img/door.png");
      redSquare.x = -55;
      redSquare.y = -105;
      redSquare.scaleX = 0.7;
      redSquare.scaleY = 0.7;
      enemy.x = x;
      enemy.y = y;
      enemy.velocityX = -2;

      enemy.onPlayerCollision = function () {
        startLevel();
        enemy.fadeOut();
      }
      enemy.onProjectileCollision = function () {
        startLevel();
        enemy.fadeOut();
      }
      enemy.addChild(redSquare);
      game.addGameItem(enemy);
    }
    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel];
      var levelObjects = level.gameItems;
      for (var i = 0; i < levelObjects.length; i++) {
        var eachElement = levelObjects[i];
        if(eachElement.type === "sawblade"){
          createEvilBot(eachElement.x, eachElement.y);
        } else if(eachElement.type === "enemy"){
          createEnemy(eachElement.x, eachElement.y);
        } else if(eachElement.type === "reward"){
          createReward(eachElement.x, eachElement.y);
        } else if(eachElement.type === "marker"){
          createMarker(eachElement.x, eachElement.y);
        }
        // code checks for the element's type, does something with each type. hardcoded, but necessary.
      }

      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}

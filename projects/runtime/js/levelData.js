var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    
    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY - 25 },
          { type: "sawblade", x: 600, y: groundY - 110 },
          { type: "sawblade", x: 900, y: groundY - 25 },
          { type: "enemy", x: 1000, y: groundY - 50},
          { type: "reward", x: 1100, y: groundY},
          { type: "marker", x: 1500, y: groundY - 50}
        ],
      },
      {
        name: "Robot Romp",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 1000, y: groundY - 110 },
          { type: "sawblade", x: 600, y: groundY - 110 },
          { type: "sawblade", x: 900, y: groundY - 25 },
          { type: "enemy", x: 400, y: groundY - 50},
          { type: "reward", x: 1100, y: groundY},
          { type: "marker", x: 1500, y: groundY - 50}
        ],
      },
      {
        name: "Robot Stomp",
        number: 3,
        speed: -3,
        gameItems: [
          { type: "sawblade", x: 400, y: groundY - 25 },
          { type: "sawblade", x: 600, y: groundY - 110 },
          { type: "sawblade", x: 900, y: groundY - 110 },
          { type: "enemy", x: 1500, y: groundY - 50},
          { type: "reward", x: 1100, y: groundY},
          { type: "reward", x: 1700, y: groundY},
          { type: "marker", x: 2000, y: groundY - 50}
        ],
      },
      {
        name: "Robot Pomp",
        number: 4,
        speed: -3,
        gameItems: [
          { type: "reward", x: 400, y: groundY - 25 },
          { type: "reward", x: 600, y: groundY - 110 },
          { type: "reward", x: 900, y: groundY - 110 },
          { type: "reward", x: 1500, y: groundY - 50},
          { type: "reward", x: 1100, y: groundY},
          { type: "reward", x: 1700, y: groundY},
          { type: "marker", x: 2000, y: groundY - 50}
        ],
      }
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}

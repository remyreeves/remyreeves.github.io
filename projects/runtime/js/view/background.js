var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
        var factories = [];
        var forklift;
      
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight,'black');
            background.addChild(backgroundFill);
            
            // TODO 2: - Add a moon and starfield
            var backgroundImage = draw.bitmap('img/background.png');
            backgroundImage.scaleX = 10.0;
            backgroundImage.scaleY = 10.0;
            background.addChild(backgroundImage);
            // TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            for (var i = 0; i < 5; ++i) {
                var factory = draw.bitmap("img/factory.png");
                factory.x = 288 * i;
                factory.y = groundY - 190;
                factory.scaleX = 0.5;
                factory.scaleY = 0.5;
                background.addChild(factory);
                factories.push(factory);
              }
            
            // TODO 3: Part 1 - Add a tree
            forklift = draw.bitmap("img/forklift.png");
            forklift.x = 200;
            forklift.y = groundY -30;
            forklift.scaleX = 0.7;
            forklift.scaleY = 0.7;
            background.addChild(forklift);
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 3: Part 2 - Move the tree!
            forklift.x = forklift.x - 1;
            if(forklift.x < - 100){
                forklift.x = canvasWidth;
            }
            // TODO 4: Part 2 - Parallax
            for (var i = 0; i < factories.length; i++) {
                var eachElement = factories[i];
                eachElement.x = eachElement.x - 0.1;
                if (eachElement.x < -300) {
                    eachElement.x = canvasWidth;
                }
                // code to do something with each element
            }

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}

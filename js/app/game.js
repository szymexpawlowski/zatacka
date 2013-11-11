define(['jquery', 'can', 'app/player', 'app/calculations', 'app/range'], function($, can, Player, Calculations, Range) {

    var Game = can.Construct.extend({
        fps: 50,
        speed: 2
    },
    {
        init: function(players, graphics, keysController, constraints) {

            this.players = players;
            this.graphics = graphics;
            this.graphics.fillCanvas();
            this.keysController = keysController,
            this.constraints = constraints;
        },

        updatePlayersPositions: function() {

            var self = this,
                rangeX = this.graphics.getWidthRange(),
                rangeY = this.graphics.getHeightRange();

            $.each(this.players, function(i, player){

                self.updatePlayerPosition(rangeX, rangeY, player);
            });
        },

        updatePlayerPosition: function(rangeX, rangeY, player) {

            var x, y, angle;

            angle = Math.random() * 2 * Math.PI;
            angle = Calculations.roundToLastDivision(angle, Player.angleDelta);

            x = Calculations.getRandomValueFromRange(rangeX);
            y = Calculations.getRandomValueFromRange(rangeY);

            player.setDisplay(x, y, angle);
        },

        areConstraintsValid: function(player) {

            var valid = true;
        
            $.each(this.constraints, function(i, constraint){

                if (!constraint.isValid(player.x, player.y)) {

                    valid = false;
                }
            });

            return valid;
        },

        updatePlayerAngle: function(player, pressedKeys) {

            if (pressedKeys.hasOwnProperty(player.keys.left) && pressedKeys[player.keys.left]) {
                player.turnLeft();
            }

            if (pressedKeys.hasOwnProperty(player.keys.right) && pressedKeys[player.keys.right]) {
                player.turnRight();
            }

        },

        getActivePlayers: function() {

            var result = [];

            $.each(this.players, function(i, player) {

                if (player.active) {

                    result.push(player);
                }
            });

            return result;
        },

        updateActivePlayersScore: function() {

            $.each(this.getActivePlayers(), function(index, player) {

                var score = player.score();
                
                player.score(score + 1)
            });
        },

        gameLoop: function() {

            var self = this,
                pressedKeys = self.keysController.getPressedKeys();

            if (this.getActivePlayers().length > 1) {

                $.each(this.players, function(i, player) {

                    var drawingData;

                    if (player.active) {

                        self.updatePlayerAngle(player, pressedKeys);
                        drawingData = player.getCoordinatesDelta();
                        if (!self.areConstraintsValid(player)) {
                            player.active = false;
                            self.updateActivePlayersScore();
                            return false;
                        }

                        self.graphics.drawLine(drawingData);
                    }
                });
            } else {

                window.clearInterval(this.gameLoopInterval);
                window.setTimeout(function() {
                    
                    self.reinitGame();
                    self.gameLoopInterval = setInterval(
                        function() {
                            self.gameLoop();
                        }
                    , 1000 / Game.fps);                    
                }, 3000);
            }
        },

        reinitGame: function() {

            var self = this,
                rangeX = this.graphics.getWidthRange(),
                rangeY = this.graphics.getHeightRange();
        
            this.graphics.fillCanvas();
            $.each(this.players, function(i, player){

                self.updatePlayerPosition(rangeX, rangeY, player);
                player.active = true;
            });
        }

    });

    return Game;
});
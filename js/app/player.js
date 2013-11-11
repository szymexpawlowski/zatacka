define(['jquery', 'can', 'app/calculations'], function($, can, Calculations) {
    
    var Player = can.Construct.extend({
        angleDelta: Math.PI / 45,
        speed: 1.8
    },{
        init: function(keys, color) {
            
            this.keys = keys;
            this.color = color;
            this.active = true;
            this.score = new can.compute(0);
        },
                
        setDisplay: function(x, y, angle) {
    
            this.x = x;
            this.y = y;
            this.angle = angle;    
        },
                
        calculateNewCoordinates: function() {
    
            this.x = this.calculateNewX();
            this.y = this.calculateNewY();
        },
                
        calculateNewX: function() {

            var x = this.x + this.constructor.speed * Math.cos(this.angle);
            
            return x;
        },

        calculateNewY: function() {

            var y = this.y + this.constructor.speed * Math.sin(this.angle);
            
            return y;            
        },

        turnLeft: function() {

            this.angle = this.getNewAngleValue(false);
        },

        turnRight: function() {

            this.angle = this.getNewAngleValue(true);
        },

        getNewAngleValue: function(right) {

            var angle = right ? this.angle + this.constructor.angleDelta : this.angle - this.constructor.angleDelta;

            return Calculations.roundToLastDivision(angle, this.constructor.angleDelta);
        },
                
        getCoordinatesDelta: function() {
    
            var delta = {
                x1: this.x,
                y1: this.y,
                color: this.color                        
            };
            this.calculateNewCoordinates();
            delta = $.extend(delta, {
                x2: this.x,
                y2: this.y                     
            });  
            
            return delta;
        }
    });
    
    return Player;
});
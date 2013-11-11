define(['jquery', 'can', 'app/calculations'], function($, can, Calculations) {

    var Graphics = can.Construct.extend({
        lineWidth: 2,
        backgroundColor: '#000000',
        distanceFromBorder: 50
    },{
        init: function(ctx, lineWidth) {
            this.ctx = ctx;
            this.ctx.lineWidth = lineWidth || this.constructor.lineWidth;
        },

        drawLine: function(drawingData) {

            this.ctx.beginPath();
            this.ctx.moveTo(drawingData.x1, drawingData.y1);
            this.ctx.lineTo(drawingData.x2, drawingData.y2);
            this.ctx.closePath();
            this.ctx.strokeStyle = drawingData.color;
            this.ctx.stroke();
        },
                
        fillCanvas: function() {

            var width = this.ctx.canvas.scrollWidth,
                height = this.ctx.canvas.scrollHeight;

            this.ctx.fillStyle = this.constructor.backgroundColor;
            this.ctx.fillRect(0, 0, width, height);
        },
                
        getWidthRange: function() {
    
            var dimension;

            if (!this.hasOwnProperty('rangeX')) {
                dimension = this.ctx.canvas.scrollWidth;
                this.rangeX = Calculations.trimRange(dimension, this.constructor.distanceFromBorder);
            }

            return this.rangeX;
        },
                
        getHeightRange: function() {

            var dimension;

            if (!this.hasOwnProperty('rangeY')) {
                dimension = this.ctx.canvas.scrollHeight;
                this.rangeY = Calculations.trimRange(dimension, this.constructor.distanceFromBorder);
            }

            return this.rangeY;                
        }                
    });

    return Graphics;
});
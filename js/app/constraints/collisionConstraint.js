define(['can', 'app/graphics'], function(can, Graphics) {
    
    var CollisionConstraint = can.Construct({
        
        init: function(ctx, backgroundColor) {
            
            this.ctx = ctx;
            this.backgroundColor = backgroundColor;
        },
              
        isValid: function(x, y) {
            
            
            var data = this.ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
            
            if (data[0] === parseInt(Graphics.backgroundColor.substring(1, 3), 16) && 
                data[1] === parseInt(Graphics.backgroundColor.substring(3, 5), 16) && 
                data[2] === parseInt(Graphics.backgroundColor.substring(5, 7), 16)) {
                return true;
            }
            
            return false;
        }
    });
    
    return CollisionConstraint;
});
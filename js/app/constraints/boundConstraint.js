define(['can'], function(can) {
    
    var BoundConstraint = can.Construct({
        
        init: function(limitX, limitY) {
            
            this.limitX = limitX;
            this.limitY = limitY;
        },
              
        isValid: function(x, y) {
            
            if (this.limitX > x && x > 0 && this.limitY > y && y > 0) {
                return true;
            } else {
                return false;
            }
        }
    });
    
    return BoundConstraint;
});
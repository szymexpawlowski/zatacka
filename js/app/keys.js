define(['can'], function(can) {
    
    var Keys = can.Construct.extend({
        init: function(left, right) {
            this.left = left;
            this.right = right;
        }
    });
    
    return Keys;
});
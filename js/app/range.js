define(['can'], function(can) {
    
    var Range = can.Construct.extend({
        init: function(from, to) {
            this.from = from;
            this.to = to;
        }
    });
    
    return Range;
});
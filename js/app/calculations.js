define(['app/range'], function(Range) {

    return {
        trimRange: function(range, limit) {

            if (range < 2 * limit) {
                throw 'Range has to be at least twice as big as limit'
            }

            return new Range(limit, range - limit);
        },

        getRandomValueFromRange: function(range) {

            return range.from + Math.ceil(Math.random() * (range.to - range.from));
        },

        roundToLastDivision: function(value, period) {

            var multiplyer = Math.round(value / period);

            return multiplyer * period;
        }
    }
});
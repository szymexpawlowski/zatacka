define(['can'], function(can) {

    var ScoreboardController = can.Control.extend({
        defaults: {
            view: 'js/app/views/scoreboard.ejs'
        }
    },{

        init: function(el, options) {

            el.html(can.view(options.view, options.players));
        }
    });

    return ScoreboardController;
});
define(['can'], function(can) {

    var KeysController = can.Control({

        init: function() {

            this.pressedKeys = {};
        },

        getPressedKeys: function() {

            return this.pressedKeys;
        },

        '{window} keydown': function(el, ev) {
            this.pressedKeys[ev.keyCode || ev.which] = true;
        },

        '{window} keyup': function(el, ev) {
            this.pressedKeys[ev.keyCode || ev.which] = false;
        }
    });

    return KeysController;
});
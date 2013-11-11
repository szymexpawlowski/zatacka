requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app',
    },
    shim: {
        can: {
            deps: ['jquery'],
            exports: 'can'
        }
    },
    urlArgs: "bust=" +  (new Date()).getTime()
});

requirejs(['app/game'],
function (Game) {
    var g = new Game(2, 'canvas');
    console.log(g);
});
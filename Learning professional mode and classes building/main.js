function init() {
    canvas = initFullScreenCanvas("mainCanvas");
    imageManager = new ImageManager("assets/boss_bee.png");
    imageManager.load(FilesToLoad, onLoaded, onProgress);
    initListeners();

}

function onProgress(loaded, total, key, path, success) {
    if (success) {
        // Pasek postępu
        console.log("wczytano " + loaded + " z " + total + " obrazków");
        console.log(key+" : "+path);
    } else {
        // Obsługa błędów
        console.log("BŁĄD: nie wczytano obrazka " + path);
    }
}
function onLoaded() {
    console.log("Załadowano wszystkie obrazki");
    dungeon = imageManager.get("dungeon");
    epicweapon = imageManager.get("epicweapon");
    fantasyweapon = imageManager.get("fantasyweapon");
    sword.object = dungeon;
    loop();
    again = requestAnimationFrame(loop());
}


function initFullScreenCanvas(canvasId) {
    var canvas = document.getElementById(canvasId);
    resizeCanvas(canvas);
    window.addEventListener("resize", function() {
        resizeCanvas(canvas);
    });
    return canvas;
}

function resizeCanvas(canvas) {
    canvas.width  = document.width || document.body.clientWidth;
    canvas.height = document.height || document.body.clientHeight;
}





var initListeners = function(){
    addEventListener("keydown", function(e){
        keysPressed[e.which]= true;
        //console.log(e.which);
        //console.log(sword.rotation);
        if(keysPressed[79]){loop();}
        if(keysPressed[80]){stopLoop();}
    });
    addEventListener("keyup", function(e){
        keysPressed[e.which]= false;
    });
}
var heroMove = function(){
    if(keysPressed[37]){sword.dx -= 2}
    if(keysPressed[38]){sword.dy -= 2}
    if(keysPressed[39]){sword.dx += 2}
    if(keysPressed[40]){sword.dy += 2}
    if(keysPressed[81]){sword.rotation -= 6}
    if(keysPressed[69]){sword.rotation += 6}
    if(keysPressed[32]){shotLaunched=true}

    //requestAnimationFrame(arguments.callee);
    // *teraz w loop()*

}
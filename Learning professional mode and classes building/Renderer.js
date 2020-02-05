
var tOrig = Date.now();
var animsDone = animsDone || 0;
var t = t-tOrig || Date.now()-tOrig;
var renderHook;
var repaint = function(){

    t = Date.now() - tOrig;
    animsDone++;

    var ctx = canvas.getContext('2d');
    //czyszczenie płótna:
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.beginPath();
    //nie pozwala żeby koło wyszło poza ramy:
    if(sword.dy<12)sword.dy=12;
    if(sword.dx<12)sword.dx=12;
    if(sword.dy>canvas.height-12)sword.dy=canvas.height-12;
    if(sword.dx>canvas.width-12)sword.dx=canvas.width-12;
    //rysuje koło (bohatera):
    ctx.fillStyle = "orange";
    ctx.strokeStyle = "black";
    ctx.arc(sword.dx,sword.dy,12,0,360,false);
    ctx.fill();
    ctx.stroke();







    if(shotLaunched === false){
        currentLength=0;
        //pobiera dane żeby poprawnie obsłużyć ewentualny strzał:
        pos = {
            dx:sword.dx,
            dy:sword.dy,
            px:0,
            py:0,
            rotation:sword.rotation
        };
        //rysuje mieczyk u gracza z właściwym obrotem:
        ctx.save();
        ctx.translate(sword.dx, sword.dy);
        ctx.rotate((sword.rotation/180)*Math.PI);
        ctx.drawImage(sword.object,sword.sx,sword.sy,sword.sw,sword.sh,0-(sword.sw/2),0-sword.sh,sword.sw,sword.sh);
        ctx.restore();
    }
    if(shotLaunched === true){

        ctx.save();
        //ustala położenie x i y broni
        pos.py = pos.dy+Math.cos(((pos.rotation+180)/180)*Math.PI)*300;
        pos.px = pos.dx+Math.sin((pos.rotation/180)*Math.PI)*300;

        //jeśli broń wyleciała poza ekran to 'utyka' w ścianie (na granicy ekranu)
        var zwrotX = 1;
        var zwrotY = 1;

        if(pos.py<0){
            if(pos.px<pos.dx){zwrotX = -1}
            var y = Math.abs(pos.dy-pos.py);
            var x = Math.abs(pos.dx-pos.px);
            pos.py=15;
            var yp = Math.abs(pos.dy-pos.py);
            pos.px = pos.dx+((x/y)*yp)*zwrotX;
        }
        else if(pos.py>canvas.height){
            if(pos.px<pos.dx){zwrotX = -1}
            var y = Math.abs(pos.dy-pos.py);
            var x = Math.abs(pos.dx-pos.px);
            pos.py=canvas.height-15;
            var yp = Math.abs(pos.dy-pos.py);
            pos.px = pos.dx+((x/y)*yp)*zwrotX;
        }
        if(pos.px<0){
            if(pos.py<pos.dy){zwrotY = -1}
            var y = Math.abs(pos.dy-pos.py);
            var x = Math.abs(pos.dx-pos.px);
            pos.px=15;
            var xp = Math.abs(pos.dx-pos.px);
            pos.py = pos.dy+(xp/(x/y))*zwrotY;
        }
        else if(pos.px>canvas.width){
            if(pos.py<pos.dy){zwrotY = -1}
            var y = Math.abs(pos.dy-pos.py);
            var x = Math.abs(pos.dx-pos.px);
            pos.px=canvas.width-15;
            var xp = Math.abs(pos.dx-pos.px);
            pos.py = pos.dy+(xp/(x/y))*zwrotY;
        }

        //rysuje broń w wyznaczonym miejscu (max 300px od gracza)
        ctx.translate(pos.px, pos.py);
        ctx.rotate((pos.rotation/180)*Math.PI);
        ctx.drawImage(sword.object,sword.sx,sword.sy,sword.sw,sword.sh,0-(sword.sw/2),0-sword.sh,sword.sw,sword.sh);
        ctx.restore();

        //ustala czy broń jest dostatecznie blisko gracza
        if(Math.abs(pos.py-sword.dy) <= 20){
            if(Math.abs(pos.px-sword.dx) <= 20){
                /* ![testowe] stos wywołań do kontroli pozycji podnoszącego broń bohatera, do pozycji broni:
                console.log("sdx: "+sword.dx);
                console.log("sdy: "+sword.dy);
                console.log("dx: "+pos.dx);
                console.log("dy: "+pos.dy);
                console.log("px: "+pos.px);
                console.log("py: "+pos.py);
                 */
                //powoduje powrót broni do ręki właściciela:
                shotLaunched = false;

            }
        }
    }









    //dla testów kotwiczki mieczyka
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(sword.dx,sword.dy,2,0,360,false);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.arc(sword.dx-(sword.sw/2),sword.dy-sword.sh,2,0,360,false);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.arc(pos.px,pos.py,2,0,360,false);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "brown";
    ctx.arc(pos.px-(sword.sw/2),pos.py-sword.sh,2,0,360,false);
    ctx.fill();
    ctx.stroke();


    // [!testowe] wypisuje watrość t i animsDone
    //console.log("czas: "+t+ " liczba animacji: "+ animsDone);


    // eksperymenty z hookami
    renderHook = requestAnimationFrame(arguments.callee);
    if(keysPressed[80]){cancelAnimationFrame(renderHook)}
};
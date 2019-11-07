var repaint = function(){
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
        //rysuje broń 300 pikseli od gracza:
        ctx.save();
        ctx.translate(pos.dx, pos.dy);
        ctx.rotate((pos.rotation/180)*Math.PI);
        ctx.drawImage(sword.object,sword.sx,sword.sy,sword.sw,sword.sh,0-(sword.sw/2),0-sword.sh-300,sword.sw,sword.sh);
        ctx.restore();
        //ustala położenie x i y broni
        pos.px = pos.dx+ Math.sin((pos.rotation/180)*Math.PI)*300;
        pos.py = pos.dy+Math.cos(((pos.rotation+180)/180)*Math.PI)*300;
        //jeśli broń wyleciała poza ekran to ustawia zasięg jej podnoszenia do 30 pikseli od granicy ekranu
        if(pos.py<0)pos.py=30;
        if(pos.px<0)pos.px=30;
        if(pos.py>canvas.height)pos.py=canvas.height-30;
        if(pos.px>canvas.width)pos.px=canvas.width-30;
        //ustala czy broń jest dostatecznie blisko gracza
        if(Math.abs(pos.py-sword.dy) <= 20){
            if(Math.abs(pos.px-sword.dx) <= 20){
                // ![testowe] stos wywołań do kontroli pozycji podnoszącego broń bohatera, do pozycji broni:
                console.log("sdx: "+sword.dx);
                console.log("sdy: "+sword.dy);
                console.log("dx: "+pos.dx);
                console.log("dy: "+pos.dy);
                console.log("px: "+pos.px);
                console.log("py: "+pos.py);
                //powoduje powrót broni do ręki właściciela:
                shotLaunched = false;
            }
        }
    }



    requestAnimationFrame(arguments.callee);
};
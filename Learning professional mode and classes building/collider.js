function checkCollision(doubleLayerArray, weaponPosition){

    //_arr- tablica dwuwymiarowa zawierająca wszystkie hitboxy w grze
    //_arr[nr przedmiotu][0=górna granica, 1=dolna, 2=lewa, 3=prawa]
    var _arr = doubleLayerArray;


    // pozycja przedmiotu który może wejść w kolizje
    var _pos = weaponPosition;
    var collision = false;
    var TOP = 0;
    var BOTTOM = 1;
    var LEFT = 2;
    var RIGHT = 3;
    for(var i=-1;i<_arr.length;i++){
        //sprawdza czy mieczyk nie wleciał w jakiś przedmiot lub nie wyleciał z ekranu
        /*
        _pos.dy>_arr[i][0]-mieczyk wlatuje w jakiś przedmiot od góry
        _pos.dy<_arr[i][1]-mieczyk wlatuje w jakiś przedmiot od dołu
        _pos.dx>_arr[i][2]-mieczyk wlatuje w jakiś przedmiot od lewej
        _pos.dx<_arr[i][3]-mieczyk wlatuje w jakiś przedmiot od prawej
        pos.py<=0||pos.py>canvas.height||pos.px<0||pos.px>canvas.width -mieczyk wylatuje z ekranu
        i -numer przedmiotu w tablicy
         */
        if((_pos.dy>_arr[i][TOP]&&_pos.dy<_arr[i][BOTTOM]&&_pos.dx>_arr[i][LEFT]&&_pos.dx<_arr[i][RIGHT])||_pos.py<=0||_pos.py>canvas.height||_pos.px<0||_pos.px>canvas.width)


        {
            collision = true;
            break;
        }
    }
    return collision;
}
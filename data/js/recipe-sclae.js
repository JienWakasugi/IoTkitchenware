//var count = 0;
var stepcount = 0;
var co = 0;

var realweight = function(sload){
    var sclaeload= parseFloat(sload);
    return sclaeload;
}

/*var soyweight = function(soysload){
    var soyscaleload = parseFloat(soysload);
    return soyscaleload;
}*/

var addZero = function (value) {
    if (value < 10) {
            value = '0' + value;
    }
    return value;
}


window.onload = function() {

    /*$('#timer-Progress').val(time3min);*/


    var obj = document.getElementById("procedure-2");//手順を取得
    obj.style.background = '#FFDA82';//手順をハイライト

    setInterval(function(){

        if(stepcount==0){

                    $.get("http://192.168.0.220/weight",function(sload){$("#count-1").text(sload);});//weightページから重さを取得しcount-1に加える
                    $.get("http://192.168.0.220/weight",function(sload){$("#myProgress-1").val(sload);});//progressbarから値を取得
                    var currentWeight = document.getElementById("myProgress-1").value;

                    var targetWeight = document.getElementById("myProgress-1").max;//一回しか動いていないのだからインターバルで回さないと。
                    targetWeight = Number(targetWeight);
                    //console.log(count);
                      if(currentWeight==targetWeight && count == 0){
                        $('input[name="rice"]').prop('checked', true); //チェックボックスに自動でチェックをつける
                        console.log("rice get");
                        count++;
                    }
                }

                //chiken
                if(stepcount==1){

                    $.get("http://192.168.0.220/weight",function(sload){$("#count-2").text(sload);});//weightページから重さを取得しcount-1に加える
                    $.get("http://192.168.0.220/weight",function(sload){$("#myProgress-2").val(sload);});//progressbarから値を取得

                    var currentWeight = document.getElementById("myProgress-2").value;
                    var targetWeight = document.getElementById("myProgress-2").max;
                    targetWeight = Number(targetWeight);

                    console.log(currentWeight);
                      if(currentWeight==targetWeight && count == 1){
                        $('input[name="chicken"]').prop('checked', true); //チェックボックスに自動でチェックをつける
                        count++;
                        console.log("chiken get");
                    }
                }


                //onion
                if(stepcount==2){
                    $.get("http://192.168.0.220/weight",function(sload){$("#count-4").text(sload);});//weightページから重さを取得しcount-1に加える
                    $.get("http://192.168.0.220/weight",function(sload){$("#myProgress-4").val(sload);});//progressbarから値を取得
                        var currentWeight = document.getElementById("myProgress-4").value;
                        var targetWeight = document.getElementById("myProgress-4").max;
                        targetWeight = Number(targetWeight);

                    if(currentWeight==targetWeight && count == 2){
                        $('input[name="onion"]').prop('checked', true); //チェックボックスに自動でチェックをつける
                        count++;
                        console.log("onion get");
                    }
                }

                //water
                 if(stepcount==3){
                    $.get("http://192.168.0.220/weight",function(sload){$("#count-6").text(sload);});//weightページから重さを取得しcount-1に加える
                    $.get("http://192.168.0.220/weight",function(sload){$("#myProgress-6").val(sload);});//progressbarから値を取得
                        var currentWeight = document.getElementById("myProgress-6").value;
                        var targetWeight = document.getElementById("myProgress-6").max;
                        targetWeight = Number(targetWeight);

                    if(currentWeight==targetWeight && count == 3){
                        $('input[name="water"]').prop('checked', true); //チェックボックスに自動でチェックをつける
                        count++;
                        console.log("water get");

                        objtex.style.background = "#00000000";
                        var objtex2= document.getElementById("procedure-2");
                        objtex2.style.background = '#FFDA82';
                    }
                }


                //醤油
                if(count==4){
                     //調味料ボックスのLEDをon
                            send("http://192.168.0.190/on");
                            function send(url){
                                var xhr = new XMLHttpRequest();xhr.open("GET", url, true);xhr.send();
                            }

                            $.get("http://192.168.0.220/weight",function(sload){$("#count-7").text(sload);});//weightページから重さを取得しcount-1に加える
                            $.get("http://192.168.0.220/weight",function(sload){$("#myProgress-7").val(sload);});//progressbarから値を取得
                            var currentWeight = document.getElementById("myProgress-6").value;
                            var targetWeight = document.getElementById("myProgress-6").max;
                            targetWeight = 1.2*Number(targetWeight);

                            if(currentWeight==targetWeight && count == 4){
                                $('input[name="soysource"]').prop('checked', true); //チェックボックスに自動でチェックをつける
                                //count++;

                            }

                        }


            $('input[name="soysource"]').change(function(){
            // prop()でチェックの状態を取得
            var prop_bottle = $('#box-7').prop('checked');//$('#soysource-bottle:checked').val();

            // もしpropがチェック状態だったら
            if (prop_bottle && count==4){
                //調味料ボックスのLEDをoff
                send("http://192.168.0.190/off");
                console.log("check-off");
                function send(url){
                            var xhr = new XMLHttpRequest();xhr.open("GET", url, true);xhr.send();
                            }
                count++;
                console.log("soy-source get");
              }
            });


        if(count==5){
                     //調味料ボックスのLEDをon
                            send("http://192.168.0.190/on");
                            function send(url){
                                var xhr = new XMLHttpRequest();xhr.open("GET", url, true);xhr.send();
                            }

                            $.get("http://192.168.0.220/weight",function(sload){$("#count-7").text(sload);});//weightページから重さを取得しcount-1に加える
                            $.get("http://192.168.0.220/weight",function(sload){$("#myProgress-7").val(sload);});//progressbarから値を取得
                            var currentWeight = document.getElementById("myProgress-7").value;
                            var targetWeight = document.getElementById("myProgress-7").max;
                            targetWeight = 1.2*Number(targetWeight);

                            if(currentWeight==targetWeight && count == 5){
                                $('input[name="soysource"]').prop('checked', true); //チェックボックスに自動でチェックをつける
                                count++;

                            }
                        }


        //if(count==0){
            //document.getElementById("timer-Progress").value = 180;

        if(co==0){
            var time = 180;
            document.getElementById("timer-Progress").value = 180;
            var counter;
            var min = document.getElementById("min");
            var sec = document.getElementById("sec");
            var start = document.getElementById("start");
            var stop = document.getElementById("stop");
            var reset = document.getElementById("reset");
            co++;
        }


            start.onclick = function() {
                    toggle();
                    counter = setInterval( countTime, 1000 );
                }

            stop.onclick = function() {
                    toggle();
                    clearInterval( counter );
                }

            reset.onclick = function() {
                    time = 180;//リセットしたときに戻す
                    sec.innerHTML = addZero(time % 60);
                    min.innerHTML = addZero(Math.floor( time / 60 ));
                }

function toggle() {
        if( start.disabled ) {
                start.disabled = false;
                stop.disabled = true;

                } else {
                    start.disabled = true
                    stop.disabled = false;
            }
         }

function countTime() {
    //=== 厳密等価演算子
    if( time === 0 ) {
        sec.innerHTML = addZero(0);
        min.innerHTML = addZero(0);
        toggle();
        //alert("3分経過しました。");
        clearInterval( counter );
    } else {
                time -= 1;//一秒ごとに時間を減らす
                sec.innerHTML = addZero(time % 60);//時間を測る
                min.innerHTML = addZero(Math.floor( time / 60 ));
                document.getElementById("timer-Progress").value = time;
            }
        }

      //}
    },500);

};


    /*この書き方だとアクセスできない、または値が取得できない*/
        //console.log(count);

        //rice

    //var obj = document.getElementById("timer-Progress");
    //obj.style.opacity = 0;
    /*var obj = document.getElementById("timer-Progress");
    obj.style.opacity = 0;*/
    /*var obj = document.getElementById("timer-Progress");
    obj.style.opacity = 0;*/

    //手順1のハイライト
    /*var objtex= document.getElementById("procedure-1");
    objtex.style.background = '#FFDA82';*/

    /*var objtex= document.getElementById("procedure-1");
    objtex.style.background = '#0000000';*/


    //var objtex2= document.getElementById("timer");
    //objtex2.style.opacity=0;


         /*var goTimer = function(){
                now = new Date();
                time = now.getTime()-start.getTime();
                point = Math.floor(time/100);
                sec = Math.floor(time/1000);
                min= Math.floor(sec/60);
                hour= Math.floor(min/60);
                seconds=Math.floor(time/1000);
            }

            if(seconds<180){
                point = 9 - (point-sec*10);
                sec = 59 - (sec-min*60);
                min= 2 - (min-hour*60);
                point = addZero(point);
                sec = addZero(sec);
                min = addZero(min);
                document.getElementById('timer').innerHTML=min+':'+sec+':'+point;
            }
        }else{
            clearInterval(id);
            document.getElementById('timer').innerHTML='03:00:00';
            document.getElementById('timer').style.color='white';
        }*/

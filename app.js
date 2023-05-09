    let plus = document.querySelector(".plus-hour"),
            minus = document.querySelector(".minus-hour"),
            num = document.querySelector(".num-hour");
    let a = 0;
    let plus_min = document.querySelector(".plus-minute"),
            minus_min = document.querySelector(".minus-minute"),
            num_min = document.querySelector(".num-minute");
    let b = 0;
    plus.addEventListener("click", ()=>{
        if (a < 24 && a >= 0){
            a++;
            if (a<10){
                a = "0"+a;
            }
        num.innerText = a;

        }
    });
        minus.addEventListener("click", ()=>{
        if (a <= 24 && a > 0){
            a--;
            if (a<10){
                a = "0"+a;
            }
        num.innerText = a;
        }

    });

    plus_min.addEventListener("click", ()=>{
        if (b < 59 && b >= 0){
            b++;
            if (b<10){
                b = "0"+b;
            }
        num_min.innerText = b;

        }
    });
        minus_min.addEventListener("click", ()=>{
        if (b <= 59 && b > 0){
            b--;
            if (b<10){
                b = "0"+b;
            }
        num_min.innerText = b;
        }

    });

function start_timer(){
    document.getElementById("alarm-timer").innerHTML = a+":"+b;
}

 function makeReloj() {
     hora_Actual = new Date()
     hora = hora_Actual.getHours()
     minutos = hora_Actual.getMinutes()
     segundos = hora_Actual.getSeconds()

     if (hora < 10) hora = "0" + hora
     if (minutos < 10) minutos = "0" + minutos
     if (segundos < 10) segundos = "0" + segundos

     hora_imprimible = hora + " : " + minutos + " : " + segundos
     document.getElementById("real-time").innerHTML = hora_imprimible

     setTimeout("makeReloj()", 1000)

 }
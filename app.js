    let plus = document.querySelector(".plus-hour"),
            minus = document.querySelector(".minus-hour"),
            num = document.querySelector(".num-hour");
    let a = 0;
    let plus_min = document.querySelector(".plus-minute"),
            minus_min = document.querySelector(".minus-minute"),
            num_min = document.querySelector(".num-minute");
    let b = 0;

    plus.addEventListener("click", ()=>{
        if (a < 23 && a >= 0){
            a++;
            if (a<10){
                a = "0"+a;
            }
        num.innerText = a;

        }
    });
        minus.addEventListener("click", ()=>{
        if (a <= 23 && a > 0){
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

 // Ejercicio 1087: Calcular la cantidad de horas que hay entre dos fechas dentro de una función.

function calcularDiferenciaHoras(fecha1, fecha2) {
    if (!(fecha1 instanceof Date) || !(fecha2 instanceof Date)) {
        throw TypeError('Ambos argumentos deben ser objetos de tipo fecha (Date).');
    }

    let diferencia = (fecha2.getTime() - fecha1.getTime()) / 1000;
    diferencia /= (60 * 60);

    return Math.abs(Math.round(diferencia));
}

console.log(new Date());

console.log();

try {
    console.log(calcularDiferenciaHoras(new Date(), new Date(new Date().setDate(new Date().getDate() + 1))));
} catch (e) {
    console.log(`Error: ${e.message}`);
}

console.log();

try {
    console.log(calcularDiferenciaHoras(new Date(2023, 1, 1), new Date(2023, 1, 2))); // 24
} catch (e) {
    console.log(`Error: ${e.message}`);
}


console.log();

try {
    console.log(calcularDiferenciaHoras(42, new Date(2023, 1, 2))); // Error
} catch (e) {
    console.log(`Error: ${e.message}`);
}

 function start_timer(){
    var let1 = Date("2023","05","20",hora,minutos,segundos)
     var let2 = new Date("2023","05","20",a,b,0)
    var result = calcularDiferenciaHoras(let1,let2)
    document.getElementById("alarm-timer").innerHTML = result;
}

var options = [
  "Juan",
  "Mauro",
  "Onur",
  "Oriol",
  "Ruben",
  "Gerard",
  "Juan",
  "Claudia",
  "Samir",
  "Gerardo",
  "Younes",
  "Suli",
  "Hector",
  "Joel",
  "Mario",
  "Jefrey",
  "Kevin",
  "Denis",
  "Erin",
  "David",
  "Isaac",
  "Trishan",
  "Victor",
  "Alfredo",
  "Daniel",
  "Bogdan",
  "Enric",
  "Joan"
];

var startAngle = 0;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

document.getElementById("spin").addEventListener("click", spin);

function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function drawRouletteWheel() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var outsideRadius = 200;
    var textRadius = 160;
    var insideRadius = 120;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;

    ctx.font = 'bold 12px Montserrat, Arial';
    ctx.textBaseline = 'middle';

    for(var i = 0; i < options.length; i++) {
      var angle = startAngle + i * arc;

      if (i % 2 === 0) {
        ctx.fillStyle = "red"; // rojo
      } else {
        ctx.fillStyle = "black"; // negro
      }

      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.fillStyle = "white"; // blanco
      ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
                    250 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      var text = options[i];

      // Mostrar nombres lateralmente
      ctx.save();
      ctx.translate(0, -10); // Ajuste para mostrar el texto lateralmente
      ctx.rotate(Math.PI / 2); // Rotar el texto 90 grados
      ctx.fillText(text, 0, 0);
      ctx.restore();

      ctx.restore();
    }

    //Flecha
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
    ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.fill();
  }
}
function spin() {
spinAngleStart = Math.random() * 10 + 10;
spinTime = 0;
spinTimeTotal = Math.random() * 3 + 4 * 1000;

var soundSpinning = document.getElementById("sound-spinning");
soundSpinning.play();

rotateWheel();
}

function rotateWheel() {
spinTime += 30;
if(spinTime >= spinTimeTotal) {
stopRotateWheel();
return;
}
var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
startAngle += (spinAngle * Math.PI / 180);
drawRouletteWheel();
spinTimeout = setTimeout('rotateWheel()', 30);
}

function stopRotateWheel() {
clearTimeout(spinTimeout);
var degrees = startAngle * 180 / Math.PI + 90;
var arcd = arc * 180 / Math.PI;
var index = Math.floor((360 - degrees % 360) / arcd);
ctx.save();
ctx.font = 'bold 30px Helvetica, Arial';
var text = options[index];
ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
ctx.restore();

var soundEnd = document.getElementById("sound-end");
soundEnd.play();
}
function easeOut(t, b, c, d) {
  var ts = (t/=d)*t;
  var tc = ts*t;
  return b+c*(tc + -3*ts + 3*t);
}

drawRouletteWheel();


// variables

let alarmListArr = [];
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#btn-setAlarm");
let alarmCount = 0;
let alarmTime;
let ring = new Audio("audio/Alarm-ringtone.mp3");


// Script para tiempo y fecha


function updateClock(){
    var now = new Date();
    var dname = now.getDay(),
        mo = now.getMonth(),
        dnum = now.getDate(),
        yr = now.getFullYear(),
        hou = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds(),
        pe = "AM";

        if(hou==0){
            hou = 12;
        }

        if(hou>12){
            hou -=12;
            pe = "PM";
        }

        Number.prototype.pad = function(digits){
            for(var n = this.toString(); n.length<digits; n=0+n);
            return n;
        }

        var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        var week = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];
        var ids =["dayName", "month", "dayNum", "year", "hour", "minutes", "seconds", "period"];
        var values = [week[dname], months[mo], dnum.pad(2),yr,hou.pad(2),min.pad(2),sec.pad(2),pe];

        for(var i=0; i<ids.length;i++){
            document.getElementById(ids[i]).firstChild.nodeValue = values[i];
        }

        for(let i=0; i<alarmListArr.length;i++){
            if(alarmListArr[i]==`${hou.pad(2)}:${min.pad(2)}:${sec.pad(2)} ${pe}`){
                console.log("Alarm ringing...");
                ring.load();
                ring.play();
                document.querySelector("#stopAlarm").style.visibility= "visible";
            }
        }
}

function initClock() {
    updateClock();
    window.setInterval("updateClock()",1000);
}


//Set Seccion Alarma

for(let i=12; i>0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=59; i>=0;i--){
    i=i<10 ? "0"+i :i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for(let i=2; i>0;i--){
    let ampm = i== 1? "AM":"PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

//Sñade una alarma

function setAlarm(){
    document.querySelector("#alarm-h3").innerText = "Alarmas";
    let time = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
    if(time.includes("setHour") || time.includes("setMinute") || time.includes("AM/PM")){
        alert("Please, Select Valide Input");
    }else{
        alarmCount++;
        document.querySelector(".alarmList").innerHTML += `
        <div class="alarmLog" id="alarm${alarmCount}">
            <span id="span${alarmCount}">${time}</span>
            <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
        </div>`;

        alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
        alarmListArr.push(alarmTime);
        console.log(document.querySelector(".btn-delete").value);
    }

}

setAlarmBtn.addEventListener("click",setAlarm);

//Borrar Alarma

function deleteAlarm(click_id){
    var element = document.getElementById("alarm"+click_id);
    var deleteIndex = alarmListArr.indexOf(document.querySelector("#span"+click_id).innerText);
    alarmListArr.splice(deleteIndex,1);
    element.remove();
}

function stopAlarm(){
    ring.pause();
    document.querySelector("#stopAlarm").style.visibility= "hidden";
}

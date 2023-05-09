    let plus = document.querySelector(".plus-hour"),
            minus = document.querySelector(".minus-hour"),
            num = document.querySelector(".num-hour");
    let a = 1;
    plus.addEventListener("click", ()=>{
        if (a < 24){
            a++;
            if (a<10){
                a = "0"+a;
            }
        num.innerText = a;

        }

    });




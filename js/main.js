// DOM ELements]
const time = document.getElementById('time'),
greeting = document.getElementById('greeting'),
name = document.getElementById('name'),
focus = document.getElementById('focus');

//Options
const showAmPm = true;

// Show Time
function showTime() {
    let today = new Date(),
     hour = today.getHours(),
     min = today.getMinutes(),
     sec = today.getSeconds();

     // Set AM>PM
     const amPm = hour >= 12 ? 'PM' : 'AM';

     // 12hr format
     hour = hour % 12 || 12;

     // Output Time
     time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)} ${showAmPm ? amPm : ''}`;
     setTimeout(showTime,1000);

}

// add zero
function addZero(n){
    return (parseInt(n,10) < 10 ? '0':'')+n;
}

//set Background an greeting
function setBgGreet(){
    let today = new Date(),
    hour = today.getHours();
    if(hour < 12){
        //morning
        document.body.style.backgroundImage = "url('../img/morning.jpg')";
        greeting.textContent = 'Good Morning';
    } else if(hour < 18){
        // afternoon
        document.body.style.backgroundImage = "url('../img/afternoon.jpg')";
        greeting.textContent = 'Good Afternoon';
    } else {
        //evening
        document.body.style.backgroundImage = "url('../img/night.jpg')";
        greeting.textContent = 'Good Evening';
        document.body.style.color = 'whitesmoke';
    }
}

//get Name
function getName(){
    if(localStorage.getItem('name')===null){
        name.textContent = 'EnterName';

    } else {
        name.textContent = localStorage.getItem('name');
    }
}

//get focus
function getFocus(){
    if(localStorage.getItem('focus')===null){
        focus.textContent = 'EnterFocus';

    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}



//set Name
function setName(e) {
    if(e.type === 'keypress'){
        // make  sure enter is pressed
        if(e.which == 13 || e.keyCode == 13){
            localStorage.setItem('name',e.target.innerText);
            name.blur();
        }
    } else {
       localStorage.setItem('name',e.target.innerText); 
    }
};

//set Name
function setFocus(e) {
    if(e.type === 'keypress'){
        // make  sure enter is pressed
        if(e.which == 13 || e.keyCode == 13){
            localStorage.setItem('focus',e.target.innerText);
            focus.blur();
        }
    } else {
       localStorage.setItem('focus',e.target.innerText); 
    }
};

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

//run
showTime();
setBgGreet();
getName();
getFocus();
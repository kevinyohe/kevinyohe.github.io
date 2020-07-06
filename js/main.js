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
    month = today.getMonth();
    day = today.getDate();
    console.log(month)
    console.log(day)
    if(month === 6 && day ===4 ){
        document.body.style.backgroundImage = "url('../img/fireworks.jpg')";
        greeting.textContent = 'Happy 4th of July'; 
        document.body.style.color = 'whitesmoke';  
    }
    else if(hour < 12){
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

function weatherUpdate( cityID ) {
    var key = '4a1ba09ff1c28be885063186f82bb229';
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      displayWeather(data);
    })
    .catch(function() {
      // catch any errors
    });
  }
  
  window.onload = function() {
    weatherUpdate( 4174855 );
  }

function displayWeather(d){
    
    var celcius = Math.round(parseFloat(d.main.temp)-273.15);
    var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
    
    document.getElementById('description').innerHTML = d.weather[0].description;
    document.getElementById('temp').innerHTML = fahrenheit + '&deg;';
    document.getElementById('location').innerHTML = d.name; 
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

//run
showTime();
setBgGreet();
getName();
getFocus();
displayWeather();


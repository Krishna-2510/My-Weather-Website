// a9904ad49a536fadac8f095e8abfbb6b
// api.openweathermap.org/data/2.5/weather?q={city name}&appid=a9904ad49a536fadac8f095e8abfbb6b

const inputcity = document.getElementById('cityname');
console.log("The value of input box outside is "+inputcity.value);
const button = document.getElementById("but");

inputcity.addEventListener('keypress',(e)=>{
    if(e.keyCode==13)
    {
        console.log("The value of input box in keypress is "+inputcity.value);
        document.querySelector('.weatherdata').style.display = "block";
        console.log(inputcity.value);
        getWeather(inputcity.value);
    }
});
button.addEventListener('click', () => {
    console.log("The value of input box in click is "+inputcity.value);
    document.querySelector('.weatherdata').style.display = "block";
    console.log(inputcity.value);
    getWeather(inputcity.value);
});

function getWeather(city) {
    var api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a9904ad49a536fadac8f095e8abfbb6b&units=metric`;
    fetch(api)
        .then(weather => {
            return weather.json();
        })
        .then(showWeather);
};

const button2 = document.getElementById("curr");
button2.addEventListener('click', () => {
    document.querySelector('.weatherdata').style.display = "block";
    getcurrentloc();
});
function getcurrentloc() {
    console.log("In getcurrent");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        console.log("in fun");
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
    console.log("In show");
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=a9904ad49a536fadac8f095e8abfbb6b&units=metric`)
        .then(weather => {
            return weather.json();
        })
        .then(showWeather);
};

function showWeather(weather) {
    console.log(weather);

    if(weather?.cod === '404'){
        document.querySelector('.noLocation').style.display = "block";
        document.querySelector('.weatherdata').style.display = "none";
        document.getElementById('vid').src = "video/sunsetvideo.mp4";
        var v = document.getElementById('v');
        v.load();
        v.play();
        var icon = document.getElementById('icon');
        icon.innerHTML = '<i class="fas fa-smog"></i>';
        return;
    }
    
    document.querySelector('.noLocation').style.display = "none";

    var citynm=document.getElementById('cityname');
    citynm.value=`${weather.name}`;

    var loc = document.getElementById('location');
    loc.innerText = `${weather.name}, ${weather.sys.country}`;

    var temp = document.getElementById('temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    var type = document.getElementById('type');
    type.innerText = `${weather.weather[0].main}`;

    var feel = document.getElementById('feel');
    feel.innerHTML = `Feels like ${Math.round(weather.main.feels_like)}&deg;C (max:${Math.ceil(weather.main.temp_max)}&deg;C/min:${Math.floor(weather.main.temp_min)}&deg;C) `

    var humid = document.getElementById('humid');
    humid.innerText = `Humidity:${weather.main.humidity}%`;

    var d = document.getElementById('date');
    var today = new Date();
    d.innerText = setdate(today);

    //changing backgrounds
    if (type.textContent == 'Haze')
    {
        document.getElementById('vid').src = "video/hazevideo.mp4";
        var v = document.getElementById('v');
        v.load();
        v.play();
        var icon = document.getElementById('icon');
        icon.innerHTML = '<i class="fas fa-smog"></i>';
    }
    else if (type.textContent == 'Sunny')
    {
        document.getElementById('vid').src = "video/flowerbg.mp4";
        var v = document.getElementById('v');
        v.load();
        v.play();
        var icon = document.getElementById('icon');
        icon.innerHTML = '<i class="fas fa-sun">';
    }
    else if (type.textContent == 'Snow')
    {
        document.getElementById('vid').src = "video/snowvideo.mp4";
        var v = document.getElementById('rollvid');
        v.load();
        v.play();
        var icon = document.getElementById('icon');
        icon.innerHTML = '<i class="far fa-snowflake">';
    }
    else if (type.textContent == 'Clear')
    {
        document.getElementById('vid').src = "video/clearsky.mp4";
        var v = document.getElementById('v');
        v.load();
        v.play();
        var icon = document.getElementById('icon');
        icon.innerHTML = '<i class="fas fa-sun">';
    }
    else if (type.textContent == 'Clouds')
    {
        document.getElementById('vid').src = "video/cloudy.mp4";
        var v = document.getElementById('v');
        v.load();
        v.play();
        var icon = document.getElementById('icon');
        icon.innerHTML = '<i class="fas fa-cloud-sun">';
    }
    else if (type.textContent == 'Thunderstorm')
    {
        document.getElementById('vid').src = "video/thundervideo.mp4";
        var v = document.getElementById('v');
        v.load();
        v.play();
        var icon = document.getElementById('icon');
        icon.innerHTML = '<i class="fas fa-bolt"></i>';
    }
    else if (type.textContent == 'Drizzle')
    {
        document.getElementById('vid').src = "video/drizzlevideo.mp4";
        var v = document.getElementById('v');
        v.load();
        v.play();
        var icon = document.getElementById('icon');
        icon.innerHTML = '<i class="fas fa-cloud-showers-heavy">';
    }
    else if (type.textContent == 'Rain')
    {
        document.getElementById('vid').src = "video/rainvideo.mp4";
        var v = document.getElementById('v');
        v.load();
        v.play();
        var icon = document.getElementById('icon');
        icon.innerHTML = '<i class="fas fa-cloud-showers-heavy">';
    }
    else if (type.textContent == 'Mist')
    {
        document.getElementById('vid').src = "video/mistvideo.mp4";
        var v = document.getElementById('v');
        v.load();
        v.play();
        var icon = document.getElementById('icon');
        icon.innerHTML = '<i class="fas fa-braille">';
    }
    else if (type.textContent == 'Fog')
    {
        document.getElementById('vid').src = "video/hazevideo.mp4";
        var v = document.getElementById('v');
        v.load();
        v.play();
        var icon = document.getElementById('icon');
        icon.innerHTML = '<i class="fas fa-smog"></i>';
    }
}

function setdate(now) {
    var day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    var res = `${now.getDate()} ${month[now.getMonth()]}(${day[now.getDay()]}) ${now.getFullYear()}`;
    return res;
}
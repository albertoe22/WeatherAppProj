var weather;
var input;
var result;
var obj1;
var obj2;
var value;
var lon;
var lat;
var api = 'https://api.openweathermap.org/data/2.5/onecall?lat=';
var apiKey = '&appid=b21af776a512a935904b958e43e53ccf';
var units =  '&units=imperial';

var aqi = 'https://api.waqi.info/feed/';

var apiKey2 = '/?token=670aa9e79239359c62a4f2aa9af74cbfd9ea730e';

// const colors = {

// }

// Onclick call this function
function weatherApp() {
    // Get input from text box
    input = document.getElementById("city");
    let url2 = aqi + input.value + apiKey2;

    // Read json file of the url, grab data and call the other functions for DOM
    $.getJSON(url2, function(obj1){
        let arr = airData(obj1);
        lat= arr[0]; lon = arr[1]; value = arr[2];
        let url = api + lat + '&lon=' + lon + apiKey+units;
        $.getJSON(url, function(obj2){
            gotData(obj2, value);       
        });
      });
      //
}

// Get weather data
function gotData(data, value) {
    weather = data;
    let temp = weather.current.temp;
    let humidity = weather.current.humidity;
    let uvi = weather.current.uvi.toFixed(0);
    let feels = weather.current.feels_like +"0&deg";
    let aCard = document.getElementById("aCard");
    let aText = document.getElementById("aText");
    let uCard = document.getElementById("uCard");
    let uText = document.getElementById("uText");
    

    if (value <= 50) {
        aCard.style.background = "green";
        aText.innerHTML = "Air quality is good";
    } 
    else if (value>=50 && value<=100) {
        aCard.style.background = "#ffcc00";
        aText.innerHTML = "Air quality is acceptable, sensitive groups should limit outdoor excersion";
    }
    else if (value>=51 && value<=150) {
        aCard.style.background = "#FFBA49";
        aText.innerHTML = "Air quality is unhealthy for sensitive groups. General public is less likely to be affected";
    }
    else if (value>=151 && value<=200) {
        aCard.style.background = "#ff3333";
        aText.innerHTML = "Air quality is unhealthy for the general public and sensitive groups";
    }
    else {
        aCard.style.background ="#ac39ac";
        aText.innerHTML = "Health alert: The risk of health effects is increased for everyone";
    }

    if (uvi < 3 ) {
        uCard.style.background ="green";
        uText.innerHTML = "No UV protection needed"
    }
    else if (uvi>=3 && uvi <=5) {
        //yellow orange#ffcc00 
        uCard.style.background ="#ffcc00";
        uText.innerHTML = "UV protection needed, apply a SPF-15 sunscreen and cover exposed skin"
    }
    else if (uvi>=6 && uvi <=7) {
        //orange
        uCard.style.background ="#FFBA49";
        uText.innerHTML = "UV protection needed, apply a SPF-15 sunscreen and cover exposed skin"
    }
    else if (uvi>=8 && uvi <=10) {
        //red
        uCard.style.background ="#ff3333";
        uText.innerHTML = "Extra UV protection needed! Apply a minimum of SPF-15 sunscreen generously and cover exposed skin"
    }
    else {
        //purple
        uCard.style.background ="#ac39ac";
        uText.innerHTML = "Extra UV protection needed! Apply a minimum of SPF-15 sunscreen generously and cover exposed skin"
    }
    document.getElementById("uvi").innerHTML =  uvi;
    document.getElementById("output").innerHTML = (temp).toFixed(2) +  " &degF ";
    document.getElementById("humidity").innerHTML = humidity+"%";
    document.getElementById("aqi").innerHTML =  value;

}

// Gets air quality data
function airData(data) {
    let result = data;
    let arr = result.data.city.geo;
    arr.push(result.data.aqi);
    return arr;
}


// function airQ() {
//     input = document.getElementById("city");
//     var url2 = aqi + input.value + apiKey2;
//     console.log(result.data.uvi);
//     accessAQI(url2);
// }


// function googData(data) {
//     result = data;
//     var latitude = Math.round(100*result.results[0].geometry.location.lat)/100;
//     var longitude = Math.round(100*result.results[0].geometry.location.lng)/100;
//     var combine = latitude+','+longitude;
//     //console.log(result.results[0].geometry.location.lng);
//     var url3 = aqi + combine + '/2016-01-02T15:04:05Z' + apiKey2;
//     console.log(url3);
//     airQuality(url3);
// }

// function airQuality(url) {
//     xmlhttp.open('GET', url, true);
//     xmlhttp.send();
//     xmlhttp.onreadystatechange = function() {
//     if (xmlhttp.readyState == 4) {
//         if(xmlhttp.status == 200) {
//             var air = JSON.parse(xmlhttp.responseText);
//             airData(air);
//         }
//     }
//     };

// }

// function loc() {
//     input = document.getElementById("city");
//     var url2 = goog + input.value + googKey;
//     xmlhttp.open('GET', url2, true);
//     xmlhttp.send();
//     xmlhttp.onreadystatechange = function() {
//     if (xmlhttp.readyState == 4) {
//         if(xmlhttp.status == 200) {
//             var result = JSON.parse(xmlhttp.responseText);
//             googData(result);
//         }
//     }
//     };
// }

// function accessAPI(url) {
//     xmlhttp.open('GET', url, true);
//     xmlhttp.send();
//     xmlhttp.onreadystatechange = function() {
//     if (xmlhttp.readyState == 4) {
//         if(xmlhttp.status == 200) {
//             var obj = JSON.parse(xmlhttp.responseText);
//             gotData(obj);
//         }
//     }
//     };
// }


// function accessAQI(url) {
//     xmlhttp.open('GET', url, true);
//     xmlhttp.send();
//     xmlhttp.onreadystatechange = function() {
//     if (xmlhttp.readyState == 4) {
//         if(xmlhttp.status == 200) {
//             var air = JSON.parse(xmlhttp.responseText);
//             airData(air);
//         }
//     }
//     };
// }

// var aqi = 'http://api.openweathermap.org/pollution/v1/co/';
// //{location}/{datetime}
// var date = '/'+d.toISOString();
// var apiKey2 = '.json?appid=b21af776a512a935904b958e43e53ccf';

// var goog = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
// var googKey = '&key=AIzaSyCAe_x4UaDGgmy1fcnnznlNZwJcfw7J_VU';
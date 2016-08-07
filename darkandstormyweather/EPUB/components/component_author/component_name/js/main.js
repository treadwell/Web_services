/***
 * @name buttonHandler
 * @desc Unified button click and keyboard handler
 * @public
 */


window.onload = function (){

    document.getElementById("status").innerHTML = 'Connection exists : ' + doesConnectionExist();
    if (doesConnectionExist() === false) {
        document.getElementById("online").style.display ='none';
        document.getElementById("offline").style.display ='block';
    }

    var ReadingSystem = navigator.epubReadingSystem;
    if (ReadingSystem){
        document.getElementById('renderer').innerHTML = ReadingSystem.name + ' v. ' + ReadingSystem.version;
    }else{
        document.getElementById('renderer').innerHTML = 'Not able to detect ePub reader env.';
    }



};
var weather = function(city) {


    var oReq = new XMLHttpRequest();



    oReq.onreadystatechange = function() {

        if (oReq.readyState == 4 && oReq.status == 200) {
            var r  = JSON.parse(oReq.response);
            var c = "<ul>";
            c += "<li> <b> City: </b> " + r.name + "</li>";
            c += "<li> <b>Current conditions: </b>" + r.weather[0].description + "</li>";
            c += "<li> <b>Temp (F): </b>" + parseInt(r.main.temp) + "</li>";
            c += "<li> <b>Humidity:</b> " + parseInt(r.main.humidity) + " % </li>";
            c += "</ul>";
            document.getElementById("demo").innerHTML = c;
        }
    };
    oReq.addEventListener("load", transferComplete);
    oReq.addEventListener("error", transferFailed);
    oReq.addEventListener("abort", transferCanceled);

    oReq.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=82b7cc10f0f96847288d012cad6ea3f0&units=imperial", true);
    oReq.send();
}

// ...

function transferComplete(evt) {
    document.getElementById("status").innerHTML ="The transfer is complete.";
    console.log(evt);
}

function transferFailed(evt) {
    document.getElementById("status").innerHTML ="An error occurred while transferring the file.";
    console.log(evt);
}

function transferCanceled(evt) {
    document.getElementById("status").innerHTML ="The transfer has been canceled by the user.";
}

function buttonHandler(event, city) {
    // Older browsers may still be clinging to the charCode or keyCode implementation
    var charCode = event.which ? event.which : event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;

    document.getElementById("demo").innerHTML = "Request received";

    if ( charCode === 1 || charCode === 32 ) {
        // As a unified click and key handler we do NOT map charCode === 10 ("Enter" key). UIEvent "keyup" default action is to call a "click" event with the "Enter" key, thus resulting in a double "press" scenario.
        document.getElementById("demo").innerHTML = "Request in progress";

        weather(city.value);


        event.preventDefault();
    }
}

function doesConnectionExist() {
    var xhr = new XMLHttpRequest();
    var file = "http://api.openweathermap.org/data/2.5/weather?q=NYC&APPID=82b7cc10f0f96847288d012cad6ea3f0&units=imperial";


    xhr.open('HEAD', file, false);

    try {
        xhr.send();

        if (xhr.status >= 200 && xhr.status < 304) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}
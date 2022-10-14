
// get apikey ,baseurl from openweathermap API
const API_KEY = "048d5c014e0846e8cc281e86f53d7382";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?zip=";


/* Global Variables */

const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const generate = document.getElementById("generate");

// Create a new date instance dynamically with JS
  let date = new Date();
  const today = `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`;
  

  //generate data by submitting generate

generate.addEventListener("click", async () => {
    
   getTemperature(API_URL, zip.value, API_KEY)
        .then(data => sendToServer({
            date: today,
            temp: data.main.temp,
            feelings: feelings.value,
        })
        )
        .then((data) => {
            console.log(data);
            updateUI();
        });

   
});

// get weather temprature
async function getTemperature(url, zipCode, apiKey) {
    const request = await fetch(
        `${url}${zipCode}&appid=${apiKey}&units=imperial`
    );
    try {
        const response = await request.json();
        return response;
    } catch (error) {
        console.log("error", error);
    }
}
//send data to the server

async function sendToServer(data = {}) {
    const request = await fetch('/sendData', {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try{
            const response = await request.json();
            return response;
    } catch (error) {
        console.log("error", error);
    }
}

// updateUI
async function updateUI() {
    const request = await fetch ('/getData');
    try {
        const response = await request.json();
        document.getElementById("date").innerHTML = "Date Is : "+ response.date ;
        document.getElementById("temp").innerHTML = "Temperature Is : "+response.temp;
        document.getElementById("content").innerHTML = " My Feeling Is : "+response.feelings;
    } catch (error) {
        console.log("error", error);
        alert("something went wrong");
    }
}



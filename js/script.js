(()=>{
  const date=new Date();
 let day = date.getDate();
 let month = date.getMonth() + 1;
 let year = date.getFullYear();
 let fullDate = `${day}-${month}-${year}`;//Initializes date variables and sets the 'fullDate' variable with the current date.
 document.getElementById('date').innerHTML=fullDate;// Sets the inner HTML of an element with id 'date' to the 'fullDate'.
 
 })();
 let workingInCity = document.getElementById('place');
 const apikey = "8e8c36eefaa15d1c6b25ed4a4d0de73a";// Sets the API key for accessing weather data.
 const apiurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
 const searchBox = document.querySelector('.search input');// Sets the API URL for fetching weather data and selects the search input element and search button.
 const searchBtn = document.querySelector('.search button');
 
 function weatherCheck(city) {// Defines a function 'weatherCheck' that takes a city parameter to fetch weather data from the API.
   if (!city) {// Displays an alert if no city is provided.
     alert("Please enter a city name");
     return;
     
   }
    
   fetch(apiurl + city + `&appid=${apikey}`)// Fetches weather data for the given city using the API URL and API key.
     .then(response => response.json())
     .then(data => {
       console.log(data);//data to print in console
        // Displays various weather data in the respective HTML elements based on the fetched data.
       document.getElementById('place').innerHTML = data.name;
       document.getElementById('Temperature').innerHTML = Math.round(data.main.temp) + " °C";
       document.getElementById('high-t').innerHTML = Math.round(data.main.temp_max) + "°C";
       document.getElementById('low-t').innerHTML = Math.round(data.main.temp_min) + "°C";
       document.getElementById('Humidity').innerHTML = data.main.humidity + "%";
       document.getElementById('Wind').innerHTML = data.wind.speed + " km/hr";
       document.getElementById('pressure').innerHTML = data.main.pressure + " PA";
       document.getElementById('des').innerHTML=data.weather[0].description;
       const weatherIcon = document.getElementById('icon');
       weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;// Sets the weather icon based on the fetched weather data.
       fetch("./php/insert.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Send the searched city to PHP
      })
      .then(response => response.text())
      .then(responseText => {
        console.log(responseText); // Log the response from PHP
      })
      .catch(error => {
        console.error('Error sending data to PHP:', error);
      });
      
      
     })
     .catch(error => {
       console.error("Error fetching weather data:", error);
       document.getElementById('place').innerHTML = "City Not Found";
       document.getElementById('Temperature').innerHTML = "";
       document.getElementById('high-t').innerHTML = "";
       document.getElementById('low-t').innerHTML = "";
       document.getElementById('Humidity').innerHTML = "";
       document.getElementById('Wind').innerHTML = "";
       document.getElementById('pressure').innerHTML = "";
       document.getElementById('des').innerHTML = "";
       const weatherIcon = document.getElementById('icon');
       weatherIcon.src = "";
     });
 };
 
 function handleOnloadEvent() {
   const defaultCity = "East Hertfordshire District";// Sets a default city and calls the 'weatherCheck' function on page load.
   weatherCheck(defaultCity);
 }
 
 window.addEventListener('load', handleOnloadEvent);
 searchBox.addEventListener("keydown", (event) => {// Adds an event listener to the search input for keydown events.
   if (event.key === "Enter") {
     const city = searchBox.value;
     weatherCheck(city);// Calls the 'weatherCheck' function if the Enter key is pressed.
   }
 });
 
 searchBtn.addEventListener("click", () => {// Adds an event listener to the search button.
   const city = searchBox.value;
   weatherCheck(city);// Calls the 'weatherCheck' function when the button is clicked.
 });
 document.querySelector(".historyButton").addEventListener("click", () => {
  const city = workingInCity.innerHTML;
  window.location.href = `history.html?city=${encodeURIComponent(city)}`;
});


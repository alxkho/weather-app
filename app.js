window.addEventListener('load', () => {
  let lon;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-desription');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureSpan = document.querySelector('.temperature span');

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition ( position => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=861103307f073038e41a02f50edc87b3`;

      fetch(api)
        .then(response => response.json())
        .then(data => {
          const {temp}= data.current;
          const {description, icon}= data.current.weather[0];
          let fahrenheit  = Math.floor((temp - 273.15) * 9/5 + 32);
          let celsius = Math.floor(temp - 273.15);

          temperatureDegree.textContent = celsius;
          temperatureDescription.textContent = description;
          locationTimezone.textContent = data.timezone;
          document.getElementById('icon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

      
          temperatureDegree.addEventListener('click', () => {
            if (temperatureSpan.textContent === "C"){
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = fahrenheit;
            } else {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = celsius;
            }
          });
        });
    });
  } else h1.textContent = "I don't see your location :(";
});
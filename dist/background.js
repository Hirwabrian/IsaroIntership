// background.js
console.log("Background script STARTED");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Received request:", request);

  if (request.action === "fetchWeather") {
    const API_KEY = "8c750e87cf504382a88141741251604";
    const { lat, lng } = request.coords;
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lng}&aqi=no`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log("Weather data:", data);
        sendResponse({ 
          success: true, 
          data: {
            current: {
              temp_c: data.current.temp_c,
              condition: {
                text: data.current.condition.text,
                icon: data.current.condition.icon
              }
            }
          }
        });
      })
      .catch(error => {
        console.error("Fetch error:", error);
        sendResponse({ 
          success: false, 
          error: error.message 
        });
      });

    return true; // Required for async
  }
});
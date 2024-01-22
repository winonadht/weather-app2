import { fetchUnsplashImage } from "./cityPicture.js";
import { Suggestions } from "./listeDeroulante.js";
import {
  getStoredCity,
  setStoredCity,
  getSearchHistory,
  addToSearchHistory,
} from "./localeStorage.js";

const apiKey = "d0df2975803f2e583df60815a7019f50";
const btn = document.getElementById("btn");

export async function meteo() {
  let cityInput = document.getElementById("cityInput");
  let cityName = cityInput.value;

 if (!cityName) {
    cityName = getStoredCity() || getSearchHistory()[0];

    if (!cityName) {
      alert("entrer le nom de la ville");
      return;
    }
  }
  addToSearchHistory(cityName);

  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const selectedDays = new Set();
    console.log(data);

    const Container = document.getElementById("forecastContainer");
    Container.innerHTML = "";

    if (data.list) {
      const imageUrl = await fetchUnsplashImage(cityName);

      data.list.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleString("fr-FR", { weekday: "long" });
        if (!selectedDays.has(day) && selectedDays.size < 5) {
          selectedDays.add(day);
          console.log(selectedDays);

          const deg = item.main.temp;
          const details = item.weather[0].description;
          const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

          const meteoElement = document.createElement("div");
          meteoElement.innerHTML = `<p>${day} <img src="${iconUrl}" alt="${details}"> (${date.toLocaleDateString(
            "en-FR"
          )}),${deg}°c, ${details} </p>`;
          Container.appendChild(meteoElement);
        }
      });

      if (imageUrl) {
        const imageElement = document.getElementById("image");
        imageElement.src = imageUrl;
        imageElement.alt = `Ville : ${cityName}`;
      }

      setStoredCity(cityName);
    } else {
      alert("Erreur de données");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données météo:", error);
  }
}
meteo();
btn.addEventListener("click", meteo);
Suggestions();

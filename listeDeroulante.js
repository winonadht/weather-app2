function Suggestions() {
  const cityInput = document.getElementById("cityInput");

  

  cityInput.addEventListener("input", async() => {
    const inputValue = cityInput.value.toLowerCase();
    const dataListVille = document.getElementById("dataList");
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${inputValue}&format=json`);
      const data = await response.json();
      dataListVille.innerHTML = '';
      data.forEach(city => {
      const option = document.createElement('option');
      option.value = city.display_name;
      dataListVille.appendChild(option);
      });
      } catch (error) {
      console.error('Erreur lors du chargement des villes :', error);
      }
  });
}

export { Suggestions };
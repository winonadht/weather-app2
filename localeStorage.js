export function getSearchHistory() {
    const historyString = localStorage.getItem("searchHistory");
    return historyString ? JSON.parse(historyString) : [];
}

export function addToSearchHistory(cityName) {
    const history = getSearchHistory();
    history.unshift(cityName);
    localStorage.setItem("searchHistory", JSON.stringify(history.slice(0, 5)));
}

export function setStoredCity(cityName) {
    localStorage.setItem("storedCity", cityName);
}

export function getStoredCity() {
    return localStorage.getItem("storedCity") || "";
}

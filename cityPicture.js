export async function fetchUnsplashImage(cityName) {
    const unsplashApiKey = 'tDdncAgbEG1dExdzkHO5a8ip_yIR-5lSMAH_naTbyD4'; 
    const unsplashUrl = `https://api.unsplash.com/photos/random?query=${cityName}&client_id=${unsplashApiKey}`;

    try {
        const response = await fetch(unsplashUrl);
        const data = await response.json();
        return data.urls.regular;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'image Unsplash:', error);
        return null;
    }
}
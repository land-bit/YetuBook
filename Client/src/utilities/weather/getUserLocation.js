export default function getUserLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve(position);
        },
        error => {
          reject(error);
        }
      );
    });
  }
  
  // Utilisation de la fonction
  getUserLocation()
    .then(position => {
      console.log("Latitude:", position.coords.latitude);
      console.log("Longitude:", position.coords.longitude);
    })
    .catch(error => {
      console.error("Erreur lors de la récupération de la géolocalisation:", error);
    });
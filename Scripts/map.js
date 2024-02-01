/*------------------------------------------------------------------------------
En fonction du localStorage, gestion couleurs, affichage et remplissage dynamique
------------------------------------------------------------------------------*/
function handleLocalStorage() {
  // Récupération des données localStorage
  let prefs = JSON.parse(localStorage.getItem("Préférences"));
  let infos = JSON.parse(localStorage.getItem("Infos Promo"));

  // Remplissage du Titre
  const promo = document.getElementById("promo");
  promo.textContent = `${infos.nom}`;

  // Si des préférences sont stockées, elles sont appliquées et affichées
  if (prefs) {
    // Gestion des couleurs
    if (prefs.theme == "clair") {
      document.body.style.backgroundColor = prefs.backgroundColor;
    } else {
      document.body.style.backgroundColor = prefs.backgroundColor;
      document.body.style.color = "#fff";
    }
  }
}
handleLocalStorage();

/*----------------------
Implémentation de la map 
----------------------*/
let map = L.map("map").setView([48.866667, 2.333333], 4);

L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg",
  {
    maxZoom: 16,
    attribution:
      '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
  }
).addTo(map);

/*----------------------
Marqueurs et coordonnées 
----------------------*/

let students = JSON.parse(localStorage.getItem("Apprenants"));
for (let i = 0; i < students.length; i++) {
  let marker = L.marker([
    students[i].coordonnees.latitude,
    students[i].coordonnees.longitude,
  ]).addTo(map);
  marker.bindPopup(`${students[i].prenom} ${students[i].nom}`).openPopup();
}

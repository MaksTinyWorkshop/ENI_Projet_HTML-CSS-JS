/*----------------------------
Récupération des infos du JSON
----------------------------*/
function recupDonnees() {
  Promise.all([
    fetch("/assets/promo.json").then((response) => {
      return response.json();
    }),
    fetch("/assets/variables.json").then((response) => {
      return response.json();
    }),
  ]).then((data) => {
    fillCoordonnees(data[0]);
    handleLocalStorage(data[1]);
  });
}
recupDonnees();

/*------------------------------------------------------------------------------
En fonction du localStorage, gestion couleurs, affichage et remplissage dynamique
------------------------------------------------------------------------------*/
function handleLocalStorage(data) {
  // Récupération des données localStorage...
  let prefs = JSON.parse(localStorage.getItem("Préférences"));
  let infos = JSON.parse(localStorage.getItem("Infos Promo"));
  // ... & Variable de couleur
  let couleurFont = data.sombre.Noir;

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
      document.body.style.color = couleurFont;
    }
  }
}

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

function fillCoordonnees(data) {
  data = data.apprenants;

  for (let i = 0; i < data.length; i++) {
    let marker = L.marker([
      data[i].coordonnees.latitude,
      data[i].coordonnees.longitude,
    ]).addTo(map);
    marker.bindPopup(`${data[i].prenom} ${data[i].nom}`).openPopup();
  }
}

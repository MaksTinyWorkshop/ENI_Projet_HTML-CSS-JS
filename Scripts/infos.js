/*----------------------------
Récupération des infos du JSON
----------------------------*/
function recupDonnees() {
  fetch("/assets/promo.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      handleDynamicInfos(data);
      handleLocalStorage();
    });
}
recupDonnees();

/*-------------------------------------------------------
En fonction du localStorage, gestion couleurs et affichage
-------------------------------------------------------*/
function handleLocalStorage() {
  // Récupération des données localStorage
  let prefs = JSON.parse(localStorage.getItem("Préférences"));

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

/*------------------------------------------------------------
En fonction du localStorage, remplissage dynamique des données
------------------------------------------------------------*/
function handleDynamicInfos(data) {
  // Récupération des données
  let infos = data.infoPromo;
  let links = infos.liens;

  // Pointage des éléments à remplir
  const promo = document.getElementById("promo");
  const dates = document.getElementById("infoDates");
  const nbStudents = document.getElementById("nbStudents");
  const description = document.getElementById("description");
  const linksList = document.getElementById("linksList");

  // - Remplissage
  // -- Les Titres
  promo.textContent = `${infos.nom}`;
  dates.textContent = `Formation du ${infos.debut} au ${infos.fin}`;
  nbStudents.textContent = `Nombre d'étudiants : ${infos.nbEtudiants}`;
  // -- Le paragraphe description
  description.textContent = `${infos.description}`;

  // -- Les liens
  const templateLink = document.getElementById("templateLink");
  for (let key in links) {
    let linkInfo = links[key];
    let clone = templateLink.content.cloneNode(true);
    let linkElement = clone.querySelector("a");
    linkElement.href = linkInfo.href;
    linkElement.textContent = linkInfo.txt;
    linksList.appendChild(clone);
  }
}

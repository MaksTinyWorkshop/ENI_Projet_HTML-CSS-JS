/*---------------------------------------------------------
Initialisation d'un tableau de couleurs possibles par thème
---------------------------------------------------------*/
// Récupération des variables définies dans un JSON.
function recupCouleurs() {
  fetch("/assets/variables.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      fillcolorTab(data);
      handleLocalStorage();
    });
}
recupCouleurs();

// Tableau de data rempli avec la fonction
let colorTab = [];

function fillcolorTab(data) {
  colorTab = {
    clair: data.clair,
    sombre: data.sombre,
  };
  // Initialisation en thème clair
  fillTheme(colorTab.clair);
}

/*------------------------------------------------------------------
Ciblage du menu déroulant de thème et gestion des options par défaut
------------------------------------------------------------------*/
const theme = document.getElementById("theme");
const themeColors = document.getElementById("themeColors");
const colorPreview = document.getElementById("colorPreview");
const valid = document.getElementById("validPreview");

// Fonction de remplissage des options en fonction du thème
function fillTheme(chosenTheme, storedColor = null) {
  themeColors.innerHTML = "";

  // chosenTheme n'est pas null
  if (!chosenTheme) return;

  // Boucle de création des options du select
  for (let [nom, code] of Object.entries(chosenTheme)) {
    const option = document.createElement("option");
    option.value = code;
    option.text = nom;
    themeColors.appendChild(option);

    // Vérifier si cette couleur est celle enregistrée
    if (storedColor && code === storedColor) {
      option.selected = true;
      colorPreview.style.backgroundColor = storedColor;
    }
  }

  // Si aucune couleur enregistrée n'est trouvée, sélectionnez la première couleur par défaut
  if (!storedColor) {
    const firstColor = Object.values(chosenTheme)[0];
    colorPreview.style.backgroundColor = firstColor;
  }
}

/*-------------------------------------
Gestion du mode clair et du mode sombre
-------------------------------------*/
theme.addEventListener("change", themeSelector);

function themeSelector() {
  if (theme.value == "clair") {
    fillTheme(colorTab.clair);
  } else if (theme.value == "sombre") {
    fillTheme(colorTab.sombre);
  }
}

/*------------------------------------
Gestion de la couleur du body & apercu
------------------------------------*/

// Aperçu de la couleur de fond
themeColors.addEventListener("change", function () {
  colorPreview.style.backgroundColor = this.value;
});

/*-----------------------------------------
Enregistrer les prefs dans le local storage
-----------------------------------------*/

// Ciblage du bouton enregistrer
const saveBtn = document.getElementById("saveSettings");
saveBtn.addEventListener("click", savePrefs);

// Fonction de sauvegarde des prefs
function savePrefs(e) {
  e.preventDefault();

  const selectedColor = themeColors.value;
  document.body.style.backgroundColor = selectedColor;

  // Si le thème choisi est sombre, passage de la font en blanc
  theme.value == "sombre"
    ? (document.body.style.color = colorTab.clair.Blanc)
    : "";
  theme.value == "clair"
    ? (document.body.style.color = colorTab.sombre.Noir)
    : "";

  let listOrCard = liste.checked ? "liste" : "card";
  let prefs = {
    theme: theme.value,
    backgroundColor: themeColors.value,
    display: listOrCard,
  };
  localStorage.setItem("Préférences", JSON.stringify(prefs));
  setTimeout(() => alert("Préférences enregistrées"), 300);
}

/*---------------------------------------------------------------------
Gestion des prefs en fonction du local Storage et remplissage dynamique
---------------------------------------------------------------------*/
// Englobage dans une fonction
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
    theme.value = prefs.theme;
    if (prefs.theme == "clair") {
      fillTheme(colorTab.clair, prefs.backgroundColor);
      document.body.style.backgroundColor = prefs.backgroundColor;
    } else {
      fillTheme(colorTab.sombre, prefs.backgroundColor);
      document.body.style.backgroundColor = prefs.backgroundColor;
      document.body.style.color = "#fff";
    }
    // Gestion du bouton radio
    if (prefs.display == "liste") {
      liste.checked = true;
    } else {
      cartes.checked = true;
    }
  }
}

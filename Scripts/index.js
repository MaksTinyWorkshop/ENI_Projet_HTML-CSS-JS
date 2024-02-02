/*----------------------------
Récupération des infos du JSON
----------------------------*/
function recupDonnees() {
  fetch("/assets/promo.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      fillElements(data);
      handleLocalStorage(data);
    })
    .then(listenModal);
}
recupDonnees();

/*----------------------------------------------
Gestion de l'affichage en fonction du check Radio
----------------------------------------------*/
// Les boutons radio
const displayList = document.getElementById("liste");
const displayCard = document.getElementById("cartes");

// Elements correspondants (tableau ou div de cards ou modals)
const studentTable = document.getElementById("studentTable");
const studentCards = document.getElementById("studentCards");
const studentModals = document.getElementById("studentModals");

// Par défaut, masquer le mode Card index.html
if (studentCards) {
  studentCards.style.display = "none";
}

// EventListeners sur les radio
displayCard.addEventListener("change", toggleDisplay);
displayList.addEventListener("change", toggleDisplay);

function toggleDisplay() {
  if (liste.checked) {
    studentTable.style.display = "table";
    studentCards.style.display = "none";
  } else if (cartes.checked) {
    studentTable.style.display = "none";
    studentCards.style.display = "grid";
  }
}

/*----------------------------------------------
Récupération des données de la DB et remplissage
----------------------------------------------*/
const templateArray = document.getElementById("templateStudentArray");
const templateCard = document.getElementById("templateStudentCard");
const templateModal = document.getElementById("templateStudentModal");

const studentArray = document.querySelector("tbody");

// Fonction de remplissage dynamique des cards et lignes de tableau en fonction du fichier promo.json
function fillElements(data) {
  data = data.apprenants;

  for (let i = 0; i < data.length; i++) {
    const clone = templateArray.content.cloneNode(true);
    const clone2 = templateCard.content.cloneNode(true);
    const clone3 = templateModal.content.cloneNode(true);

    // Remplissage tableau
    let td = clone.querySelectorAll("td");
    td[0].textContent = data[i].nom;
    td[1].textContent = data[i].prenom;
    td[2].textContent = data[i].ville;
    // Attribution d'un nombre = id pour cibler plus facilement
    td[3].setAttribute("data-number", data[i].id);

    // Remplissage cards
    let p = clone2.querySelectorAll("p");
    p[0].textContent = data[i].nom;
    p[1].textContent = data[i].prenom;
    p[2].textContent = data[i].ville;
    // Attribution d'un nombre = id pour cibler plus facilement
    p[3].setAttribute("data-number", data[i].id);

    // Remplissage modals
    let p2 = clone3.querySelectorAll("p");
    let c = clone3.querySelector(".modal");
    let img = clone3.querySelector("img[type='avatar']");
    c.setAttribute("data-number", data[i].id);
    img.setAttribute("src", data[i].avatar);
    img.setAttribute("alt", `Avatar de ${data[i].prenom} ${data[i].nom}`);
    p2[0].innerHTML = "<strong>Nom : </strong>" + data[i].nom;
    p2[1].innerHTML = "<strong>Prénom : </strong>" + data[i].prenom;
    p2[2].innerHTML = "<strong>Ville : </strong>" + data[i].ville;
    p2[3].textContent = data[i].anecdotes;

    // Ajout dans leurs div respectives
    studentArray.appendChild(clone);
    studentCards.appendChild(clone2);
    studentModals.appendChild(clone3);
  }
}

/*--------------------------------------------------------------------------------
En fonction du localStorage, gestion couleurs et affichage et remplissage dynamique
--------------------------------------------------------------------------------*/
function handleLocalStorage(data) {
  // Récupération des données localStorage
  let prefs = JSON.parse(localStorage.getItem("Préférences"));
  let infos = data.infoPromo;

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
    // Gestion du bouton radio
    if (prefs.display == "liste") {
      liste.checked = true;
      toggleDisplay();
    } else {
      cartes.checked = true;
      toggleDisplay();
    }
  }
}

/*------------------
Gestion de la modale
------------------*/
// Fonction appelée après le fetch pour gérer l'arrivée des données
function listenModal() {
  const details = document.getElementsByClassName("details");
  for (let i = 0; i < details.length; i++) {
    details[i].addEventListener("click", displayModal);
  }
}

// Fonction d'affichage d'une modale au clic pour chaque étudiant
function displayModal(e) {
  // Récupération de l'attribut data-number pour display modale correspondante
  const dataNumber = e.target.getAttribute("data-number");
  const modalToDisplay = document.querySelector(
    ".modal[data-number='" + dataNumber + "']"
  );
  modalToDisplay.classList.add("opened");
  e.stopPropagation();
  // Fonction Fun qui position la modale aléatoirement
  const maxWidth = window.innerWidth - modalToDisplay.offsetWidth;
  const maxHeight = window.innerHeight - modalToDisplay.offsetHeight;

  // Calculer une position aléatoire sans dépasser les limites de l'écran
  const randomLeft = Math.floor(Math.random() * maxWidth);
  const randomTop = Math.floor(Math.random() * maxHeight);

  // Seulement sur écran > tablette
  if (window.innerWidth >= 768) {
    modalToDisplay.style.left = `${randomLeft}px`;
    modalToDisplay.style.top = `${randomTop}px`;
  } else {
    modalToDisplay.style.right = `calc(50% + 1rem)`;
    modalToDisplay.style.bottom = `40%`;
  }

  // EventListener pour fermer la modale au clic sur X
  const close = modalToDisplay.querySelector("span[type='close']");
  close.addEventListener("click", () => {
    modalToDisplay.classList.remove("opened");
  });
}

//Fonction qui permet de fermer une modale au clic en dehors de celle-ci
document.addEventListener("click", function () {
  const openedModal = document.querySelector(".opened");
  if (openedModal) {
    openedModal.classList.remove("opened");
  }
});

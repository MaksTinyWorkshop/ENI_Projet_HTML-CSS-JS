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
    fillElements(data);
    handleLocalStorage(data);
  });
}
recupDonnees();

/*----------------------------------------------
Gestion de l'affichage en fonction du check Radio
----------------------------------------------*/
// Les boutons radio
const displayList = document.getElementById("liste");
const displayCard = document.getElementById("cartes");

// Pointage du tableau et de son template
const studentTable = document.getElementById("studentTable");

// Par défaut, disposition tableau
studentTable.classList.add("opened");

// EventListeners sur le radio liste (tableau)
displayList.addEventListener("change", toggleDisplay);

// Fonction d'affichage Tableau / Cards
function toggleDisplay() {
  if (liste.checked) {
    studentTable.classList.add("opened");
    studentCards.classList.remove("opened");
  } else if (cartes.checked) {
    studentTable.classList.remove("opened");
    studentCards.classList.add("opened");
  }
}

/*------------------------------------------------------
Récupération des données de la DB et remplissage tableau
------------------------------------------------------*/
const templateArray = document.getElementById("templateStudentArray");

const studentArray = document.querySelector("tbody");
// Fonction de remplissage dynamique lignes de tableau en fonction du fichier promo.json
function fillElements(data) {
  data = data[0].apprenants;

  displayStudentCards(data);
  for (let i = 0; i < data.length; i++) {
    const clone = templateArray.content.cloneNode(true);

    // Remplissage tableau
    let td = clone.querySelectorAll("td");
    td[0].textContent = data[i].nom;
    td[1].textContent = data[i].prenom;
    td[2].textContent = data[i].ville;
    // Attribution d'un nombre = id pour cibler plus facilement
    td[3].setAttribute("data-number", data[i].id);

    // Ajout dans leurs div respectives
    studentArray.appendChild(clone);
    listenModal();
  }
}

/*--------------------------------------------------------------------------------
En fonction du localStorage, gestion couleurs et affichage et remplissage dynamique
--------------------------------------------------------------------------------*/
function handleLocalStorage(data) {
  // Récupération des données localStorage
  let prefs = JSON.parse(localStorage.getItem("Préférences"));
  let infos = data[0].infoPromo;
  let couleurFont = data[1].clair.Blanc;

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

/*-------------------------------
Fonction de remplissage des cards
-------------------------------*/
// Pointage de la div de cards et template correspondant
const studentCards = document.getElementById("studentCards");
const templateCard = document.getElementById("templateStudentCard");

// Fonction de remplissage et affichage
function displayStudentCards(data) {
  // Event Listener sur le bouton radio
  displayCard.addEventListener("change", () => {
    // Si check et div card vide
    if (displayCard.checked && studentCards.children.length == 0) {
      for (let i = 0; i < data.length; i++) {
        const clone2 = templateCard.content.cloneNode(true);

        // Remplissage cards
        let p = clone2.querySelectorAll("p");
        p[0].textContent = data[i].nom;
        p[1].textContent = data[i].prenom;
        p[2].textContent = data[i].ville;
        // Attribution d'un nombre = id pour cibler plus facilement
        p[3].setAttribute("data-number", data[i].id);

        // Ajout dans la div
        studentCards.appendChild(clone2);
        toggleDisplay();
        listenModal();
      }
      // Sinon fonction toggle
    } else if (displayCard.checked) {
      toggleDisplay();
      listenModal();
    }
  });
}

/*------------------
Gestion de la modale
------------------*/
// Pointage de la div de modale et de son template
const studentModals = document.getElementById("studentModals");
const templateModal = document.getElementById("templateStudentModal");

// Fonction appelée après le fetch pour gérer l'arrivée des données
function listenModal() {
  const details = document.getElementsByClassName("details");
  for (let i = 0; i < details.length; i++) {
    //details[i].addEventListener("click", displayModal);
    details[i].addEventListener("click", displayStudentModal);
  }
}

function displayStudentModal(e) {
  fetch("/assets/promo.json")
    .then((response) => response.json())
    .then((data) => {
      const donnees = data.apprenants;
      const dataNumber = e.target.getAttribute("data-number") - 1;
      const clone = templateModal.content.cloneNode(true);

      // Remplissage modal
      let p2 = clone.querySelectorAll("p");
      let c = clone.querySelector(".modal");
      c.setAttribute("data-number", donnees[dataNumber].id);
      let img = clone.querySelector("img[type='avatar']");
      img.setAttribute("src", donnees[dataNumber].avatar);
      img.setAttribute(
        "alt",
        `Avatar de ${donnees[dataNumber].prenom} ${donnees[dataNumber].nom}`
      );
      p2[0].innerHTML = "<strong>Nom : </strong>" + donnees[dataNumber].nom;
      p2[1].innerHTML =
        "<strong>Prénom : </strong>" + donnees[dataNumber].prenom;
      p2[2].innerHTML = "<strong>Ville : </strong>" + donnees[dataNumber].ville;
      p2[3].textContent = donnees[dataNumber].anecdotes;

      if (
        !studentModals.querySelector(
          `[data-number="${donnees[dataNumber].id}"]`
        )
      ) {
        studentModals.appendChild(clone);
        c.classList.add("opened");
        // Fonction Fun qui position la modale aléatoirement
        const maxWidth = window.innerWidth - c.offsetWidth;
        const maxHeight = window.innerHeight - c.offsetHeight;

        // Calculer une position aléatoire sans dépasser les limites de l'écran
        const randomLeft = Math.floor(Math.random() * maxWidth);
        const randomTop = Math.floor(Math.random() * maxHeight);

        // Seulement sur écran > tablette
        if (window.innerWidth >= 768) {
          c.style.left = `${randomLeft}px`;
          c.style.top = `${randomTop}px`;
        } else {
          c.style.right = `calc(50% + 1rem)`;
          c.style.bottom = `40%`;
        }
      }
    });
}

//Fonction qui permet de fermer une modale au clic en dehors de celle-ci
document.addEventListener("click", function () {
  const openedModal = document.querySelector(".modal.opened");
  if (openedModal) {
    studentModals.removeChild(openedModal);
  }
});

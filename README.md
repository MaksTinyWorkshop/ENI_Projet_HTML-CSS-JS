# ENI_Projet_HTML-CSS-JS

Premier projet à rendre

---

## Rappel de l'énoncé :

L’idée de ce projet est de créer un site internet permettant de présenter votre promo. Ce sera l’occasion aussi d’apprendre à vous connaître et à communiquer.
Des maquettes d’écrans sont fournies pour vous donner une ébauche du site.
Vous aurez la totale liberté de mettre en avant votre créativité et votre qualité de graphiste pour rendre le site attractif.
Vous pouvez intégrer un framework CSS de votre choix.
Si vous avez réussi à réaliser l’intégralité de ce qui est demandé, rien ne vous empêche de proposer de nouvelles fonctionnalités.

## Rappel des objectifs :

• Réaliser un premier projet.
• Mettre en œuvre vos connaissances en HTML CSS et JavaScript basique avec manipulation du DOM et vérification de formulaire.
• Commencer à apprendre Git de façon basique en local.
◦ Savoir les commandes basiques de git (init, add, commit).
◦ Savoir paramétrer un fichier .gitignore.
◦ Savoir créer un compte sur Github et faire un premier push.

## Méthode :

Pour réaliser ce projet en suivant les itérations définies dans le document [[./Consignes/description-projet.pdf]] joint, j'ai d'abord structuré toute la carcasse du site "en dur", en procédant au codage de tout le HTML. Puis j'ai rélisé tout le JavaScript et enfin le CSS par le biais du préprocesseur SASS.

### HTML :

Pas grand chose à signaler sur le HTML, si ce n'est qu'après avoir tout codé "en dur", j'ai fini par supprimer pas mal de contenu afin de pouvoir l'injecter dynamiquement par le biais de balises `<template>`, rendant tous les éléments disponibles et jouer sur l'affichage ou pas de chacun.

### JS :

J'ai décidé de m'occuper du JavaScript avant de gérer l'esthétique du site, afin de restituer toute la dynamique en premier, selon les itéraions. Aussi j'ai déplacé le fichier JSON dans le dossier Assets. J'y ai également crée un fichier JSON contenant mes variables qui ont servi en SASS et en JS. En effet, plutôt que de proposer un `input` de type `color` à l'utilisateur, je lui propose qu'un nombre restreint de couleurs qui ne sont disponibles qu'en fonction du thème choisi.
Le côté asynchrone de la fonction `fetch` m'a donné quelques palpitations, mais au final tout est rentré dans l'ordre. Ayant encore un peu de temps devant moi, j'ai pris le parti de construire un menu burger pour l'affichage à partir du format tablette. J'ai aussi fait le choix de stocker dans le local Storage toutes les infos, ce qui n'était pas indispensable mais m'a un peu facilité la tache.

#### Script annexe :

Grâce à la documentation MDN j'ai crée un script qui transcrit mon fichier de variables JSON en un partiel pour SASS, centralisant toutes mes variables et permettant un maintien plus facile. Si je veux changer une couleur sur mon site, en enlever ou en rajouter, je modifie le JSON et appelle le Script avec un raccourci `Node.js`

### CSS :

J'ai opté pour la structuration de l'esthétique à l'aide du préprocesseur SASS plutôt que directement en CSS, connaissant déjà cette technologie, qui de toutes façons, recompile le tout, mais apporte un gain de temps non négligeable en temps de production. Aussi, pour le côté responsive, plutôt que de faire de longues media queries, j'ai joué avec la fonction `calc()` sur les `font-size`, et d'une manière plus globale, essayé de structurer le code pour en réécrire le moins possible.
L'avantage est que j'ai pu travailler tout autant sur les tableaux, que les flexbox et les GRID.

## Difficultés :

- Pas mal de soucis à cause de la synchronisation des données dûes à la fonction fetch, ainsi que de l'injection dynamique des données à l'aide des templates, une pratique pour développer l'habitude est nécessaire.
- La gestion des erreurs, avec des `console.log()` plus ou moins toutes les cinq lignes !
- Je me suis pas mal tracassé aussi concernant l'import des variables SASS à manipuler en JS, pour finalement opter pour la solution du JSON. J'ai tenté la voie de l'installation de Webkit qui m'a fait perdre plus de temps qu'autre chose.
- Le CSS/SASS d'une façon générale, que je ne pratique pas assez pour toujours confondre `align-items` et `justify-content`, et centrer les éléments d'une façon générale.
- La gestion des modales aussi m'a posé quelques difficultés, surout la fermeture au clic à l'extérieur de la modale. Mais maintenant que je suis passé outre, si j'ai le temps de revenir sur ce projet, je jouerai avec un `Math.random()` pour afficher au hasard sur l'écran les modales quand on est en écran grande largeur.

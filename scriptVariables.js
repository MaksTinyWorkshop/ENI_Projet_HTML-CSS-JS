const fs = require("fs");
const jsonImporter = require("node-sass-json-importer");

const jsonVariables = require("./assets/variables.json");
let sassVariables = "";

function processObject(obj, prefix = "") {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object") {
      // Si la valeur est un objet, récursivement traiter cet objet
      processObject(value, `${prefix}${key}-`);
    } else {
      // Sinon, créer une variable SASS
      sassVariables += `$${prefix}${key}: ${value};\n`;
    }
  }
}

processObject(jsonVariables);
fs.writeFileSync("./Style/utils/_variables.scss", sassVariables);

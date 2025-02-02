const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

module.exports.registerPartials = function(directory) {
  fs.readdirSync(directory).forEach(file => {
      if (file.endsWith(".hbs")) {
          const partialName = path.parse(file).name; // Get the name without extension
          const partialContent = fs.readFileSync(path.join(directory, file), "utf8");
          Handlebars.registerPartial(partialName, partialContent);
          console.log('Partial registered: ' + partialName);
      }
  });
}

module.exports.getTemplates = function(directory) {
  let files = [];
  fs.readdirSync(directory).forEach(file => {
      const fullPath = path.join(directory, file);
      if (fs.statSync(fullPath).isDirectory()) {
          files = files.concat(getTemplates(fullPath)); // Recursively get files
      } else if (file.endsWith(".hbs")) {
          files.push(fullPath);
      }
  });
  return files;
}

const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");

const templatesDir = "../source";
const partialsDir = "../partials";
const outputDir = "../outputs";

function registerPartials(directory) {
  fs.readdirSync(directory).forEach(file => {
      if (file.endsWith(".hbs")) {
          const partialName = path.parse(file).name; // Get the name without extension
          const partialContent = fs.readFileSync(path.join(directory, file), "utf8");
          Handlebars.registerPartial(partialName, partialContent);
          console.log('Partial registered: ' + partialName);
      }
  });
}

function getTemplates(directory) {
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


registerPartials(partialsDir);

const templates = getTemplates(templatesDir);
for (const templatePath of templates) {
  console.log('Processing template: ' + templatePath);
  const templateSource = fs.readFileSync(templatePath, "utf8");
  const template = Handlebars.compile(templateSource);

  // Define dynamic data for each page (modify as needed)
  const data = {
      title: "Static Page - " + path.parse(templatePath).name,
      content: "This is the content of " + path.relative(templatesDir, templatePath)
  };

  // Generate HTML
  const outputHtml = template(data);

  // Compute output path while preserving subfolder structure
  const relativePath = path.relative(templatesDir, templatePath).replace(/\.hbs$/, ".html");
  const outputFilePath = path.join(outputDir, relativePath);

  // Ensure subdirectories exist in outputs
  fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });

  // Write the output HTML file
  fs.writeFileSync(outputFilePath, outputHtml);
  console.log(`Generated: ${outputFilePath}`);
}

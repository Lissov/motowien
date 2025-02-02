const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const helpers = require("./js/handlebars.js");
const { registerPartials, getTemplates } = require("./js/templating.js");
const { getRelativePathBack } = require("./js/helpers.js");
helpers.registerHelpers();

const templatesDir = path.join("..", "source");
const partialsDir = path.join("..", "partials");
const outputDir = path.join("..", "..");

registerPartials(partialsDir);

const templates = getTemplates(templatesDir);
for (const templatePath of templates) {
  const relativePath = path.relative(templatesDir, templatePath).replace(/\.hbs$/, ".html");

  console.log('Processing template: ' + templatePath);
  const templateSource = fs.readFileSync(templatePath, "utf8");
  const template = Handlebars.compile(templateSource);

  // Define dynamic data for each page (modify as needed)
  const data = {
    context: {
      fileName: relativePath,
      root: getRelativePathBack(relativePath)
    }
  };

  // Generate HTML
  const outputHtml = template(data);

  // Compute output path while preserving subfolder structure
  const outputFilePath = path.join(outputDir, relativePath);

  // Ensure subdirectories exist in outputs
  fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });

  // Write the output HTML file
  fs.writeFileSync(outputFilePath, outputHtml);
  console.log(`Generated: ${outputFilePath}`);
}

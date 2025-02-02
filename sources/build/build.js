const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const helpers = require("./js/handlebars.js");
const { registerPartials, getTemplates, getData, clean } = require("./js/templating.js");
const { getRelativePathBack } = require("./js/helpers.js");
helpers.registerHelpers();

const templatesDir = path.join("..", "source");
const partialsDir = path.join("..", "partials");
const outputDir = path.join("..", "..");

registerPartials(partialsDir);

clean(outputDir);

const templates = getTemplates(templatesDir);
const global = getData(path.join(templatesDir, "global.json"));
for (const templatePath of templates) {
  const relativePath = path.relative(templatesDir, templatePath).replace(/\.hbs$/, ".html");
  var fileName = relativePath.replace(/^.*[\\/]/, '');

  console.log('Processing template: ' + templatePath);
  const templateSource = fs.readFileSync(templatePath, "utf8");
  const template = Handlebars.compile(templateSource);
  const templateData = getData(templatePath);

  // Define dynamic data for each page (modify as needed)
  const data = {
    context: {
      fileName: fileName,
      root: getRelativePathBack(relativePath),
    },
    global: global,
    data: templateData
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

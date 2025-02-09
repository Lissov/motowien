const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const helpers = require("./js/handlebars.js");
const { registerPartials, getTemplates, getData, clean, generate } = require("./js/templating.js");
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
  const data = {
    context: {
      fileName: fileName,
      relativePathDe: relativePath,
      rootDe: getRelativePathBack(relativePath),
    },
    global: global,
    data: templateData
  };

  generate(template, data, outputDir, relativePath, 'de');
  generate(template, data, outputDir, relativePath, 'uk');
}

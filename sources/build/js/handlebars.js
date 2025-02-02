const Handlebars = require("handlebars");

module.exports.registerHelpers = function() {
  Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  });
  Handlebars.registerHelper('ifOr', function(arg1, arg2, options) {
    return (arg1 || arg2) ? options.fn(this) : options.inverse(this);
  });
  Handlebars.registerHelper('ifOr3', function(arg1, arg2, arg3, options) {
    return (arg1 || arg2 || arg3) ? options.fn(this) : options.inverse(this);
  });

  Handlebars.registerHelper('json', function(context) {
    return JSON.parse(context);
});
}
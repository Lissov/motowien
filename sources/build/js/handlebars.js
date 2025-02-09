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

  Handlebars.registerHelper('lang', function(arg1, options) {
    const argC = arg1.toLowerCase() === 'ua' ? 'uk' : arg1.toLowerCase();
    return (argC == this.lang) ? options.fn(this) : (!!options?.inverse ? options.inverse(this) : "");
  });

  Handlebars.registerHelper('link', function(url, options) {
    const l = !!options.hash.lang ? options.hash.lang : this.lang;
    const root = l === 'de' ? this.context.root : this.context.root + l + "\\";
    return root + url;
  });

  Handlebars.registerHelper('json', function(context) {
    return JSON.parse(context);
});
}
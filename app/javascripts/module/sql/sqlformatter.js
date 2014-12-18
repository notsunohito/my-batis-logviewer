var asf = require("../../lib/anbt-sql-formatter.js");
var rule = new asf.anbtSqlFormatter.Rule();
    rule.indentString = " ";
    rule.space_after_comma = true;
var Formatter = new asf.anbtSqlFormatter.Formatter(rule);

module.exports = Formatter;

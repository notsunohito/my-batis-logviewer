var _ = require('underscore');
var asf = require("../../lib/anbt-sql-formatter.js");
var rule = new asf.anbtSqlFormatter.Rule();
      rule.indentString = " ";
      rule.space_after_comma = true;
var anbtSqlFormatter = new asf.anbtSqlFormatter.Formatter(rule);

var SqlFormatter = function() { 

    this.format = function format( unformatted ) {
        var regex =  / IN \([^\)]+\)/;
        var anbtFormatted =  anbtSqlFormatter.format( unformatted );

        if(!regex.test(anbtFormatted)) {
            return anbtFormatted;
        }

        var splitted = splitAtInOperator( anbtFormatted );
        var result = _.map(splitted, function( element ) {
            if(regex.test(element)) {
                return removeCRLF(element);
            }
            return element;
        }).join('');
        return result;
    };

    function splitAtInOperator( anbtFormatted ) {
        var regex =  / IN \([^\)]+\)/g;
        var match = [];
        var result = [];
        var prevMatchedTailIndex = 0;
        var matchedLength = 0;
        while(match = regex.exec( anbtFormatted )) {
            var notMatched = anbtFormatted.substring( prevMatchedTailIndex + matchedLength, match.index);
            prevMatchedTailIndex = match.index;
            matchedLength = match[0].length;
            result.push(notMatched);
            result.push(match[0]);
        }
        return result;
    }

    function removeCRLF( matched ) {
        var result = matched.replace(/\n/g,'');
        result = result.replace(/ +(?=[,\)])/g,'');
        result = result.replace(/ +/g,' ');
        return result;
    }
};

module.exports = new SqlFormatter();

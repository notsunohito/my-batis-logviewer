var _ = require('underscore');
var asf = require("../../lib/anbt-sql-formatter.js");
var rule = new asf.anbtSqlFormatter.Rule();
      rule.indentString = " ";
      rule.space_after_comma = true;
var anbtSqlFormatter = new asf.anbtSqlFormatter.Formatter(rule);

var SqlFormatter = function() { 
    var patternIN = ' IN \\([^\\)]+\\)';

    this.format = function format( unformatted ) {
        var regexIN =  new RegExp( patternIN, 'i');
        var anbtFormatted =  anbtSqlFormatter.format( unformatted );

        if(!regexIN.test(anbtFormatted)) {
            return anbtFormatted;
        }

        var splitted = splitAtInOperator( anbtFormatted );
        var removed = _.map(splitted, function( element ) {
            if(regexIN.test(element)) {
                return removeCRLF(element);
            }
            return element;
        }).join('');
        return removed;
    };

    function splitAtInOperator( anbtFormatted ) {
        var regexIN =  new RegExp( patternIN, 'ig');
        var match = [];
        var result = [];
        var prevMatchedTailIndex = 0;
        var matchedLength = 0;
        while(match = regexIN.exec( anbtFormatted )) {
            var notMatched = anbtFormatted.substring( prevMatchedTailIndex + matchedLength, match.index);
            prevMatchedTailIndex = match.index;
            matchedLength = match[0].length;
            result.push(notMatched);
            result.push(match[0]);
        }
        result.push( anbtFormatted.substring( prevMatchedTailIndex + matchedLength, anbtFormatted.length) );
        return result;
    }

    function removeCRLF( matched ) {
        var result = matched.replace(/\r\n|\r|\n/g,'');
        result = result.replace(/ +(?=[,\)])/g,'');
        result = result.replace(/ +/g,' ');
        return result;
    }
};

module.exports = new SqlFormatter();

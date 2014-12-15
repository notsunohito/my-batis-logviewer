var _ = require('underscore');


var QueryExtractor = function() {
    var self = this,
        queryMark = new RegExp(/(Executing Statement: (?:[\s\S]+?(\r\n?|\n|$)){3})/g);

    this.extract = function( rawContent ) {
        var queries = [],
            threelines = [];

        threelines = this.extract3lines( rawContent )
        
        queries = _.chain( threelines )
            .map( function( threeline ) { 
                return threeline.split(/\r\n?|\n/) })
            // .map( function( threeline ) {
            //     return threeline[0].replace(/^Executing Statement: +|"$/m, '') } )
            // .map( function( threeline ) {
            //     return threeline[1].replace(/^.*Parameters: +|"$/m, '') } )
            // .map( function( threeline ) {
            //     return threeline[2].replace(/^.*Types: : +|"$/m, '') } )
            .value();

        return queries;
    };

    this.extract3lines = function( rawContent ) {
        var queries    = [];
        var match;
        while (match = queryMark.exec(rawContent)) {
            queries.push(match[0]);
        }
        return queries;
    };
};

module.exports = new QueryExtractor();

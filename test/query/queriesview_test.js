var assert = require('assert');
var testdata = require('../testdata/testdata.js');
var QueryExtractor = require('../../app/javascripts/module/log/queryextractor.js');
var QueryView = require('../../app/javascripts/query/queriesview.js');

describe('QueryView', function(){
    describe('#addDisplayProperties( testdata )', function() {
        var testdata = QueryExtractor.extract( testdata );

        it('should return []', function() {
            assert.ok( _.isArray( actual ) );
        });
    });
});

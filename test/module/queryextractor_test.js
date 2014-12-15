var _         = require("underscore");
var assert    = require("assert");
var testdata  = require('../testdata/testdata.js');
var QueryExtractor = require('../../app/javascripts/module/log/queryextractor.js');

describe('QueryExtractor', function(){
    describe('#extract( testdata )', function() {
        var actual = QueryExtractor.extract( testdata );

        it('should return []', function() {
            assert.ok( _.isArray( actual ) );
        });

        it('In this test case, its length is 2', function() {
            assert.equal( actual.length, 2);
        });

        describe('The first query contains', function(){

            var first = actual[0];

            it('statement //=> SELECT ...', function() {                
                assert.strictEqual( statement,  'SELECT id , name FROM users WHERE id IN ( ?, ?, ?, ?)');
            });
            it('params //=> ["001", "002", "003", "004"]', function() {                
                assert.strictEqual( params,["001", "002", "003", "004"]);
            });
        });
    });
});

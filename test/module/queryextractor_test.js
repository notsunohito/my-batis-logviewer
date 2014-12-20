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

        describe('The first elements contains', function(){

            var first = actual[0];

            it('statement //=> SELECT id , name FROM users WHERE id IN ( ?, ?, ?, ?)', function() {                
                assert.strictEqual( first.statement,  'SELECT id , name FROM users WHERE id IN ( ?, ?, ?, ?) AND name IN ( ?, ?)');
            });
            it('params //=> ["001", "002", "003", "004"]', function() {                
                assert.strictEqual( JSON.stringify(first.params), JSON.stringify( ["001", "002", "003", "004", "notsu", "nohito" ] ));
            });
            it('executed //=> "SELECT id , name FROM users WHERE id IN ( \'001\', \'002\', \'003\', \'004\') AND name IN ( \'notsu\', \'nohito\')")', function() {                
                assert.strictEqual( first.executed, 'SELECT id , name FROM users WHERE id IN ( \'001\', \'002\', \'003\', \'004\') AND name IN ( \'notsu\', \'nohito\')' );
            });
        });
    });
});

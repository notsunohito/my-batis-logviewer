var _         = require("underscore");
var assert    = require("assert");
var testdata  = require('../testdata/testdata.js');
var LogParser = require('../../app/javascripts/module/log/logparser.js');

describe('LogParser', function(){
    describe('#parse( testdata )', function() {
        var actual = LogParser.parse( testdata );

        it('should return [ message1, message2..]', function() {
            assert.ok( _.isArray( actual ) );
        });

        it('In this test case, its length is 5', function() {
            assert.equal( actual.length, 5);
        });

        describe('The first message contains', function(){

            var first = actual[0];

            it('names[0] //=> \"テスト はじめ\"', function() {                
                assert.strictEqual( first.names[0], 'テスト はじめ');
            });      
        });

        describe('The second message contains', function(){

            var second = actual[1];

            it('names[0] //=> \"テスト次郎\"', function() {                
                assert.strictEqual( second.names[0], 'テスト次郎');
            });
            it('names[1] //=> \"テスト はじめ\"', function() {                
                assert.strictEqual( second.names[1], 'テスト はじめ');
            });
            it('isRecieved //=> false', function() {                
                assert.strictEqual( second.isRecieved, false);
            });     
        });
    });
});

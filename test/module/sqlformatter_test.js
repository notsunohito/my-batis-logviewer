var assert = require('assert');
var SqlFormatter = require('../../app/javascripts/module/sql/sqlformatter.js');
var usingIn = "SELECT id , name FROM users WHERE id IN ( '001', '002', '003', '004') AND emp_id IN ( '005', '006') ";
var notUsingIn = "SELECT id FROM employee";

describe('SqlFormatter', function(){
    describe('#format( usingIn )', function() {
        var actual = SqlFormatter.format( usingIn );
        var line7 = actual.split(/\r\n|\r|\n/)[6];
        var line8 = actual.split(/\r\n|\r|\n/)[7];

        it("Should return String", function() {
            assert.ok( typeof actual === 'string' );
        });

        it("line7 should equal ' IN ( '001', '002', '003', '004')'", function() {
            assert.strictEqual( line7,  "  id IN ( '001', '002', '003', '004')" );
        });
        it("line8 should  equal '  AND emp_id IN ( '005', '006')''", function() {
            assert.strictEqual( line8,  "  AND emp_id IN ( '005', '006')" );
        });
    });
    describe('#format( notUsingIn )', function() {
        var actual = SqlFormatter.format( notUsingIn );
        it("should equal 'SELECT\\n  id\\n FROM\\n  employee'", function() {
            assert.strictEqual(actual, "SELECT\n  id\n FROM\n  employee");
        });
    });
});

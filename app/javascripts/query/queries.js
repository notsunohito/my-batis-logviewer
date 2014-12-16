var Backbone = require('backbone');
var Query = require('./query.js');

var Queries = Backbone.Collection.extend({
    model: Query
});

module.exports = Queries;

var _        = require('underscore');
var $        = require('jquery');
var Backbone = require('backbone');
var Query    = require('./query.js');
var Queries  = require('./queries.js');

var QueryTemplate = _.template(
    '<tr>' +
        '<td>+</td>' +
        '<td class="executed" class=\'sql\' style="white-space: nowrap;">' +
          //'<pre><code class=\'sql\' style="white-space: nowrap;">' +
            '<%= executed %>' +
          //'</pre></code>' +
        '</td>' +
    '</tr>' +
    '<tr hidden>' +
        '<td></td>' +
        '<td class="formatted">' +
            '<pre><code class=\'sql\'>' +
                '<%= formatted %>' +
            '</pre></code>' +
        '</td>' +
    '</tr>');

var QueryView = Backbone.View.extend({
    tagName: 'tr',
    className: 'query',
    template: QueryTemplate,
    render: function() {
        var template = this.template( this.model.toJSON() );
        this.$el.html( template );
        return this;
    }
});

var QueriesView = Backbone.View.extend({
    tagName: 'table',
    id: 'queries',
    render: function() {
        this.collection.each(function(query) {
            var queryView = new QueryView({ model: query });
            this.$el.append(queryView.render().el);
        }, this);
        return this;
    }
});

module.exports = QueriesView;

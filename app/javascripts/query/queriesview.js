var _        = require('underscore');
var $        = require('jquery');
var Backbone = require('backbone');
var Query    = require('./query.js');
var Queries  = require('./queries.js');

var QueryTemplate = _.template(
      '<div class="executed" class=\'sql\'>' +
        '<%= formatted %>' +
      '</div>' +
      '<div  class="formatted" hidden>' +
        '<pre>'+
          '<code class=\'sql\'>' +
            '<%= formatted %>' +
          '</code>' + 
        '</pre>' +
      '</div>');

var QueryView = Backbone.View.extend({
    tagName: 'li',
    className: 'query',
    template: QueryTemplate,
    render: function() {
        var template = this.template( this.model.toJSON() );
        this.$el.html( template );
        return this;
    }
});

var QueriesView = Backbone.View.extend({
    tagName: 'ul',
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

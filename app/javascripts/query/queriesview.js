var _        = require('underscore');
var $        = require('jquery');
var Backbone = require('backbone');
var hl = require("highlight.js");
var Formatter = require("../module/sql/sqlformatter.js");

var QueryTemplate = _.template(
      '<div class="executed" class=\'sql\'>' +
        '<%= highlighted %>' +
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
        var displayQuery = this.addDisplayProperties( this.model );
        var template = this.template( displayQuery.toJSON() );
        this.el.onclick = function() {  
            this.firstChild.hidden = !this.firstChild.hidden;
            this.lastChild.hidden = !this.lastChild.hidden;
        };
        this.$el.html( template );
        return this;
    },
    addDisplayProperties: function( query ) {
        var executed = query.get("executed");
        var highlighted = hl.highlight('sql', executed ).value;
        var formatted = hl.highlight('sql', Formatter.format( executed ) ).value;
        return query.set({ formatted: formatted, highlighted: highlighted });
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

var _        = require('underscore');
var $        = require('jquery');
var Backbone = require('backbone');
var hl = require("highlight.js");
var Formatter = require("../module/sql/sqlformatter.js");

var QueryTemplate = _.template(
    '<div class="hidden" hidden>' +
        '<%= executed %>' +
    '</div>' +
    '<button type="button" class="toggle-tree">+</button>' +
    '<div class="unformatted" class=\'sql\'>' +
        '<%= highlighted %>' +
    '</div>'
);

var PreTemplate = _.template(
     '<div  class="formatted">' +
        '<pre>'+
          '<code class=\'sql\'>' +
            '<%= formatted %>' +
          '</code>' + 
        '</pre>' +
      '</div>'
);

var QueryView = Backbone.View.extend({
    tagName: 'li',
    className: 'query',
    template: QueryTemplate,
    formatted: false,
    render: function() {
        var displayQuery = this.addDisplayProperties( this.model );
        var template = this.template( displayQuery.toJSON() );
        this.$el.html( template );
        var button = this.$el.children('button')[0];
        
        button.onclick =  this.toggleFormat.bind(this);

        return this;
    },

    toggleFormat:  function() {  
        if(this.formatted) {
            this.unformat();
            this.formatted = false;
            this.$el.children('button')[0].innerText = '+';
        } else {
            this.format();
            this.formatted = true;
            this.$el.children('button')[0].innerText = '-';
        }
    },

    format: function() {
        if( this.$el.children('.formatted')[0] ) {
            this.$el.children('.formatted').show();
            this.$el.children('.unformatted').hide();
            return;
        }
        var executed = this.$el.children('.hidden')[0].innerText;
        var formatted = hl.highlight('sql', Formatter.format( executed ) ).value;
        this.$el.children('.unformatted').hide();
        var textnode = PreTemplate({ formatted: formatted });
        this.$el.append(textnode);    
    },

    unformat: function() {
        this.$el.children('.formatted').hide();
        this.$el.children('.unformatted').show();
    },

    addDisplayProperties: function( query ) {
        var executed = query.get("executed");
        var highlighted = hl.highlight('sql', executed ).value;
        return query.set({  highlighted: highlighted });
    }
});

var QueriesView = Backbone.View.extend({
    tagName: 'ul',
    id: 'queries',
    render: function() {
        var self = this;
        this.collection.each(function(query) {
            var queryView = new QueryView({ model: query });
            setTimeout(function() {
                self.$el.append(queryView.render().el);
            }, 0);
        }, this);
        return this;
    }
});

module.exports = QueriesView;

var _ = require('underscore');
var LogParser = require('./module/log/logparser.js');

var Application = {
    initialize: function() {
        $('#file-input').on('change', this.display);
    },
    display: function( e ) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function( e ) {
            var messages = LogParser.parse( e.target.result  );
            Application.render( messages );
            Application.setJsonToHiddenControlls( messages );
        };
        reader.readAsText( file, 'sjis');
    },
    render: function(messageArr) {
        var messagesModel = _.map(messageArr, function(message) { return new Message(message); });
        var messages = new Messages( messagesModel );
        var messagesView = new MessagesView({collection: messages});
        $('#main').html( messagesView.render().el );
    },
    setJsonToHiddenControlls: function( log ) {
        var messages = log;
        $('#messages-json').html( 
            JSON.stringify( messages )
        );
    }
};

module.exports = Application;

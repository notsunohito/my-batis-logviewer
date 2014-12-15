var _ = require('underscore');


var LogParser = {

    parse: function( rawContent ) {
        var messages = this.createMessages( rawContent );

        return messages;
    },

    createMessages: function ( rawContent ) {
        var self        = this,
            messages    = [],
            rawMessages = rawContent.split(/^={37}$/m);
        messages = _.chain( rawMessages )
            .tail() // 先頭１個目の要素は常に空なので取り除く
            .map( function( rawMessage ) { return self.createMessage( rawMessage ); })
            .value();
        return messages;
    },

    createMessage: function ( rawMessage ) {
        var splited = rawMessage.split(/^-{37}$/m),
            header  = this.createHeader( splited[0] ),
            body    = this.createBody( splited[1] );
        return { messageId: header.messageId,
                 isRecieved: header.isRecieved,
                 names: header.names,
                 date: header.date,
                 body: body };
    },

    createBody: function ( rawBody ) {
        return rawBody;
    },

    createHeader: function ( rawHeader ) {
        var self       = this,
            regexMsgId = /^ MSGID_(\d+)$/,
            regexDate  = /^ {2}at (?:(\w{3}) (\w{3}) (\d{2}) (\d{2}):(\d{2}):(\d{2}) (\d{4}))(?= )/,
            regexFrom  = /^ From: ((?:[ぁ-龥][ 　]?)+)(?= )/,
            regexTo    = /^ To: ((?:[ぁ-龥][ 　]?)+)(?= )/,
            lines      = rawHeader.split(/\r\n|\r|\n/),
            header     = { messageId: "", isRecieved: false, names: [], date: null };
        _.chain( lines )
            .compact()
            .each( function( line )  {
                if( regexMsgId.test( line ) ) this.messageId = regexMsgId.exec( line )[1] ;
                if( regexDate.test( line ) ) this.date = self.createDate( regexDate.exec( line ) );
                if( regexTo.test( line ) ) this.names.push( regexTo.exec( line )[1] );
                if( regexFrom.test( line ) ) { 
                    this.names.push( regexFrom.exec( line )[1] ) ;
                    this.isRecieved = true;
                }
            }, header);
        return header;
    },

    createDate: function ( dateArr ) {
        var year   = dateArr[7],
            month  = this.monthToInt( dateArr[2] ),
            day    = dateArr[3],
            hour   = dateArr[4],
            minute = dateArr[5],
            second = dateArr[6];
        return  new Date( year, month, day, hour, minute, second );
    },

    monthToInt: function (month) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return months.indexOf( month );
    }
};

module.exports = LogParser;

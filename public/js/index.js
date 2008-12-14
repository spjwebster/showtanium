if ( typeof ti === "undefined" ) {
    ti = {
        ready: function( callback ) {
            console.log( 'ready' );
            $( 'document' ).ready( callback );
        },
        App: {
            debug: function( msg ) {
                console.log( msg );
            }
        }
    }
}

ti.ready( function() {

    ti.App.debug( "init" );

    $('#refresh').click(fetchShows);

    fetchShows();    
    
    function fetchShows() {
        $.get( "http://tvrss.net/shows/", null, onFetchShowsSuccess, 'html' );
    }
    
    function onFetchShowsSuccess( data, statusText ) {
        alert( "onFetchShowsSuccess" );
		var showRegExp = new RegExp( '<a href="http://tvrss.net/search/\\?show_name=(.*?)&amp;show_name_exact=true">([^<]+)</a>', 'g' );
        var matches = {};
        
        var showsBody = $( '#shows tbody' );
        
        try {
        var htmlRows = [];
        while( matches = showRegExp.exec( data ) ) {
            var alt = htmlRows.length % 2 === 0 ? 'odd' : 'even';
            htmlRows.push( '<tr class="' + alt + '"><td>' + matches[ 2 ] + '</td><td>&nbsp;</td></tr>' );
        }

        //alert( showsBody.html );
        showsBody.append( htmlRows.join( '' ) );
        } catch ( error ) {
            alert( error );
        }
    }
    
});
/*
 App.js

 Main routine(s) for our Web app
 */

//*****************************************************************************



//Our one global object:
var app = app || {};



//=============================================================================


app.screens = app.screens || {};

//=============================================================================

app.start = function () {
   //app.drawBackgroundCanvas();

    setupResizeHandler( );

    app.showScreen("spinScreen", app.loader.getResourceLoadProgress);


};

//=============================================================================

app.showScreen = function (screenId) {

    var oldScreenDiv = $("#game .screen.active"),
        newScreenDiv = $("#" + screenId),
        newScreen = app.screens[screenId];
    args = Array.prototype.slice.call(arguments, 1);
    app.activeScreen = newScreen;
    if (oldScreenDiv) {
        oldScreenDiv.removeClass("active");
    }
    newScreenDiv.addClass("active");
    newScreen.run.apply(newScreen, args);

};


function setupResizeHandler( )
{
    //.....................................................................

    function handleResize( )
    {
        var maxWidth = 800,
            maxHeight = 550,
            mobile = ($.os && ($.os.phone || $.os.tablet)),
            winWidth = window.innerWidth,
            winHeight = window.innerHeight,
            w, h,
            newDims;

        if ( mobile )
        { //fill screen with a margin for error
            w = winWidth - 4;
            h = winHeight - 4;
        }
        else
        {
            w = Math.min( winWidth - 4, maxWidth );
            h = Math.min( winHeight - 4, maxHeight );
        }
        newDims = { width: w,
            height: h
        };

        $('#game').css( newDims );
        app.spinModel.resizeGame(w,h);
        app.spinView.setUp(app.spinModel);
    }

    //.....................................................................

    $(window).on( 'resize', handleResize );
    $(window).on( 'orientationchange', handleResize );

    handleResize( );
}

//=============================================================================



//*****************************************************************************

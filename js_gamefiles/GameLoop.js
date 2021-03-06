/*
  GameLoop.js

  System to update the game periodically.
  Driven by requestAnimationFrame(), calls supplied function.
*/


//*****************************************************************************


var app = app || {}
app.gameLoop = app.gameLoop || {};


//=============================================================================


app.gameLoop =
    (function()
     {
    //-------------------------------------------------------------------------

         var loopFunction;

    //=========================================================================

         //Polyfill
         window.requestAnimationFrame =
             (function()
              {
                  return window.requestAnimationFrame ||
                      window.webkitRequestAnimationFrame ||
                      window.mozRequestAnimationFrame ||
                      window.oRequestAnimationFrame ||
                      window.msRequestAnimationFrame ||
                      function( callback, element ) {
                          return window.setTimeout(
                              function() {
                                  callback( Date.now() );
                              },
                              1000 / 60 );
                      };
              }
             )();

    //.........................................................................

         //Polyfill
         window.cancelAnimationFrame =
             (function()
              {
                  return window.cancelAnimationFrame ||
                      window.cancelRequestAnimationFrame ||
                      window.webkitCancelAnimationFrame ||
                      window.webkitCancelRequestAnimationFrame ||
                      window.mozCancelAnimationFrame ||
                      window.mozCancelRequestAnimationFrame ||
                      window.oCancelAnimationFrame ||
                      window.oCancelRequestAnimationFrame ||
                      window.msCancelAnimationFrame ||
                      window.msCancelRequestAnimationFrame ||
                      window.clearTimeout;
              }
             )();
         
    //=========================================================================

         function setLoopFunction( func )
         {
             loopFunction = func;
         }
         
    //=========================================================================

         function doLoop( nowMillis )
         {
             if ( typeof loopFunction === "function" )
             {
                 loopFunction( nowMillis / 1000.0 );
             }
             requestAnimationFrame( doLoop );
         }

    //-------------------------------------------------------------------------

         requestAnimationFrame( doLoop ); //Begin looping
         
    //=========================================================================

        return {
            setLoopFunction: setLoopFunction
        };
         
    //-------------------------------------------------------------------------
     }
)();


//*****************************************************************************
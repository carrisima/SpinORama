/*
  GameTime.js

  Time source that can be reset, paused, and resumed.
*/

//*****************************************************************************


var app = app || { };


//=============================================================================


app.gameTime =
    (function()
     {
    //-------------------------------------------------------------------------

         var startTime = getSystemSeconds(),
             pauseTime = 0;
         
    //=========================================================================

         function getSeconds( )
         {
             if ( pauseTime !== 0 )
             {
                 return pauseTime - startTime;
             }
             else
             {
                 return getSystemSeconds() - startTime;
             }
         }

    //=========================================================================

         function reset( )
         {
             startTime = getSystemSeconds();
             if ( pauseTime !== 0 )
             {
                 pauseTime = startTime;
             }
         }

    //=========================================================================

         function pause( )
         {
             if ( pauseTime === 0 )
             {
                 pauseTime = getSystemSeconds();
             }
         }

    //-------------------------------------------------------------------------

         function resume( )
         {
             var now = getSystemSeconds();
             if ( pauseTime !== 0 )
             {
                 startTime += (now - pauseTime);
                 pauseTime = 0;
             }
         }

    //=========================================================================

         function getSystemSeconds( )
         {
             return new Date().getTime() / 1000.0;
         }

    //=========================================================================

        return {
            getSeconds: getSeconds,
            reset: reset,
            pause: pause,
            resume: resume
        };
         
    //-------------------------------------------------------------------------
     }
)();


//*****************************************************************************
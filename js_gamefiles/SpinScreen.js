/*
  SpinScreen.js

  Game module for SpinORama game
*/

//*****************************************************************************



var app = app || { };
app.screens = app.screens || { };



//*****************************************************************************



app.screens[ "spinScreen" ] =
    (function()
     {
    //-------------------------------------------------------------------------

        var model,
            view,
            globalNow,
            currentCursorPos,
            gameCanvas;
         
    //=========================================================================

         function run( )
         {

             model = app.spinModel;
             view = app.spinView;
             view.setUp(model);
             gameCanvas = view.getCanvas();
             setEventHandlers();
             app.gameLoop.setLoopFunction(update);

         }

    //-------------------------------------------------------------------------


         function update() {
             var now = app.gameTime.getSeconds();
             globalNow = now;
             view.update(now);

         }
//-------------------------------------------------------------------------


        function getGameModel() {
            return model;

        }

        //=========================================================================

        function resize( )
        {
            view.resize( );
        }

        //-------------------------------------------------------------------------

         function setEventHandlers() {
             $("#gameSpin").click(
                 function (event) {
                     currentCursorPos = { x: event.clientX, y: event.clientY };
                     view.spinWheel(5,currentCursorPos );

                 }
             );

             $("#hideQAbtn").click(
                 function (event) {
                     $('#qaDiv').slideToggle('slow');
                     $("#answerSpan").html("");

                 }
             );

             $("#checkAnswer").click(
                 function (event) {
                     model.checkAnswer();

                 }
             );



             $(gameCanvas).click(
                 function (event) {
                     currentCursorPos = { x: event.offsetX, y: event.offsetY };
                     view.spinWheel(5,currentCursorPos );

                 }
             );





         }

        //-------------------------------------------------------------------------

         function clearEventHandlers() {

             $("#gameScreen button").off("click");
             $("#gameBoardDiv").off("click");

         }



    //=========================================================================

         return {
             run: run,
             getGameModel: getGameModel,
             resize: resize
 
         };
         
    //-------------------------------------------------------------------------
     }
)();



//*****************************************************************************

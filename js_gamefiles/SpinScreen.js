/*
  SpinScreen.js

  Game module for SpinORama game
*/

//*****************************************************************************



var app = app || { };
app.screens = app.screens || [];



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
                      view.setQuestionTime(false);
                 }
             );

             $("#checkAnswer").click(
                 function (event) {
                     model.checkAnswer();

                 }
             );

             setCanvasEventHandlers();


         }
//-------------------------------------------------------------------------

        //need to reset canvas event on redraw
        function setCanvasEventHandlers() {

            $(gameCanvas).click(
                function (event) {
                    currentCursorPos = { x: event.offsetX, y: event.offsetY };
                    view.spinWheel(5,currentCursorPos );

                }
            );


        }
        //-------------------------------------------------------------------------

        function clearCanvasEventHandlers() {

            $(gameCanvas).off("click");


        }



    //=========================================================================

         return {
             run: run,
             getGameModel: getGameModel
         };
         
    //-------------------------------------------------------------------------
     }
)();



//*****************************************************************************

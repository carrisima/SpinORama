/*
 SpinView.js

 Graphics routines with HTML canvas.
 */

//*****************************************************************************



var app = app || {};
app.spinView = app.spinView || { };

//*****************************************************************************



app.spinView =
    (function () {
        //-------------------------------------------------------------------------

        var canvas,
            ctx,
            canvasTick,
            ctxTick,
            imgSpin,
            imgTicker,
            angVel,
            decayFactor,
            totalSpinAngel,
            isSpinning,
            canvasOffset,
            verticalBump,
            currentAngle,
            wheelOrigin,
            wheelR,
            dim,
            currentSlice,
            settleAngle,
            moveAngle,
            score,
            questionArray,
            model,
            initialSetup = true,
            questionTime,
            highLim,
            lowLim,
            random = false,
            tickerUp = false,
            tickerDown = false,
            sliceArc,
            tickerBumpCtr = 0,
            tickActivateAngle,
            tickerStartY,
            tickerDrawY;



        //=========================================================================

        function setUp(passedModel) {

            //only initialize once
            model = passedModel;
            dim = model.getDimensions();
            if(initialSetup===true)
            {
                verticalBump = 40;
                model.setScore(0);
                score = 0;
                angVel = 0;
                decayFactor = .02;
                totalSpinAngel = 0;
                isSpinning = false;
                questionArray = model.getQuestionArray();
                initialSetup = false;
                questionTime = false;
                sliceArc = 360 / dim.wheelSlices;
                tickActivateAngle = sliceArc;
            } else {
                clearCanvasEventHandlers();
                $('#game canvas').remove( );

            }
            drawCanvas();
            move(currentAngle);
            setCanvasEventHandlers();

        }
//-------------------------------------------------------------------------
        function drawCanvas()
        {

            var boardDiv = $("#game");


            //canvas for gameplay
            canvas = $("<canvas />")[0];
            $(canvas).prop("id", "wheelCanvas");
            ctx = canvas.getContext("2d");
            $(canvas).css({"background-color":"8a2be2", "z-index": "5"});
            canvas.width = dim.canvasWidth;
            canvas.height = dim.canvasHeight + verticalBump;
            wheelR = dim.wheelR,
            scaledFont = dim.startFontSize * dim.gameScale;

            $(canvas).appendTo(boardDiv);
            canvasOffset = $(canvas).offset();
            wheelOrigin = {
                x: canvas.width/2,
                y: canvas.height/2
            };

            //canvas for ticker
            canvasTick = $("<canvas />")[0];
            $(canvasTick).prop("id", "tickCanvas");
            ctxTick = canvasTick.getContext("2d");
            $(canvasTick).css({ "z-index": "15", "position": "fixed", "top": canvasOffset.top, "left": canvasOffset.left });
            canvasTick.width = dim.canvasWidth;
            canvasTick.height = (dim.tickerH * dim.gameScale);
            $(canvasTick).appendTo(boardDiv);

            $('#qaDiv').css("font-size", scaledFont + "px","width", canvas.width *.7, "height", canvas.height *.5);
            $("td").css("font-size", scaledFont + "px");


            imgSpin = new Image();
         
            $(imgSpin).load(function(){
                ctx.drawImage(imgSpin, 0, verticalBump, 2 * wheelR, 2 * wheelR);
            }).attr("src", "images/Wheel_of_Fortune.png");
            
            imgTicker = new Image();
            imgTicker.src = "images/ticker_trans_sm.png";
            ctxTick.drawImage(imgTicker, wheelOrigin.x - (.5 * dim.tickerW * dim.gameScale), 0, dim.gameScale * dim.tickerW, dim.gameScale * dim.tickerH);
         
        }
        //-------------------------------------------------------------------------

        //need to reset canvas event on redraw
        function setCanvasEventHandlers() {
            var currentCursorPos;
            $(canvas).click(
                function (event) {
                    currentCursorPos = { x: event.offsetX, y: event.offsetY };
                    spinWheel(5,currentCursorPos );

                }
            );


        }
        //-------------------------------------------------------------------------

        function clearCanvasEventHandlers() {

            $(canvas).off("click");


        }

        //-------------------------------------------------------------------------
        function getCanvas()
        {
            return canvas;
        }
        //-------------------------------------------------------------------------
        function setQuestionTime(quesValue)
        {
            questionTime = quesValue;
        }

        //-------------------------------------------------------------------------
        function setAngVel(angularVelocity)
        {
            angVel = angularVelocity;
        }
        //-------------------------------------------------------------------------

        function spinWheel(angle, pos)
        {
           if(wheelClicked(pos) && !questionTime){
                isSpinning = true;
                angVel = angle;
                questionTime = true;
           }
        }

        //-------------------------------------------------------------------------

        function wheelClicked(pos)
        {
            //use our old from Pythagoras to determine if click was within wheel
            if( ((wheelOrigin.x - pos.x)*(wheelOrigin.x - pos.x)) + ( (wheelOrigin.y - pos.y)*(wheelOrigin.y - pos.y))  <= (wheelR*wheelR))
            {
                return true;
            }
            else return false;


        }
        //-------------------------------------------------------------------------
        function spin(angle) {

            var floorAngle,
                floorNormal;

            angVel -= decayFactor;
            totalSpinAngel += angVel;
           

            if (angVel < 0)
            {
                angVel=0;
                isSpinning = false;

                currentAngle = normalizeAngle(totalSpinAngel);
                currentSlice = whatSlice(currentAngle);
                tickActivateAngle = normalizeAngle(tickActivateAngle);
                centerSlice();
                showQuestions(currentSlice);
                

            }

            move(angVel);

        }
        //-------------------------------------------------------------------------
       //move the wheel a discrete degree value
        function move(angle) {

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            ctx.translate(wheelR, wheelR + verticalBump);
            ctx.rotate(angle * Math.PI / 180);
            ctx.translate(-wheelR, -wheelR - verticalBump);

            ctx.drawImage(imgSpin, 0, verticalBump, 2 * wheelR, 2 * wheelR);
            
          
        }
        //-------------------------------------------------------------------------

        function update(){
            
            if(isSpinning){
                spin(angVel);
            }

            drawTicker();

        }


        //-------------------------------------------------------------------------

        function drawTicker() {
            if (isSpinning && (totalSpinAngel > tickActivateAngle)) {
                tickerUp = true;
                tickerBumpCtr = 0;
                console.log("ping: " + tickActivateAngle);
                tickActivateAngle += sliceArc;
            }
            if (tickerBumpCtr) {
                tickerDrawY += 1;
                tickerBumpCtr += 1;
            }
           

            ctxTick.drawImage(imgTicker, wheelOrigin.x - (.5 * dim.tickerW * dim.gameScale), 0, dim.gameScale * dim.tickerW, dim.gameScale * dim.tickerH);
        }//-------------------------------------------------------------------------

        

        function showQuestions(questionNum){
            var currentQuestion,
                qaHTML,
                qScore,
                checkAnswerBtn = $("#checkAnswer");

            currentQuestion = questionArray[questionNum];
            model.setCurrentQuestionNum(questionNum);
            qScore = currentQuestion.value;
            score = model.getScore();
            checkAnswerBtn.removeClass();
            checkAnswerBtn.addClass("btn");

            checkAnswerBtn.prop("disabled", false);
            if(qScore > 0) {
                qaHTML = "<table id='tblQA'>" +


                    "<tr><td width=5 rowspan=5>&nbsp;</td>" +
                    "<td>" + currentQuestion.question + "<br>" +
                    "<form action='http://radiohead'>" +
                        "<input type='radio' name='answers' value='1'</input>" + currentQuestion.answer1 + "<br/>" +
                        "<input type='radio' name='answers' value='2'</input>" + currentQuestion.answer2 + "<br/>" +
                        "<input type='radio' name='answers' value='3'</input>" + currentQuestion.answer3 + "<br/>" +
                    "</form> </table>";

            }
            else if (qScore === -2)
            {
                qaHTML = "<br/><div class='bankrupt'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You Are BANKRUPT!!!!</div>" +
                         "<br/>";
                score = 0;
                model.setScore(0);
                checkAnswerBtn.prop("disabled", true);
                checkAnswerBtn.removeClass();
                checkAnswerBtn.addClass("btnhov");


            }
            else if (qScore === -1){
                qaHTML = "<br/><div class='bankrupt'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Darn, you lost a turn</div>" +
                    "<br/>";
                checkAnswerBtn.prop("disabled", true);
                checkAnswerBtn.removeClass();
                checkAnswerBtn.addClass("btnhov");
            }

            $("#qaSpan").html(qaHTML);
            $("#scoreSpan").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score: "+ score);
            $('#qaDiv').slideToggle('slow', function() {
            // Animation complete.


            });
        }
//-------------------------------------------------------------------------

        function normalizeAngle(angle){

            while(angle > 360){
                angle -=360;
            }
            return angle;
        }

        //-------------------------------------------------------------------------
        //determine on what slice the wheel stopped, and then center the pin in the slice
        function whatSlice(thisAngle) {

            var degPerSlice = 360 / dim.wheelSlices;

            for (var i=0; i < dim.wheelSlices; i++) {
                lowLim = (i * degPerSlice) - dim.sliceOffset;
                highLim = lowLim + degPerSlice;
                settleAngle = lowLim + dim.sliceOffset;
                moveAngle = settleAngle - thisAngle;
                
                if((thisAngle >= lowLim) && (thisAngle < highLim))
                {   
                    return i;
                }
            }

            return -1;
        }
        
        //-------------------------------------------------------------------------

        function centerSlice() {
 
          
            
            move(moveAngle);
            currentAngle = settleAngle;
            totalSpinAngel = currentAngle;

        }



        return {
            setUp: setUp,
            spin : spin,
            update: update,
            getCanvas: getCanvas,
            setAngVel: setAngVel,
            spinWheel:spinWheel,
            drawCanvas: drawCanvas,
            setQuestionTime: setQuestionTime,
            move: move
        };

        //-------------------------------------------------------------------------
    }
 )();



//*****************************************************************************

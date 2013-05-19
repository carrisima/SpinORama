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
            imgSpin,
            angVel,
            decayFactor,
            totalSpinAngel,
            isSpinning,
            canvasTopBump = 40,
            canvasOffset,
            currentAngle,
            wheelOrigin,
            wheelR,
            dim,
            currentSlice,
            settleAngle,
            moveAngle,
            score,
            questionArray,
            model;



        //=========================================================================

        function setUp(passedModel) {

            model = passedModel;
            model.setScore(0);
            score = 0;
            angVel = 0;
            decayFactor = .02;
            totalSpinAngel = 0;
            isSpinning = false;
            dim = model.getDimensions();

            questionArray = model.getQuestionArray();

            //canvas for gameplay
            canvas = $("<canvas />")[0];
            $(canvas).css("background-color","#8a2be2");
            drawCanvas();

        }
//-------------------------------------------------------------------------
        function drawCanvas()
        {

            var boardDiv = $("#game");
            ctx = canvas.getContext("2d");
            canvas.width = dim.canvasWidth;
            canvas.height = dim.canvasHeight + canvasTopBump;
            wheelR = dim.wheelR;

            $(canvas).appendTo(boardDiv);
            canvasOffset = $(canvas).offset();
            wheelOrigin = {
                x: canvas.width/2,
                y: canvas.height/2 + canvasTopBump/2
            };


            imgSpin = new Image();

            $(imgSpin).load(function(){

                ctx.drawImage(imgSpin, 0, canvasTopBump, 2*wheelR, 2*wheelR);
            }).attr("src","images/Wheel_of_Fortune.png");
        }
        //-------------------------------------------------------------------------
        function getCanvas()
        {
            return canvas;
      }
        //-------------------------------------------------------------------------
        function setAngVel(angularVelocity)
        {
            angVel = angularVelocity;
        }
        //-------------------------------------------------------------------------

        function spinWheel(angle, pos)
        {
           if(wheelClicked(pos)){
                isSpinning = true;
                angVel = angle;
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


            angVel -= decayFactor;
            totalSpinAngel += angVel;
            if (angVel < 0)
            {
                angVel=0;
                isSpinning = false;
                currentAngle = normalizeAngle(totalSpinAngel);
                currentSlice = whatSlice();
                showQuestions(currentSlice);

            }

            move(angVel);

        }
        //-------------------------------------------------------------------------
       //move the wheel a discrete degree value
        function move(angle) {

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.translate(wheelR,wheelR + canvasTopBump);
            ctx.rotate(angle * Math.PI / 180);
            ctx.translate(-wheelR,-wheelR - canvasTopBump);

            ctx.drawImage( imgSpin, 0, 0 + canvasTopBump,2*wheelR, 2*wheelR );
        }
        //-------------------------------------------------------------------------

        function update(){
            //console.log(arguments);
            if(isSpinning){
                spin(angVel);
            }

        }

        //-------------------------------------------------------------------------

        function showQuestions(questionNum){
            var currentQuestion,
                qaHTML,
                qScore;

            currentQuestion = questionArray[questionNum];
            model.setCurrentQuestionNum(questionNum);
            qScore = currentQuestion.value;
            score = model.getScore();
            $("#checkAnswer").prop("disabled", false);
            if(qScore > 0) {
                qaHTML = "<table id='tblQA' width='70%'>" +


                    "<tr><td width=5 rowspan=5>&nbsp;</td>" +
                    "<td>" +
                    "Question: " + currentQuestion.question + "<br>" +
                    "<form action='http://radiohead'>" +
                        "<input type='radio' name='answers' value='1'</input>" + currentQuestion.answer1 + "<br/>" +
                        "<input type='radio' name='answers' value='2'</input>" + currentQuestion.answer2 + "<br/>" +
                        "<input type='radio' name='answers' value='3'</input>" + currentQuestion.answer3 + "<br/>" +
                    "</form>" + "<br>" +

                    "color: " + currentQuestion.questionColor + "<br>" +
                    "value: " + qScore + "<br>" +
                    "</table>";

            }
            else if (qScore === -2)
            {
                qaHTML = "<br/><div class='bankrupt'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You Are BANKRUPT!!!!</div>" +
                         "<br/>";
                score = 0;
                model.setScore(0);
                $("#checkAnswer").prop("disabled", true);

            }
            else if (qScore === -1){
                qaHTML = "<br/><div class='bankrupt'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Darn, you lost a turn</div>" +
                    "<br/>";
                $("#checkAnswer").prop("disabled", true);

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
        function whatSlice() {

            var degPerSlice = 360/dim.wheelSlices,
                lowLim,
                highLim;

            for (var i=0; i < dim.wheelSlices; i++) {
                lowLim = (i*degPerSlice) - dim.sliceOffset;
                highLim = lowLim + degPerSlice;
                settleAngle = lowLim + (degPerSlice/2);
                moveAngle = currentAngle - settleAngle;
                if((currentAngle >= lowLim) && (currentAngle < highLim))
                {
                    return i;
                }
            }

            return -1;
        }

        //-------------------------------------------------------------------------

        function centerSlice(moveAngle) {


            if(moveAngle > 0){
                move (-moveAngle);
            } else{
                move (moveAngle);
            }


            currentAngle = settleAngle;
        }



        return {
            setUp: setUp,
            spin : spin,
            update: update,
            getCanvas: getCanvas,
            setAngVel: setAngVel,
            spinWheel:spinWheel
        };

        //-------------------------------------------------------------------------
    }
 )();



//*****************************************************************************

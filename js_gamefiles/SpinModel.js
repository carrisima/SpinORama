/*
 SpinModel.js

 About screen for the game.
 */



//*****************************************************************************



//Global objects:
var app = app || {};
app.spinModel = app.spinModel || { };

//=============================================================================

//Global vars

app.spinModel =
    (function () {
        //-------------------------------------------------------------------------
        //Private variables

        var gameover,
            startGameWidth = 513,
            gameBoardWidth = 513,
            gameBoardHeight = 513,
            canvasWidth = 513,
            canvasHeight = 513,
            wheelR = 256,
            wheelSlices = 24,
            sliceOffset = 7.5,
            questionArray,
            currentQuestionNum,
            score,
            gameScale = 1,
            startFontSize = 20,
            tickerW = 20,
            tickerH = 53;

        //-------------------------------------------------------------------------


        function getDimensions() {

            return {
                canvasWidth: canvasWidth,
                canvasHeight: canvasHeight,
                gameBoardWidth: gameBoardWidth,
                gameBoardHeight: gameBoardHeight,
                wheelSlices: wheelSlices,
                wheelR: wheelR,
                sliceOffset: sliceOffset,
                gameScale: gameScale,
                startFontSize: startFontSize,
                tickerW: tickerW,
                tickerH: tickerH
            };
        }
//-------------------------------------------------------------------------


        function resizeGame(gameWidth, gameHeight) {

            gameScale = gameWidth/startGameWidth;
            if (gameWidth <= gameHeight){
                canvasWidth = .95*gameWidth;
                canvasHeight = .95*gameWidth;
            } else {
                canvasWidth = .95*gameHeight-100;
                canvasHeight = .95*gameHeight-100;
            }
            gameBoardWidth = gameWidth;
            gameBoardHeight = gameHeight;

            wheelR = canvasWidth/2;

            return getDimensions();

        }
        //-------------------------------------------------------------------------


        function getQuestionArray() {

            return questionArray;
        }

        //-------------------------------------------------------------------------


        function setQuestionArray(questions) {

            questionArray = questions;
        }
        //-------------------------------------------------------------------------


        function getScore() {

            return score;
        }

        //-------------------------------------------------------------------------


        function setScore(passedScore) {

            score = passedScore;
        }


        //-------------------------------------------------------------------------


        function setCurrentQuestionNum(questionNum) {

            currentQuestionNum = questionNum;
        }

        //-------------------------------------------------------------------------

        function getGameOver() {

            return gameover;
        }


        //-------------------------------------------------------------------------

        function setGameOver(isGameOver) {

            gameover = isGameOver;
        }



        //=========================================================================
        //Private Methods

        //-------------------------------------------------------------------------

        function checkAnswer() {
            var checkedAnswer = $("input:checked").val(),
                currentQuestion,
                correctAnswer,
                correctAnsValue,
                aHTML,
                qScore;

            currentQuestion = questionArray[currentQuestionNum];
            correctAnswer = currentQuestion.correctAnswer;
            qScore = parseInt(currentQuestion.value);
             if(checkedAnswer){
                 if(parseInt(checkedAnswer) === parseInt(correctAnswer))
                 {
                     aHTML = "Correct!";
                     score += qScore;
                     $("#scoreSpan").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Score: "+ score);
                 } else {
                     if (correctAnswer === 1){
                         correctAnsValue = currentQuestion.answer1;
                     } else if (correctAnswer === 2) {
                         correctAnsValue = currentQuestion.answer2;
                     } else if (correctAnswer === 3) {
                         correctAnsValue = currentQuestion.answer3;
                     }
                     aHTML = "Sorry, the correct answer is " + correctAnsValue;
                 }
                 $("#checkAnswer").prop("disabled", true);
             } else {
                 aHTML = "Please select an answer";
             }
            $("#answerSpan").html(aHTML);


        }
        //-------------------------------------------------------------------------


        function setUp(mode) {


            gameover = false;

        }



        //-------------------------------------------------------------------------
        function isGameOver() {

            return false;

        }
        //=========================================================================
        //Public API


        return {
            setUp: setUp,
            getDimensions: getDimensions,
            getGameOver: getGameOver,
            setGameOver: setGameOver,
            isGameOver: isGameOver,
            getQuestionArray: getQuestionArray,
            setQuestionArray: setQuestionArray,
            getScore: getScore,
            setScore: setScore,
            checkAnswer: checkAnswer,
            setCurrentQuestionNum: setCurrentQuestionNum,
            resizeGame: resizeGame

        };

        //-------------------------------------------------------------------------
    }
        )();



//*****************************************************************************

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
            gameBoardWidth = 513,
            gameBoardHeight = 513,
            canvasWidth = 513,
            canvasHeight = 513,
            wheelR = 256,
            wheelSlices = 24,
            sliceOffset = 7.5,
            questionArray,
            currentQuestionNum;

        //-------------------------------------------------------------------------


        function getDimensions() {

            return {canvasWidth: canvasWidth,
                canvasHeight: canvasHeight,
                gameBoardWidth: gameBoardWidth,
                gameBoardHeight: gameBoardHeight,
                wheelSlices: wheelSlices,
                wheelR: wheelR,
                sliceOffset: sliceOffset
            };
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


        function currentQuestionNum(questionNum) {

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
                aHTML;

            currentQuestion = questionArray[currentQuestionNum];
            correctAnswer = currentQuestion.correctAnswer;
             if(checkedAnswer){
                 if(parseInt(checkedAnswer) === parseInt(correctAnswer))
                 {
                     aHTML = "Correct!";
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
            checkAnswer: checkAnswer,
            currentQuestionNum: currentQuestionNum

        };

        //-------------------------------------------------------------------------
    }
        )();



//*****************************************************************************

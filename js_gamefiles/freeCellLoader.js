/*
 Loader.js

 Manages loading of scripts and resources.
 */

//*****************************************************************************

//Our one global object:
var app = app || { };

//*****************************************************************************

app.loader =
    (function () {
        //-------------------------------------------------------------------------
        var numResourcesToLoad = 0,
            numResourcesLoaded = 0,
            globalResourceList;

        function run() {
            var resourceList = listResources(),
                imgList = [];

            setResourcePrefix();
            numResourcesToLoad = resourceList.length;
            numResourcesLoaded = 0;


            Modernizr.load(
                [
                    {
                        test: navigator.appName.match(/Explorer/),
                        yep: "../javascript/jquery.min.js",
                        nope: "../javascript/zepto.min.js"
                    },

                    {
                        load: [
                            "App.js",
                            "SplashScreen.js",
                            "MainMenu.js",
                            "SpinScreen.js",
                            "SettingsScreen.js",
                            "AboutScreen.js",
                            "ExitScreen.js",
                            "CanvasGraphics.js",
                            "BackgroundCanvas.js",
                            "PlayingCards.js",
                            "FreeCellModel.js",
                            "FreeCellCanvasView.js",
                            "GameLoop.js",
                            "GameTime.js",
                            "Vector.js",
                            "Audio.js",
                            "FreeCellAudio.js",
                            "Storage.js"
                        ],
                        complete: function () {

                            app.start();
                        }
                    },


                    {
                        load: resourceList,
                        callback: function (url, result, key) {
                            ++numResourcesLoaded;
                        },
                        complete: function () {
                            numResourcesLoaded = numResourcesToLoad = 0;
                            globalResourceList = resourceList;
                        }
                    }

                ]
            );
        }
        //--------------------------------------------------------------------------------

        function getResourceList() {
            return globalResourceList;
        }

        //--------------------------------------------------------------------------------

        function setResourcePrefix() {
            yepnope.addPrefix(
                "resource",
                function (resourceObj) {
                    resourceObj.noexec = true;
                    return resourceObj;
                }
            );
        }

        //--------------------------------------------------------------------------------

        function getResourceLoadProgress() {
            return numResourcesLoaded / numResourcesToLoad;
        }



        //--------------------------------------------------------------------------------

        function getCardImageURL(card) {
            var cardDeets = app.playingCards.getCardDetails(card);

            return "images/cards/" + cardDeets.cardValueChar + cardDeets.cardSuitChar + ".png";
        }
        //--------------------------------------------------------------------------------
        function getResourceUrl(name) {
            switch (name) {
                case "AD":
                    return "images/cards/AD.png";
                case "AS":
                    return "images/cards/AS.png";
                case "AH":
                    return "images/cards/AH.png";
                case "AC":
                    return "images/cards/AC.png";
                case "2D":
                    return "images/cards/2D.png";
                case "2S":
                    return "images/cards/2S.png";
                case "2H":
                    return "images/cards/2H.png";
                case "2C":
                    return "images/cards/2C.png";
                case "3D":
                    return "images/cards/3D.png";
                case "3S":
                    return "images/cards/3S.png";
                case "3H":
                    return "images/cards/3H.png";
                case "3C":
                    return "images/cards/3C.png";
                case "4D":
                    return "images/cards/4D.png";
                case "4S":
                    return "images/cards/4S.png";
                case "4H":
                    return "images/cards/4H.png";
                case "4C":
                    return "images/cards/4C.png";
                case "5D":
                    return "images/cards/5D.png";
                case "5S":
                    return "images/cards/5S.png";
                case "5H":
                    return "images/cards/5H.png";
                case "5C":
                    return "images/cards/5C.png";
                case "6D":
                    return "images/cards/6D.png";
                case "6S":
                    return "images/cards/6S.png";
                case "6H":
                    return "images/cards/6H.png";
                case "6C":
                    return "images/cards/6C.png";
                case "7D":
                    return "images/cards/7D.png";
                case "7S":
                    return "images/cards/7S.png";
                case "7H":
                    return "images/cards/7H.png";
                case "7C":
                    return "images/cards/7C.png";
                case "8D":
                    return "images/cards/8D.png";
                case "8S":
                    return "images/cards/8S.png";
                case "8H":
                    return "images/cards/8H.png";
                case "8C":
                    return "images/cards/8C.png";
                case "9D":
                    return "images/cards/9D.png";
                case "9S":
                    return "images/cards/9S.png";
                case "9H":
                    return "images/cards/9H.png";
                case "9C":
                    return "images/cards/9C.png";
                case "10D":
                    return "images/cards/10D.png";
                case "10S":
                    return "images/cards/10S.png";
                case "10H":
                    return "images/cards/10H.png";
                case "10C":
                    return "images/cards/10C.png";
                case "JD":
                    return "images/cards/JD.png";
                case "JS":
                    return "images/cards/JS.png";
                case "JH":
                    return "images/cards/JH.png";
                case "JC":
                    return "images/cards/JC.png";
                case "QD":
                    return "images/cards/QD.png";
                case "QS":
                    return "images/cards/QS.png";
                case "QH":
                    return "images/cards/QH.png";
                case "QC":
                    return "images/cards/QC.png";
                case "KD":
                    return "images/cards/KD.png";
                case "KS":
                    return "images/cards/KS.png";
                case "KH":
                    return "images/cards/KH.png";
                case "KC":
                    return "images/cards/KC.png";
                default:
                    return null;
            }
        }

        //-------------------------------------------------------------------------

        function listResources() {
            var resources = [],
                i, lim, cardURL, cardName;

            resources = resources.concat(listFreeCellResources());
            for (i = 0, lim = resources.length; i < lim; ++i) {

                resources[i] = "resource!" + resources[i];

            }
            return resources;
        }

        //-------------------------------------------------------------------------

        function listFreeCellResources() {
            return [getResourceUrl("AD"),
                getResourceUrl("AS"),
                getResourceUrl("AH"),
                getResourceUrl("AC"),
                getResourceUrl("2D"),
                getResourceUrl("2S"),
                getResourceUrl("2H"),
                getResourceUrl("2C"),
                getResourceUrl("3D"),
                getResourceUrl("3S"),
                getResourceUrl("3H"),
                getResourceUrl("3C"),
                getResourceUrl("4D"),
                getResourceUrl("4S"),
                getResourceUrl("4H"),
                getResourceUrl("4C"),
                getResourceUrl("5D"),
                getResourceUrl("5S"),
                getResourceUrl("5H"),
                getResourceUrl("5C"),
                getResourceUrl("6D"),
                getResourceUrl("6S"),
                getResourceUrl("6H"),
                getResourceUrl("6C"),
                getResourceUrl("7D"),
                getResourceUrl("7S"),
                getResourceUrl("7H"),
                getResourceUrl("7C"),
                getResourceUrl("8D"),
                getResourceUrl("8S"),
                getResourceUrl("8H"),
                getResourceUrl("8C"),
                getResourceUrl("9D"),
                getResourceUrl("9S"),
                getResourceUrl("9H"),
                getResourceUrl("9C"),
                getResourceUrl("10D"),
                getResourceUrl("10S"),
                getResourceUrl("10H"),
                getResourceUrl("10C"),
                getResourceUrl("JD"),
                getResourceUrl("JS"),
                getResourceUrl("JH"),
                getResourceUrl("JC"),
                getResourceUrl("QD"),
                getResourceUrl("QS"),
                getResourceUrl("QH"),
                getResourceUrl("QC"),
                getResourceUrl("KD"),
                getResourceUrl("KS"),
                getResourceUrl("KH"),
                getResourceUrl("KC")


            ];
        }


        //=========================================================================

        return {
            run: run,
            getResourceLoadProgress: getResourceLoadProgress,
            getCardImageURL: getCardImageURL,
            getResourceList: getResourceList,
            getResourceUrl: getResourceUrl

        };

        //-------------------------------------------------------------------------
    }
        )();

//*****************************************************************************

app.loader.run( );

//*****************************************************************************

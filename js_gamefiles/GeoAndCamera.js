/*
 GeoAndCamera.js

Functions to enable geo location and the camera
 */


//*****************************************************************************


var app = app || {}
app.geoAndCamera = app.geoAndCamera || {};


//=============================================================================


app.geoAndCamera =
    (function()
    {
        //-------------------------------------------------------------------------
        //function vars

        var map = null,
            marker = null,
            watchID,
            watchID2;

        //=========================================================================

        //Get Location coordinates
        function logPosition(position) {
            $("#latitude").html(position.coords.latitude);
            $("#longitude").html(position.coords.longitude);
        }
        //-------------------------------------------------------------------------
       //error message will display
        function positionError(error) {
            $("#longitude").prepend("Ooops, can't get your location right now.  This seems to " +
                "be the issue: " + error);
        }
        //-------------------------------------------------------------------------
        //Continually update lat and long for 30s
        function watchLatLong(){

                watchID = navigator.geolocation.watchPosition(logPosition,positionError,{
                enableHighAccuracy: true
            });

            setTimeout(function(){
                navigator.geolocation.clearWatch(watchID)}, 30000);

        }

        //-------------------------------------------------------------------------
        //Update lat and long once
        function updateLatLong(){

            navigator.geolocation.getCurrentPosition(logPosition,positionError);

        }



        //=========================================================================

        return {
            watchLatLong: watchLatLong,
            updateLatLong:updateLatLong

        };

        //-------------------------------------------------------------------------
    }
        )();


//*****************************************************************************
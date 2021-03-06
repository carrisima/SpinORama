/*
  BackgroundCanvas.js

  About screen for the game.
*/

//*****************************************************************************



var app = app || { };


//*****************************************************************************

app.drawBackgroundCanvas = function(){

      var canvas = $("<canvas />")[0],
	  	  ctx = canvas.getContext("2d"),
		  boardDiv = $("#backgroundDiv"),
          globalAlpha = .1,
      //teal, yellow, pink, mauve, magenta
          colors = ['#00B6CF', '#FFCC33', '#FF2659', '#D10031', '#990024'],
		  cirX, cirY, cirR, cirDiff, color1, color2;
		  
      
	  canvas.width = boardDiv.width();
	  canvas.height = boardDiv.height();
	  $(canvas).appendTo( boardDiv );
	  
	  
	  //create background of random sized and placed circles, colored with a selection of colors
	  for(var i=0;i<=40;i++){
	      cirR = app.getRandom(80, 150);
		  cirX = app.getRandom(0, canvas.width + cirR);
		  cirY = app.getRandom(0, canvas.height + cirR);
		  color1 = app.getRandom(0, 5, -1);
		  ctx.globalAlpha = globalAlpha;
		  ctx.fillStyle = colors[color1];
		  app.graphics.setContext(ctx);
		  app.graphics.fillCircle(cirX, cirY, cirR);
		  color2 = color1;
		  color1 = app.getRandom(0, 5, color2);
		  ctx.fillStyle = colors[color1];
		  app.graphics.setContext(ctx);
		  app.graphics.fillCircle(cirX, cirY, (cirR - 5) );
		  color2 = color1;
		  color1 = app.getRandom(0, 5);
		  
		  ctx.fillStyle = colors[color1];
		  app.graphics.setContext(ctx);
		  app.graphics.fillCircle(cirX, cirY, (cirR - (0.33*cirR)));
      }
	  
	
	  
}
//returns a random number where M <= rand < N that is not equal to startNum
app.getRandom = function (M, N, startNum){

	var randNum;
	randNum = Math.floor( Math.random() * (N - M) ) + M;
	//make sure we get a number that is different from start number
	while (randNum  === startNum)
	{
	    randNum = Math.floor( Math.random() * (N - M) ) + M;
	}
	return randNum;
}

//*****************************************************************************

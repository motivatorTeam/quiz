(function(){

	if(!localStorage.bestTime || localStorage.bestTime === 0 || isNaN(localStorage.bestTime)){
		localStorage.bestTime = (0.000).toFixed(3);
	} else {$('.best-time').html(localStorage.bestTime);}

	var canvas  = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');
	var timeStart = new Date();
	var seconds = 0.00;
	var startInterval;

	function timerStart(){
		timer = new Date();
	}

	var dx= 5,   dx2= 4,    dx3= 4,   dx4= 5,	
		dy= 5,   dy2= 4,    dy3= 4,   dy4= 5,
		 y= 20,   y2= 329,   y3= 340,  y4= 50,
		 x= 30,   x2= 30,    x3= 350,  x4= 340;

	$(document).ready(function() {	
		var width = canvas.width;
		var height = canvas.height;
		var trickster = {
				x: width / 2,
				y: height / 2,
				radius: 30,
				working: false,
				tricking:false
			};
		var offset = {};

		function draw() {

			context.clearRect(0,0,400,400);
			context.beginPath();
			context.fillStyle="#0000ff";
			context.rect(x,y,70,30);
			context.closePath();
			context.fill();
			if( x < 0 || x + 70 > 400)dx=-dx;				
			if( y < 0 || y + 30 > 400)dy=-dy;
			x+=dx;
			y+=dy;

			context.beginPath();
			context.fillStyle="#0000ff";
			context.rect(x2,y2,30,70);
			context.closePath();
			context.fill();
			if( x2 < 0 || x2 + 30 >400)dx2=-dx2;
			if( y2 < 0 || y2 + 70 >400)dy2=-dy2;
			x2+=dx2;
			y2+=dy2;

			context.beginPath();
			context.fillStyle="#0000ff";
			context.rect(x3,y3,50,40);
			context.closePath();
			context.fill();
			if( x3 < 0 || x3 + 50 >400)dx3=-dx3;
			if( y3 < 0 || y3 + 40 >400)dy3=-dy3;
			x3+=dx3;
			y3+=dy3;

			context.beginPath();
			context.fillStyle="#0000ff";
			context.rect(x4,y4,50,60);
			context.closePath();
			context.fill();
			if( x4 < 0 || x4 + 50>400)dx4=-dx4;
			if( y4 < 0 || y4 + 60>400)dy4=-dy4;
			x4+=dx4;
			y4+=dy4;

			drawTrickster();
			checkCrash();
			if(trickster.working){
				timer();
			}
			if (Number(localStorage.bestTime) < Number(seconds)){	    		
	    			localStorage.bestTime = seconds;
	    			$('.best-time').html(localStorage.bestTime);
	    		}

		}

		function drawTrickster(){
			context.beginPath();
			context.fillStyle="#FF6804";
			context.arc(trickster.x, trickster.y, trickster.radius, 0, Math.PI * 2, false);
			context.closePath();
			context.fill();
		}

		function distance(x0, y0, x1, y1) {
			var dx = x1 - x0;
			var dy = y1 - y0;
			return Math.sqrt(dx * dx + dy * dy);
		}

		function isCoordOnTrickster(x, y, circle) {
			return distance(x, y, circle.x, circle.y) < circle.radius;
		}
		
		$('#main-wrapper').on("mousedown", function(event) {
			$('#main-wrapper').on("mousemove", onMouseMove);
			$('#main-wrapper').on("mouseup", onMouseUp);
			offset.x = event.offsetX - trickster.x;
			offset.y = event.offsetY - trickster.y;
			$(canvas).css('cursor', 'pointer');	
			if(isCoordOnTrickster(event.offsetX, event.offsetY, trickster) && !trickster.working) {
				timeStart = new Date();
				if(!trickster.working){
				startInterval = setInterval(function(){
					draw();
				}, 15);	
				trickster.working = true;
				trickster.tricking = true;
				}

			timerStart();			
			}
		});

		var onMouseMove = function (event) {
			if(trickster.tricking){
				trickster.x = event.offsetX - offset.x;
				trickster.y = event.offsetY - offset.y;
				drawTrickster();
			}
		};

		function onMouseUp(event) {
			$('#main-wrapper').unbind("mousemove");
			$('#main-wrapper').unbind("mouseup");	
	    	$(canvas).css('cursor', 'default');
	    }

	    function checkCrash(){

	    	function stopTricks(){
	    		clearInterval(startInterval);
	    		$('#main-wrapper').unbind("mousemove");
				$('#main-wrapper').unbind("mouseup");	
	    		$(canvas).css('cursor', 'default');
	    		trickster.tricking = false;
	    		resultWindow();
	    		level();
	    	}
	    	var checkIfBounceXY = function (x, xWidth, y, yHeight, trickster){
	    			for(var i = 0; i < xWidth; i++){
		    			if(isCoordOnTrickster(x + i, y, trickster))return stopTricks();		    			
		    			if(isCoordOnTrickster(x + i, y + yHeight, trickster))return stopTricks();	    			
		    		}
		    		for(var j = 0; j < yHeight; j++){
		    			if(isCoordOnTrickster(x, y + j, trickster))return stopTricks();		    			
		    			if(isCoordOnTrickster(x + xWidth, y + j, trickster))return stopTricks();	    			
		    		}
		    		if( trickster.x < 30 || trickster.x + 30> 400) return stopTricks();
		    		if( trickster.y < 30 || trickster.y + 30> 400) return stopTricks();
		    	};
	    	checkIfBounceXY(x, 69, y, 29, trickster);
	    	checkIfBounceXY(x2, 29, y2, 69, trickster);
	    	checkIfBounceXY(x3, 49, y3, 39, trickster);
	    	checkIfBounceXY(x4, 49, y4, 58, trickster);
		}

		function timer(){
			var now = new Date();
			seconds = ((now.getTime() - timeStart.getTime()) / 1000).toFixed(3);
			$('.current-time').html(seconds);
		}

		function level(){
			if (seconds <= 5){
				$('.freshman').attr('id', 'freshman');
			}
			if(5 < seconds && seconds <= 10){
				$('.medium').attr('id', 'medium');
			}
			if(10 < seconds && seconds <= 20){
				$('.ninja').attr('id', 'ninja');
			}
			if(20 < seconds){
				$('.genius').attr('id', 'genius');
			}
		}
		function resultWindow(){
			$('.reset').attr('id', '');
			$('.again').click(function(){
				dx= 5,   dx2= 4,    dx3= 4,   dx4= 5,	
				dy= 5,   dy2= 4,    dy3= 4,   dy4= 5,
				 y= 20,   y2= 329,   y3= 340,  y4= 50,
				 x= 30,   x2= 30,    x3= 350,  x4= 340,
				trickster.x = canvas.width / 2,
				trickster.y = canvas.height / 2,
				trickster.working = false;
				$('.current-time').text('0.000');
				$('.reset').attr('id', 'hidden');
				$('.level').each(function(){$(this).attr('id', '');});
				draw();
			});
		}
		draw();
	});

})();
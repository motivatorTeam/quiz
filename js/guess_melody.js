(function(){
	var startTime, seconds, timerInterval, scores, song='', clicker = 0, switcher = true;

	function getData (url){
		return new Promise(function(recall, reject){
			var request = new XMLHttpRequest();
			request.open('GET', url);
			if (url.match(/\.json$/igm)) request.responseType = 'json';
			request.onreadystatechange = function(){
				if (request.readyState != 4) return;
				if (request.status != 200){
					reject(new Error('Couldn\'t load at: ' + url + ' : ' +  request.statusText));
				}
			};
			request.onload = function(){
				var response =  (url.match(/\.json$/igm)) ? request.response : request.responseText;
				recall(response);
			};
			request.send();
		});
	}



	getData('./api/guess_melody.json').then(function(response){
		$('.difficulty').text(response[clicker].i);
		audio(response[0].src);
		$('.stop').click(function(){
			stop();
			switcher = false;
		});
		$('#check').on('click',  function(){
			stop();
			if($('.variants-input').val()){
				checkAnswer(response[clicker].name, response[clicker].i);
			}
		});
		return response;
	}).then(function(response){
		$('.result-button').click(function(){
			if(!response[clicker + 1]){
				finalPage();
				return;
			} else {
				audio(response[++clicker].src);
			}
			resultWindowHide();
			switcher = true;
			$('.difficulty').text(response[clicker].i);
			
		});
	}).catch(function(err){
		console.log(err);
	});



	(function recordInit(){
		if(!localStorage.guessMelodyRecord){
			localStorage.guessMelodyRecord = 0;
		}
		$('.best').text(localStorage.guessMelodyRecord);
	})();



	function audio(url){
		song = new Audio(url);
		song.preload = 'auto';
		song.muted = true;
		song.autoplay = true;
		song.loop = true;
		song.play();
	}



	function play(){
		
		$('.play').click(function(){
			if(switcher){
				song.muted = false;
				$('.equalizer-img').attr('id', 'hidden');
				$('.equalizer-gif-img').attr('id', '');
				startTime = new Date();
				if(!timerInterval){
					timerInterval = setInterval(timer, 10);
				}
			}
		});
		

		function timer(){
			var newTime = new Date();
			seconds = ((newTime.getTime() - startTime.getTime()) / 1000).toFixed(3);
			$('.counter').text(seconds);
			if(seconds <= 10){
				scores = parseInt((10 - seconds) * 1000);
				$('.score').text(scores);
			}
		}
	}



	function stop(){
		song.muted = true;
		clearInterval(timerInterval);
		$('.play').attr('id', '');
		$('.equalizer-img').attr('id', '');
		$('.equalizer-gif-img').attr('id', 'hidden');
		clearInterval(timerInterval);
		timerInterval = undefined;
	}



	function startInfo(){
		if(localStorage.messageWasRead == 'false' || !localStorage.messageWasRead){
			$('.info').attr('id', '');
			$('.info-button').click(function(){
				$('.info').attr('id', 'hidden');
				localStorage.messageWasRead = true;
			});
		}
	}



	function checkAnswer(correct, index){
		var variant = ($('.variants-input').val()).toLowerCase();
		var indexedScore = scores * index;

		if(variant != correct){
			$('.result').attr('id', '');
			$('.incorrect').attr('id', '');
			$('.incorrect-see-correct').text(correct);
			return;
		}
		if(variant == correct && indexedScore > localStorage.guessMelodyRecord){
			
			localStorage.guessMelodyRecord = indexedScore;
			$('.best').text(localStorage.guessMelodyRecord);
			$('.result').attr('id', '');
			$('.correct-record').attr('id', '');
			$('.points').text(indexedScore);
			return;
		}
		if(variant == correct && scores  < localStorage.guessMelodyRecord){
			$('.result').attr('id', '');
			$('.correct').attr('id', '');
			$('.points').text(scores * index);
			return;
		}
	}



	function resultWindowHide(){
		$('.result').attr('id', 'hidden');
		$('.correct').attr('id', 'hidden');
		$('.correct-record').attr('id', 'hidden');
		$('.incorrect').attr('id', 'hidden');
		$('.variants-input').val('');
	}



	function finalPage(){
		$('.finish').attr('id', '');
	}


	startInfo();
	play();
	stop();
})();
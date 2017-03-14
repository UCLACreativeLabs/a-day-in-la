var k = 0;

function slideBottles(){
	k=0;
	document.getElementById('transition').style.display = "block";
	let bottles = document.getElementsByClassName('bottle');
	console.log(bottles);
	var interval = setInterval(function(){
		if (k>5){
			clearInterval(interval);
			setTimeout(function(){
				for (var i=0; i<bottles.length; i++){
					bottles[i].classList.remove('bottleAnim');
				}
				let curTrans = document.getElementById("transition");
				document.body.removeChild(curTrans);
				scene1.loadTrans(nextTrans);
			}, 3000);
		}
		else{
			bottles[k].classList.add('bottleAnim');
			k++;
		}
	}, 100);
}
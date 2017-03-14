function shrinkCoffee(){
	let coffee = document.getElementById('transition');
	coffee.style.width = 0 + "vw";
	coffee.style.transform = "translate(" + -50 + "%, " + -50 + "%)";
	setTimeout(function(){
		console.log(nextTrans);
		let curTrans = document.getElementById('transition'); //replace transition
		document.body.removeChild(curTrans);
		scene1.loadTrans(nextTrans);
	}, 500);
}

function expandCoffee(){
	let coffee = document.getElementById('transition');
	coffee.style.maxWidth = "none";
	coffee.style.maxHeight = "none";
	coffee.style.display = "block";
	setTimeout(function(){
		coffee.style.width = 140 + "vw";
		coffee.style.transform += "rotate(" + 180 + "deg)";
	}, 50);
}
function shrinkStar(){
	console.log('called shrink star');
	let star = Snap("#star");
	star.attr({transform: 's 12 12'});
	scene1.scene.attr({mask: star});
	console.log(star);
	star.animate({transform: "s 0 0"}, 500);
}

function expandStar(){
	let star = Snap("#star");
	star.animate({transform: "s 12 12"}, 500);
	setTimeout(function(){
		scene1.scene.attr({mask: "none"}); //remove mask
		let curTrans = document.getElementById('transition'); //replace transition
		document.body.removeChild(curTrans);
		scene1.loadTrans(nextTrans);
	}, 600);
}
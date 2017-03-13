function shrinkStar(){
	let star = Snap("#star");
	star.animate({transform: "s 0 0"}, 500);
}

function expandStar(){
	let star = Snap("#star");
	star.animate({transform: "s 12 12"}, 500);
}
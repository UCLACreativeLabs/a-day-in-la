// returns a matrix that transform points from src's coordinate system
// to dest's coordinate system
function transformBetween(src, dest) {
	var srcTransform = src.transform().globalMatrix;
	var destTransform = dest.transform().globalMatrix;
	return srcTransform.multLeft(destTransform.invert());
}

// given a list of milestones, and assuming it takes the same amount of time to
// get to the next milestone, converts a value between [0,1] to the corresponding travel
// length it should reach
function createTravelLengthInterpolator(milestones) {
	var index = 0,
		prevLength = 0,
		interval = milestones[index] - prevLength; // distance between prev and next milestone

	return (value) => {
		if (value >= 1) return milestones[milestones.length-1]; // last milestone
		else if (value > (index+1)/milestones.length) {
			index++;
			prevLength = milestones[index-1];
			interval = milestones[index] - prevLength;
		}
		var progress = value*milestones.length - index; // how far towards our next milestone
		return prevLength + progress*interval;
	}
}

// modified from http://michaeltempest.com/the-missing-snap-svg-function/
// "milestones" are control points to control speed along the path. The time between each milestone
// is constant, so put milestones close together on sections you want the object to move slowly
// 
// milestones: array of points along the path (in absolute distance)
// duration: the TOTAL duraction of the animation. Thus, each milestone
//           takes (duration/milestones.length) amount of time
// returns: whatever Snap.animate() returns
function animateAlongPath(path, el, start, duration, milestones, easing, callback) {
	var len = Snap.path.getTotalLength(path),
		elBB = el.getBBox(),
		milestones = milestones.concat([len]); // copy the array

	el.insertAfter(path); // move next to path, so don't need to worry about transformations
	milestones.push(len); // add the path end point as a final milestone

	var getLength = createTravelLengthInterpolator(milestones);

	return Snap.animate(0, 1, function(value) {
		var pt = path.getPointAtLength(getLength(value));
		el.transform('t' + (pt.x - elBB.cx) + ',' + (pt.y - elBB.cy));
		//console.log(el.transform().string)
	}, duration, easing, function() {
		if (callback) callback(path);
	});
};

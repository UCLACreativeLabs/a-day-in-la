// returns a matrix that transform points from src's coordinate system
// to dest's coordinate system
function transformBetween(src, dest) {
	var srcTransform = src.transform().globalMatrix;
	var destTransform = dest.transform().globalMatrix;
	return srcTransform.multLeft(destTransform.invert());
}

// modified from http://michaeltempest.com/the-missing-snap-svg-function/
// "milestones" are control points to control speed along the path. The time between each milestone is constant, so put milestones close together on sections you want the object to move slowly
// milestones: array of points along the path (in absolute distance)
// duration: the time it should take to get to the next milestone
function animateAlongPath(path, el, start, duration, milestones, animObj, easing, callback) {
	var len = Snap.path.getTotalLength(path),
		elBB = el.getBBox(),
		mat = transformBetween(path, el),
		milestones = milestones.concat([len]); // copy the array

	milestones.push(len); // add the path end point as a final milestone

	(function startFrame(currFrame, prevEnd) {
		var nextEnd = milestones[currFrame];
		animObj.anim = Snap.animate(prevEnd, nextEnd, function(value) {
			var pt = path.getPointAtLength(value);
			el.transform('t' + (mat.x(pt.x,pt.y) - elBB.cx) + ',' + (mat.y(pt.x,pt.y) - elBB.cy));
			//console.log(el.transform().string)
		}, duration, easing, function() {
			if (currFrame < milestones.length) startFrame(currFrame+1, nextEnd);
			else if (callback) callback(path);
		});
	})(0, start);
};

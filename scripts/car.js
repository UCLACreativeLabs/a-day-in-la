function drive(){
	let car = document.getElementById('transition');
	car.style.display = "block";
	car.classList.add('drive');
	setTimeout(function(){
		car.classList.remove('drive');
		let cur = document.getElementById('transition');
		document.body.removeChild(cur);
		scene1.loadTrans(nextTrans);
	}, 2100);
}
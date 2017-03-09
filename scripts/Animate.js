function AnimationController() {
	
	this.Animate = function(svgJson){
		window.setTimeout(function(){
			for(var element in svgJson) {
			  var item = document.getElementById(element);

			  var docElement = document.getElementById(element);

			  if(svgJson[element].trigger == "default") {
			    window.setTimeout(function(){
			      svgJson[element].animation(docElement);
			    }, 100);
			  }

			  item.addEventListener(svgJson[element].trigger, function(){
			    svgJson[element].animation(docElement);
			  });
			}
		}, 1000);
	};
}
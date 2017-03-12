function AnimationController() {
	
	this.Animate = function(svgJson){
		window.setTimeout(function(){
			for(var element in svgJson) {
			  var item = document.getElementById(element);

			  var docElement = document.getElementById(element);

			  if(svgJson[element].trigger == "default") {
			      svgJson[element].animation(docElement);
			  }

			  item.addEventListener(svgJson[element].trigger, function(){
			    svgJson[element].animation(docElement);
			  });
			}
		}, 1000);
	};
}
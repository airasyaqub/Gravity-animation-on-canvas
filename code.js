$(document).ready(function() {
	// body... 
	var canvas=$('canvas');
	//canvas.attr({'width':window.innerWidth,'height':window.innerHeight});
	canvas[0].width=window.innerWidth;
	canvas[0].height=window.innerHeight;
	var c=$("canvas")[0].getContext('2d');

$(window).resize(function(){
    	canvas[0].width=window.innerWidth;
    	canvas[0].height=window.innerHeight;
    	init();
	});

	var frameID;
	var gravity=1;
	var friction=0.8;
	var colorArray=['blue','black','yellow','orange','red'];
	function Circle(x,y,dx,dy,radius){
		this.x=x;
		this.y=y;
		this.radius=radius;
		this.dx=dx;
		this.dy=dy;
		this.color=colorArray[Math.floor(Math.random()*colorArray.length)];

		this.draw=function(){
			c.beginPath();
			c.arc(this.x,this.y,this.radius,0*Math.PI,2*Math.PI,false);
			c.fillStyle=this.color;
			c.fill();
			c.stroke();
		};

		this.update=function(){
			console.log(this.y,this.dy,this.radius,this.y+this.radius,this.y+this.radius+this.dy,innerHeight);
			if(this.y+this.radius+this.dy>canvas[0].height){
				console.log('if');
				this.dy=Math.floor(-this.dy*friction);
			}
			else{

				this.dy+=gravity;
			}
			

			if(this.x+this.radius>canvas[0].width||this.x-this.radius<0){
				this.dx=-this.dx;
			}
			

			this.x+=this.dx;
			this.y+=this.dy;
			this.draw();
		};
	}




	function getRandomInt(min, max) {
  		min = Math.ceil(min);
  		max = Math.floor(max);
  		return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	}

	function stop(){
		console.log('in stop '+frameID);
		cancelAnimationFrame(frameID);
	}

	var circles=[];
	init();
	function init(){
		circles=[];
		for(var i=0;i<100;i++){
		var radius=getRandomInt(7,30);
		var x=getRandomInt(radius, canvas[0].width-radius);
		var y=getRandomInt(radius, canvas[0].height-radius);
		var dx=getRandomInt(-2,2);
		var dy=getRandomInt(-2,2);
		circles.push(new Circle(x,y,dx,dy,radius));
		}
	}
	
	

	function animate(){
		requestAnimationFrame(animate);
		c.clearRect(0,0,innerWidth,innerHeight);
		for (var i=0;i<circles.length;i++) {
			circles[i].update();
		}
	}

		requestAnimationFrame(animate);

	

	//setInterval( function() { x=x+10;animate(x); }, 40);
	//console.log(c);
		
	});
$(document).ready(function(){
		var size = 64;
		var width = 1024;
		var height= 768;
		var tail = false;
		var currentColor = "rgb(0, 0, 0)";
		var random = false;
		var blackScale = false;
		
		function createGrid(size){
			$('body > #nav, #wrapper, footer').remove();

			$('body').append('<div id="nav"></div>');

			$('#nav').css({
				"height":150,
				"width": width,
				"margin": "0 auto",
				"margin-bottom": "10px",
				"text-align":"center",
				"border": "3px solid grey",
				"background-color":"white"
				})
			.append('<h1><center>HTML / JavaScript Etch-A-Sketch</center></h1>')
			.append('<div class="button" id="newGrid"><p>New Grid</p></div>')
			.append('<div class="button" id="setTail"><p>Toggle Tail</p></div>')
			.append('<div class="button" id="random"><p>Random Color</p></div>')
			.append('<div class="button" id="black"><p>Black Scale</p></div>');

			$('.button').css({
				"border": "1px solid black",
				"height": "50px",
				"width":"145px",
				"display": "inline-block",
				"margin-right": "10px"
			}).hover(function(){
				$(this).css({
					"cursor": "pointer",
					"border-color": "#545454",
					"color": "#545454"
					})
				},
					function(){
						$(this).css({
							"border-color":"black",
							"color":"black"
						})
					}
				);
			$('body').append('<div id="wrapper"></div>');

			$('#wrapper').css({
				"margin": "0 auto",
				"width":width,
				"height":height,
				"border": "3px solid grey",
				"border-radius": "3px",
				"padding":"1px",
				"background-color":"white"
				});

			var wrap = $('#wrapper');

			for(var i = 0; i < size; i++){
				wrap.append('<div class="rowSize" id="row' + i + '"'  + '></div>');
		
				var rows = $('#row' + i);
				for(var j = 0; j < size; j++){
					rows.append('<div class="cells"></div>');
		
				}
			}

			$('body').css({
				"padding": 0,
				"margin": 0,
				"background-color":"#e1d3c1"
				})

			$('.rowSize').css({
				"padding": "0px",
				"margin": "0px",
				})	

			$('.cells').css({
					"width":(width / size) - size * .0003,
					"height":(height / size) - size * .0003,
					"float":"left",
					"padding": "0px",
					"margin": "0px",
					"border": "none",
					
				})

			$('#black').click(function(){
				if(!blackScale){
					clearSelected();
					isSelected($('#black'));
					blackScale = true;
					tail = false;
					random = false;
				};
			});

			$('#random').click(function(){
				if(blackScale){
					isSelected("#black");
					blackScale = false;
				}
				
				isSelected($('#random'));
				if(random === false){
					random = true;
				}else{
					random = false;
					currentColor = "black";
				}
			});
				
			
			$('#newGrid').click(function(){
					currentColor = "black";
					random = false;
					setTail = false;
					blackScale = false;
					newGrid();
					
				});

			$('#setTail').click(function(){
				if(blackScale){
					isSelected("#black");
					blackScale = false;
					currentColor = "black";
				}

				isSelected($('#setTail'));
				
				if(tail === false){
					tail = true;
				}
				else{
					tail = false;
				}
			});


			$('.cells')
				.mouseenter(function(){
					if(random === true){
						currentColor = randomColor();
						$(this).css({
							"background-color":currentColor,
							"transition-property": "none"
						})
					}
					else if(blackScale === true){
						var rgb = $(this).css("background-color");
						var shadeOfBlack = getBlack(rgb);
						$(this).css({
							"background-color": shadeOfBlack
						})
					}
					else{
						currentColor = "rgb(0, 0, 0)";
						$(this).css({
							"transition-property": "none",
							"background-color":currentColor,
							
						})
					}

		
				})
				.mouseleave(function(){
					if(tail === true){
							$(this).css({
							"background-color":"transparent",
							"transition":"2s"
						})	
					}
						
				});

			$('#wrapper').after('<footer>2016 Jason Cousins</footer>');
			$('footer').css({
				"width": width,
				"height":"50px",
				"margin": "auto",
				"padding-top": "10px"
			});
		};
		
		createGrid(size);



		function newGrid(){
			size = prompt("Please select grid size: ");
			if(isInteger(size) && size > 0 && size < 101){
				createGrid(size);
			}else{
				alert("Please enter a value between 1 and 100");
			}
			
		};

		function isInteger(size){
			if(size % 1 === 0){
				return true;
			}else{
				return false;
			}
		}


		function randomColor(){
			var theString = "abcdef1234567890";
			var newColor = "#";
			var stringLen = theString.length;
			for(var i = 0; i < 3; i++){
				position = Math.floor(Math.random()*stringLen);
				newColor += theString[position];
			}
			
			return newColor;
		};

		function parseRGB(rgb){
			
			var hex = "#"
			var position = rgb.indexOf("(");
			hex += rgb[position +1];
			hex += rgb[position + 4];
			hex += rgb[position + 7];
			
		};

		function getBlack(hexColor){
			var blacks = ['transparent', 'rgb(238, 238, 238)', 'rgb(221, 221, 221)', 'rgb(204, 204, 204)', 'rgb(187, 187, 187)', 'rgb(153, 153, 153)', 'rgb(136, 136, 136)', 'rgb(119, 119, 119)', 'rgb(102, 102, 102)', 'rgb(85, 85, 85)', 'rgb(51, 51, 51)', 'rgb(34, 34, 34)', 'rgb(0, 0, 0)'];
			if(hexColor === "rgb(0, 0, 0)"){
				return false;
			}
			else{
				for(var i = 0; i < blacks.length; i++){
					if(hexColor === blacks[i]){
						return blacks[ i + 1];
					}
				}
			}
		};

		function isSelected(myButton){

			var state = $(myButton).css("background-color");
			if(state === "transparent"){
				$(myButton).css({
					"background-color":"#e9e9e9",
					
				});
			}else{
				$(myButton).css({
					"background-color":"transparent",
					
				});
			}
		};
		function clearSelected(){
			$(".button").each(function(){
				$(this).css({"background-color":"transparent"});
			})
		}

	});
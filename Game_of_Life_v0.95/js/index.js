var myInter;

var canvasRefresh = function(){
	var c = $("#myCanvas")[0];
	c.width = c.width; //清除画布

	var cxt = $("#myCanvas")[0].getContext("2d");
	cxt.fillStyle = "#FFFFFF";
	
	var gameOfLifeCanvasWidth = $("#myCanvas")[0].width / 5;
	var gameOfLifeCanvasHeight = $("#myCanvas")[0].height / 5;	
	
	for(var i = 0; i < gameOfLifeCanvasWidth; i++)
		for(var j = 0; j < gameOfLifeCanvasHeight; j++){
			if(Math.random() * 100 < $('#probability').val())
			{
				cxt.fillRect(i * 5, j * 5, 5, 5);
			}
		}
}

var canvasUpdate = function(){
	var cxt = $("#myCanvas")[0].getContext("2d");
	
	var gameOfLifeCanvasWidth = $("#myCanvas")[0].width / 5;
	var gameOfLifeCanvasHeight = $("#myCanvas")[0].height / 5;

	var data = cxt.getImageData(0, 0, $("#myCanvas")[0].width, $("#myCanvas")[0].height).data;
	
	var newdata = new Array();
	for(var i = 0; i < gameOfLifeCanvasWidth; i++){newdata[i] = new Array();}
	
	for(var i = 0; i < gameOfLifeCanvasWidth; i++)
		for(var j = 0; j < gameOfLifeCanvasHeight; j++){
			var count = 0;

			if(i > 0 && j > 0 && i < gameOfLifeCanvasWidth - 1 && j < gameOfLifeCanvasHeight - 1){
				if(data[((j - 1) * gameOfLifeCanvasWidth * 25 + (i - 1) * 5) * 4 + 3] != 0){count++;}
				if(data[((j) * gameOfLifeCanvasWidth * 25 + (i - 1) * 5) * 4 + 3] != 0){count++;}
				if(data[((j - 1) * gameOfLifeCanvasWidth * 25 + (i) * 5) * 4 + 3] != 0){count++;}
				if(data[((j + 1) * gameOfLifeCanvasWidth * 25 + (i - 1) * 5) * 4 + 3] != 0){count++;}
				if(data[((j - 1) * gameOfLifeCanvasWidth * 25 + (i + 1) * 5) * 4 + 3] != 0){count++;}
				if(data[((j + 1) * gameOfLifeCanvasWidth * 25 + (i) * 5) * 4 + 3] != 0){count++;}
				if(data[((j) * gameOfLifeCanvasWidth * 25 + (i + 1) * 5) * 4 + 3] != 0){count++;}
				if(data[((j + 1) * gameOfLifeCanvasWidth * 25 + (i + 1) * 5) * 4 + 3] != 0){count++;}
			}
			else if(i == 0){
				if(j > 0 && j < gameOfLifeCanvasHeight - 1){
					if(data[((j - 1) * gameOfLifeCanvasWidth * 25 + (gameOfLifeCanvasWidth - 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((j) * gameOfLifeCanvasWidth * 25 + (gameOfLifeCanvasWidth - 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((j - 1) * gameOfLifeCanvasWidth * 25 + (i) * 5) * 4 + 3] != 0){count++;}
					if(data[((j + 1) * gameOfLifeCanvasWidth * 25 + (gameOfLifeCanvasWidth - 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((j - 1) * gameOfLifeCanvasWidth * 25 + (i + 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((j + 1) * gameOfLifeCanvasWidth * 25 + (i) * 5) * 4 + 3] != 0){count++;}
					if(data[((j) * gameOfLifeCanvasWidth * 25 + (i + 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((j + 1) * gameOfLifeCanvasWidth * 25 + (i + 1) * 5) * 4 + 3] != 0){count++;}					
				}
				else if(j == 0){
					if(data[((gameOfLifeCanvasHeight - 1) * gameOfLifeCanvasWidth * 25 + (gameOfLifeCanvasWidth - 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((j) * gameOfLifeCanvasWidth * 25 + (gameOfLifeCanvasWidth - 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((gameOfLifeCanvasHeight - 1) * gameOfLifeCanvasWidth * 25 + (i) * 5) * 4 + 3] != 0){count++;}
					if(data[((j + 1) * gameOfLifeCanvasWidth * 25 + (gameOfLifeCanvasWidth - 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((gameOfLifeCanvasHeight - 1) * gameOfLifeCanvasWidth * 25 + (i + 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((j + 1) * gameOfLifeCanvasWidth * 25 + (i) * 5) * 4 + 3] != 0){count++;}
					if(data[((j) * gameOfLifeCanvasWidth * 25 + (i + 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((j + 1) * gameOfLifeCanvasWidth * 25 + (i + 1) * 5) * 4 + 3] != 0){count++;}					
				}
				else if(j == gameOfLifeCanvasHeight - 1){
					if(data[((j - 1) * gameOfLifeCanvasWidth * 25 + (gameOfLifeCanvasWidth - 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((j) * gameOfLifeCanvasWidth * 25 + (gameOfLifeCanvasWidth - 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((j - 1) * gameOfLifeCanvasWidth * 25 + (i) * 5) * 4 + 3] != 0){count++;}
					if(data[((gameOfLifeCanvasWidth - 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((j - 1) * gameOfLifeCanvasWidth * 25 + (i + 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((i) * 5) * 4 + 3] != 0){count++;}
					if(data[((j) * gameOfLifeCanvasWidth * 25 + (i + 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((i + 1) * 5) * 4 + 3] != 0){count++;}
				}
			}
			else if(i == gameOfLifeCanvasWidth - 1){
				if(j > 0 && j < gameOfLifeCanvasHeight - 1){
					if(data[((j - 1) * gameOfLifeCanvasWidth * 25 + (i - 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((j) * gameOfLifeCanvasWidth * 25 + (i - 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((j - 1) * gameOfLifeCanvasWidth * 25 + (i) * 5) * 4 + 3] != 0){count++;}
					if(data[((j + 1) * gameOfLifeCanvasWidth * 25 + (i - 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((j - 1) * gameOfLifeCanvasWidth * 25) * 4 + 3] != 0){count++;}
					if(data[((j + 1) * gameOfLifeCanvasWidth * 25 + (i) * 5) * 4 + 3] != 0){count++;}
					if(data[((j) * gameOfLifeCanvasWidth * 25) * 4 + 3] != 0){count++;}
					if(data[((j + 1) * gameOfLifeCanvasWidth * 25) * 4 + 3] != 0){count++;}					
				}
				else if(j == 0){
					if(data[((gameOfLifeCanvasHeight - 1) * gameOfLifeCanvasWidth * 25 + (i - 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((j) * gameOfLifeCanvasWidth * 25 + (i - 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((gameOfLifeCanvasHeight - 1) * gameOfLifeCanvasWidth * 25 + (i) * 5) * 4 + 3] != 0){count++;}
					if(data[((j + 1) * gameOfLifeCanvasWidth * 25 + (i - 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((gameOfLifeCanvasHeight - 1) * gameOfLifeCanvasWidth * 25) * 4 + 3] != 0){count++;}
					if(data[((j + 1) * gameOfLifeCanvasWidth * 25 + (i) * 5) * 4 + 3] != 0){count++;}
					if(data[((j) * gameOfLifeCanvasWidth * 25) * 4 + 3] != 0){count++;}
					if(data[((j + 1) * gameOfLifeCanvasWidth * 25) * 4 + 3] != 0){count++;}					
				}
				else if(j == gameOfLifeCanvasHeight - 1){
					if(data[((j - 1) * gameOfLifeCanvasWidth * 25 + (i - 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((j) * gameOfLifeCanvasWidth * 25 + (i - 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((j - 1) * gameOfLifeCanvasWidth * 25 + (i) * 5) * 4 + 3] != 0){count++;}
					if(data[((i - 1) * 5) * 4 + 3] != 0){count++;}
					if(data[((j - 1) * gameOfLifeCanvasWidth * 25) * 4 + 3] != 0){count++;}
					if(data[((i) * 5) * 4 + 3] != 0){count++;}
					if(data[((j) * gameOfLifeCanvasWidth * 25) * 4 + 3] != 0){count++;}
					if(data[3] != 0){count++;}
				}
			}
			else if(j == 0){
				if(data[((gameOfLifeCanvasHeight - 1) * gameOfLifeCanvasWidth * 25 + (i - 1) * 5) * 4 + 3] != 0){count++;}
				if(data[((j) * gameOfLifeCanvasWidth * 25 + (i - 1) * 5) * 4 + 3] != 0){count++;}
				if(data[((gameOfLifeCanvasHeight - 1) * gameOfLifeCanvasWidth * 25 + (i) * 5) * 4 + 3] != 0){count++;}
				if(data[((j + 1) * gameOfLifeCanvasWidth * 25 + (i - 1) * 5) * 4 + 3] != 0){count++;}
				if(data[((gameOfLifeCanvasHeight - 1) * gameOfLifeCanvasWidth * 25 + (i + 1) * 5) * 4 + 3] != 0){count++;}
				if(data[((j + 1) * gameOfLifeCanvasWidth * 25 + (i) * 5) * 4 + 3] != 0){count++;}
				if(data[((j) * gameOfLifeCanvasWidth * 25 + (i + 1) * 5) * 4 + 3] != 0){count++;}
				if(data[((j + 1) * gameOfLifeCanvasWidth * 25 + (i + 1) * 5) * 4 + 3] != 0){count++;}				
			}
			else{
				if(data[((j - 1) * gameOfLifeCanvasWidth * 25 + (i - 1) * 5) * 4 + 3] != 0){count++;}
				if(data[((j) * gameOfLifeCanvasWidth * 25 + (i - 1) * 5) * 4 + 3] != 0){count++;}
				if(data[((j - 1) * gameOfLifeCanvasWidth * 25 + (i) * 5) * 4 + 3] != 0){count++;}
				if(data[((i - 1) * 5) * 4 + 3] != 0){count++;}
				if(data[((j - 1) * gameOfLifeCanvasWidth * 25 + (i + 1) * 5) * 4 + 3] != 0){count++;}
				if(data[((i) * 5) * 4 + 3] != 0){count++;}
				if(data[((j) * gameOfLifeCanvasWidth * 25 + (i + 1) * 5) * 4 + 3] != 0){count++;}
				if(data[((i + 1) * 5) * 4 + 3] != 0){count++;}
			}

			
			if(count == 3){newdata[i][j] = true;}
			else if(count == 2 && data[(j * gameOfLifeCanvasWidth * 25 + i * 5) * 4 + 3] != 0){newdata[i][j] = true;}
			else{newdata[i][j] = false;}
		}

	var c = $("#myCanvas")[0];
	c.width = c.width; //清除画布
	
	cxt.fillStyle = "#FFFFFF";
	for(var i = 0; i < gameOfLifeCanvasWidth; i++)
		for(var j = 0; j < gameOfLifeCanvasHeight; j++){
			if(newdata[i][j])
			{
				cxt.fillRect(i * 5, j * 5, 5, 5);
			}
		}
}

window.onload = function(){
	var storage = window.localStorage;
	
	if(!storage.getItem("gameOfLifeCanvasWidth")){storage.setItem("gameOfLifeCanvasWidth", 120);}
	if(!storage.getItem("gameOfLifeCanvasHeight")){storage.setItem("gameOfLifeCanvasHeight", 80);}
	if(!storage.getItem("speed")){storage.setItem("speed", 20);}
	if(!storage.getItem("probability")){storage.setItem("probability", 37);}
	
	var gameOfLifeCanvasWidth = parseInt(storage.gameOfLifeCanvasWidth);
	$('#myCanvas')[0].width = gameOfLifeCanvasWidth * 5;
	$('#canvasWidth').val(gameOfLifeCanvasWidth);
	
	var gameOfLifeCanvasHeight = parseInt(storage.gameOfLifeCanvasHeight);
	$('#myCanvas')[0].height = gameOfLifeCanvasHeight * 5;
	$('#canvasHeight').val(gameOfLifeCanvasHeight);
	
	$('#speed').val(parseInt(storage.speed));
	$('#probability').val(parseInt(storage.probability));
	
	canvasRefresh();
}

$('#refresh').click(function(){
	var storage = window.localStorage;

	clearInterval(myInter);

	$('#myCanvas')[0].width = $('#canvasWidth').val() * 5;
	$('#myCanvas')[0].height = $('#canvasHeight').val() * 5;
	
	storage.gameOfLifeCanvasWidth = $('#canvasWidth').val();
	storage.gameOfLifeCanvasHeight = $('#canvasHeight').val();
	storage.probability = $('#probability').val();
	storage.speed = $('#speed').val();
	
	canvasRefresh();
});

$('#next').click(function(){
	canvasUpdate();
});

$('#auto').click(function(){
	var storage = window.localStorage;
	storage.speed = $('#speed').val();
	
	clearInterval(myInter);	
	myInter = setInterval(function(){canvasUpdate();}, $('#speed').val());
});

$('#pause').click(function(){
	clearInterval(myInter);
});
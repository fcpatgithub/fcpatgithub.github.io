//测试画布规模
var testWidth = 5;
var testHeight = 5;

//画布比例缩放
$("#myCanvas")[0].width = 5 * testWidth;
$("#myCanvas")[0].height = 5 * testHeight;

//测试样例生成，共16个样例
var testMatrixGenerate = function(n){
	var testMatrix = new Array;
	if(n == 1)
	{
		for(i = 0; i < testWidth; i++)
		{
			testMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				testMatrix[i][j] = true;
			}
		}
		//全部生
	}
	else if(n == 2)
	{
		for(i = 0; i < testWidth; i++)
		{
			testMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				testMatrix[i][j] = false;
			}
		}
		//全部死
	}
	else if(n == 3)
	{
		for(i = 0; i < testWidth; i++)
		{
			testMatrix[i] = new Array;
			for(j = 0; j < 5; j++)
			{
				testMatrix[i][j] = false;
			}
		}
		testMatrix[2][2] = true;
		testMatrix[1][1] = true;
		testMatrix[3][3] = true;
		//X X X X X
		//X O X X X
		//X X O X X
		//X X X O X
		//X X X X X
	}
	else if(n == 4)
	{
		for(i = 0; i < testWidth; i++)
		{
			testMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				testMatrix[i][j] = false;
			}
		}
		testMatrix[2][2] = true;
		testMatrix[2][1] = true;
		testMatrix[3][2] = true;
		//X X X X X
		//X O X X X
		//X X O O X
		//X X X X X
		//X X X X X
	}
	else if(n == 5)
	{
		for(i = 0; i < testWidth; i++)
		{
			testMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				testMatrix[i][j] = false;
			}
		}
		testMatrix[1][1] = true;
		testMatrix[3][1] = true;
		testMatrix[1][3] = true;
		testMatrix[3][3] = true;
		//X X X X X
		//X O X O X
		//X X X X X
		//X O X O X
		//X X X X X
	}
	else if(n == 6)
	{
		for(i = 0; i < testWidth; i++)
		{
			testMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				testMatrix[i][j] = false;
			}
		}
		testMatrix[1][1] = true;
		testMatrix[1][2] = true;
		testMatrix[2][1] = true;
		testMatrix[2][2] = true;
		//X X X X X
		//X O O X X
		//X O O X X
		//X X X X X
		//X X X X X
	}
	else if(n == 7)
	{
		for(i = 0; i < testWidth; i++)
		{
			testMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				testMatrix[i][j] = false;
			}
		}
		testMatrix[1][1] = true;
		testMatrix[3][1] = true;
		testMatrix[1][2] = true;
		testMatrix[3][2] = true;
		//X X X X X
		//X O X O X
		//X O X O X
		//X X X X X
		//X X X X X
	}
	else if(n == 8)
	{
		for(i = 0; i < testWidth; i++)
		{
			testMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				testMatrix[i][j] = false;
			}
		}
		testMatrix[1][1] = true;
		testMatrix[3][1] = true;
		testMatrix[2][2] = true;
		testMatrix[1][2] = true;
		//X X X X X
		//X O X O X
		//X O O X X
		//X X X X X
		//X X X X X
	}
	else if(n == 9)
	{
		for(i = 0; i < testWidth; i++)
		{
			testMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				testMatrix[i][j] = false;
			}
		}
		testMatrix[1][1] = true;
		testMatrix[3][1] = true;
		testMatrix[2][2] = true;
		testMatrix[2][3] = true;
		//X X X X X
		//X O X O X
		//X X O X X
		//X X O X X
		//X X X X X
	}
	else if(n == 10)
	{
		for(i = 0; i < testWidth; i++)
		{
			testMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				testMatrix[i][j] = false;
			}
		}
		testMatrix[1][1] = true;
		testMatrix[3][1] = true;
		testMatrix[2][2] = true;
		testMatrix[1][3] = true;
		//X X X X X
		//X O X O X
		//X X O X X
		//X O X X X
		//X X X X X
	}
	else if(n == 11)
	{
		for(i = 0; i < testWidth; i++)
		{
			testMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				testMatrix[i][j] = false;
			}
		}
		testMatrix[1][2] = true;
		testMatrix[2][2] = true;
		testMatrix[3][2] = true;
		testMatrix[2][3] = true;
		//X X X X X
		//X X X X X
		//X O O O X
		//X X O X X
		//X X X X X
	}
	else if(n == 12)
	{
		for(i = 0; i < testWidth; i++)
		{
			testMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				testMatrix[i][j] = false;
			}
		}
		testMatrix[1][1] = true;
		testMatrix[2][2] = true;
		testMatrix[3][3] = true;
		testMatrix[1][3] = true;
		testMatrix[3][1] = true;
		//X X X X X
		//X O X O X
		//X X O X X
		//X O X O X
		//X X X X X
	}
	else if(n == 13)
	{
		for(i = 0; i < testWidth; i++)
		{
			testMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				testMatrix[i][j] = false;
			}
		}
		testMatrix[1][1] = true;
		testMatrix[2][1] = true;
		testMatrix[1][2] = true;
		testMatrix[2][2] = true;
		testMatrix[2][3] = true;
		//X X X X X
		//X O O X X
		//X O O X X
		//X X O X X
		//X X X X X
	}
	else if(n == 14)
	{
		for(i = 0; i < testWidth; i++)
		{
			testMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				testMatrix[i][j] = false;
			}
		}
		testMatrix[1][1] = true;
		testMatrix[3][1] = true;
		testMatrix[1][2] = true;
		testMatrix[2][2] = true;
		testMatrix[3][2] = true;
		//X X X X X
		//X O X O X
		//X O O O X
		//X X X X X
		//X X X X X
	}
	else if(n == 15)
	{
		for(i = 0; i < testWidth; i++)
		{
			testMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				testMatrix[i][j] = false;
			}
		}
		testMatrix[0][0] = true;
		testMatrix[0][4] = true;
		testMatrix[4][4] = true;
		testMatrix[4][0] = true;
		//O X X X O
		//X X X X X
		//X X X X X
		//X X X X X
		//O X X X O
	}
	else if(n == 16)
	{
		for(i = 0; i < testWidth; i++)
		{
			testMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				testMatrix[i][j] = false;
			}
		}
		testMatrix[0][0] = true;
		testMatrix[0][4] = true;
		testMatrix[0][1] = true;
		testMatrix[0][3] = true;
		testMatrix[4][1] = true;
		testMatrix[4][3] = true;
		testMatrix[4][4] = true;
		testMatrix[4][0] = true;
		//O X X X O
		//O X X X O
		//X X X X X
		//O X X X O
		//O X X X O
	}	
	return testMatrix;
}

//16个测试样例的解矩阵生成
var correctMatrixGenerate = function(n){
	var correctMatrix = new Array;
	if(n == 1 || n == 2 || n == 5 || n == 7)
	{
		for(i = 0; i < testWidth; i++)
		{
			correctMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				correctMatrix[i][j] = false;
			}
		}
		//全部死
	}
	else if(n == 3)
	{
		for(i = 0; i < testWidth; i++)
		{
			correctMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				correctMatrix[i][j] = false;
			}
		}
		correctMatrix[2][2] = true;
		//X X X X X
		//X X X X X
		//X X O X X
		//X X X X X
		//X X X X X
	}
	else if(n == 4)
	{
		for(i = 0; i < testWidth; i++)
		{
			correctMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				correctMatrix[i][j] = false;
			}
		}
		correctMatrix[2][2] = true;
		correctMatrix[3][1] = true;
		correctMatrix[2][1] = true;
		correctMatrix[3][2] = true;
		//X X X X X
		//X X O O X
		//X X O O X
		//X X X X X
		//X X X X X
	}
	else if(n == 6)
	{
		for(i = 0; i < testWidth; i++)
		{
			correctMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				correctMatrix[i][j] = false;
			}
		}
		correctMatrix[1][1] = true;
		correctMatrix[1][2] = true;
		correctMatrix[2][1] = true;
		correctMatrix[2][2] = true;
		//X X X X X
		//X O O X X
		//X O O X X
		//X X X X X
		//X X X X X
	}
	else if(n == 8)
	{
		for(i = 0; i < testWidth; i++)
		{
			correctMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				correctMatrix[i][j] = false;
			}
		}
		correctMatrix[1][1] = true;
		correctMatrix[2][2] = true;
		correctMatrix[1][2] = true;
		//X X X X X
		//X O X X X
		//X O O X X
		//X X X X X
		//X X X X X
	}
	else if(n == 9)
	{
		for(i = 0; i < testWidth; i++)
		{
			correctMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				correctMatrix[i][j] = false;
			}
		}
		correctMatrix[1][2] = true;
		correctMatrix[3][2] = true;
		correctMatrix[2][1] = true;
		correctMatrix[2][2] = true;
		//X X X X X
		//X X O X X
		//X O O O X
		//X X X X X
		//X X X X X
	}
	else if(n == 10)
	{
		for(i = 0; i < testWidth; i++)
		{
			correctMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				correctMatrix[i][j] = false;
			}
		}
		correctMatrix[1][2] = true;
		correctMatrix[2][1] = true;
		correctMatrix[2][2] = true;
		//X X X X X
		//X X O X X
		//X O O X X
		//X X X X X
		//X X X X X
	}
	else if(n == 11)
	{
		for(i = 0; i < testWidth; i++)
		{
			correctMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				correctMatrix[i][j] = false;
			}
		}
		correctMatrix[1][3] = true;
		correctMatrix[1][2] = true;
		correctMatrix[2][2] = true;
		correctMatrix[2][3] = true;
		correctMatrix[2][1] = true;
		correctMatrix[3][2] = true;
		correctMatrix[3][3] = true;
		//X X X X X
		//X X O X X
		//X O O O X
		//X O O O X
		//X X X X X
	}
	else if(n == 12)
	{
		for(i = 0; i < testWidth; i++)
		{
			correctMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				correctMatrix[i][j] = false;
			}
		}
		correctMatrix[2][3] = true;
		correctMatrix[1][2] = true;
		correctMatrix[2][1] = true;
		correctMatrix[3][2] = true;
		//X X X X X
		//X X O X X
		//X O X O X
		//X X O X X
		//X X X X X
	}
	else if(n == 13)
	{
		for(i = 0; i < testWidth; i++)
		{
			correctMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				correctMatrix[i][j] = false;
			}
		}
		correctMatrix[1][1] = true;
		correctMatrix[2][1] = true;
		correctMatrix[1][3] = true;
		correctMatrix[2][3] = true;
		correctMatrix[3][2] = true;
		//X X X X X
		//X O O X X
		//X X X O X
		//X O O X X
		//X X X X X
	}
	else if(n == 14)
	{
		for(i = 0; i < testWidth; i++)
		{
			correctMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				correctMatrix[i][j] = false;
			}
		}
		correctMatrix[1][1] = true;
		correctMatrix[1][2] = true;
		correctMatrix[3][1] = true;
		correctMatrix[2][3] = true;
		correctMatrix[3][2] = true;
		//X X X X X
		//X O X O X
		//X O X O X
		//X X O X X
		//X X X X X
	}
	else if(n == 15)
	{
		for(i = 0; i < testWidth; i++)
		{
			correctMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				correctMatrix[i][j] = false;
			}
		}
		correctMatrix[0][0] = true;
		correctMatrix[0][4] = true;
		correctMatrix[4][0] = true;
		correctMatrix[4][4] = true;
		//O X X X O
		//X X X X X
		//X X X X X
		//X X X X X
		//O X X X O
	}
	else if(n == 16)
	{
		for(i = 0; i < testWidth; i++)
		{
			correctMatrix[i] = new Array;
			for(j = 0; j < testHeight; j++)
			{
				correctMatrix[i][j] = false;
			}
		}
		correctMatrix[0][1] = true;
		correctMatrix[0][3] = true;
		correctMatrix[4][1] = true;
		correctMatrix[4][3] = true;
		correctMatrix[1][0] = true;
		correctMatrix[1][4] = true;
		correctMatrix[3][0] = true;
		correctMatrix[3][4] = true;
		//X O X O X
		//O X X X O
		//X X X X X
		//O X X X O
		//X O X O X
	}	
	return correctMatrix;
}

//待测函数，由于不支持输入指定状态求解下一状态，于是加入了canvasUpdata_Load(testMatrix)方法，见下方
var canvasUpdate = function(){
	//获得canvas画布状态数据
	var cxt = $("#myCanvas")[0].getContext("2d");
	
	var gameOfLifeCanvasWidth = testWidth;
	var gameOfLifeCanvasHeight = testHeight;

	var data = cxt.getImageData(0, 0, $("#myCanvas")[0].width, $("#myCanvas")[0].height).data;
	
	//求解新状态矩阵，由于getImageData方法只返回一个一维数组，于是需要用*4+3的方式映射到对应像素的透明度值
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

	//利用计算好的新状态矩阵重新绘制画布
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
	return newdata;//测试矩阵正确性，需要返回新状态矩阵，此语句只在测试的js档里出现
}

//为了使canvasUpdate方法适用于测试指定状态的转化，增加了canvasUpdate_Load方法，思路为：按照给定的矩阵来重新绘制画布，
//再调用依据画布状态数据作计算的canvasUpdate方法来间接求解指定状态的新状态矩阵
var canvasUpdate_Load = function(testMatrix){
	var cxt = $("#myCanvas")[0].getContext("2d");
	var c = $("#myCanvas")[0];
	c.width = c.width; //清除画布
	
	cxt.fillStyle = "#FFFFFF";
	for(var i = 0; i < testWidth; i++)
		for(var j = 0; j < testHeight; j++){
			if(testMatrix[i][j])
			{
				cxt.fillRect(i * 5, j * 5, 5, 5);
			}
		}
	return canvasUpdate();
}

//各种测试，共16个样例，每个编号对应了一个指定状态及我们期望得到的解，具体图像可以参考上面的testMatrixGenerate及correctMatrixGenerate方法
test("Game of Life: test1", function(){
	deepEqual(canvasUpdate_Load(testMatrixGenerate(1)), correctMatrixGenerate(1), "Passed!");
})
test("Game of Life: test2", function(){
	deepEqual(canvasUpdate_Load(testMatrixGenerate(2)), correctMatrixGenerate(2), "Passed!");
})
test("Game of Life: test3", function(){
	deepEqual(canvasUpdate_Load(testMatrixGenerate(3)), correctMatrixGenerate(3), "Passed!");
})
test("Game of Life: test4", function(){
	deepEqual(canvasUpdate_Load(testMatrixGenerate(4)), correctMatrixGenerate(4), "Passed!");
})
test("Game of Life: test5", function(){
	deepEqual(canvasUpdate_Load(testMatrixGenerate(5)), correctMatrixGenerate(5), "Passed!");
})
test("Game of Life: test6", function(){
	deepEqual(canvasUpdate_Load(testMatrixGenerate(6)), correctMatrixGenerate(6), "Passed!");
})
test("Game of Life: test7", function(){
	deepEqual(canvasUpdate_Load(testMatrixGenerate(7)), correctMatrixGenerate(7), "Passed!");
})
test("Game of Life: test8", function(){
	deepEqual(canvasUpdate_Load(testMatrixGenerate(8)), correctMatrixGenerate(8), "Passed!");
})
test("Game of Life: test9", function(){
	deepEqual(canvasUpdate_Load(testMatrixGenerate(9)), correctMatrixGenerate(9), "Passed!");
})
test("Game of Life: test10", function(){
	deepEqual(canvasUpdate_Load(testMatrixGenerate(10)), correctMatrixGenerate(10), "Passed!");
})
test("Game of Life: test11", function(){
	deepEqual(canvasUpdate_Load(testMatrixGenerate(11)), correctMatrixGenerate(11), "Passed!");
})
test("Game of Life: test12", function(){
	deepEqual(canvasUpdate_Load(testMatrixGenerate(12)), correctMatrixGenerate(12), "Passed!");
})
test("Game of Life: test13", function(){
	deepEqual(canvasUpdate_Load(testMatrixGenerate(13)), correctMatrixGenerate(13), "Passed!");
})
test("Game of Life: test14", function(){
	deepEqual(canvasUpdate_Load(testMatrixGenerate(14)), correctMatrixGenerate(14), "Passed!");
})
test("Game of Life: test15", function(){
	deepEqual(canvasUpdate_Load(testMatrixGenerate(15)), correctMatrixGenerate(15), "Passed!");
})
test("Game of Life: test16", function(){
	deepEqual(canvasUpdate_Load(testMatrixGenerate(16)), correctMatrixGenerate(16), "Passed!");
})
var player_x, player_y;
var player_troop_x, player_troop_y;
var totalCountry = 8;
var totalRow = 10;
var totalColumn = 10;
var totalTurn = 1;
var newTurn = true;
var land1 = "grass";
var land2 = "mountain";
var land3 = "water";
var city = "city";
var playerCity = "playerCity";
var selected = "selected";
var over = "over";
var gameState = "view";
var troopPic = "gb.gif";
var map;
var land1Text = "background: url(others/grass.jpg) no-repeat; width: 50px; height: 50px; border: 3px outset";
var land2Text = "background: url(others/mountain.jpg) no-repeat; width: 50px; height: 50px; border: 3px outset;";
var land3Text = "background: url(others/water.jpg) no-repeat; width: 50px; height: 50px; border: 3px outset;";
var cityText = ["background: url(country/china.jpg) no-repeat; width: 50px; height: 50px; border: 3px outset;",
				"background: url(country/brazil.jpg) no-repeat; width: 50px; height: 50px; border: 3px outset;",
				"background: url(country/germany.jpg) no-repeat; width: 50px; height: 50px; border: 3px outset;",
				"background: url(country/netherlands.jpg) no-repeat; width: 50px; height: 50px; border: 3px outset;",
				"background: url(country/argentina.jpg) no-repeat; width: 50px; height: 50px; border: 3px outset;",
				"background: url(country/france.jpg) no-repeat; width: 50px; height: 50px; border: 3px outset;",
				"background: url(country/uruguay.jpg) no-repeat; width: 50px; height: 50px; border: 3px outset;",
				"background: url(country/usa.jpg) no-repeat; width: 50px; height: 50px; border: 3px outset;"];
var country = ["China", "Brazil", "Germany", "Netherlands", "Argentina", "France", "Uruguay", "USA"];
var players;
var cityInfo = [];
var pcityText = cityText[0];
var player_China = [];
var player_Brazil = [];
var player_Germany = [];
var player_Netherlands = [];
var player_Argentina = [];
var player_France = [];
var player_Uruguay = [];
var player_USA = [];
var tempText;
var player_Country = [player_China, player_Brazil, player_Germany, player_Netherlands, player_Argentina, player_France, player_Uruguay, player_USA];
var money= [0, 0, 0, 0, 0, 0, 0, 0];
var alive=[true,true,true,true,true,true,true,true];
var aliveNumber=8;
var AI_position_x = [];
var AI_position_y = [];
function build(){
	$.getJSON("players.json", function(jsonobj){players = jsonobj.player; assignPlayer();});
	buildmap();
	$("#war").bind("click", toWarMode);
	$("#cancel").bind("click", toViewMode);
	$("#train").bind("click", toTrainMode);
	$("#endturn").bind("click", endTurn);
	$("#turn")[0].innerHTML = "Turn: " + totalTurn;
	$("#war")[0].disabled = true;
	$("#cancel")[0].disabled = true;
	$("#train")[0].disabled = true;
	getAICoordinate();
}
function buildmap(){
	for(var i = 0; i < totalRow; i++)//构建表格
	{
		var y = document.createElement("tr");
		y.className = "y" + String(i);
		for(var j = 0; j < totalColumn; j++)
		{
			var x = document.createElement("td");
			x.className = "y" + String(i) + "x" + String(j);
			x.onclick = selectedAction;
			x.onmouseover = overAction;
			var ran = Math.random();
			//随机加入基本地形
			if(ran < 5/6)
			{
				x.className = land1 + " " + x.className;
				x.style.cssText = land1Text;
			}
			else if(ran >= 5/6 && ran < 11/12)
			{
				x.className = land2 + " " + x.className;
				x.style.cssText = land2Text;
			}
			else
			{
				x.className = land3 + " " + x.className;
				x.style.cssText = land3Text;
			}
			x.innerHTML="<div>("+String(j) + "," + String(i)+")</div>"
			y.appendChild(x);
		}
		$("#map")[0].appendChild(y);
	}
	for(var i = 0; i < totalCountry; i++)//随机构建国家位置，在class中加入国家信息
	{
		var x = Math.floor(Math.random() * 10 - 0.001);
		var y = Math.floor(Math.random() * 10 - 0.001);
		var label = ".y" + String(y) + "x" + String(x);
		var target = $(label)[0];
		while($(label).hasClass(city))
		{
			x = Math.floor(Math.random() * 10 - 0.001);
			y = Math.floor(Math.random() * 10 - 0.001);
			label = ".y" + String(y) + "x" + String(x);
			target = $(label)[0];
		}
		target.className = country[i] + " " + city + " " + target.className;
		target.style.cssText = cityText[i];
		if(i == 0)//初始化玩家数据
		{
			player_x = x;
			player_y = y;
			player_troop_x = x;
			player_troop_y = y;
			target.className = playerCity + " " + target.className;
			target.style.cssText = pcityText;
		}
	}
}
function assignPlayer(){
	//初始化球员数据
	for(var i = 0; i < totalCountry; i++)
	{	
		for(var j = 0; j < 200; j++) player_Country[i][j] = 0;
		for(var j = 0; j < players.length; j++)
		{
			if(players[j].country == country[i])
			{
				player_Country[i][j] = 1;
			}
		}
	}
}
function savemap(){
	map = $("#map")[0];
}
function loadmap(){
	var m = $("#map")[0];
	m.remove();
	document.body.appendChild(map);
}
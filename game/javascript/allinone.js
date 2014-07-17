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

function calculateATK(teamA)
{
	var sum=0, n=0;
	for (var j=0; j<players.length; j++)
		if (player_Country[teamA][j])
		{
			n++;
			sum+=players[j].atk;
		}
	return (sum/n);
}

function calculateDEF(teamA)
{
	var sum=0, n=0;
	for (var j=0; j<players.length; j++)
		if (player_Country[teamA][j])
		{
			n++;
			sum+=players[j].def;
		}
	return (sum/n);
}

function calculateNumber(teamA)
{
	var sum=0, n=0;
	for (var j=0; j<players.length; j++)
		if (player_Country[teamA][j])
		{
			n++;
		}
	return (n);
}

function removeCountry(n)
{
	var s=$("."+country[n]);
	$(s).removeClass("city");
	$(s).removeClass(country[n]);
	if($(s).hasClass(land1))
	{
		$(s)[0].style.cssText = land1Text;
	}
	else if($(s).hasClass(land2))
	{
		$(s)[0].style.cssText = land2Text;
	}
	else if($(s).hasClass(land3))
	{
		$(s)[0].style.cssText = land3Text;
	}
}

function battle(teamA, teamB, Ax, Ay, Bx, By)
{	
	//计算双方地形加成，中国队地形复杂（非草地）时战斗力为1.2倍，其他国家为0.9倍
	var A = ".y" + Ay + "x" + Ax;
	var B = ".y" + By + "x" + Bx;
	var landA = $(A);
	var landB = $(B);
	var landAco = 1;
	var landBco = 0.9;
	if(!landA.hasClass(land1))
	{
		landAco = 1.2;
	}
	if(landB.hasClass(land1))
	{
		landBco = 1;
	}
	//计算双方战斗力
	var ATK_A, DEF_A, ATK_B, DEF_B;
	ATK_A=calculateATK(teamA) * landAco *(1+0.05*Math.random());
	ATK_B=calculateATK(teamB) * landBco *(1+0.05*Math.random());
	DEF_A=calculateDEF(teamA) * landAco *(1+0.05*Math.random());
	DEF_B=calculateDEF(teamB) * landBco *(1+0.05*Math.random());
	//根据战斗力计算比赛比分
	goal_A=ATK_A/DEF_B;
	if (goal_A<1)
		goal_A=0;
	else
		goal_A=Math.floor((goal_A-1)*10);
	goal_B=ATK_B/DEF_A;
	if (goal_B<1)
		goal_B=0;
	else
		goal_B=Math.floor((goal_B-1)*10);
	//显示赛果，刷新数据
	$("#message")[0].innerHTML = "<p><h1>赛果:</h1></p><p><h1>"+goal_A+":"+goal_B+"</h1></p>";
	var board=$("#cityInfo")[0];
	tempText = board.innerHTML;
	board.innerHTML = "<img id='board' src='others/field.jpg'/>"+ "<div id='teamA'> </div>"+"<div id='teamB'> </div>";
	$("#teamA").css("background-image","url('country/large"+teamA+".gif')");
	$("#teamB").css("background-image","url('country/large"+teamB+".gif')");
	gameState = "battled";
	if (goal_A<goal_B) //玩家负
	{
		$("#teamA").animate({opacity: 0});
		return 0;
	}
	else
		if (goal_A==goal_B) //平局
		{
			return 1;
		}
		else {
			$("#teamB").animate({opacity: 0});//玩家胜
			return 2;
		}
}
function FindTheBestPlayer(TeamA)
{
	//遍历某国家球员名单，求能力最高者，返回其编号
	var max=0, num=-1;
	for (var j=0; j<players.length; j++)
		if (player_Country[TeamA][j])
		{
			if (players[j].atk+players[j].def>max)
			{
				max=players[j].atk+players[j].def;
				num=j;
			}
		}
	return num;
}

function FindTheMinPlayer(TeamA)
{
	//遍历某国家球员名单，求能力最低者，返回其编号
	var min=100000000, num=-1;
	for (var j=0; j<players.length; j++)
		if (player_Country[TeamA][j])
		{
			if (players[j].atk+players[j].def<min)
			{
				min=players[j].atk+players[j].def;
				num=j;
			}
		}
	return num;
}

function getPlayer(TeamA, TeamB)
{
	//将最佳球员的所有权转移
	var x=FindTheBestPlayer(TeamB);
	player_Country[TeamB][x]=0;
	player_Country[TeamA][x]=1;
	return x;
}

function selectedAction(){
	if(gameState == "view")//普通模式分支
	{
		var s = $(".selected");////重置之前利用此函数修改了边框的方格的样式
		if(s.length != 0)
		{
			for(var i = 0; i < s.length; i++)
			{
				s[i].style.border = "3px outset";
			}
			s.removeClass(selected);
		}
		this.className = selected + " " + this.className;//修改当前selected方格的边框样式
		this.style.border = "3px outset red";
		s = $(".selected");
		if(s.hasClass(playerCity))//若为玩家操作的国家，载入国家信息，命令栏改动
		{
			$("#cityInfo")[0].innerHTML = "<p class='countryName'></p>"+"<p class='money'> </p>";//载入国家信息
			$(".countryName")[0].innerHTML = country[0];
			$("#cityInfo")[0].style.cssText += "background: url(flag/flag" + 0 +".jpg);";
			$(".money")[0].innerHTML ="Money: "+money[0]+"$";
			for(var j = 0; j < 200; j++)
			{
				if(player_Country[0][j] == 1)
				{
					$("#cityInfo")[0].innerHTML = $("#cityInfo")[0].innerHTML + "<div class ='player' id='player" + j + "' onclick=playerSelected(" + j + ") onmouseover=playerOver(" + j + ") style='border-bottom: 1px solid black;'><span style='margin:20px;'>" + players[j].name +
								"</span><span style='margin-right:20px;'>" + "ATK:" + players[j].atk + "</span><span>" + "DEF:" + players[j].def + "</span>"+
								"<img id='head' src='img/"+players[j].url+"' ,width='100' height='100'/>"+"</div>";
				}
			}
			if(newTurn)//若本回合未执行完指令，训练以及战争按钮可视，可用。
			{
				$("#war")[0].style.opacity = 1;
				$("#warText")[0].style.opacity = 1;
				$("#train")[0].style.opacity = 1;
				$("#trainText")[0].style.opacity = 1;
				$("#war")[0].disabled = false;
				$("#train")[0].disabled = false;
			}
			$("#endturn")[0].style.opacity = 1;
			$("#endText")[0].style.opacity = 1;
			$("#endturn")[0].disabled = false;
		}
		else
		{
			if(s.hasClass(city))//若为其他国家，左方载入该国家信息
			{
				$("#cityInfo")[0].innerHTML = "<p class='countryName'></p>"+"<p class='money'> </p>";
				for(i; i < totalCountry; i++)
				{
					if(s.hasClass(country[i]))
					{
						$(".countryName")[0].innerHTML = country[i];
						$("#cityInfo")[0].style.cssText += "background: url(flag/flag" + i +".jpg);";
						$(".money")[0].innerHTML ="Money: "+money[i]+"$";
						for(var j = 0; j < 200; j++)
						{
							if(player_Country[i][j] == 1)
							{
								$("#cityInfo")[0].innerHTML = $("#cityInfo")[0].innerHTML + "<div class ='player' id='player" + j + "' onclick=playerSelected(" + j + ") onmouseover=playerOver(" + j + ") style='border-bottom: 1px solid black;'><span style='margin:20px;'>" + players[j].name +
								"</span><span style='margin-right:20px;'>" + "ATK:" + players[j].atk + "</span><span>" + "DEF:" + players[j].def + "</span>"+
								"<img id='head' src='img/"+players[j].url+"' ,width='100' height='100'/>"+"</div>";
							}
						}
						break;
					}
				}
			}
			$("#war")[0].style.opacity = 0;//非可操作国家，所有按钮不可见，不可用
			$("#warText")[0].style.opacity = 0;
			$("#train")[0].style.opacity = 0;
			$("#trainText")[0].style.opacity = 0;
			$("#endturn")[0].style.opacity = 0;
			$("#endText")[0].style.opacity = 0;
			$("#war")[0].disabled = true;
			$("#train")[0].disabled = true;
			$("#endturn")[0].disabled = true;
		}
	}
	else if(gameState == "war")//战争模式分支
	{
		if(!newTurn) return;//如果本回合已经执行过指令，直接返回，避免一回合多行动的bug
		//取得当前玩家坐标
		var c = this.className;
		var y = Number(c.substring(c.length - 3, c.length - 2));
		var x = Number(c.substring(c.length - 1, c.length));
		var s = ".y" + player_troop_y + "x" + player_troop_x;
		var t = ".y" + y + "x" + x;
		//可移动判定
		if(canMove(player_troop_x, player_troop_y, x, y))//可移动
		{
			if(!$(t).hasClass(city))//选取的非其它国家
			{
				//修改方格图标
				$(s).removeClass("China");
				$(s).removeClass("selected");
				$(s).removeClass("playerCity");
				$(s).removeClass("city");
				if($(s).hasClass(land1))
				{
					$(s)[0].style.cssText = land1Text;
				}
				else if($(s).hasClass(land2))
				{
					$(s)[0].style.cssText = land2Text;
				}
				else if($(s).hasClass(land3))
				{
					$(s)[0].style.cssText = land3Text;
				}
				moveTo(x, y);//移动
			}
			else
			{
				//$("#message")[0].innerHTML = "你不能移动到其他国家的球队上!";
				for(i=1; i < totalCountry; i++)
				{
					if($(t).hasClass(country[i]))//若选取了其它国家，触发比赛
					{
						var result=battle(0, i, player_troop_x, player_troop_y, x, y);//比赛函数
						var tmp_m;
						if (result==0)//结算，修改胜负双方金钱以及球员，玩家负分支
						{
							var p = getPlayer(i,0);
							tmp_m=Math.floor(money[0]/2);
							money[0]-=tmp_m;
							money[i]+=tmp_m;
							$("#message")[0].innerHTML += "战败损失金钱 $" + tmp_m + " 以及你的最佳球员: " + players[p].name + "!";
							if (calculateNumber(0)<=0)//若已经被淘汰，游戏结束，给出提示
							{
								alive[0]=false;
								removeCountry(0);
								$("#cityInfo")[0].innerHTML = "";
								$("#message")[0].innerHTML="Game Over!";
								$("#cancel")[0].style.opacity = 0;
								$("#cancelText")[0].style.opacity = 0;
								$("#war")[0].style.opacity = 0;
								$("#warText")[0].style.opacity = 0;
								$("#train")[0].style.opacity = 0;
								$("#trainText")[0].style.opacity = 0;
								$("#endturn")[0].style.opacity = 0;
								$("#endText")[0].style.opacity = 0;
								$("#war")[0].disabled = true;
								$("#train")[0].disabled = true;
								$("#cancel")[0].disabled = true;
								$("#endturn")[0].disabled = true;
								return;
							}
						}
						else
						if (result==2)//结算，修改胜负双方金钱以及球员，玩家胜分支
						{
							var p = getPlayer(0,i);
							tmp_m=Math.floor(money[i]/2);
							money[i]-=tmp_m;
							money[0]+=tmp_m;
							$("#message")[0].innerHTML += "战胜获得金钱 $" + tmp_m + " 以及对方的最佳球员: " + players[p].name + "!";
							if (calculateNumber(i)<=0)
							{
								alive[i]=false;
								removeCountry(i);
								--aliveNumber;
								if (aliveNumber==1)//若已经淘汰所有其他国家，游戏结束，给出提示
								{
									$("#cityInfo")[0].innerHTML = "";
									$("#message")[0].innerHTML="胜利！游戏结束";
									$("#cancel")[0].style.opacity = 0;
									$("#cancelText")[0].style.opacity = 0;
									$("#war")[0].style.opacity = 0;
									$("#warText")[0].style.opacity = 0;
									$("#train")[0].style.opacity = 0;
									$("#trainText")[0].style.opacity = 0;
									$("#endturn")[0].style.opacity = 0;
									$("#endText")[0].style.opacity = 0;
									$("#war")[0].disabled = true;
									$("#train")[0].disabled = true;
									$("#cancel")[0].disabled = true;
									$("#endturn")[0].disabled = true;
									return;
								}
							}
						}
					}
				}
				//比赛结束，该回合其它指令不能使用
				$("#cancel")[0].style.opacity = 0;
				$("#cancelText")[0].style.opacity = 0;
				$("#war")[0].style.opacity = 0;
				$("#warText")[0].style.opacity = 0;
				$("#train")[0].style.opacity = 0;
				$("#trainText")[0].style.opacity = 0;
				//$("#endturn")[0].style.opacity = 0;
				$("#war")[0].disabled = true;
				$("#train")[0].disabled = true;
				$("#cancel")[0].disabled = true;
				$("#endturn")[0].disabled = false;
				newTurn = false;
				
			}
		}
		else //如果选取的方格太远，给出提示
		{
			$("#message")[0].innerHTML = "一个回合只能走一步!";
		}
		
	}
}
function overAction(){
	var o = $(".over");//重置之前利用此函数修改了边框的方格的样式
	if(o.length != 0)
	{
		for(var i = 0; i < o.length; i++)
		{
			o[i].style.border = "3px outset";
		}
		o.removeClass(over);
	}
	this.className = over + " " + this.className;//修改当前over的方格的边框样式
	this.style.border = "3px outset red";
	var s = $(".selected");//重新加入被点击选中的方格的边框
	if(s.length != 0) s[0].style.border = "3px outset red";
	o = $(".over");
	var i = 0;
	if($("[class*=selected][class*=city]").length == 0)//若已经选中了某个国家，锁定左方信息内容，否则清空
	{
		$("#cityInfo")[0].innerHTML = "<p class='countryName'></p>"+"<p class='money'> </p>";
		for(i; i < totalCountry; i++)
		{
			if(o.hasClass(country[i]))//载入被选中的国家的数据
			{
				$(".countryName")[0].innerHTML = country[i];
				$("#cityInfo")[0].style.cssText += "background: url(flag/flag" + i +".jpg);";
				$(".money")[0].innerHTML ="Money: "+money[i]+"$";
				for(var j = 0; j < 200; j++)
				{
					if(player_Country[i][j] == 1)
					{
						$("#cityInfo")[0].innerHTML = $("#cityInfo")[0].innerHTML + "<div class ='player' id='player" + j + "' onclick=playerSelected(" + j + ") onmouseover=playerOver(" + j + ") style='border-bottom: 1px solid black;'><span style='margin:20px;'>" + players[j].name +
						"</span><span style='margin-right:20px;'>" + "ATK:" + players[j].atk + "</span><span>" + "DEF:" + players[j].def + "</span>"+
						"<img id='head' src='img/"+players[j].url+"' ,width='100' height='100'/>"+"</div>";
					}
				}
				break;
			}
	}
		if(i == totalCountry)//清空左方信息栏内容
		{
			$("#cityInfo")[0].innerHTML = "<p class='countryName'></p>";
			$("#cityInfo")[0].style.cssText = "";
		}
	}
}
function getAICoordinate(){
	//得到所有电脑玩家的坐标
	for(var i = 1; i < totalCountry; i++)
	{
		var s = "." + country[i];
		var c = $(s)[0].className;
		AI_position_x[i] = Number(c.substring(c.length - 1, c.length));
		AI_position_y[i] = Number(c.substring(c.length - 3, c.length - 2));
	}
}
function canMove(x0, y0, x1, y1){
	//x0, y0为当前玩家坐标，x1, y1为玩家选择的方格的坐标
	var s = ".y" + y1 + "x" + x1;
	if(x1 == x0)
	{
		if(y1 != y0 + 1 && y1 != y0 - 1) return false;
		else return true;
	}
	else if(x1 == x0 + 1 || x1 == x0 - 1)
	{
		if(y1 != y0) return false;
		else return true;
	}
	else return false;
}

function playerSelected(j){
	if(gameState != "train") return;//判断是否为训练模式，避免一回合多行动的bug
	if(money[0]< players[j].atk+players[j].def)//金钱不足
	{
		$("#message")[0].innerHTML = "你没有足够的金钱来训练这位球员!";
		return;
	}
	var a = "#player" + j;
	var tmp = players[j].atk+players[j].def;
	money[0]-=players[j].atk+players[j].def;
	var atkplus = Math.floor(Math.random()*4-0.0001);//随机增加攻击及防守能力
	var defplus = Math.floor(Math.random()*4-0.0001)
	players[j].atk += atkplus;
	players[j].def += defplus;
	$(".money")[0].innerHTML ="Money: "+money[0]+"$";
	//刷新球员列表数据
	$(a)[0].innerHTML = "<span style='margin:20px;'>" + players[j].name +
						"</span><span style='margin-right:20px;'>" + "ATK:" + players[j].atk + "</span><span>" + "DEF:" + players[j].def + "</span>"+
						"<img id='head' src='img/"+players[j].url+"' ,width='100' height='100'/>";
	//给出提示
	$("#message")[0].innerHTML = "对 " + players[j].name + " 的训练已经结束,攻击增加 " + atkplus + "点,防守增加 " + defplus + "点,花费金钱 $" + tmp +".";
	//回合结束，修改模式，屏蔽不可用选项
	newTurn = false;					
	gameState = "view";
	$("#cancel")[0].style.opacity = 0;
	$("#cancelText")[0].style.opacity = 0;
	$("#war")[0].style.opacity = 0;
	$("#warText")[0].style.opacity = 0;
	$("#train")[0].style.opacity = 0;
	$("#trainText")[0].style.opacity = 0;
	$("#war")[0].disabled = true;
	$("#train")[0].disabled = true;
	$("#cancel")[0].disabled = true;
	$("#endturn")[0].style.opacity = 1;
	$("#endText")[0].style.opacity = 1;
	$("#endturn")[0].disabled = false;
}
function playerOver(j){
	if(gameState != "train") return;
	$("#message")[0].innerHTML = "训练此球员需要的金钱为 $" + (players[j].atk + players[j].def) + ".";
}

function moveTo(x, y){
	//根据坐标利用jQuery找到目的地方格，刷新目的地标签以及外观
	player_troop_x = x;
	player_troop_y = y;
	var a = searchByXY(player_troop_x, player_troop_y);
	var b = searchByXY(player_troop_x, player_troop_y)[0];
	a.removeClass("over");
	b.style.cssText = pcityText;
	b.style.border = "3px outset red;";
	b.className = "selected playerCity China city " + b.className;
	//移动结束，屏蔽不可用选项
	$("#cancel")[0].style.opacity = 0;
	$("#cancelText")[0].style.opacity = 0;
	$("#war")[0].style.opacity = 0;
	$("#warText")[0].style.opacity = 0;
	$("#train")[0].style.opacity = 0;
	$("#trainText")[0].style.opacity = 0;
	$("#war")[0].disabled = true;
	$("#train")[0].disabled = true;
	$("#cancel")[0].disabled = true;
	$("#endturn")[0].style.opacity = 1;
	$("#endText")[0].style.opacity = 1;
	$("#endturn")[0].disabled = false;
	gameState = "view";
	newTurn = false;
}
function searchByXY(x, y){
	var search = "." + "y" + y + "x" + x;
	return $(search);
}
function toWarMode(){
	gameState = "war";//修改游戏模式，更新可用按钮
	$("#cancel")[0].style.opacity = 1;
	$("#cancelText")[0].style.opacity = 1;
	$("#cancel")[0].disabled = false;
	$("#war")[0].style.opacity = 0;
	$("#warText")[0].style.opacity = 0;
	$("#war")[0].disabled = true;
	$("#train")[0].style.opacity = 0;
	$("#trainText")[0].style.opacity = 0;
	$("#train")[0].disabled = true;
	$("#endturn")[0].style.opacity = 0;
	$("#endText")[0].style.opacity = 0;
	$("#endturn")[0].disabled = true;
}
function toTrainMode(){
	gameState = "train";//修改游戏模式，更新可用按钮
	$("#cancel")[0].style.opacity = 1;
	$("#cancelText")[0].style.opacity = 1;
	$("#cancel")[0].disabled = false;
	$("#war")[0].style.opacity = 0;
	$("#warText")[0].style.opacity = 0;
	$("#war")[0].disabled = true;
	$("#train")[0].style.opacity = 0;
	$("#trainText")[0].style.opacity = 0;
	$("#train")[0].disabled = true;
	$("#endturn")[0].style.opacity = 0;
	$("#endText")[0].style.opacity = 0;
	$("#endturn")[0].disabled = true;
}
function toViewMode(){
	gameState = "view";//修改游戏模式，更新可用按钮
	$("#cancel")[0].style.opacity = 0;
	$("#cancelText")[0].style.opacity = 0;
	$("#cancel")[0].disabled = true;
	$("#war")[0].style.opacity = 1;
	$("#warText")[0].style.opacity = 1;
	$("#war")[0].disabled = false;
	$("#train")[0].style.opacity = 1;
	$("#trainText")[0].style.opacity = 1;
	$("#train")[0].disabled = false;
	$("#endturn")[0].style.opacity = 1;
	$("#endText")[0].style.opacity = 1;
	$("#endturn")[0].disabled = false;
}

function AIcanMove(x1, y1)
{
	if (0>x1 || x1>9 || 0>y1 || y1>9) return 0;
	var s = ".y" + y1 + "x" + x1;
	if($(s).hasClass(city)) return 1;
	return 2;
}

function AIMoveto(n, x, y)
{
	//更新目的地图片及信息
	var s = ".y" + y + "x" + x;
	var t = "." + country[n];
	if($(t).hasClass(land1))
	{
		$(t)[0].style.cssText = land1Text;
	}
	else if($(t).hasClass(land2))
	{
		$(t)[0].style.cssText = land2Text;
	}
	else $(t)[0].style.cssText = land3Text;
	$(t).removeClass(city);
	$(t).removeClass(country[n]);
	$(s)[0].className = "city " + country[n] + " " + $(s)[0].className;
	$(s)[0].style.cssText = cityText[n];
}

function AIbattle(teamA, teamB, Ax, Ay, Bx, By)
{	
	//计算双方战斗力
	var landAco = 1;
	var landBco = 1;
	var ATK_A, DEF_A, ATK_B, DEF_B;
	ATK_A=calculateATK(teamA) * (1+0.05*Math.random());
	ATK_B=calculateATK(teamB) * (1+0.05*Math.random());
	DEF_A=calculateDEF(teamA) * (1+0.05*Math.random());
	DEF_B=calculateDEF(teamB) * (1+0.05*Math.random());
	goal_A=ATK_A/DEF_B;
	if (goal_A<1)
		goal_A=0;
	else
		goal_A=Math.floor((goal_A-1)*10);
	goal_B=ATK_B/DEF_A;
	if (goal_B<1)
		goal_B=0;
	else
		goal_B=Math.floor((goal_B-1)*10);
	if (goal_A<goal_B) 
	{
		return 0;
	}
	else
		if (goal_A==goal_B) 
		{
			return 1;
		}
		else {
			return 2;
		}
}

function AIaction(n)
{
	var a=FindTheMinPlayer(n);//找到最差的球员
	var dx=[1,0,-1,0];
	var dy=[0,1,0,-1];
	if (money[n]>=players[a].atk+players[a].def)//若金钱足够，训练此球员
	{
		money[n]-=players[a].atk+players[a].def;
		players[a].atk += Math.floor(Math.random()*4-0.0001);
		players[a].def += Math.floor(Math.random()*4-0.0001);
	}
	else{//否则随机移动
		var x, y;
		ran=Math.floor(Math.random()*4-0.0001);
		for (var j=0; j<4;j++)
		{
			i=(j+ran)%4;
			x=AI_position_x[n]+dx[i];
			y=AI_position_y[n]+dy[i];
			flag=AIcanMove(x, y);
			if (flag==2)
			{
				AIMoveto(n, x, y);
				AI_position_x[n]=x;
				AI_position_y[n]=y;
				break;
			}
			else if (flag==1)
			{
				m=-1;
				for (var k=1; k<8; k++)
					if (AI_position_x[k]==x && AI_position_y[k]==y)
					{
						m=k;
						break;
					}
				if (m==-1) continue;
				//触发电脑比赛事件，更新数据，刷新提示
				var result=AIbattle(n,m);
				if  (result==0)
				{
					var p = getPlayer(m,n);//玩家m得到玩家n的最佳球员
					//玩家m得到玩家n的一半金钱
					tmp_m=Math.floor(money[n]/2);
					money[n]-=tmp_m;
					money[m]+=tmp_m;
					$("#countryMessage")[0].innerHTML = country[n] + " 被 " + country[m] + " 击败,失去了他们的最佳球员: " + players[p].name + "!<br><br>" + $("#countryMessage")[0].innerHTML;
					if (calculateNumber(n)<=0)//若负方已经没有球员，更新数据，国家出局
					{
						alive[n]=false;
						removeCountry(n);
						--aliveNumber;
					}
				}
				else
					if (result==1)
					{
					
					}
					else
					{
							var p = getPlayer(n,m);
							tmp_m=Math.floor(money[m]/2);
							money[m]-=tmp_m;
							money[n]+=tmp_m;
							$("#countryMessage")[0].innerHTML = country[n] + " 打败了 " + country[m] + ", 得到了 " + country[m] + " 的最佳球员: " + players[p].name + "!<br><br>" + $("#countryMessage")[0].innerHTML;
							if (calculateNumber(m)<=0)
							{
								alive[m]=false;
								removeCountry(m);
								--aliveNumber;
							}
					}
				break;
			}
		}
	}
}

function endTurn(){
	//每个国家得到随机量的金钱
	var rm = 0;
	for (var i=0; i<8; i++)
	{
		ranm = Math.floor(Math.random()*100-0.0001);
		money[i]+= ranm;
		if(i == 0) rm = ranm;
	}
	if(gameState == "battled")
	{
		$("#cityInfo")[0].innerHTML = tempText;
	}
	//刷新玩家金钱显示
	if ($(".money").length>0)
		$(".money")[0].innerHTML ="Money: "+money[0]+"$";
	//AI行动
	for (var i=1; i<8; i++)
	{
		AIaction(i);
	}
	//alert("You've recived $" + rm + " from your sponsors in the new turn!");
	//刷新提示数据
	$("#message")[0].innerHTML = "";
	$("#message")[0].innerHTML += "你在新的一回合中收到了来自赞助商的赞助 $" + rm + " !";
	//更新游戏模式，跳转至可执行状态，更新回合数及显示，重新锁定到玩家所在地点
	gameState = "view";
	newTurn = true;
	totalTurn++;
	$(".playerCity")[0].onclick();
	$("#turn")[0].innerHTML = "Turn: " + totalTurn;
}
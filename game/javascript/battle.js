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
	board.style.overflow = "hidden";
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
function getPlayer(TeamA, TeamB)
{
	//将最佳球员的所有权转移
	var x=FindTheBestPlayer(TeamB);
	player_Country[TeamB][x]=0;
	player_Country[TeamA][x]=1;
	return x;
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

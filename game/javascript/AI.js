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
function selectedAction(){
	var i = 0;
	if(gameState == "view")//普通模式分支
	{
		var s = $(".selected");////重置之前利用此函数修改了边框的方格的样式
		if(s.length != 0)
		{
			for(i; i < s.length; i++)
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
				for(i = 1; i < totalCountry; i++)
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
			else
			{
				$("#cityInfo")[0].innerHTML = "";
				$("#cityInfo")[0].style.cssText = "";
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
				$("#endturn")[0].style.opacity = 1;
				$("#endText")[0].style.opacity = 1;
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
function searchByXY(x, y){
	var search = "." + "y" + y + "x" + x;
	return $(search);
}
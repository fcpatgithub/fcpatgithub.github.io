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
	$("#cityInfo")[0].style.overflow = "auto";
}
function showHelp(){
	$("#info")[0].style.opacity = 0.8;
	$("#info")[0].style.width = "500px";
	$("#info")[0].style.height = "400px";
	$("#info")[0].innerHTML = "带领中国队淘汰其他国家，勇夺世界杯吧！<br><br>在地图中选取中国队，右方会出现命令页面，同时左方会出现球员名单！";
	$("#info")[0].innerHTML += "每个回合可以获得金钱，金钱可以用来训练球员！点选训练按钮，选择你喜欢的球员进行培训！点选战争按钮，选择你想移动到的区域，如果该区域为其他国家，则会与该国家开始比赛！<br>";
	$("#info")[0].innerHTML += "比赛胜利可以获得对方最好的球员以及他们一半的金钱，比赛失败则相反！";
	$("#info")[0].innerHTML += "当某个国家失去所有球员，则宣告出局！<br><br>";
	$("#info")[0].innerHTML += "地形系统：为了挽救我国不堪入目的足球水平，加入地形系统作平衡~中国队在非草地地形上战斗，会有很大的优势哦，";
	$("#info")[0].innerHTML += "尽量在其他国家所处地形不佳时再发起挑战吧！(比赛结算考虑双方地形)<br><br>"
	$("#info")[0].innerHTML += "你的目标是将其他国家都淘汰出局，争取成为笑到最后的那个吧！<br>"
}
function hideHelp(){
	$("#info")[0].style.opacity = 0;
	$("#info")[0].style.width = "0";
	$("#info")[0].style.height = "0";
}
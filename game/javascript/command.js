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
var h3 = $('[div.right][class$="right_module"] h3')[0];
var d = document.createElement("input");
d.type = "button";
d.value = "按浏览量排序";
d.onclick = function(){sortByView()}
d.style.cssText = "margin: 10px; margin-left: 30px; font-family = Microsoft YaHei;";
var e = document.createElement("input");
e.type = "button";
e.value = "按回复量排序";
e.onclick = function(){sortByReply()}
e.style.cssText = "margin: 10px; font-family = Microsoft YaHei";
h3.appendChild(d);
h3.appendChild(e);
$('div a').each(function(){this.style.cssText = this.style.cssText + "font-family: Microsoft YaHei"; x++;});
function sortByView()
{
	a = $("span:contains('访问量')");
	b = $("ul.discuss-list li");
	var view = [];
	for(var i = 0; i < a.length; i++)
	{
		view[i] = Number(a[i].innerText.substring(5, a[i].length));
	}
	b = bubble_sort_special(view, b);
	c = b;
	for(var i = 0; i < b.length; i++)
	{
		b[i].remove();
	}
	for(var i = 0; i < c.length; i++)
	{
		$("ul.discuss-list")[0].appendChild(c[i]);
	}
}

function sortByReply()
{
	a = $("span:contains('回复')");
	b = $("ul.discuss-list li");
	var reply = [];
	for(var i = 0; i < a.length; i++)
	{
		reply[i] = Number(a[i].innerText.substring(4, a[i].length));
	}
	b = bubble_sort_special(reply, b);
	c = b;
	for(var i = 0; i < b.length; i++)
	{
		b[i].remove();
	}
	for(var i = 0; i < c.length; i++)
	{
		$("ul.discuss-list")[0].appendChild(c[i]);
	}	
}

function bubble_sort_special(a, b)
{
	for(var i = 0; i < a.length; i++)
	{
		for(var j = i + 1; j < a.length; j++)
		{
			if(a[i] < a[j])
			{
				temp = a[i];
				temp2 = b[i];
				a[i] = a[j];
				b[i] = b[j];
				a[j] = temp;
				b[j] = temp2;
			}
		}
	}
	return b;
}
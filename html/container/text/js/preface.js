//load control
var stalled_time = 0;

var player = document.getElementById("player");
var all_unit = document.getElementById("all_unit");
var loader = document.getElementById("loader");
var last = document.getElementById("last");

function remove_item_when_anime_finish()
{
	anime_begin_index = anime_begin_index + 1;
}

function skip()
{
	player.removeEventListener("stalled", all_unit_stop);
	player.removeEventListener("timeupdate", all_unit_start);
	player.volume = 0.1;
	loader.style.display = "none";
	all_unit.style.display = "none";
	last.style.display = "block";
}

function all_unit_stop()
{
	all_unit.style.opacity = "0.1";
	loader.style.display = "block";
	if(stalled_time > 3)
	{
		player.pause();
		alert("We just find your network sucks. Now let us skip this whole preface and get the main dish.")
		skip();
	}
	stalled_time = stalled_time + 1;
	player.addEventListener("timeupdate", all_unit_start);
}

function all_unit_start()
{
	loader.style.display = "none";
	all_unit.style.opacity = "1.0";
	player.removeEventListener("timeupdate", all_unit_start);
}

window.onload = function()
{
	player.volume = 0.5;
	player.play();
}

player.addEventListener("timeupdate", all_unit_start);
player.addEventListener("stalled", all_unit_stop);
player.addEventListener("ended", function()
{
	player.removeEventListener("stalled", all_unit_stop);
	player.removeEventListener("timeupdate", all_unit_start);
	loader.style.display = "none";
	all_unit.style.display = "block";
});

//follow the mouse move
function mouse_move(event)
{
	w = event.clientX;
	h = event.clientY;

	if(w < screen_w)
	{
		for(var i = 0;i < slider.length; i++)
		{
			slider.item(i).style.left = (original_pos_w[i] * 100 + (4 - i)) + "%";
		}
	}
	else
	{
		for(var i = 0;i < slider.length; i++)
		{
			slider.item(i).style.left = (original_pos_w[i] * 100 - (4 - i)) + "%";
		}
	}

	if(h < screen_h)
	{
		for(var i = 0;i < slider.length; i++)
		{
			slider.item(i).style.top = (original_pos_h[i] * 100 + (4 - i)) + "%";
		}
	}
	else
	{
		for(var i = 0;i < slider.length; i++)
		{
			slider.item(i).style.top = (original_pos_h[i] * 100 - (4 - i)) + "%";
		}
	}
}

var screen_w = window.innerWidth / 2;
var screen_h = window.innerHeight / 2;
var slider = document.getElementsByClassName("slide");
var original_pos_w = [];
var original_pos_h = [];
[].forEach.call(slider, function(a){original_pos_w.push((parseInt(window.getComputedStyle(a).left) / window.innerWidth).toFixed(2));});
[].forEach.call(slider, function(a){original_pos_h.push((parseInt(window.getComputedStyle(a).top) / window.innerHeight).toFixed(2));});
var w = 0;
document.addEventListener("mousemove", mouse_move, false);

window.onresize = function()
{
	screen_w = window.innerWidth / 2;
	screen_h = window.innerHeight / 2;
}
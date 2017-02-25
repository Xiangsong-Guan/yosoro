//load control
var stalled_time = 0;
var player = document.getElementById("player");
var all_unit = document.getElementById("all_unit");
var loader = document.getElementById("loader");
var last = document.getElementById("last");
var skip, all_unit_stop, all_unit_start;

skip = () =>
{
	player.removeEventListener("stalled", all_unit_stop);
	player.removeEventListener("timeupdate", all_unit_start);
	player.volume = 0.1;
	loader.style.display = "none";
	all_unit.style.display = "none";
	last.style.display = "block";
}

all_unit_start = () =>
{
	player.removeEventListener("timeupdate", all_unit_start);
	loader.style.display = "none";
	all_unit.style.opacity = "1.0";
}

all_unit_stop = () =>
{
	all_unit.style.opacity = "0.3";
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

player.addEventListener("timeupdate", all_unit_start);
player.addEventListener("waiting", all_unit_stop);

window.onload = () =>
{
	player.volume = 0.5;
	player.play();
}

//follow the mouse move #################此部分应该在最后实装到页面上，以保证之前的效率#################
var mouse_move;

mouse_move = (event) =>
{
	w = event.clientX;
	h = event.clientY;

	if(w < screen_w)
	{
		for(var i = 0; i < slider.length; i++)
		{
			slider.item(i).style.left = (original_pos_w[i] * 100 + (1 + (i % 4))) + "%";
		}
	}
	else
	{
		for(var i = 0; i < slider.length; i++)
		{
			slider.item(i).style.left = (original_pos_w[i] * 100 - (1 + (i % 4))) + "%";
		}
	}

	if(h < screen_h)
	{
		for(var i = 0; i < slider.length; i++)
		{
			slider.item(i).style.top = (original_pos_h[i] * 100 + (1 + (i % 4))) + "%";
		}
	}
	else
	{
		for(var i = 0; i < slider.length; i++)
		{
			slider.item(i).style.top = (original_pos_h[i] * 100 - (1 + (i % 4))) + "%";
		}
	}
}

var screen_w = window.innerWidth / 2;
var screen_h = window.innerHeight / 2;
var slider = document.getElementsByClassName("slide");
var original_pos_w = [];
var original_pos_h = [];
[].forEach.call(slider, (a) => {original_pos_w.push((parseInt(window.getComputedStyle(a).left) / window.innerWidth).toFixed(2));});
[].forEach.call(slider, (a) => {original_pos_h.push((parseInt(window.getComputedStyle(a).top) / window.innerHeight).toFixed(2));});
var w = 0;
document.addEventListener("mousemove", mouse_move, false);

window.onresize = () =>
{
	screen_w = window.innerWidth / 2;
	screen_h = window.innerHeight / 2;
}
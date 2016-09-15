var anime_begin_index = 0;
var stalled_time = 0;

var animes = document.getElementsByClassName("init_anime");
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
	player/removeEventListener("timeupdate", all_unit_start);
	player.volume = 0.3;
	all_unit.style.display = "none";
	last.style.display = "block";
	last.style.animationPlayState = "paused";
	last.style.transition = "opacity 2s ease-out 0s";
	last.style.opacity = "1.0";
}

function all_unit_stop()
{
	for(var i = anime_begin_index;i < animes.length; i++)
	{
		animes.item(i).style.animationPlayState = "paused";
	}
	all_unit.style.opacity = "0.3";
	loader.style.display = "block";
	stalled_time = stalled_time + 1;
	player.addEventListener("timeupdate", all_unit_start);
}

function all_unit_start()
{
	if(stalled_time > 3)
	{
		player.pause();
		alert("We just find your network sucks. Now let us skip this whole preface and get the main dish.")
		skip();
	}
	loader.style.display = "none";
	all_unit.style.opacity = "1.0";
	for(var i = anime_begin_index;i < animes.length; i++)
	{
		animes.item(i).style.animationPlayState = "running";
	}
	player.removeEventListener("timeupdate", all_unit_start);
}

window.onload = function()
{
	player.volume = 0.5;
	player.play();
}

for(var i = 0;i < animes.length; i++)
{
	animes.item(i).addEventListener("animationend", remove_item_when_anime_finish);
}
player.addEventListener("timeupdate", all_unit_start);
player.addEventListener("stalled", all_unit_stop);
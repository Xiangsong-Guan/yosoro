var animes = document.getElementsByClassName("init_anime");

[].forEach.call(animes, function(a){a.style.animationPlayState = "paused";});

window.onload = function()
{
	document.getElementById("loader").style.display= "none";
	[].forEach.call(animes, function(a){a.style.animationPlayState = "running";});
};
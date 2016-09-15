var animes = document.getElementsByClassName("init_anime");

window.onload = function()
{
	document.getElementById("loader").style.display= "none";
	[].forEach.call(animes, function(a){a.style.animationPlayState = "running";});
};

//for anime
var ver_poster = document.getElementById("ver_poster");

ver_poster.addEventListener("animationend", anime_end);

function anime_end()
{
	ver_poster.style.cssFloat = "left";
	ver_poster.style.position = "static";
}
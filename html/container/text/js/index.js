//loader
var animes = document.getElementsByClassName("init_anime");

window.onload = function()
{
	if(window.innerWidth < 715 || window.innerHeight < 490)
	{
		document.write("The RESLUTION of your divce is too SMALL to display this page PERFECTLY. If you can RESIZE the window, please REFRESH after the resize operation. We recommand 715 * 490(px) width at least.");
	}

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

//too small of reslution
window.onresize = function()
{
	if(window.innerWidth < 715 || window.innerHeight < 490)
	{
		document.write("The RESLUTION of your divce is too SMALL to display this page PERFECTLY. If you can RESIZE the window, please REFRESH after the resize operation. We recommand 715 * 490(px) width at least.");
	}
}
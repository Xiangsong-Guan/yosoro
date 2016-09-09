var ver_poster = document.getElementById("ver_poster");

ver_poster.addEventListener("animationend", anime_end);

function anime_end()
{
	ver_poster.style.cssFloat = "left";
	ver_poster.style.position = "static";
}
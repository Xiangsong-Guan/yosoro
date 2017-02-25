//too small of reslution
var res_check;

res_check = () =>
{
	if(window.innerWidth < 670)
	{
		document.write("The RESOLUTION of your divce is too SMALL to display this page PERFECTLY. If you can RESIZE the window, please REFRESH after the resize operation. We recommend 670px width at least. Whereas your resolution is " + window.innerWidth + " * " + window.innerHeight);
	}
}

window.onresize = res_check;

//loader
var animes = document.getElementsByClassName("init_anime");
var sidebar = document.getElementById("sidebar");
var tips = document.getElementById("hold_player");

window.onload = () =>
{
	res_check();
  player.load();
	document.getElementById("loader").style.display= "none";
	[].forEach.call(animes, (a) => {a.style.animationPlayState = "running";});
  tips.style.animationPlayState = "running";
  sidebar.style.animationPlayState = "running";
  tips.style.opacity = "0.85";
};

//player
var orignal = document.getElementById("lrc_orignal");
var translated = document.getElementById("lrc_translated");
var player = document.getElementById("player");
var lrc_pad = document.getElementById("lrc_pad");
var ctime = 0;
var index = 0;
var now_i = -1;
var opa = 10;
var num_of_col = 14;
var id_add, id_min, roll_lrc;

roll_lrc = () =>
{
	ctime = player.currentTime;
	for(index = 0; index < lrc.length; index++)
	{
		if((ctime < ((lrc[index + 1])["time"] - 0.5)) && (ctime >= ((lrc[index])["time"] - 0.5)))
		{
			if(now_i != index)
			{
				now_i = index;

				lrc_pad.style.opacity = "0.0";

				setTimeout(() =>
				{
					orignal.innerHTML = (lrc[index])["lrc_o"];
					translated.innerHTML = (lrc[index])["lrc_t"];
					orignal.className = aqours_css[(lrc[index])["aqours_css_i"]];
					translated.className = aqours_css[((lrc[index])["aqours_css_i"] + num_of_col)];

					lrc_pad.style.opacity = "1.0";
				}, 500);
			}
			break;
		}
	}
}

player.addEventListener("timeupdate", roll_lrc);

//hold_player
var hold_player = () =>
{
	if(!sidebar.classList.contains("sidebar_hold"))
	{
		sidebar.classList.add("sidebar_hold");
	}
	else
	{
		sidebar.classList.remove("sidebar_hold");
	}
}

tips.addEventListener("click", hold_player);

//overlay
var open_overlay, close_overlay;

open_overlay = () =>
{
  document.getElementById("overlay").style.height = "100%";
}

close_overlay = () =>
{
  document.getElementById("overlay").style.height = "0%";
}

document.getElementById("open_overlay").addEventListener("click", open_overlay);
document.getElementById("close_overlay").addEventListener("click", close_overlay);
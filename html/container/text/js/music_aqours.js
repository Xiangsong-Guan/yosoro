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
var id_add, id_min;

function roll_lrc()
{
	ctime = player.currentTime;
	for(index = 0; index < lrc.length; index++)
	{
		if((ctime < (lrc[index + 1].time - 0.5)) && (ctime >= (lrc[index].time - 0.5)))
		{
			if(now_i != index)
			{
				now_i = index;

				lrc_pad.style.opacity = "0.0";

				setTimeout(function()
				{
					orignal.innerHTML = lrc[index].lrc_o;
					translated.innerHTML = lrc[index].lrc_t;
					orignal.className = aqours_css[lrc[index].aqours_css_i];
					translated.className = aqours_css[(lrc[index].aqours_css_i + num_of_col)];

					lrc_pad.style.opacity = "1.0";
				}, 500);
			}
			break;
		}
	}
}

var sidebar = document.getElementById("sidebar");

function hold_player()
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

//overlay
function open_overlay() {
    document.getElementById("overlay").style.height = "100%";
}
function close_overlay() {
    document.getElementById("overlay").style.height = "0%";
}
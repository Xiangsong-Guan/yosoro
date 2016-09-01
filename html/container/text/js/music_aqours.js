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
		if((ctime < lrc[index + 1].time) && (ctime >= lrc[index].time))
		{
			if(now_i != index)
			{
				now_i = index;

				id_min = setInterval(frame_min, 50);
				function frame_min()
				{
					if(lrc_pad.style.opacity == "0")
					{
						clearInterval(id_min);
					}
					else
					{
						opa = opa - 1;
						lrc_pad.style.opacity = (opa / 10).toString();
					}
				}

				setTimeout(function()
				{
					orignal.innerHTML = lrc[index].lrc_o;
					translated.innerHTML = lrc[index].lrc_t;
					orignal.className = aqours_css[lrc[index].aqours_css_i];
					translated.className = aqours_css[(lrc[index].aqours_css_i + num_of_col)];

					id_add = setInterval(frame_add, 50);
				}, 550);
				function frame_add()
				{
					if(lrc_pad.style.opacity == "1")
					{
						clearInterval(id_add);
					}
					else
					{
						opa = opa + 1;
						lrc_pad.style.opacity = (opa / 10).toString();
					}
				}
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
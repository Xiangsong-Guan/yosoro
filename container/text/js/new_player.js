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
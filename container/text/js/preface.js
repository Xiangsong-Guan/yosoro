//load control
var player = document.getElementById("player");
var all_unit = document.getElementById("all_unit");
var loader = document.getElementById("loader");
var last = document.getElementById("last");
var overlay = document.getElementById("overlay");
var title = document.getElementById("h1");
var all_unit_stop, all_unit_start, all_unit_finsh;
var gogogo, loaded;
var mouse_move;
var screen_w = window.innerWidth / 2;
var screen_h = window.innerHeight / 2;
var slider = document.getElementsByClassName("slide");
var original_pos_w = [];
var original_pos_h = [];

player.addEventListener("playing", all_unit_start);
player.addEventListener("waiting", all_unit_stop);
player.addEventListener("ended", all_unit_finsh);
window.addEventListener("load", () => {
  loader.innerHTML = "<p>LOADING<br />BGM...</p>";
  player.load();
  player.addEventListener("canplay", loaded);
});

loaded = () => {
  loader.style.display = "none";
  all_unit.style.opacity = "1.0";
  overlay.style.display = "block";
  setTimeout(() => {
    overlay.style.opacity = "1.0";
    overlay.addEventListener("click", gogogo);
  }, 300);
}

gogogo = () => {
  overlay.removeEventListener("click", gogogo);
  player.removeEventListener("canplay", loaded);
  overlay.style.opacity = "0.0";
  setTimeout(() => {
    overlay.style.display = "none";
  }, 500);
  title.style.opacity = "1.0";
  player.volume = 0.5;
  player.play();
  document.addEventListener("mousemove", mouse_move, false);
  window.addEventListener("resize", () => {
    screen_w = window.innerWidth / 2;
    screen_h = window.innerHeight / 2;
  });
}

all_unit_start = () => {
  player.removeEventListener("playing", all_unit_start);
  loader.style.display = "none";
  all_unit.style.opacity = "1.0";
}

all_unit_stop = () => {
  all_unit.style.opacity = "0.3";
  loader.style.display = "block";
  player.addEventListener("playing", all_unit_start);
}

all_unit_finsh = () => {
  player.removeEventListener("playing", all_unit_start);
  player.removeEventListener("waiting", all_unit_stop);
  all_unit.style.opacity = "0.0";
  //动画组停止，消失，last起
  setTimeout(() => {
    all_unit.style.opacity = "1.0";
  }, 500);
}

mouse_move = (event) => {
  w = event.clientX;
  h = event.clientY;

  if (w < screen_w) {
    for (var i = 0; i < slider.length; i++) {
      slider.item(i).style.left = (original_pos_w[i] * 100 + (1 + (i % 4))) + "%";
    }
  }
  else {
    for (var i = 0; i < slider.length; i++) {
      slider.item(i).style.left = (original_pos_w[i] * 100 - (1 + (i % 4))) + "%";
    }
  }

  if (h < screen_h) {
    for (var i = 0; i < slider.length; i++) {
      slider.item(i).style.top = (original_pos_h[i] * 100 + (1 + (i % 4))) + "%";
    }
  }
  else {
    for (var i = 0; i < slider.length; i++) {
      slider.item(i).style.top = (original_pos_h[i] * 100 - (1 + (i % 4))) + "%";
    }
  }
}

[].forEach.call(slider, (a) => { original_pos_w.push((parseInt(window.getComputedStyle(a).left) / window.innerWidth).toFixed(2)); });
[].forEach.call(slider, (a) => { original_pos_h.push((parseInt(window.getComputedStyle(a).top) / window.innerHeight).toFixed(2)); });
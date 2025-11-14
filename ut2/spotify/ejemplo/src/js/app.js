const DOM = {
  video: document.querySelector("video"),
  btnPlayPause: document.getElementById("playPause"),
  btnMute: document.getElementById("mute"),
  btnSkip: document.getElementById("skip"),
  btnReturn: document.getElementById("return"),

  audio: document.getElementById("myAudio"),
  btnPlay: document.getElementById("play"),
  btnPause: document.getElementById("pause"),
  btnStop: document.getElementById("stop"),
  volumen: document.getElementById("volumen"),
  btnLoop: document.getElementById("loop"),
};

/**
 * Video
 */
DOM.btnPlayPause.onclick = () => {
  if (DOM.video.paused) {
    DOM.video.play();
    DOM.btnPlayPause.style.backgroundColor = "green";
  } else {
    DOM.video.pause();
    DOM.btnPlayPause.style.backgroundColor = "#1e3a8a";
  }
};

DOM.btnMute.onclick = () => {
  DOM.video.muted = !DOM.video.muted;
};

DOM.btnSkip.onclick = () => {
  DOM.video.currentTime += 10;
};

DOM.btnReturn.onclick = () => {
  DOM.video.currentTime -= 10;
};

/**
 * Audio
 */
DOM.btnPlay.onclick = () => {
  DOM.audio.play();
};

DOM.btnPause.onclick = () => {
  DOM.audio.pause();
};

DOM.btnStop.onclick = () => {
  DOM.audio.pause();
  DOM.audio.currentTime = 0;
};

DOM.btnLoop.onclick = () => {
  DOM.loop = !DOM.loop
};

DOM.volumen.onclick = () => {
  DOM.volumen.oninput = e => DOM.volumen = e.target.value;
};



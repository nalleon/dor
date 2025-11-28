/**
 * Propiedades
 */
const DOM = {
  playerTitle: document.querySelector(".player-title"),
  playerArtist: document.querySelector(".player-artist"),
  playerCoverThumb: document.querySelector(".player-cover-thumb"),
  playerToggle: document.querySelector(".player-toggle"),
  playerIcon: document.querySelector(".player-toggle .icon"),
  currentTime: document.querySelector(".current-time"),
  totalTime: document.querySelector(".total-time"),
  progressBarInner: document.querySelector(".progress-bar-inner"),
  progressBar: document.querySelector(".progress-bar"),
};

const songs = [
  {
    itemSelector: ".item-1",
    audioPath: "assets/songs/song1.mp3",
  },
  {
    itemSelector: ".item-2",
    audioPath: "assets/songs/song2.mp3",
  },
  {
    itemSelector: ".item-3",
    audioPath: "assets/songs/song3.mp3",
  },
];

let currentIndex = null;
let audioElements = [];
let audios = [];

/**
 * Funcion para obtener el tiempo de reproduccion de la cancion
 * @param {*} seconds de la cancion
 * @returns string con el tiempo transcurrido de la canción
 */
function formatTime(seconds) {
  if (isNaN(seconds)){
    return "0:00";
  }
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/**
 * Funcion para actualizar la informacion con la cancion actual
 * @param {*} index de la cancion
 */
function updateNowPlaying(index) {
  const item = document.querySelector(songs[index].itemSelector);
  const title = item.dataset.title || "Sin título";
  const artist = item.dataset.artist || "Desconocido";
  const cover = item.dataset.cover || "";
  DOM.playerTitle.textContent = title;
  DOM.playerArtist.textContent = artist;
  if (cover) {
    DOM.playerCoverThumb.style.backgroundImage = `url('${cover}')`;
  }
}

/**
 * Funcion para cambiar el icono de la barra de reproduccion
 * @param {*} playing si la cancion se esta reproduciendo o no (true/false)
 */
function setPlayIcon(playing) {
  DOM.playerIcon.className = "icon";
  if (playing) {
    DOM.playerIcon.classList.add("icon-pause");
  } else {
    DOM.playerIcon.classList.add("icon-play");
  }
}

/**
 * Funcion para pausar las canciones
 */
function pauseAll() {
  audioElements.forEach(({ audio, item, vinyl, cover }) => {
    audio.pause();
    audio.currentTime = 0;
    item.classList.remove("active");
    vinyl.classList.remove("playing");
    cover.classList.remove("glow");
  });
  setPlayIcon(false);
}

songs.forEach((songConfig, index) => {
  const item = document.querySelector(songConfig.itemSelector);
  const cover = item.querySelector(".cover");
  const vinyl = item.querySelector(".vinyl");
  const audio = new Audio(songConfig.audioPath);

  audioElements.push({ audio, item, vinyl, cover });
  audios.push(audio);

  item.addEventListener("click", () => {
    if (currentIndex !== index) {
      currentIndex = index;
      updateNowPlaying(index);
    }

    if (audio.paused) {
      pauseAll();
      audio.play();
      item.classList.add("active");
      vinyl.classList.add("playing");
      cover.classList.add("glow");
      setPlayIcon(true);
    } else {
      audio.pause();
      item.classList.remove("active");
      vinyl.classList.remove("playing");
      cover.classList.remove("glow");
      setPlayIcon(false);
    }
  });

  item.addEventListener("click", () => {
    audios.forEach((a, i) => {
      if (a !== audio) {
        a.pause();
        const otherItem = document.querySelector(SONGS[i].item);
        const otherCover = document.querySelector(SONGS[i].cover);
        const otherVinyl = otherItem.querySelector(".disc");
        otherCover.classList.remove("open");
        otherVinyl.classList.remove("playing");
      }
    })
  });

  audio.addEventListener("loadedmetadata", () => {
    DOM.totalTime.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    DOM.currentTime.textContent = formatTime(audio.currentTime);
    DOM.totalTime.textContent = formatTime(audio.duration);
    const percent = (audio.currentTime / audio.duration) * 100;
    DOM.progressBarInner.style.width = percent + "%";
  });

  audio.addEventListener("ended", () => {
    item.classList.remove("active");
    vinyl.classList.remove("playing");
    cover.classList.remove("glow");
    setPlayIcon(false);
    DOM.progressBarInner.style.width = "0%";
  });
});

/**
 * Evento para pausar/play de una cancion
 */
DOM.playerToggle.addEventListener("click", () => {
  if (currentIndex === null) {
    currentIndex = 0;
    updateNowPlaying(0);
  }

  const obj = audioElements[currentIndex];

  if (obj.audio.paused) {
    pauseAll();
    obj.audio.play();
    obj.item.classList.add("active");
    obj.vinyl.classList.add("playing");
    obj.cover.classList.add("glow");
    setPlayIcon(true);
  } else {
    obj.audio.pause();
    obj.item.classList.remove("active");
    obj.vinyl.classList.remove("playing");
    obj.cover.classList.remove("glow");
    setPlayIcon(false);
  }
});

/**
 * Evento para modificar el progreso de la barra de reproduccion
 */
DOM.progressBar.addEventListener("click", (e) => {
  if (currentIndex === null) return;

  const audio = audioElements[currentIndex].audio;
  const rect = DOM.progressBar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percent = clickX / rect.width;

  audio.currentTime = percent * audio.duration;
});

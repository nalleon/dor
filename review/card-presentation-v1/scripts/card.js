function showInfo(){
 const info = document.getElementById("info");
    if (info.style.visibility === "visible") {
        info.style.visibility = "hidden";
    } else {
        info.style.visibility = "visible"; 
    }
}

function showGames() {
    const games = document.getElementById("games");
    games.classList.toggle("show");
}

function showAniManga() {
    const animanga = document.getElementById("animanga");
    animanga.classList.toggle("show");
}

function showHobbies() {
    const animanga = document.getElementById("hobbies");
    animanga.classList.toggle("show");
}
let songs = [];
let currentSongIndex = 0;

const seekBar =
    document.getElementById("seekBar");

const currentTimeDisplay =
    document.getElementById("currentTime");

const durationDisplay =
    document.getElementById("duration");

const audioPlayer =
    document.getElementById("audioPlayer");

const songList =
    document.getElementById("songList");

const startJourney =
    document.getElementById("startJourney");

const musicModal =
    document.getElementById("musicModal");

const miniPlayer =
    document.getElementById("miniPlayer");

const playerCover =
    document.getElementById("playerCover");

const playerTitle =
    document.getElementById("playerTitle");

const playerArtist =
    document.getElementById("playerArtist");

const playPause =
    document.getElementById("playPause");

const prevSong =
    document.getElementById("prevSong");

const nextSong =
    document.getElementById("nextSong");

document
    .getElementById("autoScrollBtn")
    .classList.add("hide-auto-scroll");

async function loadMusic(){

    const response =
        await fetch("data/music.json");

    songs =
        await response.json();

    songs.forEach((song,index)=>{

        const card =
            document.createElement("div");

        card.className =
            "song-card";

        card.innerHTML = `

            <img src="${song.cover}">

            <div>

                <div class="song-title">
                    ${song.title}
                </div>

                <div class="song-artist">
                    ${song.artist}
                </div>

            </div>

        `;

        card.addEventListener("click",()=>{

            document
                .querySelectorAll(".song-card")
                .forEach(card=>{

                    card.classList.remove("active");

                });

            card.classList.add("active");

            currentSongIndex =
                index;

            startJourney.disabled =
                false;

        });

        songList.appendChild(card);

    });

}

function playSong(index){

    const song =
        songs[index];

    audioPlayer.src =
        song.audio;

    audioPlayer.play();

    playerCover.src =
        song.cover;

    playerTitle.textContent =
        song.title;

    playerArtist.textContent =
        song.artist;

    playPause.textContent =
        "⏸";
}

startJourney.addEventListener("click",()=>{

    musicModal.style.display =
        "none";

    document
        .getElementById("autoScrollBtn")
        .classList.remove("hide-auto-scroll");

    miniPlayer.classList.remove("hidden");

    playSong(currentSongIndex);

});

playPause.addEventListener("click",()=>{

    if(audioPlayer.paused){

        audioPlayer.play();

        playPause.textContent =
            "⏸";

    }else{

        audioPlayer.pause();

        playPause.textContent =
            "▶";

    }

});

nextSong.addEventListener("click",()=>{

    currentSongIndex++;

    if(
        currentSongIndex >=
        songs.length
    ){

        currentSongIndex = 0;
    }

    playSong(currentSongIndex);

});

prevSong.addEventListener("click",()=>{

    currentSongIndex--;

    if(
        currentSongIndex < 0
    ){

        currentSongIndex =
            songs.length - 1;
    }

    playSong(currentSongIndex);

});

audioPlayer.addEventListener("ended",()=>{

    currentSongIndex++;

    if(
        currentSongIndex >=
        songs.length
    ){

        currentSongIndex = 0;
    }

    playSong(currentSongIndex);

});

loadMusic();

function formatTime(seconds){

    const mins =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60);

    return `${mins}:${secs
        .toString()
        .padStart(2,"0")}`;
}

audioPlayer.addEventListener(
    "timeupdate",
    () => {

        const progress =
            (audioPlayer.currentTime /
            audioPlayer.duration) * 100;

        seekBar.value =
            progress || 0;

        currentTimeDisplay.textContent =
            formatTime(
                audioPlayer.currentTime
            );

    }
);

audioPlayer.addEventListener(
    "loadedmetadata",
    () => {

        durationDisplay.textContent =
            formatTime(
                audioPlayer.duration
            );

    }
);

seekBar.addEventListener(
    "input",
    () => {

        const seekTo =
            (seekBar.value / 100) *
            audioPlayer.duration;

        audioPlayer.currentTime =
            seekTo;

    }
);

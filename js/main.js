document.addEventListener("DOMContentLoaded", () => {
    let playBtn = document.querySelector("#play");
    let pauseBtn = document.querySelector("#pause");
    let prevBtn = document.querySelector("#prev");
    let nextBtn = document.querySelector("#next");
    let repetBtn = document.querySelector("#repet");
    let audio = document.querySelector("#audio");
    let currentTimeDisplay = document.querySelector("#current-time");
    let durationDisplay = document.querySelector("#duration");
    let musicImg = document.querySelector(".img");
    let musicName = document.querySelector(".name");
    let progres = document.querySelector(".progres");
    let progresContainer = document.querySelector("#progres-container");

    let musicIndex = 0;
    let isPlay = false;

    let songs = [
        {
            img: "image/hero.jpg",
            name: `(ولا تحسبن الله غافلا عما يعمل الظالمون)<br><span class="fw-bold">نايف الفيصل</span>`,
            audio: "music/song1.m4a"
        },
        {
            img: "image/2.jpg",
            name: `(ولا تحسبن الله غافلا عما يعمل الظالمون)<br><span class="fw-bold">ياسر الدوسري</span>`,
            audio: "music/song2.mp3"
        },
        {
            img: "image/3.jpg",
            name: `(قران كريم مجمع)<br><span class="fw-bold">عدة قراء</span>`,
            audio: "music/song3.m4a"
        },
        {
            img: "image/4.jpg",
            name: `(لا يكلف الله نفسا الا وسعها)<br><span class="fw-bold">ناصر القطامي</span>`,
            audio: "music/song4.mp3"
        },
    ]

    window.addEventListener("load", () => {
        loadMusic(musicIndex);
    });

    function loadMusic(i) {
        musicName.innerHTML = songs[i].name;
        musicImg.src = songs[i].img;
        audio.src = songs[i].audio;
        audio.onloadedmetadata = () => {
            durationDisplay.innerHTML = formatTime(audio.duration);
        };
    }

    function play() {
        isPlay = true;
        audio.play();
        pauseBtn.classList.remove("none");
        playBtn.classList.add("none");
    }

    function pause() {
        isPlay = false;
        audio.pause();
        pauseBtn.classList.add("none");
        playBtn.classList.remove("none");
    }

    playBtn.addEventListener("click", function () {
        play();
    });

    pauseBtn.addEventListener("click", function () {
        pause();
    });

    function nextMusic() {
        musicIndex++;
        if (musicIndex >= songs.length) {
            musicIndex = 0;
        }
        loadMusic(musicIndex);
        play();
    }

    nextBtn.addEventListener("click", () => {
        nextMusic();
    });

    function prevMusic() {
        musicIndex--;
        if (musicIndex < 0) {
            musicIndex = songs.length - 1;
        }
        loadMusic(musicIndex);
        play();
    }

    prevBtn.addEventListener("click", () => {
        prevMusic();
    });

    audio.addEventListener("timeupdate", (e) => {
        let currentTime = e.target.currentTime;
        let duration = e.target.duration;
        let progresWidth = (currentTime / duration) * 100;
        progres.style.width = `${progresWidth}%`;

        currentTimeDisplay.innerHTML = formatTime(currentTime);
        if (!isNaN(duration)) {
            durationDisplay.innerHTML = formatTime(duration);
        }
    });

    function formatTime(seconds) {
        let min = Math.floor(seconds / 60);
        let sec = Math.floor(seconds % 60);
        if (sec < 10) {
            sec = `0${sec}`;
        }
        return `${min}:${sec}`;
    }

    // إضافة مستمع للحدث click على شريط التقدم
    progresContainer.addEventListener("click", (e) => {
        const width = progresContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;

        audio.currentTime = (clickX / width) * duration;
    });
});

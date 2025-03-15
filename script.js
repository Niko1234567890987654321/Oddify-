document.addEventListener("DOMContentLoaded", function () {
    console.log("init");
    const slider = document.querySelector('.slider');
    
slider.addEventListener('input', function () {
    const value = (this.value - this.min) / (this.max - this.min) * 100; // Calculate percentage
    this.style.background = `linear-gradient(to right, #89AFEE ${value}%, #535353 ${value}%)`;
});
    const mainPlay = document.getElementById("PlayButton0")
    const playlists = document.getElementsByClassName("PlayButton");
    console.log(playlists);
    const bottomImg = document.getElementById("BottomCover");
    const bottomTitle = document.getElementById("BottomDescript");
    function createZeroArray(x) {
        return new Array(x).fill(0);
    }
    let lastPlayed = -1;
    const status = createZeroArray(playlists.length);
    const audio = createZeroArray(playlists.length);
    let setstatus = 0;
    mainPlay.addEventListener("click", function () {
        console.log(status.includes(1))

        if(!status.includes(1)){
            console.log("playing");
            playlists[lastPlayed].src = "Assets/Icons/pause.png";
            mainPlay.src = "Assets/Icons/pause.png";
            setstatus = 1;

            audio[lastPlayed].play();
        }
        for(let j = 0; j<status.length; j++) {
            if (status[j] == 1) {
                console.log("pausing");
                playlists[j].src = "Assets/Icons/play.png";
                mainPlay.src = "Assets/Icons/play.png";
                lastPlayed = j;
                audio[j].pause();
                status[j] = 0;
                console.log(status.includes(1))
            }
        }
        console.log(status.includes(1))
        if(setstatus == 1){
            status[lastPlayed] = 1;
        }
        
     
        });

    for (let i = 0; i < playlists.length; i++) {
        playlists[i].addEventListener("click", function () {
            console.log("clicked");
            if (status[i] == 0) {
                for(let j = 0; j < playlists.length; j++) {
                    if (status[j] == 1) {
                        playlists[j].src = "Assets/Icons/play.png";
                        mainPlay.src = "Assets/Icons/play.png";
                        audio[j].pause();
                        status[j] = 0;
                    }
                }
                bottomImg.src = "Assets/Covers/" + playlists[i].id + ".png";
                bottomTitle.innerHTML = playlists[i].parentNode.childNodes[1].innerText;
                console.log(playlists[i].parentNode.childNodes);
                playlists[i].src = "Assets/Icons/pause.png";
                mainPlay.src = "Assets/Icons/pause.png";
                audio[i] = new Audio('Assets/Audio/' + playlists[i].id + '.mp3');
                audio[i].play();
                audio[i].loop = true;
                status[i] = 1;
            } else {
                playlists[i].src = "Assets/Icons/play.png";
                mainPlay.src = "Assets/Icons/play.png";
                audio[i].pause();
                status[i] = 0;
            }
        });
    }
    setInterval(function () {
        if(status.includes(1)){
            slider.value = Math.random() * 3600
            const value = (slider.value - slider.min) / (slider.max - slider.min) * 100; // Calculate percentage
            slider.style.background = `linear-gradient(to right, #89AFEE ${value}%, #535353 ${value}%)`;
    
        }
    
    },100);
});
let play=document.getElementById('play');
let progressBar=document.getElementById('progressBar');
let audio=new Audio('Audio/1.mp3');

let currentSong=1;
let isShuffle=false;
let isRepeat=false;

let songName=document.getElementById("songName");
let artistName=document.getElementById("artistName");
let currentSongImg=document.getElementById("currentSongImg");


play.addEventListener("click", () =>{
    if(audio.paused || audio.currentTime == 0){
        audio.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
    }else{
        audio.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
    }
});

audio.addEventListener("timeupdate", () => {
    let progress=(audio.currentTime/audio.duration)*100 || 0;
    progressBar.value=progress;
    progressBar.style.background=`linear-gradient(to right, white ${progress}%, #333 ${progress}%)`
});

progressBar.addEventListener("input", function (){
    let value=this.value;
    this.style.background=`linear-gradient(to right, hsla(115, 86%, 43%, 0.74) ${value}%, #333 ${value}%)`;
    audio.currentTime=(progressBar.value*audio.duration)/100;
});

let playMusic=Array.from(document.getElementsByClassName("playMusic"));


const makeAllPlay=()=>{
    playMusic.forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    });
}
playMusic.forEach((element)=>{
    element.addEventListener("click", (e)=>{
        makeAllPlay();
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
 
        let index=parseInt(e.target.id);
        currentSong=index;
        audio.src=`Audio/${index}.mp3`;
        updateSongInfo();
        audio.currentTime=0;
        audio.play();
    });
});


const playNextSong=()=>{

    if(isShuffle){
        currentSong=Math.floor(Math.random()*14)+1;
    }
    else
    {
        let nextSong=(currentSong+1)%playMusic.length;
        currentSong=nextSong==0?14:nextSong;
    }

    audio.src=`Audio/${currentSong}.mp3`;
    updateSongInfo();
    audio.currentTime=0;
    audio.play();

    play.classList.remove("fa-circle-play");
    play.classList.add("fa-circle-pause");
}

const playPrevSong=()=>{
    let PrevSong=(currentSong-1);
    currentSong=PrevSong==0?14:PrevSong;
    audio.src=`Audio/${currentSong}.mp3`;
    updateSongInfo();
    audio.currentTime=0;
    audio.play();

    play.classList.remove("fa-circle-play");
    play.classList.add("fa-circle-pause");
}

let forward=document.getElementById("forward");
let backward=document.getElementById("backward");
let shuffleBtn=document.getElementById("shuffle");
let repeatBtn=document.getElementById("repeat");


shuffleBtn.addEventListener("click", ()=>{

    isShuffle=!isShuffle;

    if(isShuffle){
        isRepeat=false;
        repeatBtn.style.color="";

        shuffleBtn.style.color="white";
    }
    else{
        shuffleBtn.style.color="";
    }
});

repeatBtn.addEventListener("click", ()=>{
    isRepeat = !isRepeat;

    if(isRepeat){
        isShuffle=false;
        shuffleBtn.style.color="";

        repeatBtn.style.color = "white";
    }
    else{
        repeatBtn.style.color = "";
    }
});


forward.addEventListener("click", ()=>{
    playNextSong();
});

audio.addEventListener("ended", ()=>{

    if(isRepeat){
        audio.currentTime=0;
        audio.play();

        play.classList.remove("fa-circle-play");
        play.classList.add("fa-circle-pause");
    }
    else{
        playNextSong();
    }
});

backward.addEventListener("click", ()=>{
    playPrevSong();
});

const songsInfo=[
{
    name:"Mann Mera - Original Version",
    artist:"Gajendra Verma"
},
{
    name:"Pal Pal Dil Ke Paas",
    artist:"Arijit Singh"
},
{
    name:"Kaun Tujhe",
    artist:"Palak Muchhal"
},
{
    name:"Tera Hone Laga Hoon",
    artist:"Atif Aslam"
},
{
    name:"Kesariya",
    artist:"Arijit Singh"
},
{
    name:"Channa Mereya",
    artist:"Arijit Singh"
},
{
    name:"Khairiyat",
    artist:"Arijit Singh"
},
{
    name:"Shayad",
    artist:"Arijit Singh"
},
{
    name:"Raataan Lambiyan",
    artist:"Jubin Nautiyal"
},
{
    name:"Dil Diyan Gallan",
    artist:"Atif Aslam"
},
{
    name:"Tum Se Hi",
    artist:"Mohit Chauhan"
},
{
    name:"Kya Mujhe Pyaar Hai",
    artist:"KK"
},
{
    name:"Ilahi",
    artist:"Arijit Singh"
},
{
    name:"Heeriye",
    artist:"Arijit Singh"
}
];

function updateSongInfo(){

    songName.innerHTML=songsInfo[currentSong-1].name;

    artistName.innerHTML=songsInfo[currentSong-1].artist;

    currentSongImg.src=`Images/${currentSong}.jpg`;
}

updateSongInfo();
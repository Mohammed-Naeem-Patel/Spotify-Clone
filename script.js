let play=document.getElementById('play');
let progressBar=document.getElementById('progressBar');
let audio=new Audio('Audio/1.mp3');

let currentSong=1;
let isShuffle=false;
let isRepeat=false;


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
    let progress=(audio.currentTime/audio.duration)*100;
    progressBar.value=progress;
    progressBar.style.background=`linear-gradient(to right, white ${progress}%, #333 ${progress}%)`
});

progressBar.addEventListener("input", function (){
    let value=this.value;
    this.style.background=`linear-gradient(to right, hsla(115, 86%, 43%, 0.74) ${value}%, #333 ${value}%)`;
    audio.currentTime=(progressBar.value*audio.duration)/100;
});

let playMusic=Array.from(document.getElementsByClassName("playMusic"));


makeAllPlay=()=>{
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
 
        index=parseInt(e.target.id);
        currentSong=index;
        audio.src=`Audio/${index}.mp3`;
        audio.currentTime=0;
        audio.play();
    });
});


playNextSong=()=>{

    if(isShuffle){
        currentSong=Math.floor(Math.random()*14)+1;
    }
    else
    {
        let nextSong=(currentSong+1)%playMusic.length;
        currentSong=nextSong==0?14:nextSong;
    }

    audio.src=`Audio/${currentSong}.mp3`;
    audio.currentTime=0;
    audio.play();
}

playPrevSong=()=>{
    let PrevSong=(currentSong-1);
    currentSong=PrevSong==0?14:PrevSong;
    audio.src=`Audio/${currentSong}.mp3`;
    audio.currentTime=0;
    audio.play();

}

let forward=document.getElementById("forward");
let backward=document.getElementById("backward");
let shuffleBtn=document.getElementById("shuffle");
let repeatBtn=document.getElementById("repeat");

shuffleBtn.addEventListener("click", ()=>{
    isShuffle=!isShuffle;

    if(isShuffle){
        shuffleBtn.style.color="white";
    }
    else{
        shuffleBtn.style.color="";
    }
});

repeatBtn.addEventListener("click", ()=>{
    isRepeat = !isRepeat;

    if(isRepeat){
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
    }
    else{
        playNextSong();
    }
});

backward.addEventListener("click", ()=>{
    playPrevSong();
});
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const som = document.querySelector('.som');
pipe.style.right = `-${100}px`;
let seconds = 0;
let speed = 1000;
const score = document.querySelector('.bestScore');

const jump = () => {
  const pipePosition = pipe.offsetLeft;
  if (pipePosition !== 980) {
    mario.classList.add('jump');
    setTimeout(() => {
      mario.classList.remove('jump');
    }, 500);
  }
}

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
  
 
  if (pipePosition <= 205 && pipePosition > 10 && marioPosition < 125) {
    
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;
    
    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;
    
    mario.src = 'game-over.png';
    mario.style.width = '110px';
    mario.style.marginLeft = '85px';
    
    som.src = 'gameoversong.mp3';
    som.removeAttribute('loop');
    
    if (bestScore < seconds) {
      localStorage.setItem('bestScore', seconds);
    }
    clearInterval(loop);
  }
}, 10)

const bestScore = localStorage.getItem('bestScore');
if (bestScore === 0) {
  score.textContent = `NEW RECORD: ${Number(bestScore)}`;
} else {
  score.textContent = `NEW RECORD: ${Number(bestScore) + 1}`;
}

document.addEventListener('touchstart', jump);

function play() {
  const audio = document.querySelector('.audio-player audio');
  const btn = document.querySelector('.btn');
  
  pipe.classList.add('pipe-activy');
  
  const loopTimer = setInterval(() => {
    const timer = document.querySelector('.timer');
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
    
    pipe.style.animationDuration = `${speed -= 1}ms`;
    
    seconds++;
    timer.textContent = `TIME: ${seconds}`;
    
    if (pipePosition <= 205 && pipePosition > 10 && marioPosition < 125) {
      seconds--;
      clearInterval(loopTimer);
    }
    
  } , 1000)
  
  btn.style.display = 'none';
  
  audio.play();
  
}

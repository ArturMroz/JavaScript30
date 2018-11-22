const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
  // if (video.paused) {
  //     video.play();
  // } else {
  //     video.pause();
  // }
}

function updateToggleButton() {
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}

window.addEventListener('keyup', handleKeyup);

function handleKeyup(e) {
  console.log(e.code);

  const playbackRateInput = document.querySelector('#playbackRateInput');
  const playbackRateOutput = document.querySelector('#playbackRateOutput');

  let skipTime = 0.1;
  if (e.shiftKey) skipTime *= 10;

  if (e.code === 'ArrowRight')
    video.currentTime += skipTime;
  else if (e.code === 'ArrowLeft')
    video.currentTime -= skipTime;
  else if (e.code === 'Space')
    togglePlay();
  else if (e.key === '-') {
    video.playbackRate -= 0.1
    playbackRateInput.value = playbackRateOutput.value = video.playbackRate;
  } else if (e.key === '+' || e.key === '=')
    video.playbackRate += 0.1
    playbackRateInput.value = playbackRateOutput.value = video.playbackRate;
}

function skip() {
  // video.currentTime += parseFloat(this.dataset.skip);
  video.currentTime += 0.1;
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  console.log(this.value);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e);

}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateToggleButton);
video.addEventListener('pause', updateToggleButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
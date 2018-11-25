let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
  clearInterval(countdown);

  const then = Date.now() + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000)
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;
  // console.log(minutes, seconds);
  // const display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  const display = `${minutes}:${pad(seconds)}`;
  timerDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();
  const display = `Be back at ${hours}:${pad(minutes)}`;
  endDisplay.textContent = display;
}

function pad(time) {
  return (time < 10 ? '0' : '') + time;
}

function startTimer(e) {
  const seconds = Number(this.dataset.time)
  console.log(seconds);
  timer(seconds);
}

buttons.forEach(btn => btn.addEventListener('click', startTimer));

// timer(5);
document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const minutes = this.minutes.value;
  console.log(minutes);
  this.reset();
  timer(minutes * 60);
})
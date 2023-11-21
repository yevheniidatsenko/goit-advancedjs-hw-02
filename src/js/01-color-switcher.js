function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let startBtn = document.getElementById('startBtn');
let stopBtn = document.getElementById('stopBtn');
let isActive = false;

startBtn.addEventListener('click', () => {
  if (!isActive) {
    isActive = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;

    let intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);

    stopBtn.addEventListener('click', () => {
      clearInterval(intervalId);
      isActive = false;
      startBtn.disabled = false;
      stopBtn.disabled = true;
    });
  }
});

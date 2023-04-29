const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

refs.start.addEventListener('click', getRandomHexColor);
refs.stop.addEventListener('click', stopInterval);

let timerId = null;
refs.start.disabled = false;

function getRandomHexColor() {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = `#${Math.floor(
      Math.random() * 16777215
    )
      .toString(16)
      .padStart(6, 0)}`;
  }, 1000);

  refs.start.disabled = true;
}

function stopInterval(evt) {
  clearInterval(timerId);

  if (evt.target) {
    refs.start.disabled = false;
  }
}

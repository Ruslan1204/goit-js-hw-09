import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('[type="button"]'),
  stop: document.querySelector('[data-stop]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.button.addEventListener('click', onClick);
// refs.stop.addEventListener('click', onStop);

refs.button.disabled = true;

let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (options.defaultDate >= selectedDate) {
      window.alert('Please choose a date in the future');
      timer.stop();
      refs.button.disabled = true;
    } else {
      refs.button.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function onClick() {
  timer.start();
}

const timer = {
  intervalID: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;

    this.intervalID = setInterval(() => {
      const currentTime = selectedDate;
      const deltaTime = currentTime - Date.now();
      const timerComponents = convertMs(deltaTime);
      if (deltaTime <= 0) {
        clearInterval(this.intervalID);
        refs.days.textContent = '00';
        refs.hours.textContent = '00';
        refs.minutes.textContent = '00';
        refs.seconds.textContent = '00';
      }
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalID);
    this.isActive = false;
  },
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;

  return { days, hours, minutes, seconds };
}

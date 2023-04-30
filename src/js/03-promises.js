import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  button: document.querySelector('[type="submit"]'),
};

refs.form.addEventListener('submit', onForm);
refs.form.addEventListener('input', onInput);

let amount = null;
let delay = null;
let step = null;
let delayStep = null;

let position = 1;

function onInput() {
  amount = refs.form.elements.amount.value;
  delayStep = refs.form.elements.delay.value;
  step = refs.form.elements.step.value;
  delay = Number(delayStep) + Number(step);
}

function onForm(evt) {
  evt.preventDefault();
  timer.start();
  this.reset();
}

const timer = {
  intervalID: null,
  start() {
    this.intervalID = setTimeout(() => {
      createPromise((position = 1), delayStep)
        .then(fulfilled)
        .catch(error);
      timerInterval.start();
      return;
    }, delayStep);
  },
};

const timerInterval = {
  start() {
    this.intervalID = setInterval(() => {
      createPromise(position + 1, delay)
        .then(fulfilled)
        .catch(error);

      if (position === Number(amount - 1)) {
        clearInterval(this.intervalID);
        return;
      }
      position += 1;
      delay += Number(step);
    }, step);
  },
};

function fulfilled(result) {
  console.log(result);
  Notify.success(result);
}

function error(error) {
  console.log(error);
  Notify.failure(error);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`❌Rejected promise ${position} in ${delay}ms `);
    }
  });
}

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  button: document.querySelector('[type="submit"]'),
};

refs.form.addEventListener('submit', onForm);
refs.form.addEventListener('input', onInput);

let position = null;
let delay = null;
let step = null;
let delayStep = null;

let promtCounter = 2;

function onInput() {
  position = refs.form.elements.amount.value;
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
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;

    this.intervalID = setTimeout(() => {
      createPromise(position, delayStep).then(fulfilled).catch(error);
      return;
    }, delayStep);

    this.intervalID = setInterval(() => {
      createPromise(position, delay).then(fulfilled).catch(error);
      

      if (promtCounter === Number(position)) {
        clearInterval(this.intervalID);
        return;
      }
      promtCounter += 1;
      delay += Number(step);
    }, delay);
  },
};

function fulfilled(result) {
  // console.log(result);
  Notify.success(result);
}

function error(error) {
  // console.log(error);
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

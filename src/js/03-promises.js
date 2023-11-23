import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget.elements;

  if (delay.value < 0 || step.value < 0 || amount.value < 0) {
    iziToast.show({
      title: 'Warning',
      message: `❗ Please enter a positive number`,
      position: 'topCenter',
      color: 'yellow',
    });
  } else {
    for (let i = 0; i < amount.value; i++) {
      const position = i + 1;
      const delays = Number(delay.value) + step.value * i;

      createPromise(position, delays)
        .then(() => {
          iziToast.show({
            title: 'Success',
            message: `✅ Fulfilled promise ${position} in ${delays}ms`,
            position: 'topRight',
            color: 'green',
          });
        })
        .catch(() => {
          iziToast.show({
            title: 'Error',
            message: `❌ Rejected promise ${position} in ${delays}ms`,
            position: 'topRight',
            color: 'red',
          });
        });
    }
  }

  event.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

class Timer {
  constructor() {
    this.date = document.querySelector('#datetime-picker');
    this.btn = document.querySelector('[data-start]');
    this.day = document.querySelector('[data-days]');
    this.hour = document.querySelector('[data-hours]');
    this.min = document.querySelector('[data-minutes]');
    this.sec = document.querySelector('[data-seconds]');
    this.spans = document.querySelectorAll('.value');

    this.timerId = null;

    this.btn.disabled = true;

    flatpickr(this.date, {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,
      onClose: this.onDatePickerClose.bind(this),
    });

    this.btn.addEventListener('click', this.onBtnStartClick.bind(this));
  }

  onDatePickerClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      this.btn.disabled = true;
      iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future!',
        position: 'topRight',
        color: 'red',
      });
    } else {
      this.btn.disabled = false;
      iziToast.show({
        title: 'Success',
        message: 'Here we go!',
        position: 'topRight',
        color: 'green',
      });
    }
  }

  onBtnStartClick() {
    this.spans.forEach(item => item.classList.toggle('end'));
    this.btn.disabled = true;
    this.date.disabled = true;
    this.timerId = setInterval(() => {
      const chosenDate = new Date(this.date.value);
      const timeToFinish = chosenDate - Date.now();
      const { days, hours, minutes, seconds } = this.convertMs(timeToFinish);

      this.day.textContent = this.addLeadingZero(days);
      this.hour.textContent = this.addLeadingZero(hours);
      this.min.textContent = this.addLeadingZero(minutes);
      this.sec.textContent = this.addLeadingZero(seconds);

      if (timeToFinish < 1000) {
        this.spans.forEach(item => item.classList.toggle('end'));
        clearInterval(this.timerId);
        this.date.disabled = false;
      }
    }, 1000);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return `${value}`.padStart(2, '0');
  }
}

const timer = new Timer();

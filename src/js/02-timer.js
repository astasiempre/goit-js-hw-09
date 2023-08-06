import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const startButton = document.querySelector('[data-start]');
    if (selectedDate < new Date()) {
      window.alert("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      startButton.addEventListener('click', () => {
        startTimer(selectedDate);
      });
    }
  },
};

const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

const datePicker = flatpickr("#datetime-picker", options);

function addLeadingZero(value) {
    // console.log('value:', value)
    return value.toString().padStart(2, '0');
    
}

let intervalId = null;

function startTimer(targetDate) {
  intervalId = setInterval(() => {
    const currentDate = new Date();
    const timeDifference = targetDate - currentDate;
    if (timeDifference <= 0) {
      clearInterval(intervalId);
    //   updateTimerUI(0, 0, 0, 0);
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateTimerUI(days, hours, minutes, seconds);
  }, 1000);
}

function updateTimerUI(days, hours, minutes, seconds) {
  daysRef.textContent = addLeadingZero(days);
  hoursRef.textContent = addLeadingZero(hours);
  minutesRef.textContent = addLeadingZero(minutes);
  secondsRef.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
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
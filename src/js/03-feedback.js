import throttle from 'lodash.throttle';

const FORM_STATE = 'feedback-form-state';

const formValue = {};

const form = document.querySelector('.feedback-form');
const input = document.querySelector('input');
const textarea = document.querySelector('textarea');

function onMessageInput(evt) {
  formValue[evt.target.name] = evt.target.value;
  localStorage.setItem(FORM_STATE, JSON.stringify(formValue));
}

function onPageReset() {
  const savedMessage = JSON.parse(localStorage.getItem(FORM_STATE));
  if (savedMessage) {
    input.value = savedMessage.email;
    textarea.value = savedMessage.message;
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.target.reset();
  console.log(JSON.parse(localStorage.getItem(FORM_STATE)));
  localStorage.removeItem(FORM_STATE);
}

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onMessageInput, 500));

onPageReset();

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(inputErrorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = '';
  errorElement.classList.remove(inputErrorClass);
};

const checkInputValidity = (formElement, inputElement, inputErrorClass) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const errorMessage = inputElement.validationMessage;
    showInputError(formElement, inputElement, errorMessage, inputErrorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass);
  }

};

const inactiveButtonClass = (inputList, buttonElement, disabledButtonClass) => {
  const hasNotValidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );

  if (hasNotValidInput) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(disabledButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(disabledButtonClass);
  }
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, disabledButtonClass, inputErrorClass) => {
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
  };

  formElement.addEventListener('submit', handleFormSubmit);

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  const inputListIterator = (inputElement) => {
    const handleInput = () => {
      checkInputValidity(formElement, inputElement, inputErrorClass);
      inactiveButtonClass(inputList, buttonElement, disabledButtonClass);
    };
    inputElement.addEventListener('input', handleInput);
  };

  inputList.forEach(inputListIterator);

  inactiveButtonClass(inputList, buttonElement, disabledButtonClass);
};



const enableValidation = ({formSelector, inputSelector, submitButtonSelector, disabledButtonClass, inputErrorClass}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, inputSelector, submitButtonSelector, disabledButtonClass, inputErrorClass)
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  disabledButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input-error_active',
});

class FormValidator {
  constructor(parameters, formElement) {
    this._parameters = parameters;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._parameters.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._parameters.submitButtonSelector);
  }

  _showInputError(inputElement, errorMessage) {
    const _errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    _errorElement.classList.add(this._parameters.inputErrorClass);
    _errorElement.textContent = errorMessage;
  };


  _hideInputError(inputElement) {
    const _errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    _errorElement.textContent = '';
    _errorElement.classList.remove(this._parameters.inputErrorClass);
  };


  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };


  _hasNotValidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _changeButtonState() {
    if (this._hasNotValidInput(this._inputList)) {
      this.disableButtonSubmit();
    } else {
      this._buttonElement.classList.remove(this._parameters.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };


  _setEventListeners() {
    this._changeButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._changeButtonState();
      });
    });
  };

  disableButtonSubmit() {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._parameters.inactiveButtonClass);
  };

  deleteErrors = () => {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }


  enableValidation() {
    this._setEventListeners();
  };

};

export{FormValidator};



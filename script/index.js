let popup = document.querySelector('.popup');
let popupOpenBtn = document.getElementById('popup_open-btn');
let popupCloseBtn = document.querySelector('.popup__close-btn');
let popupOverlay = document.querySelector('.popup__overlay');
let popupName = document.querySelector('.popup__name');
let popupProfession = document.querySelector('.popup__profession')
let nameProfile = document.querySelector('.profile__name');
let professionProfile = document.querySelector('.profile__profession');

function openPopup() {
  popup.classList.add('popup_visible');
}

function closePopup() {
  popup.classList.remove('popup_visible');
}

popupOpenBtn.addEventListener('click', function(event) {
  popupName.value = nameProfile.textContent;
  popupProfession.value = professionProfile.textContent;
  openPopup();
})


popupCloseBtn.addEventListener('click', function() {
  nameProfile.textContent = popupName.value;
  professionProfile.textContent = popupProfession.value;
  closePopup();
});

popupOverlay.addEventListener('click', function() { closePopup(); });

function formSubmitHandler (evt) {
  evt.preventDefault();

}

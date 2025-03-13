const deleteButtons = document.querySelectorAll('.card__delete-button');

const placesList = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const editButton = document.querySelector('.profile__edit-button');

const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const saveButton = profileFormElement.querySelector('.popup__button'); 

const closeButton = document.querySelector('.popup__close');

const cardFormElement = cardPopup.querySelector('.popup__form');
const profileButton = document.querySelector('.profile__add-button');
const cardCloseButton = cardPopup.querySelector('.popup__close');

const imageCloseButton = imagePopup.querySelector('.popup__close');

const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url');


function createCard(cardData) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardDescription = cardElement.querySelector('.card__description');
    const cardTitle = cardDescription.querySelector('.card__title');
    const cardImage = cardElement.querySelector('.card__image');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardDescription.querySelector('.card__like-button');
    const imagePopup = document.querySelector('.popup_type_image');
    const imageElement = imagePopup.querySelector('.popup__image');
    const imageCaption = imagePopup.querySelector('.popup__caption');


    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;

    cardImage.addEventListener('click', function () {
        imageElement.src = cardImage.src;
        imageElement.alt = cardImage.alt;
        imageCaption.textContent = cardTitle.textContent;
        openModal(imagePopup);
    });

    deleteButton.addEventListener('click', function () {
        cardElement.remove();
    });

    likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-button_is-active');
    });

    return cardElement;
}


initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData);
    placesList.appendChild(cardElement);
});


function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.addEventListener('click', closeModalOnOverlayClick);
    document.addEventListener('keydown', closeModalOnEscape);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', closeModalOnOverlayClick);
    document.removeEventListener('keydown', closeModalOnEscape);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;

    closeModal(profilePopup);
}

function openCardModal() {
    cardNameInput.value = '';
    cardLinkInput.value = '';
    cardNameInput.classList.remove('popup__input_wrong_value');
    cardLinkInput.classList.remove('popup__input_wrong_value');
    const saveButton = cardFormElement.querySelector('.popup__button');
    saveButton.setAttribute('disabled', true);
    saveButton.classList.add('popup__button_disabled');
    const errorMessages = cardFormElement.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.textContent = '');
    openModal(cardPopup);
  }
  

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
    const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url');

    const cardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value
    };

    const newCardElement = createCard(cardData);
    const placesList = document.querySelector('.places__list');
    placesList.prepend(newCardElement);

    closeModal(cardPopup);
}

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

imageCloseButton.addEventListener('click', function () {
    closeModal(imagePopup);
});

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

editButton.addEventListener('click', () => openModal(profilePopup));
closeButton.addEventListener('click', () => closeModal(profilePopup));
profileButton.addEventListener('click', () => openModal(cardPopup));
cardCloseButton.addEventListener('click', () => closeModal(cardPopup));
profileButton.addEventListener('click', () => openCardModal);


function validateProfileForm() {
    const nameInput = profileFormElement.querySelector('.popup__input_type_name');
    const jobInput = profileFormElement.querySelector('.popup__input_type_description');
    const nameErrorMessage = nameInput.nextElementSibling;
    const jobErrorMessage = jobInput.nextElementSibling;

    if (nameInput.validity.valueMissing) {
        nameErrorMessage.textContent = 'Поле "Имя" должно быть заполнено.';
    } else if (nameInput.validity.tooShort) {
        nameErrorMessage.textContent = 'Имя должно быть не менее 2 символов.';
    } else if (nameInput.validity.tooLong) {
        nameErrorMessage.textContent = 'Имя должно быть не более 40 символов.';
    } else {
        nameErrorMessage.textContent = '';
    }

    if (jobInput.validity.valueMissing) {
        jobErrorMessage.textContent = 'Поле "Занятие" должно быть заполнено.';
    } else if (jobInput.validity.tooShort) {
        jobErrorMessage.textContent = 'Занятие должно быть не менее 2 символов.';
    } else if (jobInput.validity.tooLong) {
        jobErrorMessage.textContent = 'Занятие должно быть не более 200 символов.';
    } else {
        jobErrorMessage.textContent = '';
    }

    const isNameValid = nameInput.validity.valid;
    const isJobValid = jobInput.validity.valid;

    if (isNameValid && isJobValid) {
        saveButton.removeAttribute('disabled');
        saveButton.classList.remove('popup__button_disabled');
        nameInput.classList.remove('popup__input_wrong_value');
        jobInput.classList.remove('popup__input_wrong_value');
    } else if (isNameValid) {
        saveButton.setAttribute('disabled', true);
        saveButton.classList.add('popup__button_disabled');
        nameInput.classList.remove('popup__input_wrong_value');
        jobInput.classList.add('popup__input_wrong_value');
    } else if (isJobValid) {
        saveButton.setAttribute('disabled', true);
        saveButton.classList.add('popup__button_disabled');
        nameInput.classList.add('popup__input_wrong_value');
        jobInput.classList.remove('popup__input_wrong_value');
    } else {
        saveButton.setAttribute('disabled', true);
        saveButton.classList.add('popup__button_disabled');
        nameInput.classList.add('popup__input_wrong_value');
        jobInput.classList.add('popup__input_wrong_value');
    }
}


nameInput.addEventListener('input', validateProfileForm);
jobInput.addEventListener('input', validateProfileForm);


editButton.addEventListener('click', () => {
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
    validateProfileForm(); 
    openModal(profilePopup);
});

function validateCardForm() {
    const saveButton = cardFormElement.querySelector('.popup__button');
    const nameErrorMessage = cardNameInput.nextElementSibling;
    const linkErrorMessage = cardLinkInput.nextElementSibling;
  
    const isNameValid = cardNameInput.validity.valid;
    const isLinkValid = cardLinkInput.validity.valid;
  
    if (cardNameInput.validity.valueMissing) {
      nameErrorMessage.textContent = 'Поле "Название" должно быть заполнено.';
    } else if (cardNameInput.validity.tooShort) {
      nameErrorMessage.textContent = 'Название должно быть не менее 2 символов.';
    } else if (cardNameInput.validity.tooLong) {
      nameErrorMessage.textContent = 'Название должно быть не более 30 символов.';
    } else {
      nameErrorMessage.textContent = '';
    }
  
    if (cardLinkInput.validity.valueMissing) {
      linkErrorMessage.textContent = 'Поле "Ссылка на картинку" должно быть заполнено.';
    } else if (cardLinkInput.validity.typeMismatch) {
      linkErrorMessage.textContent = 'Введите корректный URL.';
    } else {
      linkErrorMessage.textContent = '';
    }
  
    if (isNameValid && isLinkValid) {
      saveButton.removeAttribute('disabled');
      saveButton.classList.remove('popup__button_disabled');
    } else {
      saveButton.setAttribute('disabled', true);
      saveButton.classList.add('popup__button_disabled');
    }
  
    cardNameInput.classList.toggle('popup__input_wrong_value', !isNameValid);
    cardLinkInput.classList.toggle('popup__input_wrong_value', !isLinkValid);
  }
  

cardNameInput.addEventListener('input', validateCardForm);
cardLinkInput.addEventListener('input', validateCardForm);

function closeModalOnOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.target);
  }
}

function closeModalOnEscape(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
  popup.addEventListener('click', closeModalOnOverlayClick);
});

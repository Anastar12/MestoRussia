const deleteButtons = document.querySelectorAll('.card__delete-button');

const placesList = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const editButton = document.querySelector('.profile__edit-button');

const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const saveButton = profileFormElement.querySelector('.popup__button'); // находим кнопку "Сохранить"

const closeButton = document.querySelector('.popup__close');

const cardFormElement = cardPopup.querySelector('.popup__form');
const profileButton = document.querySelector('.profile__add-button');
const cardCloseButton = cardPopup.querySelector('.popup__close');

const imageCloseButton = imagePopup.querySelector('.popup__close');


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
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
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
    const cardForm = cardPopup.querySelector('.popup__form');
    const cardNameInput = cardForm.querySelector('.popup__input_type_card-name');
    const cardLinkInput = cardForm.querySelector('.popup__input_type_url');


    cardNameInput.value = '';
    cardLinkInput.value = '';


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

editButton.addEventListener('click', function () {
    openModal(profilePopup);
});

closeButton.addEventListener('click', function () {
    closeModal(profilePopup);
});

profileButton.addEventListener('click', function () {
    openModal(cardPopup);
});

cardCloseButton.addEventListener('click', function () {
    closeModal(cardPopup);
});

profileButton.addEventListener('click', openCardModal);

cardFormElement.addEventListener('submit', handleCardFormSubmit);

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

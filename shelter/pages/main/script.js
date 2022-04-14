"use strict"

import PetsService from "../../pets-service.js";
import slider from "./slider.js";
import modal from "./modal.js";

const navigationItems = document.querySelectorAll('.navigation__item');
const creditCard = document.querySelector('.credit-card');

function disableClickEvent(element) {
    element.addEventListener('click', e => e.preventDefault());
}

disableClickEvent(navigationItems[2]);
disableClickEvent(navigationItems[3]);
disableClickEvent(creditCard);

const petsService = new PetsService(),
      pets = await petsService.getAllPets(),
      petCards = pets.map(pet => petsService.createPetCard(pet));

slider('.slider__wrapper', '.slider__items', '.slider__button_left', '.slider__button_right', petCards);
modal('.pet-modal', '.pet-modal__overlay', '.wrapper_modal', '.pet-modal__close-button', '.slider__items', pets);



    










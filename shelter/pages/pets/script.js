"use strict"

import PetsService from "../../pets-service.js";
import modal from "../../scripts/modal.js";

// Disable last 2 navigation buttons

const navigationItems = document.querySelectorAll('.navigation__item')

function disableClickEvent(element) {
    element.addEventListener('click', e => e.preventDefault());
}

disableClickEvent(navigationItems[2]);
disableClickEvent(navigationItems[3]);

// Render pets cards

const petsService = new PetsService(),
      pets = await petsService.getAllPets(),
      petCards = pets.map(pet => petsService.createPetCard(pet));

const cardsWrapper = document.querySelector('.our-friends__cards');

petCards.forEach(card => {
    cardsWrapper.append(card)
});

modal('.pet-modal', '.pet-modal__overlay', '.wrapper_modal', '.pet-modal__close-button', '.our-friends__cards', pets);


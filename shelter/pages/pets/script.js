"use strict"

import PetsService from "../../pets-service.js";

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


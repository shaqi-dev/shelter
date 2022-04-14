"use strict"

import PetsService from "../../pets-service.js";
import slider from "./slider.js";
import modal from "./modal.js";

const petsService = new PetsService(),
      pets = await petsService.getAllPets(),
      petCards = pets.map(pet => petsService.createPetCard(pet));
   
// Disable last 2 navigation buttons

const navigationItems = document.querySelectorAll('.navigation__item')

for (let i = 0; i < navigationItems.length; i++) {
    const lastItemsCount = 2
        
    if (i >= navigationItems.length - lastItemsCount) {
        navigationItems[i].addEventListener('click', e => {
            e.preventDefault();
        })
    }
}

slider('.slider__wrapper', '.slider__items', '.slider__button_left', '.slider__button_right', petCards);
modal('.pet-modal', '.wrapper', '.pet-modal__close-button', '.slider__items', pets);



    










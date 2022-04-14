"use strict"

import PetsService from "../../pets-service.js";

// Render pets cards

const petsService = new PetsService();
      pets = await petsService.getAllPets(),
      petCards = pets.map(pet => petsService.createPetCard(pet));

const cardsWrapper = document.querySelector('.our-friends__cards')

petCards.forEach(card => {
    cardsWrapper.append(card)
})

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
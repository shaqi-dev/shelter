"use strict"

import PetsService from "../../pets-service.js";
import slider from "./slider.js";

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

// Slider

const petsService = new PetsService(),
      pets = await petsService.getAllPets(),
      petCards = pets.map(pet => petsService.createPetCard(pet)),
      sliderWrapper = document.querySelector('.slider__wrapper'),
      sliderField = document.querySelector('.slider__items'),
      sliderButtonsLeft = document.querySelectorAll('.slider__button_left'),
      sliderButtonsRight = document.querySelectorAll('.slider__button_right'),
      vw = Math.max(document.documentElement.clientWidth || 0);

slider(sliderWrapper, sliderField, sliderButtonsLeft, sliderButtonsRight, petCards, vw);





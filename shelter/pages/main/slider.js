export default function slider(wrapperSelector, fieldSelector, buttonsLeftSelector, buttonsRightSelector, cards, handleClickOnPetCard) {
    const sliderWrapper = document.querySelector(wrapperSelector),
          sliderField = document.querySelector(fieldSelector),
          sliderButtonsLeft = document.querySelectorAll(buttonsLeftSelector),
          sliderButtonsRight = document.querySelectorAll(buttonsRightSelector),
          vw = Math.max(document.documentElement.clientWidth || 0),
          slideSize = parseInt(window.getComputedStyle(sliderWrapper, null).width) + parseInt(window.getComputedStyle(sliderField, null).columnGap),
          posInitial = -slideSize;

    let previousSlides = [],
        currentSlides = [],
        nextSlides = [],
        cardsPerSlide,
        posCurrent = posInitial,
        allowShift = true;  

    // Setting max cards per slide

    function setCardsPerSlide(vw) {
        if (vw >= 1280) {
            cardsPerSlide = 3;
        } else if (vw >= 768 && vw < 1280) {
            cardsPerSlide = 2;
        } else if (vw < 768) {
            cardsPerSlide = 1;
        }
    }

    setCardsPerSlide(vw);

    window.addEventListener("resize", () => setCardsPerSlide(Math.max(document.documentElement.clientWidth))); 

    // Unique cards initilization

    function getUniqueCards(checkArray, pushArray, cardsCount, direction) {
        for (let i = 0; i < cardsCount;) {
            const randomCard = cards[Math.floor(Math.random() * 8)];
    
            if (!checkArray.some(e => e.dataset.name === randomCard.dataset.name) && 
                !pushArray.some(e => e.dataset.name === randomCard.dataset.name)) {
                pushArray.push(randomCard.cloneNode(true));
                i++;
            }
        }

        if (direction === 1) {
            sliderField.append(...pushArray);
        } else if (direction === -1) {
            sliderField.prepend(...pushArray);
        }
    }

    getUniqueCards(currentSlides, currentSlides, cardsPerSlide, 1);
    getUniqueCards(currentSlides, previousSlides, cardsPerSlide, -1);
    getUniqueCards(currentSlides, nextSlides, cardsPerSlide, 1);

    // Set initial position

    sliderField.style.transform = `translateX(${posInitial}px)`;
    
    // Add event listeners

    sliderButtonsLeft.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            shiftSlide(-1);
        })
    })

    sliderButtonsRight.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            shiftSlide(1);
        })
    })

    // Function to clear DOM from unused cards

    function removeChilds(cardsCount, direction) {
        if (direction === 1) {
            for (let i = 0; i < cardsCount;) {
                const card = sliderField.childNodes[0];

                if (card instanceof Element) {
                    i++ 
                }

                sliderField.removeChild(card);
            } 
        } else if (direction === -1) {
            for (let i = 0; i < cardsCount; ) {
                const card = sliderField.childNodes[sliderField.childNodes.length - 1]

                if (card instanceof Element) {
                    i++
                } 

                sliderField.removeChild(card);
            }
        }
    }

    // The main slider function

    function shiftSlide(direction) {
        if (allowShift) {
            allowShift = false;
            sliderField.classList.add('slider__items_shifting');   
            if (direction === 1) {
                posCurrent = posInitial - slideSize;
                sliderField.style.transform = `translateX(${posCurrent}px)`;
            } else if (direction === -1) {
                posCurrent = posInitial + slideSize;
                sliderField.style.transform = `translateX(${posCurrent}px)`;     
            }

            sliderField.addEventListener('transitionend', resetShift);

            function resetShift() {
                sliderField.classList.remove('slider__items_shifting');
                removeChilds(cardsPerSlide, direction);

                if (direction === 1) {
                    previousSlides = [...currentSlides];
                    currentSlides = [...nextSlides];
                    nextSlides = [];  
                    getUniqueCards(currentSlides, nextSlides, cardsPerSlide, 1);
                } else if (direction === -1) {
                    nextSlides = [...currentSlides];
                    currentSlides = [...previousSlides];
                    previousSlides = [];  
                    getUniqueCards(currentSlides, previousSlides, cardsPerSlide, -1);
                }

                sliderField.style.transform = `translateX(${posInitial}px)`;

                sliderField.removeEventListener('transitionend', resetShift);
    
                allowShift = true;
            } 
        }
    }    
}
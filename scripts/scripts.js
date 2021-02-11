import { uniqPets } from './data.js';

/////////////
//BURGER/////
/////////////
let burger = document.querySelector('.burger');
let bgBurger = document.querySelector('.bg_burger');
let burgerMenu = document.querySelector('.burger_menu');
let logo = document.querySelector('.logo');
let hederWrapper = document.querySelector('.heder-wrapper');
let wrapper = document.querySelector('.wrapper');
let main = document.querySelector('.main');
let notOnly = document.querySelector('.not_only');
let headerPets = document.querySelector('.header__pets');
let burgerLines = document.querySelectorAll('.burger > div');
let isBurgerOpen = false;


function getBurgerMenu() {
    if (isBurgerOpen) {
        burger.style.transform = 'rotate(0deg)';
        burgerMenu.style.transform = 'translateX(32rem)';
        document.body.style.overflow = 'auto';
        logo.style.display = 'flex';
        bgBurger.classList.remove('visible');

        if (document.querySelector('.header__pets')) {
            burgerLines.forEach(line => {
                line.style.borderColor = 'black';
            });
        }

        isBurgerOpen = false; 
    } else {
        burger.style.transform = 'rotate(-90deg)';
        document.body.style.overflow = 'hidden';
        burgerMenu.style.transform = 'translateX(0)';
        logo.style.display = 'none';
        bgBurger.classList.add('visible');

        if (document.querySelector('.header__pets')) {
            burgerLines.forEach(line => {
                line.style.borderColor = '#F1CDB3';
            });
        }

        isBurgerOpen = true;
    }
}

function resizeWindow() {
    if (isBurgerOpen) {
        burger.style.transform = 'rotate(0deg)';
        burgerMenu.style.transform = 'translateX(32rem)';
        document.body.style.overflow = 'auto';
        logo.style.display = 'flex';
        bgBurger.classList.remove('visible');

        if (document.querySelector('.header__pets')) {
            burgerLines.forEach(line => {
                line.style.borderColor = 'black';
            });
        }

        isBurgerOpen = false;
    }
}

burger.addEventListener('click', getBurgerMenu);
window.addEventListener('resize', resizeWindow);
bgBurger.addEventListener('click', getBurgerMenu);

////////////////////
//PETS ARRAY////////
////////////////////
const randomPetsList = [];

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const genRandomPets = () => {
    let randomInt, tempItem;
    for (let j = 0; j < 6; j++) {
        let tempArr = uniqPets.slice();
        for (let i = tempArr.length - 1; i > 0; i--){
            randomInt = getRandomInt(i + 1);
            tempItem = tempArr[randomInt];
            tempArr[randomInt] = uniqPets[i];
            tempArr[i] = tempItem;
        }
        randomPetsList.push([...tempArr]);
    }
}
genRandomPets();

////////////////
//SLIDER////////
////////////////
const sliderBtns = document.querySelectorAll('.our_friends__slider-btn_arrow-wrapper');

function genSliderContent() {
    let newSliderContent = [];
    let srcValues = [];
    let cardsImg = document.querySelectorAll('.slider-img');
    if (cardsImg[0].attributes.src.value) {
        for (let i = 0; i < cardsImg.length; i++) {
            srcValues.push(cardsImg[i].attributes.src.value);
        }

        while (newSliderContent.length !== 3) {
            let randomPets = uniqPets[getRandomInt(uniqPets.length)];
            
            if (!newSliderContent.includes(randomPets) && !srcValues.includes(randomPets.img)) {
                newSliderContent.push(randomPets);
            }
        }
    } else {
        while (newSliderContent.length !== 3) {
            let randomPets = uniqPets[getRandomInt(uniqPets.length)];
            
            if (!newSliderContent.includes(randomPets)) {
                newSliderContent.push(randomPets);
            }
        }
    }

    document.querySelector('.slider-content__card-first > .slider-img').setAttribute('src', `${newSliderContent[0].img}`);
    document.querySelector('.slider-content__card-first > .slider-img').setAttribute('alt', `${newSliderContent[0].name}`);
    document.querySelector('.slider-content__card-first > .slider-content__card-title').textContent =  `${newSliderContent[0].name}`;

    document.querySelector('.slider-content__card-second > .slider-img').setAttribute('src', `${newSliderContent[1].img}`);
    document.querySelector('.slider-content__card-second > .slider-img').setAttribute('alt', `${newSliderContent[1].name}`);
    document.querySelector('.slider-content__card-second > .slider-content__card-title').textContent =  `${newSliderContent[1].name}`;

    document.querySelector('.slider-content__card-third > .slider-img').setAttribute('src', `${newSliderContent[2].img}`);
    document.querySelector('.slider-content__card-third > .slider-img').setAttribute('alt', `${newSliderContent[2].name}`);
    document.querySelector('.slider-content__card-third > .slider-content__card-title').textContent =  `${newSliderContent[2].name}`;
}

sliderBtns.forEach(btn => btn.addEventListener('click', genSliderContent));

///////////////
//POPUP////////
///////////////

const cards = document.querySelectorAll(
    '.our_friends__slider-content > div, .pets__main-content-cards__container > div'
);
const popup = document.querySelector('.popup');
const popupContent = document.querySelector('.popup__content');
const popupBody = document.querySelector('.popup__body');

const genPopupContent = (target) => {
    let petName;

    if (target.children.length) {
        petName = target.children[0].getAttribute('alt');
    } else if (target.className === 'slider-img') {
        petName = target.getAttribute('alt');
    } else if (target.className === 'slider-content__card-title') {
        petName = target.innerText;
    } else if (target.className === 'slider-content__card-btn') {
        petName = target.previousElementSibling.innerText;
    }

    const selectedPet = uniqPets.find(pet => pet.name === petName);

    document.querySelector('.popup__content__text-name').textContent = `${selectedPet.name}`;
    document.querySelector('.animal_type').textContent = `${selectedPet.type}`;
    document.querySelector('.breed').textContent = `${selectedPet.breed}`;
    document.querySelector('.popup__content-img').setAttribute('src', `${selectedPet.img}`);
    document.querySelector('.popup__content-img').setAttribute('alt', `${selectedPet.name}`);
    document.querySelector('.popup__content__text__info-age > .value').textContent = `${selectedPet.age}`;
    document.querySelector('.popup__content__text__info-inoculations > .value').textContent = `${selectedPet.inoculations.join(', ')}`;
    document.querySelector('.popup__content__text__info-diseases > .value').textContent = `${selectedPet.diseases.join(', ')}`;
    document.querySelector('.popup__content__text__info-parasites > .value').textContent = `${selectedPet.parasites.join(', ')}`;
}

const openPopup = (e) => {
    popup.classList.add('open');
    genPopupContent(e.target);
}

const closePopup = () => {
    popup.classList.remove('open');
}

if (cards.length > 0) {
    cards.forEach(card => card.addEventListener('click', openPopup));
}

if (popupContent) {
    popupContent.addEventListener('click', (e) => e.stopPropagation());
    popupBody.addEventListener('click', closePopup);
    popup.addEventListener('click', closePopup);
}

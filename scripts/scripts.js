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
let randomPetsList = [];

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
console.log(randomPetsList);


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
            let randomPets = uniqPets[getRandomInt(uniqPets.length-1)];
            
            if (!newSliderContent.includes(randomPets) && !srcValues.includes(randomPets.img)) {
                newSliderContent.push(randomPets);
            }
        }
    } else {
        while (newSliderContent.length !== 3) {
            let randomPets = uniqPets[getRandomInt(uniqPets.length-1)];
            
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

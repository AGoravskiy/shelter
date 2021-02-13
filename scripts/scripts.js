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

////////////////////
//PETS ARRAY////////
////////////////////
const randomPetsList = [];

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const genRandomPets = () => {
    for (let j = 0; j < 6; j++) {
        const tempArr = uniqPets.slice();
        for (let i = tempArr.length - 1; i > 0; i--){
            const randomIndex = getRandomInt(i + 1);
            [tempArr[i], tempArr[randomIndex]] = [tempArr[randomIndex], tempArr[i]];
        }
        randomPetsList.push(...tempArr); 
    }
}
genRandomPets();

///////////////
//Pagination///
///////////////

const rewindLeftBtn = document.querySelector('.rewind_left');
const rewindOneLeftBtn = document.querySelector('.rewind_one_left');
const rewindRightBtn = document.querySelector('.rewind_right');
const rewindOneRightBtn = document.querySelector('.rewind_one_right');
const container =  document.querySelector('.pets__main-content-cards__container');
const pageCounter = document.querySelector('.paginations-btn-active');

let pageNum = 1;
let totalPetOnPage;
let maxPageNum;

const updatePaginationCards = () => {
    const prevMaxPageNum = maxPageNum;
    if (window.innerWidth < 767) {
        totalPetOnPage = 3;
    } else if (window.innerWidth < 1281) {
        totalPetOnPage = 6;
    } else {
        totalPetOnPage = 8;
    }

    maxPageNum = randomPetsList.length / totalPetOnPage;

    if (pageNum > 1) {
        pageNum = Math.round(maxPageNum * pageNum / prevMaxPageNum);
        pageCounter.textContent = pageNum;

        if (pageNum === maxPageNum) {
            rewindOneRightBtn.disabled = true;
            rewindRightBtn.disabled = true;
        }
    }
}

updatePaginationCards();

const addCardsContent = () => {
    const newCards = [];
    for (let i = 0; i < totalPetOnPage; i++) {
        const petIndex = totalPetOnPage * (pageNum - 1) + i;
        const pet = randomPetsList[petIndex];
        const petCard = document.createElement('div');
        petCard.setAttribute('class', 'slider-content__card');
        const cardImg = document.createElement('img');
        cardImg.setAttribute('class', 'slider-img');
        cardImg.setAttribute('src', `${pet.img}`);
        cardImg.setAttribute('alt', `${pet.name}`);
        const petName = document.createElement('p');
        petName.setAttribute('class', 'slider-content__card-title');
        petName.textContent = pet.name;
        const btn = document.createElement('button');
        btn.setAttribute('class', 'slider-content__card-btn')
        btn.textContent = 'Learn more';
        petCard.append(cardImg, petName, btn);
        petCard.addEventListener('click', openPopup);
        newCards.push(petCard);
    }
    return newCards;
}

container.replaceChildren(...addCardsContent());

const openFirstPage = () => {
    pageNum = 1;
    pageCounter.textContent = pageNum;
    rewindLeftBtn.disabled = true;
    rewindOneLeftBtn.disabled = true;
    rewindRightBtn.disabled = false;
    rewindOneRightBtn.disabled = false;
    container.replaceChildren(...addCardsContent());
}

const openLastPage = () => {
    pageNum = maxPageNum;
    pageCounter.textContent = pageNum;
    rewindOneRightBtn.disabled = true;
    rewindRightBtn.disabled = true;
    rewindLeftBtn.disabled = false;
    rewindOneLeftBtn.disabled = false;
    container.replaceChildren(...addCardsContent());
}

const openPrevPage = () => {
    pageNum--;
    pageCounter.textContent = pageNum;
    if (pageNum === maxPageNum - 1) {
        rewindRightBtn.disabled = false;
        rewindOneRightBtn.disabled = false;
    }
    if (pageNum === 1) {
        rewindLeftBtn.disabled = true;
        rewindOneLeftBtn.disabled = true;
    }
    container.replaceChildren(...addCardsContent());
}

const openNextPage = () => {
    pageNum++;
    pageCounter.textContent = pageNum;
    if (pageNum === 2) {
        rewindLeftBtn.disabled = false;
        rewindOneLeftBtn.disabled = false;
    }
    if (maxPageNum === pageNum) {
        rewindOneRightBtn.disabled = true;
        rewindRightBtn.disabled = true;
    }
    container.replaceChildren(...addCardsContent());
}

const changeWindowWidth = () => {
    updatePaginationCards();
    container.replaceChildren(...addCardsContent());
}

rewindLeftBtn.addEventListener('click', openFirstPage);
rewindRightBtn.addEventListener('click', openLastPage);
rewindOneLeftBtn.addEventListener('click', openPrevPage);
rewindOneRightBtn.addEventListener('click', openNextPage);
window.addEventListener('resize', changeWindowWidth);

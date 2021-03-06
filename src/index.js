import { Utils } from './js/helpers/Utils.js';
import { ModalArticle } from './js/ModalArticle.js';
import { Article } from './js/Article.js';




const strategiesTabs = document.querySelector('.strategies__tabs');
const strategiesCards = document.querySelector('.strategies__cards');
const burgerMenu = document.querySelector('.burger__menu');

strategiesTabs.addEventListener('click', addStrategiesTabsClickHandler);
strategiesCards.addEventListener('click', renderModalToDom);




// StrategiesTabs
function addStrategiesTabsClickHandler(e) {
    let target = e.target;

    if (!target.classList.contains('tab--selected')) {
        addSelectedTabs(target);

        if (target.innerText === 'All') {
            showAllStrategies();
        } else {
            showBySelectedTabs(target.innerText);
        }
    }
}

function addSelectedTabs(element) {
    strategiesTabs.querySelectorAll('.tab').forEach(tab => {
        if (tab.classList.contains('tab--selected')) {
            tab.classList.remove('tab--selected');
            tab.classList.add('tab--bordered');
            return;
        }
    });

    element.classList.remove('tab--bordered');
    element.classList.add('tab--selected');
}

function showAllStrategies() {
    strategiesCards.querySelectorAll('.strategy__card').forEach(card => {
        card.classList.remove('strategy__card--none');
        card.classList.remove('strategy__card--hidden');
    });
}

function showBySelectedTabs(selectedTab) {
    strategiesCards.querySelectorAll('.strategy__card').forEach(card => {
        card.querySelectorAll('.tab').forEach(tab => {
            if (tab.innerText.toUpperCase() !== selectedTab.toUpperCase()) {
                card.classList.add('strategy__card--hidden');
                setTimeout(function () {
                    if (card.classList.contains('strategy__card--hidden')) {
                        card.classList.add('strategy__card--none');
                    }
                }, 400);
            } else {
                card.classList.remove('strategy__card--none');
                card.classList.remove('strategy__card--hidden');
            }
        });
    });
}

// Article
renderArticleToDom();

function renderArticleToDom() {
    strategiesCards.innerHTML = '';
    generateArticles(Utils.sendData()).forEach(article => strategiesCards.appendChild(article.generateArticle()));
}

function generateArticles(data) {
    const articles = [];
    data.forEach(article => articles.push(new Article(article)));

    return articles;
}


//  Modal Article
function renderModalToDom(e) {
    let data = Utils.sendData();
    let targetId = e.target.closest('.strategy__card').getAttribute('data-id');

    data.forEach(article => {
        if (article.id == targetId) {
            let modal = new ModalArticle(article);
            modal.buildModal();
        }
    });
}

// Burger__menu 
burgerMenu.addEventListener('click', () => {
    const headerNav = document.querySelector('.header__navigation');
    burgerMenu.classList.toggle('burger__menu--cross');

    headerNav.classList.add('header__navigation--block');
    setTimeout(() => {
        headerNav.classList.toggle('header__navigation--visible');
    }, 0);
    setTimeout(() => {
        if (!headerNav.classList.contains('header__navigation--visible')) {
            headerNav.classList.remove('header__navigation--block');
        }
    }, 650);
});

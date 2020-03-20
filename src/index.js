import { Article } from './js/Article.js';
import { Utils } from './js/helpers/Utils.js';


const strategiesTabs = document.querySelector('.strategies__tabs');
const strategiesCards = document.querySelector('.strategies__cards');

strategiesTabs.addEventListener('click', addStrategiesTabsClickHandler);




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
    strategiesCards.querySelectorAll('.strategy__card').forEach(card => card.classList.remove('strategy__card--hidden'));
}

function showBySelectedTabs(selectedTab) {
    strategiesCards.querySelectorAll('.strategy__card').forEach(card => {
        card.querySelectorAll('.tab').forEach(tab => {
            if (tab.innerText.toUpperCase() !== selectedTab.toUpperCase()) {
                card.classList.add('strategy__card--hidden');
            } else {
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


export class Article {
    constructor({ id, title, urlToImage, tabs, modifier }) {
        this.id = id;
        this.title = title;
        this.urlToImage = urlToImage;
        this.tabs = tabs;
        this.modifier = modifier;
    }

    generateArticle() {
        let template = '';
        let article = document.createElement('article');
        article.className = 'strategy__card';
        article.setAttribute('data-id', this.id);

        this.modifier && (article.classList.add(this.modifier));

        this.urlToImage &&
            (template += `
                    <div class="strategy__img">
                        <img src=${this.urlToImage} alt="strategy">
                    </div>`);

        if (this.title || this.tabs) {
            template += `<div class="strategy__content">`;
            this.title &&
                (template += `<h3 class="strategy__title">${this.title}</h3>`);

            if (this.tabs) {
                template += `<ul class="strategy__tabs tabs">`;

                this.tabs.map(tab => template += `<li class="tab tab--colored">${tab}</li>`);

                template += `</ul>`;
            }

            template += `</div>`;
        }

        article.innerHTML = template;

        return article;
    }

}


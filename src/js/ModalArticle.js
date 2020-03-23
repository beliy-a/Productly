
export class ModalArticle {
    constructor({ id, title, urlToImage, tabs, date, content }) {
        this.id = id;
        this.title = title;
        this.urlToImage = urlToImage;
        this.tabs = tabs;
        this.date = date;
        this.content = content;
    }

    generateModalArticle() {
        let template = '';
        let articleModal = document.createElement('div');
        articleModal.className = 'modal';

        if (this.title || this.tabs || this.content || this.date || this.urlToImage) {
            template += `<div class="modal__content">`;

            this.urlToImage && (
                template += `
                    <div class="modal__content__img">
                        <img src=${this.urlToImage} alt="strategy">
                    </div>`);

            this.date && (template += `<h5 class="modal__content__date">${this.date}</h5>`);
            this.title && (template += `<h3 class="modal__content__title">${this.title}</h3>`);

            this.content && (template += `<p class="modal__content__text">${this.content}</p>`);

            if (this.tabs) {
                template += `<ul class="modal__tabs tabs">`;

                this.tabs.map(tab => template += `<li class="tab tab--colored">${tab}</li>`);

                template += `</ul>`;
            }

            template += `<div class="modal__close">
                            <div class="modal__close--line"></div>
                        </div>`
            template += '</div>';
        }

        articleModal.innerHTML = template;

        return articleModal;
    }

    buildModal() {
        this.openModal();
        this.setEventHandler();
    }

    setEventHandler() {
        document.querySelector('.modal').addEventListener('click', this.closeModal);
    }

    openModal() {
        document.body.append(this.generateModalArticle());
    }

    closeModal(e) {
        let classes = e.target.classList;

        if(classes.contains('modal') || classes.contains('modal__close') || classes.contains('modal__close--line')) {
            document.querySelector('.modal').remove();
        }

    }
}
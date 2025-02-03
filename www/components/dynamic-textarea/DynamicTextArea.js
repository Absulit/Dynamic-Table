const template = document.createElement('template');
template.innerHTML = /*html*/`
    <style>
        .hide {
            display: none;
        }
        .unselectable {
            user-select: none;
        }

        p {
            text-align: left;
        }
    </style>

    <textarea class="hide">
    </textarea>
    <p class="unselectable">
    </p>
`;

function showEl(el, val) {
    if (val) {
        el.classList.remove('hide');
    } else {
        el.classList.add('hide');
    }
}

export class DynamicTextArea extends HTMLElement {
    static UPDATED = 'UPDATED';
    #paragraph
    #textarea
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: 'open' });
        const templateEl = template.content.cloneNode(true);
        this.#paragraph = templateEl.querySelector('p');
        this.#paragraph.addEventListener('dblclick', this.onDoubleClickParagraph);

        this.#textarea = templateEl.querySelector('textarea');
        this.#textarea.addEventListener('blur', this.onTextAreaLosesFocus);

        shadow.appendChild(templateEl);
    }

    /**
     * @param {string} val
     */
    set text(val){
        this.#paragraph.innerText = val;
    }

    /**
     * @returns {string}
     */
    get text(){
        return this.#paragraph.innerText;
    }

    onDoubleClickParagraph = e => {
        this.#textarea.value = this.#paragraph.innerText;
        showEl(this.#paragraph, false);
        showEl(this.#textarea, true);
        this.#textarea.focus();
    }

    onTextAreaLosesFocus = e => {
        const changed = this.#paragraph.innerText !== this.#textarea.value;
        this.#paragraph.innerText = this.#textarea.value;
        showEl(this.#paragraph, true);
        showEl(this.#textarea, false);
        changed && this.dispatchEvent(new Event(DynamicTextArea.UPDATED, {bubbles: true}));
    }

}

customElements.define('dynamic-textarea', DynamicTextArea);

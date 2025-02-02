const template = document.createElement('template');
template.innerHTML = /*html*/`
    <style>
    table {
        border-collapse: collapse;
        border: 2px solid rgb(140 140 140);
        font-family: sans-serif;
        font-size: 0.8rem;
        letter-spacing: 1px;
    }
    caption {
        caption-side: bottom;
        padding: 10px;
        font-weight: bold;
    }

    thead,
    tfoot {
        background-color: rgb(228 240 245);
    }

    th,
    td {
        border: 1px solid rgb(160 160 160);
        padding: 8px 10px;
    }

    td:last-of-type {
        text-align: center;
    }

    tbody>tr:nth-of-type(even) {
        background-color: rgb(10 10 10);
    }

    tfoot th {
        text-align: right;
    }

    tfoot td {
        font-weight: bold;
    }
    </style>

    <table>
        <caption>
        </caption>

        <thead>
        </thead>

        <tbody>
        </tbody>

    </table>
`;

export class DynamicTable extends HTMLElement {
    #table;
    #thead;
    #tbody;
    #caption;
    constructor() {
        super()

        const shadow = this.attachShadow({ mode: 'open' });
        const templateEl = template.content.cloneNode(true);
        this.#table = templateEl.querySelector('table');
        this.#thead = templateEl.querySelector('thead');
        this.#tbody = templateEl.querySelector('tbody');
        this.#caption = templateEl.querySelector('caption');

        shadow.appendChild(templateEl);
    }

    /**
     * @param {string} val
     */
    set caption(val) {
        this.#caption.innerText = val;
    }

    /**
     * @returns {HTMLTableElement}
     */
    get table() {
        return this.#table;
    }

    /**
     * List of names for the header.
     * @param {Array<String>} val
     * @returns {HTMLTableRowElement} The header row element just added.
     */
    addHeader = val => {
        const tr = document.createElement('tr');
        val.forEach(item => {
            const th = document.createElement('th');
            th.innerText = item;
            tr.append(th);
        })
        this.#thead.append(tr);
        return tr;
    }

    /**
     * List of elemets per row
     * @param {Array<HTMLElement>} val
     * @returns {HTMLTableRowElement} The row element just added.
     */
    addRow = val => {
        const tr = document.createElement('tr');
        val.forEach(item => {
            const th = document.createElement('th');
            th.append(item);
            tr.append(th);
        })
        this.#tbody.append(tr);
        return tr;
    }

}

customElements.define('dynamic-table', DynamicTable);

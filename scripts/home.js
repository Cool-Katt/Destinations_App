import { html, render } from 'https://unpkg.com/lit-html?module';
import { getUserData } from '../services/authServices.js';

const template = (ctx) => html`
<!-- Home -->
        ${html`<navbar-component .data = ${ctx}></navbar-component>`}
        <section id="viewCatalog" class="background-img">
           ${ctx.idToken 
                ? html`<destinations-component></destinations-component>`
                : html`
                    <div class="guest">
                        No destinations possible! Please sign in...
                    </div>`
            }
        </section>
`;

class Home extends HTMLElement {
    connectedCallback() {
        Object.assign(this, getUserData())
        this.render();
    }

    render() {
        render(template(this), this, { eventContext: this });
    }
}

export default Home;
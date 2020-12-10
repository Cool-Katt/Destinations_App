import { html, render, nothing } from 'https://unpkg.com/lit-html?module';
import { getOneDestination } from '../services/destinationServices.js';
import { getUserData } from '../services/authServices.js';

const template = (ctx) => html`
    ${html`<navbar-component .data = ${ctx}></navbar-component>`}
    <section id="viewdestinationDetails">
            <div class="destination-area">
                <div class="destination-area-left">
                    <img src="${ctx.imgUrl}"
                        alt="${ctx.imgUrl}">
                </div>
                <div class="destination-area-right">
                    <h3>${ctx.destination}</h3>
                    <div>to ${ctx.city}</div>
                    <div class="data-and-time"> ${ctx.departureDate} </div>
                    ${ctx.creator === ctx.localId 
                        ? html`<div><a href="/edit/${ctx.id}" class="edit-destination-detail"></a></div>`
                        : nothing}
                    <div>${ctx.duration} Days </div>
                </div>
            </div>
        </section>
`;

class Details extends HTMLElement {
    connectedCallback() {
        Object.assign(this, getUserData())
        getOneDestination(this.location.params.id)
            .then(data => {
                Object.assign(this, data);
                this.render();
            });
    }

    render() {
        render(template(this), this, { eventContext: this });
    }
}

export default Details;

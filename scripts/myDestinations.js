import { html, render, nothing } from 'https://unpkg.com/lit-html?module';
import {getAllDestinations, getOneDestination} from '../services/destinationServices.js';
import { getUserData } from '../services/authServices.js';

const template = (ctx) => html`
    ${html`<navbar-component .data = ${ctx}></navbar-component>`}
    <section id="viewMydestinations">
            <h3>Your destinations</h3>
            ${ctx.destinations?.map(dest => showMyDest(dest))}
    </section>
`;

function showMyDest(ctx){
    return html`
            <div class="destination-ticket">
                <div class="destination-left">
                    <img src="${ctx.imgUrl}"
                        alt="${ctx.imgUrl}">
                </div>
                <div class="destination-right">
                    <div>
                        <h3>${ctx.destination}</h3><span>${ctx.departureDate}</span>
                    </div>
                    <div>
                        to ${ctx.city}
                    </div>
                    <p>${ctx.duration} days </p>
                        <a href="delete/${ctx.key}" class="remove">REMOVE</a>
                        <a href="/details/${ctx.key}" class="details">Details</a>
                </div>
            </div>`;
}

class MyDestinations extends HTMLElement {
    connectedCallback() {
        Object.assign(this, getUserData())
        getAllDestinations(this.localId)
            .then(destinations => {
                this.destinations = destinations;
                console.log(destinations)
                this.render();
            });
        this.render();
    }

    render() {
        render(template(this), this, { eventContext: this });
    }
}

export default MyDestinations;

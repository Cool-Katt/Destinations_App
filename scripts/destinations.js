import {html, render} from 'https://unpkg.com/lit-html?module';
import {getAllDestinations} from "../services/destinationServices.js";

const template = (ctx) => html` 
            <div class="added-destinations">
                ${ctx.destinations?.map(dest => showDest(dest))}       
            </div>
`;

function showDest(ctx){
    return html`
    <a href="/details/${ctx.key}" class="added-destination">
        <img src="${ctx.imgUrl}" alt="${ctx.imgUrl}" class="picture-added-destination">
        <h3>${ctx.destination}</h3>
        <span>to ${ctx.city} </span><span>${ctx.departureDate}</span>
    </a>
`;
}

class Destinations extends HTMLElement{
    connectedCallback() {
        this.render();
        getAllDestinations()
            .then(destinations => {
                this.destinations = destinations;
                this.render();
            })
    }

    render() {
        render(template(this), this, { eventContext: this });
    }
}
export default Destinations;
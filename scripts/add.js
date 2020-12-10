import {Router} from 'https://unpkg.com/@vaadin/router';
import {html, render} from 'https://unpkg.com/lit-html?module';
import {addDestination} from "../services/destinationServices.js";
import {getUserData} from '../services/authServices.js';

const template = (ctx) => html`
${html`<navbar-component .data = ${ctx}></navbar-component>`}
<section id="viewAdddestination">
            <h2>Add new destination</h2>
            <form id="formAdddestination" @submit=${ctx.onSubmit}>
                <label for="destination">Destination name:</label>
                <input type="text" id="destination" name="destination" placeholder="Destination name">
                <label for="city">City:</label>
                <input type="text" id="city" name="city" placeholder="City">
                <label for="duration">Duration:</label>
                <input type="number" id="duration" name="duration" placeholder="Duration">
                <label for="departureDate">Departure Date:</label>
                <input type="date" id="departureDate" name="departureDate">
                <label for="imgUrl">Image:</label>
                <input type="text" id="imgUrl" name="imgUrl" placeholder="https://">

                <input type="submit" class="create" value="Add">
            </form>
        </section>
`;

class Add extends HTMLElement {
    connectedCallback() {
        Object.assign(this, getUserData())
        this.render();
    }

    onSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let destination = formData.get('destination');
        let city = formData.get('city');
        let duration = formData.get('duration');
        let departureDate = formData.get('departureDate');
        let imgUrl = formData.get('imgUrl');

        if (!destination || !city || !duration || !departureDate || !imgUrl) {
            notify('Invalid or incomplete form.', 'notification errorBox');
            return;
        }

        notify('Loading...', 'notification loadingBox')
        addDestination({
            destination,
            city,
            duration,
            departureDate,
            imgUrl,
            creator: getUserData().localId,
        })
            .then(res => {
                notify('Successfully Added', 'notification infoBox');
                Router.go('/')
            })
            .catch(err => {
                notify(err.message, 'notification errorBox');
            });
    }

    render() {
        render(template(this), this, {eventContext: this});
    }
}

export default Add
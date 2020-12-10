import { Router } from 'https://unpkg.com/@vaadin/router';
import { html, render } from 'https://unpkg.com/lit-html?module';
import { editDestination, getOneDestination} from "../services/destinationServices.js";
import {getUserData} from "../services/authServices.js";


const template = (ctx) => html`
${html`<navbar-component .data = ${ctx}></navbar-component>`}
    <section id="viewEditdestination">
            <h2>Edit existing destination</h2>
            <form id="formAdddestination" @submit=${ctx.onSubmit}>
                <label for="destination">Destination name:</label>
                <input type="text" id="destination" name="destination" placeholder="destination" value="">
                <label for="city">City:</label>
                <input type="text" id="city" name="city" placeholder="city" value="">
                <label for="duration">Duration:</label>
                <input type="number" id="duration" name="duration" placeholder="duration" value="">
                <label for="departureDate">Departure Date:</label>
                <input type="date" id="departureDate" name="departureDate" value="">
                <label for="imgUrl">Image:</label>
                <input type="text" id="imgUrl" name="imgUrl"
                    placeholder="image URL" value="">
                <input type="submit" class="create" value="Edit">
            </form>
        </section>
`

class Edit extends HTMLElement {
    connectedCallback(){
        Object.assign(this, getUserData())
        getOneDestination(this.location.params.id)
            .then(data => {
                Object.assign(this, data);
                console.log(this)
            });
        this.render();
    }

    onSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let destination = formData.get('destination') || this.destination;
        let city = formData.get('city') || this.city;
        let duration = formData.get('duration') || this.duration;
        let departureDate = formData.get('departureDate') || this.departureDate;
        let imgUrl = formData.get('imgUrl') || this.imgUrl;

        notify('Loading...', 'notification loadingBox')
        editDestination(this.location.params.id,{
            destination,
            city,
            duration,
            departureDate,
            imgUrl,
        })
            .then(res => {
                notify('Successfully Edited', 'notification infoBox');
                Router.go('/')
            })
            .catch(err => {
                notify(err.message, 'notification errorBox');
            });
    }

    render() {
        render(template(this), this, { eventContext: this });
    }
}

export default Edit;
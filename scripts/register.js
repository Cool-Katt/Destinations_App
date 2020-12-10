import { html, render } from 'https://unpkg.com/lit-html?module';
import { Router } from 'https://unpkg.com/@vaadin/router';
import { login, register } from '../services/authServices.js';

const template = (ctx) => html`
${html`<navbar-component .data = ${ctx}></navbar-component>`}
    <section id="viewRegister">
            <h2>Create your account:</h2>
            <form id="formRegister" @submit=${ctx.onSubmit}>
                <label for="email">Email:</label>
                <input type="text" id="email" name="email" placeholder="Email">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Password">
                <label for="rePassword">Repeat Password:</label>
                <input type="password" id="rePassword" name="rePassword" placeholder="Repeat Password">
                <input type="submit" class="register" value="Register">
            </form>
        </section>
`;

class Register extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);
        let email = formData.get('email');
        let password = formData.get('password');
        let rePassword = formData.get('rePassword');

        if (password.length < 6) {
            notify('password too short', 'notification errorBox')
            return;
        }

        if (password !== rePassword) {
            notify('passwords must match', 'notification errorBox')
            return;
        }

        notify('Loading...', 'notification loadingBox')
        register(email, password)
            .then(res => {
                notify('Successful Registration', 'notification infoBox');
                login(email, password).then(res => Router.go('/'))
            }).catch(err => {
                notify(err.message, 'notification errorBox');
            });
    }

    render() {
        render(template(this), this, { eventContext: this });
    }
}

export default Register;
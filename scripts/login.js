import { Router } from 'https://unpkg.com/@vaadin/router';
import { html, render } from 'https://unpkg.com/lit-html?module';
import { login } from '../services/authServices.js';

const template = (ctx) => html`
    <!-- Login -->
    ${html`<navbar-component .data = ${ctx}></navbar-component>`}
        <section id="viewLogin">
            <h2>Login to your account:</h2>
            <form id="formLogin" @submit=${ctx.onSubmit}>
                <label for="email">Email:</label>
                <input type="text" id="email" name="email" placeholder="Enter your Email">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Enter your Password">
                <input type="submit" class="login" value="Login">
            </form>
        </section>
`;

class Login extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    onSubmit(e) {
        e.preventDefault();

        let formData = new FormData(e.target);
        let email = formData.get('email');
        let password = formData.get('password');

        notify('Loading...', 'notification loadingBox')
        login(email, password)
            .then(res => {
                notify('Successful Login', 'notification infoBox');
                Router.go('/')
            }).catch(err => {
                notify(err.message, 'notification errorBox');
            });
    }

    render() {
        render(template(this), this, { eventContext: this });
    }
}

export default Login;
import {html, render, nothing} from 'https://unpkg.com/lit-html?module';

const template = (ctx) => html`
<!-- Header -->
        <nav>
            <div class="left-container">
                <ul>
                    <li><a href="/">Home</a></li>
                    ${ctx.data.idToken 
                    ? html`
                         <li><a href="/destinations">Destinations</a></li>
                         <li><a href="/add">Add +</a></li>` 
                    : html`
                         <li><a href="/login">Login</a></li>
                         <li><a href="/register">Register</a></li>`
                    }
                </ul>
            </div>
            ${showRightContainer(ctx.data)}
        </nav>
`

function showRightContainer(ctx) {
    if (ctx.idToken) {
        return html`
            <div class="right-container">
                <span>Welcome, ${ctx.email} |</span>
                <a href="/logout" class="log-out">Logout</a>
            </div>
        `;
    } else {
        return nothing;
    }
}

class Navbar extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        render(template(this), this, {eventContext: this});
    }
}

export default Navbar;
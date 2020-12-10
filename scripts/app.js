import { Router } from 'https://unpkg.com/@vaadin/router';
import {logout} from "../services/authServices.js";
import {deleteDestination} from "../services/destinationServices.js";

import Navbar from '../scripts/nav.js';
import Home from '../scripts/home.js';
import Destinations from '../scripts/destinations.js';
import Login from '../scripts/login.js';
import Register from '../scripts/register.js';
import Add from '../scripts/add.js';
import Details from '../scripts/details.js';
import Edit from '../scripts/edit.js';
import MyDestinations from '../scripts/myDestinations.js';

customElements.define('navbar-component', Navbar);
customElements.define('home-component', Home);
customElements.define('destinations-component', Destinations);
customElements.define('login-component', Login);
customElements.define('register-component', Register);
customElements.define('add-component', Add);
customElements.define('details-component', Details);
customElements.define('edit-component', Edit);
customElements.define('my-destinations-component', MyDestinations);

const router = new Router(document.getElementById('root'));

router.setRoutes([
    {
        path: '/',
        component: 'home-component',
    },
    {
        path: '/home',
        component: 'home-component',
    },
    {
        path: '/login',
        component: 'login-component',
    },
    {
        path: '/register',
        component: 'register-component',
    },
    {
        path: '/add',
        component: 'add-component',
    },
    {
        path: '/destinations',
        component: 'my-destinations-component',
    },
    {
        path: '/details/:id',
        component: 'details-component'
    },
    {
        path: '/edit/:id',
        component: 'edit-component',
    },
    {
        path: '/logout',
        action: (context, commands) => {
            notify('Loading...', 'notification loadingBox')
            logout();
            notify('Successfully Logged Out', 'notification infoBox');
            return commands.redirect('/login');
        }
    },
    {
        path: '/delete/:id',
        action: (context, commands) => {
            notify('Loading...', 'notification loadingBox')
            deleteDestination(context.params.id).then(res => {
                notify('Successfully Deleted', 'notification infoBox');
                Router.go('/home')
            })
        }
    },
]);

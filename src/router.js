import {Form} from "./component/form.js";

export class Router {
    constructor() {
        this.contentElement = document.getElementById('content-page');
        this.stylesElement = document.getElementById('styles');
        this.titleElement = document.getElementById('page-title');

        this.routes = [
            {
                route: '#/',
                title: 'Главная',
                page: 'layout.html',
                styles: '',
                load: () => {

                }
            },
            {
                route: '#/signup',
                title: 'Регистрация',
                page: 'signup.html',
                styles: 'css/form.css',
                load: () => {
                    new Form("signup");
                }
            },
            {
                route: '#/login',
                title: 'Вход',
                page: 'login.html',
                load: () => {
                    new Form("login");
                }
            },
        ]
    }

    async openRoute() {
        const urlRoute = window.location.hash.split('?')[0];
        //const urlRoute = window.location.hash.slice(1) || '/';
        const newRoute = this.routes.find(item => {
            return item.route === urlRoute;
        })

        if(!newRoute) {
            window.location.href = '#/signup';
            return;
        }

        this.contentElement.innerHTML =
            await fetch(newRoute.page).then(response => response.text())
        this.stylesElement.setAttribute('href', newRoute.styles);
        this.titleElement.innerText = newRoute.title;

        newRoute.load();

    }
}
import {Form} from "./component/form.js";
import {config, config2} from "./component/main.js"

export class Router {
    constructor() {
        this.contentElement = document.getElementById('content-page');
        this.stylesElement = document.getElementById('styles');
        this.titleElement = document.getElementById('page-title');

        this.routes = [
            {
                route: '#/',
                title: 'Главная',
                page: 'templates/layout.html',
                styles: 'css/main.css',
                load: () => {
                    const ctx = document.getElementById('myChart');
                    const ctx2 = document.getElementById('myChart2');
                    const myChart = new Chart(ctx, config);
                    const myChart2 = new Chart(ctx2, config2);
                }
            },
            {
                route: '#/signup',
                title: 'Регистрация',
                page: 'templates/signup.html',
                styles: 'css/form.css',
                load: () => {
                    new Form("signup");
                }
            },
            {
                route: '#/login',
                title: 'Вход',
                page: 'templates/login.html',
                styles: 'css/form.css',
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
            window.location.href = '#/';
            return;
        }

        this.contentElement.innerHTML =
            await fetch(newRoute.page).then(response => response.text())
        this.stylesElement.setAttribute('href', newRoute.styles);
        this.titleElement.innerText = newRoute.title;

        newRoute.load();

    }
}
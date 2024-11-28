import {Form} from "./component/form.js";
import {config, config2} from "./component/main.js";
import {Auth} from "./services/auth.js";
import {Sidebar} from "./component/sidebar.js";
import {EditFinances} from "./component/edit_finances.js";
import {CreateCategory} from "./component/create_category";
import {UpdateCategory} from "./component/update_category";

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
                    new Sidebar();
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
            {
                route: '#/finances',
                title: 'Доходы',
                page: 'templates/finances.html',
                styles: 'css/finances.css',
                load: () => {

                    new EditFinances("finances");
                }
            },
            {
                route: '#/edit_finances',
                title: 'Редактирование доходов',
                page: 'templates/edit_finances.html',
                styles: 'css/edit_finances.css',
                load: () => {
                    new UpdateCategory("finances")
                    //document.getElementById("edit_category_name").value="Зарплата";
                }
            },
            {
                route: '#/create_finances',
                title: 'Создание дохода',
                page: 'templates/create_finances.html',
                styles: 'css/edit_finances.css',
                load: () => {
                    new CreateCategory("finances")
                }
            },
            {
                route: '#/expenses',
                title: 'Расходы',
                page: 'templates/expenses.html',
                styles: 'css/finances.css',
                load: () => {
                    new EditFinances("expenses");
                }
            },
            {
                route: '#/create_expenses',
                title: 'Создание расхода',
                page: 'templates/create_expenses.html',
                styles: 'css/edit_finances.css',
                load: () => {
                    new CreateCategory("expenses")
                }
            },
            {
                route: '#/edit_expenses',
                title: 'Редактирование расхода',
                page: 'templates/edit_expenses.html',
                styles: 'css/edit_finances.css',
                load: () => {
                    new UpdateCategory("expenses")
                    //document.getElementById("edit_expenses_name").value="Жильё";
                }
            },
            {
                route: '#/finances_and_expenses',
                title: 'Доходы и расходы',
                page: 'templates/finances_and_expenses.html',
                styles: 'css/finances_expenses.css',
                load: () => {
                    new Sidebar();
                }
            },
            {
                route: '#/operations_create',
                title: 'Создать операцию',
                page: 'templates/operations_create.html',
                styles: 'css/edit_finances.css',
                load: () => {

                }
            },
            {
                route: '#/operations_edit',
                title: 'Редактировать операцию',
                page: 'templates/operations_edit.html',
                styles: 'css/edit_finances.css',
                load: () => {

                }
            },
        ]
    }

    async openRoute() {
        const urlRoute = window.location.hash.split('?')[0];
        //const urlRoute = window.location.hash.slice(1) || '/';
        const userInfo = Auth.getUserInfo();

        if (urlRoute === '#/logout') {
            await Auth.logout();
            window.location.href = '#/login';
            return;
        }

        if (!userInfo && urlRoute !== '#/signup' && urlRoute !== '#/login') {
            window.location.href = '#/login';
            return;
        }

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
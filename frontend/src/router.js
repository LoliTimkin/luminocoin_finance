import {Form} from "./component/form.js";
import {configCanvas, configCanvas2, Main, testData} from "./component/main.js";
import {Auth} from "./services/auth.js";
import {Sidebar} from "./component/sidebar.js";
import {EditFinances} from "./component/edit_finances.js";
import {CreateCategory} from "./component/create_category.js";
import {UpdateCategory} from "./component/update_category.js";
import {Operations} from "./component/operations.js";
import {CreateOperation} from "./component/create_operation.js";
import {EditOperation} from "./component/edit_operation.js";

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
                    new Main();
                    const ctx = document.getElementById('myChart');
                    const ctx2 = document.getElementById('myChart2');
                    const myChart = new Chart(ctx, configCanvas);
                    const myChart2 = new Chart(ctx2, configCanvas2);
                    console.log(testData)
                    const dataIncome = testData.filter(item=> {
                        return item.type === "income"
                    })
                    console.log(dataIncome)
                    const dataExpense = testData.filter(item=> {
                        return item.type === "expense"
                    })
                    console.log(dataExpense)

                    const incomeCategoryCount = {};
                    const expenseCategoryCount = {};

                    dataIncome.forEach(item => {
                        incomeCategoryCount[item.category] = (incomeCategoryCount[item.category] || 0) + 1;
                    });

                    dataExpense.forEach(item => {
                        expenseCategoryCount[item.category] = (expenseCategoryCount[item.category] || 0) + 1;
                    });

                    console.log(incomeCategoryCount)
                    console.log(expenseCategoryCount)

                    const incomeCategoryToPercent = {};
                    for (let category in incomeCategoryCount) {
                        incomeCategoryToPercent[category] = ((incomeCategoryCount[category] / dataIncome.length) * 100).toFixed(2) + '%';
                    }

                    const expenseCategoryToPercent = {};
                    for (let category in expenseCategoryCount) {
                        expenseCategoryToPercent[category] = ((expenseCategoryCount[category] / dataExpense.length) * 100).toFixed(2) + '%';
                    }
                    console.log(incomeCategoryToPercent)
                    console.log(expenseCategoryToPercent)
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
                    new Operations()
                }
            },
            {
                route: '#/operations_create',
                title: 'Создать операцию',
                page: 'templates/operations_create.html',
                styles: 'css/edit_finances.css',
                load: () => {
                    new CreateOperation()
                }
            },
            {
                route: '#/operations_edit',
                title: 'Редактировать операцию',
                page: 'templates/operations_edit.html',
                styles: 'css/edit_finances.css',
                load: () => {
                    new EditOperation()
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
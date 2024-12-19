import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";
//import flatpickr from "flatpickr";
//import "flatpickr/dist/flatpickr.min.css";
//const flatpickr = require("flatpickr");

export class Operations {
    constructor() {
        this.createButtonIncome = document.getElementById('create-button-income')
        this.createButtonExpenses = document.getElementById('create-button-expense')
        this.removeModalButton = document.getElementById('modal-remove-operation')
        let calendarDateFrom = document.getElementById('calendarFrom')
        let calendarDateTo = document.getElementById('calendarTo')
        this.dateRangeBtn = document.getElementById('range-calendar')

        //document.addEventListener("DOMContentLoaded", () => {
            const buttons = document.querySelectorAll(".filter-button"); // Все кнопки
            let activeButton = document.querySelector(".filter-button.btn-secondary"); // Кнопка по умолчанию
            //const calendars = document.querySelector(".calendar")

        flatpickr(this.dateRangeBtn, {
            mode: "range", // Режим выбора диапазона
            //dateFormat: "d.m.Y", // Формат отображения даты
            dateFormat: "Y-m-d",
            onClose: (selectedDates)=> {
                if (selectedDates.length === 2) {
                    // Если выбраны обе даты, обновляем кнопки
                    const startDate = selectedDates[0].toLocaleDateString("ru-RU"); // Первая дата
                    const endDate = selectedDates[1].toLocaleDateString("ru-RU");   // Вторая дата

                    calendarDateFrom.textContent = startDate;
                    calendarDateTo.textContent = endDate;

                    this.getOperationsByFilter("interval", selectedDates[0], selectedDates[1])
                }
            }
        });

        // Установить фильтр для активной кнопки по умолчанию
            if (activeButton) {
                this.getOperationsByFilter(activeButton.dataset.filter);
            }

            // Назначить обработчик для всех кнопок
            buttons.forEach((button) => {
                button.addEventListener("click", () => {
                    if (button !== activeButton) {
                        if (activeButton) {
                            activeButton.classList.remove("btn-secondary"); // Удаление класса у предыдущей кнопки
                            activeButton.classList.add("btn-outline-secondary")
                        }
                        button.classList.add("btn-secondary"); // Установка класса для текущей кнопки
                        button.classList.remove("btn-outline-secondary") //  Удаление неактивного состояния
                        activeButton = button; // Обновление активной кнопки
                        if (button !== this.dateRangeBtn) {
                            this.getOperationsByFilter(button.dataset.filter); // Применение фильтра
                        }

                    }
                });
            });
        //});

        this.createButtonIncome.addEventListener('click', () => {
                window.location.href = `#/operations_create`;
        })
        this.createButtonExpenses.addEventListener('click', () => {
                window.location.href = `#/operations_create`;
        })
        this.removeModalButton.addEventListener('click', () => {
            this.deleteOperation()
        })


        this.data = []
        //this.getOperationsByFilter("day")
    }

    async getOperationsByFilter(period, startDate = null, endDate = null ){
        const queryParams = new URLSearchParams();
        queryParams.append("period", period)

        if (period === "interval") {
            queryParams.append("dateFrom", startDate)
            queryParams.append("dateTo", endDate)
        }

        try {
            //const result = await CustomHttp.request(config.host + `/operations?period=${period}`,
            const result = await CustomHttp.request(config.host + `/operations?${queryParams}`,
                'GET',
            )
            if (result) {
                if (result.error) {
                    throw new Error(result.message);
                }
                this.data = result
                console.log(this.data)
                this.renderingPage()
            }
        } catch (error) {
            return console.log(error)
        }

    }

    createRow(item, categoryName) {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <th scope="row">${item.id}</th>
                    <td id="type">${item.type}</td>
                    <td id="categoryName">${categoryName}</td>
                    <td id="amount">${item.amount}$</td>
                    <td id="date">${item.date}</td>
                    <td id="comment">${item.comment}</td>
                    <td>
                        <svg data-bs-toggle="modal" class="svg-remove-operation" data-bs-target="#exampleModal" width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.5 5.5C4.77614 5.5 5 5.72386 5 6V12C5 12.2761 4.77614 12.5 4.5 12.5C4.22386 12.5 4 12.2761 4 12V6C4 5.72386 4.22386 5.5 4.5 5.5Z"
                                  fill="black"/>
                            <path d="M7 5.5C7.27614 5.5 7.5 5.72386 7.5 6V12C7.5 12.2761 7.27614 12.5 7 12.5C6.72386 12.5 6.5 12.2761 6.5 12V6C6.5 5.72386 6.72386 5.5 7 5.5Z"
                                  fill="black"/>
                            <path d="M10 6C10 5.72386 9.77614 5.5 9.5 5.5C9.22386 5.5 9 5.72386 9 6V12C9 12.2761 9.22386 12.5 9.5 12.5C9.77614 12.5 10 12.2761 10 12V6Z"
                                  fill="black"/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M13.5 3C13.5 3.55228 13.0523 4 12.5 4H12V13C12 14.1046 11.1046 15 10 15H4C2.89543 15 2 14.1046 2 13V4H1.5C0.947715 4 0.5 3.55228 0.5 3V2C0.5 1.44772 0.947715 1 1.5 1H5C5 0.447715 5.44772 0 6 0H8C8.55229 0 9 0.447715 9 1H12.5C13.0523 1 13.5 1.44772 13.5 2V3ZM3.11803 4L3 4.05902V13C3 13.5523 3.44772 14 4 14H10C10.5523 14 11 13.5523 11 13V4.05902L10.882 4H3.11803ZM1.5 3V2H12.5V3H1.5Z"
                                  fill="black"/>
                        </svg>
                        <svg class="svg-edit-operation" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.1465 0.146447C12.3417 -0.0488155 12.6583 -0.0488155 12.8536 0.146447L15.8536 3.14645C16.0488 3.34171 16.0488 3.65829 15.8536 3.85355L5.85357 13.8536C5.80569 13.9014 5.74858 13.9391 5.68571 13.9642L0.68571 15.9642C0.500001 16.0385 0.287892 15.995 0.146461 15.8536C0.00502989 15.7121 -0.0385071 15.5 0.0357762 15.3143L2.03578 10.3143C2.06092 10.2514 2.09858 10.1943 2.14646 10.1464L12.1465 0.146447ZM11.2071 2.5L13.5 4.79289L14.7929 3.5L12.5 1.20711L11.2071 2.5ZM12.7929 5.5L10.5 3.20711L4.00001 9.70711V10H4.50001C4.77616 10 5.00001 10.2239 5.00001 10.5V11H5.50001C5.77616 11 6.00001 11.2239 6.00001 11.5V12H6.29291L12.7929 5.5ZM3.03167 10.6755L2.92614 10.781L1.39754 14.6025L5.21903 13.0739L5.32456 12.9683C5.13496 12.8973 5.00001 12.7144 5.00001 12.5V12H4.50001C4.22387 12 4.00001 11.7761 4.00001 11.5V11H3.50001C3.28561 11 3.10272 10.865 3.03167 10.6755Z"
                                  fill="black"/>
                        </svg>
                    </td>
                    `;
        return row;
    }

    async getOperationById(id) {
        try {
            let categoryName;
            const result = await CustomHttp.request(config.host + `/operations/${id}`,
                'GET',
            )
            if (result) {
                if (result.error) {
                    throw new Error(result.message);
                }
                categoryName = result.category
                console.log(categoryName)
                return categoryName
            }
        } catch (error) {
            return console.log(error)
        }
    }

     renderingPage() {
        const operationsTable = document.getElementById('table-body');
        operationsTable.innerHTML = ''
        // Проходим по каждому элементу данных и добавляем строчку в таблицу
        this.data.forEach(item => {
            this.getOperationById(item.id).then(categoryName => {
                const row = this.createRow(item, categoryName);
                operationsTable.appendChild(row);
            })
        });
        //this.editOperationIcons = document.querySelectorAll('.svg-edit-operation')
        //this.editOperationIcons.forEach(icon => {
        operationsTable.addEventListener('click', (event) => {
            const icon = event.target.closest('.svg-edit-operation');
            if(icon) {
                const row = icon.closest('tr');
                if(row) {
                    const th = row.querySelector('th')
                    if(th) {
                        const operationId = th.textContent
                        const type = (row.querySelector(`td[id="type"]`)).innerText
                        const categoryName = (row.querySelector(`td[id="categoryName"]`)).innerText
                        const amount = (row.querySelector(`td[id="amount"]`)).innerText
                        const date = (row.querySelector(`td[id="date"]`)).innerText
                        const comment = (row.querySelector(`td[id="comment"]`)).innerText
                        if (operationId) window.location.href = `#/operations_edit?id=${operationId}&type=${type}&categoryName=${categoryName}&amount=${amount}&date=${date}&comment=${comment}`;
                    }
                }
                //window.location.href = ``;
            }
        })
        operationsTable.addEventListener('click', (event) => {
            const icon = event.target.closest('.svg-remove-operation')
            if(icon) {
                const row = icon.closest('tr');
                if(row) {
                    const th = row.querySelector('th')
                    if(th) {
                        const operationId = th.textContent
                        if (operationId) window.location.href = `#/finances_and_expenses?id=${operationId}`;
                    }
                }

            }
        })
        //})
    }

    async deleteOperation() {
        const hash = window.location.hash
        const queryString = hash.split("?")[1]
        const params = new URLSearchParams(queryString)
        const operationId = params.get("id")

        try {
            const result = await CustomHttp.request(config.host + `/operations/${operationId}`,
                'DELETE',
            )
            if (result) {
                if (result.error) {
                    throw new Error(result.message);
                }

            }
        } catch (error) {
            return console.log(error)
        }
    }

    async getCategories(){

        try {
            const income = await CustomHttp.request(config.host + `/categories/${typeOfCategory}`,
                'GET'
            )
            if (income) {
                if (options.error) {
                    throw new Error(result.message);
                }
                this.income = income
            }
        } catch (error) {
            return console.log(error)
        }

        try {
            const expense = await CustomHttp.request(config.host + `/categories/expense`,
                'GET'
            )
            if (income) {
                if (options.error) {
                    throw new Error(result.message);
                }
                this.expense = expense
            }
        } catch (error) {
            return console.log(error)
        }
    }

}
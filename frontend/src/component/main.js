import {CustomHttp} from "../services/custom-http";
import config from "../../config/config.js";

export class Main {
    constructor() {

        let calendarDateFrom = document.getElementById('calendarFrom')
        let calendarDateTo = document.getElementById('calendarTo')
        this.dateRangeBtn = document.getElementById('range-calendar')

        const buttons = document.querySelectorAll(".filter-button"); // Все кнопки
        let activeButton = document.querySelector(".filter-button.btn-secondary"); // Кнопка по умолчанию

        flatpickr(this.dateRangeBtn, {
            mode: "range", // Режим выбора диапазона
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
                //this.renderingPage()
            }
        } catch (error) {
            return console.log(error)
        }

    }

    calculateStatistics(testData) {
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
}

const DATA_COUNT = 5;
const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
        {
            label: 'Dataset 1',
            data: [10, 20, 30, 15, 25],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)'
            ],
        }
    ]
};

export const configCanvas = {
    type: 'pie',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: "Доходы"
            }
        }
    },
};

//const myChart = new Chart(ctx, config);

export const configCanvas2 = {
    type: 'pie',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: "Расходы"
            }
        }
    },
};

//const myChart2 = new Chart(ctx2, config2);


 export const testData = [
    {
        "id": 8,
        "type": "income",
        "amount": 50000,
        "date": "2024-12-19",
        "comment": "новые технологии",
        "category": "Роботы"
    },
    {
        "id": 9,
        "type": "expense",
        "amount": 20000,
        "date": "2024-12-19",
        "comment": "аренда",
        "category": "Офис"
    },
    {
        "id": 10,
        "type": "expense",
        "amount": 20000,
        "date": "2024-12-19",
        "comment": "разово",
        "category": "Реклама"
    },
    {
        "id": 11,
        "type": "income",
        "amount": 30000,
        "date": "2024-12-19",
        "comment": "обучение",
        "category": "Роботы"
    },
    {
        "id": 12,
        "type": "income",
        "amount": 30000,
        "date": "2024-12-19",
        "comment": "обучение",
        "category": "Графика"
    }
];





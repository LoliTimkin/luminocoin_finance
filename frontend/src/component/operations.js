export class Operations {
    constructor(page) {
        this.createButtonIncome = document.getElementById('create-button-income')
        this.createButtonExpenses = document.getElementById('create-button-expense')
        this.createButtonIncome.addEventListener('click', () => {
                window.location.href = `#/operations_create`;
        })
        this.createButtonExpenses.addEventListener('click', () => {
                window.location.href = `#/operations_create`;
        })
    }
}
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class CreateOperation {
    constructor() {
        //this.page = page
        this.createButton = document.getElementById('create-operation');
        this.declineButton = document.getElementById('decline-button');

        this.inputTypeOperation = document.getElementById('input-category-type')
        this.inputCategoryOperation = document.getElementById('input-category-name')
        this.inputSumOperation = document.getElementById('input-sum-operation')
        this.inputDateOperation = document.getElementById('input-date-operation')
        this.inputCommentOperation = document.getElementById('input-comment-operation')

        this.inputTypeOperation.addEventListener("change", (event) => {
            this.getCategories()
        })

        this.createButton.addEventListener("click", (event) => {
            this.createOperation()
            window.location.href = "#/finances_and_expenses"
/*            if(page==="finances") {
                this.createOperation()
                window.location.href = "#/finances_and_expenses"
            } else if(page === "expenses") {
                this.createOperation()
                window.location.href = "#/finances_and_expenses"
            } else {
                window.location.href = "#/"
            }*/
        })

        this.declineButton.addEventListener('click', function() {
                window.location.href = "#/finances_and_expenses"
        })
    }

    async getCategories(){
        const typeOfCategory = this.inputTypeOperation.value

        try {
            const options = await CustomHttp.request(config.host + `/categories/${typeOfCategory}`,
                'GET'
            )
            if (options) {
                if (options.error) {
                    throw new Error(result.message);
                }

                if (options.length > 0) {
                    options.forEach(option => {
                        const optionElement = document.createElement('option');
                        optionElement.value = option.id;
                        optionElement.textContent = option.title;
                        this.inputCategoryOperation.appendChild(optionElement);
                    });
                } else {
                    this.inputCategoryOperation.innerHTML = '<option value="">Нет доступных вариантов</option>';
                }
            }
        } catch (error) {
            return console.log(error)
        }
    }

    async createOperation() {
        const typeOfCategory = this.inputTypeOperation.value
        //const categoryName = this.inputCategoryOperation.textContent;
        const categoryId = parseInt(this.inputCategoryOperation.value)
        const sum = parseInt(this.inputSumOperation.value)
        const comment = this.inputCommentOperation.value
        const date = this.inputDateOperation.value
/*        if (this.page === "expenses") {
            this.typeOfCategory = "expense"
        } else {
            this.typeOfCategory = "income"
        }*/

        try {
            const result = await CustomHttp.request(config.host + `/operations/`,
                'POST',
                {
                    "type": typeOfCategory,
                    "amount": sum,
                    "date": date, //"2022-01-01"
                    "comment": comment,
                    "category_id": categoryId
                }
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
}
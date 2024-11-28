import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class CreateCategory {
    constructor(page) {
        this.typeOfCategory = ''
        this.page = page
        this.createButton = document.getElementById('create-category');
        this.declineButton = document.getElementById('decline-button');
        this.inputButton = document.getElementById('input-create-category')

        this.createButton.addEventListener('click', () => {
            if(page==="finances") {
                this.createCategory()
                window.location.href = "#/finances"
            } else if(page === "expenses") {
                this.createCategory()
                window.location.href = "#/expenses"
            } else {
                window.location.href = "#/"
            }
        })

        this.declineButton.addEventListener('click', function() {
            if(page==="finances") {
                window.location.href = "#/finances"
            } else if(page === "expenses") {
                window.location.href = "#/expenses"
            } else {
                window.location.href = "#/"
            }
        })
    }

    async createCategory() {
        const categoryName = this.inputButton.value;

        if (this.page === "expenses") {
            this.typeOfCategory = "expense"
        } else {
            this.typeOfCategory = "income"
        }

        try {
            const result = await CustomHttp.request(config.host + `/categories/${this.typeOfCategory}/`,
                'POST',
                {
                    title: categoryName
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
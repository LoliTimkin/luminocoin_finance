import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";


export class EditOperation {
    constructor() {
        const hash = window.location.hash;
        const queryString = hash.split('?')[1];
        const params = new URLSearchParams(queryString);
        this.operationId = params.get('id');
        this.type = params.get('type');
        const categoryName = params.get('categoryName');
        const amount = params.get('amount');
        const date = params.get('date');
        const comment = params.get('comment');

        this.inputType = document.getElementById('type')
        this.inputType.value = (this.type === "income")? "Доход": "Расход";
        this.inputCategoryName = document.getElementById('categoryName')
        this.inputCategoryName.value = categoryName
        this.inputAmount = document.getElementById('amount')
        this.inputAmount.value = amount
        this.inputDate = document.getElementById('date')
        this.inputDate.value = date
        this.inputComment = document.getElementById('comment')
        this.inputComment.value = comment

        this.editButton = document.getElementById('edit-button');
        this.declineButton = document.getElementById('decline-button');

        this.editButton.addEventListener('click', () => {
            this.getCategoriesPreUpdate()
        })

        this.declineButton.addEventListener('click', function() {
                window.location.href = "#/finances_and_expenses"
        })
    }

    async updateOperation(categoryId) {
        const amountWithoutDollar = (this.inputAmount.value).replace('$', '').trim();

        try {
            const result = await CustomHttp.request(config.host + `/operations/${this.operationId}`,
                'PUT',
                {
                    "type": this.type,
                    "amount": amountWithoutDollar,
                    "date": this.inputDate.value,
                    "comment": this.inputComment.value,
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

    async getCategoriesPreUpdate(){

        try {
            const categories = await CustomHttp.request(config.host + `/categories/${this.type}`,
                'GET'
            )
            if (categories) {
                if (categories.error) {
                    throw new Error(result.message);
                }

                const category = categories.find(cat => {
                    return cat.title === this.inputCategoryName.value
                })
                console.log(category)

                if (category.id) {
                    await this.updateOperation(category.id)
                    window.location.href = "#/finances_and_expenses"
                }
            }
        } catch (error) {
            return console.log(error)
        }
    }
}
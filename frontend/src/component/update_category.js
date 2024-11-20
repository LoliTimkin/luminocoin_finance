import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class UpdateCategory {
    constructor(page) {
        this.editButton = document.getElementById('edit-category');
        this.declineButton = document.getElementById('decline-button');
        this.inputButton = document.getElementById("edit-category-name");

        const hash = window.location.hash;
        const queryString = hash.split('?')[1];
        const params = new URLSearchParams(queryString);
        //this.categoryId = params.get('id');
        this.categoryName = params.get('category');
        this.inputButton.value= this.categoryName;

        this.editButton.addEventListener('click', () => {
            if(page==="finances") {
                this.editCategory()
                window.location.href = "#/finances"
            }
        })

        this.declineButton.addEventListener('click', function() {
            if(page==="finances")
                window.location.href = "#/finances"
        })
    }

    async editCategory() {
        const categoryName = this.inputButton.value;
        const categoryId = 5;

        try {
            const result = await CustomHttp.request(config.host + `/categories/income/${categoryId}`,
                'PUT',
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
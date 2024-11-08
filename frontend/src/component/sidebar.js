import {CustomHttp} from "../services/custom-http.js";

export class Sidebar {
    constructor() {
        this.balance = document.getElementById('balance-value');
        this.getBalance();
    }

    async getBalance() {
        try {
            const result = await CustomHttp.request('http://localhost:3000/api/balance', 'GET')
            if (result) {
                if (result.error) {
                    throw new Error(result.message);
                }
                this.balance.innerText = result.balance + "$"
            }
        } catch (error) {
            return console.log(error)
        }
    }


}



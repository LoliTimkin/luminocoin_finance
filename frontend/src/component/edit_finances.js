import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class EditFinances {
    // Находим все кнопки с классом 'edit-btn'

    constructor(page) {
         this.createButton = document.getElementById('create_item')
         const that = this
         this.removeModalButton = document.getElementById('modal-remove-category')
         this.removeModalButton.addEventListener('click', function() {
             that.deleteCategory()
         })

         this.page = page
         this.data = [
            { "id": 1, "title": "Депозиты" },
            { "id": 2, "title": "Зарплата" },
            { "id": 3, "title": "Сбережения" },
            { "id": 4, "title": "Инвестиции" }
        ];
        //const response = CustomHttp.request(config.host + '/categories/income');
        //console.log(response)
        if (page === "expenses") {
            this.data = [
                { "id": 14, "title": "Еда" },
                { "id": 15, "title": "Жилье" },
                { "id": 16, "title": "Здоровье" },
                { "id": 17, "title": "Кафе" },
                { "id": 18, "title": "Авто" },
                { "id": 19, "title": "Одежда" },
                { "id": 20, "title": "Развлечения" },
                { "id": 21, "title": "Счета" },
                { "id": 22, "title": "Спорт" }
            ];
        }
         this.cardsGenerator()
         this.editButtons = document.querySelectorAll('.btn-edit');
         this.removeButtons = document.querySelectorAll('.btn-remove')
         this.editButtonHandler()
    }

    editButtonHandler() {
        this.editButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault(); // Предотвращаем стандартное действие ссылки
                const categoryCard = button.closest('.card');
                const categoryName = categoryCard.querySelector('.card-title').textContent;
                if (this.page === "expenses")  {
                    window.location.href = '#/edit_expenses';
                } else {
                    window.location.href = `#/edit_finances?category=${categoryName}`;
                }
            });
        });

        this.removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.preventDefault(); // Предотвращаем стандартное действие ссылки
                const categoryCard = button.closest('.card');
                const categoryName = categoryCard.querySelector('.card-title').textContent;
                const categoryId = categoryCard.querySelector('.btn-remove').id;
                if (this.page === "expenses")  {
                    window.location.href = '#/edit_expenses';
                } else {
                    window.location.href = `#/finances?category=${categoryName}&id=${categoryId}`;
                }
            });
        });

        this.createButton.addEventListener('click', function (event){
            if (this.page === "expenses")  {
                window.location.href = '#/create_expenses';
            } else {
                window.location.href = '#/create_finances';
            }
        })
    }

    async cardsGenerator() {
        // Получаем данные с сервера и добавляем в исходный набор данных
/*        try {
            const result = await CustomHttp.request(config.host + '/categories/income',
                'GET')
            if (result) {
                if (result.error) {
                    throw new Error(result.message);
                }

                this.data = this.data.concat(result)
            }
        } catch (error) {
            return console.log(error)
        }*/

        // Получаем контейнер для карточек
        const cardsContainer = document.getElementById('cards-container');
        // Проходим по каждому элементу данных и добавляем карточку в контейнер
        this.data.forEach(item => {
            const card = this.createCard(item);
            cardsContainer.prepend(card);
        });
    }

    createCard(item) {
        const card = document.createElement('div');
        card.classList.add('col');
        card.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h3 class="card-title" id="category-name">${item.title}</h3>
          <div class="d-flex justify-content-start">
            <a href="#/edit_finances?id=${item.id}" class="btn btn-primary btn-edit">Редактировать</a>
            <a id="${item.id}" class="btn btn-danger btn-remove" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Удалить
            </a>
          </div>
        </div>
      </div>
    `;
        return card;
    }

    async deleteCategory() {
        const hash = window.location.hash;
        const queryString = hash.split('?')[1];
        const params = new URLSearchParams(queryString);
        const categoryId = params.get('id');
        //document.getElementById('category-name-input').value = categoryName || '';
        try {
            const result = await CustomHttp.request(`http://localhost:3000/api/categories/income/${categoryId}`,
                'DELETE')
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


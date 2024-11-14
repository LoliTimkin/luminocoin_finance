
export class EditFinances {
    // Находим все кнопки с классом 'edit-btn'

    constructor(page) {
         this.editButtons = document.querySelectorAll('.btn-edit');
         this.createButton = document.getElementById('create_item')
         this.editButtonHandler()
         this.page = page
         this.data = [
            { "id": 10, "title": "Депозиты" },
            { "id": 11, "title": "Зарплата" },
            { "id": 12, "title": "Сбережения" },
            { "id": 13, "title": "Инвестиции" }
        ];
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
    }

    editButtonHandler() {
        this.editButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault(); // Предотвращаем стандартное действие ссылки
                if (this.page === "expenses")  {
                    window.location.href = '#/edit_expenses';
                } else {
                    window.location.href = '#/edit_finances';
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

    cardsGenerator() {

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
          <h3 class="card-title">${item.title}</h3>
          <div class="d-flex justify-content-start">
            <a href="#/edit_finances?id=${item.id}" class="btn btn-primary btn-edit">Редактировать</a>
            <a href="#" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Удалить
            </a>
          </div>
        </div>
      </div>
    `;
        return card;
    }


}


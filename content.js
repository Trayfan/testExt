// Функция для добавления новой кнопки в меню
function addSendToServerButton(menu) {
    // Проверим, нет ли уже кнопки в меню
    if (menu.querySelector('[data-testid="menu_item__send_to_server"]')) {
        return;
    }

    const newItem = document.createElement('div');
    newItem.tabIndex = 0;
    newItem.role = 'button';
    newItem.className = 'Menu__item';
    newItem.dataset.testid = 'menu_item__send_to_server';

    // Создаем внутреннюю структуру элемента меню
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('Icon', 'Icon_size_tiny');
    svg.setAttribute('viewBox', '0 0 32 32');

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#send');
    svg.appendChild(use);

    const span = document.createElement('span');
    span.innerHTML = '&nbsp;Отправить на сервер';

    newItem.appendChild(svg);
    newItem.appendChild(span);

    // Добавляем обработчик событий для кнопки
    newItem.addEventListener('click', () => {
        openPopup();
    });

    // Вставим новый элемент в конец меню
    menu.appendChild(newItem);
}

// Функция для открытия всплывающего окна
function openPopup() {
    const popup = document.createElement('div');
    popup.innerHTML = `
      <div style="position: fixed; top: 20%; left: 50%; transform: translate(-50%, -50%); background: white; border: 1px solid #ccc; padding: 20px; z-index: 1001;">
        <textarea id="textInput" style="width: 300px; height: 100px;"></textarea>
        <br>
        <button id="submitBtn" style="margin-top: 10px; padding: 5px 10px; background-color: #4285F4; color: white; border: none; border-radius: 4px; cursor: pointer;">Submit</button>
      </div>
    `;
    document.body.appendChild(popup);

    document.getElementById('submitBtn').addEventListener('click', () => {
        const text = document.getElementById('textInput').value;
        sendToServer(text);
        document.body.removeChild(popup);
    });
}

// Функция для отправки данных на сервер
function sendToServer(text) {
    fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Функция для проверки появления меню
function checkForMenu() {
    const menu = document.querySelector('.tippy-content');
    if (menu) {
        addSendToServerButton(menu);
    }
}

// Проверяем наличие меню каждые 500 миллисекунд
setInterval(checkForMenu, 500);

// Функция для добавления новой кнопки в меню
function addSendToServerButton(menu, testCaseId, stepNumber) {
    // Проверим, нет ли уже кнопки в меню
    if (menu.querySelector(`[data-testid="menu_item__send_to_server_${testCaseId}_${stepNumber}"]`)) {
        return;
    }

    const newItem = document.createElement('div');
    newItem.tabIndex = 0;
    newItem.role = 'button';
    newItem.className = 'Menu__item';
    newItem.dataset.testid = `menu_item__send_to_server_${testCaseId}_${stepNumber}`;

    // Создаем внутреннюю структуру элемента меню
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('Icon', 'Icon_size_tiny');
    svg.setAttribute('viewBox', '0 0 32 32');

    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#send');
    svg.appendChild(use);

    const span = document.createElement('span');
    span.innerHTML = `&nbsp;Отправить на сервер (${testCaseId}-${stepNumber})`;

    newItem.appendChild(svg);
    newItem.appendChild(span);

    // Добавляем обработчик событий для кнопки
    newItem.addEventListener('click', () => {
        openPopup(testCaseId, stepNumber);
    });

    // Вставим новый элемент в конец меню
    menu.appendChild(newItem);
}

// Функция для открытия всплывающего окна
function openPopup(testCaseId, stepNumber) {
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
        showRequestBody(text, testCaseId, stepNumber);
        document.body.removeChild(popup);
    });
}

// Функция для отображения тела запроса во всплывающем окне
function showRequestBody(text, testCaseId, stepNumber) {
    const requestBody = {
        text: text,
        testCaseId: testCaseId,
        stepNumber: stepNumber
    };

    const popup = document.createElement('div');
    popup.innerHTML = `
      <div style="position: fixed; top: 20%; left: 50%; transform: translate(-50%, -50%); background: white; border: 1px solid #ccc; padding: 20px; z-index: 1001; max-height: 80%; overflow-y: auto;">
        <pre style="white-space: pre-wrap;">${JSON.stringify(requestBody, null, 2)}</pre>
        <br>
        <button id="closeBtn" style="margin-top: 10px; padding: 5px 10px; background-color: #4285F4; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
      </div>
    `;
    document.body.appendChild(popup);

    document.getElementById('closeBtn').addEventListener('click', () => {
        document.body.removeChild(popup);
    });
}

// Функция для проверки появления меню
function checkForMenu() {
    const testCaseIdElement = document.querySelector('.TestCaseLayout__id');
    if (!testCaseIdElement) return;

    const testCaseId = testCaseIdElement.innerText.replace('#', '');

    const testCaseElements = document.querySelectorAll('.TreeElement__node');
    testCaseElements.forEach((testCaseElement, index) => {
        const stepNumber = index + 1; // Определяем номер шага на основе индекса в списке
        const menu = document.querySelector('.tippy-content');
        if (menu && !menu.dataset.processed) {
            menu.dataset.processed = true; // Помечаем меню как обработанное
            addSendToServerButton(menu, testCaseId, stepNumber);
        }
    });
}

// Проверяем наличие меню каждые 500 миллисекунд
setInterval(checkForMenu, 500);

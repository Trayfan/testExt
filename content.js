// Функция для добавления новой кнопки рядом с выпадающим списком
function addCustomDropdownButton() {
    const testCaseElements = document.querySelectorAll('.TreeElement__node');
    testCaseElements.forEach(testCaseElement => {
        if (!testCaseElement.querySelector('.custom-dropdown-button')) {
            const button = document.createElement('button');
            button.innerText = 'Custom Actions';
            button.className = 'custom-dropdown-button';
            button.style.marginLeft = '10px';
            button.style.padding = '5px 10px';
            button.style.backgroundColor = '#4285F4';
            button.style.color = 'white';
            button.style.border = 'none';
            button.style.borderRadius = '4px';
            button.style.cursor = 'pointer';

            // Добавляем обработчик событий для кнопки
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                event.preventDefault();
                toggleDropdown(testCaseElement);
            });

            const wrapper = testCaseElement.querySelector('.TestCaseScenarioStepEdit__wrapper');
            if (wrapper) {
                wrapper.parentNode.insertBefore(button, wrapper.nextSibling);
            }
        }
    });
}

// Функция для создания и отображения выпадающего списка
function toggleDropdown(parentElement) {
    let dropdown = parentElement.querySelector('.custom-dropdown');
    if (dropdown) {
        dropdown.remove();
        return;
    }

    dropdown = document.createElement('div');
    dropdown.className = 'custom-dropdown';
    dropdown.style.position = 'absolute';
    dropdown.style.backgroundColor = 'white';
    dropdown.style.border = '1px solid #ccc';
    dropdown.style.padding = '10px';
    dropdown.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    dropdown.style.zIndex = '1000';

    const options = ['Kafka Producer', 'Kafka Consumer', 'DB', 'REST', 'Kibana'];
    options.forEach(option => {
        const item = document.createElement('div');
        item.innerText = option;
        item.style.padding = '5px 0';
        item.style.cursor = 'pointer';

        item.addEventListener('click', () => {
            openPopup(option);
            dropdown.remove();
        });

        dropdown.appendChild(item);
    });

    parentElement.appendChild(dropdown);
}

// Функция для открытия всплывающего окна
function openPopup(selectedOption) {
    const popup = document.createElement('div');
    popup.innerHTML = `
      <div style="position: fixed; top: 20%; left: 50%; transform: translate(-50%, -50%); background: white; border: 1px solid #ccc; padding: 20px; z-index: 1001;">
        <p>Selected option: ${selectedOption}</p>
        <textarea id="textInput" style="width: 300px; height: 100px;"></textarea>
        <br>
        <button id="submitBtn" style="margin-top: 10px; padding: 5px 10px; background-color: #4285F4; color: white; border: none; border-radius: 4px; cursor: pointer;">Submit</button>
      </div>
    `;
    document.body.appendChild(popup);

    document.getElementById('submitBtn').addEventListener('click', () => {
        const text = document.getElementById('textInput').value;
        showRequestBody(text, selectedOption);
        document.body.removeChild(popup);
    });
}

// Функция для отображения тела запроса во всплывающем окне
function showRequestBody(text, selectedOption) {
    const requestBody = {
        text: text,
        selectedOption: selectedOption
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

// Проверяем наличие элементов каждые 500 миллисекунд
setInterval(addCustomDropdownButton, 500);

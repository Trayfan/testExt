// Функция для добавления новых кнопок в меню
function addCustomButtons() {
    const sideMenu = document.querySelector('.SideMenu__list');
    if (!sideMenu || document.querySelector('.env-button')) return;

    // Создание кнопки для управления окружениями
    const manageEnvButton = document.createElement('button');
    manageEnvButton.innerText = 'Manage Envs';
    manageEnvButton.className = 'Button Button_size_base Button_style_default Button_shape_rectangular env-button';
    manageEnvButton.style.cursor = 'pointer';
    manageEnvButton.style.marginRight = '10px';

    manageEnvButton.addEventListener('click', (event) => {
        event.stopPropagation();
        openEnvPopup();
    });

    // Создание кнопки для отправки текста на сервер
    const sendToServerButton = document.createElement('button');
    sendToServerButton.innerText = 'Send to Server';
    sendToServerButton.className = 'Button Button_size_base Button_style_default Button_shape_rectangular send-button';
    sendToServerButton.style.cursor = 'pointer';

    sendToServerButton.addEventListener('click', (event) => {
        event.stopPropagation();
        openSendPopup();
    });

    const li = document.createElement('li');
    li.className = 'SideMenu__list-item';

    li.appendChild(manageEnvButton);
    li.appendChild(sendToServerButton);
    sideMenu.appendChild(li);
}

// Функция для открытия всплывающего окна управления окружениями
function openEnvPopup() {
    const existingPopup = document.querySelector('.env-popup');
    if (existingPopup) existingPopup.remove();

    const popup = document.createElement('div');
    popup.className = 'env-popup';
    popup.style.position = 'fixed';
    popup.style.top = '20%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -20%)';
    popup.style.backgroundColor = 'white';
    popup.style.border = '1px solid #ccc';
    popup.style.padding = '20px';
    popup.style.zIndex = '1001';
    popup.style.display = 'flex';
    popup.style.maxHeight = '70%';
    popup.style.overflowY = 'auto';

    const envList = document.createElement('div');
    envList.style.flex = '1';
    envList.style.marginRight = '20px';
    envList.innerHTML = `
      <h3>Environments</h3>
      <ul class="env-list"></ul>
      <button class="add-env-button">Add Environment</button>
    `;
    popup.appendChild(envList);

    const envDetails = document.createElement('div');
    envDetails.style.flex = '2';
    envDetails.innerHTML = `
      <h3>Variables</h3>
      <ul class="env-details"></ul>
      <button class="add-var-button">Add Variable</button>
    `;
    popup.appendChild(envDetails);

    document.body.appendChild(popup);

    document.addEventListener('click', (event) => {
        if (!popup.contains(event.target) && !event.target.classList.contains('env-button')) {
            popup.remove();
        }
    }, { once: true });

    addEnvPopupEventListeners(popup);
}

// Функция для открытия всплывающего окна для отправки текста на сервер
function openSendPopup() {
    const popup = document.createElement('div');
    popup.innerHTML = `
      <div style="position: fixed; top: 20%; left: 50%; transform: translate(-50%, -20%); background: white; border: 1px solid #ccc; padding: 20px; z-index: 1001;">
        <textarea id="textInput" style="width: 300px; height: 100px;"></textarea>
        <br>
        <button id="submitBtn" style="margin-top: 10px; padding: 5px 10px; background-color: #4285F4; color: white; border: none; border-radius: 4px; cursor: pointer;">Submit</button>
      </div>
    `;
    document.body.appendChild(popup);

    document.getElementById('submitBtn').addEventListener('click', () => {
        const text = document.getElementById('textInput').value;
        showRequestBody(text);
        document.body.removeChild(popup);
    });
}

// Функция для отображения тела запроса во всплывающем окне
function showRequestBody(text) {
    const requestBody = {
        text: text
    };

    const popup = document.createElement('div');
    popup.innerHTML = `
      <div style="position: fixed; top: 20%; left: 50%; transform: translate(-50%, -20%); background: white; border: 1px solid #ccc; padding: 20px; z-index: 1001; max-height: 80%; overflow-y: auto;">
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

// Функция для добавления обработчиков событий в всплывающее окно
function addEnvPopupEventListeners(popup) {
    const addEnvButton = popup.querySelector('.add-env-button');
    const envList = popup.querySelector('.env-list');
    const envDetails = popup.querySelector('.env-details');

    let environments = JSON.parse(localStorage.getItem('environments')) || [];

    function saveEnvironments() {
        localStorage.setItem('environments', JSON.stringify(environments));
    }

    function renderEnvList() {
        envList.innerHTML = '';
        environments.forEach((env, index) => {
            const li = document.createElement('li');
            li.innerText = env.name;
            li.style.cursor = 'pointer';

            li.addEventListener('click', () => {
                renderEnvDetails(index);
            });

            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.style.marginLeft = '10px';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                environments.splice(index, 1);
                saveEnvironments();
                renderEnvList();
                envDetails.innerHTML = '<h3>Variables</h3><ul class="env-details"></ul><button class="add-var-button">Add Variable</button>';
            });

            li.appendChild(deleteButton);
            envList.appendChild(li);
        });
    }

    function renderEnvDetails(envIndex) {
        const env = environments[envIndex];
        envDetails.innerHTML = `
        <h3>${env.name} Variables</h3>
        <ul class="env-details">
          ${env.variables.map((variable, varIndex) => `
            <li>
              <input type="text" value="${variable.name}" data-index="${varIndex}" class="var-name" placeholder="Name" />
              <input type="text" value="${variable.value}" data-index="${varIndex}" class="var-value" placeholder="Value" />
              <button data-index="${varIndex}" class="delete-var-button">Delete</button>
            </li>
          `).join('')}
        </ul>
        <button class="add-var-button">Add Variable</button>
      `;

        const addVarButton = envDetails.querySelector('.add-var-button');
        addVarButton.addEventListener('click', () => {
            env.variables.push({ name: '', value: '' });
            saveEnvironments();
            renderEnvDetails(envIndex);
        });

        const varNameInputs = envDetails.querySelectorAll('.var-name');
        const varValueInputs = envDetails.querySelectorAll('.var-value');
        varNameInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const varIndex = e.target.dataset.index;
                env.variables[varIndex].name = e.target.value;
                saveEnvironments();
            });
        });
        varValueInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const varIndex = e.target.dataset.index;
                env.variables[varIndex].value = e.target.value;
                saveEnvironments();
            });
        });

        const deleteVarButtons = envDetails.querySelectorAll('.delete-var-button');
        deleteVarButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const varIndex = e.target.dataset.index;
                env.variables.splice(varIndex, 1);
                saveEnvironments();
                renderEnvDetails(envIndex);
            });
        });
    }

    addEnvButton.addEventListener('click', () => {
        const newEnv = { name: `Env ${environments.length + 1}`, variables: [] };
        environments.push(newEnv);
        saveEnvironments();
        renderEnvList();
    });

    renderEnvList();
}

// Добавляем кнопки при загрузке страницы
window.addEventListener('load', addCustomButtons);

// Проверяем наличие элементов каждые 500 миллисекунд для обновлений
setInterval(addCustomButtons, 500);

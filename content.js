window.addEventListener('load', () => {
    // Подождем, пока страница полностью загрузится
    setTimeout(() => {
      const dropdown = document.querySelector('.relative.flex.items-center'); // Найдем выпадающий список
      if (dropdown) {
        const button = document.createElement('button');
        button.innerText = 'Send to Server';
        button.style.display = 'block';
        button.style.margin = '10px 0';
        button.style.padding = '5px 10px';
        button.style.backgroundColor = '#4285F4';
        button.style.color = 'white';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.cursor = 'pointer';
  
        button.addEventListener('click', () => {
          openPopup();
        });
  
        // Вставим кнопку в конец выпадающего списка
        dropdown.appendChild(button);
      }
    }, 1000); // Задержка в 1 секунду для того, чтобы страница точно успела полностью загрузиться
  });
  
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
  
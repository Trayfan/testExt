import { openPopup } from './popupManager.js';

export function toggleDropdown(parentElement, testCaseId, stepNumber, button) {
    // Закрыть любые другие открытые выпадающие списки
    document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
        dropdown.remove();
    });

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

    const rect = button.getBoundingClientRect();
    dropdown.style.top = `${rect.bottom + window.scrollY}px`;
    dropdown.style.left = `${rect.left + window.scrollX}px`;

    const options = ['Kafka Producer', 'Kafka Consumer', 'DB', 'REST', 'Kibana'];
    options.forEach(option => {
        const item = document.createElement('div');
        item.innerText = option;
        item.style.padding = '5px 0';
        item.style.cursor = 'pointer';

        // Добавляем обработчик для выделения при наведении
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = '#f0f0f0';
        });
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'white';
        });

        item.addEventListener('click', () => {
            openPopup(testCaseId, stepNumber, option);
            dropdown.remove();
        });

        dropdown.appendChild(item);
    });

    document.body.appendChild(dropdown);

    // Добавляем обработчик для закрытия выпадающего списка при клике вне его
    document.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target) && !button.contains(event.target)) {
            dropdown.remove();
        }
    }, { once: true });
}

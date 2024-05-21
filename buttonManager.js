import { toggleDropdown } from './dropdownManager.js';

export function addCustomDropdownButton() {
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

            // Получаем номер кейса и шага
            const testCaseIdElement = document.querySelector('.TestCaseLayout__id');
            const testCaseId = testCaseIdElement ? testCaseIdElement.innerText.replace('#', '') : '';
            const stepNumberElement = testCaseElement.querySelector('.TestCaseStepRow__numbering');
            const stepNumber = stepNumberElement ? stepNumberElement.innerText : '';

            // Добавляем обработчик событий для кнопки
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                event.preventDefault();
                toggleDropdown(testCaseElement, testCaseId, stepNumber, button);
            });

            const wrapper = testCaseElement.querySelector('.TestCaseScenarioStepEdit__wrapper');
            if (wrapper) {
                wrapper.parentNode.insertBefore(button, wrapper.nextSibling);
            }
        }
    });
}

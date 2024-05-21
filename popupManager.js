export function openPopup(testCaseId, stepNumber, selectedOption) {
    const popup = document.createElement('div');
    popup.innerHTML = `
      <div style="position: fixed; top: 20%; left: 50%; transform: translate(-50%, -50%); background: white; border: 1px solid #ccc; padding: 20px; z-index: 1001;">
        <p>Selected option: ${selectedOption}</p>
        <p>Test case ID: ${testCaseId}</p>
        <p>Step number: ${stepNumber}</p>
        <textarea id="textInput" style="width: 300px; height: 100px;"></textarea>
        <br>
        <button id="submitBtn" style="margin-top: 10px; padding: 5px 10px; background-color: #4285F4; color: white; border: none; border-radius: 4px; cursor: pointer;">Submit</button>
      </div>
    `;
    document.body.appendChild(popup);

    document.getElementById('submitBtn').addEventListener('click', () => {
        const text = document.getElementById('textInput').value;
        showRequestBody(text, testCaseId, stepNumber, selectedOption);
        document.body.removeChild(popup);
    });
}

function showRequestBody(text, testCaseId, stepNumber, selectedOption) {
    const requestBody = {
        text: text,
        testCaseId: testCaseId,
        stepNumber: stepNumber,
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

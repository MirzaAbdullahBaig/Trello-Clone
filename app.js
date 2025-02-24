// DragAble Funcanilaty

const main = document.querySelector('#main');
const cardInput = document.querySelector("#card-input");

const addTask = (e) => {
    e.preventDefault();

    const form = e.target; // getting form
    const value = form.elements[0].value; // Save the value from input field
    const parentElement = form.parentElement; // Getting parent element || Getting div
    const ticket = createTicket(value);

    if (!value || value.trim() === '') return; // check if user enters a null value or Space

    parentElement.insertBefore(ticket, e.target);

    form.reset(); // Reset or clear the input form
};

const createCard = (cardTitle) => {
    const createDiv = document.createElement('div');
    const createH3 = document.createElement('h3');
    const createForm = document.createElement('form');
    const createInput = document.createElement('input');
    const cardTitleName = document.createTextNode(cardTitle);

    createDiv.setAttribute("class", "card-js border-2 border-solid border-amber-600 p-2 rounded-md flex flex-col min-w-72 gap-3");
    createH3.setAttribute("class", "text-center text-3xl font-sans font-semibold p-1 mb-5 bg-amber-500 rounded-md text-white");
    createInput.setAttribute("class", "w-full p-2 hover:bg-orange-100 focus:bg-orange-100");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("placeholder", "Add Task");

    createDiv.appendChild(createH3);
    createDiv.appendChild(createForm);
    createH3.appendChild(cardTitleName);
    createForm.appendChild(createInput);

    createForm.addEventListener("submit", addTask);

    createDiv.addEventListener('dragover', allowDrop);
    createDiv.addEventListener('drop', drop);

    return createDiv;
};

// Ensure unique IDs for draggable elements
let idCounter = 0;
const createTicket = (value) => {
    const ticket = document.createElement("p");
    const elementText = document.createTextNode(value);

    ticket.setAttribute("class", "text-center text-lg p-2 odd:bg-orange-100 even:bg-orange-50 hover:bg-orange-200");
    ticket.setAttribute("draggable", "true");
    ticket.setAttribute("id", `ticket-${idCounter++}`); // Ensure unique ID
    ticket.appendChild(elementText);

    ticket.addEventListener('dragstart', drag);

    return ticket;
};

const addCard = (e) => {
    e.preventDefault();
    
    const cardTitle = cardInput.value;
    if (!cardTitle || cardTitle.trim() === '') return; // check if user enters a null value or Space
    
    const newCard = createCard(cardTitle);

    main.insertBefore(newCard, cardInput.parentElement);
    cardInput.value = ''; // Reset the card input form
};

const drag = (e) => {
    e.dataTransfer.setData("text", e.target.id);
};

const allowDrop = (e) => {
    e.preventDefault();
};

const drop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    const ticket = document.getElementById(data);
    if (e.target.classList.contains('card-js')) {
        e.target.insertBefore(ticket, e.target.lastElementChild);
    } else if (e.target.parentElement.classList.contains('card-js')) {
        e.target.parentElement.insertBefore(ticket, e.target.parentElement.lastElementChild);
    }
};

cardInput.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        addCard(e);
    }
});

const card = document.querySelectorAll(".card-js")

const addTask = (e) => {
    e.preventDefault();

    const form = e.target // getting form
    const value = form.elements[0].value; // Save the value form input feild
    const parentElement = form.parentElement; // Getting parent element || Getting div
    const ticket = createTicket(value);

    parentElement.insertBefore(ticket, e.target)

    form.reset(); // Reset Or Clear the input Or from
};

for (let i = 0; i < card.length; i++) {
    const form = card[i].lastElementChild; // get the last element of form || get the input element of form
    
    form.addEventListener("submit", addTask);
}

const createTicket = (value) => {
    const ticket = document.createElement("p");
    const elementText = document.createTextNode(value);

    ticket.setAttribute("class", "text-center text-lg p-2 bg-orange-200")
    ticket.setAttribute("draggable", "true");
    ticket.appendChild(elementText);

    return ticket;
}
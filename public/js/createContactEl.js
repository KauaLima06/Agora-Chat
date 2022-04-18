//Create contacts elements
const createContactEl = (data) => {
    let { name, id } = data;

    const li = document.createElement('li');
    const contacLink = document.createElement('a');
    contacLink.href = `/chat.html?to=${id}`;
    const contact = document.createElement('div');
    contact.classList.add('contact');
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('imageDiv');
    const img = document.createElement('img');
    img.src = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bWVufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";
    // img.src = image do bd
    const divMessage = document.createElement('div');
    divMessage.classList.add('messageDiv');
    const contactName = document.createElement('p');
    contactName.classList.add('contact__name');
    contactName.innerText = name;
    // contactName.innerText = nome do bd
    const lastMessage = document.createElement('p');
    lastMessage.classList.add('contact__lastMessage');
    lastMessage.innerText = 'Hi, how are u?';
    // lastMessage.innerText = msg do bd;
    const lastMessageHour = document.createElement('p');
    lastMessageHour.classList.add('lastMessage__hour');
    lastMessageHour.innerText = '09:00';
    // lastMessage.innerText = last message hour from bd;

    imageDiv.append(img);
    divMessage.append(contactName);
    divMessage.append(lastMessage);

    contact.append(imageDiv);
    contact.append(divMessage);
    contact.append(lastMessageHour);

    // console.log(li, contact.classList, imageDiv, img, divMessage, lastMessage, lastMessageHour)

    contacLink.append(contact);
    li.append(contacLink);

    return li;
};

export { createContactEl };
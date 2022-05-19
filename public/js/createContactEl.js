//Create contacts elements
const createContactEl = (data) => {
    const { name:userName, userId, lastMessage, conversationId } = data;

        /*
    messages = [
        {
            sendBy: 'Who send',
            hour: 'Hour that was send. Ex.: 12:45',
            text: 'message',
        }
    ]
     */

    const li = document.createElement('li');
    const contacLink = document.createElement('a');
    contacLink.href = `/chat?to=${conversationId}&name=${userName}`;
    
    const contact = document.createElement('div');
    contact.classList.add('contact');
    
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('imageDiv');
    
    const img = document.createElement('img');
    img.src = "../images/profile-default-image.jpg";
    // img.src = image do bd
    
    const divMessage = document.createElement('div');
    divMessage.classList.add('messageDiv');
    
    const contactName = document.createElement('p');
    contactName.classList.add('contact__name');
    contactName.innerText = userName;
    // contactName.innerText = nome do bd
    
    const lastMessageEl = document.createElement('p');
    lastMessageEl.classList.add('contact__lastMessage');
    if(lastMessage !== null && lastMessage !== undefined ){
        lastMessageEl.innerText = lastMessage.text;
    }else {
        lastMessageEl.innerText = 'Send a message';
    }
    // lastMessage.innerText = msg do bd;
    
    const lastMessageHour = document.createElement('p');
    lastMessageHour.classList.add('lastMessage__hour');
    lastMessageHour.innerText = lastMessage ? lastMessage.hour : '';
    // lastMessage.innerText = last message hour from bd;

    imageDiv.append(img);
    divMessage.append(contactName);
    divMessage.append(lastMessageEl);

    contact.append(imageDiv);
    contact.append(divMessage);
    contact.append(lastMessageHour);

    contacLink.append(contact);
    li.append(contacLink);

    return li;
};

export { createContactEl };
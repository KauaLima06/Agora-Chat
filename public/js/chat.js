//Conect client in websocket
// const socket = io();

import { createContactEl } from "./createContactEl.js";
import { createGroupEl } from "./createGroupEl.js";
// Open and Close form
const addContactsBttn = document.querySelector('.addContacts__button');
addContactsBttn.addEventListener('click', (e)=>{
    const openIcon = document.querySelector('#openFormIcon');
    const nameIcon = openIcon.name;
    if (nameIcon == 'add') {
        openIcon.name = 'close';
        const selectToAdd = document.querySelector('.selectToAdd');
        selectToAdd.style.display = 'flex';
        selectToAdd.addEventListener('click', e => {
            let formSelected = e.target.value;
            let formOpenId = `add${formSelected}Form`;
            if(formSelected == 'Contact'){
                document.getElementById('addGroupForm').style.display = 'none';
            }else{
                document.getElementById('addContactForm').style.display = 'none';
            }
            let formOpen = document.getElementById(formOpenId);
            formOpen.style.display = 'flex';
        });
        window.addEventListener('keydown', e => {
            if(e.key == 'Escape'){
                openIcon.name = 'add';
                document.getElementById('addGroupForm').style.display = 'none';
                document.getElementById('addContactForm').style.display = 'none';
                document.querySelector('.selectToAdd').style.display = 'none';
            }
        });
    } else if(nameIcon == 'close') {
        openIcon.name = 'add';
        document.getElementById('addGroupForm').style.display = 'none';
        document.getElementById('addContactForm').style.display = 'none';
        document.querySelector('.selectToAdd').style.display = 'none';
    }else {
        return;
    }
})
//Open and Close form
//Send forms 
const contactsList = document.querySelector('.contacts__list');
const contactForm = document.querySelector('#addContactForm');
let elem = null;
contactForm.addEventListener('submit', e => {
    e.preventDefault();

    let name = document.querySelector(`#nameContact`).value;
    let id = document.querySelector(`#idContact`).value;

    document.querySelector(`#nameContact`).value = '';
    document.querySelector(`#idContact`).value = '';
    document.getElementById('addGroupForm').style.display = 'none';
    document.getElementById('addContactForm').style.display = 'none';

    elem = createContactEl({name, id});

    contactsList.append(elem);
});

const groupForm = document.querySelector('#addGroupForm');
groupForm.addEventListener('submit', e => {
    e.preventDefault();
    
    let name = document.querySelector('#nameGroup').value;
    let id = document.querySelector('#idGroup').value;
    
    document.querySelector(`#nameGroup`).value = '';
    document.querySelector(`#idGroup`).value = '';
    document.getElementById('addGroupForm').style.display = 'none';
    document.getElementById('addContactForm').style.display = 'none';
    
    elem = createGroupEl({name, id});
    
    contactsList.append(elem);
});
//Send forms 
function renderMessage(data){

    let { message: txt , hour } = data;
    let messageEl = document.createElement('div');
    messageEl.classList.add('chat__message');
    let messageText = document.createElement('div');
    messageText.classList.add('message__text');
    let text = document.createElement('p');
    text.classList.add('text');
    text.innerText = txt;
    let messageHour = document.createElement('p');
    messageHour.classList.add('text__messageHour');
    messageHour.innerText = hour;

    messageText.append(text);
    messageText.append(messageHour);
    messageEl.append(messageText);

    let chat = document.querySelector('.chat');
    chat.append(messageEl);
};
//Send message
//Socket events
socket.on('recivedMessage', data => {
    renderMessage(data);
});
//Socket events
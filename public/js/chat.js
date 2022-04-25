//Conect client in websocket
const socket = io();

import { createContactEl } from "./createContactEl.js";
import { createGroupEl } from "./createGroupEl.js";
//Get url data
let url = new URLSearchParams(window.location.search);
let room = url.get('to');
let name = url.get('name');
if(name != null || name != undefined){
    document.querySelector('#nameContactH2').innerText = name;
}

const contactsList = document.querySelector('.contacts__list');
if(room === null){
    document.querySelector('#chatImg').style.display = '';
    document.querySelector('#storySetLink').style.display = '';
    document.querySelector('.message__buttons').style.display = 'none';
    document.querySelector('.chat').style.display = 'none';
    document.querySelector('.chat__sendMessage').style.display = 'none';
}else{
    socket.emit('selectRoom', room);
    document.querySelector('#chatImg').style.display = 'none';
    document.querySelector('#storySetLink').style.display = 'none';
    document.querySelector('.message__buttons').style.display = 'flex';
    document.querySelector('.chat').style.display = 'flex';
    document.querySelector('.chat__sendMessage').style.display = 'flex';
}
//Get url data
// Open and Close form
const addContactForm = document.querySelector('.addContactForm');
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
            let formOpenId = `#${formSelected}Div`;
            if(formSelected == 'contact'){
                document.querySelector('#groupDiv').style.display = 'none';
            }else{
                document.querySelector('#contactDiv').style.display = 'none';
            }
            let formOpen = document.querySelector(formOpenId);
            addContactForm.style.display = 'flex';
            formOpen.style.display = 'flex';
        });
        window.addEventListener('keydown', e => {
            if(e.key == 'Escape'){
                openIcon.name = 'add';
                addContactForm.style.display = 'none';
                document.querySelector('#groupDiv').style.display = 'none';
                document.querySelector('#contactDiv').style.display = 'none';
                document.querySelector('.selectToAdd').style.display = 'none';
            }
        });
    } else if(nameIcon == 'close') {
        openIcon.name = 'add';
        addContactForm.style.display = 'none';
        document.querySelector('#contactDiv').style.display = 'none';
        document.querySelector('#groupDiv').style.display = 'none';
        document.querySelector('.selectToAdd').style.display = 'none';
    }else {
        return;
    }
})
//Open and Close form
//Send forms 
const contactForm = document.querySelector('#addContactForm');
let elem = null;
contactForm.addEventListener('submit', e => {
    let name = document.querySelector(`#nameContact`);
    let id = document.querySelector(`#idContact`);
    
    if(name.value != '' && id.value != ''){
        name.value = '';
        id.value = '';
        addContactForm.style.display = 'none';
        document.getElementById('contactDiv').style.display = 'none';
        document.getElementById('groupDiv').style.display = 'none';
    
        elem = createContactEl({name, id});
    
        contactsList.append(elem);
    }else{
        e.preventDefault();
        
        document.querySelector(`#nameContact`).placeholder = 'Name is required';
        document.querySelector(`#idContact`).placeholder = 'Id is required';

        setTimeout(() => {
            document.querySelector(`#nameContact`).placeholder = 'Insert contact name';
            document.querySelector(`#idContact`).placeholder = 'Insert contact id';
        }, 3000);
    }
});

const groupForm = document.querySelector('#addGroupForm');
groupForm.addEventListener('submit', e => {
    let name = document.querySelector('#nameGroup');
    let id = document.querySelector('#idGroup');
    
    if(name.value != '' && id.value != ''){
        
        document.querySelector(`#nameGroup`).value = '';
        document.querySelector(`#idGroup`).value = '';
        addContactForm.style.display = 'none';
        document.getElementById('groupDiv').style.display = 'none';
        document.getElementById('contactDiv').style.display = 'none';
        
        elem = createGroupEl({name, id});
        
        contactsList.append(elem);
    }else{
        e.preventDefault();

        document.querySelector(`#nameGroup`).placeholder = 'Name is required';
        document.querySelector(`#idGroup`).placeholder = 'Id is required';
        
        setTimeout(() => {
            document.querySelector(`#nameGroup`).placeholder = 'Insert group name';
            document.querySelector(`#idGroup`).placeholder = 'Insert group id';
        }, 3000);
    }
});
//Send forms 

//Send Message
const sendMessageForm = document.querySelector('#sendMessage__form');
sendMessageForm.addEventListener('submit', e => {
    e.preventDefault();

    let message = document.querySelector('.sendMessage__input').value;
    let data = {
        message: message,
        hour: getHour(),
        room,
    };
    socket.emit('sendMessage', data);
    document.querySelector('.sendMessage__input').value = '';
});

//get hour
function getHour(){
    let now = new Date();
    let hour = now.getHours();
    let min = now.getMinutes();

    if(min < 10){
        min = `0${min}`;
    };

    return `${hour}:${min}`;
};
//get hour

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
    messageEl.append(messageHour);
    messageEl.append(messageText);

    let chat = document.querySelector('.chat');
    chat.append(messageEl);
};
//Send message
//Send Message

//Socket events
socket.on('recivedMessage', data => {
    renderMessage(data);
    let messagesEl = document.querySelectorAll('.chat__message');
    let lastElTop = messagesEl[messagesEl.length - 1].offsetTop;
    if(lastElTop >= 435){
        chatScrollDown();
    }
});
//Socket events
//automatic scroll
function chatScrollDown(){
    document.querySelector('.chat').scrollTop += 65;
};
//automatic scroll
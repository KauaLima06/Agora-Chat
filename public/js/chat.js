import { createContactEl } from "./createContactEl.js";
import { createGroupEl } from "./createGroupEl.js";
import { createCttList } from "./createCttList.js";
//Conect client in websocket
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
const socket = io();
const urlApi = 'https://agora-api-rest.herokuapp.com';
// const urlApi = 'http://localhost:2929';
const userId = document.querySelector('#profile').value;

//Get url data
let url = new URLSearchParams(window.location.search);
let room = url.get('to');
let name = url.get('name');
const type = url.get('type');
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
    if(type == 'contact'){
        const messages = await getChatMessages(room);
        if(messages != null){
            console.log(messages)
            for(let pos in messages){
                renderMessage(messages[pos]);
            }
        }
    }
}
//Get url data
const getUserData = async() => {
    let user;
    const request = await axios.get(`${urlApi}/user/findById/${userId}`)
    .then(res => {
        const data = res.data;
        user = data;
    })
    .catch(err => {
        //disparar um aviso para o usuário recarregar a pagina
        console.log(err);
    })

    return user;
}

const userData = await getUserData();
const { chats: userChats, contactList: userContacts } = userData;

if(userContacts){
    for(let pos in userContacts){
        renderUserList(userContacts[pos]);
    }
}
async function renderUserList(userToRender){ 
    const { name, conversationId, userId } = userToRender;
    await axios.get(`${urlApi}/conversation/find/${conversationId}`)
    .then(res => {
        const { messages } = res.data;

        const lastMessage = messages.length ? messages[messages.length -1] : null;

        const data = {
            name,
            userId,
            lastMessage,
            conversationId
        }

        const elm = createContactEl(data);
        contactsList.append(elm);
    })
    .catch(err => {
        console.log(err);
    })
}

if(userChats){
    console.log(userChats)
    for(let pos in userChats){
        renderChatList(userChats[pos]);
    }

    /*
        "chats": [
      "SYCceZn",
      "lKxrBH1",
      "YYMBrqA"
    ],
    */
}
async function renderChatList(chatId){
    axios.get(`${urlApi}/chat/find/${chatId}`)
    .then(res => {
        console.log(res.data)
        const { name, messages , chatId } = res.data;
        /*
        message = {
            "sendByName": "User name"
            "sendById": "0CMAa2o",
            "hour": "16:35",
            "text": "negão"
        }
        */
       let lastMessage;
       if(messages.length){
        lastMessage = messages[messages.length - 1];
       }else {
           lastMessage = null || undefined;
       }
        const data = {
            name: name,
            id: chatId,
            lastMessage
        }
        const elm = createGroupEl(data);
        contactsList.append(elm);
    })
    .catch(err => console.log(err))
}


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
                document.querySelector('.membersToAddInChat').classList.remove('Open');
            }
        });
    } else if(nameIcon == 'close') {
        openIcon.name = 'add';
        addContactForm.style.display = 'none';
        document.querySelector('#contactDiv').style.display = 'none';
        document.querySelector('#groupDiv').style.display = 'none';
        document.querySelector('.selectToAdd').style.display = 'none';
        document.querySelector('.membersToAddInChat').classList.remove('Open');
    }else {
        return;
    }
})
//Open and Close form
//Send forms 
const contactForm = document.querySelector('#addContactForm');
let elem = null;
contactForm.addEventListener('submit', async e => {
    e.preventDefault()
    let name = document.querySelector(`#nameContact`);
    let id = document.querySelector(`#idContact`);
    
    if(name.value != '' && id.value != ''){
        const userName = name.value;
        const userId = id.value;

        name.value = '';
        id.value = '';
        addContactForm.style.display = 'none';
        document.getElementById('contactDiv').style.display = 'none';
        document.getElementById('groupDiv').style.display = 'none';


        const user = await axios.get(`${urlApi}/user/getUser/${userId}`)
        .then(res => {
            if(res.status == 404) return console.log('User not found');
            const user = {
                userName: userName,
                userId: userId,
            }

            createConversation(user);
            // saveInContactList(user);
        })
        .catch(err => {
            console.log(err.response.data)
        })
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
let membersChat = [userId];
groupForm.addEventListener('submit', async e => {
    let name = document.querySelector('#nameGroup');
    
    if(name.value != ''){
        e.preventDefault()
        
        const chat = {
            name: name.value,
            members: membersChat,
            creator: userId,
            admimList: [userId],
        };

        axios.post(`${urlApi}/chat/create`, chat)
        .then(res => {
            console.log(res.data)
            const { name, chatId } = res.data;
            elem = createGroupEl({
                name: name,
                id: chatId,
                lastMessage: null,
            });
            console.log(membersChat)
            contactsList.append(elem);
        })
        .catch(err => console.log(err));

        alert(name.value)

        document.querySelector(`#nameGroup`).value = '';
        addContactForm.style.display = 'none';
        document.getElementById('groupDiv').style.display = 'none';
        document.getElementById('contactDiv').style.display = 'none';
    }else{
        e.preventDefault();

        document.querySelector(`#nameGroup`).placeholder = 'Name is required';
        
        setTimeout(() => {
            document.querySelector(`#nameGroup`).placeholder = 'Insert group name';
        }, 3000);
    }
});
const membersListDiv = document.querySelector('.membersToAddInChat');
const memberList = document.getElementById('membersToAddList');
const addMembersBttn = document.getElementById('addMembersBttn');
addMembersBttn.addEventListener('click', async() => {
    if(membersListDiv.classList[1] != 'Open'){
        membersListDiv.classList.add('Open');
        addContactForm.style.display = 'none';
        console.log(membersChat)
        const userData = await getUserData();
        const { contactList } = userData;
        if(contactList.length){
            for(let pos in contactList){
                const memberHtml = createCttList(contactList[pos]);
                const { li, input } = memberHtml;
                const findUser = membersChat.find(member => member == input.value);
                console.log(findUser)
                if(findUser != undefined) input.checked = true;
                memberList.append(li);
                console.log(input.value)

                input.addEventListener('click', () => {
                    if(input.checked){
                        console.log('in')
                        const findUser = membersChat.find(member => member == input.value);
                        if(findUser == undefined){
                            console.log(membersChat)
                            membersChat.push(input.value);
                            console.log(membersChat)
                        }else {
                            return;
                        }
                    }else {
                        console.log('out')
                        console.log(membersChat)
                        membersChat = membersChat.filter(member => member != input.value);
                        console.log(membersChat)
                    }
                });
            }
        };
        
        const memberListBttn = document.getElementById('membersInChatBttn');
        memberListBttn.addEventListener('click', () => {
            membersListDiv.classList.remove('Open');
            addContactForm.style.display = 'flex';
            if(memberList.childElementCount){
                while(memberList.childElementCount){
                    memberList.removeChild(memberList.lastChild);
                }
            }
        });
    }else {
        membersListDiv.classList.remove('Open');
        addContactForm.style.display = 'flex';
    }
});
//Send forms 

//Send Message
const sendMessageForm = document.querySelector('#sendMessage__form');
sendMessageForm.addEventListener('submit', e => {
    e.preventDefault();

    let message = document.querySelector('.sendMessage__input').value;
    if(message != ''){
        const data = {
            sendBy: userId,
            hour: getHour(),
            text: message,
            room,
        };
        socket.emit('sendMessage', data);
        document.querySelector('.sendMessage__input').value = '';
    }else {
        document.querySelector('.sendMessage__input').placeholder = 'Type something to send';
        setTimeout(() => {
            document.querySelector('.sendMessage__input').placeholder = '';
        }, 4000);
    }
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

    const { sendBy, text: txt , hour } = data;
    
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
    if(sendBy == userId){
        messageText.style.justifyContent = 'flex-end';
        messageText.style.backgroundColor = '#5d17eb';
        text.style.color = '#fff';
        text.style.backgroundColor = '#5d17eb';
    }else {
        messageEl.style.justifyContent = 'flex-start';
    }

    let chat = document.querySelector('.chat');
    chat.append(messageEl);
};
//Send message

//Socket events
socket.on('recivedMessage', data => {
    renderMessage(data);
    saveMessagesInDb(data);

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
//Save new contacts in db

async function createConversation(user){
    const { userId: id } = user;
    const members = [userId, id];
    const creator = userId;

    await axios.post(`${urlApi}/conversation/create`, { members, creator })
    .then(res => {
        console.log(res.data)
        saveInContactList(res.data, user);
    })
    .catch(err => {
        console.log(err);
    })
}

async function saveInContactList(conversation ,user){

    const { userName, userId: id } = user;
    const { conversationId, messages } = conversation;
    console.log(conversation)
    const contactToSave = {
        name: userName,
        userId: id,
        conversationId: conversationId,
    }

    await axios.patch(`${urlApi}/user/update/${userId}`, { newContact: contactToSave })
    .then(res => {
        if(res.status != 200) return console.log(res.data.message);

        const lastMessage = messages.length ? messages[messages.length -1] : null;
        const { userName, userId } = user;
        const data = {
            name: userName,
            userId,
            lastMessage,
            conversationId
        }
        let elem = createContactEl(data);
        contactsList.append(elem);
    })
    .catch(err => {
        console.error(err);
    })

}

async function saveMessagesInDb(data){
    const { sendBy, hour, text, room } = data;
    const messageToSave = {
        sendBy,
        hour,
        text
    };
    await axios.patch(`${urlApi}/conversation/update/${room}`, { newMessage: messageToSave })
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err);
    })
}

async function getChatMessages(id){
    let messagesArray;
    await axios.get(`${urlApi}/conversation/find/${id}`)
    .then(res => {
        if(res.status != 200) return console.log(res.data.message);

        console.log(res.data)
        const { messages } = res.data;
        if(messages.length){
            messagesArray = messages;
        }else {
            messagesArray = null;
        }
    })
    .catch(err => {
        console.log(err);
    })

    return messagesArray;
}

//create chat
// const membersToAddInChat = document.querySelectorAll('.select__member');
// membersToAddInChat.addEventListener('input', e => {
//     console.log(e.target.value)
// });
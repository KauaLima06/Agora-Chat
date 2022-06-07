// Create groups element
const createGroupEl = (data) => {
    const { name, id , lastMessage } = data;

    const li = document.createElement('li');
    const groupLink = document.createElement('a');
    groupLink.href = `/chat?to=${id}&name=${name}&type=chat`;

    const group = document.createElement('div');
    group.classList.add('group');
    
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('imageDiv');
    
    const img = document.createElement('img');
    img.src = "../images/chat-default-image.png";
    // img.src = image do bd
    
    const divMessage = document.createElement('div');
    divMessage.classList.add('messageDiv');
    
    const groupName = document.createElement('p');
    groupName.classList.add('group__name');
    groupName.innerText = name;
    // contactName.innerText = nome do bd
    
    const lastMessageEl = document.createElement('p');
    lastMessageEl.classList.add('group__lastMessage');
    const lastMessageHour = document.createElement('p');
    lastMessageHour.classList.add('lastMessage__hour');
    if(lastMessage != null && lastMessage != undefined){
        lastMessageEl.innerText = lastMessage.text;
        lastMessageHour.innerText = lastMessage.hour;
    }else {
        lastMessageEl.innerText = 'Send a message';
        lastMessageHour.innerText = '';
    }
    // lastMessage.innerText = msg do bd;
    
    // lastMessage.innerText = last message hour from bd;

    imageDiv.append(img);
    divMessage.append(groupName);
    divMessage.append(lastMessageEl);

    group.append(imageDiv);
    group.append(divMessage);
    group.append(lastMessageHour);
    
    groupLink.append(group);
    li.append(groupLink);

    return li;
};

export { createGroupEl };
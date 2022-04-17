// Create groups element
const createGroupEl = (data) => {
    let { name, id } = data;

    const li = document.createElement('li');
    const groupLink = document.createElement('a');
    groupLink.href = `/chat.html?to=${id}&user=${name}`;
    const group = document.createElement('div');
    group.classList.add('group');
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('imageDiv');
    const img = document.createElement('img');
    img.src = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bWVufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";
    // img.src = image do bd
    const divMessage = document.createElement('div');
    divMessage.classList.add('messageDiv');
    const groupName = document.createElement('p');
    groupName.classList.add('group__name');
    groupName.innerText = name;
    // contactName.innerText = nome do bd
    const lastMessage = document.createElement('p');
    lastMessage.classList.add('group__lastMessage');
    lastMessage.innerText = 'Kauã: Hi, how are u?';
    // lastMessage.innerText = msg do bd;
    const lastMessageHour = document.createElement('p');
    lastMessageHour.classList.add('lastMessage__hour');
    lastMessageHour.innerText = '09:00';
    // lastMessage.innerText = last message hour from bd;

    imageDiv.append(img);
    divMessage.append(groupName);
    divMessage.append(lastMessage);

    group.append(imageDiv);
    group.append(divMessage);
    group.append(lastMessageHour);

    // console.log(li, contact.classList, imageDiv, img, divMessage, lastMessage, lastMessageHour)
    groupLink.append(group);
    li.append(groupLink);

    return li;
};

export { createGroupEl };
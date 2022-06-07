const createCttList = (user) => {
    /*
    <li>
    <div class="member">
        <p class="member__name">Kauã Lima</p>
        <input type="checkbox" value="memberId2" class="select__member">
    </div>
    </li>
    */

    /*
    user = {
        "name": "Negão",
        "userId": "s3SKN8F",
        "conversationId": "GGSdNjE"'
    }
    */
    const { name: userName , userId} = user;

    const li = document.createElement('li');
    const div = document.createElement('div');
    div.classList.add('member');
    const p = document.createElement('p');
    p.classList.add('member__name');
    p.innerText = userName;
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.value = userId;
    input.classList.add('select__member');

    // input.addEventListener('click', () => {
    //     if(input.checked){
    //         console.log('in')
    //         const findUser = memberArray.find(member => member == userId);
    //         if(findUser == undefined){
    //             console.log(memberArray)
    //             memberArray.push(input.value);
    //             console.log(memberArray)
    //         }else {
    //             return;
    //         }
    //     }else {
    //         console.log('out')
    //         console.log(memberArray)
    //         memberArray = memberArray.filter(member => member != userId);
    //         console.log(memberArray)
    //     }
    // });

    div.append(p);
    div.append(input);
    li.append(div);

    return { li, input };
}

export { createCttList };
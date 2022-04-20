const linkInput = document.querySelector('#copy__linkInput');
const copyLinkBttn = document.querySelector('.copy__link');

copyLinkBttn.addEventListener('click', copyLink);
function copyLink(){
    alert('hello world')
    document.querySelector("#link").select();
    document.execCommand("copy");
}
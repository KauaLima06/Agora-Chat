//Open and Close Menu Side Bar
const menuIcon = document.getElementById('menuIcon');
const menuSideBar = document.querySelector('.menuSideBarClose');
menuIcon.addEventListener('click', () =>{
    if(menuIcon.name == 'menu'){
        menuSideBar.classList.remove('menuSideBarClose');
        menuSideBar.classList.add('menuSideBarOpen');
        menuIcon.name = 'close';
    } else if(menuIcon.name == 'close'){
        menuSideBar.classList.remove('menuSideBarOpen');
        menuSideBar.classList.add('menuSideBarClose');
        menuIcon.name = 'menu';   
    }else{
        return;
    }
});
//Open and Close Menu Side Bar

menuSideBar.addEventListener('click', e => {

    console.log(e.target)
    if(e.target.classList == 'sideBarLink'){
        menuSideBar.classList.remove('menuSideBarOpen');
        menuSideBar.classList.add('menuSideBarClose');
        menuIcon.name = 'menu';  
    }
    
});
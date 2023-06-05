function menu(e){
    const links = document.querySelector('ul');
    const header = document.querySelector('header');

    if(e.classList.contains('fa-bars')){
        e.classList.remove('fa-bars');
        e.classList.add('fa-xmark');
        links.classList.add('top-[80px]');
        links.classList.add('opacity-100');
        header.classList.remove('h-40');
        header.classList.add('h-80');
        header.classList.add('md:h-40')
    }else{
        e.classList.remove('fa-xmark');
        e.classList.add('fa-bars');
        links.classList.remove('top-[80px]')
        links.classList.remove('opacity-100')
        header.classList.add('h-40');
        header.classList.remove('h-80');
        header.classList.remove('md:h-40');
    }
}
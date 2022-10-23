const sidebar = document.querySelector('.lista-links-mobile');
const body = document.body;

function toggleMenu(){
    sidebar.classList.toggle('sidebar-open');
    sidebar.style.animationName = 'sidebar-open';

    const isSidebarOpen = sidebar.classList.value.indexOf('sidebar-open');

    if(isSidebarOpen != -1){
        body.style.overflow = 'hidden';
    }else {
        body.style.overflow = 'unset';
    }
}
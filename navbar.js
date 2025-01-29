const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open'); 
    sidebar.classList.toggle('show');   
});

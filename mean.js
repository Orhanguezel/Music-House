const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open'); // Hamburger menüyü X'e dönüştür
    sidebar.classList.toggle('show');    // Sidebar aç/kapat
});

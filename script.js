// script.js
document.querySelector('.toggle-button').addEventListener('click', function() {
    this.classList.toggle('active');
    var menu = this.nextElementSibling;
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});
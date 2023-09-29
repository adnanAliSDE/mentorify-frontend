const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuToggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('hidden');
    mobileMenuToggle.classList.toggle('active');
});


const schedulePopup = document.getElementById('schedule-popup');
const closeBtn = schedulePopup.querySelector('.popup-header span');

closeBtn.addEventListener('click', () => {
    schedulePopup.classList.add('hidden');
});
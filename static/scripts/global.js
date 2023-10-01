const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
burger.onclick = (e) => {
    burger.classList.toggle('open');
    mobileNav.classList.toggle('hidden');
}
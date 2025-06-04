// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add mobile menu functionality
const navLinks = document.querySelector('.nav-links');
const menuButton = document.createElement('button');
menuButton.className = 'mobile-menu-button';
menuButton.innerHTML = '☰';
document.querySelector('.nav-container').appendChild(menuButton);

menuButton.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}); 
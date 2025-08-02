// Scene setup for background stars
const starsScene = new THREE.Scene();
const starsCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
starsCamera.position.z = 30; // Position for stars

const starsRenderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('backgroundStarsCanvas'),
  alpha: true,
  antialias: true
});
starsRenderer.setSize(window.innerWidth, window.innerHeight);
starsRenderer.setPixelRatio(window.devicePixelRatio);

// Create stars using Points
const starGeometry = new THREE.BufferGeometry();
const starCount = 3000;
const starVertices = [];
for (let i = 0; i < starCount; i++) {
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = (Math.random() - 0.5) * 2000;
  starVertices.push(x, y, z);
}
starGeometry.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(starVertices, 3)
);
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.8,
  sizeAttenuation: true
});
const stars = new THREE.Points(starGeometry, starMaterial);
starsScene.add(stars);

// Animation loop for stars
function animateStars() {
    requestAnimationFrame(animateStars);
    stars.rotation.y += 0.0005;
    stars.rotation.x += 0.0003;
    starsRenderer.render(starsScene, starsCamera);
}
animateStars();

// Handle window resize
window.addEventListener('resize', () => {
  starsRenderer.setSize(window.innerWidth, window.innerHeight);
  starsCamera.aspect = window.innerWidth / window.innerHeight;
  starsCamera.updateProjectionMatrix();
});

// Navigation functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission (basic example)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// --- Enhanced Animation System ---

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Add scroll-animate class to elements that should animate on scroll
    const animateElements = document.querySelectorAll('.service-card, .why-card, .mission, .vision, .footer-section');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// Enhanced button click animations
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Enhanced hover effects
function initEnhancedHoverEffects() {
    // Add hover sound effect simulation (visual feedback)
    const interactiveElements = document.querySelectorAll('.service-card, .why-card, .btn, .nav-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform + ' scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.02)', '');
        });
    });
}

// Loading animation
function initLoadingAnimation() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Remove loading class after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 500);
    });
}

// Enhanced star animation
function enhanceStarAnimation() {
    // Add twinkle effect to some stars
    const starMaterial = stars.material;
    const originalColor = starMaterial.color;
    
    setInterval(() => {
        starMaterial.color.setHex(Math.random() > 0.5 ? 0xffffff : 0x61dafb);
        setTimeout(() => {
            starMaterial.color.copy(originalColor);
        }, 200);
    }, 3000);
}

// --- UI Elements ---
const progressBar = document.getElementById('gameProgress');
const modal = document.getElementById('gameModal');
const modalContent = document.getElementById('gameModalContent');

// --- Helper for Modal ---
function showModal(title, message, buttonText, onButton) {
    if (!modal || !modalContent) return;
    modalContent.innerHTML = `
        <h2>${title}</h2>
        <p>${message}</p>
        <button class="game-btn">${buttonText}</button>
    `;
    modal.style.display = 'flex';
    modal.querySelector('button').onclick = () => {
        modal.style.display = 'none';
        if (onButton) onButton();
    };
}

// --- Memory Card Game ---
const SERVICE_ICONS = [
  'fa-tv',            // Audio Visual Integration
  'fa-network-wired', // Networking and IT Infrastructure
  'fa-video',         // CCTV Surveillance
  'fa-phone-alt',     // Telecom and Voice Solutions
  'fa-microphone',    // Audio Visual / Public Addressing
  'fa-headset'        // Support
];

class MemoryCardGame {
  constructor() {
    this.gridEl = document.getElementById('memoryGameGrid');
    this.movesEl = document.getElementById('moves');
    this.startBtn = document.getElementById('startGame');
    this.cards = [];
    this.flipped = [];
    this.matched = [];
    this.moves = 0;
    if (this.startBtn) this.startBtn.onclick = () => this.start();
    this.start();
  }
  start() {
    this.cards = this.shuffle([...SERVICE_ICONS, ...SERVICE_ICONS]);
    this.flipped = [];
    this.matched = [];
    this.moves = 0;
    this.render();
    this.updateMoves();
  }
  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  render() {
    if (!this.gridEl) return;
    
    // Only create cards if they don't exist yet
    if (this.gridEl.children.length === 0) {
      this.cards.forEach((icon, idx) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.innerHTML = `<i class="fa ${icon}"></i>`;
        card.onclick = () => this.handleFlip(idx);
        card.dataset.index = idx;
        this.gridEl.appendChild(card);
      });
    }
    
    // Update only the cards that need changes
    this.cards.forEach((icon, idx) => {
      const card = this.gridEl.children[idx];
      if (card) {
        // Remove all classes and add appropriate ones
        card.className = 'memory-card';
        if (this.flipped.includes(idx) || this.matched.includes(idx)) {
          card.classList.add('flipped');
        }
        if (this.matched.includes(idx)) {
          card.classList.add('matched');
        }
      }
    });
  }
  handleFlip(idx) {
    if (this.flipped.length === 2 || this.flipped.includes(idx) || this.matched.includes(idx)) return;
    this.flipped.push(idx);
    this.render();
    if (this.flipped.length === 2) {
      this.moves++;
      this.updateMoves();
      const [i1, i2] = this.flipped;
      if (this.cards[i1] === this.cards[i2]) {
        this.matched.push(i1, i2);
        setTimeout(() => {
          this.flipped = [];
          this.render();
          if (this.matched.length === this.cards.length) {
            this.showWin();
          }
        }, 600);
      } else {
        setTimeout(() => {
          this.flipped = [];
          this.render();
        }, 900);
      }
    }
  }
  updateMoves() {
    if (this.movesEl) this.movesEl.textContent = this.moves;
  }
  showWin() {
    if (typeof showModal === 'function') {
      showModal('You Win!', `You matched all pairs in <b>${this.moves}</b> moves!`, 'Play Again', () => this.start());
    } else {
      alert(`You win! Moves: ${this.moves}`);
      this.start();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    new MemoryCardGame();
  }, 100);
  
  // Initialize enhanced animations
  initScrollAnimations();
  initButtonAnimations();
  initEnhancedHoverEffects();
  initLoadingAnimation();
  enhanceStarAnimation();
});
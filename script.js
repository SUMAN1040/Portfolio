// Welcome Splash Screen
window.addEventListener("load", () => {
  const splash = document.getElementById("splash-screen");
  if (splash) {
    // Initial lock or handled via CSS/HTML
    document.body.classList.add("no-scroll");
    
    setTimeout(() => {
      splash.classList.add("fade-out");
      setTimeout(() => {
        splash.remove();
        document.body.classList.remove("no-scroll");
      }, 800);
    }, 2500); // 2.5 seconds to enjoy the Welcome animation
  }
});

// Custom Cursor
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", (e) => {
  if (window.innerWidth > 768) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    setTimeout(() => {
      follower.style.left = e.clientX + "px";
      follower.style.top = e.clientY + "px";
    }, 50);
  }
});

// Cursor Hover Effects
document.querySelectorAll("a, button, .tilt-card").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hovered");
    follower.classList.add("hovered");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hovered");
    follower.classList.remove("hovered");
  });
});

// Mobile Navigation
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navLinksItems = document.querySelectorAll(".nav-links li a");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("nav-active");
  const icon = menuToggle.querySelector("i");
  if (navLinks.classList.contains("nav-active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});

navLinksItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("nav-active");
    const icon = menuToggle.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  });
});

// Sticky Nav & Active Link Highlight
const nav = document.querySelector(".glass-nav");
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // Check if the section is roughly in the top half of the viewport
    if (window.pageYOffset >= sectionTop - window.innerHeight / 2) {
      current = section.getAttribute("id");
    }
  });

  navLinksItems.forEach((li) => {
    li.classList.remove("active");
    if (li.getAttribute("href").includes(current)) {
      li.classList.add("active");
    }
  });
});

// Typing Text Effect
const typingText = document.querySelector(".typing-text");
const words = [
  "Django Backend Developer",
  "AI/ML Innovator",
  "Android Developer",
  "Tech Problem Solver",
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  if (!typingText) return;
  const currentWord = words[wordIndex];
  if (isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}
setTimeout(type, 1000);

// Intersection Observer for Scroll Animations
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      
      // Update active nav link
      const id = entry.target.getAttribute('id');
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

document.querySelectorAll(".observe-section").forEach((section) => {
  observer.observe(section);
});

// 3D Tilt Effect
const tiltElements = document.querySelectorAll(".tilt-card, .tilt-element");

tiltElements.forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    let rotateX = ((y - centerY) / centerY) * -15;
    let rotateY = ((x - centerX) / centerX) * 15;

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});

// Canvas Particle Background
const canvas = document.getElementById("particle-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");

  let particlesArray = [];
  let mouse = { x: null, y: null, radius: 150 };

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  });

  document.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  // Touch support for mobiles
  document.addEventListener("touchmove", (e) => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  });

  class Particle {
    constructor(x, y, dx, dy, size, color) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.baseDx = dx;
      this.baseDy = dy;
      this.size = size;
      this.color = color;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      if (this.x > canvas.width || this.x < 0) {
        this.dx = -this.dx;
        this.baseDx = -this.baseDx;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.dy = -this.dy;
        this.baseDy = -this.baseDy;
      }

      // Friction and return to base speed
      this.dx -= (this.dx - this.baseDx) * 0.05;
      this.dy -= (this.dy - this.baseDy) * 0.05;

      this.x += this.dx;
      this.y += this.dy;

      // Mouse interaction (push away)
      if (mouse.x !== null && mouse.y !== null) {
        let px = this.x - mouse.x;
        let py = this.y - mouse.y;
        let distance = Math.sqrt(px * px + py * py);

        if (distance < mouse.radius) {
          const forceDirectionX = px / distance;
          const forceDirectionY = py / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = forceDirectionX * force * 7;
          const directionY = forceDirectionY * force * 7;

          this.x += directionX;
          this.y += directionY;
        }
      }

      this.draw();
    }
  }

  function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray = [];
    const numberOfParticles = (canvas.width * canvas.height) / 10000;
    const colors = ["#00f0ff", "#7000ff", "#ff0055", "#ffffff"];

    for (let i = 0; i < numberOfParticles; i++) {
      let size = Math.random() * 2 + 0.5;
      let x = Math.random() * (canvas.width - size * 2 - size * 2) + size * 2;
      let y = Math.random() * (canvas.height - size * 2 - size * 2) + size * 2;
      let dx = (Math.random() - 0.5) * 1.5;
      let dy = (Math.random() - 0.5) * 1.5;
      let color = colors[Math.floor(Math.random() * colors.length)];

      particlesArray.push(new Particle(x, y, dx, dy, size, color));
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let a = 0; a < particlesArray.length; a++) {
      // Connect to mouse
      if (mouse.x !== null && mouse.y !== null) {
        let px = particlesArray[a].x - mouse.x;
        let py = particlesArray[a].y - mouse.y;
        let distanceToMouse = px * px + py * py;
        let connectionRadius = (canvas.width / 12) * (canvas.height / 12);

        if (distanceToMouse < connectionRadius) {
          let opacity = 1 - distanceToMouse / connectionRadius;
          ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.5})`; // Glowy connection to cursor
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (let b = a; b < particlesArray.length; b++) {
        let px = particlesArray[a].x - particlesArray[b].x;
        let py = particlesArray[a].y - particlesArray[b].y;
        let distance = px * px + py * py;

        if (distance < (canvas.width / 10) * (canvas.height / 10)) {
          let opacity =
            1 - distance / ((canvas.width / 10) * (canvas.height / 10));
          ctx.strokeStyle = `rgba(255,255,255,${opacity * 0.1})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }

    particlesArray.forEach((particle) => particle.update());
  }

  init();
  animate();

  // Burst particles on click
  window.addEventListener("click", (e) => {
    let clickX = e.clientX;
    let clickY = e.clientY;

    // Add a few particles on click
    for (let i = 0; i < 15; i++) {
      let size = Math.random() * 2 + 0.5;
      let dx = (Math.random() - 0.5) * 15;
      let dy = (Math.random() - 0.5) * 15;
      const colors = ["#00f0ff", "#7000ff", "#ff0055", "#ffffff"];
      let color = colors[Math.floor(Math.random() * colors.length)];

      let particle = new Particle(clickX, clickY, dx, dy, size, color);
      // Decay its base speed quickly by setting baseDx/baseDy small
      particle.baseDx = (Math.random() - 0.5) * 1.5;
      particle.baseDy = (Math.random() - 0.5) * 1.5;

      particlesArray.push(particle);
    }

    // Push existing particles away explosively
    particlesArray.forEach((particle) => {
      let px = particle.x - clickX;
      let py = particle.y - clickY;
      let distance = Math.sqrt(px * px + py * py);

      if (distance < mouse.radius * 2) {
        let force = (mouse.radius * 2 - distance) / (mouse.radius * 2);
        particle.dx += (px / distance) * force * 20;
        particle.dy += (py / distance) * force * 20;
      }
    });

    // Keep maximum particles reasonable
    if (particlesArray.length > 500) {
      particlesArray.splice(0, particlesArray.length - 500);
    }
  });

  // Reset mouse pos on leave
  document.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });
}

// Book Flip Logic
const totalPages = 7;
function turnPage(pageNum, isNext) {
  const page = document.getElementById(`page${pageNum}`);
  const book = document.getElementById('experience-book');
  
  if (isNext) {
    page.classList.add('flipped');
    if (pageNum === 1) book.classList.add('open');
    setTimeout(() => {
      page.style.zIndex = 10 + pageNum; // Brings it to the top of the left stack
    }, 500); // Wait until page is 90 degrees turned to swap z-index
  } else {
    page.classList.remove('flipped');
    if (pageNum === 1) book.classList.remove('open');
    setTimeout(() => {
      page.style.zIndex = totalPages - pageNum + 1; // Resets to original right stack order
    }, 500);
  }
}

// Mobile Journey Toggle
function toggleMobileJourney(isOpen) {
    const container = document.getElementById('experience-container');
    if (isOpen) {
        container.classList.add('is-open');
        // Scroll to the experience section to make sure the user sees the content
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        container.classList.remove('is-open');
    }
}

// Scroll to Top Button
const scrollTopBtn = document.querySelector(".scroll-top-btn");
const contactSection = document.getElementById("contact");

if (scrollTopBtn && contactSection) {
  window.addEventListener("scroll", () => {
    // Show button when the top of the contact section is within the viewport
    const contactTop = contactSection.offsetTop;
    if (window.scrollY >= contactTop - window.innerHeight / 1.5) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  scrollTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Project Carousel Logic
const carousel = document.querySelector('.projects-carousel');
const cards = document.querySelectorAll('.projects-carousel .project-card');
const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');

let currentIndex = 1; // Start with the second card active (middle)

function updateCarousel() {
    const bgItems = document.querySelectorAll('.bg-item');
    const previewItems = document.querySelectorAll('.preview-img');
    
    cards.forEach((card, index) => {
        card.classList.remove('active');
        if (bgItems[index]) bgItems[index].classList.remove('active');
        if (previewItems[index]) previewItems[index].classList.remove('active');
        
        if (index === currentIndex) {
            card.classList.add('active');
            if (bgItems[index]) bgItems[index].classList.add('active');
            if (previewItems[index]) previewItems[index].classList.add('active');
        }
    });

    // If in Mobile Horizontal Scroll mode (< 481px), reset and exit
    if (window.innerWidth < 481) {
        cards.forEach((card) => {
            card.style.transform = '';
            card.style.opacity = '';
        });
        return;
    }

    // If in Single Card Flip mode (< 1315px), reset transforms and exit
    if (window.innerWidth <= 1315) {
        cards.forEach((card) => {
            card.style.transform = ''; // Let CSS handle scaling and centering
        });
        return;
    }

    // If in Desktop Unit mode (> 1315px), the CSS handle centering via flex
    // but the translate might still be needed for wider sets. 
    // Let's refine the translation to be more precise for centering.
    const cardWidth = cards[0].offsetWidth;
    const gap = 32;
    const containerWidth = carousel.offsetWidth;
    const totalWidth = cards.length * (cardWidth + gap) - gap;
    
    // Position cards from center
    const offset = (containerWidth / 2) - ((currentIndex * (cardWidth + gap)) + (cardWidth / 2));

    // Determine scale based on window width
    let activeScale = 1.2;
    let inactiveScale = 0.85;

    // Apply transform to all cards
    cards.forEach((card) => {
        const isSelfActive = card.classList.contains('active');
        card.style.transform = `translateX(${offset}px) scale(${isSelfActive ? activeScale : inactiveScale})`;
    });
}

if (carousel && cards.length > 0) {
    // Initial update
    window.addEventListener('load', updateCarousel);
    window.addEventListener('resize', updateCarousel);

    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateCarousel();
        } else {
            // Loop back to start
            currentIndex = 0;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        } else {
            // Loop to end
            currentIndex = cards.length - 1;
            updateCarousel();
        }
    });
    
    // Allow clicking cards to center them
    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
}


// Contact Form Handler
const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    
    // Custom Name Validation (Only text)
    const nameInput = document.getElementById("name");
    const nameVal = nameInput.value.trim();
    if (!/^[A-Za-z\s]+$/.test(nameVal)) {
      showStatus("Please enter a valid name (letters and spaces only).", "error");
      return;
    }

    showStatus("Sending message...", "info");

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        showStatus("Thanks! Your message has been sent successfully.", "success");
        contactForm.reset();
      } else {
        const data = await response.json();
        if (data && data.errors) {
          showStatus(data.errors.map(error => error.message).join(", "), "error");
        } else {
          showStatus("Oops! There was a problem submitting your form.", "error");
        }
      }
    } catch (error) {
      showStatus("Oops! There was a problem submitting your form.", "error");
    }
  });
}

function showStatus(message, type) {
  if (!contactStatus) return;
  contactStatus.textContent = message;
  contactStatus.className = ""; // Reset classes
  if (type !== "info") {
    contactStatus.classList.add(type);
  }
  contactStatus.style.display = "block";
  
  if (type === "success") {
    setTimeout(() => {
      contactStatus.style.display = "none";
    }, 5000);
  }
}


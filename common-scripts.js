/* ============================================
   RENGIN ÇELİK - ORTAK JAVASCRIPT DOSYASI
   Tüm portfolio sayfaları için kullanılır
   ============================================ */

// === ACCORDION FONKSİYONU (GPU Rendering, Shaders, Mini Dev Kit için) ===
function toggleAccordion(header) {
    const body = header.nextElementSibling;
    const icon = header.querySelector('.accordion-icon');

    // Toggle current accordion
    body.classList.toggle('active');
    icon.classList.toggle('active');
}

// === ACCORDION ITEM FONKSİYONU (Mini Dev Kit için) ===
function toggleAccordionItem(header) {
    const item = header.parentElement;
    const content = item.querySelector('.accordion-content');
    const isActive = item.classList.contains('active');

    // Close all accordions
    document.querySelectorAll('.accordion-item').forEach(el => {
        el.classList.remove('active');
        el.querySelector('.accordion-content').style.maxHeight = null;
    });

    // Open clicked accordion if it wasn't active
    if (!isActive) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
    }
}

// === TAB NAVİGASYONU (Ana Portfolio Sayfası için) ===
function initTabNavigation() {
    const tabLinks = document.querySelectorAll('.tab-link');
    
    if (tabLinks.length === 0) return; // Eğer tab yoksa çalıştırma
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs and sections
            document.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
            document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding section
            const tabId = this.getAttribute('data-tab');
            const section = document.getElementById(tabId);
            if (section) {
                section.classList.add('active');
            }
            
            // Scroll to top of container
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// === SKILLS ACCORDION (Ana Portfolio Sayfası için) ===
function initSkillsAccordion() {
    const skillHeaders = document.querySelectorAll('.skill-category h3');
    
    if (skillHeaders.length === 0) return; // Eğer skill category yoksa çalıştırma
    
    skillHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.parentElement.classList.toggle('collapsed');
        });
    });
}

// === SMOOTH SCROLL FOR ANCHOR LINKS ===
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Eğer href sadece "#" ise veya tab-link ise, smooth scroll yapma
            if (href === '#' || this.classList.contains('tab-link')) {
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// === LAZY LOAD VIDEOS ===
function initLazyLoadVideos() {
    const videos = document.querySelectorAll('.tool-image video');
    
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    video.play();
                } else {
                    const video = entry.target;
                    video.pause();
                }
            });
        });

        videos.forEach(video => {
            videoObserver.observe(video);
        });
    }
}

// === HEADER SCROLL EFFECT ===
function initHeaderScrollEffect() {
    let lastScroll = 0;
    const header = document.querySelector('header');
    
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 212, 255, 0.2)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// === BACK TO TOP BUTTON (Opsiyonel) ===
function createBackToTopButton() {
    // Sadece sayfa yeterince uzunsa göster
    if (document.body.scrollHeight < 2000) return;
    
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #00d4ff;
        color: #0a0a0a;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0, 212, 255, 0.3);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
        } else {
            button.style.opacity = '0';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
}

// === SAYFA YÜKLENDİĞİNDE ÇALIŞTIR ===
document.addEventListener('DOMContentLoaded', function() {
    // Tüm fonksiyonları başlat
    initTabNavigation();
    initSkillsAccordion();
    initSmoothScroll();
    initLazyLoadVideos();
    initHeaderScrollEffect();
    createBackToTopButton();
    
    // Console'da hoş geldin mesajı
    console.log('%c👋 Hoş Geldiniz!', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
    console.log('%cRengin Çelik - Portfolio', 'color: #888; font-size: 14px;');
});

// === GLOBAL FONKSİYONLARI EXPORT ET ===
// HTML'den çağrılabilmesi için window objesine ekle
window.toggleAccordion = toggleAccordion;
window.toggleAccordionItem = toggleAccordionItem;

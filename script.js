// Temel Elementlerin Seçimi
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const sliderWrapper = document.getElementById('slider-wrapper');
const navButtons = document.querySelectorAll('.nav-button');
const sections = document.querySelectorAll('.slide-section');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

/* ======================== */
/* 1. TEMA DEĞİŞTİRME MANTIĞI */
/* ======================== */
function toggleTheme() {
    body.classList.toggle('dark-mode');
    
    // Buton metnini değiştir (isteğe bağlı)
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '🌙';
    } else {
        themeToggle.textContent = '☀️';
    }
}

themeToggle.addEventListener('click', toggleTheme);

/* ======================== */
/* 2. NAVİGASYON İLE KAYDIRMA */
/* ======================== */
navButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        
        // Bölüme kaydır
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

/* ======================== */
/* 3. OKLAR İLE KAYDIRMA */
/* ======================== */
// Sola ve sağa kaydırma fonksiyonları
function scrollSlider(direction) {
    // 100vw'lık (ekran genişliği) kaydırma yapar
    const scrollAmount = window.innerWidth * direction;
    sliderWrapper.scrollLeft += scrollAmount;
}

leftArrow.addEventListener('click', () => scrollSlider(-1));
rightArrow.addEventListener('click', () => scrollSlider(1));


/* ======================== */
/* 4. AKTİF BÖLÜM VURGULAMA (Intersection Observer) */
/* ======================== */
const observerOptions = {
    root: sliderWrapper, // Gözlemleme alanımız (kaydırma yaptığımız yer)
    threshold: 0.7 // Bölümün %70'i görünür olduğunda tetikle
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const targetId = entry.target.id;
        const targetButton = document.querySelector(`.nav-button[data-target="${targetId}"]`);

        // Bölüm görünürse
        if (entry.isIntersecting) {
            // Tüm aktif sınıflarını temizle
            navButtons.forEach(btn => btn.classList.remove('active'));
            // Sadece ilgili butona 'active' sınıfını ekle
            if (targetButton) {
                targetButton.classList.add('active');
            }
        }
    });
}, observerOptions);

// Observer'ı her bir bölüme ata
sections.forEach(section => {
    observer.observe(section);
});

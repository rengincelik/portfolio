// Global Element Selection
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const sliderWrapper = document.getElementById('slider-wrapper');
const header = document.querySelector('.nav-header');

// Main Slides and Navigation Elements
// sections değişkeni, HTML'deki ana slide section ID'lerini (about-me, projects, contact) içermelidir.
const sections = document.querySelectorAll('#about-me, #projects, #contact');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

// Detail Elements
const detailToggleButtons = document.querySelectorAll('.detail-toggle-btn');
const returnButtons = document.querySelectorAll('.return-btn');

// Detail Slider Elements (projectSlider ID'si Project Section'da, ancak genel yapıyı temsil ediyor)
// NOT: HTML'de hem about hem de projects içinde slider ID'si "project-slider" olarak geçiyordu.
// Bu ID'yi sadece Projects için tutarak, About için closest ile bulma yoluna gidilebilir, ancak
// mevcut yapıda projects'in ID'si 'project-slider' ve about'un ID'si 'detail-slider' olmalıdır.
// Şimdilik sadece Project Slider'ı seçip, About için yerel olarak bulalım:
const projectSlider = document.getElementById('project-slider');
const detailLeftArrow = document.querySelector('.detail-left-arrow');
const detailRightArrow = document.querySelector('.detail-right-arrow');

// Navigation HTML Templates
const mainNavHTML = `
    <a href="#about-me" class="nav-button" data-target="about-me">About</a>
    <a href="#projects" class="nav-button" data-target="projects">Projects</a>
    <a href="#contact" class="nav-button" data-target="contact">Contact</a>
`;

/* ======================== */
/* 1. THEME TOGGLE */
/* ======================== */
function toggleTheme() {
    body.classList.toggle('dark-mode');
    themeToggle.textContent = body.classList.contains('dark-mode') ? '🌙' : '☀️';
}
themeToggle.addEventListener('click', toggleTheme);

/* ======================== */
/* 2. MAIN SLIDER SCROLL */
/* ======================== */
function scrollSlider(direction) {
    const scrollAmount = window.innerWidth * direction;
    sliderWrapper.scrollLeft += scrollAmount;
}
leftArrow.addEventListener('click', () => scrollSlider(-1));
rightArrow.addEventListener('click', () => scrollSlider(1));

/* ======================== */
/* 3. TOUCH/SWIPE SUPPORT FOR MAIN SLIDER */
/* ======================== */
let touchStartX = 0;
let touchEndX = 0;

sliderWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

sliderWrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
        scrollSlider(1);
    }
    if (touchEndX - touchStartX > swipeThreshold) {
        scrollSlider(-1);
    }
}

/* ======================== */
/* 4. MAIN NAVIGATION */
/* ======================== */

function scrollToTarget(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function handleNavigationClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute('data-target');
    scrollToTarget(targetId);
}

function setupMainNavListeners() {
    const navLinksDiv = header.querySelector('.nav-links');
    navLinksDiv.innerHTML = mainNavHTML;

    navLinksDiv.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', handleNavigationClick);
    });

    updateActiveNav();
}

function updateActiveNav() {
    const currentSection = getCurrentSection();
    header.querySelectorAll('.nav-links a').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.nav-links a[data-target="${currentSection}"]`);
    if (activeBtn) activeBtn.classList.add('active');
}

function getCurrentSection() {
    const scrollLeft = sliderWrapper.scrollLeft;
    const windowWidth = window.innerWidth;
    const sectionIndex = Math.round(scrollLeft / windowWidth);
    const sectionIds = ['about-me', 'projects',  'contact'];
    return sectionIds[Math.min(sectionIndex, sectionIds.length - 1)];
}

// Intersection Observer for active section highlighting
const observerOptions = { root: sliderWrapper, threshold: 0.7 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !document.querySelector('.slide-section.show-detail')) {
            updateActiveNav();
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

/* ======================== */
/* 5. DETAIL VIEW TOGGLE (PANCAKE) */
/* ======================== */
function createDetailNav(sectionId) {
    if (sectionId === 'projects') {
        // Projects için navigasyon
        return `
            <a href="#" class="nav-button active detail-nav-item" data-item-index="0">GPU Instancing</a>
            <a href="#" class="nav-button detail-nav-item" data-item-index="1">Shader Library</a>
            <a href="#" class="nav-button detail-nav-item" data-item-index="2">Mini Dev Kit</a>
            <a href="#" class="nav-button detail-nav-item" data-item-index="3">Cofu</a>
            <a href="#" class="nav-button detail-nav-item" data-item-index="4">Return</a>
        `;
    } else if (sectionId === 'about-me') {
        // About Me için navigasyon
        return `
            <a href="#" class="nav-button active detail-nav-item" data-item-index="0">About Me</a>
            <a href="#" class="nav-button detail-nav-item" data-item-index="1">Education</a>
            <a href="#" class="nav-button detail-nav-item" data-item-index="2">Experience</a>
            <a href="#" class="nav-button detail-nav-item" data-item-index="3">Return</a>
        `;
    }

    return '';
}

detailToggleButtons.forEach(button => {
    button.addEventListener('click', function() {
        const parentSection = this.closest('.slide-section');
        const parentId = this.getAttribute('data-parent');

        // Hangi detail slider'ın aktif olduğunu bul (ya #detail-slider ya da #project-slider)
        const currentDetailSlider = parentSection.querySelector('.detail-slider-wrapper');

        if (parentSection) {
            parentSection.classList.add('show-detail');

            // Update navigation to show detail nav
            const navLinks = header.querySelector('.nav-links');
            navLinks.style.opacity = 0;

            setTimeout(() => {
                navLinks.innerHTML = createDetailNav(parentId);
                navLinks.style.opacity = 1;

                // Genel detail navigasyon işleyicisini çağır.
                setupDetailNavigation(currentDetailSlider);

                // Oklar için event listener'ları kur
                setupDetailArrowListeners(currentDetailSlider);
            }, 300);

            // Hide main scroll arrows
            leftArrow.style.display = 'none';
            rightArrow.style.display = 'none';

            // Reset detail slider to first item
            if (currentDetailSlider) {
                currentDetailSlider.scrollLeft = 0;
            }
        }
    });
});

/* ======================== */
/* 6. RETURN TO MAIN */
/* ======================== */
function handleReturnFromDetail(e) {
    e.preventDefault();
    const returnId = this.getAttribute('data-return-slide');
    const parentSection = document.getElementById(returnId);

    if (parentSection) {
        parentSection.classList.remove('show-detail');

        // Restore main navigation
        const navLinks = header.querySelector('.nav-links');
        navLinks.style.opacity = 0;

        setTimeout(() => {
            setupMainNavListeners();
            navLinks.style.opacity = 1;
        }, 300);

        // Show main scroll arrows
        leftArrow.style.display = 'flex';
        rightArrow.style.display = 'flex';

        // Scroll back to main section
        scrollToTarget(returnId);
    }
}

returnButtons.forEach(button => {
    button.addEventListener('click', handleReturnFromDetail);
});

/* ======================== */
/* 7. GENEL DETAIL SLIDER LOGIC VE OK İŞLEYİCİLERİ */
/* ======================== */

// Oklar için olay dinleyicilerini dinamik olarak kurar
function setupDetailArrowListeners(sliderElement) {
    if (!sliderElement) return;

    const scrollDetailSlider = (direction) => {
        const scrollAmount = sliderElement.clientWidth * direction;
        sliderElement.scrollLeft += scrollAmount;
    };

    // Okları bul (Daha önce global seçmiştik, ama artık her detail için ayrı ayrı bulmalıyız.)
    const leftArrow = sliderElement.parentElement.querySelector('.detail-left-arrow');
    const rightArrow = sliderElement.parentElement.querySelector('.detail-right-arrow');

    // Eğer önceki listener'lar varsa onları kaldırıp yenisini eklemek gerekir, ancak bu basit örnekte
    // sadece yenisini ekleyelim ve global elemanları kullanmayalım.

    // Önceki listener'ları kaldırmak için cloneNode kullanmak en basit yöntemdir:
    const newLeftArrow = leftArrow.cloneNode(true);
    const newRightArrow = rightArrow.cloneNode(true);
    leftArrow.parentNode.replaceChild(newLeftArrow, leftArrow);
    rightArrow.parentNode.replaceChild(newRightArrow, rightArrow);

    newLeftArrow.addEventListener('click', () => scrollDetailSlider(-1));
    newRightArrow.addEventListener('click', () => scrollDetailSlider(1));

    // Swipe desteği
    let detailTouchStartX = 0;
    let detailTouchEndX = 0;

    sliderElement.addEventListener('touchstart', (e) => {
        detailTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderElement.addEventListener('touchend', (e) => {
        detailTouchEndX = e.changedTouches[0].screenX;
        handleDetailSwipe();
    }, { passive: true });

    function handleDetailSwipe() {
        const swipeThreshold = 50;
        if (detailTouchStartX - detailTouchEndX > swipeThreshold) {
            scrollDetailSlider(1);
        }
        if (detailTouchEndX - detailTouchStartX > swipeThreshold) {
            scrollDetailSlider(-1);
        }
    }

    // Ok görünürlüğünü güncelle
    const updateDetailArrows = () => {
        newLeftArrow.style.opacity = sliderElement.scrollLeft > 10 ? 1 : 0.5;
        newRightArrow.style.opacity =
            sliderElement.scrollLeft < sliderElement.scrollWidth - sliderElement.clientWidth - 5 ? 1 : 0.5;
    };

    updateDetailArrows();
    sliderElement.addEventListener('scroll', () => {
        updateDetailArrows();
        updateDetailNavHighlight(sliderElement);
    });
}


/* ======================== */
/* 8. GENEL DETAIL NAVIGATION İŞLEYİCİ */
/* ======================== */
function setupDetailNavigation(sliderElement) {
    const detailNavItems = document.querySelectorAll('.detail-nav-item');

    detailNavItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();

            // Scroll to specific item
            if (sliderElement) {
                const scrollAmount = sliderElement.clientWidth * index;
                sliderElement.scrollLeft = scrollAmount;
            }

            // Update active state
            detailNavItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

function updateDetailNavHighlight(sliderElement) {
    const detailNavItems = document.querySelectorAll('.detail-nav-item');
    if (detailNavItems.length === 0 || !sliderElement) return;

    const scrollLeft = sliderElement.scrollLeft;
    const slideWidth = sliderElement.clientWidth;
    const currentIndex = Math.round(scrollLeft / slideWidth);

    detailNavItems.forEach((item, index) => {
        if (index === currentIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}


/* ======================== */
/* 9. INITIALIZE */
/* ======================== */
setupMainNavListeners();


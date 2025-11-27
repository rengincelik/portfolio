// Global Element Selection
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const sliderWrapper = document.getElementById('slider-wrapper');
const header = document.querySelector('.nav-header');

// Main Slides and Navigation Elements
const sections = document.querySelectorAll('.slide-section');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const navLinksDiv = header.querySelector('.nav-links');

// Accordion Elements
const accordionHeaders = document.querySelectorAll('.accordion-header');
const accordionItems = document.querySelectorAll('.accordion-item');

// Modal Elements
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-modal');
const modalClose = modal.querySelector('.modal-close');
const modalOverlay = modal.querySelector('.modal-overlay');

// Project Data (Verilerinizi buraya ekleyin)
const projectData = {
    'gpu-instancing': {
        title: 'GPU Instancing',
        image: 'https://via.placeholder.com/800x500/1a1a1a/00d4ff?text=GPU+Instancing+Demo',
        description: 'GPU instancing, milyonlarca nesneyi CPU yerine GPU üzerinde çizerek çizim çağrısı sayısını (Draw Calls) ciddi ölçüde azaltır. Bu projede, Unity’de ECS ve Command Buffer’lar kullanılarak optimizasyon yaklaşımları gösterilmiştir.',
        technologies: ['Unity', 'C#', 'Command Buffers', 'ECS (DOTS)'],
        github: 'https://github.com/rengincelik/GPU_Rendering',
        demo: '#', // Demo linkiniz yoksa '#' bırakılabilir
    },
    'shader-library': {
        title: 'Shader Library',
        image: 'https://via.placeholder.com/800x500/1a1a1a/00d4ff?text=Shader+Library+VFX',
        description: 'Universal Render Pipeline (URP) için geliştirilmiş, görsel efektleri ve özel malzeme özelliklerini içeren kapsamlı shader kütüphanesidir. Sadece estetik değil, mobil performans göz önünde bulundurularak yazılmıştır.',
        technologies: ['Unity Shader Graph', 'HLSL', 'URP', 'VFX'],
        github: 'https://github.com/rengincelik/Shaders',
        demo: '#',
    },
    'mini-dev-kit': {
        title: 'Mini Dev Kit',
        image: 'https://via.placeholder.com/800x500/1a1a1a/00d4ff?text=Mini+Dev+Kit+Tools',
        description: 'Tekrar kullanılabilir kod ve editör araçlarından oluşan kişisel gelişim kiti. Hızlı prototipleme ve tekrarlayan görevleri otomatikleştirmek için tasarlanmıştır. (Örn: Custom Animasyon araçları, Save/Load sistemi)',
        technologies: ['Unity Editor', 'C#', 'Tools', 'ScriptableObjects'],
        github: 'https://github.com/rengincelik/Mini-Dev-Kit',
        demo: '#',
    },
    'cofu': {
        title: 'Cofu',
        image: 'https://via.placeholder.com/800x500/1a1a1a/00d4ff?text=Cofu+Mobile+Game',
        description: 'Unity ile geliştirilmiş, mobil platformlar için optimize edilmiş bir bulmaca oyunu. Projede temiz kod yapısı (MVC), etkileşimli UI ve akıcı geçişler üzerine odaklanılmıştır.',
        technologies: ['Unity', 'C#', 'Mobile', 'UI/UX'],
        github: 'https://github.com/rengincelik/CoFu',
        demo: '#',
    }
};

const projectNavItems = [
    { id: 'gpu-instancing', name: 'GPU Instancing' },
    { id: 'shader-library', name: 'Shader Library' },
    { id: 'mini-dev-kit', name: 'Mini Dev Kit' },
    { id: 'cofu', name: 'Cofu' },
];

function createMainNavHTML() {
    const projectDropdown = `
        <div class="nav-dropdown-container">
            <a href="#projects" class="nav-button" data-target="projects">Projects</a>
            <div class="nav-dropdown-menu">
                ${projectNavItems.map(p =>
                    `<a href="#" class="dropdown-project-link" data-project-id="${p.id}">${p.name}</a>`
                ).join('')}
            </div>
        </div>
    `;

    return `
        <a href="#about-me" class="nav-button" data-target="about-me">About</a>
        ${projectDropdown}
        <a href="#contact" class="nav-button" data-target="contact">Contact</a>
    `;
}

/* ======================== */
/* 1. TEMA VE BAŞLANGIÇ AYARLARI */
/* ======================== */
function toggleTheme() {
    body.classList.toggle('dark-mode');
    themeToggle.textContent = body.classList.contains('dark-mode') ? '🌙' : '☀️';
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark-mode' : '');
}

// Temayı yükle
if (localStorage.getItem('theme') === 'dark-mode') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '🌙';
} else {
    body.classList.remove('dark-mode');
    themeToggle.textContent = '☀️';
}
themeToggle.addEventListener('click', toggleTheme);


/* ======================== */
/* 2. SLIDER NAVİGASYON (Tasarım 2) */
/* ======================== */
const sectionIds = ['about-me', 'projects', 'contact'];

function scrollSlider(direction) {
    const scrollAmount = window.innerWidth * direction;
    sliderWrapper.scrollLeft += scrollAmount;
}

leftArrow.addEventListener('click', () => scrollSlider(-1));
rightArrow.addEventListener('click', () => scrollSlider(1));

function scrollToTarget(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        const index = sectionIds.indexOf(targetId);
        if (index > -1) {
            sliderWrapper.scrollLeft = index * window.innerWidth;
        }
    }
}

function handleNavigationClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute('data-target');
    scrollToTarget(targetId);
}

function updateActiveNav() {
    const scrollLeft = sliderWrapper.scrollLeft;
    const windowWidth = window.innerWidth;
    const sectionIndex = Math.round(scrollLeft / windowWidth);
    const currentSectionId = sectionIds[Math.min(sectionIndex, sectionIds.length - 1)];

    header.querySelectorAll('.nav-links a').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.nav-links a[data-target="${currentSectionId}"]`);
    if (activeBtn) activeBtn.classList.add('active');
}

// script.js dosyasında mevcut setupMainNavListeners fonksiyonunu bununla değiştirin:


function setupMainNavListeners() {
    // Navigasyon HTML'i oluştur
    navLinksDiv.innerHTML = createMainNavHTML();

    // 1. Ana butonlara scroll listener'ı ekle (About, Projects, Contact)
    navLinksDiv.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', handleNavigationClick);
    });

    // 2. Dropdown içindeki proje linklerine listener'ı ekle
    navLinksDiv.querySelectorAll('.dropdown-project-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Önce Projects sekmesine kaydır
            scrollToTarget('projects');

            // 500ms sonra (kaydırma bitince) modalı aç
            setTimeout(() => {
                const projectId = e.currentTarget.getAttribute('data-project-id');
                openModal(projectId);
            }, 500); // 500ms kaydırma animasyonunu bekler

            // Dropdown'u geçici olarak gizle (isteğe bağlı, CSS zaten hover ile yönetiyor)
            e.currentTarget.closest('.nav-dropdown-container').querySelector('.nav-dropdown-menu').style.visibility = 'hidden';
            setTimeout(() => {
                e.currentTarget.closest('.nav-dropdown-container').querySelector('.nav-dropdown-menu').style.visibility = 'visible';
            }, 600);
        });
    });

    updateActiveNav();
}

sliderWrapper.addEventListener('scroll', updateActiveNav);


/* ======================== */
/* 3. ACCORDION MANTIK (Tasarım 1) */
/* ======================== */
// İlk elementi aktif yap
accordionItems[0].classList.add('active');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.closest('.accordion-item');
        const wasActive = item.classList.contains('active');

        // Diğerlerini kapat
        accordionItems.forEach(i => i.classList.remove('active'));

        // Tıklananı aç/kapat
        if (!wasActive) {
            item.classList.add('active');
        }
    });
});


/* ======================== */
/* 4. MODAL MANTIK (Tasarım 1) */
/* ======================== */
function openModal(projectId) {
    const project = projectData[projectId];

    if (!project) return;

    modal.querySelector('.modal-title').textContent = project.title;
    modal.querySelector('.modal-image img').src = project.image;
    modal.querySelector('.modal-description p').textContent = project.description;

    const techTags = modal.querySelector('.tech-tags');
    techTags.innerHTML = '';
    project.technologies.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech;
        techTags.appendChild(tag);
    });

    modal.querySelector('.github-link').href = project.github;
    modal.querySelector('.demo-link').href = project.demo;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Arkaplanı kaydırmayı engelle
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        openModal(card.getAttribute('data-project'));
    });
});

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});


/* ======================== */
/* 5. INITIALIZE */
/* ======================== */
setupMainNavListeners();

// script.js dosyasındaki mevcut accordion kodunu bununla değiştirin:

/* ======================== */
/* 3. ACCORDION MANTIK (Tasarım 1) - OPTİMİZE EDİLMİŞ VERSİYON */
/* ======================== */
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.closest('.accordion-item');

        // Eğer tıklanan öğe zaten aktifse, kapatın ve çıkın.
        if (item.classList.contains('active')) {
            item.classList.remove('active');
            return;
        }

        // Diğer tüm elemanlardaki "active" sınıfını kaldırın.
        accordionItems.forEach(i => {
            if (i !== item) {
                i.classList.remove('active');
            }
        });

        // Tıklanan öğeyi aktif yapın.
        item.classList.add('active');
    });
});



// // Theme Toggle
// const themeSwitch = document.getElementById('theme-switch');
// const body = document.body;

// // Load saved theme or default to dark
// const savedTheme = localStorage.getItem('theme') || 'dark';
// if (savedTheme === 'light') {
//     body.classList.add('light-theme');
//     themeSwitch.checked = true;
// }

// themeSwitch.addEventListener('change', () => {
//     if (themeSwitch.checked) {
//         body.classList.add('light-theme');
//         localStorage.setItem('theme', 'light');
//     } else {
//         body.classList.remove('light-theme');
//         localStorage.setItem('theme', 'dark');
//     }
// });

// // Section Navigation
// const navTabs = document.querySelectorAll('.nav-tab');
// const sections = document.querySelectorAll('.section');
// const mainContainer = document.querySelector('.main-container');
// let currentSection = 0;

// function goToSection(index) {
//     if (index < 0 || index >= sections.length) return;

//     currentSection = index;
//     mainContainer.style.transform = `translateX(-${currentSection * 100}vw)`;

//     // Update active nav tab
//     navTabs.forEach((tab, i) => {
//         tab.classList.toggle('active', i === currentSection);
//     });

//     // Update section active state
//     sections.forEach((section, i) => {
//         section.classList.toggle('active', i === currentSection);
//     });
// }

// // Nav tab click handlers
// navTabs.forEach((tab, index) => {
//     tab.addEventListener('click', () => {
//         goToSection(index);
//     });
// });

// // Arrow navigation
// document.getElementById('prev-section').addEventListener('click', () => {
//     goToSection(currentSection - 1);
// });

// document.getElementById('next-section').addEventListener('click', () => {
//     goToSection(currentSection + 1);
// });

// // Keyboard navigation
// document.addEventListener('keydown', (e) => {
//     if (e.key === 'ArrowLeft') {
//         goToSection(currentSection - 1);
//     } else if (e.key === 'ArrowRight') {
//         goToSection(currentSection + 1);
//     }
// });

// // Scroll navigation (horizontal)
// let isScrolling = false;
// mainContainer.addEventListener('wheel', (e) => {
//     if (isScrolling) return;

//     // Only handle horizontal scroll on About section
//     if (currentSection === 0 && sections[0].querySelector('.about-container').scrollHeight > sections[0].querySelector('.about-container').clientHeight) {
//         return; // Let vertical scroll work normally
//     }

//     if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
//         e.preventDefault();
//         isScrolling = true;

//         if (e.deltaX > 0) {
//             goToSection(currentSection + 1);
//         } else {
//             goToSection(currentSection - 1);
//         }

//         setTimeout(() => {
//             isScrolling = false;
//         }, 800);
//     }
// }, { passive: false });

// // Hero Card Scroll Effect
// const heroCard = document.querySelector('.hero-card');
// const aboutSection = document.getElementById('about');

// if (aboutSection && heroCard) {
//     aboutSection.addEventListener('scroll', () => {
//         const scrollPosition = aboutSection.scrollTop;

//         if (scrollPosition > 50) {
//             heroCard.classList.add('hidden');
//         } else {
//             heroCard.classList.remove('hidden');
//         }
//     });
// }

// // Accordion functionality
// const accordionHeaders = document.querySelectorAll('.accordion-header');
// const aboutItems = document.querySelectorAll('.about-item');

// // Open first accordion by default
// aboutItems[0].classList.add('active');

// accordionHeaders.forEach((header, index) => {
//     header.addEventListener('click', () => {
//         const item = aboutItems[index];
//         const wasActive = item.classList.contains('active');

//         // Close all accordions
//         aboutItems.forEach(i => i.classList.remove('active'));

//         // Open clicked accordion if it wasn't active
//         if (!wasActive) {
//             item.classList.add('active');
//         }
//     });
// });

// // About navigation dots
// const navDots = document.querySelectorAll('.nav-dot');
// const aboutContainer = document.querySelector('.about-container');

// function updateActiveDot() {
//     const scrollPosition = aboutContainer.scrollTop;
//     const items = document.querySelectorAll('.about-item');

//     items.forEach((item, index) => {
//         const rect = item.getBoundingClientRect();
//         const containerRect = aboutContainer.getBoundingClientRect();

//         if (rect.top >= containerRect.top && rect.top <= containerRect.top + 100) {
//             navDots.forEach(dot => dot.classList.remove('active'));
//             navDots[index].classList.add('active');
//         }
//     });
// }

// // Scroll to item on dot click
// navDots.forEach((dot, index) => {
//     dot.addEventListener('click', () => {
//         const targetId = dot.getAttribute('data-target');
//         const targetElement = document.getElementById(targetId);

//         targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

//         // Update active dot
//         navDots.forEach(d => d.classList.remove('active'));
//         dot.classList.add('active');

//         // Open the accordion
//         aboutItems.forEach(item => item.classList.remove('active'));
//         aboutItems[index].classList.add('active');
//     });
// });

// // Update dots on scroll
// if (aboutContainer) {
//     aboutContainer.addEventListener('scroll', updateActiveDot);
// }

// // Project Modal
// const projectCards = document.querySelectorAll('.project-card');
// const modal = document.getElementById('project-modal');
// const modalOverlay = modal.querySelector('.modal-overlay');
// const modalClose = modal.querySelector('.modal-close');

// // Project data (you can customize this)
// const projectData = {
//     '1': {
//         title: 'Project Name 1',
//         image: 'https://via.placeholder.com/800x500/1a1a1a/ffffff?text=Project+1',
//         description: 'Bu proje hakkında detaylı açıklama buraya gelecek. Projenin amacı, kullanılan teknolojiler ve elde edilen sonuçlar hakkında bilgi verebilirsin.',
//         technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
//         github: 'https://github.com/username/project1',
//         demo: 'https://project1-demo.com'
//     },
//     '2': {
//         title: 'Project Name 2',
//         image: 'https://via.placeholder.com/800x500/1a1a1a/ffffff?text=Project+2',
//         description: 'İkinci proje için detaylı açıklama. Projenin özellikleri ve teknik detayları.',
//         technologies: ['Python', 'Django', 'PostgreSQL'],
//         github: 'https://github.com/username/project2',
//         demo: 'https://project2-demo.com'
//     },
//     '3': {
//         title: 'Project Name 3',
//         image: 'https://via.placeholder.com/800x500/1a1a1a/ffffff?text=Project+3',
//         description: 'Üçüncü proje açıklaması ve detayları.',
//         technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
//         github: 'https://github.com/username/project3',
//         demo: 'https://project3-demo.com'
//     },
//     '4': {
//         title: 'Project Name 4',
//         image: 'https://via.placeholder.com/800x500/1a1a1a/ffffff?text=Project+4',
//         description: 'Dördüncü proje hakkında bilgiler.',
//         technologies: ['Angular', 'TypeScript', 'GraphQL'],
//         github: 'https://github.com/username/project4',
//         demo: 'https://project4-demo.com'
//     }
// };

// // Open modal on project card click
// projectCards.forEach(card => {
//     card.addEventListener('click', () => {
//         const projectId = card.getAttribute('data-project');
//         const project = projectData[projectId];

//         if (project) {
//             // Update modal content
//             modal.querySelector('.modal-title').textContent = project.title;
//             modal.querySelector('.modal-image img').src = project.image;
//             modal.querySelector('.modal-description p').textContent = project.description;

//             // Update technologies
//             const techTags = modal.querySelector('.tech-tags');
//             techTags.innerHTML = '';
//             project.technologies.forEach(tech => {
//                 const tag = document.createElement('span');
//                 tag.className = 'tech-tag';
//                 tag.textContent = tech;
//                 techTags.appendChild(tag);
//             });

//             // Update links
//             const links = modal.querySelectorAll('.modal-links a');
//             links[0].href = project.github;
//             links[1].href = project.demo;

//             // Show modal
//             modal.classList.add('active');
//             document.body.style.overflow = 'hidden';
//         }
//     });
// });

// // Close modal
// function closeModal() {
//     modal.classList.remove('active');
//     document.body.style.overflow = '';
// }

// modalClose.addEventListener('click', closeModal);
// modalOverlay.addEventListener('click', closeModal);

// // Close modal on Escape key
// document.addEventListener('keydown', (e) => {
//     if (e.key === 'Escape' && modal.classList.contains('active')) {
//         closeModal();
//     }
// });

// // Responsive: Vertical scroll on mobile
// function handleResponsive() {
//     if (window.innerWidth <= 768) {
//         mainContainer.style.transform = 'none';
//         mainContainer.style.flexDirection = 'column';
//     } else {
//         mainContainer.style.transform = `translateX(-${currentSection * 100}vw)`;
//         mainContainer.style.flexDirection = 'row';
//     }
// }

// window.addEventListener('resize', handleResponsive);
// handleResponsive();


// // // Global Element Selection
// // const body = document.body;
// // const themeToggle = document.getElementById('theme-toggle');
// // const sliderWrapper = document.getElementById('slider-wrapper');
// // const header = document.querySelector('.nav-header');

// // // Main Slides and Navigation Elements
// // // sections değişkeni, HTML'deki ana slide section ID'lerini (about-me, projects, contact) içermelidir.
// // const sections = document.querySelectorAll('#about-me, #projects');
// // const leftArrow = document.querySelector('.left-arrow');
// // const rightArrow = document.querySelector('.right-arrow');

// // // Detail Elements
// // const detailToggleButtons = document.querySelectorAll('.detail-toggle-btn');
// // const returnButtons = document.querySelectorAll('.return-btn');

// // // Detail Slider Elements (projectSlider ID'si Project Section'da, ancak genel yapıyı temsil ediyor)
// // // NOT: HTML'de hem about hem de projects içinde slider ID'si "project-slider" olarak geçiyordu.
// // // Bu ID'yi sadece Projects için tutarak, About için closest ile bulma yoluna gidilebilir, ancak
// // // mevcut yapıda projects'in ID'si 'project-slider' ve about'un ID'si 'detail-slider' olmalıdır.
// // // Şimdilik sadece Project Slider'ı seçip, About için yerel olarak bulalım:
// // const projectSlider = document.getElementById('project-slider');
// // const detailLeftArrow = document.querySelector('.detail-left-arrow');
// // const detailRightArrow = document.querySelector('.detail-right-arrow');

// // // Navigation HTML Templates
// // const mainNavHTML = `
// //     <a href="#about-me" class="nav-button" data-target="about-me">About</a>
// //     <a href="#projects" class="nav-button" data-target="projects">Projects</a>
// // `;

// // /* ======================== */
// // /* 1. THEME TOGGLE */
// // /* ======================== */
// // function toggleTheme() {
// //     body.classList.toggle('dark-mode');
// //     themeToggle.textContent = body.classList.contains('dark-mode') ? '🌙' : '☀️';
// // }
// // themeToggle.addEventListener('click', toggleTheme);

// // /* ======================== */
// // /* 2. MAIN SLIDER SCROLL */
// // /* ======================== */
// // function scrollSlider(direction) {
// //     const scrollAmount = window.innerWidth * direction;
// //     sliderWrapper.scrollLeft += scrollAmount;
// // }
// // leftArrow.addEventListener('click', () => scrollSlider(-1));
// // rightArrow.addEventListener('click', () => scrollSlider(1));

// // /* ======================== */
// // /* 3. TOUCH/SWIPE SUPPORT FOR MAIN SLIDER */
// // /* ======================== */
// // let touchStartX = 0;
// // let touchEndX = 0;

// // sliderWrapper.addEventListener('touchstart', (e) => {
// //     touchStartX = e.changedTouches[0].screenX;
// // }, { passive: true });

// // sliderWrapper.addEventListener('touchend', (e) => {
// //     touchEndX = e.changedTouches[0].screenX;
// //     handleSwipe();
// // }, { passive: true });

// // function handleSwipe() {
// //     const swipeThreshold = 50;
// //     if (touchStartX - touchEndX > swipeThreshold) {
// //         scrollSlider(1);
// //     }
// //     if (touchEndX - touchStartX > swipeThreshold) {
// //         scrollSlider(-1);
// //     }
// // }

// // /* ======================== */
// // /* 4. MAIN NAVIGATION */
// // /* ======================== */

// // function scrollToTarget(targetId) {
// //     const target = document.getElementById(targetId);
// //     if (target) {
// //         target.scrollIntoView({ behavior: 'smooth', block: 'start' });
// //     }
// // }

// // function handleNavigationClick(e) {
// //     e.preventDefault();
// //     const targetId = this.getAttribute('data-target');
// //     scrollToTarget(targetId);
// // }

// // function setupMainNavListeners() {
// //     const navLinksDiv = header.querySelector('.nav-links');
// //     navLinksDiv.innerHTML = mainNavHTML;

// //     navLinksDiv.querySelectorAll('.nav-button').forEach(button => {
// //         button.addEventListener('click', handleNavigationClick);
// //     });

// //     updateActiveNav();
// // }

// // function updateActiveNav() {
// //     const currentSection = getCurrentSection();
// //     header.querySelectorAll('.nav-links a').forEach(btn => btn.classList.remove('active'));
// //     const activeBtn = document.querySelector(`.nav-links a[data-target="${currentSection}"]`);
// //     if (activeBtn) activeBtn.classList.add('active');
// // }

// // function getCurrentSection() {
// //     const scrollLeft = sliderWrapper.scrollLeft;
// //     const windowWidth = window.innerWidth;
// //     const sectionIndex = Math.round(scrollLeft / windowWidth);
// //     const sectionIds = ['about', 'projects'];
// //     return sectionIds[Math.min(sectionIndex, sectionIds.length - 1)];
// // }

// // // Intersection Observer for active section highlighting
// // const observerOptions = { root: sliderWrapper, threshold: 0.7 };
// // const observer = new IntersectionObserver((entries) => {
// //     entries.forEach(entry => {
// //         if (entry.isIntersecting && !document.querySelector('.slide-section.show-detail')) {
// //             updateActiveNav();
// //         }
// //     });
// // }, observerOptions);

// // sections.forEach(section => observer.observe(section));

// // /* ======================== */
// // /* 5. DETAIL VIEW TOGGLE (PANCAKE) */
// // /* ======================== */
// // function createDetailNav(sectionId) {
// //     if (sectionId === 'projects') {
// //         // Projects için navigasyon
// //         return `
// //             <a href="#" class="nav-button active detail-nav-item" data-item-index="0">GPU Instancing</a>
// //             <a href="#" class="nav-button detail-nav-item" data-item-index="1">Shader Library</a>
// //             <a href="#" class="nav-button detail-nav-item" data-item-index="2">Mini Dev Kit</a>
// //             <a href="#" class="nav-button detail-nav-item" data-item-index="3">Cofu</a>
// //             <a href="#" class="nav-button detail-nav-item" data-item-index="4">Return</a>
// //         `;
// //     } else if (sectionId === 'about-me') {
// //         // About Me için navigasyon
// //         return `
// //             <a href="#" class="nav-button active detail-nav-item" data-item-index="0">About Me</a>
// //             <a href="#" class="nav-button detail-nav-item" data-item-index="1">Education</a>
// //             <a href="#" class="nav-button detail-nav-item" data-item-index="2">Experience</a>
// //             <a href="#" class="nav-button detail-nav-item" data-item-index="3">Return</a>
// //         `;
// //     }

// //     return '';
// // }

// // detailToggleButtons.forEach(button => {
// //     button.addEventListener('click', function() {
// //         const parentSection = this.closest('.slide-section');
// //         const parentId = this.getAttribute('data-parent');

// //         // Hangi detail slider'ın aktif olduğunu bul (ya #detail-slider ya da #project-slider)
// //         const currentDetailSlider = parentSection.querySelector('.detail-slider-wrapper');

// //         if (parentSection) {
// //             parentSection.classList.add('show-detail');

// //             // Update navigation to show detail nav
// //             const navLinks = header.querySelector('.nav-links');
// //             navLinks.style.opacity = 0;

// //             setTimeout(() => {
// //                 navLinks.innerHTML = createDetailNav(parentId);
// //                 navLinks.style.opacity = 1;

// //                 // Genel detail navigasyon işleyicisini çağır.
// //                 setupDetailNavigation(currentDetailSlider);

// //                 // Oklar için event listener'ları kur
// //                 setupDetailArrowListeners(currentDetailSlider);
// //             }, 300);

// //             // Hide main scroll arrows
// //             leftArrow.style.display = 'none';
// //             rightArrow.style.display = 'none';

// //             // Reset detail slider to first item
// //             if (currentDetailSlider) {
// //                 currentDetailSlider.scrollLeft = 0;
// //             }
// //         }
// //     });
// // });

// // /* ======================== */
// // /* 6. RETURN TO MAIN */
// // /* ======================== */
// // function handleReturnFromDetail(e) {
// //     e.preventDefault();
// //     const returnId = this.getAttribute('data-return-slide');
// //     const parentSection = document.getElementById(returnId);

// //     if (parentSection) {
// //         parentSection.classList.remove('show-detail');

// //         // Restore main navigation
// //         const navLinks = header.querySelector('.nav-links');
// //         navLinks.style.opacity = 0;

// //         setTimeout(() => {
// //             setupMainNavListeners();
// //             navLinks.style.opacity = 1;
// //         }, 300);

// //         // Show main scroll arrows
// //         leftArrow.style.display = 'flex';
// //         rightArrow.style.display = 'flex';

// //         // Scroll back to main section
// //         scrollToTarget(returnId);
// //     }
// // }

// // returnButtons.forEach(button => {
// //     button.addEventListener('click', handleReturnFromDetail);
// // });

// // /* ======================== */
// // /* 7. GENEL DETAIL SLIDER LOGIC VE OK İŞLEYİCİLERİ */
// // /* ======================== */

// // // Oklar için olay dinleyicilerini dinamik olarak kurar
// // function setupDetailArrowListeners(sliderElement) {
// //     if (!sliderElement) return;

// //     const scrollDetailSlider = (direction) => {
// //         const scrollAmount = sliderElement.clientWidth * direction;
// //         sliderElement.scrollLeft += scrollAmount;
// //     };

// //     // Okları bul (Daha önce global seçmiştik, ama artık her detail için ayrı ayrı bulmalıyız.)
// //     const leftArrow = sliderElement.parentElement.querySelector('.detail-left-arrow');
// //     const rightArrow = sliderElement.parentElement.querySelector('.detail-right-arrow');

// //     // Eğer önceki listener'lar varsa onları kaldırıp yenisini eklemek gerekir, ancak bu basit örnekte
// //     // sadece yenisini ekleyelim ve global elemanları kullanmayalım.

// //     // Önceki listener'ları kaldırmak için cloneNode kullanmak en basit yöntemdir:
// //     const newLeftArrow = leftArrow.cloneNode(true);
// //     const newRightArrow = rightArrow.cloneNode(true);
// //     leftArrow.parentNode.replaceChild(newLeftArrow, leftArrow);
// //     rightArrow.parentNode.replaceChild(newRightArrow, rightArrow);

// //     newLeftArrow.addEventListener('click', () => scrollDetailSlider(-1));
// //     newRightArrow.addEventListener('click', () => scrollDetailSlider(1));

// //     // Swipe desteği
// //     let detailTouchStartX = 0;
// //     let detailTouchEndX = 0;

// //     sliderElement.addEventListener('touchstart', (e) => {
// //         detailTouchStartX = e.changedTouches[0].screenX;
// //     }, { passive: true });

// //     sliderElement.addEventListener('touchend', (e) => {
// //         detailTouchEndX = e.changedTouches[0].screenX;
// //         handleDetailSwipe();
// //     }, { passive: true });

// //     function handleDetailSwipe() {
// //         const swipeThreshold = 50;
// //         if (detailTouchStartX - detailTouchEndX > swipeThreshold) {
// //             scrollDetailSlider(1);
// //         }
// //         if (detailTouchEndX - detailTouchStartX > swipeThreshold) {
// //             scrollDetailSlider(-1);
// //         }
// //     }

// //     // Ok görünürlüğünü güncelle
// //     const updateDetailArrows = () => {
// //         newLeftArrow.style.opacity = sliderElement.scrollLeft > 10 ? 1 : 0.5;
// //         newRightArrow.style.opacity =
// //             sliderElement.scrollLeft < sliderElement.scrollWidth - sliderElement.clientWidth - 5 ? 1 : 0.5;
// //     };

// //     updateDetailArrows();
// //     sliderElement.addEventListener('scroll', () => {
// //         updateDetailArrows();
// //         updateDetailNavHighlight(sliderElement);
// //     });
// // }


// // /* ======================== */
// // /* 8. GENEL DETAIL NAVIGATION İŞLEYİCİ */
// // /* ======================== */
// // function setupDetailNavigation(sliderElement) {
// //     const detailNavItems = document.querySelectorAll('.detail-nav-item');

// //     detailNavItems.forEach((item, index) => {
// //         item.addEventListener('click', (e) => {
// //             e.preventDefault();

// //             // Scroll to specific item
// //             if (sliderElement) {
// //                 const scrollAmount = sliderElement.clientWidth * index;
// //                 sliderElement.scrollLeft = scrollAmount;
// //             }

// //             // Update active state
// //             detailNavItems.forEach(nav => nav.classList.remove('active'));
// //             item.classList.add('active');
// //         });
// //     });
// // }

// // function updateDetailNavHighlight(sliderElement) {
// //     const detailNavItems = document.querySelectorAll('.detail-nav-item');
// //     if (detailNavItems.length === 0 || !sliderElement) return;

// //     const scrollLeft = sliderElement.scrollLeft;
// //     const slideWidth = sliderElement.clientWidth;
// //     const currentIndex = Math.round(scrollLeft / slideWidth);

// //     detailNavItems.forEach((item, index) => {
// //         if (index === currentIndex) {
// //             item.classList.add('active');
// //         } else {
// //             item.classList.remove('active');
// //         }
// //     });
// // }


// // /* ======================== */
// // /* 9. INITIALIZE */
// // /* ======================== */
// // setupMainNavListeners();


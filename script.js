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







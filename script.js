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

// Modal Elements (Old modal - keep for compatibility)
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-modal');
const modalClose = modal.querySelector('.modal-close');
const modalOverlay = modal.querySelector('.modal-overlay');

// Popup Elements - Will be initialized after DOM loads
let projectPopup, popupClose, popupOverlay, popupTitle, popupTabs, popupAccordionContainer;
let megaMenuTitles, megaMenuItems;

// Project Data
const projectData = {
    'gpu-instancing': {
        title: 'GPU Instancing & Rendering',
        image: 'https://via.placeholder.com/800x500/1a1a1a/00d4ff?text=GPU+Instancing',
        description: 'High-performance Unity solutions for massive object rendering',
        technologies: ['Unity URP', 'Compute Shaders', 'HLSL'],
        github: 'https://github.com/rengincelik/GPU_Rendering',
        demo: '#',
        subProjects: {
            'gpu-3d': {
                name: '3D GPU Instancing Methods',
                description: 'Three progressive GPU instancing approaches for rendering massive object counts efficiently with different performance profiles.',
                tech: ['Compute Shader', 'DrawMeshInstanced', 'Matrix Calculation'],
                github: 'https://github.com/rengincelik/GPU_Rendering',
                package: 'https://github.com/rengincelik/GPU_Rendering/blob/main/3D_GPU_Instancing.unitypackage',
                video: 'https://via.placeholder.com/400x250/1a1a1a/00d4ff?text=3D+GPU+Demo'
            },
            'gpu-sprite': {
                name: 'GPU Sprite Instancing',
                description: 'Advanced 2D sprite instancing with dynamic addition, spherical culling, and frustum culling for massive sprite rendering.',
                tech: ['Atomic Operations', 'Frustum Culling', 'DrawMeshInstancedIndirect'],
                github: 'https://github.com/rengincelik/GPU_Rendering',
                package: 'https://github.com/rengincelik/GPU_Rendering/blob/main/GPU_Sprite_Demo.unitypackage',
                video: 'https://raw.githubusercontent.com/rengincelik/GPU_Rendering/main/GPU_Instancing/Recordings/Eraser.mp4'
            },
            'grass': {
                name: 'GPU Grass Rendering',
                description: 'High-performance grass rendering system using GPU instancing and compute shaders for realistic vegetation.',
                tech: ['ProBuilder', 'Gradient Coloring', 'Procedural Generation'],
                github: 'https://github.com/rengincelik/GPU_Rendering',
                package: 'https://github.com/rengincelik/GPU_Rendering/blob/main/Grass_Leaf.unitypackage',
                video: 'https://via.placeholder.com/400x250/1a1a1a/00d4ff?text=Grass+Demo'
            },
            'random-spawn': {
                name: 'Random Spawn System',
                description: 'GPU-accelerated random object spawning system with customizable area bounds and instance counts.',
                tech: ['Compute Shader', 'Random Generation', 'Bounded Area'],
                github: 'https://github.com/rengincelik/GPU_Rendering',
                package: 'https://github.com/rengincelik/GPU_Rendering/blob/main/3D_RandomSpawn.unitypackage',
                video: 'https://via.placeholder.com/400x250/1a1a1a/00d4ff?text=Random+Spawn'
            },
            'scaling': {
                name: 'Simple Scaling System',
                description: 'Grid-based instance placement system with real-time scaling control and color management.',
                tech: ['Grid System', 'Real-time Scaling', 'URP Lighting'],
                github: 'https://github.com/rengincelik/GPU_Rendering',
                package: 'https://github.com/rengincelik/GPU_Rendering/blob/main/3D_ScalingItems.unitypackage',
                video: 'https://via.placeholder.com/400x250/1a1a1a/00d4ff?text=Scaling'
            }
        }
    },
    'shader-library': {
        title: 'Unity Shader Library',
        image: 'https://via.placeholder.com/800x500/1a1a1a/ff6b6b?text=Shader+Library',
        description: 'Advanced material shaders & visual effects for URP',
        technologies: ['Unity Shader Graph', 'HLSL', 'URP', 'VFX'],
        github: 'https://github.com/rengincelik/Shaders',
        demo: '#',
        subProjects: {
            'silk': {
                name: 'Silk Material Shader',
                description: 'Physically-based silk material with anisotropic reflections, iridescence effects, and sheen properties.',
                tech: ['Anisotropic GGX', 'Fresnel', 'Iridescence', 'Sheen BRDF'],
                github: 'https://github.com/rengincelik/Shaders',
                video: 'https://raw.githubusercontent.com/rengincelik/Shaders/main/ShaderSamples/Recordings/BasicURP_SilkShader.png'
            },
            'velvet': {
                name: 'Velvet Material Shader',
                description: 'Advanced velvet shader featuring rim lighting, subsurface scattering, and fuzz scatter effects.',
                tech: ['Velvet BRDF', 'SSS', 'Procedural Noise'],
                github: 'https://github.com/rengincelik/Shaders',
                video: 'https://raw.githubusercontent.com/rengincelik/Shaders/main/ShaderSamples/Recordings/BasicURP_VelvetShader.png'
            },
            'water': {
                name: 'Water Surface Shader',
                description: 'Dynamic water surface with vertex displacement, procedural waves, and depth-based coloring.',
                tech: ['Vertex Displacement', 'Wave Simulation', 'Normal Calculation'],
                github: 'https://github.com/rengincelik/Shaders',
                video: 'https://raw.githubusercontent.com/rengincelik/Shaders/main/ShaderSamples/Recordings/WaterSurface.png'
            },
            'lit-surface': {
                name: 'Advanced Surface Shader',
                description: 'Highly configurable surface shader with metallic, glossy, roughness, and matte modes.',
                tech: ['Multi-Mode', 'Procedural Roughness', 'Shadow Integration'],
                github: 'https://github.com/rengincelik/Shaders',
                video: 'https://raw.githubusercontent.com/rengincelik/Shaders/main/ShaderSamples/Recordings/BasicLit_AdvancedSurface.png'
            }
        }
    },
    'mini-dev-kit': {
        title: 'Mini Dev Kit',
        image: 'https://via.placeholder.com/800x500/1a1a1a/4ecdc4?text=Mini+Dev+Kit',
        description: 'Reusable development tools & systems',
        technologies: ['Unity Editor', 'C#', 'Tools', 'ScriptableObjects'],
        github: 'https://github.com/rengincelik/Mini-Dev-Kit',
        demo: '#',
        subProjects: {
            '3d-player': {
                name: '3D Player Movement Framework',
                description: 'Comprehensive Unity movement system with modular input mapping and vehicle interaction mechanics.',
                tech: ['State Machine', 'Input Bridge', 'Vehicle System'],
                github: 'https://github.com/rengincelik/Mini-Dev-Kit',
                package: 'https://github.com/rengincelik/Mini-Dev-Kit/blob/main/3D_PlayerMovement.unitypackage',
                video: 'https://raw.githubusercontent.com/rengincelik/Mini-Dev-Kit/main/MiniDevKit3D/Recordings/3D_PlayerMovement.webm'
            },
            '3d-object': {
                name: '3D Object Movement Framework',
                description: 'Comprehensive Unity movement system with DOTween-based animations and vehicle interaction mechanics.',
                tech: ['DOTween', 'ScriptableObject', 'Custom Editors'],
                github: 'https://github.com/rengincelik/Mini-Dev-Kit',
                package: 'https://github.com/rengincelik/Mini-Dev-Kit/blob/main/3D_ObjectMovement.unitypackage',
                video: 'https://via.placeholder.com/400x250/1a1a1a/4ecdc4?text=3D+Object+Movement'
            },
            '2d-player': {
                name: '2D Player Movement Framework',
                description: 'Comprehensive Unity 2D player movement system with modular input mapping and sprite animations.',
                tech: ['State Machine', 'Multiple Movement Types', 'Sprite Animation'],
                github: 'https://github.com/rengincelik/Mini-Dev-Kit',
                package: 'https://github.com/rengincelik/Mini-Dev-Kit/blob/main/2D_PlayerMovement.unitypackage',
                video: 'https://raw.githubusercontent.com/rengincelik/Mini-Dev-Kit/main/Mini%20Dev%20Kit%202D/Recordings/2D_Movement.mp4'
            },
            '2d-object': {
                name: '2D Object Movement Framework',
                description: 'Comprehensive Unity 2D object movement system with DOTween-based animations and vehicle interaction mechanics.',
                tech: ['DOTween', 'ScriptableObject', 'Custom Editors', 'Sprite Animation'],
                github: 'https://github.com/rengincelik/Mini-Dev-Kit',
                package: 'https://github.com/rengincelik/Mini-Dev-Kit/blob/main/2D_ObjectMovement.unitypackage',
                video: 'https://raw.githubusercontent.com/rengincelik/Mini-Dev-Kit/main/Mini%20Dev%20Kit%202D/Recordings/2D_Movement.mp4'
            },
            'sprite-animator': {
                name: 'Sprite Database Animator',
                description: 'A Unity system for code-driven sprite animations using SpriteLibrary and SpriteResolver.',
                tech: ['Dynamic Animation', 'Frame Rate Control', 'Custom Inspector'],
                github: 'https://github.com/rengincelik/Mini-Dev-Kit',
                package: 'https://github.com/rengincelik/Mini-Dev-Kit/blob/main/SpriteDatabaseAnimation.unitypackage',
                readme: 'https://github.com/rengincelik/Mini-Dev-Kit/blob/main/Mini%20Dev%20Kit%202D/Assets/_SpriteDatabaseAnimation/readMe.md',
                video: 'https://raw.githubusercontent.com/rengincelik/Mini-Dev-Kit/main/Mini%20Dev%20Kit%202D/Recordings/SpriteDatabaseAnimation.mp4'
            }

        }
    },
    'games': {
        title: 'Games',
        image: 'https://via.placeholder.com/800x500/1a1a1a/95e1d3?text=Games',
        description: 'Published game projects',
        technologies: ['Unity', 'Mobile', 'UI/UX'],
        github: 'https://github.com/rengincelik/CoFu',
        demo: 'https://rengincelik.itch.io',
        subProjects: {
            'cofu': {
                name: 'Cofu',
                description: 'Unity ile geliştirilmiş, mobil platformlar için optimize edilmiş bir bulmaca oyunu. Projede temiz kod yapısı (MVC), etkileşimli UI ve akıcı geçişler üzerine odaklanılmıştır.',
                tech: ['Unity', 'Mobile', 'UI/UX', 'Puzzle Mechanics'],
                github: 'https://github.com/rengincelik/CoFu',
                demo: 'https://rengincelik.itch.io/cofu',
                video: 'https://via.placeholder.com/400x250/1a1a1a/95e1d3?text=Cofu+Game'
            }
        }
    }
};

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
/* 2. SLIDER NAVİGASYON */
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

    header.querySelectorAll('.nav-links .nav-button').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`.nav-links .nav-button[data-target="${currentSectionId}"]`);
    if (activeBtn) activeBtn.classList.add('active');
}

function setupMainNavListeners() {
    navLinksDiv.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', handleNavigationClick);
    });
    updateActiveNav();
}

sliderWrapper.addEventListener('scroll', updateActiveNav);

/* ======================== */
/* 3. ACCORDION MANTIK */
/* ======================== */
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.closest('.accordion-item');

        if (item.classList.contains('active')) {
            item.classList.remove('active');
            return;
        }

        accordionItems.forEach(i => {
            if (i !== item) {
                i.classList.remove('active');
            }
        });

        item.classList.add('active');
    });
});

/* ======================== */
/* 4. OLD MODAL MANTIK (Kept for compatibility) */
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
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

/* ======================== */
/* 5. NEW POPUP SYSTEM */
/* ======================== */

// Initialize popup elements after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    projectPopup = document.getElementById('project-popup');
    popupClose = document.getElementById('popup-close');
    popupOverlay = projectPopup ? projectPopup.querySelector('.popup-overlay') : null;
    popupTitle = document.getElementById('popup-title');
    popupTabs = document.querySelectorAll('.popup-tab');
    popupAccordionContainer = document.getElementById('popup-accordion-container');

    megaMenuTitles = document.querySelectorAll('.mega-menu-title');
    megaMenuItems = document.querySelectorAll('.mega-menu-items a');

    setupPopupListeners();
});

function setupPopupListeners() {
    if (!projectPopup || !popupClose) {
        console.error('Popup elements not found!');
        return;
    }

    // Mega Menu Title Click
    megaMenuTitles.forEach(title => {
        title.addEventListener('click', (e) => {
            const projectId = e.currentTarget.getAttribute('data-project-id');
            scrollToTarget('projects');
            setTimeout(() => {
                openProjectPopup(projectId);
            }, 300);
        });
    });

    // Mega Menu Items Click
    megaMenuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = e.currentTarget.getAttribute('data-project-id');
            const subProjectId = e.currentTarget.getAttribute('data-sub-project');

            scrollToTarget('projects');
            setTimeout(() => {
                openProjectPopup(projectId, subProjectId);
            }, 300);
        });
    });

    // Project Cards Click
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openProjectPopup(projectId);
        });
    });

    // Close Popup
    popupClose.addEventListener('click', closeProjectPopup);
    popupOverlay.addEventListener('click', closeProjectPopup);

    // Tab Switch
    popupTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            openProjectPopup(tabId);
        });
    });
}

// Open Project Popup
function openProjectPopup(projectId, autoExpandSubProject = null) {
    if (!projectData[projectId] || !projectPopup) return;

    const project = projectData[projectId];

    popupTitle.textContent = project.title;

    popupTabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === projectId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    loadPopupAccordion(projectId, autoExpandSubProject);

    projectPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Load Accordion Content
function loadPopupAccordion(projectId, autoExpandSubProject = null) {
    const project = projectData[projectId];
    if (!project || !project.subProjects) return;

    popupAccordionContainer.innerHTML = '';

    Object.entries(project.subProjects).forEach(([subId, subProject]) => {
        const accordionItem = document.createElement('div');
        accordionItem.className = 'popup-accordion-item';
        if (autoExpandSubProject === subId) {
            accordionItem.classList.add('active');
        }

        const header = document.createElement('button');
        header.className = 'popup-accordion-header';
        header.innerHTML = `
            <h3>${subProject.name}</h3>
            <span class="popup-accordion-icon">▸</span>
        `;

        const content = document.createElement('div');
        content.className = 'popup-accordion-content';

        let contentHTML = '';

        if (subProject.video) {
            const isVideo = subProject.video.endsWith('.mp4') || subProject.video.endsWith('.webm');
            contentHTML += `
                <div class="popup-media">
                    ${isVideo
                        ? `<video src="${subProject.video}" autoplay loop muted playsinline></video>`
                        : `<img src="${subProject.video}" alt="${subProject.name}" />`
                    }
                </div>
            `;
        }

        contentHTML += `<p class="popup-description">${subProject.description}</p>`;

        if (subProject.tech && subProject.tech.length > 0) {
            contentHTML += '<div class="popup-tech-tags">';
            subProject.tech.forEach(tech => {
                contentHTML += `<span class="popup-tech-tag">${tech}</span>`;
            });
            contentHTML += '</div>';
        }

        contentHTML += '<div class="popup-links">';
        if (subProject.github) {
            contentHTML += `<a href="${subProject.github}" target="_blank" class="popup-link">GitHub</a>`;
        }
        if (subProject.package) {
            contentHTML += `<a href="${subProject.package}" target="_blank" class="popup-link secondary">📦 Package</a>`;
        }
        if (subProject.demo) {
            contentHTML += `<a href="${subProject.demo}" target="_blank" class="popup-link secondary">Live Demo</a>`;
        }
        if (subProject.readme) {
            contentHTML += `<a href="${subProject.readme}" target="_blank" class="popup-link secondary">📖 README</a>`;
        }
        contentHTML += '</div>';

        content.innerHTML = contentHTML;

        header.addEventListener('click', () => {
            const isActive = accordionItem.classList.contains('active');

            document.querySelectorAll('.popup-accordion-item').forEach(item => {
                item.classList.remove('active');
            });

            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });

        accordionItem.appendChild(header);
        accordionItem.appendChild(content);
        popupAccordionContainer.appendChild(accordionItem);
    });
}

// Close Popup
function closeProjectPopup() {
    if (!projectPopup) return;
    projectPopup.classList.remove('active');
    document.body.style.overflow = '';
}

// ESC key to close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (projectPopup && projectPopup.classList.contains('active')) {
            closeProjectPopup();
        } else if (modal.classList.contains('active')) {
            closeModal();
        }
    }
});

/* ======================== */
/* 6. INITIALIZE */
/* ======================== */
setupMainNavListeners();

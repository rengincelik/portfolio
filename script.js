// ========================================
// GLOBAL VARIABLES & ELEMENTS
// ========================================
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const sliderWrapper = document.getElementById('slider-wrapper');
const header = document.querySelector('.nav-header');
const sections = document.querySelectorAll('.slide-section');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const navLinksDiv = header.querySelector('.nav-links');
const accordionHeaders = document.querySelectorAll('.accordion-header');
const accordionItems = document.querySelectorAll('.accordion-item');

// ========================================
// PROJECT DATA
// ========================================
const projectData = {
    'gpu-instancing': {
        title: 'GPU Instancing & Rendering',
        image: '',
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
                video: 'https://raw.githubusercontent.com/rengincelik/GPU_Rendering/main/GPU_Instancing/Recordings/3D_CPU.webm'
            },
            'gpu-sprite': {
                name: 'GPU Sprite Instancing',
                description: 'Advanced 2D sprite instancing with dynamic addition, spherical culling, and frustum culling for massive sprite rendering.',
                tech: ['Atomic Operations', 'Frustum Culling', 'DrawMeshInstancedIndirect'],
                github: 'https://github.com/rengincelik/GPU_Rendering',
                package: 'https://github.com/rengincelik/GPU_Rendering/blob/main/GPU_Sprite_Demo.unitypackage',
                video: 'https://raw.githubusercontent.com/rengincelik/GPU_Rendering/main/GPU_Instancing/Recordings/Eraser.webm'
            },
            'grass': {
                name: 'GPU Grass Rendering',
                description: 'High-performance grass rendering system using GPU instancing and compute shaders for realistic vegetation.',
                tech: ['ProBuilder', 'Gradient Coloring', 'Procedural Generation'],
                github: 'https://github.com/rengincelik/GPU_Rendering',
                package: 'https://github.com/rengincelik/GPU_Rendering/blob/main/Grass_Leaf.unitypackage',
                video: 'https://raw.githubusercontent.com/rengincelik/GPU_Rendering/main/GPU_Instancing/Recordings/Grass.webm'
            },
            'random-spawn': {
                name: 'Random Spawn System',
                description: 'GPU-accelerated random object spawning system with customizable area bounds and instance counts.',
                tech: ['Compute Shader', 'Random Generation', 'Bounded Area'],
                github: 'https://github.com/rengincelik/GPU_Rendering',
                package: 'https://github.com/rengincelik/GPU_Rendering/blob/main/3D_RandomSpawn.unitypackage',
                video: 'https://raw.githubusercontent.com/rengincelik/GPU_Rendering/main/GPU_Instancing/Recordings/Random.webm'
            },
            'scaling': {
                name: 'Simple Scaling System',
                description: 'Grid-based instance placement system with real-time scaling control and color management.',
                tech: ['Grid System', 'Real-time Scaling', 'URP Lighting'],
                github: 'https://github.com/rengincelik/GPU_Rendering',
                package: 'https://github.com/rengincelik/GPU_Rendering/blob/main/3D_ScalingItems.unitypackage',
                video: 'https://raw.githubusercontent.com/rengincelik/GPU_Rendering/main/GPU_Instancing/Recordings/Scale.webm'
            }
        }
    },
    'shader-library': {
        title: 'Unity Shader Library',
        image: '',
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
            'lit-surface': {
                name: 'Advanced Surface Shader',
                description: 'Highly configurable surface shader with metallic, glossy, roughness, and matte modes.',
                tech: ['Multi-Mode', 'Procedural Roughness', 'Shadow Integration'],
                github: 'https://github.com/rengincelik/Shaders',
                video: 'https://raw.githubusercontent.com/rengincelik/Shaders/main/ShaderSamples/Recordings/BasicLit_AdvancedSurface.png'
            },
            'water': {
                name: 'Water Surface Shader',
                description: 'Dynamic water surface with vertex displacement, procedural waves, and depth-based coloring.',
                tech: ['Vertex Displacement', 'Wave Simulation', 'Normal Calculation'],
                github: 'https://github.com/rengincelik/Shaders',
                video: 'https://raw.githubusercontent.com/rengincelik/Shaders/main/ShaderSamples/Recordings/WaterSurface.png'
            }
        }
    },
    'mini-dev-kit': {
        title: 'Mini Dev Kit',
        image: '',
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
                video: ''
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
        image: '',
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
                video: ''
            }
        }
    }
};

// ========================================
// THEME TOGGLE
// ========================================
function toggleTheme() {
    body.classList.toggle('dark-mode');
    themeToggle.textContent = body.classList.contains('dark-mode') ? '🌙' : '☀️';
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark-mode' : '');
}

// Load saved theme
if (localStorage.getItem('theme') === 'dark-mode') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '🌙';
} else {
    body.classList.remove('dark-mode');
    themeToggle.textContent = '☀️';
}
themeToggle.addEventListener('click', toggleTheme);

// ========================================
// SLIDER NAVIGATION
// ========================================
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

// ========================================
// ACCORDION (About Section)
// ========================================
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

// ========================================
// PROJECT CARDS - CAROUSEL & EXPANSION
// ========================================

// Render all project cards dynamically
function renderProjectCards() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = '';

    Object.entries(projectData).forEach(([projectId, project]) => {
        const card = createProjectCard(projectId, project);
        container.appendChild(card);
    });
}

// Create individual project card with carousel
function createProjectCard(projectId, project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-project', projectId);

    // Collect all sub-project media
    const mediaItems = [];
    if (project.subProjects) {
        Object.entries(project.subProjects).forEach(([subId, subProject]) => {
            if (subProject.video) {
                mediaItems.push({
                    id: subId,
                    url: subProject.video,
                    name: subProject.name
                });
            }
        });
    }

    // Create carousel HTML
    let carouselHTML = '';
    if (mediaItems.length > 0) {
        carouselHTML = `
            <div class="project-carousel">
                <div class="carousel-container">
                    ${mediaItems.map((item, index) => {
                        const isVideo = item.url.endsWith('.mp4') || item.url.endsWith('.webm');
                        return `
                            <div class="carousel-slide ${index === 0 ? 'active' : ''}" data-sub-id="${item.id}">
                                ${isVideo
                                    ? `<video src="${item.url}" muted loop playsinline></video>`
                                    : `<img src="${item.url}" alt="${item.name}" />`
                                }
                                <div class="carousel-caption">${item.name}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
                ${mediaItems.length > 1 ? `
                    <button class="carousel-prev">‹</button>
                    <button class="carousel-next">›</button>
                    <div class="carousel-indicators">
                        ${mediaItems.map((_, index) =>
                            `<span class="indicator ${index === 0 ? 'active' : ''}" data-index="${index}"></span>`
                        ).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }

    card.innerHTML = `
        ${carouselHTML}
        <div class="project-card-content">
            <h3 class="project-name">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech-tags">
                ${project.technologies.map(tech =>
                    `<span class="tech-tag-mini">${tech}</span>`
                ).join('')}
            </div>
            <div class="project-meta">
                <span class="sub-count">${Object.keys(project.subProjects || {}).length} Projects</span>
                <span class="expand-hint">Click to expand ↓</span>
            </div>
        </div>
    `;

    // Setup carousel controls
    setupCarousel(card);

    // Card click to expand
    card.addEventListener('click', (e) => {
        // Don't expand if clicking carousel controls
        if (e.target.closest('.carousel-prev, .carousel-next, .indicator')) {
            return;
        }
        toggleProjectExpansion(projectId, card);
    });

    return card;
}

// Setup carousel functionality
function setupCarousel(card) {
    const slides = card.querySelectorAll('.carousel-slide');
    const prevBtn = card.querySelector('.carousel-prev');
    const nextBtn = card.querySelector('.carousel-next');
    const indicators = card.querySelectorAll('.indicator');

    if (slides.length <= 1) return;

    let currentIndex = 0;
    let autoplayInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            const video = slide.querySelector('video');
            if (video) {
                if (i === index) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            }
        });
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }

    function nextSlide() {
        showSlide((currentIndex + 1) % slides.length);
    }

    function prevSlide() {
        showSlide((currentIndex - 1 + slides.length) % slides.length);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevSlide();
            resetAutoplay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextSlide();
            resetAutoplay();
        });
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => {
            e.stopPropagation();
            showSlide(index);
            resetAutoplay();
        });
    });

    // Auto-play
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 3000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Start autoplay and play first video
    startAutoplay();
    const firstVideo = slides[0].querySelector('video');
    if (firstVideo) {
        firstVideo.play().catch(() => {});
    }

    // Pause on hover
    card.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    card.addEventListener('mouseleave', () => {
        startAutoplay();
    });
}

// Toggle project expansion
function toggleProjectExpansion(projectId, card) {
    const container = document.getElementById('projects-container');
    const isExpanded = card.classList.contains('expanded');

    // Close all other expanded cards
    document.querySelectorAll('.project-card.expanded').forEach(c => {
        if (c !== card) {
            c.classList.remove('expanded');
            const details = c.querySelector('.project-details');
            if (details) details.remove();
        }
    });

    if (isExpanded) {
        card.classList.remove('expanded');
        const details = card.querySelector('.project-details');
        if (details) details.remove();

        // Remove details view mode
        container.classList.remove('details-view');
    } else {
        card.classList.add('expanded');
        const details = createProjectDetails(projectId);
        card.appendChild(details);

        // Enable details view mode (hide other cards)
        container.classList.add('details-view');

        // Scroll to top
        setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}
// Create expanded project details
function createProjectDetails(projectId) {
    const project = projectData[projectId];
    const details = document.createElement('div');
    details.className = 'project-details';

    let subProjectsHTML = '';
    if (project.subProjects) {
        Object.entries(project.subProjects).forEach(([subId, subProject]) => {
            const isVideo = subProject.video && (subProject.video.endsWith('.mp4') || subProject.video.endsWith('.webm'));

            subProjectsHTML += `
                <div class="sub-project-item">
                    ${subProject.video ? `
                        <div class="sub-project-media">
                            ${isVideo
                                ? `<video src="${subProject.video}" muted loop playsinline autoplay></video>`
                                : `<img src="${subProject.video}" alt="${subProject.name}" />`
                            }
                        </div>
                    ` : ''}
                    <div class="sub-project-info">
                        <h4>${subProject.name}</h4>
                        <p>${subProject.description}</p>
                        <div class="sub-tech-tags">
                            ${subProject.tech.map(tech =>
                                `<span class="tech-tag-small">${tech}</span>`
                            ).join('')}
                        </div>
                        <div class="sub-project-links">
                            ${subProject.github ? `<a href="${subProject.github}" target="_blank" class="sub-link"><i class="fab fa-github"></i> GitHub</a>` : ''}
                            ${subProject.package ? `<a href="${subProject.package}" target="_blank" class="sub-link"><i class="fas fa-download"></i> Package</a>` : ''}
                            ${subProject.demo ? `<a href="${subProject.demo}" target="_blank" class="sub-link"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
                            ${subProject.readme ? `<a href="${subProject.readme}" target="_blank" class="sub-link"><i class="fas fa-book"></i> README</a>` : ''}
                        </div>
                    </div>
                </div>
            `;
        });
    }

    details.innerHTML = `
        <button class="back-to-projects">
            <i class="fas fa-arrow-left"></i>
            Back to Projects
        </button>
        <div class="details-header">
            <h3>All Projects in ${project.title}</h3>
            <button class="details-close">✕</button>
        </div>
        <div class="sub-projects-grid">
            <div class="sub-projects-wrapper">
                ${subProjectsHTML}
            </div>
        </div>
    `;

        // Back button
    const backBtn = details.querySelector('.back-to-projects');
    backBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = details.closest('.project-card');
        toggleProjectExpansion(projectId, card);
    });

    // Close button
    const closeBtn = details.querySelector('.details-close');
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = details.closest('.project-card');
        toggleProjectExpansion(projectId, card);
    });



    return details;
}

// ========================================
// INITIALIZE
// ========================================
setupMainNavListeners();
renderProjectCards();


// scripts.js
const categories = [
    { 
        name: 'nature', 
        display: 'Naturaleza', 
        folder: 'nature', 
        count: 40,
        prefix: 'nature'  // Nuevo campo para prefijo de archivo
    },
    { 
        name: 'urban', 
        display: 'Urbano', 
        folder: 'urban', 
        count: 19,
        prefix: 'urban'
    },
    { 
        name: 'portraits', 
        display: 'Retratos', 
        folder: 'portraits', 
        count: 0,
        prefix: 'portraits'
    },
    { 
        name: 'hospital, 
        display: 'Hospital, 
        folder: 'lab', 
        count: 10,
        prefix: 'lab'
    }
];

let photos = [];
let currentFilteredPhotos = [];
let currentPhotoIndex = 0;


function generatePhotos() {
    categories.forEach(category => {
        for (let i = 1; i <= category.count; i++) {
            photos.push({
                id: `${category.name}-${i}`,
                category: category.name,
                // URL corregida con estructura de carpetas y prefijo
                url: `assets/photos/${category.folder}/${category.prefix}${i}.jpg`
            });
        }
    });
}

function initGallery() {
    generatePhotos();
    currentFilteredPhotos = [...photos];
    renderGallery();
    preloadImages();
    generateFilterButtons(); // Nueva función para crear botones
}

function generateFilterButtons() {
    const container = document.querySelector('.filter-buttons');
    let buttons = '<button class="filter-btn active" data-category="all">Todas</button>';
    
    categories.forEach(category => {
        buttons += `
            <button class="filter-btn" 
                     data-category="${category.name}"
                     data-display="${category.display}">
                ${category.display}
            </button>
        `;
    });
    
    container.innerHTML = buttons;
    addFilterListeners();
}

function addFilterListeners() {
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            button.classList.add('active');
            const category = button.dataset.category;
            
            currentFilteredPhotos = category === 'all' 
                ? [...photos] 
                : photos.filter(photo => photo.category === category);
            
            renderGallery();
        });
    });
}

// Resto del código se mantiene igual...
function preloadImages() {
    photos.forEach(photo => {
        new Image().src = photo.url;
    });
}

function renderGallery() {
    const grid = document.getElementById('photoGrid');
    grid.innerHTML = currentFilteredPhotos.map(photo => `
        <div class="photo-item" data-category="${photo.category}" 
             onclick="openLightbox('${photo.url}')">
            <img src="${photo.url}" alt="${photo.category} ${photo.id.split('-')[1]}">
        </div>
    `).join('');
}

function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    
    currentPhotoIndex = currentFilteredPhotos.findIndex(photo => photo.url === imgSrc);
    lightboxImg.src = imgSrc;
    updatePhotoCounter();
    lightbox.classList.remove('hidden');
}

function updatePhotoCounter() {
    document.querySelector('.photo-counter').textContent = 
        `${currentPhotoIndex + 1} / ${currentFilteredPhotos.length}`;
}

function closeLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
}

function navigatePhotos(direction) {
    currentPhotoIndex = (currentPhotoIndex + direction + currentFilteredPhotos.length) % currentFilteredPhotos.length;
    const lightboxImg = document.querySelector('.lightbox-img');
    
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
        lightboxImg.src = currentFilteredPhotos[currentPhotoIndex].url;
        lightboxImg.style.opacity = 1;
        updatePhotoCounter();
    }, 300);
}

// Event listeners
document.querySelector('.next-btn').addEventListener('click', () => navigatePhotos(1));
document.querySelector('.prev-btn').addEventListener('click', () => navigatePhotos(-1));
document.querySelector('.close-btn').addEventListener('click', closeLightbox);
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === document.getElementById('lightbox')) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (document.getElementById('lightbox').classList.contains('hidden')) return;
    
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowRight':
            navigatePhotos(1);
            break;
        case 'ArrowLeft':
            navigatePhotos(-1);
            break;
    }
});

function showGallery() {
    document.getElementById('gallery').classList.remove('hidden');
    window.scrollTo({
        top: document.getElementById('gallery').offsetTop - 100,
        behavior: 'smooth'
    });
}

// Iniciar
document.addEventListener('DOMContentLoaded', initGallery);
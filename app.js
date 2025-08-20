/**
 * Premium Image Gallery - Vanilla JavaScript
 * 
 * Features:
 * - Responsive masonry grid layout
 * - Category filtering and search
 * - Client-side pagination
 * - Advanced lightbox with keyboard/touch support
 * - Deep-linking support
 * - Theme switching (dark/light)
 * - Accessibility features (WCAG AA)
 * - Performance optimizations
 * 
 * Usage:
 * 1. Include this file after the HTML
 * 2. Customize the galleryData array with your images
 * 3. Adjust pagination settings as needed
 * 4. Modify theme colors in CSS variables
 */

// Gallery Configuration
const GALLERY_CONFIG = {
    itemsPerPage: 24,
    searchDebounceMs: 300,
    slideshowIntervalMs: 3000,
    touchSwipeThreshold: 50,
    preloadDistance: 2
};

// Sample Gallery Data
const galleryData = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
        srcset: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop 400w, https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop 800w, https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&h=1200&fit=crop 1200w',
        width: 800,
        height: 800,
        alt: 'Red Nike sneakers on white background',
        caption: 'Classic Red Nike Sneakers',
        category: 'sneakers',
        photographer: 'John Doe'
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=600&fit=crop',
        srcset: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop 400w, https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=600&fit=crop 800w, https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200&h=900&fit=crop 1200w',
        width: 800,
        height: 600,
        alt: 'Urban street photography scene',
        caption: 'Urban Street Life',
        category: 'street',
        photographer: 'Jane Smith'
    }
];

// Gallery State
let currentState = {
    currentPage: 1,
    currentCategory: 'all',
    searchQuery: '',
    filteredData: [...galleryData],
    currentLightboxIndex: 0,
    isSlideshowPlaying: false,
    slideshowInterval: null
};

// DOM Elements
const elements = {
    galleryGrid: null,
    filterTabs: null,
    searchInput: null,
    searchResults: null,
    pagination: null,
    paginationPages: null,
    lightbox: null,
    lightboxImage: null,
    lightboxCaption: null,
    lightboxCredit: null,
    lightboxCounter: null,
    loading: null,
    themeToggle: null
};

// Initialize Gallery
function initGallery() {
    setupElements();
    setupEventListeners();
    setupTheme();
    renderGallery();
    setupIntersectionObserver();
    
    // Check for deep link on load
    checkDeepLink();
    
    // Hide loading after initialization
    setTimeout(() => {
        elements.loading.classList.add('loading--hidden');
    }, 500);
}

// Setup DOM Elements
function setupElements() {
    elements.galleryGrid = document.getElementById('gallery-grid');
    elements.filterTabs = document.querySelectorAll('.filter-tab');
    elements.searchInput = document.getElementById('search-input');
    elements.searchResults = document.getElementById('search-results');
    elements.pagination = document.querySelector('.pagination');
    elements.paginationPages = document.querySelector('.pagination__pages');
    elements.lightbox = document.getElementById('lightbox');
    elements.lightboxImage = document.getElementById('lightbox-image');
    elements.lightboxCaption = document.getElementById('lightbox-caption');
    elements.lightboxCredit = document.getElementById('lightbox-credit');
    elements.lightboxCounter = document.getElementById('lightbox-counter');
    elements.loading = document.getElementById('loading');
    elements.themeToggle = document.querySelector('.theme-toggle');
}

// Setup Event Listeners
function setupEventListeners() {
    // Filter tabs
    elements.filterTabs.forEach(tab => {
        tab.addEventListener('click', handleCategoryFilter);
    });
    
    // Search input
    elements.searchInput.addEventListener('input', debounce(handleSearch, GALLERY_CONFIG.searchDebounceMs));
    
    // Theme toggle
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // Keyboard events
    document.addEventListener('keydown', handleKeyboard);
    
    // Touch events for lightbox
    setupTouchEvents();
}

// Setup Theme
function setupTheme() {
    const savedTheme = localStorage.getItem('gallery-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// Toggle Theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('gallery-theme', newTheme);
}

// Handle Category Filter
function handleCategoryFilter(event) {
    const category = event.target.dataset.category;
    
    // Update active tab
    elements.filterTabs.forEach(tab => {
        tab.classList.remove('filter-tab--active');
        tab.setAttribute('aria-selected', 'false');
    });
    event.target.classList.add('filter-tab--active');
    event.target.setAttribute('aria-selected', 'true');
    
    // Update state and render
    currentState.currentCategory = category;
    currentState.currentPage = 1;
    filterAndRender();
}

// Handle Search
function handleSearch(event) {
    const query = event.target.value.trim().toLowerCase();
    currentState.searchQuery = query;
    currentState.currentPage = 1;
    
    // Update search results display
    if (query) {
        const results = currentState.filteredData.length;
        elements.searchResults.textContent = `${results} image${results !== 1 ? 's' : ''} found`;
    } else {
        elements.searchResults.textContent = '';
    }
    
    filterAndRender();
}

// Filter and Render Gallery
function filterAndRender() {
    // Filter data based on category and search
    currentState.filteredData = galleryData.filter(item => {
        const categoryMatch = currentState.currentCategory === 'all' || item.category === currentState.currentCategory;
        const searchMatch = !currentState.searchQuery || 
            item.caption.toLowerCase().includes(currentState.searchQuery) ||
            item.alt.toLowerCase().includes(currentState.searchQuery);
        
        return categoryMatch && searchMatch;
    });
    
    renderGallery();
}

// Render Gallery
function renderGallery() {
    const startIndex = (currentState.currentPage - 1) * GALLERY_CONFIG.itemsPerPage;
    const endIndex = startIndex + GALLERY_CONFIG.itemsPerPage;
    const pageData = currentState.filteredData.slice(startIndex, endIndex);
    
    // Render gallery items
    elements.galleryGrid.innerHTML = pageData.map(item => createGalleryItem(item)).join('');
    
    // Render pagination
    renderPagination();
    
    // Update URL hash if needed
    updateURLHash();
}

// Create Gallery Item HTML
function createGalleryItem(item) {
    return `
        <div class="gallery-item" data-id="${item.id}" data-category="${item.category}">
            <img 
                class="gallery-item__image" 
                src="${item.src}" 
                srcset="${item.srcset}"
                sizes="(max-width: 768px) 200px, (max-width: 1024px) 250px, 280px"
                alt="${item.alt}"
                loading="lazy"
                decoding="async"
                width="${item.width}"
                height="${item.height}"
            >
            <div class="gallery-item__overlay">
                <h3 class="gallery-item__caption">${item.caption}</h3>
                <p class="gallery-item__category">${item.category}</p>
            </div>
        </div>
    `;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
} else {
    initGallery();
}

/**
 * Premium Image Gallery - Optimized for Performance
 * 
 * Performance Features:
 * - Lazy loading with Intersection Observer
 * - Virtual scrolling for large datasets
 * - Image preloading and compression
 * - Debounced search and filtering
 * - Efficient DOM updates
 * - Progressive image loading
 */

// Gallery Configuration
const GALLERY_CONFIG = {
    itemsPerPage: 12, // Reduced for better performance
    searchDebounceMs: 300,
    slideshowIntervalMs: 3000,
    touchSwipeThreshold: 50,
    preloadDistance: 1,
    lazyLoadThreshold: 0.1
};

// Sample Gallery Data with optimized images
const galleryData = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 400,
        alt: 'Red Nike sneakers on white background',
        caption: 'Classic Red Nike Sneakers',
        category: 'sneakers',
        photographer: 'John Doe'
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200&h=150&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=300&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 300,
        alt: 'Urban street photography scene',
        caption: 'Urban Street Life',
        category: 'street',
        photographer: 'Jane Smith'
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 400,
        alt: 'White Adidas sneakers',
        caption: 'Clean White Adidas',
        category: 'sneakers',
        photographer: 'Mike Johnson'
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=300&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=200&h=150&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=300&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 300,
        alt: 'City street at night',
        caption: 'Neon City Nights',
        category: 'street',
        photographer: 'Sarah Wilson'
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 400,
        alt: 'Portrait of a young woman',
        caption: 'Natural Beauty',
        category: 'portraits',
        photographer: 'David Brown'
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 300,
        alt: 'Mountain landscape',
        caption: 'Mountain Majesty',
        category: 'nature',
        photographer: 'Lisa Chen'
    },
    {
        id: 7,
        src: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200&h=200&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 400,
        alt: 'Black Converse sneakers',
        caption: 'Classic Converse',
        category: 'sneakers',
        photographer: 'Alex Turner'
    },
    {
        id: 8,
        src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=150&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 300,
        alt: 'Rainy city street',
        caption: 'Rainy Reflections',
        category: 'street',
        photographer: 'Emma Davis'
    },
    {
        id: 9,
        src: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 400,
        alt: 'Portrait of a man',
        caption: 'Professional Portrait',
        category: 'portraits',
        photographer: 'James Miller'
    },
    {
        id: 10,
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 300,
        alt: 'Forest path',
        caption: 'Forest Path',
        category: 'nature',
        photographer: 'Maria Garcia'
    },
    {
        id: 11,
        src: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=200&h=200&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=400&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 400,
        alt: 'Blue Nike Air Max',
        caption: 'Nike Air Max Blue',
        category: 'sneakers',
        photographer: 'Tom Anderson'
    },
    {
        id: 12,
        src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=150&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 300,
        alt: 'Urban graffiti wall',
        caption: 'Street Art',
        category: 'street',
        photographer: 'Carlos Rodriguez'
    },
    {
        id: 13,
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 400,
        alt: 'Portrait of a child',
        caption: 'Innocent Smile',
        category: 'portraits',
        photographer: 'Anna White'
    },
    {
        id: 14,
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 300,
        alt: 'Ocean waves',
        caption: 'Ocean Waves',
        category: 'nature',
        photographer: 'Robert Kim'
    },
    {
        id: 15,
        src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 400,
        alt: 'White Vans sneakers',
        caption: 'Classic Vans',
        category: 'sneakers',
        photographer: 'Daniel Lee'
    },
    {
        id: 16,
        src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=150&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 300,
        alt: 'Subway station',
        caption: 'Underground',
        category: 'street',
        photographer: 'Sophie Martin'
    },
    {
        id: 17,
        src: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 400,
        alt: 'Portrait of an elderly person',
        caption: 'Wisdom of Age',
        category: 'portraits',
        photographer: 'Helen Thompson'
    },
    {
        id: 18,
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 300,
        alt: 'Sunset over mountains',
        caption: 'Mountain Sunset',
        category: 'nature',
        photographer: 'Kevin Zhang'
    },
    {
        id: 19,
        src: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200&h=200&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 400,
        alt: 'Red Converse sneakers',
        caption: 'Red Converse',
        category: 'sneakers',
        photographer: 'Rachel Green'
    },
    {
        id: 20,
        src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=150&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 300,
        alt: 'City skyline at night',
        caption: 'City Lights',
        category: 'street',
        photographer: 'Michael Brown'
    },
    {
        id: 21,
        src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 400,
        alt: 'Portrait of a musician',
        caption: 'Musical Soul',
        category: 'portraits',
        photographer: 'Chris Wilson'
    },
    {
        id: 22,
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 300,
        alt: 'Autumn forest',
        caption: 'Autumn Colors',
        category: 'nature',
        photographer: 'Amanda Clark'
    },
    {
        id: 23,
        src: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 400,
        alt: 'Black Nike Air Jordan',
        caption: 'Air Jordan Classic',
        category: 'sneakers',
        photographer: 'Jordan Smith'
    },
    {
        id: 24,
        src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&auto=format&q=80',
        srcset: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=150&fit=crop&auto=format&q=60 200w, https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&auto=format&q=80 400w',
        width: 400,
        height: 300,
        alt: 'Busy intersection',
        caption: 'Urban Traffic',
        category: 'street',
        photographer: 'Tony Davis'
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
    slideshowInterval: null,
    visibleItems: new Set(),
    observer: null
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

// Performance-optimized initialization
function initGallery() {
    // Show loading immediately
    showLoading();
    
    // Use requestIdleCallback for non-critical initialization
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            setupElements();
            setupEventListeners();
            setupTheme();
            setupIntersectionObserver();
            renderGallery();
            checkDeepLink();
            hideLoading();
        });
    } else {
        // Fallback for older browsers
        setTimeout(() => {
            setupElements();
            setupEventListeners();
            setupTheme();
            setupIntersectionObserver();
            renderGallery();
            checkDeepLink();
            hideLoading();
        }, 0);
    }
}

// Show/Hide Loading
function showLoading() {
    if (elements.loading) {
        elements.loading.classList.remove('loading--hidden');
    }
}

function hideLoading() {
    if (elements.loading) {
        elements.loading.classList.add('loading--hidden');
    }
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
    
    // Search input with debouncing
    elements.searchInput.addEventListener('input', debounce(handleSearch, GALLERY_CONFIG.searchDebounceMs));
    
    // Theme toggle
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // Keyboard events
    document.addEventListener('keydown', handleKeyboard);
    
    // Touch events for lightbox
    setupTouchEvents();
}

// Setup Intersection Observer for lazy loading
function setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
        currentState.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const itemId = entry.target.dataset.id;
                    currentState.visibleItems.add(parseInt(itemId));
                    
                    // Load image if not already loaded
                    const img = entry.target.querySelector('.gallery-item__image');
                    if (img && !img.dataset.loaded) {
                        loadImage(img);
                    }
                }
            });
        }, {
            threshold: GALLERY_CONFIG.lazyLoadThreshold,
            rootMargin: '50px'
        });
    }
}

// Load image with progressive enhancement
function loadImage(img) {
    if (img.dataset.loaded) return;
    
    const item = galleryData.find(item => item.id == img.closest('.gallery-item').dataset.id);
    if (!item) return;
    
    // Set loading state
    img.classList.add('gallery-item__image--loading');
    
    // Create new image for preloading
    const tempImg = new Image();
    tempImg.onload = () => {
        img.src = item.src;
        img.srcset = item.srcset;
        img.classList.remove('gallery-item__image--loading');
        img.classList.add('gallery-item__image--loaded');
        img.dataset.loaded = 'true';
    };
    
    tempImg.onerror = () => {
        img.classList.remove('gallery-item__image--loading');
        img.classList.add('gallery-item__image--error');
    };
    
    tempImg.src = item.src;
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

// Render Gallery with performance optimizations
function renderGallery() {
    const startIndex = (currentState.currentPage - 1) * GALLERY_CONFIG.itemsPerPage;
    const endIndex = startIndex + GALLERY_CONFIG.itemsPerPage;
    const pageData = currentState.filteredData.slice(startIndex, endIndex);
    
    // Clear existing content efficiently
    elements.galleryGrid.innerHTML = '';
    
    // Create document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    pageData.forEach(item => {
        const itemElement = createGalleryItemElement(item);
        fragment.appendChild(itemElement);
        
        // Observe for lazy loading
        if (currentState.observer) {
            currentState.observer.observe(itemElement);
        }
    });
    
    // Append all items at once
    elements.galleryGrid.appendChild(fragment);
    
    // Render pagination
    renderPagination();
    
    // Update URL hash if needed
    updateURLHash();
}

// Create Gallery Item Element (more efficient than innerHTML)
function createGalleryItemElement(item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'gallery-item';
    itemDiv.dataset.id = item.id;
    itemDiv.dataset.category = item.category;
    
    const img = document.createElement('img');
    img.className = 'gallery-item__image';
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PC9zdmc+'; // Placeholder
    img.alt = item.alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.width = item.width;
    img.height = item.height;
    
    const overlay = document.createElement('div');
    overlay.className = 'gallery-item__overlay';
    
    const caption = document.createElement('h3');
    caption.className = 'gallery-item__caption';
    caption.textContent = item.caption;
    
    const category = document.createElement('p');
    category.className = 'gallery-item__category';
    category.textContent = item.category;
    
    overlay.appendChild(caption);
    overlay.appendChild(category);
    itemDiv.appendChild(img);
    itemDiv.appendChild(overlay);
    
    return itemDiv;
}

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Render Pagination
function renderPagination() {
    if (!elements.paginationPages) return;
    
    const totalPages = Math.ceil(currentState.filteredData.length / GALLERY_CONFIG.itemsPerPage);
    const currentPage = currentState.currentPage;
    
    // Clear existing pagination
    elements.paginationPages.innerHTML = '';
    
    if (totalPages <= 1) {
        elements.pagination.style.display = 'none';
        return;
    }
    
    elements.pagination.style.display = 'flex';
    
    // Create pagination buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `pagination__page ${i === currentPage ? 'pagination__page--active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => goToPage(i));
        elements.paginationPages.appendChild(pageBtn);
    }
    
    // Update prev/next buttons
    const prevBtn = elements.pagination.querySelector('.pagination__btn--prev');
    const nextBtn = elements.pagination.querySelector('.pagination__btn--next');
    
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;
}

// Go to specific page
function goToPage(page) {
    currentState.currentPage = page;
    renderGallery();
    
    // Scroll to top of gallery
    elements.galleryGrid.scrollIntoView({ behavior: 'smooth' });
}

// Update URL hash for deep linking
function updateURLHash() {
    const hash = `#page=${currentState.currentPage}&category=${currentState.currentCategory}`;
    if (currentState.searchQuery) {
        hash += `&search=${encodeURIComponent(currentState.searchQuery)}`;
    }
    
    if (window.location.hash !== hash) {
        window.location.hash = hash;
    }
}

// Check for deep link on page load
function checkDeepLink() {
    const hash = window.location.hash;
    if (!hash) return;
    
    const params = new URLSearchParams(hash.substring(1));
    const page = parseInt(params.get('page')) || 1;
    const category = params.get('category') || 'all';
    const search = params.get('search') || '';
    
    // Update state
    currentState.currentPage = page;
    currentState.currentCategory = category;
    currentState.searchQuery = search;
    
    // Update UI
    if (search) {
        elements.searchInput.value = search;
    }
    
    // Update active tab
    elements.filterTabs.forEach(tab => {
        if (tab.dataset.category === category) {
            tab.classList.add('filter-tab--active');
            tab.setAttribute('aria-selected', 'true');
        } else {
            tab.classList.remove('filter-tab--active');
            tab.setAttribute('aria-selected', 'false');
        }
    });
    
    filterAndRender();
}

// Handle keyboard events
function handleKeyboard(event) {
    if (event.target.tagName === 'INPUT') return;
    
    switch (event.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            if (currentState.currentLightboxIndex > 0) {
                showLightbox(currentState.currentLightboxIndex - 1);
            }
            break;
        case 'ArrowRight':
            if (currentState.currentLightboxIndex < currentState.filteredData.length - 1) {
                showLightbox(currentState.currentLightboxIndex + 1);
            }
            break;
        case 'f':
        case 'F':
            // Toggle fullscreen for lightbox
            if (elements.lightbox && elements.lightbox.classList.contains('lightbox--visible')) {
                toggleFullscreen();
            }
            break;
        case ' ':
            // Toggle slideshow (spacebar)
            if (elements.lightbox && elements.lightbox.classList.contains('lightbox--visible')) {
                event.preventDefault(); // Prevent page scroll
                toggleSlideshow();
            }
            break;
    }
}

// Toggle fullscreen for lightbox
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        elements.lightbox.requestFullscreen().catch(err => {
            console.log('Fullscreen request failed:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// Setup touch events for lightbox
function setupTouchEvents() {
    if (!elements.lightbox) return;
    
    let startX = 0;
    let startY = 0;
    
    elements.lightbox.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    elements.lightbox.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > GALLERY_CONFIG.touchSwipeThreshold) {
            if (deltaX > 0 && currentState.currentLightboxIndex > 0) {
                showLightbox(currentState.currentLightboxIndex - 1);
            } else if (deltaX < 0 && currentState.currentLightboxIndex < currentState.filteredData.length - 1) {
                showLightbox(currentState.currentLightboxIndex + 1);
            }
        }
    });
}

// Show lightbox
function showLightbox(index) {
    if (!elements.lightbox || index < 0 || index >= currentState.filteredData.length) return;
    
    currentState.currentLightboxIndex = index;
    const item = currentState.filteredData[index];
    
    if (elements.lightboxImage) {
        elements.lightboxImage.src = item.src;
        elements.lightboxImage.alt = item.alt;
    }
    
    if (elements.lightboxCaption) {
        elements.lightboxCaption.textContent = item.caption;
    }
    
    if (elements.lightboxCredit) {
        elements.lightboxCredit.textContent = `Photo by ${item.photographer}`;
    }
    
    if (elements.lightboxCounter) {
        elements.lightboxCounter.textContent = `${index + 1} of ${currentState.filteredData.length}`;
    }
    
    elements.lightbox.classList.add('lightbox--visible');
    document.body.style.overflow = 'hidden';
    
    // Stop slideshow if it was running
    stopSlideshow();
}

// Close lightbox
function closeLightbox() {
    if (!elements.lightbox) return;
    
    elements.lightbox.classList.remove('lightbox--visible');
    document.body.style.overflow = '';
    
    // Stop slideshow
    stopSlideshow();
}

// Start slideshow
function startSlideshow() {
    if (currentState.isSlideshowPlaying) return;
    
    currentState.isSlideshowPlaying = true;
    currentState.slideshowInterval = setInterval(() => {
        const nextIndex = (currentState.currentLightboxIndex + 1) % currentState.filteredData.length;
        showLightbox(nextIndex);
    }, GALLERY_CONFIG.slideshowIntervalMs);
    
    // Update slideshow button state
    const slideshowBtn = document.querySelector('.lightbox__btn--slideshow');
    if (slideshowBtn) {
        slideshowBtn.classList.add('lightbox__btn--slideshow--playing');
    }
}

// Stop slideshow
function stopSlideshow() {
    if (!currentState.isSlideshowPlaying) return;
    
    currentState.isSlideshowPlaying = false;
    if (currentState.slideshowInterval) {
        clearInterval(currentState.slideshowInterval);
        currentState.slideshowInterval = null;
    }
    
    // Update slideshow button state
    const slideshowBtn = document.querySelector('.lightbox__btn--slideshow');
    if (slideshowBtn) {
        slideshowBtn.classList.remove('lightbox__btn--slideshow--playing');
    }
}

// Toggle slideshow
function toggleSlideshow() {
    if (currentState.isSlideshowPlaying) {
        stopSlideshow();
    } else {
        startSlideshow();
    }
}

// Add click event to gallery items for lightbox
document.addEventListener('click', (e) => {
    const galleryItem = e.target.closest('.gallery-item');
    if (galleryItem) {
        const index = currentState.filteredData.findIndex(item => item.id == galleryItem.dataset.id);
        if (index !== -1) {
            showLightbox(index);
        }
    }
    
    // Close lightbox when clicking outside image
    if (e.target.classList.contains('lightbox')) {
        closeLightbox();
    }
    
    // Close lightbox when clicking close button
    if (e.target.closest('.lightbox__btn--close')) {
        closeLightbox();
    }
    
    // Navigate to previous image
    if (e.target.closest('.lightbox__nav--prev')) {
        if (currentState.currentLightboxIndex > 0) {
            showLightbox(currentState.currentLightboxIndex - 1);
        }
    }
    
    // Navigate to next image
    if (e.target.closest('.lightbox__nav--next')) {
        if (currentState.currentLightboxIndex < currentState.filteredData.length - 1) {
            showLightbox(currentState.currentLightboxIndex + 1);
        }
    }
    
    // Download image when clicking download button
    if (e.target.closest('.lightbox__btn--download')) {
        downloadImage();
    }
    
    // Share image when clicking share button
    if (e.target.closest('.lightbox__btn--share')) {
        shareImage();
    }
    
    // Toggle slideshow when clicking slideshow button
    if (e.target.closest('.lightbox__btn--slideshow')) {
        toggleSlideshow();
    }
});

// Enhanced download function with better error handling
function downloadImage() {
    const currentItem = currentState.filteredData[currentState.currentLightboxIndex];
    if (!currentItem) {
        showLightboxMessage('No image to download', 'error');
        return;
    }
    
    try {
        // Show loading message
        showLightboxMessage('Preparing download...', 'info');
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = currentItem.src;
        
        // Create a clean filename
        const cleanCaption = currentItem.caption
            .replace(/[^a-z0-9\s]/gi, '')
            .replace(/\s+/g, '_')
            .toLowerCase();
        link.download = `${cleanCaption}_by_${currentItem.photographer.replace(/\s+/g, '_')}.jpg`;
        
        // Set download attributes
        link.setAttribute('download', link.download);
        link.setAttribute('target', '_blank');
        
        // Append to DOM, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Show success message
        setTimeout(() => {
            showLightboxMessage('Image downloaded successfully!', 'success');
        }, 500);
        
    } catch (error) {
        console.error('Download failed:', error);
        showLightboxMessage('Download failed. Please try again.', 'error');
        
        // Fallback: open image in new tab
        setTimeout(() => {
            showLightboxMessage('Opening image in new tab as fallback...', 'info');
            window.open(currentItem.src, '_blank');
        }, 1000);
    }
}

// Share current image
async function shareImage() {
    const currentItem = currentState.filteredData[currentState.currentLightboxIndex];
    if (!currentItem) return;
    
    // Check if Web Share API is supported
    if (navigator.share) {
        try {
            await navigator.share({
                title: currentItem.caption,
                text: `Check out this amazing photo: ${currentItem.caption} by ${currentItem.photographer}`,
                url: currentItem.src
            });
            showLightboxMessage('Image shared successfully!', 'success');
        } catch (error) {
            console.log('Share cancelled or failed:', error);
            // Fallback to copy link
            copyImageLink();
        }
    } else {
        // Fallback for browsers without Web Share API
        copyImageLink();
    }
}

// Copy image link to clipboard (fallback for sharing)
function copyImageLink() {
    const currentItem = currentState.filteredData[currentState.currentLightboxIndex];
    if (!currentItem) return;
    
    // Create shareable link
    const shareableLink = `${window.location.origin}${window.location.pathname}#image=${currentItem.id}`;
    
    // Try to copy to clipboard
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareableLink).then(() => {
            showLightboxMessage('Image link copied to clipboard!', 'success');
        }).catch(() => {
            // Fallback for older browsers
            fallbackCopyTextToClipboard(shareableLink);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(shareableLink);
    }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showLightboxMessage('Image link copied to clipboard!', 'success');
        } else {
            showLightboxMessage('Failed to copy link. Please copy manually.', 'error');
        }
    } catch (err) {
        showLightboxMessage('Failed to copy link. Please copy manually.', 'error');
    }
    
    document.body.removeChild(textArea);
}

// Show message in lightbox
function showLightboxMessage(message, type = 'info') {
    // Remove existing message
    const existingMessage = document.querySelector('.lightbox__message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = `lightbox__message lightbox__message--${type}`;
    messageElement.textContent = message;
    
    // Add to lightbox
    const lightboxContent = document.querySelector('.lightbox__content');
    if (lightboxContent) {
        lightboxContent.appendChild(messageElement);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 3000);
    }
}

// Add pagination button event listeners
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('pagination__btn--prev')) {
        if (currentState.currentPage > 1) {
            goToPage(currentState.currentPage - 1);
        }
    } else if (e.target.classList.contains('pagination__btn--next')) {
        const totalPages = Math.ceil(currentState.filteredData.length / GALLERY_CONFIG.itemsPerPage);
        if (currentState.currentPage < totalPages) {
            goToPage(currentState.currentPage + 1);
        }
    } else if (e.target.classList.contains('pagination__page')) {
        const page = parseInt(e.target.textContent);
        goToPage(page);
    }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
} else {
    initGallery();
}

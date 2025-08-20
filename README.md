# 🎨 Premium Image Gallery

A sophisticated, responsive image gallery built with **vanilla HTML, CSS, and JavaScript** - no frameworks, no external libraries, just pure web technologies.

![Gallery Preview](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Framework](https://img.shields.io/badge/Framework-Vanilla%20JS-blue)
![Responsive](https://img.shields.io/badge/Responsive-Yes-orange)
![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%20AA-green)

## ✨ Features

### 🎯 **Core Functionality**
- **Responsive Grid Layout** - CSS Grid with auto-fit and masonry-style arrangement
- **Advanced Filtering** - Category-based filtering (All, Sneakers, Street, Portraits, Nature)
- **Smart Search** - Real-time search with debounced input
- **Client-side Pagination** - 24 images per page with navigation controls
- **Professional Lightbox** - Full-featured modal with keyboard/touch support

### 🎨 **Visual Design**
- **Dual Theme System** - Dark (default) with neon-yellow accents + Light theme
- **Glassmorphism Effects** - Blurred backdrops and translucent elements
- **Micro-interactions** - Hover lifts, smooth transitions, and animations
- **Responsive Breakpoints** - Optimized for 360px, 576px, 768px, 1024px, 1280px+

### 🚀 **Performance & UX**
- **Lazy Loading** - Images load as needed with IntersectionObserver
- **Image Preloading** - Adjacent images preload for smooth navigation
- **Touch Gestures** - Swipe navigation and pinch-to-zoom support
- **Keyboard Navigation** - Full keyboard support (arrows, home, end, space, esc)

### ♿ **Accessibility (WCAG AA)**
- **Semantic HTML** - Proper ARIA labels and roles
- **Focus Management** - Keyboard navigation and focus traps
- **Screen Reader Support** - Alt text, captions, and descriptions
- **Color Contrast** - AA compliance with theme switching

## 🛠️ Installation

### **Option 1: Direct Download**
1. Download all three files to a folder
2. Open `index.html` in any modern web browser

### **Option 2: Clone Repository**
```bash
git clone https://github.com/Lamarimohamed/CodeAlpha_ImageGallery.git
cd CodeAlpha_ImageGallery
# Open index.html in your browser
```

### **Option 3: Local Server (Recommended)**
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## 📁 Project Structure

```
CodeAlpha_ImageGallery/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and themes
├── app.js             # JavaScript functionality
└── README.md          # This file
```

## 🎮 Usage

### **Basic Navigation**
- **Click any image** → Opens lightbox
- **Use arrow keys** → Navigate between images
- **Press Space** → Toggle slideshow
- **Press Esc** → Close lightbox

### **Filtering & Search**
- **Category tabs** → Filter by image type
- **Search box** → Find images by caption/description
- **Pagination** → Navigate through pages

### **Lightbox Features**
- **Download button** → Save images locally
- **Share button** → Native sharing or copy link
- **Slideshow** → Auto-advance through images
- **Touch gestures** → Swipe left/right to navigate

## 🔧 Customization

### **Adding Your Images**
Edit the `galleryData` array in `app.js`:

```javascript
const galleryData = [
    {
        id: 1,
        src: 'path/to/your/image.jpg',
        srcset: 'path/to/your/image-400w.jpg 400w, path/to/your/image-800w.jpg 800w',
        width: 800,
        height: 600,
        alt: 'Description of your image',
        caption: 'Your Image Title',
        category: 'your-category',
        photographer: 'Your Name'
    }
    // Add more images...
];
```

### **Modifying Themes**
Edit CSS variables in `styles.css`:

```css
:root {
    --color-accent: #ffd700;        /* Change accent color */
    --color-bg-primary: #0a0a0a;   /* Change background */
    --color-text-primary: #ffffff;  /* Change text color */
}
```

### **Adjusting Pagination**
Modify in `app.js`:

```javascript
const GALLERY_CONFIG = {
    itemsPerPage: 24,              /* Images per page */
    searchDebounceMs: 300,         /* Search delay */
    slideshowIntervalMs: 3000,     /* Slideshow speed */
    touchSwipeThreshold: 50        /* Touch sensitivity */
};
```

## 🌐 Browser Support

- **Chrome** 80+
- **Firefox** 75+
- **Safari** 13+
- **Edge** 80+
- **Mobile browsers** (iOS Safari, Chrome Mobile)

## 📱 Responsive Design

| Breakpoint | Layout | Features |
|------------|--------|----------|
| 360px+ | Single column | Touch-optimized |
| 576px+ | Multi-column | Basic navigation |
| 768px+ | Tablet layout | Enhanced controls |
| 1024px+ | Desktop layout | Full feature set |
| 1280px+ | Large screen | Optimized spacing |

## 🚀 Performance

- **First Interactive**: < 2 seconds on mid-range mobile
- **Lazy Loading**: Images load as needed
- **Image Optimization**: Responsive srcset with proper sizing
- **CSS Containment**: Optimized rendering performance

## 🔒 Security

- **No External Dependencies** - All code is local
- **XSS Protection** - Proper HTML escaping
- **CSP Ready** - Compatible with Content Security Policy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Unsplash** for sample images
- **Feather Icons** for beautiful SVG icons
- **Modern CSS** techniques and best practices

## 📞 Support

If you have questions or need help:
- **Open an issue** on GitHub
- **Check the code comments** for implementation details
- **Review the console** for debugging information


*No frameworks, no bloat, just pure performance and elegance.* 
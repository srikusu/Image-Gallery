document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const lightbox = document.querySelector('.lightbox');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const filterButtons = document.querySelectorAll('.filter-btn');

    let currentImageIndex = 0;
    let galleryItems = []; // To store all image data

    // Sample image data (replace with your actual image paths and categories)
    const images = [
        { src: 'https://mcdn.wallpapersafari.com/medium/44/83/hK8Wk5.jpg', alt: 'Green Forest', category: 'nature' },
        { src: 'https://wallpaperaccess.com/full/882.jpg', alt: 'City at Night', category: 'cities' },
        { src: 'https://tse4.mm.bing.net/th/id/OIP.bNhSvtJ_3nib1WbwzecKHQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', alt: 'Abstract Art', category: 'abstract' },
        { src: 'https://wallpapers.com/images/hd/mountain-view-pictures-9czfrnp6w8ryad7w.jpg', alt: 'Mountain View', category: 'nature' },
        { src: 'https://cdn.contrastly.com/wp-content/uploads/urban-landscape-1.jpg', alt: 'Urban Landscape', category: 'cities' },
        { src: 'https://www.fabvoguestudio.com/cdn/shop/files/pr-pg-0-ta08267p-110-morden-digital-art-of-doted-lining-digital-printed-fabric-pure-georgette-1.jpg?v=1687254100&width=1800', alt: 'Geometric Patterns', category: 'abstract' },
        { src: 'https://wallpaperaccess.com/full/1925306.jpg', alt: 'Riverside', category: 'nature' },
        { src: 'https://cdn.britannica.com/98/94398-050-FBE19E2C/Skyscrapers-Singapore.jpg', alt: 'Skyscrapers', category: 'cities' },
        { src: 'https://tse1.mm.bing.net/th/id/OIP.sFX35U5fLZQtsI5qClK7GwHaFj?rs=1&pid=ImgDetMain&o=7&rm=3', alt: 'Colorful Swirls', category: 'abstract' },
    ];

    // Function to render images
    const renderImages = (filter = 'all') => {
        galleryGrid.innerHTML = ''; // Clear existing images
        const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);
        galleryItems = filteredImages; // Update galleryItems for lightbox navigation

        filteredImages.forEach((image, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            galleryItem.dataset.index = index; // Store original index for lightbox

            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            img.loading = 'lazy'; // Lazy load images

            const caption = document.createElement('div');
            caption.classList.add('caption');
            caption.textContent = image.alt;

            galleryItem.appendChild(img);
            galleryItem.appendChild(caption);
            galleryGrid.appendChild(galleryItem);

            galleryItem.addEventListener('click', () => openLightbox(index));
        });
    };

    // Initial render of all images
    renderImages('all');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');
            // Render images based on data-filter attribute
            renderImages(button.dataset.filter);
        });
    });

    // Lightbox functions
    const openLightbox = (index) => {
        currentImageIndex = index;
        updateLightboxContent();
        lightbox.style.display = 'flex';
        setTimeout(() => lightbox.classList.add('active'), 10); // For transition
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        setTimeout(() => lightbox.style.display = 'none', 300); // Wait for transition
    };

    const updateLightboxContent = () => {
        const image = galleryItems[currentImageIndex];
        if (image) {
            lightboxContent.src = image.src;
            lightboxContent.alt = image.alt;
            lightboxCaption.textContent = image.alt;
        }
    };

    const showNextImage = () => {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        updateLightboxContent();
    };

    const showPrevImage = () => {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightboxContent();
    };

    // Event listeners for lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);

    // Close lightbox on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
});
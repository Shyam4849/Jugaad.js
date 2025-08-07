let quotes = [];
let currentSlide = 0;
let isAutoplay = true;
let autoplayInterval;
let selectedMood = 'all';
let defaultQuotes = []; // fallback array

// Initialize the app
document.addEventListener('DOMContentLoaded', function () {
    fetchQuotes(selectedMood);
    startAutoplay();
});

// Fetch quotes from API based on mood
function fetchQuotes(mood) {
    const wrapper = document.getElementById('slideshowWrapper');
    wrapper.innerHTML = '<div class="quote-text">Loading...</div>';

    const moodKeyword = mood === 'all' ? '' : mood;
    fetch(`https://zenquotes.io/api/quotes/keyword=${moodKeyword}`)
        .then(response => response.json())
        .then(data => {
            quotes = data.map(item => ({
                text: item.q || item.quote,
                author: item.a || item.author,
                mood: moodKeyword
            }));

            if (!defaultQuotes.length) {
                defaultQuotes = [...quotes];
            }

            currentSlide = 0;
            initializeSlideshow();
        })
        .catch(error => {
            console.error('Error fetching quotes:', error);
            wrapper.innerHTML = '<div class="quote-text">Failed to load quotes.</div>';
        });
}

// Slideshow setup
function initializeSlideshow() {
    renderSlides();
    renderIndicators();
    updateSlideVisibility();
}

function renderSlides() {
    const wrapper = document.getElementById('slideshowWrapper');
    wrapper.innerHTML = '';

    quotes.forEach((quote) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.style.background = 'var(--gradient-warm)';

        slide.innerHTML = `
            <div class="slide-content">
                <div class="quote-text">"${quote.text}"</div>
                <div class="quote-author">— ${quote.author}</div>
                <div class="quote-mood">${getMoodEmoji(quote.mood)} ${quote.mood}</div>
            </div>
        `;

        wrapper.appendChild(slide);
    });
}

function getMoodEmoji(mood) {
    const emojiMap = {
        'motivated': '💪',
        'sad': '😔',
        'hopeful': '🌈',
        'encouraging': '🤝',
        'reflective': '🪞',
        'inspiring': '🌟'
    };
    return emojiMap[mood] || '😊';
}

function renderIndicators() {
    const indicatorsContainer = document.getElementById('slideIndicators');
    indicatorsContainer.innerHTML = '';

    quotes.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        indicator.onclick = () => goToSlide(index);
        indicatorsContainer.appendChild(indicator);
    });
}

function updateSlideVisibility() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });

    const activeSlide = slides[currentSlide];
    if (activeSlide) {
        const content = activeSlide.querySelector('.slide-content');
        if (content) {
            content.classList.remove('fade-slide-up');
            content.offsetHeight;
            content.classList.add('fade-slide-up');
        }
    }
}

// Slide Controls
function nextSlide() {
    currentSlide = (currentSlide + 1) % quotes.length;
    updateSlideVisibility();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + quotes.length) % quotes.length;
    updateSlideVisibility();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlideVisibility();
}

// Autoplay
function startAutoplay() {
    if (isAutoplay) {
        autoplayInterval = setInterval(nextSlide, 4000);
    }
}

function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
}

function toggleAutoplay() {
    isAutoplay = !isAutoplay;
    const button = document.getElementById('playPauseButton');
    const text = document.querySelector('.control-text');

    if (isAutoplay) {
        button.textContent = '⏸️';
        text.textContent = 'Auto-play enabled';
        startAutoplay();
    } else {
        button.textContent = '▶️';
        text.textContent = 'Auto-play disabled';
        stopAutoplay();
    }
}

// Mood Selection
document.querySelectorAll('.mood-button').forEach(button => {
    button.addEventListener('click', () => {
        const mood = button.dataset.mood;
        selectedMood = mood;

        document.querySelectorAll('.mood-button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        fetchQuotes(mood);
    });
});

// Modal
function openModal() {
    document.getElementById('modalOverlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Keyboard & Swipe Support
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') previousSlide();
    else if (event.key === 'ArrowRight') nextSlide();
    else if (event.key === ' ') {
        event.preventDefault();
        toggleAutoplay();
    } else if (event.key === 'Escape') closeModal();
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function (event) {
    touchStartX = event.changedTouches[0].screenX;
});

document.addEventListener('touchend', function (event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) nextSlide();
        else previousSlide();
    }
}

// Pause on hover
document.addEventListener('DOMContentLoaded', function () {
    const slideshowContainer = document.querySelector('.slideshow-container');

    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', stopAutoplay);
        slideshowContainer.addEventListener('mouseleave', startAutoplay);
    }
});

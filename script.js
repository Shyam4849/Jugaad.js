document.addEventListener('DOMContentLoaded', () => {
  const moodButtons = document.querySelectorAll('.mood-btn');
  const quoteOutput = document.getElementById('quote-output');
  const musicOutput = document.getElementById('music-output');

  moodButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedMood = button.dataset.mood;

      // 🚫 Clear previous content
      quoteOutput.textContent = '';
      musicOutput.innerHTML = '';

      // ✅ Fetch quote from your own mood API (replace the URL)
      fetch(`https://zenquotes.io/api/quotes/keyword=${selectedMood}`)
        .then(response => response.json())
        .then(data => {
          // ✅ Assuming the response contains { quote: "...", author: "..." }
          quoteOutput.textContent = `"${data.quote}" - ${data.author}`;
        })
        .catch(error => {
          quoteOutput.textContent = 'Failed to load quote.';
          console.error('Error fetching quote:', error);
        });

      // ✅ Fetch music recommendation (replace the URL)
      fetch(`https://your-api.com/api/music?mood=${selectedMood}`)
        .then(response => response.json())
        .then(data => {
          // ✅ Assuming the response contains a list of songs
          if (Array.isArray(data.songs)) {
            const ul = document.createElement('ul');
            data.songs.forEach(song => {
              const li = document.createElement('li');
              li.textContent = `${song.title} by ${song.artist}`;
              ul.appendChild(li);
            });
            musicOutput.appendChild(ul);
          }
        })
        .catch(error => {
          musicOutput.textContent = 'Failed to load music.';
          console.error('Error fetching music:', error);
        });
    });
  });
});














// // Default quotes data organized by mood
// const defaultQuotes = [
//     {
//         id: 1,
//         text: "The only way to do great work is to love what you do.",
//         author: "Steve Jobs",
//         mood: "motivated"
//     },
//     {
//         id: 2,
//         text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
//         author: "Winston Churchill",
//         mood: "motivated"
//     },
//     {
//         id: 3,
//         text: "Life is what happens to you while you're busy making other plans.",
//         author: "John Lennon",
//         mood: "reflective"
//     },
//     {
//         id: 4,
//         text: "The unexamined life is not worth living.",
//         author: "Socrates",
//         mood: "reflective"
//     },
//     {
//         id: 5,
//         text: "The future belongs to those who believe in the beauty of their dreams.",
//         author: "Eleanor Roosevelt",
//         mood: "hopeful"
//     },
//     {
//         id: 6,
//         text: "Tomorrow is the first day of the rest of your life.",
//         author: "Abbie Hoffman",
//         mood: "hopeful"
//     },
//     {
//         id: 7,
//         text: "It is during our darkest moments that we must focus to see the light.",
//         author: "Aristotle",
//         mood: "encouraging"
//     },
//     {
//         id: 8,
//         text: "You are stronger than you think and more capable than you imagine.",
//         author: "Unknown",
//         mood: "encouraging"
//     },
//     {
//         id: 9,
//         text: "The only impossible journey is the one you never begin.",
//         author: "Tony Robbins",
//         mood: "inspiring"
//     },
//     {
//         id: 10,
//         text: "Be yourself; everyone else is already taken.",
//         author: "Oscar Wilde",
//         mood: "inspiring"
//     }
// ];

// // Global variables
// let quotes = [...defaultQuotes];
// let currentSlide = 0;
// let isAutoplay = true;
// let autoplayInterval;
// let selectedMood = 'all';

// // Initialize the app
// document.addEventListener('DOMContentLoaded', function() {
//     initializeSlideshow();
//     startAutoplay();
// });

// // Slideshow functions
// function initializeSlideshow() {
//     renderSlides();
//     renderIndicators();
//     updateSlideVisibility();
// }

// function renderSlides() {
//     const wrapper = document.getElementById('slideshowWrapper');
//     wrapper.innerHTML = '';
    
//     quotes.forEach((quote, index) => {
//         const slide = document.createElement('div');
//         slide.className = 'slide';
//         slide.style.background = 'var(--gradient-warm)';
        
//         slide.innerHTML = `
//             <div class="slide-content">
//                 <div class="quote-text">"${quote.text}"</div>
//                 <div class="quote-author">— ${quote.author}</div>
//                 <div class="quote-mood">${getMoodEmoji(quote.mood)} ${quote.mood}</div>
//             </div>
//         `;
        
//         wrapper.appendChild(slide);
//     });
// }

// function getMoodEmoji(mood) {
//     const emojiMap = {
//         'motivated': '💪',
//         'reflective': '🤔',
//         'hopeful': '🌅',
//         'encouraging': '🌈',
//         'inspiring': '✨'
//     };
//     return emojiMap[mood] || '😊';
// }

// function renderIndicators() {
//     const indicatorsContainer = document.getElementById('slideIndicators');
//     indicatorsContainer.innerHTML = '';
    
//     quotes.forEach((_, index) => {
//         const indicator = document.createElement('div');
//         indicator.className = 'indicator';
//         indicator.onclick = () => goToSlide(index);
//         indicatorsContainer.appendChild(indicator);
//     });
// }

// function updateSlideVisibility() {
//     const slides = document.querySelectorAll('.slide');
//     const indicators = document.querySelectorAll('.indicator');
    
//     slides.forEach((slide, index) => {
//         slide.classList.toggle('active', index === currentSlide);
//     });
    
//     indicators.forEach((indicator, index) => {
//         indicator.classList.toggle('active', index === currentSlide);
//     });
    
//     // Trigger animations for slide content
//     const activeSlide = slides[currentSlide];
//     if (activeSlide) {
//         const content = activeSlide.querySelector('.slide-content');
//         if (content) {
//             // Remove animation classes
//             content.classList.remove('fade-slide-up');
//             // Force reflow
//             content.offsetHeight;
//             // Add animation classes
//             content.classList.add('fade-slide-up');
//         }
//     }
// }

// function nextSlide() {
//     currentSlide = (currentSlide + 1) % quotes.length;
//     updateSlideVisibility();
// }

// function previousSlide() {
//     currentSlide = (currentSlide - 1 + quotes.length) % quotes.length;
//     updateSlideVisibility();
// }

// function goToSlide(index) {
//     currentSlide = index;
//     updateSlideVisibility();
// }

// // Autoplay functions
// function startAutoplay() {
//     if (isAutoplay) {
//         autoplayInterval = setInterval(nextSlide, 4000);
//     }
// }

// function stopAutoplay() {
//     if (autoplayInterval) {
//         clearInterval(autoplayInterval);
//         autoplayInterval = null;
//     }
// }

// function toggleAutoplay() {
//     isAutoplay = !isAutoplay;
//     const button = document.getElementById('playPauseButton');
//     const text = document.querySelector('.control-text');
    
//     if (isAutoplay) {
//         button.textContent = '⏸️';
//         text.textContent = 'Auto-play enabled';
//         startAutoplay();
//     } else {
//         button.textContent = '▶️';
//         text.textContent = 'Auto-play disabled';
//         stopAutoplay();
//     }
// }

// // Mood selection functions
// function selectMood(mood) {
//     selectedMood = mood;
    
//     // Update active button
//     document.querySelectorAll('.mood-button').forEach(button => {
//         button.classList.remove('active');
//     });
//     document.querySelector(`[data-mood="${mood}"]`).classList.add('active');
    
//     // Filter quotes based on mood
//     if (mood === 'all') {
//         quotes = [...defaultQuotes];
//     } else {
//         quotes = defaultQuotes.filter(quote => quote.mood === mood);
//     }
    
//     // Reset slideshow
//     currentSlide = 0;
//     initializeSlideshow();
// }

// // Modal functions
// function openModal() {
//     document.getElementById('modalOverlay').classList.add('active');
//     document.body.style.overflow = 'hidden';
// }

// function closeModal() {
//     document.getElementById('modalOverlay').classList.remove('active');
//     document.body.style.overflow = 'auto';
// }

// // Keyboard navigation
// document.addEventListener('keydown', function(event) {
//     if (event.key === 'ArrowLeft') {
//         previousSlide();
//     } else if (event.key === 'ArrowRight') {
//         nextSlide();
//     } else if (event.key === ' ') {
//         event.preventDefault();
//         toggleAutoplay();
//     } else if (event.key === 'Escape') {
//         closeModal();
//     }
// });

// // Pause autoplay on hover
// document.addEventListener('DOMContentLoaded', function() {
//     const slideshowContainer = document.querySelector('.slideshow-container');
    
//     if (slideshowContainer) {
//         slideshowContainer.addEventListener('mouseenter', function() {
//             if (isAutoplay) {
//                 stopAutoplay();
//             }
//         });
        
//         slideshowContainer.addEventListener('mouseleave', function() {
//             if (isAutoplay) {
//                 startAutoplay();
//             }
//         });
//     }
// });

// // Touch/swipe support for mobile
// let touchStartX = 0;
// let touchEndX = 0;

// document.addEventListener('touchstart', function(event) {
//     touchStartX = event.changedTouches[0].screenX;
// });

// document.addEventListener('touchend', function(event) {
//     touchEndX = event.changedTouches[0].screenX;
//     handleSwipe();
// });

// function handleSwipe() {
//     const swipeThreshold = 50;
//     const diff = touchStartX - touchEndX;
    
//     if (Math.abs(diff) > swipeThreshold) {
//         if (diff > 0) {
//             // Swipe left - next slide
//             nextSlide();
//         } else {
//             // Swipe right - previous slide
//             previousSlide();
//         }
//     }
// }





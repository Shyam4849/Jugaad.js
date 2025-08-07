<script>
  let currentIndex = 0;
  const slides = document.querySelectorAll(".slide");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      slide.style.left = (i === index) ? '0' : '100%';
    });
    slides[index].classList.add("active");
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  // Initial show
  showSlide(currentIndex);

  // Auto slide every 4 seconds
  setInterval(nextSlide, 4000);
</script>

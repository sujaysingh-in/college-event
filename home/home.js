/**
 * TS COLLEGE EVENTS - CORE JAVASCRIPT
 */

// --- 1. HERO BANNER (Top Slider) ---
let heroIndex = 0;
const heroSlides = document.querySelectorAll('.hero .slide');

function showHeroSlide(index) {
    if (heroSlides.length === 0) return;
    
    heroSlides.forEach(slide => slide.classList.remove('active'));
    
    heroIndex = index;
    if (heroIndex >= heroSlides.length) heroIndex = 0;
    if (heroIndex < 0) heroIndex = heroSlides.length - 1;
    
    heroSlides[heroIndex].classList.add('active');
}

function nextSlide() { showHeroSlide(heroIndex + 1); }
function prevSlide() { showHeroSlide(heroIndex - 1); }

// Auto-play Hero Banner
setInterval(nextSlide, 5000);


// --- 2. DUAL EVENT SLIDERS (Current & Upcoming) ---
// This tracks the position for each slider ID independently
const scrollPositions = {};

function slide(trackId, direction) {
    const track = document.getElementById(trackId);
    if (!track) return;

    // Initialize position for this slider if it doesn't exist
    if (scrollPositions[trackId] === undefined) {
        scrollPositions[trackId] = 0;
    }

    const cards = track.querySelectorAll('.event-card');
    if (cards.length === 0) return;

    // Calculate width (including gap)
    const cardWidth = cards[0].offsetWidth + 20; 
    const viewportWidth = track.parentElement.offsetWidth;
    const visibleCards = Math.floor(viewportWidth / cardWidth) || 1;
    const maxScroll = cards.length - visibleCards;

    scrollPositions[trackId] += direction;

    // Loop logic
    if (scrollPositions[trackId] > maxScroll) scrollPositions[trackId] = 0;
    if (scrollPositions[trackId] < 0) scrollPositions[trackId] = maxScroll;

    // Apply movement
    track.style.transform = `translateX(-${scrollPositions[trackId] * cardWidth}px)`;
}

// Special alias for your 'moveSlide' function calls in the Upcoming section
function moveSlide(direction) {
    slide('slider-track', direction);
}


// --- 3. 3D DRAG GALLERY ---
const dragContainer = document.getElementById('drag-container');
const spinContainer = document.querySelector('.spin-container');
const imgList = spinContainer ? spinContainer.getElementsByTagName('img') : [];

// Arrange images in a 3D circle
const radius = 240; 
for (let i = 0; i < imgList.length; i++) {
    imgList[i].style.transform = `rotateY(${i * (360 / imgList.length)}deg) translateZ(${radius}px)`;
}

// Drag functionality
let sX, sY, nX, nY, desX = 0, desY = 0, tX = 0, tY = 10;

if (dragContainer) {
    document.onpointerdown = function (e) {
        clearInterval(dragContainer.timer);
        e = e || window.event;
        sX = e.clientX;
        sY = e.clientY;

        this.onpointermove = function (e) {
            e = e || window.event;
            nX = e.clientX;
            nY = e.clientY;
            desX = nX - sX;
            desY = nY - sY;
            tX += desX * 0.1;
            tY += desY * 0.1;
            applyTransform(dragContainer);
            sX = nX;
            sY = nY;
        };

        this.onpointerup = function (e) {
            this.onpointermove = null;
        };
        return false;
    };
}

function applyTransform(obj) {
    if (tY > 180) tY = 180;
    if (tY < 0) tY = 0;
    obj.style.transform = `rotateX(${-tY}deg) rotateY(${tX}deg)`;
}
function moveSlide(gridId, direction) {
    const grid = document.getElementById(gridId);
    const card = grid.querySelector('.event-card');
    const moveAmount = card.offsetWidth + 25; // Card + Gap

    grid.scrollBy({
        left: direction * moveAmount,
        behavior: 'smooth'
    });

    // Infinity logic
    const isAtEnd = grid.scrollLeft + grid.offsetWidth >= grid.scrollWidth - 10;
    const isAtStart = grid.scrollLeft <= 10;

    if (direction === 1 && isAtEnd) {
        grid.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (direction === -1 && isAtStart) {
        grid.scrollTo({ left: grid.scrollWidth, behavior: 'smooth' });
    }
}
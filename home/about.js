// ================================
// ABOUT PROJECT PAGE JAVASCRIPT
// College Event Management System
// ================================

document.addEventListener("DOMContentLoaded", () => {

    /* --------------------------------
       IMAGE STACK AUTO ROTATION
    -------------------------------- */
    const stack = document.getElementById("imageStack");
    const cards = document.querySelectorAll(".stack-card");
    let currentIndex = 0;

    function rotateStack() {
        cards.forEach((card, index) => {
            card.style.zIndex = cards.length - index;
            card.style.transform = `translateY(${index * 8}px) scale(${1 - index * 0.03})`;
            card.style.opacity = index === 0 ? "1" : "0.9";
        });
    }

    function moveTopCard() {
        const firstCard = cards[currentIndex];
        stack.appendChild(firstCard);
        currentIndex = (currentIndex + 1) % cards.length;
        rotateStack();
    }

    rotateStack();
    setInterval(moveTopCard, 3000); // Change image every 3 seconds


    /* --------------------------------
       SIMPLE SCROLL FADE ANIMATION
       (AOS ALTERNATIVE)
    -------------------------------- */
    const animatedElements = document.querySelectorAll("[data-aos]");

    function handleScrollAnimation() {
        animatedElements.forEach(el => {
            const elementPosition = el.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;

            if (elementPosition < screenHeight - 100) {
                el.classList.add("aos-active");
            }
        });
    }

    window.addEventListener("scroll", handleScrollAnimation);
    handleScrollAnimation();


    /* --------------------------------
       MENU ACTIVE LINK HIGHLIGHT
    -------------------------------- */
    const menuLinks = document.querySelectorAll(".menu a");
    const currentPage = window.location.pathname.split("/").pop();

    menuLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active-link");
        }
    });


    /* --------------------------------
       SMOOTH SCROLL FOR INTERNAL LINKS
    -------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href"))
                .scrollIntoView({ behavior: "smooth" });
        });
    });


    /* --------------------------------
       FOOTER SOCIAL ICON HOVER EFFECT
    -------------------------------- */
    const socialIcons = document.querySelectorAll(".social-icons img");

    socialIcons.forEach(icon => {
        icon.addEventListener("mouseenter", () => {
            icon.style.transform = "scale(1.2)";
            icon.style.transition = "0.3s";
        });

        icon.addEventListener("mouseleave", () => {
            icon.style.transform = "scale(1)";
        });
    });

});

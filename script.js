const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("tampil");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll(".slide-from-left, .slide-from-right, .slide-from-bottom").forEach((el) => observer.observe(el));


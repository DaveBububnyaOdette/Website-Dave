document.addEventListener('DOMContentLoaded', function () {
    const tombolAtas = document.getElementById('tombolAtas');
    //scroll ke atas banget
    if (tombolAtas) {
        tombolAtas.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
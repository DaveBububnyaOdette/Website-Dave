//beritanya geser satu per satu (yang tampil 3, totalnya 7 berita)
const newsSlider = document.getElementById("newsSlider");
const newsTrack = document.getElementById("newsTrack");

if (newsSlider && newsTrack) {
    const JEDA = 2500;     //geser tiap 2 detik
    const DURASI = 600;    //lama animasi geser (ms)
    let berhenti = false;

    //berhenti bentar pas kursor di atas berita
    newsSlider.addEventListener("mouseenter", () => { berhenti = true; });
    newsSlider.addEventListener("mouseleave", () => { berhenti = false; });

    function geser() {
        if (berhenti || document.hidden) return;

        const lebar = newsTrack.firstElementChild.offsetWidth;

        //geser semua berita ke kiri sejauh 1 kartu
        newsTrack.style.transition = "transform " + DURASI + "ms ease";
        newsTrack.style.transform = "translateX(-" + lebar + "px)";

        //kalo udah, pindahin kartu pertama ke paling belakang, lalu reset posisi
        setTimeout(() => {
            newsTrack.style.transition = "none";
            newsTrack.appendChild(newsTrack.firstElementChild);
            newsTrack.style.transform = "translateX(0)";
        }, DURASI);
    }

    setInterval(geser, JEDA);
}

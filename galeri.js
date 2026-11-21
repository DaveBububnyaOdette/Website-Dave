//galeri popup: slide cuma di dalam grup gambar yang diklik (atas / bawah)
const modalGaleri = document.getElementById("modalGaleri");

if (modalGaleri) {
    const inner = document.getElementById("galeriInner");
    const carouselEl = document.getElementById("galeriCarousel");
    const counter = document.getElementById("galeriCounter");
    const btnFull = document.getElementById("galeriFull");
    const btnZoom = document.getElementById("galeriZoom");
    const ikonPlus = btnZoom.querySelector(".ikon-plus");
    const ikonMinus = btnZoom.querySelector(".ikon-minus");
    const linkDownload = document.getElementById("galeriDownload");
    //keyboard dimatiin di Bootstrap, panah kiri/kanan atur sendiri di bawah
    const carousel = bootstrap.Carousel.getOrCreateInstance(carouselEl, {
        interval: false, ride: false, keyboard: false
    });

    function gambarAktif() {
        return inner.querySelector(".carousel-item.active img");
    }

    function resetZoom() {
        carouselEl.classList.remove("galeri-zoomed");
        ikonPlus.classList.remove("d-none");
        ikonMinus.classList.add("d-none");
        inner.querySelectorAll("img").forEach((img) => { img.style.transformOrigin = ""; });
    }

    //apdet nomor "1 / 2" sama link download gambar
    function updateInfo() {
        const items = Array.from(inner.children);
        const posisi = items.findIndex((el) => el.classList.contains("active"));
        counter.textContent = (posisi + 1) + " / " + items.length;

        const img = gambarAktif();
        if (img) {
            const src = img.getAttribute("src");
            linkDownload.href = src;
            linkDownload.setAttribute("download", src.split("/").pop());
        }
        resetZoom();
    }

    //pas popup dibuka: isi slide dari grup gambar yang diklik
    modalGaleri.addEventListener("show.bs.modal", (e) => {
        const diklik = e.relatedTarget;
        if (!diklik) return;

        const grup = diklik.dataset.grup;
        const daftar = Array.from(document.querySelectorAll('.galeri-thumb[data-grup="' + grup + '"]'));
        const mulai = daftar.indexOf(diklik);

        inner.innerHTML = daftar.map((thumb, i) => {
            const img = thumb.querySelector("img");
            return '<div class="carousel-item' + (i === mulai ? " active" : "") + '">' +
                '<figure class="m-0 text-center">' +
                '<div class="galeri-slide"><img src="' + img.getAttribute("src") + '" alt="' + img.alt + '"></div>' +
                '<figcaption class="text-white fw-semibold mt-3">' + img.alt + '</figcaption>' +
                '</figure></div>';
        }).join("");

        updateInfo();
    });

    carouselEl.addEventListener("slid.bs.carousel", updateInfo);

    //panah keyboard
    modalGaleri.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") carousel.prev();
        if (e.key === "ArrowRight") carousel.next();
    });

    //zoom in / zoom out (tombol atau klik gambar)
    btnZoom.addEventListener("click", () => {
        const aktif = carouselEl.classList.toggle("galeri-zoomed");
        ikonPlus.classList.toggle("d-none", aktif);
        ikonMinus.classList.toggle("d-none", !aktif);
    });

    inner.addEventListener("click", (e) => {
        if (e.target.tagName === "IMG") btnZoom.click();
    });

    //pas di-zoom, titik fokus zoom ngikutin kursor
    carouselEl.addEventListener("mousemove", (e) => {
        if (!carouselEl.classList.contains("galeri-zoomed")) return;
        const img = gambarAktif();
        if (!img) return;
        const kotak = img.parentElement.getBoundingClientRect();
        const x = Math.min(Math.max((e.clientX - kotak.left) / kotak.width * 100, 0), 100);
        const y = Math.min(Math.max((e.clientY - kotak.top) / kotak.height * 100, 0), 100);
        img.style.transformOrigin = x + "% " + y + "%";
    });

    //pulskrin
    if (!document.fullscreenEnabled) {
        btnFull.classList.add("d-none");
    }

    btnFull.addEventListener("click", () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            modalGaleri.requestFullscreen().catch(() => {});
        }
    });

    modalGaleri.addEventListener("hidden.bs.modal", () => {
        if (document.fullscreenElement) document.exitFullscreen();
        resetZoom();
    });
}
//testimoni yang bisa di-drag (mouse) atau di-swipe (layar sentuh), geser satu kartu per snap
const testiDrag = document.getElementById("testiDrag");
const testiDots = document.querySelectorAll(".testi-dot");

if (testiDrag) {
    let sedangDrag = false;
    let mulaiX = 0;
    let mulaiScroll = 0;

    function maxScroll() {
        return testiDrag.scrollWidth - testiDrag.clientWidth;
    }

    //setelah drag selesai: rapikan posisi ke kartu terdekat
    function snapTerdekat() {
        const lebar = testiDrag.firstElementChild.offsetWidth;
        let target = Math.round(testiDrag.scrollLeft / lebar) * lebar;
        target = Math.min(Math.max(target, 0), maxScroll());
        testiDrag.scrollTo({ left: target, behavior: "smooth" });
    }

    testiDrag.addEventListener("pointerdown", (e) => {
        if (e.pointerType !== "mouse") return;   //layar sentuh sudah bisa swipe sendiri
        sedangDrag = true;
        mulaiX = e.clientX;
        mulaiScroll = testiDrag.scrollLeft;
        testiDrag.classList.add("dragging");
    });

    window.addEventListener("pointermove", (e) => {
        if (!sedangDrag) return;
        testiDrag.scrollLeft = mulaiScroll - (e.clientX - mulaiX);
    });

    window.addEventListener("pointerup", () => {
        if (!sedangDrag) return;
        sedangDrag = false;
        testiDrag.classList.remove("dragging");
        snapTerdekat();
    });

    //cegah gambar ikut ter-drag oleh browser
    testiDrag.addEventListener("dragstart", (e) => e.preventDefault());

    //titik indikator mengikuti posisi geser
    testiDrag.addEventListener("scroll", () => {
        if (testiDots.length < 2 || maxScroll() <= 0) return;
        const aktif = Math.round((testiDrag.scrollLeft / maxScroll()) * (testiDots.length - 1));
        testiDots.forEach((d, i) => d.classList.toggle("active", i === aktif));
    });

    //klik titik = pindah ke slide itu
    testiDots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            const target = (i / (testiDots.length - 1)) * maxScroll();
            testiDrag.scrollTo({ left: target, behavior: "smooth" });
        });
    });
}
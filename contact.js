const formKontak = document.getElementById("formKontak");
const pesanBerhasil = document.getElementById("pesanBerhasil");

if (formKontak && pesanBerhasil) {
    formKontak.addEventListener("submit", (e) => {
        e.preventDefault();
        formKontak.classList.add("was-validated");

        if (!formKontak.checkValidity()) {
            pesanBerhasil.classList.add("d-none");
            return;
        }

        // semua terisi benar: tampilkan pesan berhasil lalu kosongkan form
        pesanBerhasil.classList.remove("d-none");
        formKontak.reset();
        formKontak.classList.remove("was-validated");
    });
}
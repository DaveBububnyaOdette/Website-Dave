const modalChat = document.getElementById("modalChat");
const formChat = document.getElementById("formChat");
 
if (modalChat && formChat) {
    formChat.addEventListener("submit", (e) => {
        e.preventDefault();
        formChat.classList.add("was-validated");
        if (!formChat.checkValidity()) return;
 
        bootstrap.Modal.getInstance(modalChat).hide();
        bootstrap.Toast.getOrCreateInstance(document.getElementById("toastChat")).show();
    });
 
    modalChat.addEventListener("hidden.bs.modal", () => {
        formChat.reset();
        formChat.classList.remove("was-validated");
    });
}
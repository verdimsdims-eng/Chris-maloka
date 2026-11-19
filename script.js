document.addEventListener("DOMContentLoaded", () => {

    // Menu mobile
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("open");
            menuBtn.textContent = navMenu.classList.contains("open") ? "✕" : "☰";
        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                menuBtn.textContent = "☰";
            });
        });
    }

    // Copier l'e-mail
    const copyEmailBtn = document.getElementById("copyEmailBtn");

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener("click", async () => {
            const email = "malokachris6@gmail.com";

            try {
                await navigator.clipboard.writeText(email);
                alert("Adresse e-mail copiée !");
            } catch (error) {
                alert("E-mail : " + email);
            }
        });
    }

    // Petite animation d'apparition
    const animatedElements = document.querySelectorAll(".card, .service-item");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.12 });

    animatedElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity .6s ease, transform .6s ease";
        observer.observe(element);
    });

    const style = document.createElement("style");
    style.textContent = ".card.visible, .service-item.visible { opacity: 1 !important; transform: translateY(0) !important; }";
    document.head.appendChild(style);
});

// =========================
// FORMULAIRE RENDEZ-VOUS
// =========================

const appointmentForm = document.getElementById("appointmentForm");

if (appointmentForm) {
    appointmentForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const nom = document.getElementById("nom").value.trim();
        const telephone = document.getElementById("telephone").value.trim();
        const email = document.getElementById("email").value.trim();
        const date = document.getElementById("date").value;
        const motif = document.getElementById("motif").value.trim();

        const dateFormatee = new Date(date + "T00:00:00")
            .toLocaleDateString("fr-FR");

        const message =
`Bonjour Maître Chris Maloka,

Je souhaite prendre un rendez-vous.

Nom : ${nom}
Téléphone : ${telephone}
E-mail : ${email}
Date souhaitée : ${dateFormatee}
Motif : ${motif}`;

        try {
            await navigator.clipboard.writeText(message);

            alert(
                "Demande copiée !\n\n" +
                "Ouvre WhatsApp, ouvre la conversation avec Chris Maloka " +
                "et colle le message."
            );

        } catch (error) {
            alert(
                "Voici la demande à envoyer sur WhatsApp :\n\n" +
                message
            );
        }
    });
}
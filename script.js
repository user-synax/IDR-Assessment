/* Nav toggle */
const toggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    });
});

/* Scroll reveal */
const ro = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("visible");
                ro.unobserve(e.target);
            }
        });
    },
    { threshold: 0.1, rootMargin: "0px 0px -24px 0px" }
);
document
    .querySelectorAll(".reveal")
    .forEach((el) => ro.observe(el));

/* Form */
const form = document.getElementById("contact-form");
const successMsg = document.getElementById("form-success");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fname = form.fname.value.trim();
    const email = form.email.value.trim();
    const interest = form.interest.value;
    let valid = true;
    [form.fname, form.email, form.interest].forEach(
        (f) => (f.style.borderColor = "")
    );
    if (!fname) {
        form.fname.style.borderColor = "var(--orange)";
        valid = false;
    }
    if (!email || !email.includes("@")) {
        form.email.style.borderColor = "var(--orange)";
        valid = false;
    }
    if (!interest) {
        form.interest.style.borderColor = "var(--orange)";
        valid = false;
    }
    if (!valid) return;
    const btn = form.querySelector(".btn-submit");
    btn.textContent = "Sending…";
    btn.disabled = true;
    setTimeout(() => {
        form.reset();
        successMsg.style.display = "block";
        btn.style.display = "none";
        successMsg.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    }, 900);
});
form.querySelectorAll("input, select, textarea").forEach((el) =>
    el.addEventListener("input", () => (el.style.borderColor = ""))
);

/* Active nav */
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(
    '.nav-links a[href^="#"]'
);
window.addEventListener(
    "scroll",
    () => {
        let cur = "";
        sections.forEach((s) => {
            if (window.scrollY >= s.offsetTop - 90) cur = s.id;
        });
        navAnchors.forEach((a) => {
            a.style.color =
                a.getAttribute("href") === "#" + cur &&
                    !a.classList.contains("nav-cta")
                    ? "#fff"
                    : "";
        });
    },
    { passive: true }
);
document.addEventListener("DOMContentLoaded", function () {
	const nav = document.querySelector(".navbar");
	const navLinks = document.querySelectorAll(".nav-link");
	const currentPath = window.location.pathname;

	const theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	console.log(theme);

	nav.setAttribute("data-bs-theme", theme);
	navLinks.forEach(link => {
		if (link.getAttribute("href") === currentPath) {
			link.classList.add("active");
		}
	});
});

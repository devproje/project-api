const image = document.querySelector(".profile-image");
const born = document.getElementById("born");

image.addEventListener("click", (ev) => {
    ev.preventDefault();
    alert("Hello, World!");
});

setInterval(() => {
    const time = new Date() - new Date(1078153200);
    born.innerText = `태어난지: ${time.toLocaleString("ko-KR")}ms`;
}, 15);

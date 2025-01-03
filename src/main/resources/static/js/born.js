const born = document.getElementById("born");

setInterval(() => {
    const time = new Date() - new Date(1078153200);
    born.innerText = `태어난지: ${time.toLocaleString("ko-KR")}ms`;
}, 15);

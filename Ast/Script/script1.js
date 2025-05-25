var klkxma;

if (window.innerWidth < 768) {
    klkxma = 0.20;
} else {
    klkxma = 0.35;
}

window.addEventListener("scroll", () => {
    if (window.scrollY >= (klkxma * window.innerHeight)) {
        document.getElementById('load').style.opacity = 1;
        document.getElementById('typing').style.display = 'none';
        disableScroll();
        setTimeout(pindahKeHalamanToday, 2000);
    }

    console.log(window.scrollY);

});

function pindahKeHalamanToday() {
    window.location.href = '/today.html';
}

function disableScroll() {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
}

console.log(klkxma * window.innerHeight);
console.log(window.innerHeight);
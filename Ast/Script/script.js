const waktu = new Date();
const daftarBulan = ["Janari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

document.getElementById("head").innerHTML = `
    <div class="bg-transparent w-[20vw] md:w-[10vw] h-full flex justify-center items-center"><a href="/index.html"><img src="/Ast/Image/tag.png" class="w-[100%] md:w-[60%] m-4"></a></div>
    <div class="bg-transparent w-[73vw] md:w-[83vw] h-full flex justify-end">
        <a href="/index.html"><div class="bg-transparent w-[20%] md:w-[7%] h-full flex justify-center items-center cursor-pointer">Home</div></a>  
        <div class="bg-transparent w-[20%] md:w-[7%] h-full flex justify-center items-center cursor-pointer" onclick="alert('Segera hadir')"><span>About</span></div>  
        <div class="bg-transparent w-[20%] md:w-[7%] h-full flex justify-center items-center cursor-pointer" onclick="alert('Segera hadir')">FAQ</div>
        <div class="bg-transparent w-[20%] md:w-[7%] h-full flex justify-center items-center cursor-pointer" onclick="alert('Segera hadir')">Api's</div>  
    </div>
    <div class="bg-transparent w-[7vw] md:w-[7vw] h-full"></div>
`

if (document.getElementById('bodyToday')) {
    document.getElementById("thewaktu").textContent = `${waktu.getDate()} ${daftarBulan[waktu.getMonth()]}`;
} else if (document.getElementById('bodyTomorrow')) {
    document.getElementById("thewaktu").textContent = `${waktu.getDate() + 1} ${daftarBulan[waktu.getMonth()]} (Tomorrow)`;
} else if (document.getElementById('bodyYesterday')) {
    document.getElementById("thewaktu").textContent = `${waktu.getDate() - 1} ${daftarBulan[waktu.getMonth()]} (Yesterday)`;
} else {
    document.getElementById("thewaktu").textContent = `${waktu.getDate()} ${daftarBulan[waktu.getMonth()]}`;
}

if (document.getElementById("listkategori")) {
    document.getElementById("listkategori").innerHTML = `
        <div class="w-full flex justify-between md:block md:justify-normal">
        <div>
            <h3 class="text-[18px] text-blue-400 font-bold mt-6 mb-1">Category:</h3>
            <p id="txtcategory">
            </p>
        </div>

        <div>
            <h3 class="text-[18px] text-blue-400 font-bold mt-6 mb-1">On This Date:</h3>
            <p>
                - <span class="mb-1 cursor-pointer" onclick="goToLinkFromOnThisDate('/today.html')">Hari ini</span><br>
                - <span class="mb-1 cursor-pointer" onclick="goToLinkFromOnThisDate('/tomorrow.html')">Besok</span><br>
                - <span class="mb-1 cursor-pointer" onclick="goToLinkFromOnThisDate('/yesterday.html')">Kemarin</span><br>
                - <span id="openPicker" class="mb-1 cursor-pointer">Custom</span><br>

                <div id="dateModal" class="fixed inset-0 bg-[#011024] bg-opacity-70 items-center justify-center hidden">
                    <div class="bg-blue-400 p-6 py-7 md:py-6 rounded-lg shadow-lg space-y-4 w-[86vw] md:w-[25vw]">
                        <label for="dateInput" class="block text-white">Pilih tanggal:</label>
                        <input type="date" id="dateInput" class="border p-2 rounded w-full text-[#011024] outline-none">

                        <div class="flex justify-between space-x-2">
                            <p>&ensp;</p>
                            <p>&ensp;</p>
                            <p>&ensp;</p>
                            <p>&ensp;</p>
                            <p id="cancelBtn" class="text-white cursor-pointer hover:text-[#f4f4f4]">Batal</p>
                            <p>|</p>
                            <p id="okBtn" class="text-white cursor-pointer hover:text-[#f4f4f4]">OK</p>
                        </div>
                    </div>
                </div>
            </p>
        </div>
        </div>
    `;
}

function goToLinkFromOnThisDate(urlnya) {
    document.getElementById('load').style.opacity = 1;

    setTimeout(() => {
        window.location.href = urlnya;
    }, 1500)
}

function goToLinkFromCategory(urlnya) {
    window.location.href = urlnya;
}



const openPicker = document.getElementById("openPicker");
const dateModal = document.getElementById("dateModal");
const cancelBtn = document.getElementById("cancelBtn");
const okBtn = document.getElementById("okBtn");
const dateInput = document.getElementById("dateInput");

openPicker.addEventListener("click", () => {
    dateModal.classList.remove("hidden");
    dateModal.classList.add("flex");
});

cancelBtn.addEventListener("click", () => {
    dateModal.classList.remove("flex");
    dateModal.classList.add("hidden");
});

okBtn.addEventListener("click", () => {
    const selectedDate = dateInput.value;
    dateModal.classList.add("hidden");

    if (selectedDate) {
        var ddhari = selectedDate.split("-")[2];
        var mmbulan = selectedDate.split("-")[1];
        goToLinkFromOnThisDate(`/date.html?dd=${ddhari}&mm=${mmbulan}`)
    } else {
        alert("Silakan pilih tanggal terlebih dahulu!");
    }
});


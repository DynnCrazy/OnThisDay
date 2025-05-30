const url = 'https://datadc.netlify.app/data/onthisday/onthisday.json';
let data = {};
var loadDataFinish = false;
const params = new URLSearchParams(window.location.search);
const nameCategory = params.get("name");
const nameCategoryTitle = nameCategory.charAt(0).toUpperCase() + nameCategory.slice(1).toLowerCase();


async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

(async () => {
    data = await fetchData(url);
    data.sort((a, b) => {
        const [dayA, monthA, yearA] = a.waktu.split("-").map(Number);
        const [dayB, monthB, yearB] = b.waktu.split("-").map(Number);

        if (monthB !== monthA) {
            return monthB - monthA;
        }

        if (dayB !== dayA) {
            return dayB - dayA;
        }

        return yearB - yearA;
    });

    var theResult = '';
    var theCategory = [];
    var theCateresult = '';

    if (document.getElementById('bodyCategory')) {
        document.getElementById("thewaktu").textContent = `Category: ${nameCategoryTitle}`;
    }

    for (let u = 0; u < data.length; u++) {
        for (let c = 0; c < data[u].kategori.length; c++) {
            if (nameCategory === data[u].kategori[c]) {
                var judul_data = data[u].nama_peristiwa;
                var deskripsi_data = data[u].desc_peristiwa;
                var waktu_full = data[u].waktu;
                var tanggal = waktu_full.split("-")[0];
                var bulan = Number(waktu_full.split("-")[1]);
                var tahun = waktu_full.split("-")[2];

                var waktu_full_text = `${tanggal} ${daftarBulan[(bulan - 1)]} ${tahun}`;
                
                theResult += `
                    <div class="bg-transparent w-full h-auto flex justify-center mt-6 mb-8">
                        <div class="bg-transparent w-[20%]">                
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Several_Cartons.jpg/120px-Several_Cartons.jpg" class="w-full mt-[5px]" alt="${waktu_full}">
                        </div>
                        <div class="bg-transparent w-[80%] p-0 pl-6">
                            <div>
                                <h3 class="text-[18px] text-blue-400 font-bold mb-1">[ ${waktu_full_text} ] - ${judul_data}</h3>
                            </div>
                            <div>
                                <p class="text-[14px] md:text-[16px] text-justify [text-justify:inter-word] break-words hyphens-auto">${deskripsi_data}</p>
                            </div>
                        </div>
                    </div>
                `;
            }

            if (!theCategory.includes(data[u].kategori[c])) {
                theCategory.push(data[u].kategori[c]);
            }
        }

    }
    
    theCategory.sort();

    for (let ukt = 0; ukt < theCategory.length; ukt++) {
        var namahasil = "";

        for (let hiu = 0; hiu < theCategory[ukt].length; hiu++) {
            if (hiu == 0) {
                namahasil += theCategory[ukt][hiu].toUpperCase();
            } else {
                namahasil += theCategory[ukt][hiu].toLowerCase();
            }
        }

        theCategory[ukt] = namahasil;
    }

    for(let h = 0; h < theCategory.length; h++) {
        theCateresult += `- <span class="mb-1 cursor-pointer" onclick="goToLinkFromCategory('/category.html?name=${theCategory[h].toLowerCase()}')">${theCategory[h]}</span><br>`;
    }

    document.getElementById("txtcategory").innerHTML = theCateresult;
    

    if (theResult === '') {
        theResult += `
                <div class="bg-transparent w-full h-auto flex justify-center mt-6 mb-8">
                    <div class="bg-transparent w-[20%]">                
                    </div>
                    <div class="bg-transparent w-[80%] p-0 pl-6">
                        <div>
                            <h3 class="text-[18px] text-blue-400 font-bold mb-1">Category not found!</h3>
                        </div>
                        <div>
                            <p>Tidak ada peristiwa/kejadian yang memiliki kategori seperti "${nameCategoryTitle}". Mohon gunakan kategori yang ada dan tersedia untuk dapat melanjutkan.</p>
                        </div>
                    </div>
                </div>
            `;
    }

    document.getElementById('justtoday').innerHTML = theResult;

    loadDataFinish = true;
    finishLoadData();
})();

function finishLoadData() {
    if (nameCategory) {
        document.getElementById('load').style.opacity = 0;
    } else {
        window.location.href = "/index.html";
    }
}
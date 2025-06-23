const url = 'https://datadc.netlify.app/data/onthisday/data.json';
let data = {};
var loadDataFinish = false;
const dataWaktu = new Date();

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
    var theResult = '';
    var theCategory = [];

    var whattngl;

    if (document.getElementById('bodyToday')) {
        whattngl = 0;
    } else if (document.getElementById('bodyTomorrow')) {
        whattngl = 1;
    } else if (document.getElementById('bodyYesterday')) {
        whattngl = -1;
    } else {
        whattngl = 0;
    }

    for (i = 0; i < data.length; i++) {
        var judul_data = data[i].nama_peristiwa;
        var deskripsi_data = data[i].desc_peristiwa;
        var waktu_tanggal = data[i].waktu.split("-")[0];
        var waktu_bulan = data[i].waktu.split("-")[1];
        var waktu_tahun = data[i].waktu.split("-")[2];
        var waktu_full = data[i].waktu;
        var waktu_tahun_diketahui = true;

        if (waktu_tahun === "????") {
            waktu_tahun_diketahui = false;
        }

        if (waktu_tanggal == (dataWaktu.getDate() + whattngl) && waktu_bulan == (dataWaktu.getMonth() + 1)) {
            theResult += `
                <div class="bg-transparent w-full h-auto flex justify-center mt-6 mb-8">
                    <div class="bg-transparent w-[20%]">                
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Several_Cartons.jpg/120px-Several_Cartons.jpg" class="w-full mt-[5px]" alt="${judul_data}">
                    </div>
                    <div class="bg-transparent w-[80%] p-0 pl-6">
                        <div>
                            ${waktu_tahun_diketahui ? `<h3 class="text-[18px] text-blue-400 font-bold mb-1">[ ${waktu_tahun} ] [ ${dataWaktu.getFullYear() - waktu_tahun} Years ago ] - ${judul_data}</h3>` : `<h3 class="text-[18px] text-blue-400 font-bold mb-1">[ ${waktu_tanggal} ${daftarBulan[(Number(waktu_bulan) - 1)]} ] - ${judul_data}</h3>` }
                        </div>
                        <div>
                            <p class="text-[14px] md:text-[16px] text-justify [text-justify:inter-word] break-words hyphens-auto">${deskripsi_data}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        var theCateresult = '';

        for (let j = 0; j < data[i].kategori.length; j++) {

            if (!theCategory.includes(data[i].kategori[j]) && waktu_tanggal == (dataWaktu.getDate() + whattngl) && waktu_bulan == (dataWaktu.getMonth() + 1) ) {
                var kategoriNameResult = '';

                for (let hb = 0; hb < data[i].kategori[j].length; hb++) {

                    if (hb == 0) {
                        kategoriNameResult += data[i].kategori[j][hb].toUpperCase();
                    } else {
                        kategoriNameResult += data[i].kategori[j][hb].toLowerCase();
                    }
            
                }

                theCategory.push(kategoriNameResult);
            }
        }

        theCategory.sort();

        for (let h = 0; h < theCategory.length; h++) {
            theCateresult += `- <span class="mb-1 cursor-pointer" onclick="goToLinkFromCategory('/category.html?name=${theCategory[h].toLowerCase()}')">${theCategory[h]}</span><br>`;
        }

        document.getElementById("txtcategory").innerHTML = theCateresult;

    }

    if (theResult === '') {
        theResult += `
                <div class="bg-transparent w-full h-auto flex justify-center mt-6 mb-8">
                    <div class="bg-transparent w-[20%]">                
                    </div>
                    <div class="bg-transparent w-[80%] p-0 pl-6">
                        <div>
                            <h3 class="text-[18px] text-blue-400 font-bold mb-1">No data found!</h3>
                        </div>
                        <div>
                            <p>Tidak ada peristiwa/kejadian yang tercatat hari ini! Mungkin, kejadian yang terjadi pada tanggal hari ini akan ditambahkan di masa yang akan datang...</p>
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
    var waktuMaxBulan30 = [4, 6, 9, 11];
    var waktuMaxBulan29 = [2];
    var waktuMaxBulan31 = [1, 3, 5, 7, 8, 10, 12];

    if (document.getElementById('bodyTomorrow')) {

        if (waktuMaxBulan30.includes(Number(dataWaktu.getMonth() + 1)) && Number(dataWaktu.getDate()) == 30) {
            window.location.href = "/today.html";
        } else if (waktuMaxBulan29.includes(Number(dataWaktu.getMonth() + 1)) && Number(dataWaktu.getDate()) == 29) {
            window.location.href = "/today.html";
        } else if (waktuMaxBulan31.includes(Number(dataWaktu.getMonth() + 1)) && Number(dataWaktu.getDate()) == 31) {
            window.location.href = "/today.html";
        } else {
            document.getElementById('load').style.opacity = 0;
        }

    } else {
        document.getElementById('load').style.opacity = 0;
    }
}
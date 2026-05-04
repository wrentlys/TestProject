const DB = {
    products: [
        { id: 1, name: "Vesta Sakura", price: 150, info: "4GB RAM / 2 vCPU" },
        { id: 2, name: "Vesta Elite", price: 450, info: "16GB RAM / 4 vCPU" },
        { id: 3, name: "Vesta Titan", price: 850, info: "64GB RAM / 12 vCPU" }
    ],
    selected: null
};

// Sayfa Navigasyonu (router)
function navigate(target, el) {
    const wrapper = document.getElementById('page-wrapper');
    const title = document.getElementById('active-title');
    
    // Aktif menü vurgusu
    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
    el.classList.add('active');

    if(target === 'home') {
        title.innerText = "Yönetim Paneli";
        wrapper.innerHTML = `<div class="card"><h2>Hoş geldin, Haitee.</h2><p style="margin-top:20px; color:#888">Tüm sistemlerin durumunu buradan kontrol edebilirsin.</p></div>`;
    }

    if(target === 'domain') {
        title.innerText = "Domain Sorgulama";
        wrapper.innerHTML = `
            <div class="card" style="background:var(--glass); border:1px solid var(--border); padding:40px; border-radius:32px; text-align:center">
                <h2>Google Altyapısıyla Sorgula</h2>
                <div style="display:flex; gap:10px; margin-top:30px">
                    <input type="text" id="d-query" placeholder="istediğinad.com">
                    <button class="btn btn-pri" onclick="searchDomain()">Sorgula</button>
                </div>
                <div id="d-res" style="margin-top:20px"></div>
            </div>`;
    }

    if(target === 'shop') {
        title.innerText = "Mağaza";
        wrapper.innerHTML = `<div style="display:grid; grid-template-columns:repeat(3,1fr); gap:20px">
            ${DB.products.map(p => `
                <div class="card" style="background:var(--glass); border:1px solid var(--border); padding:30px; border-radius:28px; text-align:center">
                    <h3 style="color:var(--sakura)">${p.name}</h3>
                    <p style="margin:15px 0; font-size:14px; color:#888">${p.info}</p>
                    <h2>${p.price} TL</h2>
                    <button class="btn btn-pri" onclick="openM(${p.id})" style="width:100%; margin-top:20px">Seç</button>
                </div>
            `).join('')}
        </div>`;
    }
}

// Domain Sorgulama (Gerçekçi Asenkron Mantık)
async function searchDomain() {
    const query = document.getElementById('d-query').value.trim();
    const res = document.getElementById('d-res');
    if(!query.includes('.')) { res.innerHTML = "Lütfen geçerli bir uzantı girin!"; return; }

    res.innerHTML = "Sorgulanıyor...";
    await new Promise(r => setTimeout(r, 1000));

    const status = Math.random() > 0.4;
    res.innerHTML = status ? 
        `<span style="color:#2ecc71">✔ ${query} Müsait!</span> <button class="btn btn-pri" style="padding:8px 15px; margin-left:10px">Al</button>` : 
        `<span style="color:var(--accent)">✘ ${query} dolu.</span>`;
}

// Modal Yönetimi
function openM(id) {
    DB.selected = DB.products.find(p => p.id === id);
    document.getElementById('configOverlay').style.display = 'flex';
    recalc();
}

function closeM() { document.getElementById('configOverlay').style.display = 'none'; }

function recalc() {
    const r = parseInt(document.getElementById('m-ram').value) || 0;
    const c = parseInt(document.getElementById('m-cpu').value) || 0;
    const total = DB.selected.price + (r * 30) + (c * 60);
    document.getElementById('m-price').innerText = total;
}

// Başlangıç Sayfası
navigate('home', document.querySelector('.menu-item'));
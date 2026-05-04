const DB = {
    nodes: [
        { id: 1, name: "Sakura-1", cpu: 4, ram: 16, price: 250 },
        { id: 2, name: "Sakura-2", cpu: 8, ram: 32, price: 480 },
        { id: 3, name: "Sakura-3", cpu: 16, ram: 64, price: 890 }
    ],
    cart: []
};

function renderShop() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="search-wrapper">
            <input type="text" id="domain" placeholder="Premium domainini bul...">
            <button class="btn-main" onclick="check()">Sorgula</button>
        </div>
        ${DB.nodes.map(n => `
            <div class="node-card">
                <div class="icon"><i class="ri-instance-line"></i></div>
                <h3>${n.name}</h3>
                <p>${n.cpu} Core / ${n.ram}GB RAM</p>
                <div class="price">${n.price} TL</div>
                <button onclick="config(${n.id})">Yapılandır</button>
            </div>
        `).join('')}
    `;
}

// İlk açılış
renderShop();
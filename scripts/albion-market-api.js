document.getElementById("priceComparisonForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const itemName = document.getElementById("itemName").value;
    const enchantment = document.getElementById("enchantment").value;
    const quality = document.getElementById("quality").value;
    
    let itemFullName = itemName;
    if (enchantment) {
        itemFullName += `@${enchantment}`;
    }
    
    const endpoint = `https://west.albion-online-data.com/api/v2/stats/prices/${encodeURIComponent(itemFullName)}?locations=Caerleon,Blackmarket&qualities=${quality}`;

    const itemIcon = document.getElementById("item-photo"); // Mova a criação da imagem para fora do loop

    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            const priceTable = document.getElementById("priceTable");
            const tbody = priceTable.querySelector("tbody");
            tbody.innerHTML = "";

            for (const location in data) {
                const priceData = data[location];
                const newRow = document.createElement("tr");
                newRow.innerHTML = `
                    <img class="item-photo"/>
                    <td>${priceData.quality}</td>
                    <td>${priceData.city}</td>
                    <td>$${priceData.sell_price_min}</td>
                    <td>$${priceData.sell_price_max}</td>
                `;

                const itemPhoto = newRow.querySelector(".item-photo"); // Encontre a imagem dentro da nova linha
                itemPhoto.src = `https://render.albiononline.com/v1/item/${itemFullName}.png`;

                tbody.appendChild(newRow);
            }

            if (itemIcon) {
                itemIcon.src = `https://render.albiononline.com/v1/item/${itemFullName}.png`;
            }
        })
        .catch(error => console.error("Erro na busca de preços:", error));

    // Chamando a função para buscar os preços das runas
    buscarPrecosDasRunas();
});


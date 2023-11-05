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
                    <td>${priceData.item_id}</td>
                    <td>${priceData.quality}</td>
                    <td>${priceData.city}</td>
                    <td>$${priceData.sell_price_min}</td>
                    <td>$${priceData.sell_price_max}</td>
                `;
                tbody.appendChild(newRow);
            }
        })
        .catch(error => console.error("Erro na busca de preços:", error));

    // Chamando a função para buscar os preços das runas
    buscarPrecosDasRunas();
});


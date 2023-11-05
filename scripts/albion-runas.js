function buscarPrecosDasRunas() {
    const runes = "T4_RUNE,T5_RUNE,T6_RUNE,T7_RUNE,T8_RUNE";
    const souls = "T4_SOUL,T5_SOUL,T6_SOUL,T7_SOUL,T8_SOUL";
    const itemsName = runes + ',' + souls;
    const currentDate = new Date().toJSON().slice(0, 10);

    const runeEndpoint = `https://west.albion-online-data.com/api/v2/stats/history/${itemsName}?end_date=${currentDate}&locations=Caerleon&time-scale=6`;

    fetch(runeEndpoint)
        .then(response => response.json())
        .then(datas => {
            const runeTable = document.getElementById("runeTable");
            const tbody = runeTable.querySelector("tbody");
            tbody.innerHTML = "";
            
            for (const location in datas) {
                const runePriceData = datas[location];
                const newRow = document.createElement("tr");
                
                newRow.innerHTML = `
                    <img class="rune-photo"/>
                    <td>${runePriceData.location}</td>
                    <td>$${runePriceData.data[0].avg_price}</td>
                    <td>${runePriceData.data[0].item_count}</td>
                `;
                
                const runePhoto = newRow.querySelector(".rune-photo"); // Encontre a imagem dentro da nova linha
                runePhoto.src = `https://render.albiononline.com/v1/item/${runePriceData.item_id}.png`;

                tbody.appendChild(newRow);

                if (runePhoto) {
                    runePhoto.src = `https://render.albiononline.com/v1/item/${runePriceData.item_id}.png`;
                }
            }
        })
        .catch(error => console.error("Erro na busca de preços das runas:", error));
}

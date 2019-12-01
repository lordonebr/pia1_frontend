initHome = () => {
    loadBalance();
    loadLastHist();
}

// recupera do WS, o histórico das últimas transações do sistema
loadLastHist = () => {

    loadFromService('GET', '/transfers')
        .then(histJSON => {

            const dateTag = "date";
            const nameDonorTag = "nameSender";
            const nameReceptorTag = "nameRecipient";
            const valueTag = "value";

            /*histJSON = [
                {
                    [dateTag] : "15-11-2019 20:05",
                    [nameDonorTag] : "Alice",
                    [nameReceptorTag] : "Mariana",
                    [valueTag] : 7
                },
                {
                    [dateTag] : "15-11-2019 18:00",
                    [nameDonorTag] : "André",
                    [nameReceptorTag] : "Mariana",
                    [valueTag] : 5
                },
                {
                    [dateTag] : "15-11-2019 16:43",
                    [nameDonorTag] : "André",
                    [nameReceptorTag] : "Alice",
                    [valueTag] : 10
                },
                {
                    [dateTag] : "15-11-2019 13:57",
                    [nameDonorTag] : "Mariana",
                    [nameReceptorTag] : "André",
                    [valueTag] : 8
                }
            ]*/

            let element = document.getElementById("idLastHist");
            if(element){

                // limpa conteudo antigo
                for(let i = element.rows.length - 1; i > 0; i--)
                    element.deleteRow(i);

                // preenche com o conteudo novo vindo do WS
                for(let idx in histJSON){

                    if(histJSON[idx].hasOwnProperty(dateTag) &&
                    histJSON[idx].hasOwnProperty(nameDonorTag) &&
                    histJSON[idx].hasOwnProperty(nameReceptorTag) &&
                    histJSON[idx].hasOwnProperty(valueTag)
                    ){
                        let NewRow = element.insertRow(-1);
                        let Newcell1 = NewRow.insertCell(0); 
                        let Newcell2 = NewRow.insertCell(1);
                        let Newcell3 = NewRow.insertCell(2); 
                        let Newcell4 = NewRow.insertCell(3); 
                        Newcell1.innerHTML = histJSON[idx][dateTag]; 
                        Newcell2.innerHTML = histJSON[idx][nameDonorTag]; 
                        Newcell3.innerHTML = histJSON[idx][nameReceptorTag]; 
                        Newcell4.innerHTML = histJSON[idx][valueTag]; 
                    }
                }
            }
        })
        .catch((error) => {
            console.log("Falha ao carregar os últimos históricos: " + error);
        });
}
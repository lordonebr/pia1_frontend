initAward = () => {
    loadBalance();

    let spanTotalAwardsSel = document.getElementById("idTotalAwardsSel");
    let spanQtAwardsSel = document.getElementById("idQtAwardsSel");
    if(spanTotalAwardsSel && spanQtAwardsSel){
        spanTotalAwardsSel.textContent = 0;
        spanQtAwardsSel.textContent = 0;
    }

    loadListAwards();
}


loadListAwards = () => {

    const idAwardTag = "idAward";
    const descAwardTag = "descAwardTag";
    const costAwardTag = "costAwardTag";

    let awardsJSON = [
        {
            [idAwardTag] : 1,
            [descAwardTag] : "Uma caixa de bombom garoto",
            [costAwardTag] : 10
        },
        {
            [idAwardTag] : 2,
            [descAwardTag] : "Par de ingressos Cinema Cinemark: SÁBADO",
            [costAwardTag] : 40
        },
        {
            [idAwardTag] : 3,
            [descAwardTag] : "Voucher Outback no valor de 100 reais",
            [costAwardTag] : 70
        },
        {
            [idAwardTag] : 4,
            [descAwardTag] : "Camisa oficial seleção brasileira",
            [costAwardTag] : 100
        },
        {
            [idAwardTag] : 5,
            [descAwardTag] : "Um dia de folga no trabalho",
            [costAwardTag] : 150
        }
    ];

    let element = document.getElementById("idAwardsTable");
    if(element){

        // limpa conteudo antigo
        for(let i = element.rows.length - 1; i > 0; i--)
            element.deleteRow(i);

        // preenche com o conteudo novo vindo do WS
        for(let idx in awardsJSON){

            if(awardsJSON[idx].hasOwnProperty(idAwardTag) &&
                awardsJSON[idx].hasOwnProperty(descAwardTag) &&
                awardsJSON[idx].hasOwnProperty(costAwardTag)
            ){
                let NewRow = element.insertRow(-1);
                let Newcell1 = NewRow.insertCell(0); 
                let Newcell2 = NewRow.insertCell(1);
                let Newcell3 = NewRow.insertCell(2); 

                let newIdCbAward = constIdCbAward + idx.toString();
                Newcell1.innerHTML = '<div class="form-check"><input class="form-check-input" type="checkbox" id="' + newIdCbAward + '" ' + constDataIdAward + '="' + awardsJSON[idx][idAwardTag].toString() + '" ' + constDataCostAward + '="' + awardsJSON[idx][costAwardTag].toString() + '" ' +  'onclick="handleClickCbAward(this)"></div>';

                Newcell2.innerHTML = awardsJSON[idx][costAwardTag]; 
                Newcell3.innerHTML = awardsJSON[idx][descAwardTag]; 
            }
        }
    }
}

// efetua a ação de clique do botão do formulario de resgate
clickedGetAwards = (event) => {

    let jsonGetAwards = [];

    let count = 0;
    let findCbAward = true;
    while(findCbAward){

        let selIdCbAward = "#" + constIdCbAward + count.toString();
        let cbAward = document.querySelector(selIdCbAward);
        if(cbAward == null)
            findCbAward = false;
        else {
            let idAward = cbAward.getAttribute(constDataIdAward);
            if(cbAward.checked && idAward != null)
                jsonGetAwards.push(
                    {
                        "idAward" : idAward
                    });
        }

        count++;
    }

    if(jsonGetAwards.length){
        // CHAMA O WS PARA REALIZAR UMA TRANSAÇÃO DE RESGATE
        alert(JSON.stringify(jsonGetAwards));
    }
    else
        alert("Selecione algum prêmio para resgate!")

    event.preventDefault(); 
}

// efetua a ação de um clique em um checkbox de um prêmio para resgate
handleClickCbAward = (cb) => {

    let costAward = cb.getAttribute(constDataCostAward);
    if(costAward != null && !isNaN(costAward)){

        costAward = parseInt(costAward);
        let spanTotalAwardsSel = document.getElementById("idTotalAwardsSel");
        let spanQtAwardsSel = document.getElementById("idQtAwardsSel");
        if(spanTotalAwardsSel && spanQtAwardsSel){

            let totalAwardsSel = spanTotalAwardsSel.textContent;
            let qtAwardsSel = spanQtAwardsSel.textContent;
            if(!isNaN(totalAwardsSel) && !isNaN(qtAwardsSel)) {
                totalAwardsSel = parseInt(totalAwardsSel);
                qtAwardsSel = parseInt(qtAwardsSel);

                let spanBalanceReception = document.getElementById("idBalanceReception");
                if(spanBalanceReception){

                    if(cb.checked){
                        totalAwardsSel += costAward;
                        qtAwardsSel++;
                    }
                    else{
                        totalAwardsSel -= costAward;
                        qtAwardsSel--;
                    }

                    let balanceReception = spanBalanceReception.innerHTML;
                    if(!isNaN(balanceReception)){
                        balanceReception = parseInt(balanceReception);

                        if(totalAwardsSel <= balanceReception){
                            spanTotalAwardsSel.textContent = totalAwardsSel;
                            spanQtAwardsSel.textContent = qtAwardsSel;
                        }
                        else{

                            if(qtAwardsSel == 1)
                                alert("Atenção: você precisa de " + totalAwardsSel.toString() + " créditos para resgatar o item selecionado. Atualmente você possui apenas " + balanceReception.toString() + " créditos!");
                            else if(qtAwardsSel > 1)
                                alert("Atenção: você precisa de " + totalAwardsSel.toString() + " créditos para resgatar os items selecionados. Atualmente você possui apenas " + balanceReception.toString() + " créditos!");
                            
                            cb.checked = !cb.checked;
                        }
                    }
                }
            }
        }
    }
}
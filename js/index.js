// CONSTANTES
const constIdCbAward = "idCbAward";
const constDataIdAward = "data-id-award";
const constDataCostAward = "data-cost-award";

window.addEventListener("load", function(event) {
    loadCurrentPage();
});

// recupera do WS, o saldo para doação e o recebido
loadBalance = () => {

    let idUser = getInfoLocal(constTagStorageCurrentUserId);
    if(!isNaN(idUser)){
        idUser = parseInt(idUser);

        loadFromService('GET', `/users/${idUser}/balances`)
        .then(balanceJson => {

            const balanceDonateTag = "credit";
            const balanceReceptionTag = "receptions";
        
            /*balanceJson = {
                [balanceDonateTag] : 190,
                [balanceReceptionTag] : 160
            }*/
        
            let balanceDonate = 0;
            if(balanceJson.hasOwnProperty(balanceDonateTag))
                balanceDonate = balanceJson[balanceDonateTag];
            
            let balanceReception = 0;
            if(balanceJson.hasOwnProperty(balanceReceptionTag))
                balanceReception = balanceJson[balanceReceptionTag];
        
            setTextSpan("idBalanceDonate", balanceDonate); 
            setTextSpan("idBalanceReception", balanceReception);

            turnOnOffPage(constIdLoginOptions, true);
            setTextSpan("idUserName", getCurrentUserName());
        })
        .catch(function(error) {
            console.log("Falha ao carregar saldos");
        });
    }
}

// recupera do WS, a lista dos usuarios para doação
loadListUser = (idCbUsers) => {

    loadFromService('GET', '/users')
        .then(usersJSON => {

            const userNameTag = "name";
            const idUserTag = "id";

            /*usersJSON = [
                {
                    [userNameTag] : "Alice Vitória",
                    [idUserTag] : 1
                },
                {
                    [userNameTag] : "André Guilherme de Almeida Santos",
                    [idUserTag] : 2
                },
                {
                    [userNameTag] : "Arthur Santos",
                    [idUserTag] : 3
                },
                {
                    [userNameTag] : "Márcia Santos",
                    [idUserTag] : 4
                },
                {
                    [userNameTag] : "Mariana Deus",
                    [idUserTag] : 5
                },
                {
                    [userNameTag] : "Paulo Santos",
                    [idUserTag] : 6
                },
            ]*/

            let element = document.getElementById(idCbUsers);
            if(element){

                let idDonateUser = element.options[element.selectedIndex].value;

                // limpa conteudo antigo
                for(let i = element.options.length - 1 ; i > 0 ; i--)
                    element.remove(i);

                let setSelected = false;
            
                // preenche com o conteudo novo vindo do WS
                for(let idx in usersJSON){

                    if(usersJSON[idx].hasOwnProperty(userNameTag) &&
                    usersJSON[idx].hasOwnProperty(idUserTag) 
                    ){
                        let option = document.createElement("option");
                        option.text = usersJSON[idx][userNameTag]; 
                        option.value = usersJSON[idx][idUserTag]; 
                        if(idDonateUser != "" && usersJSON[idx][idUserTag] == idDonateUser){
                            option.selected = true;
                            setSelected = true;
                        }

                        element.appendChild(option);
                    }
                }

                if(!setSelected)
                    element.options[0].selected = true;
            }
        });
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

// recupera do WS, o histórico das transações do sistema
loadHist = (jsonFilter) => {

    // CHAMA O WS PARA OBTER O HISTÓRICO
    alert(JSON.stringify(jsonFilter));

    const dateTag = "date";
    const nameDonorTag = "nameDonor";
    const nameReceptorTag = "nameReceptor";
    const valueTag = "value";
    const descriptionTag = "description";

    let histJSON = [
        {
            [dateTag] : "15-11-2019 20:05",
            [nameDonorTag] : "Alice",
            [nameReceptorTag] : "Mariana",
            [valueTag] : 7,
            [descriptionTag] : "Me ajudou a finalizar o projeto."
        },
        {
            [dateTag] : "15-11-2019 18:00",
            [nameDonorTag] : "André",
            [nameReceptorTag] : "Mariana",
            [valueTag] : 5,
            [descriptionTag] : "Me ajudou nas consultas do banco de dados."
        },
        {
            [dateTag] : "15-11-2019 16:43",
            [nameDonorTag] : "André",
            [nameReceptorTag] : "Alice",
            [valueTag] : 10,
            [descriptionTag] : "Obrigado pela ajuda no front end."
        },
        {
            [dateTag] : "15-11-2019 13:57",
            [nameDonorTag] : "Mariana",
            [nameReceptorTag] : "André",
            [valueTag] : 8,
            [descriptionTag] : "Me auxiliou nas demandas dos projetos antigos."
        }
    ]

    let element = document.getElementById("idHist");
    if(element){

        // limpa conteudo antigo
        for(let i = element.rows.length - 1; i > 0; i--)
            element.deleteRow(i);

        // preenche com o conteudo novo vindo do WS
        for(let idx in histJSON){

            if(histJSON[idx].hasOwnProperty(dateTag) &&
               histJSON[idx].hasOwnProperty(nameDonorTag) &&
               histJSON[idx].hasOwnProperty(nameReceptorTag) &&
               histJSON[idx].hasOwnProperty(valueTag) &&
               histJSON[idx].hasOwnProperty(descriptionTag)
            ){
                let NewRow = element.insertRow(-1);
                let Newcell1 = NewRow.insertCell(0); 
                let Newcell2 = NewRow.insertCell(1);
                let Newcell3 = NewRow.insertCell(2); 
                let Newcell4 = NewRow.insertCell(3); 
                let Newcell5 = NewRow.insertCell(4); 
                Newcell1.innerHTML = histJSON[idx][dateTag]; 
                Newcell2.innerHTML = histJSON[idx][nameDonorTag]; 
                Newcell3.innerHTML = histJSON[idx][nameReceptorTag]; 
                Newcell4.innerHTML = histJSON[idx][valueTag]; 
                Newcell5.innerHTML = histJSON[idx][descriptionTag]; 
            }
        }
    }
}

// efetua a ação de clique do botão do formulario de doação
clickedDonate = (event) => {
    
    const idDonateUserTag = "idDonateUser";
    const qtDonateTag = "qtDonate";
    const descTag = "desc";

    let cmbCoworkers = document.getElementById("cmbCoworkers");
    let inputQtCred = document.getElementById("inputQtCred");
    let inputDesc = document.getElementById("inputDesc");

    if(cmbCoworkers && inputQtCred && inputDesc){
        let idDonateUser = cmbCoworkers.options[cmbCoworkers.selectedIndex].value;
        let qtDonate = inputQtCred.value;
        let desc = inputDesc.value;

        if(idDonateUser != "" && qtDonate != "" && desc != ""){

            let spanBalanceDonate = document.getElementById("idBalanceDonate");
            if(spanBalanceDonate){
                let balanceDonate = spanBalanceDonate.innerHTML;
                if(!isNaN(balanceDonate) && !isNaN(qtDonate)){
                    balanceDonate = parseInt(balanceDonate);
                    qtDonate = parseInt(qtDonate);
                    if(qtDonate <= balanceDonate){

                        let jsonDonate = {
                            [idDonateUserTag] : idDonateUser,
                            [qtDonateTag] : qtDonate,
                            [descTag] : desc
                        };
            
                        // CHAMA O WS PARA REALIZAR UMA TRANSAÇÃO DE DOAÇÃO
                        alert(JSON.stringify(jsonDonate));
            
                        let jsonResponse = true;
                        if(jsonResponse){
                            // limpa valores preenchidos no formulario
                            cmbCoworkers.options[0].selected = true;
                            inputQtCred.value = "";
                            inputDesc.value = "";
            
                            event.preventDefault(); 
                        }
                    }
                }
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

clickedHist = (event) => {

    let cbUsersDonate = document.getElementById("cmbUsersDonate");
    let cbUsersReceptor = document.getElementById("cmbUsersReceptor");
    let datepicker = document.getElementById("datepicker");
    if(cbUsersDonate && cbUsersReceptor && datepicker){

        let jsonHist = null;
        let idDonateUser = cbUsersDonate.options[cbUsersDonate.selectedIndex].value;
        if(idDonateUser != null && idDonateUser != "")
            jsonHist = {
                "idUserDonate" : idDonateUser
            };

        let idReceptorUser = cbUsersReceptor.options[cbUsersReceptor.selectedIndex].value;
        if(idReceptorUser != null && idReceptorUser != ""){
            if(jsonHist == null)
                jsonHist = {};

            jsonHist["idUserReceptor"] = idDonateUser;
        }

        let dateFilter = datepicker.value;
        if(dateFilter != null && dateFilter != ""){
            if(jsonHist == null)
                jsonHist = {};

            jsonHist["dateDonate"] = dateFilter;
        }

        loadHist(jsonHist);
    }
}

// efetua a ação de um clique do menu para processar uma página
pageClicked = (namePage, optionHist) => {
    turnOnOffPage(constIdPageHome, (constIdPageHome === namePage));
    
    let loadPageDonate = (constIdPageDonate === namePage);
    turnOnOffPage(constIdPageDonate, loadPageDonate);
    
    let loadPageAwards = (constIdPageAwards === namePage);
    turnOnOffPage(constIdPageAwards, loadPageAwards);

    let loadPageHist = (constIdPageHist === namePage);
    turnOnOffPage(constIdPageHist, loadPageHist);

    setCurrentPage(namePage);

    loadBalance();

    loadPage(namePage);

    if(loadPageDonate){
        loadListUser("cmbCoworkers");

        // seta o valor máximo que podemos doar
        let spanBalanceDonate = document.getElementById("idBalanceDonate");
        let inputQtCred = document.getElementById("inputQtCred");
        if(spanBalanceDonate && inputQtCred){
            let balanceDonate = spanBalanceDonate.innerHTML;
            if(!isNaN(balanceDonate))
                inputQtCred.max = parseInt(balanceDonate);
            else
                inputQtCred.max = 999;
        }
    }

    if(loadPageAwards){

        let spanTotalAwardsSel = document.getElementById("idTotalAwardsSel");
        let spanQtAwardsSel = document.getElementById("idQtAwardsSel");
        if(spanTotalAwardsSel && spanQtAwardsSel){
            spanTotalAwardsSel.textContent = 0;
            spanQtAwardsSel.textContent = 0;
        }

        loadListAwards();
    }

    if(loadPageHist){
        loadListUser("cmbUsersDonate");
        loadListUser("cmbUsersReceptor");

        const idUser = 2;

        let jsonHist = null;
        let cbUsersDonate = document.getElementById("cmbUsersDonate");
        let cbUsersReceptor = document.getElementById("cmbUsersReceptor");
        if(cbUsersDonate && cbUsersReceptor){
            if(optionHist){
                for(let i = 0; i < cbUsersDonate.options.length; i++){
                    if(cbUsersDonate.options[i].value == idUser){
                        cbUsersDonate.options[i].selected = true;
                        break;
                    }
                }

                for(let i = 0; i < cbUsersReceptor.options.length; i++){
                    if(cbUsersReceptor.options[i].value == idUser){
                        cbUsersReceptor.options[i].selected = true;
                        break;
                    }
                }

                jsonHist = {
                    "idUserDonate" : idUser,
                    "idUserReceptor" : idUser
                }                
            }
            else {
                cbUsersDonate.options[0].selected = true;
                cbUsersReceptor.options[0].selected = true;
            }
        }

        loadHist(jsonHist);
    }
}

loadPage = (idPage) => {

    let loadPageHome = (constIdPageHome === idPage);
    if(loadPageHome)
        initHome();

}
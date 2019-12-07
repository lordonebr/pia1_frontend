// CONSTANTES
const constIdCbAward = "idCbAward";
const constDataIdAward = "data-id-award";
const constDataCostAward = "data-cost-award";

window.addEventListener("load", function(event) {
    loadCurrentPage();
});

updateBalance = (buttonElem) => {
    
    if(buttonElem)
        buttonElem.blur();
        
    loadBalance();
}

// recupera do WS, o saldo para doação e o recebido
loadBalance = (callback) => {

    loadFromService('GET', '/users/balances')
    .then(balanceJson => {

        const balanceDonateTag = "credit";
        const balanceReceptionTag = "receptions";
    
        /*balanceJson = {
            [balanceDonateTag] : 190,
            [balanceReceptionTag] : 160
        }*/

        if(balanceJson.hasOwnProperty(tagJsonSuccess) && balanceJson[tagJsonSuccess]){

            let balanceDonate = 0;
            let balanceReception = 0;
            if(balanceJson.hasOwnProperty(balanceDonateTag) &&
            balanceJson.hasOwnProperty(balanceReceptionTag)){
                balanceDonate = balanceJson[balanceDonateTag];
                balanceReception = balanceJson[balanceReceptionTag];
            } 
        
            setTextSpan("idBalanceDonate", balanceDonate); 
            setTextSpan("idBalanceReception", balanceReception);

            turnOnOffPage(constIdDivLoginOptions, true);
            setTextSpan("idUserName", getInfoLocal(constTagStorageCurrentUserName));

        }
        else {
            turnOnOffPage(constIdDivLoginOptions, false);

            if(balanceJson.hasOwnProperty(tagJsonMessage))
                console.log(balanceJson[tagJsonMessage]);
        }
    
        if(callback)
            callback();

    })
    .catch((error) => {
        console.log("Falha ao carregar saldos: " + error);
        turnOnOffPage(constIdDivLoginOptions, false);
    });
}

// recupera do WS, a lista dos usuarios para doação
loadListUser = (lstIdCmbUsers, showAllUser, callback) => {

    let json = null;
    if(showAllUser)
        json = {'allUsers': true};

    loadFromService('GET', '/users', json)
        .then(usersJSON => {

            /*const userNameTag = "name";
            const idUserTag = "id";

            usersJSON = [
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

            for(let idx = 0; idx < lstIdCmbUsers.length; idx++)
                setComboBoxUsers(lstIdCmbUsers[idx], usersJSON, showAllUser);

            if(callback)
                callback();
        })
        .catch((error) => {
            console.log("Falha ao carregar lista de usuário: " + error);
        });
}

// efetua a ação de um clique do menu para processar uma página
pageClicked = (namePage, optionMyHist) => {

    turnOnOffPage(constIdDivPageHome,   (constIdDivPageHome   === namePage));
    turnOnOffPage(constIdDivPageDonate, (constIdDivPageDonate === namePage));
    turnOnOffPage(constIdDivPageAwards, (constIdDivPageAwards === namePage));

    removeInfoLocal(constTagStorageUserHist);
    turnOnOffPage(constIdDivPageHist, (constIdDivPageHist === namePage));
    if((constIdDivPageHist === namePage) && optionMyHist)
        setInfoLocal(constTagStorageUserHist, true);

    setInfoLocal(constTagStorageCurrentPage, namePage);
    loadPage(namePage);
}

loadPage = (idPage) => {
    if(constIdDivPageHome === idPage)
        initHome();
    else if(constIdDivPageDonate === idPage)
        initDonation();
    else if (constIdDivPageAwards === idPage)
        initAward();
    else if (constIdDivPageHist === idPage)
        initHist();
}
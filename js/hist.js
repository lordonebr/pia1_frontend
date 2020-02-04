// CONSTANTES
 const tagIdUserDonate = 'idSender';
 const tagIdUserReceptor = 'idRecipient';
 const tagIdUserDate = 'date';

initHist = () => {
    loadBalance();
    loadListUser(["cmbUsersDonate", "cmbUsersReceptor"], true, 
        initLoadHist
    );
}

initLoadHist = () => {

    let jsonHist = null;
    let optionMyHist = getInfoLocal(constTagStorageUserHist);
    if(optionMyHist === "")
        optionMyHist = null;

    let idUser = getMyUserId();
    let cbUsersDonate = document.getElementById("cmbUsersDonate");
    let cbUsersReceptor = document.getElementById("cmbUsersReceptor");
    if(idUser && cbUsersDonate && cbUsersReceptor){

        if(optionMyHist){
            // seta o combo box do usuario doador como o usuario corrente
            for(let i = 0; i < cbUsersDonate.options.length; i++){
                if(cbUsersDonate.options[i].value == idUser){
                    cbUsersDonate.options[i].selected = true;
                    break;
                }
            }

            // seta o combo box do usuario receptor como o usuario corrente
            for(let i = 0; i < cbUsersReceptor.options.length; i++){
                if(cbUsersReceptor.options[i].value == idUser){
                    cbUsersReceptor.options[i].selected = true;
                    break;
                }
            }

            jsonHist = {
                [tagIdUserDonate] : idUser,
                [tagIdUserReceptor] : idUser
            }                
        }
        else {
            cbUsersDonate.options[0].selected = true;
            cbUsersReceptor.options[0].selected = true;
        }

        loadHist(jsonHist);
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
                [tagIdUserDonate] : idDonateUser
            };

        let idReceptorUser = cbUsersReceptor.options[cbUsersReceptor.selectedIndex].value;
        if(idReceptorUser != null && idReceptorUser != ""){
            if(jsonHist == null)
                jsonHist = {};

            jsonHist[tagIdUserReceptor] = idReceptorUser;
        }

        let dateFilter = datepicker.value;
        if(dateFilter != null && dateFilter != ""){
            if(jsonHist == null)
                jsonHist = {};

            jsonHist[tagIdUserDate] = dateFilter;
        }

        event.preventDefault(); 
        loadHist(jsonHist);
    }
}

// recupera do WS, o histórico das transações do sistema
loadHist = (jsonFilter) => {

    loadFromService('GET', '/transfers', jsonFilter)
    .then(histJSON => {

        const dateTag = "date";
        const nameDonorTag = "nameSender";
        const nameReceptorTag = "nameRecipient";
        const valueTag = "value";
        const descriptionTag = "description";

        /*histJSON = [
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
        ]*/

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
    });
}
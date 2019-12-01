initDonation = () => {
    loadBalance(setMaxDonateValue);
    loadListUser(["cmbCoworkers"], false);
}

// seta o valor máximo que podemos doar
setMaxDonateValue = () => {
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

// efetua a ação de clique do botão do formulario de doação
clickedDonate = (event) => {
    
    const idSenderUserTag = "idSender";
    const idRecipientUserTag = "idRecipient";
    const qtDonateTag = "donation";
    const descTag = "description";

    let cmbCoworkers = document.getElementById("cmbCoworkers");
    let inputQtCred = document.getElementById("inputQtCred");
    let inputDesc = document.getElementById("inputDesc");
    let idSenderUser = getMyUserId();
        
    if(idSenderUser && 
       cmbCoworkers && 
       inputQtCred && 
       inputDesc){
        let idRecipientUser = cmbCoworkers.options[cmbCoworkers.selectedIndex].value;
        let qtDonate = inputQtCred.value;
        let desc = inputDesc.value;

        if(idRecipientUser != "" && qtDonate != "" && desc != ""){

            let spanBalanceDonate = document.getElementById("idBalanceDonate");
            if(spanBalanceDonate){
                let balanceDonate = spanBalanceDonate.innerHTML;
                if(!isNaN(balanceDonate) && !isNaN(qtDonate)){
                    balanceDonate = parseInt(balanceDonate);
                    qtDonate = parseInt(qtDonate);
                    if(qtDonate <= balanceDonate){

                        let jsonDonate = {
                            [idSenderUserTag] : idSenderUser,
                            [idRecipientUserTag] : idRecipientUser,
                            [qtDonateTag] : qtDonate,
                            [descTag] : desc
                        };

                        loadFromService('POST', '/transfers', jsonDonate)
                        .then(jsonOut => {
                
                            if(jsonOut.hasOwnProperty("success")){
                                if(jsonOut["success"]){
                                    // limpa valores preenchidos no formulario
                                    cmbCoworkers.options[0].selected = true;
                                    inputQtCred.value = "";
                                    inputDesc.value = "";
                    
                                    event.preventDefault(); 
                                    loadBalance(setMaxDonateValue);
                                }
                            }
                        })
                        .catch((error) => {
                            console.log("Falha ao fazer a doação: " + error);
                        });
                    }
                }
            }
        }
    }
}
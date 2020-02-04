// CONSTANTES
const constDisplayOnOffCSS = "divOff";
//const constUrlBase = "http://localhost:3000/api/coins"
const constUrlBase = "https://pia1-backend.herokuapp.com/api/coins"
const tagJsonSuccess = "success";
const tagJsonMessage = "message";

// CONSTANTES dos principais ids de DIV
const constIdDivPageHome = "homePag";
const constIdDivPageDonate = "donatePag";
const constIdDivPageAwards = "awardsPag";
const constIdDivPageHist = "histPage";
const constIdDivLogin = "idDivExternalHtml";
const constIdDivLoginOptions = "idDivLoginOptions";
const constIdDivLoading = "idDivLoading";

// CONSTANTES das TAGS usados no storage
const constTagStorageUserToken = "UserToken";
const constTagStorageCurrentPage  = "CurrentPage";
const constTagStorageCurrentUserName  = "CurrentUserName";
const constTagStorageCurrentUserId  = "CurrentUserId";
const constTagStorageLoginCreatedMsg  = "LoginCreatedMsg";
const constTagStorageUserHist  = "UserHist";

// recupera alguma informação localmente (sessionStorage)
getInfoLocal = (tag) => {
    let valFromTag = sessionStorage.getItem(tag);
    if(valFromTag == null)
        valFromTag = "";

    return valFromTag;
}

// salva alguma informação localmente (sessionStorage)
setInfoLocal = (tag, valFromTag) => {
    sessionStorage.setItem(tag, valFromTag);
}

// remove alguma informação localmente (sessionStorage)
removeInfoLocal = (tag) => {
    sessionStorage.removeItem(tag);
}

// recupera o id do usuario logado
getMyUserId = () => {
    let idUser = getInfoLocal(constTagStorageCurrentUserId);
    if(idUser === "")
        idUser = null;
    else if(!isNaN(idUser))
        idUser = parseInt(idUser);
    else
        idUser = null;

    return idUser;
}


// seta um texto num component SPAN
setTextSpan = (spanID, textContent) => {
    let element = document.getElementById(spanID);
    if(element)
        element.textContent = textContent;
}

// seta o combo box de usuarios com uma lista de valores
setComboBoxUsers = (idComboBox, lstUserJson, showAllUser) => {
    
    const userNameTag = "name";
    const idUserTag = "id";

    let element = document.getElementById(idComboBox);
    if(element){

        let oldIdValueSel = element.options[element.selectedIndex].value;

        // limpa conteudo antigo
        for(let i = element.options.length - 1 ; i > 0 ; i--)
            element.remove(i);

        let setSelected = false;

        let idUser = getMyUserId();
        if(idUser){
            // preenche com o conteudo novo vindo do WS
            for(let idx in lstUserJson){

                if(lstUserJson[idx].hasOwnProperty(userNameTag) &&
                   lstUserJson[idx].hasOwnProperty(idUserTag) 
                ){
                    if(showAllUser || lstUserJson[idx][idUserTag] !== idUser){
                        let option = document.createElement("option");
                        option.text = lstUserJson[idx][userNameTag]; 
                        option.value = lstUserJson[idx][idUserTag]; 
                        if(oldIdValueSel != "" && lstUserJson[idx][idUserTag] == oldIdValueSel){
                            option.selected = true;
                            setSelected = true;
                        }

                        element.appendChild(option);
                    }
                }
            }
        }

        if(!setSelected)
            element.options[0].selected = true;
    }
}

// liga/desliga uma div com o conteúdo de uma página
turnOnOffPage = (idDiv, isShow) => {
    let element = document.getElementById(idDiv);
    if(element){
        if(isShow)
            element.classList.remove(constDisplayOnOffCSS);
        else
            element.classList.add(constDisplayOnOffCSS);
    }  
}

// seta o sistema como não logado
setOffline = () => {
    removeInfoLocal(constTagStorageUserToken);
    removeInfoLocal(constTagStorageCurrentUserName);
    removeInfoLocal(constTagStorageCurrentUserId);
    turnOnOffPage(constIdDivPageHome, false);
    turnOnOffPage(constIdDivPageDonate, false);
    turnOnOffPage(constIdDivPageAwards, false);
    turnOnOffPage(constIdDivPageHist, false);
    turnOnOffPage(constIdDivLoginOptions, false);
}

// manda uma requisição para o WS
loadFromService = (typeService, urlService, jsonIn, loadContentHtml) => {

    turnOnOffPage(constIdDivLoading, true);
    
    let url = constUrlBase + urlService;

    let token = getInfoLocal(constTagStorageUserToken);
    if(token === "")
        token = null;

    // monta requisição
    let fetchData = {
            method: typeService,
			mode: 'cors',
            headers: {
                'x-access-token': token,
                'Content-Type': "application/json"
			}
        };

    // se existe json, add na requisição
    if(jsonIn != undefined && jsonIn != null){
        if(typeService === 'GET'){

            jsonIn = {'filter': jsonIn};

            let urlParams = Object.keys(jsonIn).map(function(k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(JSON.stringify(jsonIn[k]))
            }).join('&');

            url += '?' + urlParams;
        }
        else
            fetchData["body"] = JSON.stringify(jsonIn);
    }

    return new Promise((resolve, reject) => {

        // chama o Web Service
        fetch(url, fetchData)
        .then(response => {
            
            console.log(`${typeService} Url: ${url} - return: ${response.status}`);
            turnOnOffPage(constIdDivLoading, false);

            let contentType = response.headers.get("content-type");
            if(contentType && contentType.indexOf("text/html") !== -1){
                response.text().then(html => {
                    loadHtmlReponse(html);
                    if(loadContentHtml)
                        resolve(html);
                    else
                        reject("Carregado página HTML vinda do servidor");
                });
            }
            else if(contentType && contentType.indexOf("application/json") !== -1){
                response.json().then(json =>
                    resolve(json)
                );
            }
            else {

                setOffline();
                let errorMsg = 'Erro ao acessar o web service: ' + response.status.toString();
                setDivInnerHTML(constIdDivLogin, errorMsg);
                reject(errorMsg);
            }
        })
        .catch((error) => {

            turnOnOffPage(constIdDivLoading, false);

            // ocorreu algum erro na requisição, vamos colocar o sistema como offline
            let errorMsg = `<h1>Erro ao obter uma resposta do servidor</h1>
                            <p>Ao tentar acessar o servidor, ocorreu o seguinte erro: ${error.message}.</p>
                            <p>Por favor, recarregue a página para tentar novamente.</p>`;
            setDivInnerHTML(constIdDivLogin, errorMsg);

            setOffline();

            reject(errorMsg);
        });
    });
}

loadHtmlReponse = (html) => {

    // torna visivel a div para mostrar o conteudo da pagina html, retornada pela API
    if(setDivInnerHTML(constIdDivLogin, html)){
        
        if(getInfoLocal(constTagStorageUserToken) === "")
            setTextSpan("idErrorLogin", ""); // não vamos exibir erros de login quando o sistema ainda não possui token

        let loginCreatedMsg = getInfoLocal(constTagStorageLoginCreatedMsg);
        if(loginCreatedMsg != null){
            turnOnOffPage("idMsgLogin", true);
            setTextSpan("idMsgLogin", loginCreatedMsg);

            setTextSpan("idErrorLogin", "");
            removeInfoLocal(constTagStorageLoginCreatedMsg);
        }
    }

    setOffline();
}

// seta um conteudo html numa DIV
setDivInnerHTML = (idDiv, html) => {

    let isSet = false;
    let divElem = document.getElementById(idDiv);
    if(divElem){
        turnOnOffPage(idDiv, true); 
        divElem.innerHTML = html;
        isSet = true;
    }

    return isSet;
}

loadCurrentPage = () => {
    let currentPage = getInfoLocal(constTagStorageCurrentPage);
    if(currentPage === "")
        currentPage = constIdDivPageHome;

    turnOnOffPage(currentPage, true);
    loadPage(currentPage)
}

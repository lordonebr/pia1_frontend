// CONSTANTES
const constDisplayOnOffCSS = "divOff";
const constUrlBase = "http://localhost:3000/api/coins"
const constIdPageHome = "homePag";
const constIdPageDonate = "donatePag";
const constIdPageAwards = "awardsPag";
const constIdPageHist = "histPage";
const constIdDivLogin = "idDivExternalHtml";
const constIdLoginOptions = "idDivLoginOptions";

const constTagStorageUserToken = "UserToken";
const constTagStorageCurrentPage  = "CurrentPage";
const constTagStorageCurrentUserName  = "CurrentUserName";
const constTagStorageCurrentUserId  = "CurrentUserId";
const constTagStorageLoginCreatedMsg  = "LoginCreatedMsg";

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

// seta um texto num component SPAN
setTextSpan = (spanID, textContent) => {
    let element = document.getElementById(spanID);
    if(element)
        element.textContent = textContent;
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
    turnOnOffPage(constIdPageHome, false);
    turnOnOffPage(constIdPageDonate, false);
    turnOnOffPage(constIdPageAwards, false);
    turnOnOffPage(constIdPageHist, false);
}

// manda uma requisição para o WS
loadFromService = (typeService, urlService, jsonIn, loadContentHtml) => {

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
        fetchData["body"] = JSON.stringify(jsonIn);
    }

    return new Promise((resolve, reject) => {

        // chama o Web Service
        fetch(url, fetchData)
        .then(response => {
            
            console.log(`${typeService} Url: ${url} - return: ${response.status}`);

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

            // ocorreu algum erro na requisição, vamos colocar o sistema como offline
            setOffline();
            let errorMsg = 'Erro ao acessar o web service: ' + error.message;
            setDivInnerHTML(constIdDivLogin, errorMsg);
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
    turnOnOffPage(currentPage, true);
    loadPage(currentPage)
}

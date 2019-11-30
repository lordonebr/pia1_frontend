// CONSTANTES
const constDisplayOnOffCSS = "divOff";
const constUrlBase = "http://localhost:3000/api/coins"
const constIdPageHome = "homePag";
const constIdPageDonate = "donatePag";
const constIdPageAwards = "awardsPag";
const constIdPageHist = "histPage";
const constIdLogin = "idDivExternalHtml";
const constIdLoginOptions = "idDivLoginOptions";

const constTagStorageUserToken = "UserToken";
const constTagStorageCurrentPage  = "CurrentPage";
const constTagStorageCurrentUserName  = "CurrentUserName";
const constTagStorageLoginCreatedMsg  = "LoginCreatedMsg";

// recupera o token de autenticação
getUserToken = () => {
    return sessionStorage.getItem(constTagStorageUserToken);
}

// salva o token de autenticação
setUserToken = (token) => {
    sessionStorage.setItem(constTagStorageUserToken, token);
}

// remove token de autenticação
removeUserToken = () => {
    sessionStorage.removeItem(constTagStorageUserToken);
}

// recupera o token de autenticação
getCurrentUserName = () => {
    let userName = sessionStorage.getItem(constTagStorageCurrentUserName);
    if(userName == null)
        userName = "";

    return userName;
}

// salva o token de autenticação
setCurrentUserName = (userName) => {
    sessionStorage.setItem(constTagStorageCurrentUserName, userName);
}

// remove token de autenticação
removeCurrentUserName = () => {
    sessionStorage.removeItem(constTagStorageCurrentUserName);
}

// recupera a pagina atual
getCurrentPage = () => {
    let storageCurrentPage = sessionStorage.getItem(constTagStorageCurrentPage);
    if(storageCurrentPage == null)
        storageCurrentPage = constIdPageHome;

    return storageCurrentPage;
}

// salva a pagina atual
setCurrentPage = (idPage) => {
    sessionStorage.setItem(constTagStorageCurrentPage, idPage);
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

// sistema não logado
failedLoadWS = () => {
    turnOnOffPage(constIdPageHome, false);
    turnOnOffPage(constIdPageDonate, false);
    turnOnOffPage(constIdPageAwards, false);
    turnOnOffPage(constIdPageHist, false);
}

// manda uma requisição para o WS
loadFromService = (typeService, urlService, jsonIn) => {

    let url = constUrlBase + urlService;

    let token = getUserToken();
    if(token === null)
        failedLoadWS();

    let fetchData = {
            method: typeService,
			mode: 'cors',
            headers: {
                'x-access-token': token,
                'Content-Type': "application/json"
			}
        };

    if(jsonIn != undefined && jsonIn != null){
        fetchData["body"] = JSON.stringify(jsonIn);
    }

    return new Promise((resolve, reject) => {
    fetch(url, fetchData)
        .then(response => {
            
            console.log(`Url: ${url} - return: ${response.status}`);

            let contentType = response.headers.get("content-type");
            if(contentType && contentType.indexOf("text/html") !== -1){
                response.text().then(html => {
                    let divExternalHtml = document.getElementById(constIdLogin);
                    if(divExternalHtml){
                        turnOnOffPage(constIdLogin, true);
                        divExternalHtml.innerHTML = html;
                        
                        if(token == null)
                            setTextSpan("idErrorLogin", "");

                        let loginCreatedMsg = sessionStorage.getItem(constTagStorageLoginCreatedMsg);
                        if(loginCreatedMsg != null){
                            turnOnOffPage("idMsgLogin", true);
                            setTextSpan("idMsgLogin", loginCreatedMsg);
                            setTextSpan("idErrorLogin", "");
                            sessionStorage.removeItem(constTagStorageLoginCreatedMsg);
                        }
                            

                        removeUserToken();
                        removeCurrentUserName();
                    }
                    
                    failedLoadWS();
                    reject();
                });
            }
            else if(contentType && contentType.indexOf("application/json") !== -1){
                response.json().then(json =>
                    resolve(json)
                );
            }
            else {
                let divExternalHtml = document.getElementById(constIdLogin);
                if(divExternalHtml)
                    divExternalHtml.innerHTML = response.status.toString() + ": Falha ao acessar o web service";

                failedLoadWS();
                reject();
            }
        })
        .catch(function(error) {
            failedLoadWS();

            let errorMsg = 'Ocorreu o seguinte erro ao acessar o web service: ' + error.message;
            console.log(errorMsg);
            alert(errorMsg);

            reject();
        });
    });

}

loadCurrentPage = () => {
    let currentPage = getCurrentPage();
    turnOnOffPage(currentPage, true);
    loadPage(currentPage)
}
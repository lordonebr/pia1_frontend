clickedLogin = (event) => {
    let inputEmail = document.getElementById("idEmail");
    let inputUserPassword = document.getElementById("idUserPassword");
    if(inputEmail && inputUserPassword){

        if(inputEmail.value != "" && inputUserPassword.value != ""){
            let json = {
                "email" : inputEmail.value,
                "password" : inputUserPassword.value
            }

            event.preventDefault(); 

            loadFromService('POST', '/auth', json)
            .then(jsonOut => {

                if(jsonOut.hasOwnProperty("auth")){
                    let authOk = jsonOut["auth"];

                    if(!authOk){
                        setTextSpan("idMsgLogin", "");

                        // falhou autenticação
                        if(jsonOut.hasOwnProperty("message"))
                            setTextSpan("idErrorLogin", jsonOut["message"]);
                    }
                    else {
                        // autenticação feita com sucesso
                        if(jsonOut.hasOwnProperty("token")){
                            setUserToken(jsonOut["token"]);
                            turnOnOffPage(constIdLogin, false);
                            turnOnOffPage(constIdLoginOptions, true);
                            loadCurrentPage();
                        }

                        if(jsonOut.hasOwnProperty("name")){
                            setCurrentUserName(jsonOut["name"]);
                            setTextSpan("idUserName", jsonOut["name"]);
                        }
                    }
                }
            });
        }
    }
}

clickedLoadCreateUser = (event) => {
    loadFromService('GET', '/auth/signup')
    .then(json => {
        console.log("Carregou tela de cadastro de usuários")
    });
}

clickedSignup = (event) => {
    let inputFirstName = document.getElementById("idNewUserFirstName");
    let inputLastName = document.getElementById("idNewUserLastName");
    let inputEmail = document.getElementById("idNewUserEmail");
    let inputPassword = document.getElementById("idNewUserPassword");
    if(inputFirstName && inputLastName && inputEmail && inputPassword){

        if(inputFirstName.value != "" && inputLastName.value != "" && 
           inputEmail.value != "" && inputPassword.value != ""){
            let json = {
                "name" : inputFirstName.value + ' ' + inputLastName.value,
                "email" : inputEmail.value,
                "password" : inputPassword.value
            }

            event.preventDefault(); 

            loadFromService('POST', '/users', json)
            .then(jsonOut => {

                if(jsonOut.hasOwnProperty("signup")){
                    let signupOk = jsonOut["signup"];
                    if(!signupOk){
                        // falhou na criação de usuário
                        if(jsonOut.hasOwnProperty("message"))
                            setTextSpan("idErrorSignup", jsonOut["message"]);
                    }
                    else {
                        // usuário foi criado com sucesso, redireciona para a página de login
                        if(jsonOut.hasOwnProperty("message"))
                            sessionStorage.setItem(constTagStorageLoginCreatedMsg, jsonOut["message"]);

                        loadCurrentPage();
                    }
                }
            });
        }
    }
}

logout = () => {
    removeUserToken();
    removeCurrentUserName();
    turnOnOffPage(constIdLoginOptions, false);
    loadCurrentPage();
}

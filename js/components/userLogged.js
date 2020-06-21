class PageUserLogged extends HTMLElement {

    connectedCallback() {
        this.innerHTML = 
        `
        <div class="colorDefaultDark">
            <div id="idDivLoginOptions" class="divOff mb-3 pb-2">
                <div class="d-flex mx-2">
                    <div class="mr-auto">
                        <div class="col-auto mt-1 colorDefaultAux rounded-pill">
                            <div class="d-flex justify-content-center pt-1 textColorDefaultDark">
                                <span class="iconify iconifyButton mt-1" data-icon="emojione-monotone:balance-scale" data-inline="false"></span>
                                <h5 class="font-weight-bold text-uppercase mt-1 ml-2">Saldos</h5>
                                <button onclick="updateBalance(this)" class="btn btn-sm" title="Atualiza os saldos">
                                    <span class="iconify iconifyButton textColorDefaultDark mb-1" data-icon="bytesize:reload" data-inline="false"></span>
                                </button>
                            </div>
                            <div class="d-flex justify-content-center px-2 pb-1 mt-1 textColorDefaultDark">
                                <span class="font-weight-bold mr-3">Doação: 
                                    <span class="text-white bg-primary rounded-pill pl-2 pr-2 pt-1 pb-1">$
                                        <span id="idBalanceDonate" >0</span>
                                    </span>
                                </span>
                                <span class="ml-3 font-weight-bold">Recebido: 
                                    <span class="text-white bg-success rounded-pill pl-2 pr-2 pt-1 pb-1">$
                                        <span id="idBalanceReception">0</span>
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="pt-2">
                        <div class="col-auto borderSpecial p-2 colorDefault">
                            <div class="d-flex justify-content-center mb-1">
                                <span class="iconify iconifyUserLogged text-white mt-1" data-icon="fa:user-circle" data-inline="false"></span>
                                <span class="text-white ml-1 userLogged" id="idUserName"></span>
                            </div>
                            <div class="d-flex justify-content-center">
                                <button onclick="logout()" class="row btn btn-danger btn-sm userLogged" type="button">
                                    Logout
                                    <span class="iconify" data-icon="websymbol:logout" data-inline="false"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

window.customElements.define('page-user-logged', PageUserLogged);
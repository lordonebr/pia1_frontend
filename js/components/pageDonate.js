class PageDonate extends HTMLElement {

    connectedCallback() {
        this.innerHTML = 
        `
        <div id="donatePag" class="divOff">
            <div class="borderSpecial textColorDefaultDark m-2 p-3">
                <div id="divDonatePageContent">
                    <div class="d-flex justify-content-left">
                        <span class="iconify iconifyPage mt-1 mr-2" data-icon="emojione-monotone:money-with-wings" data-inline="false"></span>
                        <h3 class="font-weight-bold mb-3">Doação de créditos</h3>
                    </div>
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-4">
                                <label class="font-weight-bold" for="cmbCoworkers">Destinatário</label>
                                <select class="form-control" id="cmbCoworkers" required>
                                        <option disabled selected value> --- Selecione um colega --- </option>
                                    <!-- OPÇÕES CONTENDO LISTA DE COLEGAS: CÓDIGO GERADO VIA JAVASCRIPT --> 
                                </select>
                            </div>
                            <div class="form-group col-md-2">
                                <label class="font-weight-bold" for="inputQtCred">Quantidade</label>
                                <input type="number" class="form-control" id="inputQtCred" min="1" max="999" placeholder="Qt. Créditos" required>
                            </div>
                            <div class="form-group col-md-6">
                                <label class="font-weight-bold" for="inputDesc">Motivo</label>
                                <input type="text" class="form-control" id="inputDesc" placeholder="Digite o motivo da doação" maxlength="300" required>
                            </div>
                        </div>
                        
                        <button type="submit" onclick="clickedDonate(event)" class="btn colorDefaultDark font-weight-bold text-uppercase">
                            <div class="d-flex justify-content-left">
                                <h6 class="mt-1">Doar</h6>
                                <span class="iconify iconifyButton mt-1 ml-2" data-icon="icomoon-free:arrow-right" data-inline="false"></span>
                            </div>
                        </button>
                    </form>
                </div>
                <div id="divDonatePageMessage">
                </div>
            </div>
        </div>
        `;
    }
}

window.customElements.define('page-donate', PageDonate);
class PageAwards extends HTMLElement {

    connectedCallback() {
        this.innerHTML = 
        `
        <div id="awardsPag" class="divOff">
            <div class="borderSpecial textColorDefaultDark m-2 p-3">
                <div class="d-flex justify-content-left">
                    <span class="iconify iconifyPage mt-1 mr-2" data-icon="fa-solid:award" data-inline="false"></span>
                    <h3 class="font-weight-bold mb-3">Resgate de prêmios</h3>
                </div>
                <form>
                    <table class="table table-bordered table-striped table-sm" id="idAwardsTable">
                        <thead>
                            <tr class="colorDefaultDark"> 
                                <th scope="col"></th>
                                <th scope="col">Custo</th>
                                <th scope="col" class="colDescAward">Descrição do prêmio</th>
                            </tr>
                        </thead>
                        <tbody class="table-light">
                            <!-- CONTEÚDO DAS ÚLTIMAS TRANSAÇÕES: CÓDIGO GERADO VIA JAVASCRIPT -->   
                        </tbody>
                    </table> 

                    <div>
                        <h6><span class="font-weight-bold">Itens selecionados: </span><span id="idQtAwardsSel">0</span></h6>
                        <h6><span class="font-weight-bold">Créditos selecionados: </span><span id="idTotalAwardsSel">0</span></h6>
                    </div>

                    <button type="submit" onclick="clickedGetAwards(event)" class="btn colorDefaultDark font-weight-bold text-uppercase mt-4">Resgatar</button>
                </form>
            </div>
        </div>
        `;
    }
}

window.customElements.define('page-awards', PageAwards);
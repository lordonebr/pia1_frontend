class PageHome extends HTMLElement {

    connectedCallback() {
        this.innerHTML = 
        `
        <div id="homePag" class="divOff">
            <div class="row justify-content-md-center textColorDefaultDark">
                <div class="col">
                    <h4>Instruções básicas:</h4>
                    <ul>
                        <li><span>Recompense seus colegas de trabalho, a partir do seu saldo destinado a doações.</span></li>
                        <li><span>Resgate recompensas incríveis apartir dos créditos recebidos.</span></li>
                        <li><span>A qualquer momento, confira o seu histórico de doações ou de seus colegas.</span></li>
                    </ul>
                </div>   
                <div id="divLastHist" class="col-md-7 borderSpecial py-2 pl-3 m-1 divOff">
                    <div class="d-flex justify-content-left">
                        <h5 class="mt-2 font-weight-bold">Últimas doações</h5>
                        <button onclick="updateLastHist(this)" class="btn btn-sm" title="Atualiza histórico">
                            <span class="iconify iconifyReload textColorDefaultDark" data-icon="bytesize:reload" data-inline="false"></span>
                        </button>
                    </div>
                    
                    <table class="table table-bordered table-striped table-sm" id="idLastHist">
                        <thead>
                            <tr class="colorDefaultDark"> 
                                <th scope="col">Data</th>
                                <th scope="col">Emissor</th>
                                <th scope="col">Destinatário</th>
                                <th scope="col">Créditos</th>
                            </tr>
                        </thead>
                        <tbody class="table-light">
                            <!-- CONTEÚDO DAS ÚLTIMAS TRANSAÇÕES: CÓDIGO GERADO VIA JAVASCRIPT -->   
                        </tbody>
                    </table> 
                </div>     
            </div>
        </div>
        `;
    }
}

window.customElements.define('page-home', PageHome);
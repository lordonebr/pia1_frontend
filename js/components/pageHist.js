class PageHist extends HTMLElement {

    connectedCallback() {
        this.innerHTML = 
        `
        <div id="histPage" class="divOff textColorDefaultDark"> 
            <div class="d-flex justify-content-left">
                <span class="iconify iconifyPage mt-1 mr-2" data-icon="simple-line-icons:book-open" data-inline="false"></span>
                <h2 class="font-weight-bold mb-3">Histórico de transações</h2>
            </div>
            <form class="borderSpecial p-2">
                <h6 class="font-weight-bold font-weight-bold text-uppercase mb-3">Filtros</h6>
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label class="font-weight-bold" for="cmbUsersDonate">Emissor</label>
                        <select class="form-control" id="cmbUsersDonate">
                                <option selected value> --- Selecione um emissor --- </option>
                                <!-- OPÇÕES CONTENDO LISTA DE COLEGAS: CÓDIGO GERADO VIA JAVASCRIPT --> 
                        </select>
                    </div>
                    <div class="form-group col-md-4">
                        <label class="font-weight-bold" for="cmbUsersReceptor">Destinatário</label>
                        <select class="form-control" id="cmbUsersReceptor">
                                <option selected value> --- Selecione um destinatário --- </option>
                                <!-- OPÇÕES CONTENDO LISTA DE COLEGAS: CÓDIGO GERADO VIA JAVASCRIPT --> 
                        </select>
                    </div>
                    <div class="form-group col-md-4">
                        <label class="font-weight-bold" for="datepicker">Data da doação</label>
                        <input id="datepicker" class="form-control" placeholder="Selecione uma data"  />
                        <script>
                            var datepicker, config;
                            config = {
                                locale: 'pt-br',
                                format: 'dd/mm/yyyy',
                                uiLibrary: 'bootstrap4'
                            };
                            $(document).ready(function () {
                                datepicker = $('#datepicker').datepicker(config);
                            });
                        </script>
                    </div>
                </div>
                
                <button type="submit" onclick="clickedHist(event)" class="btn colorDefaultDark font-weight-bold">Filtrar</button>
            </form>

            <table class="table table-bordered table-striped table-sm mt-1 mb-5" id="idHist">
                <thead>
                    <tr class="colorDefaultDark"> 
                        <th scope="col">Data</th>
                        <th scope="col">Emissor</th>
                        <th scope="col">Destinatário</th>
                        <th scope="col">Créditos</th>
                        <th scope="col">Descrição</th>
                    </tr>
                </thead>
                <tbody class="table-light">
                    <!-- CONTEÚDO DO HISTÓRICO DE TRANSAÇÕES: CÓDIGO GERADO VIA JAVASCRIPT -->   
                </tbody>
            </table> 
        </div>
        `;
    }
}

window.customElements.define('page-hist', PageHist);
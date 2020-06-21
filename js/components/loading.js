class PageLoading extends HTMLElement {

    connectedCallback() {
        this.innerHTML = 
        `
        <div id="idDivLoading" class="mt-4 textColorDefaultDark">
            <div class="d-flex justify-content-center">
                <h5 class="text-uppercase font-weight-bold">Por favor aguarde</h5>
            </div>
            <div class="d-flex justify-content-center my-2">
                <div class="spinner-border loadingPage" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div class="d-flex justify-content-center">
                <h5 class="textColorDefaultDark text-uppercase font-weight-bold blink_me">Carregando...</h5>
            </div>
        </div>
        `;
    }
}

window.customElements.define('page-loading', PageLoading);
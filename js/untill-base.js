const initPassViewToggler = () => {
    $(".form-row-field-pass-tgl").on("click", function() {
        const passInput = $(this).prev('input');

        if (passInput) {
            $(this).toggleClass('active');
            const type = $(passInput).attr('type');
            $(passInput).attr('type', type === 'password' ? 'text' : 'password');
        }
    })
};

const initAPI = () => {
    if (iframeApi && typeof iframeApi === 'function') {
        iframeApi({}).then(function (api) {
            console.log('API loaded');
            console.log(api);

            console.log(window.location);
        });
    }
};

$(() => {
    initAPI();
    initPassViewToggler(); //init form password input toggler
});
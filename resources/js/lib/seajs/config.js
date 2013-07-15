seajs.config({
    plugins: ['shim'],
    alias: {
        jquery: 'lib/jquery/jquery-1.10.1.js',
        placeholder: 'lib/placeholder/jquery.placeholder.js',
        util: 'app/util/util.js',
        rest: 'lib/rest/rest.js',
        dk: 'lib/dk/dk.customer.js',
        plupload: 'lib/plupload/plupload.full.js',
        imagescale: 'lib/imagescale/jquery.imagescale.js',
        jqueryui: 'lib/jqueryui/jquery-ui-1.10.3.custom.js'
    },
    shim: {
        plupload: {
            deps: [''],

            exports: 'plupload'
        }
    },
    preload: ["jquery"],
    base: '/resources/js/',
    charset: 'utf-8'
});